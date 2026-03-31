export const getAlphaFromHex = (hex: string): number => {
  if (hex && hex.length === 9) {
    return parseInt(hex.slice(7, 9), 16) / 255;
  }
  return 1;
};

export const setAlphaToHex = (hex: string, alpha: number): string => {
  if (!hex) return "#000000";
  const base = hex.length >= 7 ? hex.slice(0, 7) : hex;
  const a = Math.round(alpha * 255).toString(16).padStart(2, "0").toUpperCase();
  return `${base}${a}`;
};
