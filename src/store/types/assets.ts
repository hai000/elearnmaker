export type MediaAsset = {
  id: string;
  name: string;
  url: string;
  type: "audio" | "image" | "video";
  size: number;
  createdAt: number;
};
