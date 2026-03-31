# Kiến trúc Hệ thống Studio

Tài liệu này giải thích cách hệ thống vận hành dưới góc độ kỹ thuật, từ cấu trúc thư mục đến luồng dữ liệu (Data Loop).

## 1. Nguyên tắc Cốt lõi (V1)

- **Không lưu trữ HTML**: Tất cả dữ liệu slide được lưu dưới dạng JSON Schema. Điều này đảm bảo tính di động và khả năng mở rộng trong tương lai.
- **Tọa độ Tuyệt đối**: Canvas sử dụng `position: relative`, và mọi thành phần (element) đều là `position: absolute` với các thuộc tính `top/left/width/height` được quản lý chặt chẽ.
- **Kiến trúc Plugin**: Mỗi loại thành phần (văn bản, hình ảnh, quiz, v.v...) là một component React độc lập, nhận dữ liệu qua props và được đăng ký tại `pluginRegistry.tsx`.

## 2. Cấu trúc Thư mục

- `src/store/`: Quản lý trạng thái bằng Zustand.
    - `types.ts`: Định nghĩa toàn bộ kiểu dữ liệu (Slide, Element, State).
    - `utils.ts`: Các hàm hỗ trợ (Tạo ID, Snapshot, Sao chép).
    - `initialState.ts`: Dữ liệu mặc định cho bản demo.
    - `editorStore.ts`: Các hành động (actions) thay đổi trạng thái.
- `src/constants/`: Các hằng số dùng chung (Thiết bị xem thử, cấu hình Sidebar).
- `src/plugins/registry.tsx`: Nơi đăng ký các renderer cho Canvas và bảng thuộc tính (Properties Panel).
- `src/components/elements/`: Các component vẽ thành phần lên Canvas.
- `src/components/panels/`: Các bảng điều khiển thuộc tính ở cột bên phải.
- `src/components/editor/`: Các thành phần giao diện chính của trình biên tập.

## 3. Quản lý Tầng (Layering)

Hệ thống sử dụng thuộc tính `zIndex` trong store để quản lý thứ tự hiển thị. 
Khi một thành phần mới được thêm vào, nó sẽ tự động nhận giá trị `max(zIndex) + 1` để luôn nằm ở lớp trên cùng.


---
*Cập nhật lần cuối: 31/03/2026*
