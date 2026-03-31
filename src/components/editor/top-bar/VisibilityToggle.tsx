"use client";

import { memo } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VisibilityToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const VisibilityToggle = memo(function VisibilityToggle({
  isVisible,
  onToggle
}: VisibilityToggleProps) {
  // Pure Component: No internal store hooks.
  // Performance: Skips re-render if props (isVisible, onToggle) don't change.
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-slate-500"
      onClick={onToggle}
      title={isVisible ? "Ẩn các phần tử bị ẩn" : "Hiện các phần tử bị ẩn"}
    >
      {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
    </Button>
  );
});
