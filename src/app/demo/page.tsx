import type { Metadata } from "next";
import { DemoViewer } from "./DemoViewer";

export const metadata: Metadata = {
  title: "Studio | Demo",
  description: "Trải nghiệm bài giảng mẫu từ Studio",

  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function DemoPage() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      <DemoViewer />
    </main>
  );
}
