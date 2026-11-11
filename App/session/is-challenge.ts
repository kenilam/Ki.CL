// Helper
import { GetErrorCode } from '@/helper';

/** The API wants the Turnstile check before it will run this. */
const isChallenge = (error: unknown) =>
  GetErrorCode(error) === 'CAPTCHA_REQUIRED';

export { isChallenge };
