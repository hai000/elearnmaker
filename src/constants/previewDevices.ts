export type DeviceOption = {
  id: "desktop" | "tablet" | "mobile";
  label: string;
  width: number;
  height: number;
  hint: string;
};

export const baseSlide = { width: 960, height: 540 };

export const deviceOptions: DeviceOption[] = [
  { id: "desktop", label: "Máy tính để bàn", width: 1280, height: 720, hint: "16:9" },
  { id: "tablet", label: "Máy tính bảng", width: 1024, height: 768, hint: "4:3" },
  { id: "mobile", label: "Di động", width: 812, height: 375, hint: "Ngang" },
];
