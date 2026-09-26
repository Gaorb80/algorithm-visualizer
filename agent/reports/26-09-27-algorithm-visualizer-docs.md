---
date: 2026-09-27
type: work-report
topic: fix-tail-null-arrow-pointing
status: completed
agent: antigravity
---

# Task

Khắc phục tọa độ đường vẽ SVG để mũi tên kết nối từ nút cuối cùng trỏ thẳng và chuẩn xác vào khối `TAIL (NULL)`.

## Actions

- Cập nhật [`src/core/renderers/LinkedListRenderer/index.js`](file:///E:/GitHub/algorithm-visualizer/src/core/renderers/LinkedListRenderer/index.js):
  - Sửa lại tọa độ đích `x2` của đường vẽ mũi tên đến khối `Right NULL` (`x2 = startX + nodes.length * totalNodeSlot + 4`).
  - Mũi tên từ `Node #last` trỏ thẳng sang khối `TAIL (NULL)` với khoảng cách và đầu mũi tên rõ nét, đồng bộ hoàn toàn như các liên kết giữa các Node.

## Result

- Mũi tên trỏ vào khối `TAIL (NULL)` hiển thị rõ ràng, chuẩn xác và liền mạch trên cả Danh sách đơn và Danh sách đôi.
- Đồng bộ lên nhánh `antigravity-working` và cập nhật Pull Request #2.
