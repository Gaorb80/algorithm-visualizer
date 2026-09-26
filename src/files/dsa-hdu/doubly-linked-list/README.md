# Mô Phỏng Các Hàm Xóa Trong Danh Sách Liên Kết Đôi (HDU DSA)

Tài liệu và kịch bản trực quan hóa dựa trên file mã nguồn gốc: `02-Lien_Ket_Doi_Dap_An.cpp`.

---

## Các Hàm Minh Họa

### 1. `xoaDau(danhSach &L)`
- **Ý tưởng**:
  - `p = L.dau`
  - `L.dau = L.dau->sau`
  - `L.dau->truoc = NULL`
  - `delete p`

### 2. `xoaCuoi(danhSach &L)`
- **Ý tưởng**:
  - `p = L.cuoi`
  - `L.cuoi = L.cuoi->truoc`
  - `L.cuoi->sau = NULL`
  - `delete p`

### 3. `xoaViTriK(danhSach &L, int k)`
- **Ý tưởng**:
  - Duyệt `dem` đến vị trí `k`, con trỏ `p` trỏ trực tiếp vào nút cần xóa.
  - Chuyển liên kết xuôi: `p->truoc->sau = p->sau`
  - Chuyển liên kết ngược: `p->sau->truoc = p->truoc`
  - Thu hồi vùng nhớ: `delete p`
