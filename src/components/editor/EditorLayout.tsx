"use client";

import { useState } from "react";

import EditorBackground from "./EditorBackground";
import TopBar from "./TopBar";
import LeftSidebar from "./LeftSidebar";
import CanvasArea from "@/components/editor/CanvasArea";
import Timeline from "./Timeline";
import PropertiesPanel from "./PropertiesPanel";
import PreviewOverlay from "./PreviewOverlay";
import { useEditorStore } from "@/store/editorStore";

export default function EditorLayout() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const selectElement = useEditorStore((state) => state.selectElement);

  return (
    <div className="relative h-screen overflow-hidden bg-background text-foreground">
      <EditorBackground />

      <div className="flex h-full min-h-0 flex-col">
        <TopBar
          onOpenPreview={() => {
            selectElement(null);
            setPreviewOpen(true);
          }}
        />

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <LeftSidebar />

          <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <CanvasArea />
            <Timeline />
          </main>

          <PropertiesPanel />
        </div>
      </div>

      <PreviewOverlay open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </div>
  );
}
