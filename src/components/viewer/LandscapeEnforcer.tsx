"use client";

import { Smartphone } from "lucide-react";

export function LandscapeEnforcer() {
  return (
    <div className="portrait-lock fixed inset-0 z-[99999] bg-slate-900 flex-col items-center justify-center text-center p-8 hidden landscape:hidden">
      <div className="relative mb-8">
        <Smartphone className="w-20 h-20 text-blue-400 animate-[pulse_2s_ease-in-out_infinite] rotate-90" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">Vui lòng xoay ngang màn hình</h2>
      <p className="text-slate-300 max-w-[320px] text-sm leading-relaxed">
        Bài học tương tác này được thiết kế theo tỷ lệ chuẩn 16:9. Hãy xoay ngang thiết bị của bạn để hiển thị đầy đủ nội dung.
      </p>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 800px) and (orientation: portrait) {
          .portrait-lock { display: flex !important; }
        }
      `}} />
    </div>
  );
}
