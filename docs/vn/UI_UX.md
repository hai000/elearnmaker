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

## 3. Quản lý Thuộc tính (Property Panels)

Bảng thuộc tính bên phải được tổ chức theo hệ thống **PropertyCard** logic, giúp người dùng tập trung vào từng nhóm nội dung:
- **Nội dung (Content)**: Tiêu đề, văn bản, hình ảnh, âm thanh.
- **Hiển thị (Appearance)**: Màu sắc, bo góc, cỡ chữ, hiệu ứng bóng đổ.
- **Hành động (Logic)**: Các sự kiện khi click, chuyển trang, hoặc kích hoạt phần tử khác.

## 4. Điều hướng và Timeline (UX)

- **Timeline Cuộn ngang**: Cho phép quản lý số lượng slide không giới hạn. Khi danh sách slide dài hơn chiều rộng màn hình, thanh cuộn ngang (Horizontal Scroll) sẽ tự động xuất hiện, giúp người dùng điều hướng nhanh chóng.
- **Kéo thả Slide**: Hỗ trợ sắp xếp thứ tự slide bằng thao tác kéo thả trực quan trên Timeline.
- **Xem thử Đa thiết bị**: Chế độ Preview cung cấp các khung nhìn (Viewport) chuẩn cho Desktop, Tablet và Mobile, đảm bảo nội dung luôn được căn giữa và thu phóng đúng tỷ lệ.

## 5. Phản hồi Tương tác (Micro-interactions)

- **Trạng thái Thành công/Thất bại**: Các phần tử trò chơi (Quiz, Guess Word, Matching) cung cấp phản hồi hình ảnh và âm thanh ngay lập tức khi người dùng thao tác.
- **Hiệu ứng Chuyển cảnh**: Mỗi slide có thể cấu hình hiệu ứng chuyển tiếp (Fade, Slide, Zoom) để tạo cảm giác bài học liền mạch và sống động.

---
*Cập nhật lần cuối: 31/03/2026 (UI/UX Standardization update)*
