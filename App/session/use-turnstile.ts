import { useCallback, useEffect, useRef, useState } from 'react';

import { ACTION, SCRIPT_SRC } from './constants';

type RenderOptions = {
  sitekey: string;
  action: string;
  appearance: 'always' | 'execute' | 'interaction-only';
  callback: (token: string) => void;
  'error-callback': () => void;
  'expired-callback': () => void;
  'before-interactive-callback': () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: RenderOptions) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

let script: Promise<void> | null = null;

/** Loaded on first use, so pages without a session gate never fetch it. */
function loadScript(): Promise<void> {
  script ??= new Promise((resolve, reject) => {
    const element = document.createElement('script');
    element.src = SCRIPT_SRC;
    element.async = true;
    element.onload = () => resolve();
    element.onerror = () => {
      script = null;
      reject(new Error('Turnstile script failed to load'));
    };
    document.head.append(element);
  });

  return script;
}

/**
 * Renders a Turnstile widget into `container` and returns its token. It stays
 * hidden unless Cloudflare needs the visitor to click, which `interactive`
 * reports. No `siteKey` renders nothing.
 */
function useTurnstile(siteKey: string | undefined) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [interactive, setInteractive] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = container.current;

    if (!siteKey || !element) {
      return;
    }

    let cancelled = false;

    loadScript()
      .then(() => {
        if (cancelled || !window.turnstile) {
          return;
        }

        widget.current = window.turnstile.render(element, {
          sitekey: siteKey,
          action: ACTION,
          appearance: 'interaction-only',
          callback: setToken,
          'error-callback': () => setFailed(true),
          'expired-callback': () => setToken(null),
          'before-interactive-callback': () => setInteractive(true),
        });
      })
      .catch((error) => {
        console.error('Session: Turnstile unavailable', error);
        if (!cancelled) {
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
      if (widget.current) {
        window.turnstile?.remove(widget.current);
        widget.current = null;
      }
    };
  }, [siteKey]);

  /** Tokens are single-use, so a rejected one needs a new challenge. */
  const reset = useCallback(() => {
    setToken(null);
    if (widget.current) {
      window.turnstile?.reset(widget.current);
    }
  }, []);

  return { container, token, interactive, failed, reset };
}

export { useTurnstile };
