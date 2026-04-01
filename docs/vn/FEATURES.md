# Các Tính năng Chính của Studio

Tài liệu này liệt kê các tính năng cốt lõi và hướng dẫn cách sử dụng chúng hiệu quả.


## 1. Soạn thảo văn bản trực tiếp (Inline Editing)
Người dùng có thể nhấp đúp (Double-click) vào bất kỳ đối tượng `Text` hoặc `Card` nào để bắt đầu sửa chữ ngay lập tức trên Canvas.
- **Card Element**: Hỗ trợ sửa đồng thời cả Tiêu đề (Title) và Nội dung (Body).
- **Phím tắt**: Sử dụng phím `Escape` để thoát chế độ sửa và lưu thay đổi.

## 2. Hình khối Sáng tạo (Creative Shapes)
Dễ dàng thêm các hình khối cơ bản vào slide từ thanh công cụ bên trái:
- **Hình chữ nhật & Hình tròn**: Hỗ trợ đổ màu nền (Fill) và chỉnh viền (Stroke).
- **Đường kẻ**: Có thể tùy chỉnh độ dày và màu sắc, xoay hướng bất kỳ.
- **Bo góc (Corner Radius)**: Tùy chỉnh độ cong của các góc cho hình chữ nhật.

## 3. Thành phần Tương tác (Interactive components)
- **Quiz Element**: Cho phép tạo các câu hỏi trắc nghiệm. Học viên có thể chọn phương án và nhận phản hồi đúng/sai ngay lập tức.
- **Audio Element**: Tích hợp trình phát âm thanh cao cấp. Hỗ trợ phát ẩn trong nền để thiết kế các kịch bản nghe hiểu (Listening) chuyên nghiệp.
- **Essay & Quiz (UX)**: Đã được tinh chỉnh để nội dung chính cố định, thanh cuộn chỉ xuất hiện bên trong vùng làm việc, giữ tiêu đề và các nút nộp bài luôn trong tầm nhìn.

## 4. Kiểm soát Bản trình chiếu (Presentation Control)
- **Slide Timelock**: Quy định thời gian tối thiểu (0-60s) mà học viên phải xem mỗi slide trước khi có thể chuyển tiếp.
- **Độ trong suốt (Alpha Transparency)**: Hỗ trợ đầy đủ mã màu Hex 8 chữ số (`#RRGGBBAA`). Sử dụng thanh trượt trong bộ chọn màu để tạo các lớp phủ hoặc nền trong suốt (Glassmorphism).
- **Hiệu ứng chuyển cảnh (Entrance Animation)**: Các hiệu ứng mượt mà (Fade, Slide, Zoom, Bounce) giúp slide sinh động hơn.

## 5. Lưu trữ & Quản lý Dự án (Persistence)
- **Nhập/Xuất dự án (Import/Export)**: Lưu toàn bộ dự án dưới dạng tệp `.json` cục bộ và có thể tải lên lại bất cứ lúc nào để tiếp tục chỉnh sửa.
- **Lưu & Dọn dẹp lịch sử (Save)**: Sử dụng nút **Lưu** để "chốt" các thay đổi hiện tại và làm sạch bộ nhớ đệm (Undo/Redo stack), giúp tối ưu hóa hiệu năng.
- **Đổi tên Slide**: Nhấp đúp vào tiêu đề slide trong thanh **Timeline** hoặc nhấp chuột vào tên slide trên thanh **TopBar** để đổi tên nhanh chóng.
- **Huy hiệu Trạng thái (Dynamic Status)**: Hiển thị ngay lập tức trạng thái **Đã lưu** (Màu xanh) hoặc **Nháp** (Màu xám) dựa trên các thao tác của bạn.

## 6. Phím tắt & Thao tác nhanh
- `Ctrl + S`: Lưu dự án và dọn dẹp lịch sử chỉnh sửa.
- `Ctrl + Z` / `Ctrl + Y`: Hoàn tác (Undo) và Làm lại (Redo).
- `Delete` / `Backspace`: Xóa đối tượng đang chọn.
- `Ctrl + Scroll`: Phóng to/thu nhỏ (Zoom) vùng làm việc.

---
## 7. Luồng Tương tác Tuần tự (Sequential Flow)

Thay vì hiển thị mọi thứ cùng lúc, Studio cho phép thiết kế bài giảng theo phong cách "mở khóa" kiến thức:
- **Ẩn mặc định**: Các nút điều hướng hay phần tử hỏi-đáp có thể ẩn đi khi vào slide.
- **Kích hoạt sau bài học**: Chỉ khi học viên hoàn thành game hoặc nghe xong âm thanh, nội dung tiếp theo mới tự động hiện ra.

## 8. Trình phát Âm thanh Nền & Kịch bản

- **Audio Trigger**: Âm thanh có thể cấu hình để "kích hoạt" (trigger) sự xuất hiện của các phần tử khác ngay khi kết thúc bài nghe.
- **Background Persistence**: Studio sử dụng cơ chế ẩn CSS thông minh, cho phép âm thanh tiếp tục phát mượt mà ngay cả khi trình điều khiển không hiển thị trên màn hình.

---
*Cập nhật lần cuối: 01/04/2026 (Sequential Flow & Audio Interaction)*
