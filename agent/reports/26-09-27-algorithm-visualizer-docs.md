---
date: 2026-09-27
type: work-report
topic: synchronize-null-nodes-and-arrows
status: completed
agent: antigravity
---

# Task

Đồng bộ kích thước, vị trí và hiển thị mũi tên kết nối cho các khối `NULL` ở cả hai đầu của Danh sách liên kết.

## Actions

- **Chuẩn hóa khối `NULL`**:
  - Cập nhật [`src/core/renderers/LinkedListRenderer/LinkedListRenderer.module.scss`](file:///E:/GitHub/algorithm-visualizer/src/core/renderers/LinkedListRenderer/LinkedListRenderer.module.scss):
    - Khối `NULL` được bọc trong cấu trúc `.null_wrapper` với kích thước, header `HEAD`/`TAIL`, body `NULL`, footer `nullptr` đồng bộ 100% cùng đường đáy (baseline) với các thẻ `.node_card`.
- **Mũi tên kết nối đến `NULL`**:
  - Cập nhật [`src/core/renderers/LinkedListRenderer/index.js`](file:///E:/GitHub/algorithm-visualizer/src/core/renderers/LinkedListRenderer/index.js):
    - Danh sách đôi: Vẽ mũi tên trỏ về `NULL` bên trái (`Node #1` $\to$ `NULL (HEAD)`).
    - Cả danh sách đơn và đôi: Vẽ mũi tên trỏ vào `NULL` bên phải (`Node #last` $\to$ `NULL (TAIL)`).
    - Khoảng cách giữa các nút và `NULL` được căn đều chính xác $36\text{px}$.

## Result

- Giao diện danh sách liên kết hiển thị đối xứng, liền mạch, đồng bộ tuyệt đối về kích thước và con trỏ kết thúc.
- Build thành công và đồng bộ lên `antigravity-working` cũng như cập nhật Pull Request #2.
