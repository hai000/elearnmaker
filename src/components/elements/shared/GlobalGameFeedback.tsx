"use client";

import React from "react";
import { useEditorStore } from "@/store/editorStore";
import { GameFeedback } from "./GameFeedback";

export function GlobalGameFeedback() {
  const feedback = useEditorStore((state) => state.gameFeedback);
  const setGameFeedback = useEditorStore((state) => state.setGameFeedback);

  const handleDismiss = () => {
    if (feedback?.onDismiss) feedback.onDismiss();
    setGameFeedback(null);
  };

  const handleRetry = () => {
    if (feedback?.onRetry) feedback.onRetry();
    setGameFeedback(null);
  };

  return (
    <GameFeedback
      isVisible={!!feedback}
      status={feedback?.status || "success"}
      title={feedback?.title}
      message={feedback?.message}
      onDismiss={handleDismiss}
      onRetry={handleRetry}
    />
  );
}
