"use client";

import * as React from "react";
import { Palette } from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { getAlphaFromHex, setAlphaToHex } from "./utils";

const defaultSwatches = [
  "#0F172A",
  "#334155",
  "#2563EB",
  "#14B8A6",
  "#F59E0B",
  "#EF4444",
];

const ColorPreview = ({ value, size = "h-8 w-8" }: { value: string, size?: string }) => (
  <span className={cn("relative shrink-0 overflow-hidden rounded-lg border border-slate-200", size)}>
    <span className="bg-checkered absolute inset-0" aria-hidden="true" />
    <span
      className="absolute inset-0"
      style={{ backgroundColor: value }}
      aria-hidden="true"
    />
  </span>
);

const SwatchItem = ({ swatch, active, onClick }: { swatch: string, active: boolean, onClick: () => void }) => (
  <button
    type="button"
    title={swatch}
    onClick={onClick}
    className={cn(
      "relative h-8 w-8 shrink-0 overflow-hidden rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
      active ? "border-slate-900 ring-2 ring-slate-900 ring-offset-2" : "border-white/80 shadow-sm hover:scale-105"
    )}
  >
    <span className="bg-checkered absolute inset-0" aria-hidden="true" />
    <span className="absolute inset-0" style={{ backgroundColor: swatch }} />
  </button>
);

const AlphaControl = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const alpha = getAlphaFromHex(value);
  const baseColor = value.length === 9 ? value.slice(0, 7) : value;

  return (
    <div className="mt-4 grid gap-2 border-t border-slate-100 pt-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          Độ trong suốt
        </label>
        <span className="font-mono text-[10px] font-bold text-slate-400">
          {Math.round(alpha * 100)}%
        </span>
      </div>
      <div className="px-1 py-1">
        <Slider
          value={[alpha * 100]}
          min={0}
          max={100}
          step={1}
          onValueChange={([val]) => onChange(setAlphaToHex(baseColor, val / 100))}
        />
      </div>
    </div>
  );
};

export type ColorPickerFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  swatches?: string[];
  description?: string;
  className?: string;
};

export function ColorPickerField({
  label,
  value,
  onChange,
  swatches = defaultSwatches,
  description = "Bấm để mở bảng màu hoặc chọn nhanh một mẫu",
  className,
}: ColorPickerFieldProps) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const nativeInputRef = React.useRef<HTMLInputElement>(null);
  const colorId = React.useId();
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0 });

  React.useEffect(() => {
    if (!open) return;
    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const panelWidth = Math.min(288, window.innerWidth - 16);
      const left = Math.min(Math.max(8, rect.left), window.innerWidth - panelWidth - 8);
      const top = rect.bottom + 8;
      setPosition({ top, left, width: panelWidth });
    };
    const onPointerDown = (e: MouseEvent) => {
      if (!popoverRef.current?.contains(e.target as Node) && !triggerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={colorId}>{label}</Label>
        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{value}</span>
      </div>
      <button type="button" ref={triggerRef} onClick={() => setOpen(o => !o)} className="group flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-left transition hover:border-slate-300 hover:bg-slate-50">
        <ColorPreview value={value} size="h-10 w-10" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-slate-900">Mở bộ chọn màu</span>
          <span className="block text-xs text-slate-500">{description}</span>
        </span>
        <Palette className="size-4 text-slate-400 transition group-hover:text-slate-600" />
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div ref={popoverRef} id={colorId} className="fixed z-50 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl" style={{ top: position.top, left: position.left, width: position.width }}>
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2">
            <div className="min-w-0">
              <div className="text-sm font-medium text-slate-900">Chọn màu</div>
              <div className="text-xs text-slate-500">Mẫu màu và công cụ chọn</div>
            </div>
            <ColorPreview value={value} />
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto px-1 py-1 pb-2">
            {swatches.map(s => <SwatchItem key={s} swatch={s} active={s.toLowerCase() === value.toLowerCase()} onClick={() => onChange(s)} />)}
          </div>
          <div className="mt-3 grid gap-2">
            <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Tùy chỉnh</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
              <ColorPreview value={value} />
              <Input value={value} onChange={e => onChange(e.target.value)} spellCheck={false} className="h-8 border-0 bg-transparent px-2 font-mono text-sm focus-visible:ring-0" />
              <button type="button" onClick={() => nativeInputRef.current?.click()} className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100">Mở</button>
              <input ref={nativeInputRef} type="color" value={value.length === 9 ? value.slice(0, 7) : value} onChange={e => onChange(setAlphaToHex(e.target.value, getAlphaFromHex(value)))} className="sr-only" />
            </div>
          </div>
          <AlphaControl value={value} onChange={onChange} />
        </div>,
        document.body
      )}
    </div>
  );
}
