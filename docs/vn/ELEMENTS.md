# Element Reference

Tài liệu này mô tả các element hiện có trong Studio, các thuộc tính chính và hành vi runtime/preview.


## 1. Mô hình chung

Mỗi element trong editor đều có các field nền tảng:

- `id`: định danh duy nhất.
- `type`: loại element.
- `slideId`: slide mà element thuộc về.
- `x`, `y`: vị trí tuyệt đối trên canvas.
- `width`, `height`: kích thước.
- `rotation`: góc xoay.
- `borderRadius`: bo góc.
- `zIndex`: thứ tự hiển thị (lớp).
- `hidden`: cờ đánh dấu phần tử ẩn khi slide bắt đầu.
- `name`: tên gợi nhớ để định danh khi dùng Trigger (vd: "Nút Gợi ý").
- `animation`: hiệu ứng xuất hiện (fade, zoom, slide, bounce...).
- `props`: dữ liệu riêng theo từng element.

Nguyên tắc quan trọng:

- Canvas render theo mô hình absolute positioning.
- Element không lưu HTML.
- Mỗi element là một React component độc lập trong `src/components/elements/*`.
- Panel chỉnh sửa của element nằm ở `src/components/panels/*`.

## 2. Slide model

Editor hiện có model slide thật:

- `slides`: danh sách slide trong store.
- `currentSlideId`: slide đang được hiển thị trong canvas/preview.

Hệ quả:

- Canvas chỉ render element có `slideId` khớp với `currentSlideId`.
- Preview cũng render cùng slide hiện tại.
- Action `go_to_slide` của Button sẽ đổi `currentSlideId`.

## 3. Element Text

Type: `text`

Props:

- `title`: tiêu đề.
- `body`: nội dung.
- `titleSize`: cỡ chữ tiêu đề.
- `bodySize`: cỡ chữ nội dung.
- `textColor`: màu chữ.
- `backgroundColor`: màu nền.

Hành vi:

- Hiển thị như một card nội dung ngắn.
- Dùng khi cần mô tả, nhấn ý chính hoặc giải thích nhanh.

## 4. Element Card

Type: `card`

Props:

- `title`
- `body`
- `titleSize`
- `bodySize`
- `textColor`
- `backgroundColor`

Hành vi:

- Tương tự Text nhưng dùng như một khối thông tin nổi bật hơn.
- Phù hợp cho module, summary, nội dung mở đầu.

## 5. Element Image

Type: `image`

Props:

- `imageUrl`: URL ảnh.

Hành vi:

- Nếu có URL thì render ảnh.
- Nếu chưa có URL thì hiển thị trạng thái gợi ý thêm ảnh.

## 6. Element Video

Type: `video`

Props:

- `videoUrl`: URL video.

Hành vi:

- Render video player khi có URL.
- Nếu chưa có URL thì hiển thị placeholder.

## 7. Element Quiz

Type: `quiz`

Props:

- `title`: tiêu đề quiz.
- `options`: danh sách lựa chọn.
- `titleSize`: cỡ chữ tiêu đề.
- `optionSize`: cỡ chữ lựa chọn.
- `textColor`: màu chữ.
- `backgroundColor`: màu nền.

Hành vi:

- Hiển thị một danh sách lựa chọn dạng badge.
- Hiện tại là phần tử hiển thị tương tác, chưa có cơ chế chấm điểm.

## 8. Element Button

Type: `button`

Props:

- `label`: chữ hiển thị trên nút.
- `textColor`: màu chữ.
- `backgroundColor`: màu nền.
- `actionType`: kiểu action, gồm:
  - `none`
  - `go_to_slide`
  - `trigger`
- `targetSlideId`: slide đích khi action là `go_to_slide`.
- `triggerName`: tên trigger khi action là `trigger`.
- `buttonSize`: cỡ chữ của nút.

Hành vi:

- Trong editor, Button vẫn là một element có thể chọn, kéo và resize như các element khác.
- Trong preview/runtime:
  - `none`: không làm gì.
  - `go_to_slide`: chuyển sang slide có `id` tương ứng với `targetSlideId`.
  - `trigger`: kích hoạt một trigger logic, hiện tại được mô phỏng bằng message trong preview.

Gợi ý dùng:

- Dùng cho CTA như Start, Next, Open Quiz, Jump to section.
- Dùng `go_to_slide` khi cần điều hướng theo flow bài học.
- Dùng `trigger` khi muốn mở rộng sang rule khác, ví dụ show hint, mở modal, bật audio.

## 9. Element Wheel Plugin

Type: `wheel_plugin`

Props:

- `title`
- `mode`
- `titleSize`
- `textColor`
- `backgroundColor`

Hành vi:

- Dùng như một plugin mẫu cho element dạng gamification.
- Có thể mở rộng thêm logic riêng theo plugin registry.

## 10. Ghi chú về preview

Preview hiện hỗ trợ 3 device profile:

- Desktop
- Tablet
- Mobile landscape

Preview render cùng dữ liệu slide thật trong store, nên các action của Button sẽ hoạt động theo slide hiện tại.
