# Kiến trúc Hệ thống Studio

Tài liệu này giải thích cách hệ thống vận hành dưới góc độ kỹ thuật, từ cấu trúc thư mục đến luồng dữ liệu (Data Loop).

## 1. Nguyên tắc Cốt lõi (V1)

- **Không lưu trữ HTML**: Tất cả dữ liệu slide được lưu dưới dạng JSON Schema. Điều này đảm bảo tính di động và khả năng mở rộng trong tương lai.
- **Tọa độ Tuyệt đối**: Canvas sử dụng `position: relative`, và mọi thành phần (element) đều là `position: absolute` với các thuộc tính `top/left/width/height` được quản lý chặt chẽ.
- **Kiến trúc Plugin**: Mỗi loại thành phần (văn bản, hình ảnh, quiz, v.v...) là một component React độc lập, được đăng ký tại `pluginRegistry.tsx`.
- **Màu sắc Linh hoạt**: Hỗ trợ mã màu Hex 8 chữ số (`#RRGGBBAA`) cho phép tạo giao diện hiện đại với độ trong suốt (Alpha).

## 2. Cấu trúc Thư mục

- `src/store/`: Quản lý trạng thái bằng Zustand (Sliced Pattern).
    - `types.ts`: **Barrel File** xuất tất cả các định nghĩa của dự án.
    - `types/`: Hệ thống Type module hóa (phân chia elements, slides, assets, editor, history, events).
    - `utils.ts`: Các hàm hỗ trợ (Tạo ID, Snapshot, Sao chép).
    - `initialState.ts`: Dữ liệu mặc định cho bản demo.
    - `slices/`: Quản lý logic chuyên biệt:
        - `slideSlice`: Danh sách slide, thêm/xoá/sửa.
        - `elementSlice`: Phần tử slide, kích thước, thuộc tính.
        - `uiSlice` (Mới): Trạng thái UI (Feedback game, override hiển thị).
        - `historySlice`: Undo/Redo.
        - `eventSlice`: Quản lý các sự kiện và hành động.
        - ...
    - `editorStore.ts`: Store tổng hợp sử dụng tất cả các modular slices.
- `src/constants/`: Các hằng số dùng chung (Thiết bị xem thử, cấu hình Sidebar).
- `src/plugins/registry.tsx`: Nơi đăng ký các renderer cho Canvas và bảng thuộc tính (Properties Panel).
- `src/components/elements/`: Các component vẽ thành phần lên Canvas.
- `src/components/panels/`: Các bảng điều khiển thuộc tính. Sử dụng kiến trúc **PropertyCard** thống nhất để chia nhỏ các nhóm thuộc tính (Ví dụ: Nội dung, Hiển thị, Logic).
- `src/components/viewer/`: Trình xem bài giảng bài bản (StandaloneViewer). Sử dụng công nghệ **Scale Wrapper** để tự động co giãn tỷ lệ 16:9 trên mọi kích thước màn hình.
- `src/hooks/`: Các custom hook hỗ trợ việc lưu trữ dự án, tương tác UI và quản lý phím tắt.

## 3. Quy chuẩn UI/UX Properties

Để đảm bảo tính nhất quán khi mở rộng các Element mới, mọi bảng thuộc tính đều phải tuân thủ:
- Sử dụng `PropertyCard` làm container cho từng nhóm thuộc tính.
- Các nhóm được phân chia rõ ràng: **Nội dung** (Content), **Hiển thị** (Appearance), **Hành động/Logic** (Actions).
- UI đồng bộ sử dụng các component từ `@/components/ui/*` (Input, Slider, Switch, ColorPicker).

## 4. Công nghệ Responsive Viewer (Scale Wrapper)

Viewer được thiết kế để hiển thị nội dung 16:9 (960x540) một cách hoàn hảo trên mọi thiết bị:
- **Calculation**: Sử dụng `window.innerWidth/innerHeight` để tính toán tỷ lệ `scale = min(scaleX, scaleY) * 0.95`. Khoảng đệm 5% giúp tránh các điểm mù trên mobile (notch, home bar).
- **Wrapper Dimension**: Một lớp div bao ngoài có kích thước bằng chính kích thước đã co giãn (`width * scale`) giúp các thuộc tính Flexbox căn giữa nội dung chính xác tuyệt đối.
- **Dynamic Viewport (`dvh`)**: Sử dụng đơn vị `h-[100dvh]` để xử lý sự thay đổi chiều cao tức thời khi thanh địa chỉ trình duyệt mobile hiện/ẩn.

## 5. Quản lý Tầng & Lịch sử

- **Layering**: Sử dụng thuộc tính `zIndex` trong store. Khi thêm mới, element sẽ nhận `max(zIndex) + 1`.
- **Undo/Redo**: Hệ thống Sliced Store tự động chụp Snapshot trạng thái khi người dùng kết thúc một hành động (onMouseUp/onChange).

## 6. Hệ thống Phản hồi Trung tâm (Centralized Feedback)

Studio hiện sử dụng kiến trúc Feedback tập trung thay vì các hộp thoại rời rạc:
- **Tọa độ & Tỷ lệ**: Component `GameFeedback` được render ngay bên trong `SlideContainer`. Điều này đảm bảo các thông báo (Dúng/Sai) luôn co giãn (scale) đồng bộ tuyệt đối với các phần tử slide theo tỷ lệ 16:9, khắc phục hoàn toàn lỗi hiển thị lệch tọa độ trên mobile hay Desktop màn hình rộng.
- **Trạng thái**: Trạng thái hiển thị (Hiện/Ẩn) và nội dung thông báo được quản lý qua `uiSlice.gameFeedback` trong store, giúp việc tương tác trở nên reactivity và dễ bảo trì.

## 7. Cơ chế Kích hoạt Tương tác (Sequential Flow Trigger)

Để tạo ra các bài học tương tác "Phải làm xong X mới được hiển thị Y", hệ thống sử dụng cơ chế:
- **Visibility Overrides**: Store lưu giữ một danh sách `elementVisibilityOverrides` để ghi đè trạng thái hiển thị của các phần tử bất chấp giá trị `hidden` mặc định của chúng.
- **Triggers**: Khi một sự kiện (Ví dụ: Game hoàn thành, Audio kết thúc) xảy ra, các component sẽ gọi hành động `onAction` (loại `show_element`) với danh sách ID mục tiêu.
- **Duy trì Trạng thái (Persistence)**: Thay vì gỡ phần tử khỏi DOM khi ẩn (unmount), Studio sử dụng CSS `display: none`. Điều này cực kỳ quan trọng để duy trì các tài nguyên chạy nền (như Audio player) mà không bị ngắt quãng khi người dùng không nhìn thấy giao diện điều khiển.

---
*Cập nhật lần cuối: 01/04/2026 (Centralized Feedback & Sequential Flow)*
