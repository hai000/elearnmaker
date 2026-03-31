"use client";

import { Badge } from "@/components/ui/badge";
import type { EditorEvent } from "@/store/editorStore";

type EventLogPanelProps = {
  editorEvents: EditorEvent[];
};

export function TimelineEventLog({ editorEvents }: EventLogPanelProps) {
  const latestEvent = editorEvents[editorEvents.length - 1] ?? null;

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Sự kiện hệ thống
        </p>
        <Badge variant="secondary" className="text-xs font-normal">
          {editorEvents.length}
        </Badge>
      </div>
      <div className="grid gap-2">
        {(editorEvents.length ? editorEvents.slice(-3).reverse() : [null]).map((event, index) => (
          <div
            key={event ? event.id : `empty-${index}`}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600"
          >
            {event ? (
              <>
                <div className="font-medium text-slate-800">{event.type}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Slide: {event.slideId}
                  {event.elementId ? ` · Element: ${event.elementId}` : ""}
                </div>
              </>
            ) : (
              <span>Chưa có sự kiện nào</span>
            )}
          </div>
        ))}
      </div>
      {latestEvent ? (
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
          Mới nhất: {latestEvent.type}
        </div>
      ) : null}
    </div>
  );
}
