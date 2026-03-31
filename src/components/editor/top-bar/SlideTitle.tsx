"use client";

import { useState, useRef, useEffect } from "react";
import { useEditorStore } from "@/store/editorStore";

export function SlideTitle() {
  const currentSlideId = useEditorStore((state) => state.currentSlideId);
  const slide = useEditorStore((state) => 
    state.slides.find((s) => s.id === currentSlideId)
  );
  const currentSlideIndex = useEditorStore((state) =>
    Math.max(0, state.slides.findIndex((s) => s.id === currentSlideId))
  );
  const updateSlide = useEditorStore((state) => state.updateSlide);

  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(slide?.title ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync temp title if slide changes externally
  useEffect(() => {
    if (slide) {
      setTempTitle(slide.title);
    }
  }, [slide?.title, slide?.id]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleCommit = () => {
    setIsEditing(false);
    if (slide && tempTitle.trim() && tempTitle !== slide.title) {
      updateSlide(slide.id, { title: tempTitle.trim() });
    } else if (slide) {
      setTempTitle(slide.title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setTempTitle(slide?.title ?? "");
    }
  };

  if (!slide) return null;

  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400 leading-tight">
        Bài học: Bảo hiểm cơ bản
      </p>
      <div className="flex items-center gap-1.5 h-6">
        <span className="text-sm font-medium text-slate-400 select-none">
          Slide {currentSlideIndex + 1} ·
        </span>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={handleCommit}
            onKeyDown={handleKeyDown}
            className="text-sm font-medium text-slate-700 bg-slate-100/80 outline-none border-b-2 border-blue-500 px-1.5 -ml-1.5 rounded-sm w-56 h-6 transition-all focus:bg-white shadow-sm"
          />
        ) : (
          <span
            onClick={() => setIsEditing(true)}
            className="text-sm font-medium text-slate-700 cursor-text hover:bg-slate-100/50 px-1.5 -ml-1.5 py-0.5 rounded-sm transition-colors truncate max-w-[300px]"
            title="Click to rename slide"
          >
            {slide.title}
          </span>
        )}
      </div>
    </div>
  );
}
