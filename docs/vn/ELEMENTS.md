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
- `hidden`: Cờ đánh dấu phần tử ẩn khi slide bắt đầu.
- `animation`: Hiệu ứng xuất hiện (fade, zoom, slide, bounce...).
- `actionType` (Mới): Hành động thực hiện khi phần tử hoàn thành (show_element, hide_element, none).
- `targetElementIds` (Mới): Danh sách ID các phần tử sẽ được kích hoạt.
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
- `correctIndex`: index của đáp án đúng (0-based).
- `retryLabel`: tin nhắn hiển thị khi người dùng chọn sai.
- `titleSize`: cỡ chữ tiêu đề.
- `optionSize`: cỡ chữ lựa chọn.
- `textColor`: màu chữ.
- `backgroundColor`: màu nền.

Hành vi:

- Hiển thị danh sách lựa chọn. 
- Khi người dùng chọn, hệ thống sẽ kiểm tra với `correctIndex`.
- Nếu sai, sẽ hiển thị `retryLabel` để gợi ý người dùng làm lại.

## 8. Element Audio

Type: `audio`

Props:

- `audioUrl`: đường dẫn file âm thanh (vd: `/uploads/demo.mp3`).
- `autoplay`: tự động phát khi vào slide.
- `loop`: lặp lại âm thanh.
- `controls`: hiển thị trình điều khiển (play/pause/volume).
- `volume`: âm lượng mặc định (0 - 1).

Hành vi:

- Render trình phát nhạc tối giản hoặc ẩn (nếu không có controls).
- Dùng cho các bài tập nghe hiểu hoặc nhạc nền slide.
- **Trigger**: Có thể cấu hình để kích hoạt (hiển thị) các phần tử khác ngay khi nhạc kết thúc.

## 9. Element Essay (Tự luận)

Type: `essay`

Props:

- `title`: câu hỏi tự luận.
- `placeholder`: văn bản gợi ý trong ô nhập liệu.
- `submitLabel`: nhãn nút nộp bài.
- `minLength`: số ký tự tối thiểu.
- `maxLength`: số ký tự tối đa.
- `titleSize`: cỡ chữ câu hỏi.
- `textColor`: màu chữ.
- `backgroundColor`: màu nền.

Hành vi:

- Cung cấp ô textarea cho người dùng nhập liệu dài.
- Kiểm tra độ dài văn bản trước khi cho phép nộp.

## 10. Element Matching (Nối cặp)

Type: `matching`

Props:

- `title`: yêu cầu của trò chơi.
- `pairs`: danh sách các cặp nối (id, left, right).
- `titleSize`: cỡ chữ tiêu đề.
- `itemSize`: cỡ chữ các mục nối.
- `textColor`: màu chữ.
- `backgroundColor`: màu nền.

Hành vi:

- Trò chơi tương tác cho phép kéo nối giữa các mục ở cột trái và cột phải.
- Tự động kiểm tra tính đúng đắn khi tất cả các cặp được nối.

## 11. Element Guess Word (Đuổi hình bắt chữ)

Type: `guess_word`

Props:

- `title`: tiêu đề trò chơi.
- `imageUrls`: danh sách các ảnh gợi ý (array).
- `answer`: đáp án (không dấu, in hoa).
- `hint`: gợi ý khi người dùng gặp khó khăn.
- `successMessage`: thông điệp chúc mừng khi thắng.
- `titleSize`: cỡ chữ tiêu đề.
- `textColor`: màu chữ.
- `backgroundColor`: màu nền.

Hành vi:

- Hiển thị các ô chữ trống tương ứng với độ dài `answer`.
- Người dùng nhập ký tự để giải mã.
- Hỗ trợ hiển thị nhiều ảnh gợi ý cùng lúc.

## 12. Element Button

Type: `button`

Props:

- `label`: chữ hiển thị trên nút.
- `textColor`: màu chữ.
- `backgroundColor`: màu nền.
- `actionType`: kiểu action, gồm:
  - `none`
  - `go_to_slide`
  - `show_element` (mới): Hiển thị một element đang ẩn.
- `targetSlideId`: slide đích khi action là `go_to_slide`.
- `targetElementIds` (mới): mảng ID các element cần hiển thị khi dùng `show_element`.
- `buttonSize`: cỡ chữ của nút.

Hành vi:

- Điều hướng slide hoặc kích hoạt logic hiển thị element động ngay trong trang.

---
## 13. Ghi chú về Editor & Preview

- **Editor**: Sử dụng hệ thống `PropertyCard` thống nhất để chỉnh sửa thuộc tính cho tất cả các loại element.
- **Preview/Viewer**: Áp dụng công nghệ **Scale Wrapper** để đảm bảo tỷ lệ 16:9 luôn hiển thị trọn vẹn và căn giữa trên mọi thiết bị (iPhone, iPad, Desktop).
- **Responsive**: Sử dụng đơn vị `dvh` (Dynamic Viewport Height) để xử lý thanh địa chỉ trình duyệt trên mobile.
## 14. Hệ thống Kích hoạt (Trigger System)

Studio đã thống nhất hệ thống kích hoạt cho mọi loại thành phần:
- **Game & Quiz**: Hoàn thành đúng $\rightarrow$ `show_element` (Hiện nút Tiếp tục).
- **Audio**: Chạy xong $\rightarrow$ `show_element` (Hiện bộ câu hỏi).
- **Essay**: Nộp bài $\rightarrow$ `show_element` (Mở khóa slide kế).

## 15. Cơ chế Trạng thái & Duy trì (Persistence)

Thay vì gỡ bỏ phần tử khỏi DOM khi ẩn (unmount), Studio sử dụng CSS `display: none`:
- **Persistence**: Giữ cho tài nguyên nền (như Audio/Video) không bị reset hay giải phóng khi người hướng dẫn ẩn giao diện điều khiển.
- **Overrides**: Trạng thái hiển thị lúc chạy (Runtime) được lưu trong `uiSlice.elementVisibilityOverrides`, cho phép thay đổi giao diện linh hoạt mà vẫn bảo toàn trạng thái component.

---
*Cập nhật lần cuối: 01/04/2026 (Interactive Elements & Trigger System)*
