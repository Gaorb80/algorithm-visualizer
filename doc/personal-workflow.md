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

## 2. Hướng Dẫn Mở & Xem Các Bài Mô Phỏng DSA Hiện Có

### Bước 1: Khởi động ứng dụng
```powershell
cd E:\GitHub\algorithm-visualizer
npm start
```
Trình duyệt sẽ tự động mở trang web tại địa chỉ `http://localhost:3000`.

### Bước 2: Truy cập bài học qua thanh điều hướng (Navigator)
1. Ở góc trái màn hình, bấm vào biểu tượng hoặc thanh tiêu đề để mở danh mục bài học.
2. Bạn sẽ thấy mục đầu tiên: **`DSA - Danh Sách Liên Kết (HDU)`**.
3. Bấm chọn bài học:
   - **`DS Liên Kết Đơn (xoaDau, xoaCuoi, xoaViTriK)`**: URL trực tiếp `http://localhost:3000/dsa-linked-list/singly-linked-list-deletion`
   - **`DS Liên Kết Đôi (xoaDau, xoaCuoi, xoaViTriK)`**: URL trực tiếp `http://localhost:3000/dsa-linked-list/doubly-linked-list-deletion`

### Bước 3: Điều khiển chuyển động (Player)
- Bấm **Play** (hoặc phím cách) để xem tự động.
- Sử dụng các nút **Next (>)** / **Prev (<)** để tua từng bước dòng code C++.
- Kéo thanh trượt **Speed** để tăng/giảm tốc độ hoạt ảnh.
- Khung **Nhật ký (Log)** ở dưới sẽ in chi tiết từng dòng lệnh C++ tương ứng (`p = L.dau`, `delete p;`...).

---

## 3. Đánh Giá Kiến Trúc Quản Lý File & Quy Chuẩn Mở Rộng Tương Lai (Scalability)

Cấu trúc file hiện tại đã được thiết kế theo mô hình **Module Hóa (Modular Content Architecture)**, hoàn toàn sẵn sàng và cực kỳ thuận tiện để bạn mở rộng thêm hàng chục bài học mới cho toàn bộ chương trình DSA (Cây nhị phân, Stack/Queue, Đồ thị, Quy hoạch động, Sắp xếp).

### 📁 Cấu trúc thư mục chuẩn đề xuất (`src/files/dsa/`):

```text
src/files/dsa/
├── 01-linked-list/                     # Chuyên đề 1: Danh sách liên kết
│   ├── singly-linked-list/             # code.js, README.md (Thao tác xóa DS đơn)
│   ├── doubly-linked-list/             # code.js, README.md (Thao tác xóa DS đôi)
│   └── insertion-operations/           # code.js, README.md (Thao tác thêm đầu/cuối/vị trí K)
├── 02-stack-queue/                     # Chuyên đề 2: Ngăn xếp & Hàng đợi
│   ├── stack-array-linked/             # Push, Pop, Peek
│   └── queue-circular/                 # Enqueue, Dequeue
├── 03-trees-and-bst/                   # Chuyên đề 3: Cây & Cây tìm kiếm nhị phân
│   ├── bst-insert-search/              # Thêm, tìm kiếm trên BST
│   └── bst-deletion/                   # Xóa nút trên BST (Nút lá, 1 con, 2 con)
└── 04-sorting/                         # Chuyên đề 4: Thuật toán sắp xếp
    ├── bubble-sort/
    ├── quick-sort/
    └── merge-sort/
```

### ⚡ Quy trình 3 bước để thêm 1 bài học DSA mới vào hệ thống:

#### Bước 1: Tạo thư mục bài học trong `src/files/dsa-hdu/` (hoặc `src/files/dsa/`)
Tạo 2 file:
- `code.js`: Kịch bản điều khiển Tracer (`LinkedListTracer`, `Array1DTracer`, `GraphTracer`...).
- `README.md`: Ghi chú lý thuyết, công thức, phân tích độ phức tạp $O(N)$ bằng tiếng Việt.

#### Bước 2: Đăng ký tệp trong [`src/files/index.js`](file:///E:/GitHub/algorithm-visualizer/src/files/index.js)
```javascript
export const DSA_BST_INSERT_JS = readUserFile('dsa-hdu/bst-insert/code.js');
export const DSA_BST_INSERT_MD = readProjectFile('dsa-hdu/bst-insert/README.md');
```

#### Bước 3: Khai báo vào danh mục trong [`src/apis/index.js`](file:///E:/GitHub/algorithm-visualizer/src/apis/index.js)
Thêm bài mới vào `LOCAL_DSA_CATEGORY` và `LOCAL_DSA_ALGORITHMS`:
```javascript
{
  key: 'bst-insert',
  name: 'Cây BST - Chèn & Tìm Kiếm',
}
```
Ngay lập tức, bài học mới sẽ xuất hiện trên thanh Navigator bên trái và hoạt động 100% offline!

---

## 4. Mẹo Thiết Kế Thuật Toán Trực Quan Đẹp & Rõ Ràng

1. **Chọn Tracer phù hợp với cấu trúc dữ liệu**:
   - **Danh sách liên kết**: Dùng `LinkedListTracer` (vẽ hộp 2/3 ngăn, địa chỉ hex, mũi tên 2 chiều, bắc cầu).
   - **Mảng & Sắp xếp**: Dùng `Array1DTracer` + `ChartTracer` (`arrayTracer.chart(chartTracer)`).
   - **Đồ thị & Cây**: Dùng `GraphTracer` (`tracer.layoutTree(root)` hoặc `tracer.layoutCircle()`).
   - **Ma trận & Quy hoạch động (DP)**: Dùng `Array2DTracer`.
2. **Luôn dùng `Tracer.delay(lineNumber)` sau mỗi bước biến đổi**:
   - Giúp Ace Editor highlight đúng dòng code C++ và phân tách các bước thành từng frame chuyển động.
3. **Kết hợp `LogTracer`**:
   - In rõ ràng tên biến, con trỏ và giải thích hành động để người học dễ theo dõi.

