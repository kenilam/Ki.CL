const VALUES: readonly [number, string, boolean][] = [
  [4, 'whole', false],
  [3, 'half', true],
  [2, 'half', false],
  [1.5, 'quarter', true],
  [1, 'quarter', false],
  [0.75, 'eighth', true],
  [0.5, 'eighth', false],
  [0.375, '16th', true],
  [0.25, '16th', false],
];

const child = (parent: Element, selector: string) =>
  parent.querySelector(`:scope > ${selector}`);

const durationOf = (element: Element): number =>
  Number(child(element, 'duration')?.textContent) || 0;

const chordOf = (note: Element): Element[] => {
  const notes = [note];
  let next = note.nextElementSibling;

  while (next?.tagName === 'note' && child(next, 'chord')) {
    notes.push(next);
    next = next.nextElementSibling;
  }

  return notes;
};

const shorten = (note: Element, length: number, divisions: number): void => {
  const duration = child(note, 'duration');
  const type = child(note, 'type');
  const value = VALUES.find(([quarters]) => quarters * divisions === length);

  if (duration) {
    duration.textContent = String(length);
  }

  if (!type || !value) {
    return;
  }

  const [, name, dotted] = value;

  note.querySelectorAll(':scope > dot').forEach((dot) => dot.remove());
  type.textContent = name;

  if (dotted) {
    type.after(note.ownerDocument.createElement('dot'));
  }
};

const repairMusicXml = (xml: string): string => {
  const document = new DOMParser().parseFromString(xml, 'application/xml');

  if (document.querySelector('parsererror')) {
    return xml;
  }

  let repaired = false;

  document.querySelectorAll('score-partwise > part').forEach((part) => {
    let divisions = 1;
    let bar: number | null = null;

    part.querySelectorAll(':scope > measure').forEach((measure) => {
      const voices = new Map<string, { notes: Element[]; total: number }>();

      for (const element of measure.children) {
        if (element.tagName === 'attributes') {
          divisions =
            Number(child(element, 'divisions')?.textContent) || divisions;

          const time = child(element, 'time');
          const beats = Number(time && child(time, 'beats')?.textContent);
          const beatType = Number(
            time && child(time, 'beat-type')?.textContent
          );

          if (beats > 0 && beatType > 0) {
            bar = ((beats * 4) / beatType) * divisions;
          }
        }

        const counted =
          (element.tagName === 'note' &&
            !child(element, 'chord') &&
            !child(element, 'grace')) ||
          element.tagName === 'forward';

        if (!counted) {
          continue;
        }

        const voice = child(element, 'voice')?.textContent ?? '1';
        const entry = voices.get(voice) ?? { notes: [], total: 0 };

        entry.total += durationOf(element);

        if (element.tagName === 'note') {
          entry.notes.push(element);
        }

        voices.set(voice, entry);
      }

      if (bar === null) {
        return;
      }

      const length = bar;

      voices.forEach(({ notes, total }) => {
        const overflow = total - length;
        const longest = notes.reduce<Element | null>(
          (found, note) =>
            !found || durationOf(note) > durationOf(found) ? note : found,
          null
        );

        if (!longest || overflow <= 0 || overflow * 2 !== durationOf(longest)) {
          return;
        }

        const fixed = durationOf(longest) - overflow;

        chordOf(longest).forEach((note) => shorten(note, fixed, divisions));
        repaired = true;
      });
    });
  });

  return repaired ? new XMLSerializer().serializeToString(document) : xml;
};

export { repairMusicXml };
