# Quy tắc và Tiêu chuẩn Lập trình Studio


Để đảm bảo dự án có thể bảo trì lâu dài, mở rộng tốt và duy trì chất lượng mã nguồn cao, tất cả người tham gia phát triển bắt buộc phải tuân thủ nghiêm ngặt các nguyên tắc dưới đây.

## 1. Nguyên tắc DRY (Don't Repeat Yourself)
Tránh lặp lại logic bằng mọi giá.
- Nếu một mẫu giao diện (UI pattern) xuất hiện ở 2 nơi trở lên, hãy tách nó thành một component dùng chung trong `src/components/ui/` hoặc thư mục con tương ứng.
- Các logic xử lý hoặc tính toán dùng chung nên được đặt trong `src/store/utils.ts` hoặc tạo custom hook.

## 2. Quy tắc Chia nhỏ File (Tối đa ~150 dòng)
Các file nhỏ, tập trung sẽ dễ đọc, dễ kiểm tra và dễ gỡ lỗi hơn.
- **Giới hạn**: 150 dòng là mốc chuẩn. Khi một file vượt quá con số này, nó bắt buộc phải được xem xét để tái cấu trúc (refactor).
- **Hành động**: Tách các logic chức năng thành custom hooks (ví dụ: `useCanvasInteraction`, `useTextEdit`).
- **Phân rã**: Chia nhỏ các cây JSX lớn thành các component con (ví dụ: `SlideProperties`, `ElementActions`, `ThumbnailItem`).

## 3. Tiêu chuẩn Công nghệ và Giao diện
- **Ưu tiên Component**: Luôn ưu tiên sử dụng các component từ **Shadcn UI** (nằm trong `src/components/ui/`) cho các ô nhập liệu, nút bấm và cấu trúc layout.
- **An toàn Kiểu (Type Safety)**: Duy trì các định nghĩa TypeScript chặt chẽ trong `src/store/types.ts`. Hạn chế tối đa việc sử dụng `any`.
- **Styling**: Sử dụng **Tailwind CSS** cho bố cục và **Vanilla CSS** (thông qua inline styles hoặc index.css) chỉ khi cần tính toán tọa độ chính xác hoặc các giá trị HSL động.

## 4. Quy tắc Kiến trúc
- **Quản lý Trạng thái**: Toàn bộ trạng thái dùng chung giữa các component phải nằm trong **Zustand** store (`src/store/editorStore.ts`).
- **Định vị Tuyệt đối**: Mỗi thành phần trên Canvas phải sử dụng `position: absolute` với dữ liệu tọa độ (x, y, width, height) được quản lý bởi store.
- **Hành vi Render**: Các element trên Canvas nên là các component "dumb" (chỉ nhận dữ liệu qua props hoặc selector). Logic cập nhật trạng thái phải được tập trung tại store actions.

## 5. Quy tắc Cập nhật Tài liệu
Để đảm bảo hệ thống hướng dẫn không bị lạc hậu so với tính năng thực tế:
- **Nguyên tắc**: Mỗi khi hoàn thành một tính năng mới (Element mới, logic mới) hoặc sửa lỗi UI/UX, bắt buộc phải cập nhật nội dung tương ứng vào file [**README.md**](../../README.md) của thư mục gốc hoặc các file chi tiết như [**FEATURES.md**](FEATURES.md).
- **Yêu cầu**: Cập nhật ngày tháng "Last updated" ở cuối các file tài liệu sau mỗi lần chỉnh sửa.

---
*Cập nhật lần cuối: 31/03/2026*
