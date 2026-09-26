# Mô Phỏng Các Hàm Xóa Trong Danh Sách Liên Kết Đơn (HDU DSA)

Tài liệu và kịch bản trực quan hóa dựa trên file mã nguồn gốc: `00-Danh_Sach_1_chieu.cpp`.

---

## Các Hàm Minh Họa

### 1. `xoaDau(danhSach &L)`
- **Độ phức tạp**: $O(1)$
- **Ý tưởng**: 
  - Gán con trỏ tạm `p = L.dau`.
  - Dời `L.dau` sang nút tiếp theo `L.dau = L.dau->sau`.
  - Giải phóng bộ nhớ của nút cũ `delete p`.

### 2. `xoaCuoi(danhSach &L)`
- **Độ phức tạp**: $O(N)$
- **Ý tưởng**:
  - Dùng con trỏ duyệt `p` đến khi `p->sau->sau == NULL` (nút áp chót).
  - Đánh dấu nút cuối `q = p->sau`.
  - Ngắt liên kết `p->sau = NULL` và cập nhật `L.cuoi = p`.
  - Thu hồi `delete q`.

### 3. `xoaViTriK(danhSach &L, int k)`
- **Độ phức tạp**: $O(K)$
- **Ý tưởng**:
  - Duyệt `dem` từ $1$ đến $k - 1$ để tìm nút đứng trước nút cần xóa (`p`).
  - Đánh dấu nút cần xóa `q = p->sau`.
  - Nối tắt: `p->sau = q->sau`.
  - Thu hồi `delete q`.
