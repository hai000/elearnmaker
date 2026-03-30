# ElearnMaker Studio

Trình chỉnh sửa e-learning tương tác với canvas kéo-thả và kiến trúc plugin.

## Nguyên tắc cốt lõi

- Không lưu HTML: dữ liệu slide được lưu dưới dạng dữ liệu kiểu JSON.
- Định vị tuyệt đối: canvas là `position: relative`, mỗi element là `position: absolute` với `top`/`left`.
- Kiến trúc module: mỗi element hoặc plugin là một React component độc lập nhận dữ liệu qua props.

## Cấu trúc dự án

- `src/store/` - Zustand store, được chia nhỏ thành:
  - `types.ts` - Định nghĩa kiểu dữ liệu cho element, slide, state.
  - `utils.ts` - Hàm tiện ích (tạo ID, snapshot, nhân bản).
  - `initialState.ts` - Dữ liệu mẫu slides và elements.
  - `editorStore.ts` - Chỉ chứa Actions (~230 dòng).
- `src/constants/` - Hằng số dùng chung (`previewDevices.ts`, `sidebarElements.ts`).
- `src/plugins/registry.tsx` - Registry trung tâm cho canvas và properties panel.
- `src/components/elements/*` - Canvas renderer cho từng element.
  - `quiz/` - Component Quiz tương tác.
- `src/components/panels/*` - Right sidebar properties panel.
- `src/components/editor/*` - Layout editor, chia thành thư mục con:
  - `canvas/` - `SelectionTransformControls` (bao bọc Moveable).
  - `preview/` - `PreviewHeader`, `PreviewViewport`.
  - `timeline/` - `SortableSlideCard`, `TimelineEventLog`.
  - `properties/` - `ColorPaletteCard`.

## Tài liệu tham chiếu

- [ELEMENTS.md](ELEMENTS.md) - mô tả toàn bộ element, props và hành vi.
- [EXTENDING-ELEMENTS.md](EXTENDING-ELEMENTS.md) - hướng dẫn thêm element mới.

## Slide và hệ thống sự kiện

Editor hiện dùng model slide thật thay vì một canvas chung:

- Slide được lưu trong `src/store/editorStore.ts`.
- Timeline có thể tạo, nhân bản, xóa và chuyển slide.
- Timeline cũng cho phép di chuyển thứ tự slide lên/xuống.
- Canvas và preview chỉ render slide đang active.
- Button action có thể chuyển slide hoặc phát ra event nội bộ của editor.

Timeline cũng hiển thị một log hệ thống nhỏ để dễ theo dõi hành vi runtime ngay trong editor.

## Data Loop kiểu Canva

Right sidebar render properties panel bằng cách tra cứu element đã chọn trong registry. Khi panel cập nhật dữ liệu, Zustand cập nhật state và canvas sẽ re-render ngay.

```tsx
const { selectedId, elements, updateElement } = useEditorStore();
const selected = elements.find((el) => el.id === selectedId);

if (!selected) {
	return <div>Hãy chọn một phần tử trên Canvas để chỉnh sửa.</div>;
}

const Panel = pluginRegistry[selected.type].propertiesPanel;

return <Panel element={selected} updateElement={updateElement} />;
```

Vì sao cách này mở rộng tốt:

- Không cần chuỗi if-else cho từng loại element.
- Plugin mới chỉ cần thêm một entry vào registry.
- Realtime editing dựa trên một nguồn dữ liệu duy nhất (Zustand).

## Button actions

Button hỗ trợ 3 chế độ action:

- `none`: chỉ là button hiển thị.
- `go_to_slide`: nhảy đến slide khác theo `targetSlideId`.
- `trigger`: phát ra một event nội bộ của editor.

Dùng `trigger` cho các tương tác như hint, mở modal, bật audio hoặc logic runtime tùy biến.

## Cập nhật gần đây (Trải nghiệm UI/UX & Tính năng)

- **Canvas tối ưu tỉ lệ**: Mở rộng hiển thị (`max-w-6xl`), loại bỏ nhãn Slide Title thừa.
- **Vị trí Element mới**: Element thêm mới từ Sidebar sẽ tự động xuất hiện **chính giữa** canvas.
- **Hệ thống phím tắt & Focus**:
  - Click vùng trống để hủy chọn (outfocus).
  - `Delete` / `Backspace` để xóa nhanh element đang chọn.
