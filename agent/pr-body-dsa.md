## 📌 Tóm tắt công việc (Pull Request #2)

Bổ sung bộ vẽ chuyên dụng **`LinkedListRenderer`** theo tiêu chuẩn **Human Craftsmanship (Anti-AI-Slop)** và hoàn thiện hiển thị liên kết 2 chiều cho Danh Sách Đôi:

### 🌟 1. Bộ Vẽ Chuyên Dụng `LinkedListRenderer` & `LinkedListTracer`:
- **Hiển thị 2 chiều song song (Doubly Linked List)**:
  - Mũi tên trên $\to$: Thể hiện con trỏ xuôi `sau`.
  - Mũi tên dưới $\leftarrow$: Thể hiện con trỏ ngược `truoc`.
- **Cấu trúc hộp bộ nhớ chuẩn C++**:
  - Hộp 2/3 ngăn (`[ Data | Next ]` và `[ Prev | Data | Next ]`) kèm địa chỉ hex và số hiệu `#ID`.
- **Thẻ con trỏ động**: `L.dau`, `L.cuoi`, `p`, `q` bám sát đỉnh nút.
- **Mũi tên SVG Bezier uốn lượn**: Minh họa đường bắc cầu `p->sau = q->sau` và `p->sau->truoc = p->truoc`.
- **Mô phỏng giải phóng bộ nhớ**: Nút bị cô lập hạ thấp $32\text{px}$ với viền nét đứt trước khi `delete p`.

### 🚀 2. Mô Phỏng Trực Quan DSA HDU:
- [`src/files/dsa-hdu/singly-linked-list/code.js`](file:///E:/GitHub/algorithm-visualizer/src/files/dsa-hdu/singly-linked-list/code.js): `xoaDau`, `xoaCuoi`, `xoaViTriK` (DS đơn).
- [`src/files/dsa-hdu/doubly-linked-list/code.js`](file:///E:/GitHub/algorithm-visualizer/src/files/dsa-hdu/doubly-linked-list/code.js): `xoaDau`, `xoaCuoi`, `xoaViTriK` (DS đôi).

### 🛠️ 3. Bộ Thực Thi Client Tracer & Hỗ Trợ Node 24:
- Chạy 100% Offline trên trình duyệt với `clientTracerRunner.js`.
- Tương thích Node 24 qua `sass` (Dart Sass) và script `postinstall`.

### 📋 Báo cáo chi tiết:
- [`agent/reports/26-09-27-algorithm-visualizer-docs.md`](file:///E:/GitHub/algorithm-visualizer/agent/reports/26-09-27-algorithm-visualizer-docs.md)
