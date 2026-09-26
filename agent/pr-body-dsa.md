## 📌 Tóm tắt công việc (Pull Request #2)

Tiếp nối PR #1, PR này bổ sung bộ vẽ chuyên dụng **`LinkedListRenderer`** theo tiêu chuẩn **Human Craftsmanship (Editorial & Engineering Craft)** và tối ưu hóa hệ thống:

### 🌟 1. Bộ Vẽ Chuyên Dụng `LinkedListRenderer` & `LinkedListTracer`:
- **Cấu trúc hộp bộ nhớ chuẩn C++**:
  - Danh sách đơn: Hộp 2 ngăn `[ Data | Next ]` kèm địa chỉ hex (`0x10A4`) và nhãn con trỏ `nut *p`.
  - Danh sách đôi: Hộp 3 ngăn `[ Prev | Data | Next ]`.
- **Thẻ con trỏ động**: `L.dau`, `L.cuoi`, `p`, `q` bám sát đỉnh nút với mũi tên chỉ định rõ ràng.
- **Mũi tên SVG Bezier uốn lượn**: Minh họa đường bắc cầu `p->sau = q->sau` cong vồng phía trên nút bị xóa.
- **Trạng thái bộ nhớ**: Hạ thấp nút bị cô lập với viền nét đứt trước khi thu hồi `delete p`.
- **Thẩm mỹ Anti-AI-Slop**: Bảng màu Slate/Amber/Terracotta/Emerald thanh lịch, dịu mắt, không dùng màu neon phát sáng rẻ tiền.

### 🚀 2. Mô Phỏng Trực Quan DSA HDU:
- [`src/files/dsa-hdu/singly-linked-list/code.js`](file:///E:/GitHub/algorithm-visualizer/src/files/dsa-hdu/singly-linked-list/code.js): Minh họa chi tiết `xoaDau`, `xoaCuoi`, `xoaViTriK`.
- [`src/files/dsa-hdu/doubly-linked-list/code.js`](file:///E:/GitHub/algorithm-visualizer/src/files/dsa-hdu/doubly-linked-list/code.js): Minh họa chi tiết 2 chiều `sau` và `truoc`.

### 🛠️ 3. Bộ Thực Thi Client Tracer & Hỗ Trợ Node 24:
- Chạy 100% Offline trên trình duyệt với `clientTracerRunner.js`.
- Tương thích Node 24 qua `sass` (Dart Sass) và script `postinstall`.

### 📋 Báo cáo chi tiết:
- [`agent/reports/26-09-27-algorithm-visualizer-docs.md`](file:///E:/GitHub/algorithm-visualizer/agent/reports/26-09-27-algorithm-visualizer-docs.md)
