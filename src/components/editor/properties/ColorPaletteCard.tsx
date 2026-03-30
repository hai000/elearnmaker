import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const palette = [
  { label: "Midnight", value: "#0F172A" },
  { label: "Ocean", value: "#2563EB" },
  { label: "Amber", value: "#F59E0B" },
];

export function ColorPaletteCard() {
  return (
    <Card className="mx-px">
      <CardHeader>
        <CardTitle className="text-base">Colors</CardTitle>
        <CardDescription>Quick palette references for the active element.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {palette.map((item) => (
            <div
              key={item.value}
              className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-3"
            >
              <div
                className="h-10 rounded-xl border border-white/70 shadow-[inset_0_1px_2px_rgba(15,23,42,0.15)]"
                style={{ backgroundColor: item.value }}
                aria-hidden="true"
              />
              <div className="grid gap-0.5">
                <span className="text-sm font-medium text-slate-900">{item.label}</span>
                <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
