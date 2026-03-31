"use client";

import * as React from "react";
import { Palette } from "lucide-react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const defaultSwatches = [
  "#0F172A",
  "#334155",
  "#2563EB",
  "#14B8A6",
  "#F59E0B",
  "#EF4444",
];

type ColorPickerFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  swatches?: string[];
  description?: string;
  className?: string;
};

function ColorPickerField({
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
    if (!open) {
      return;
    }

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      const panelWidth = Math.min(288, window.innerWidth - 16);
      const left = Math.min(Math.max(8, rect.left), window.innerWidth - panelWidth - 8);
      const top = rect.bottom + 8;

      setPosition({ top, left, width: panelWidth });
    };

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (popoverRef.current?.contains(target) || triggerRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

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
        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          {value}
        </span>
      </div>
      <button
        type="button"
        ref={triggerRef}
        aria-expanded={open}
        aria-controls={colorId}
        onClick={() => setOpen((current) => !current)}
        className="group flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-left transition hover:border-slate-300 hover:bg-slate-50"
      >
        <span
          className="h-10 w-10 shrink-0 rounded-lg border border-white/80 shadow-[inset_0_1px_2px_rgba(15,23,42,0.12)]"
          style={{ backgroundColor: value }}
          aria-hidden="true"
        />
        <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium text-slate-900">Mở bộ chọn màu</span>
            <span className="block text-xs text-slate-500">{description}</span>
        </span>
        <Palette className="size-4 text-slate-400 transition group-hover:text-slate-600" />
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={popoverRef}
              id={colorId}
              className="fixed z-50 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl"
              style={{ top: position.top, left: position.left, width: position.width }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-900">Chọn màu</div>
                  <div className="text-xs text-slate-500">Mẫu màu và công cụ chọn sẽ ở dạng nổi</div>
                </div>
                <span
                  className="h-8 w-8 shrink-0 rounded-lg border border-slate-200"
                  style={{ backgroundColor: value }}
                  aria-hidden="true"
                />
              </div>

              <div className="mt-3 flex gap-2 overflow-x-auto px-1 py-1 pb-2">
                {swatches.map((swatch) => {
                  const active = swatch.toLowerCase() === value.toLowerCase();

                  return (
                    <button
                      key={swatch}
                      type="button"
                      title={swatch}
                      aria-label={`Set ${label} to ${swatch}`}
                      onClick={() => onChange(swatch)}
                      className={cn(
                        "h-8 w-8 shrink-0 rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
                        active ? "border-slate-900 ring-2 ring-slate-900 ring-offset-2" : "border-white/80 shadow-sm hover:scale-105"
                      )}
                      style={{ backgroundColor: swatch }}
                    />
                  );
                })}
              </div>

              <div className="mt-3 grid gap-2">
                <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Tùy chỉnh
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
                  <span
                    className="h-8 w-8 shrink-0 rounded-lg border border-slate-200"
                    style={{ backgroundColor: value }}
                    aria-hidden="true"
                  />
                  <Input
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoComplete="off"
                    inputMode="text"
                    className="h-8 border-0 bg-transparent px-2 font-mono text-sm shadow-none focus-visible:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => nativeInputRef.current?.click()}
                    className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                  >
                    Mở chọn màu
                  </button>
                  <input
                    ref={nativeInputRef}
                    type="color"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="sr-only"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

export { ColorPickerField };