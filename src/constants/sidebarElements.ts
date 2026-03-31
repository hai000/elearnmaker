import type { SlideElement } from "@/store/editorStore";
import { 
  Type, 
  Square, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Music, 
  MousePointer2, 
  CheckSquare, 
  ListOrdered,
  Circle as CircleIcon,
  Minus,
  Layout
} from "lucide-react";

export const SIDEBAR_CATEGORIES = [
  {
    display: "Nội dung & Bố cục",
    items: [
      { id: "Text", icon: Type, label: "Văn bản" },
      { id: "Card", icon: Layout, label: "Thẻ nội dung" },
      { id: "Button", icon: MousePointer2, label: "Nút bấm" },
    ]
  },
  {
    display: "Đa phương tiện",
    items: [
      { id: "Images", icon: ImageIcon, label: "Hình ảnh" },
      { id: "Video", icon: VideoIcon, label: "Video" },
      { id: "Audio", icon: Music, label: "Âm thanh" },
    ]
  },
  {
    display: "Tương tác học tập",
    items: [
      { id: "Quiz", icon: CheckSquare, label: "Câu hỏi trắc nghiệm" },
      { id: "Sort", icon: ListOrdered, label: "Sắp xếp quy trình" },
    ]
  },
  {
    display: "Hình khối cơ bản",
    items: [
      { id: "Rectangle", icon: Square, label: "Hình chữ nhật" },
      { id: "Circle", icon: CircleIcon, label: "Hình tròn" },
      { id: "Line", icon: Minus, label: "Đường kẻ" },
    ]
  }
];

export const elementInitialData: Record<string, Omit<SlideElement, "id" | "slideId">> = {
  Text: {
    type: "text",
    x: 270,
    y: 170,
    width: 260,
    height: 100,
    rotation: 0,
    borderRadius: 0,
    props: {
      text: "Nhấp đúp để chỉnh sửa văn bản này.",
      fontSize: 20,
      textColor: "#1d4ed8",
      backgroundColor: "transparent",
    },
  },
  Card: {
    type: "card",
    x: 250,
    y: 150,
    width: 400,
    height: 180,
    rotation: 0,
    borderRadius: 20,
    props: {
      title: "Tiêu đề thẻ",
      body: "Đây là nội dung mô tả của thẻ. Bạn có thể nhấp đúp để sửa trực tiếp cả tiêu đề và nội dung.",
      titleSize: 22,
      bodySize: 15,
      textColor: "#1e293b",
      backgroundColor: "#ffffff",
    },
  },
  Images: {
    type: "image",
    x: 270,
    y: 180,
    width: 260,
    height: 180,
    rotation: 0,
    borderRadius: 16,
    props: {
      imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop",
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
      videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
  },
  Button: {
    type: "button",
    x: 310,
    y: 198,
    width: 200,
    height: 54,
    rotation: 0,
    borderRadius: 50,
    props: {
      label: "Bấm vào đây →",
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
    height: 280,
    rotation: 0,
    borderRadius: 24,
    props: {
      title: "Câu hỏi trắc nghiệm của bạn?",
      options: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
      correctIndex: 0,
      retryLabel: "Thử lại nhé!",
      titleSize: 18,
      optionSize: 14,
      textColor: "#1e293b",
      backgroundColor: "#ffffff",
    },
  },
  Audio: {
    type: "audio",
    x: 20,
    y: 20,
    width: 300,
    height: 80,
    rotation: 0,
    borderRadius: 12,
    props: {
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      autoplay: false,
      loop: false,
      controls: true,
      volume: 0.8,
    },
  },
  Sort: {
    type: "sort_game",
    x: 200,
    y: 80,
    width: 450,
    height: 380,
    rotation: 0,
    borderRadius: 20,
    props: {
      title: "Sắp xếp theo thứ tự đúng",
      items: [
        "Bước 1: Chuẩn bị",
        "Bước 2: Thực hiện",
        "Bước 3: Kiểm tra",
        "Bước 4: Hoàn tất"
      ],
      checkLabel: "Kiểm tra đáp án",
      titleSize: 18,
      itemSize: 14,
      textColor: "#1e293b",
      backgroundColor: "#ffffff",
    },
  },
  Rectangle: {
    type: "shape",
    x: 200,
    y: 200,
    width: 200,
    height: 150,
    rotation: 0,
    borderRadius: 8,
    props: {
      shapeType: "rectangle",
      fillColor: "#cbd5e1",
      strokeColor: "#64748b",
      strokeWidth: 2,
    },
  },
  Circle: {
    type: "shape",
    x: 200,
    y: 200,
    width: 150,
    height: 150,
    rotation: 0,
    borderRadius: 999,
    props: {
      shapeType: "circle",
      fillColor: "#93c5fd",
      strokeColor: "#3b82f6",
      strokeWidth: 2,
    },
  },
  Line: {
    type: "shape",
    x: 200,
    y: 200,
    width: 300,
    height: 4,
    rotation: 0,
    borderRadius: 0,
    props: {
      shapeType: "line",
      fillColor: "#94a3b8",
      strokeColor: "#94a3b8",
      strokeWidth: 0,
    },
  },
};
