/** A step's time of day, to the second. */
const time = (at: number, language: string) => {
  return new Date(at).toLocaleTimeString(language, { hour12: false });
};

export { time };