- **Undo / Redo (Ctrl+Z / Ctrl+Y)**:
  - Lưu lịch sử bằng snapshot vào Zustand với nút Undo/Redo trên TopBar.
  - Lưu tự động trước mỗi thao tác kéo/thả, thu phóng, xoay, chỉnh sửa.
- **Quiz tương tác**:
  - Học sinh click chọn đáp án → nhận phản hồi Đúng ✅ / Sai ❌ ngay lập tức.
  - Giáo viên chọn đáp án đúng qua dropdown trong Properties Panel.
  - Tùy chỉnh chữ nút thử lại (`retryLabel`) qua ô input riêng.
  - Editor và Preview hiển thị đồng bộ cùng layout.
- **Z-Index Fix**: Element được chọn tự động nổi lên trên cùng (`z-index: 50`).
- **Preview Deselect**: Mở Preview sẽ tự hủy chọn element, không còn lộ viền.
- **Refactor Component (Rule 150 dòng)**: Tất cả file lớn đã được chia nhỏ:
  - `editorStore.ts` → `types.ts` + `utils.ts` + `initialState.ts`
  - `Timeline.tsx` → `timeline/SortableSlideCard` + `TimelineEventLog`
  - `PreviewOverlay.tsx` → `preview/PreviewHeader` + `PreviewViewport`
  - `CanvasArea.tsx` → `canvas/SelectionTransformControls`
  - `PropertiesPanel.tsx` → `properties/ColorPaletteCard`
  - `LeftSidebar.tsx` → `constants/sidebarElements.ts`

## Tính năng & Cải tiến mới

### 1. Slide Timelock & Luật điều hướng
- **Thời gian xem tối thiểu**: Thêm thiết lập "Timelock" (0-60 giây) cho từng slide trong bảng Slide Properties.
- **Khóa chuyển slide**: Học sinh không thể nhấn các nút "Chuyển slide" cho đến khi thời gian khóa kết thúc.
- **Phản hồi trực quan**: 
    - **Thông báo đếm ngược**: Hiển thị thông báo (ví dụ: `🔒 Bạn cần xem thêm 5s nữa`) khi cố tình chuyển slide sớm.
    - **Thanh tiến trình (Progress Bar)**: Một thanh nhỏ, chạy mượt ở dưới cùng khung slide Preview để theo dõi thời gian còn lại.
- **Sửa logic Tương tác**: Đồng bộ hóa prop `interactive` trên toàn hệ thống (`true` cho Editor, `false` cho Player), giúp sửa lỗi nút bấm và quiz không hoạt động trong Preview.

### 2. Quản lý Media & Luồng công việc
- **Đồng bộ Video Library**: Cải thiện Media Library để tự động làm nổi bật các tệp video khi chọn phần tử Video trên canvas.
- **Giao diện Timeline gọn gàng**: Loại bỏ các tab "Audio" thừa trong Timeline để tập trung vào thứ tự slide và hoạt ảnh.
- **Gán nguồn trực tiếp**: Xác nhận phần tử Video hiện đã có thể cập nhật nguồn tức thì bằng cách chọn phần tử và nhấn "Check" trên tệp đã upload trong Media Library.

## Tiêu chuẩn mã nguồn (Coding Rules)

Để đảm bảo dự án luôn dễ bảo trì và nhẹ nhàng, toàn bộ mã nguồn cần tuân thủ:

1. **DRY (Don't Repeat Yourself)**: Tránh tuyệt đối việc lặp lại code giống nhau. Bất kỳ UI nào lặp lại trên 2 lần đều nên tách thành một component tái sử dụng.
2. **Quy tắc chia nhỏ file (Split files > 150 lines)**: Nếu một tệp (file) dài đến cỡ **150 dòng**, thì đó là dấu hiệu nó đang "quá tải". Bắt buộc tách các khối logic lớn bằng cách tạo hook riêng, hoặc tách thành các file component con (`ComponentShell`, `ComponentDialog`...) để cho file chính luôn ngắn gọn, trong sáng và dễ test.

## Phát triển

```bash
npm run dev
```

Mở `http://localhost:3000` và bắt đầu chỉnh `src/app/page.tsx`.
