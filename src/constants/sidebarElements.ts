import type { SlideElement } from "@/store/editorStore";

export const elementItems = ["Text", "Shapes", "Images", "Video", "Audio", "Button"] as const;
export const interactionItems = ["Quiz", "Poll", "Flashcards"] as const;
export const pluginItems = ["Mind Map", "Timeline", "Wheel", "Game"] as const;

export type ElementItem = typeof elementItems[number];

export const elementInitialData: Record<string, Omit<SlideElement, "id" | "slideId">> = {
  Text: {
    type: "text",
    x: 270,
    y: 170,
    width: 260,
    height: 110,
    rotation: 0,
    borderRadius: 20,
    props: {
      title: "New Text",
      body: "Edit this text in the properties panel.",
      titleSize: 16,
      bodySize: 12,
      textColor: "#1d4ed8",
      backgroundColor: "#eff6ff",
    },
  },
  Images: {
    type: "image",
    x: 270,
    y: 180,
    width: 260,
    height: 90,
    rotation: 0,
    borderRadius: 16,
    props: {
      imageUrl: "",
    },
  },
  Video: {
    type: "video",
    x: 240,
    y: 135,
    width: 320,
    height: 180,
    rotation: 0,
    borderRadius: 16,
    props: {
      videoUrl: "",
    },
  },
  Button: {
    type: "button",
    x: 310,
    y: 198,
    width: 180,
    height: 54,
    rotation: 0,
    borderRadius: 16,
    props: {
      label: "Click me",
      textColor: "#ffffff",
      backgroundColor: "#2563eb",
      actionType: "none",
      targetSlideId: "",
      triggerName: "",
      buttonSize: 15,
    },
  },
  Quiz: {
    type: "quiz",
    x: 200,
    y: 100,
    width: 400,
    height: 300,
    rotation: 0,
    borderRadius: 16,
    props: {
      title: "Multiple Choice Question",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctIndex: 0,
      retryLabel: "Try Again",
      titleSize: 18,
      optionSize: 14,
      textColor: "#1e293b",
      backgroundColor: "#f8fafc",
    },
  },
  Audio: {
    type: "audio",
    x: 20,
    y: 20,
    width: 280,
    height: 60,
    rotation: 0,
    borderRadius: 12,
    props: {
      audioUrl: "",
      autoplay: false,
      loop: false,
      controls: true,
      volume: 0.8,
    },
  },
};
