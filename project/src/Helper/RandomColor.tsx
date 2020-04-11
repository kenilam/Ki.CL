import Color from 'color';

function RandomColor(hex?: string): Color {
  if (hex) {
    return Color(hex);
  }

  const value = Math.floor(Math.random() * 16777215).toString(16);

  if (value.length < 6) {
    return RandomColor();
  }

  return Color(`#${value}`);
}

export default RandomColor;
