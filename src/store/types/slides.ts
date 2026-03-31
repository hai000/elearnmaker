export type Slide = {
  id: string;
  title: string;
  backgroundColor?: string;
  animation?: string;
  minDuration?: number; // Minimum viewing time in seconds
};
