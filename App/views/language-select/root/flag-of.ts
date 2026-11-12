// The tag's region, or where the language is most used when it has none (`es` is Spain), as its flag emoji. Chinese has none.
const flagOf = (acceptLanguage: string) => {
  const locale = new Intl.Locale(acceptLanguage);

  if (locale.language === 'zh') {
    return '';
  }

  return String.fromCodePoint(
    ...[...(locale.maximize().region ?? '')].map((letter) => {
      return 0x1f1e6 + letter.charCodeAt(0) - 'A'.charCodeAt(0);
    })
  );
};

export { flagOf };
