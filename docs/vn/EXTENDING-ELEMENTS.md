# Mở rộng Element

Tài liệu này mô tả quy trình thêm một element mới vào ElearnMaker Studio.

## 1. Mục tiêu

Mỗi element mới cần đủ 3 lớp chính:

- Data model trong store.
- Canvas renderer để hiển thị trên slide.
- Properties panel để chỉnh dữ liệu.

Nếu element có hành vi đặc biệt trong preview/runtime, hãy truyền handler riêng từ layout/preview thay vì gắn logic trực tiếp trong component UI.

## 2. Thêm type và props vào store

Mở `src/store/editorStore.ts` và khai báo type mới trong `SlideElement`.

Ví dụ:

```ts
type VideoElement = ElementBase & {
  type: "video";
  props: {
    videoUrl: string;
  };
};

export type SlideElement =
  | TextElement
  | CardElement
  | QuizElement
  | ImageElement
  | VideoElement
  | ButtonElement
  | WheelPluginElement;
```

Nếu element mới cần dữ liệu khởi tạo, thêm nó vào:

- `initialElements` để có sẵn khi mở editor.
- `LeftSidebar` để người dùng thêm mới từ library.

## 3. Tạo canvas renderer

Tạo file trong `src/components/elements/`. 

> [!IMPORTANT]
> Bạn **bắt buộc** phải sử dụng `ElementShell` bao ngoài nội dung của mình. `ElementShell` không chỉ xử lý việc chọn/di chuyển mà còn tự động áp dụng các hiệu ứng **Animation** mà người dùng đã thiết lập.

Ví dụ:

```tsx
import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";

export default function VideoElement({ element, isSelected, onSelect, interactive, elementRef }: CanvasElementProps) {
  if (element.type !== "video") {
    return null;
  }

  return (
    <ElementShell
      element={element}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      className="rounded-2xl border border-slate-200 bg-white"
      ref={elementRef}
    >
      {/* Nội dung thực tế của element nằm ở đây */}
      {element.props.videoUrl ? (
        <video src={element.props.videoUrl} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
          Chưa có Video
        </div>
      )}
    </ElementShell>
  );
}
```

## 4. Tạo properties panel

Tạo file trong `src/components/panels/`.

> [!TIP]
> Hãy luôn nhúng `<VisibilityProperties />` vào cuối bảng thuộc tính. Điều này giúp element của bạn tự động có các tính năng: Đặt tên định danh, Ẩn/Hiện khi bắt đầu và **Menu chọn hiệu ứng Animation**.

Ví dụ:

```tsx
import type { PropertiesPanelProps } from "@/plugins/registry";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VideoProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "video") {
    return null;
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label>Video URL</Label>
        <Input
          value={element.props.videoUrl}
          onChange={(e) => updateElement(element.id, { props: { ...element.props, videoUrl: e.target.value } })}
        />
      </div>

      {/* Tự động thêm cấu hình Ẩn/Hiện và Animation */}
      <VisibilityProperties element={element} updateElement={updateElement} />
    </div>
  );
}
```

## 5. Đăng ký vào plugin registry

Mở `src/plugins/registry.tsx` và thêm element vào `pluginRegistry`.

Ví dụ:

```tsx
import VideoElement from "@/components/elements/VideoElement";
import VideoProperties from "@/components/panels/VideoProperties";

export const pluginRegistry = {
  ...,
  video: {
    canvasComponent: VideoElement,
    propertiesPanel: VideoProperties,
  },
};
```

## 6. Kiểm tra hành vi preview

Nếu element mới cần tương tác đặc biệt:

- Truyền handler từ preview/runtime.
- Không hard-code logic điều hướng hay trigger trong component UI.
- Nếu cần action kiểu button, hãy mô hình hóa trong `props` để lưu được cùng dữ liệu slide.

## 7. Quy ước nên giữ

- Element phải render theo `slideId` nếu thuộc slide cụ thể.
- Props nên đủ rõ để panel có thể chỉnh mà không cần hiểu logic runtime.
- Không lưu HTML trong dữ liệu element.
- Nên giữ element độc lập để dễ tái sử dụng hoặc chuyển sang plugin sau này.
