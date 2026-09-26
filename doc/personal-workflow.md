# Quy Trình Làm Việc Cá Nhân & Tùy Biến (Personal Workflow)

Dự án fork này được thiết kế tối ưu cho nhu cầu học tập, nghiên cứu và trực quan hóa thuật toán cá nhân của riêng bạn. Dưới đây là các hướng dẫn thực hành và mẹo làm việc hiệu quả nhất.

---

## 1. Các Chế Độ Vận Hành

### Chế độ 1: Thuần Offline (JavaScript Only)
- **Đặc điểm**: Không cần chạy backend server, không cần Docker.
- **Cách thức**: Viết mã nguồn bằng JavaScript (ES6), sử dụng `import { Array1DTracer... } from 'algorithm-visualizer'`.
- **Cơ chế**: Web App sử dụng Web Worker nội tại của trình duyệt để thực thi code JS và diễn giải các lệnh trực quan ngay lập tức.
- **Phù hợp nhất cho**: Học tập hàng ngày, kiểm tra nhanh thuật toán, vẽ minh họa bài toán LeetCode / DSA.

### Chế độ 2: Proxy về Server Chính Thức (Chạy C++ / Java / Python)
- **Đặc điểm**: Muốn viết bằng C++ hoặc Java mà không tốn tài nguyên cài đặt Docker runner trên máy.
- **Cách thức**:
  1. Mở file `package.json`.
  2. Sửa dòng:
     ```json
     "proxy": "https://algorithm-visualizer.org"
     ```
  3. Khởi động lại app bằng `npm start`.
  4. Giờ đây khi nhấn nút **Build** trên code C++ hoặc Java, ứng dụng sẽ gửi code lên runner sandbox của trang chủ để trả về kết quả visualization.

---

## 2. Cách Tạo & Lưu Trữ Bài Thuật Toán Cá Nhân

### Cách 1: Sử dụng Scratch Paper (Lưu qua GitHub Gist)
1. Trên thanh menu trên cùng, bấm vào biểu tượng **GitHub Sign In** để liên kết tài khoản GitHub của bạn.
2. Chọn menu **Scratch Paper** $\rightarrow$ **New**.
3. Đặt tên bài tập, tạo các file `.js`, `.md` (ghi chú giải thích thuật toán).
4. Nhấn **Save** hoặc **Fork**. Bài tập của bạn sẽ được lưu tự động thành một **Secret/Public Gist** trên tài khoản GitHub cá nhân.
5. Khi mở lại trang web, toàn bộ danh sách Gist thuật toán của bạn sẽ xuất hiện tại mục Scratch Paper.

### Cách 2: Thêm trực tiếp bài mẫu vào mã nguồn nội bộ
Nếu bạn muốn đóng gói các bài toán mẫu cứng vào trong project:
1. Thư mục `src/files/` chứa các skeleton và template mặc định:
   - `src/files/skeletons/code.js`: Code khung JavaScript mặc định khi tạo bài mới.
   - `src/files/skeletons/code.cpp`: Code khung C++ mặc định.
   - `src/files/skeletons/code.java`: Code khung Java mặc định.
2. Bạn có thể tùy biến các skeleton này với các thư viện helper cá nhân hoặc dữ liệu mẫu mà bạn thường xuyên sử dụng.

---

## 3. Mẹo Thiết Kế Thuật Toán Trực Quan Đẹp & Rõ Ràng

1. **Phối hợp `Array1DTracer` + `ChartTracer`**:
   - Luôn gọi `arrayTracer.chart(chartTracer)` cho các thuật toán Sort để vừa thấy giá trị số vừa thấy độ cao trực quan của các thanh cột.
2. **Luôn dùng `Tracer.delay(lineNumber)` sau mỗi bước biến đổi**:
   - Nếu bạn thực hiện `select()`, `patch()`, `deselect()` liên tiếp mà không có `Tracer.delay()`, người xem sẽ không nhìn thấy bước trung gian đó vì chúng bị gộp chung vào 1 frame (chunk).
3. **Kết hợp `LogTracer` và `MarkdownTracer`**:
   - `MarkdownTracer` đặt ở trên cùng để giải thích ý tưởng cốt lõi và độ phức tạp $O(N)$.
   - `LogTracer` đặt ở dưới cùng để in chi tiết từng phép so sánh hoặc giá trị biến phụ trong vòng lặp.
4. **Tránh vòng lặp vô tận**:
   - Giới hạn kích thước mảng thử nghiệm từ 5 đến 30 phần tử để tránh sinh ra hàng nghìn chunks làm trình duyệt bị giật lag.
