# Hướng Dẫn Phát Triển & Xử Lý Lỗi (Development & Troubleshooting)

Tài liệu này cung cấp hướng dẫn kỹ thuật để xây dựng, gỡ lỗi và khắc phục các vấn đề tương thích khi phát triển dự án trên môi trường hiện đại.

---

## 1. Lưu Ý Về Phiên Bản Node.js & Dependencies

Dự án này sử dụng:
- `react-scripts: ^3.0.1`
- `node-sass: ^4.12.0`
- `react: ^16.8.6`

### Vấn đề phổ biến: Lỗi cài đặt `node-sass` trên Node.js mới (Node 18+)
`node-sass 4.x` phụ thuộc vào binary C++ native biên dịch theo phiên bản V8 engine của Node 10, 12, 14, 16. Nếu chạy `npm install` trên Node 18+ hoặc Node 20+, bạn có thể gặp lỗi `gyp ERR! build error` hoặc `Unsupported environment`.

### Cách khắc phục:

#### Phương án A: Sử dụng NVM (Node Version Manager) - Khuyến nghị
```powershell
# Cài đặt hoặc chuyển sang Node 14 hoặc Node 16
nvm use 16.20.2

# Cài đặt dependencies sạch sẽ
npm install
npm start
```

#### Phương án B: Nâng cấp `node-sass` sang `sass` (Dart Sass)
Nếu bạn muốn chạy trên Node.js 18+ mà không cần hạ phiên bản:
```powershell
# Gỡ bỏ node-sass cũ
npm uninstall node-sass

# Cài đặt sass hiện đại
npm install sass --save-dev
```

---

## 2. Các Lệnh Script Có Sẵn

Trong thư mục gốc của dự án:

| Lệnh | Mô tả |
| :--- | :--- |
| `npm start` | Khởi động server Webpack Development tại `http://localhost:3000` (Hỗ trợ Hot Reload). |
| `npm run build` | Đóng gói sản phẩm tối ưu hóa vào thư mục `build/` để deploy lên GitHub Pages hoặc máy chủ tĩnh. |
| `npm test` | Chạy bộ kiểm thử tự động với Jest / React Testing Library. |

---

## 3. Kiến Trúc Redux State Trong Ứng Dụng

Khi tùy biến tính năng mới hoặc tạo thêm giao diện, bạn có thể tham chiếu các Redux Reducer sau:

1. **`current`** (`src/reducers/current.js`):
   - Quản lý file đang chỉnh sửa (`editingFile`), danh sách file của bài tập hiện tại (`files`), tiêu đề bài tập (`titles`), trạng thái lưu (`saved`).
2. **`player`** (`src/reducers/player.js`):
   - `chunks`: Mảng chứa toàn bộ dữ liệu visualization chia theo từng bước thực thi.
   - `cursor`: Vị trí bước hiện tại ($0 \le \text{cursor} \le \text{chunks.length}$).
   - `lineIndicator`: Dòng mã nguồn đang được làm nổi bật trên Ace Editor.
3. **`env`** (`src/reducers/env.js`):
   - Lưu trữ token xác thực GitHub OAuth, thông tin user profile và kích thước màn hình hiển thị.

---

## 4. Xử Lý Khi Web Worker JS Bị Treo Hoặc Lỗi Cú Pháp

- Khi người dùng viết vòng lặp vô hạn (ví dụ: `while(true)`) trong mã nguồn JavaScript, Web Worker sẽ chạy ngầm.
- Component `Player` (`src/components/Player/index.js`) đã tích hợp cơ chế `CancelToken` và `worker.terminate()` khi người dùng nhấn hủy hoặc thực hiện build mới, giúp giải phóng hoàn toàn tiến trình chạy ngầm mà không làm đơ trình duyệt.
