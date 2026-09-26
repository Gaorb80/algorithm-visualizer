# Hướng Dẫn & Tài Liệu Kỹ Thuật Algorithm Visualizer (Bản Cá Nhân)

Chào mừng bạn đến với bộ tài liệu tiếng Việt dành riêng cho dự án **Algorithm Visualizer** (bản fork cá nhân). Tài liệu này được biên soạn nhằm giúp bạn nắm vững toàn bộ kiến trúc, cơ chế hoạt động, cách chạy offline/online và cách tự thêm/tùy biến các thuật toán của riêng mình.

---

## 📑 Mục lục tài liệu

| Tài liệu | Mô tả chi tiết |
| :--- | :--- |
| 📘 [**1. Tổng Quan & Cài Đặt Nhanh (Quick Start)**](file:///E:/GitHub/algorithm-visualizer/doc/README.md) | Giới thiệu dự án, kiến trúc tổng thể, cài đặt môi trường và chạy ứng dụng. |
| 🏗️ [**2. Kiến Trúc Hệ Thống & Luồng Dữ Liệu (Architecture)**](file:///E:/GitHub/algorithm-visualizer/doc/architecture.md) | Chi tiết về luồng hoạt động: Từ Code $\rightarrow$ Tracer $\rightarrow$ JSON Chunks $\rightarrow$ Renderers/Player. |
| 📊 [**3. Cẩm Nang Sử Dụng Tracer API (Tracer Guide)**](file:///E:/GitHub/algorithm-visualizer/doc/tracer-api-guide.md) | Hướng dẫn đầy đủ các Tracer (`Array1D`, `Array2D`, `Graph`, `Chart`, `Log`, `Scatter`) kèm code mẫu JS/C++/Java. |
| 🧑‍💻 [**4. Tùy Biến & Quy Trình Làm Việc Cá Nhân (Personal Workflow)**](file:///E:/GitHub/algorithm-visualizer/doc/personal-workflow.md) | Cách tự tạo bài học, viết thuật toán mới, lưu trữ qua Gist, chạy JS hoàn toàn offline. |
| 🛠️ [**5. Hướng Dẫn Phát Triển & Xử Lý Lỗi (Development & Troubleshooting)**](file:///E:/GitHub/algorithm-visualizer/doc/development-guide.md) | Giải quyết vấn đề tương thích Node.js, `node-sass`, npm/yarn và mẹo debug React/Redux. |

---

## 🚀 Bắt đầu nhanh (Quick Start)

### 1. Yêu cầu môi trường
- **Node.js**: Phiên bản khuyến nghị là `v14.x` hoặc `v16.x` (Do dự án sử dụng `node-sass 4.12.0` và `react-scripts 3.0.1`).
- **Trình quản lý gói**: `npm` hoặc `yarn` / `nvm-windows`.

### 2. Cài đặt và khởi chạy

```powershell
# Chuyển vào thư mục dự án
cd E:\GitHub\algorithm-visualizer

# Cài đặt dependencies (khuyến nghị dùng node 14 hoặc 16)
npm install

# Khởi chạy ứng dụng ở chế độ Development
npm start
```
Ứng dụng sẽ mở tại `http://localhost:3000`.

---

## 💡 Lưu ý quan trọng cho bản Fork cá nhân
1. **Chạy hoàn toàn Offline với JavaScript**: 
   - Mã nguồn JavaScript được biên dịch và chạy trực tiếp trên trình duyệt qua **Web Worker** mà không cần khởi động server backend.
2. **Chạy C++ / Java**:
   - Mặc định `package.json` trỏ proxy tới `http://localhost:8080`.
   - Nếu không muốn tự dựng backend server phức tạp, bạn có thể trỏ proxy tạm thời sang server chính thức `https://algorithm-visualizer.org` trong `package.json`.
3. **Lưu trữ thuật toán riêng**:
   - Bạn có thể viết thuật toán trên giao diện **Scratch Paper** và lưu về GitHub Gist cá nhân của tài khoản GitHub đã đăng nhập.
