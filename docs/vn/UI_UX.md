# Triết lý Thiết kế và Trải nghiệm Người dùng (UI/UX)

Tài liệu này giải thích các quyết định thiết kế nhằm tạo ra một trình biên tập học tập trực quan và chuyên nghiệp.

## 1. Giao diện Phân cấp và Đồng bộ

- **Màu sắc**: Sử dụng tông màu HSL hiện đại, ưu tiên màu Slate và Blue để tạo cảm giác chuyên nghiệp, không gây mỏi mắt.
- **Phông chữ**: Font chữ mặc định là bộ Google Fonts (Inter, Roboto) nhằm đảm bảo sự sắc nét và dễ đọc trên mọi thiết bị.
- **Dot Grid Workspace**: Nền Canvas sử dụng họa tiết chấm lưới (Dot Grid) cao cấp, giúp người dùng định vị và căn chỉnh vật thể chính xác hơn (tương tự Figma hay Canva).

## 2. Tương tác Canvas thông minh

- **Phóng to/Thu nhỏ (Zoom)**: Hệ thống "Contain" tự động thu phóng để slide luôn nằm gọn trong màn hình, nhưng vẫn giữ nguyên tọa độ logic 960x540.
- **Thanh thước kẻ và Tay cầm**: Sử dụng Moveable để cung cấp các tay cầm xoay, kéo giãn và đổi kích thước một cách mượt mà nhất.
- **Lựa chọn Đơn giản**: Loại bỏ các lớp viền thừa (Double Border) khi vật thể được chọn để tập trung vào hình dáng thực tế của nó.

## 3. Quản lý Thuộc tính (Properties Panel)

Bảng thuộc tính bên phải được tổ chức theo các khối (Cards) logic:
- **General**: Vị trí, kích thước, bo góc.
- **Specific**: Màu sắc, nội dung chuyên biệt cho từng loại thành phần.
- **Visibility**: Điều kiện hiển thị và hoạt ảnh.

---
*Cập nhật lần cuối: 31/03/2026*
