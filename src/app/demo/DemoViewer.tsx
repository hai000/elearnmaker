"use client";

import { useEffect } from "react";
import { useEditorStore } from "@/store/editorStore";
import { initialSlides, initialElements } from "@/store/initialState";
import { StandaloneViewer } from "@/components/viewer/StandaloneViewer";

export function DemoViewer() {
  const setSlides = useEditorStore.setState;

  useEffect(() => {
    // Load the sample lesson into the editor store
    setSlides({
      slides: initialSlides,
      elements: initialElements,
      currentSlideId: initialSlides[0].id,
      selectedId: null,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <StandaloneViewer />;
}
