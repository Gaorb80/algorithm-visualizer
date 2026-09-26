# Cẩm Nang Sử Dụng Tracer API (Tracer API Guide)

Tài liệu này cung cấp hướng dẫn tra cứu đầy đủ về tất cả các lớp **Tracer** có sẵn trong **Algorithm Visualizer**, bao gồm phương thức, ý nghĩa, và ví dụ mã nguồn thực tế.

---

## 1. Danh Sách Các Lớp Tracer

| Tên Tracer | Mục Đích Sử Dụng | Renderer Đi Kèm |
| :--- | :--- | :--- |
| `Array1DTracer` | Mảng 1 chiều, danh sách tuyến tính, tìm kiếm & sắp xếp | `Array1DRenderer` |
| `Array2DTracer` | Ma trận, bảng 2D, bảng Quy hoạch động (DP Table) | `Array2DRenderer` |
| `GraphTracer` | Đồ thị vô hướng / có hướng, Cây (Tree), BST, đồ thị trọng số | `GraphRenderer` |
| `ChartTracer` | Biểu đồ cột phân bố giá trị số | `ChartRenderer` |
| `LogTracer` | Khung ghi nhật ký (Terminal Log / Output Text) | `LogRenderer` |
| `MarkdownTracer`| Hiển thị ghi chú giải thích, công thức định dạng Markdown | `MarkdownRenderer` |
| `ScatterTracer`| Biểu đồ điểm tọa độ 2D (Điểm trên mặt phẳng Oxy) | `ScatterRenderer` |

---

## 2. Chi Tiết API Từng Loại Tracer

### 2.1. `Array1DTracer` (Mảng 1 Chiều)

```javascript
// Khởi tạo
const tracer = new Array1DTracer('Mảng số nguyên');
Layout.setRoot(tracer);

// Thiết lập dữ liệu ban đầu
tracer.set([12, 4, 7, 9, 23, 1]);
Tracer.delay();

// Các phương thức tương tác:
tracer.select(index);          // Chọn và tô sáng phần tử tại vị trí index
tracer.deselect(index);        // Bỏ tô sáng phần tử
tracer.patch(index, newValue); // Cập nhật giá trị và tô màu phần tử thay đổi
tracer.depatch(index);         // Trả phần tử về trạng thái bình thường sau cập nhật
tracer.chart(chartTracer);     // Đồng bộ dữ liệu mảng với một ChartTracer
```

---

### 2.2. `Array2DTracer` (Ma Trận 2 Chiều)

```javascript
const tracer = new Array2DTracer('Ma trận DP');
Layout.setRoot(tracer);

// Thiết lập dữ liệu 2D
tracer.set([
  [0, 0, 0],
  [0, 1, 2],
  [0, 2, 4]
]);
Tracer.delay();

// Các phương thức tương tác:
tracer.select(row, col);              // Tô sáng 1 ô (row, col)
tracer.selectRow(row, startCol, endCol); // Tô sáng 1 khoảng trong hàng
tracer.selectCol(col, startRow, endRow); // Tô sáng 1 khoảng trong cột
tracer.deselect(row, col);            // Bỏ chọn ô
tracer.patch(row, col, newValue);     // Đổi giá trị ô và đánh dấu màu
tracer.depatch(row, col);             // Bỏ đánh dấu màu
```

---

### 2.3. `GraphTracer` (Đồ Thị & Cây)

`GraphTracer` hỗ trợ hiển thị đỉnh, cạnh có hướng/vô hướng, trọng số và các kiểu bố cục tự động (Hình tròn, Cây phân cấp, Ngẫu nhiên).

```javascript
const tracer = new GraphTracer('Đồ thị duyệt BFS');
const logger = new LogTracer('Nhật ký');
Layout.setRoot(new VerticalLayout([tracer, logger]));

// Cấu hình
tracer.directed(true); // true: có hướng, false: vô hướng
tracer.weighted(true); // true: có trọng số

// Thiết lập từ ma trận kề (Adjacency Matrix)
tracer.set([
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
  [0, 0, 0, 0]
]);

// Bố cục hiển thị:
tracer.layoutCircle();      // Bố cục tròn (mặc định cho đồ thị tổng quát)
tracer.layoutTree(rootId);  // Bố cục dạng Cây bắt đầu từ đỉnh rootId
tracer.layoutRandom();      // Bố cục phân bố ngẫu nhiên

// Kết nối với LogTracer để tự in log khi đi qua các đỉnh:
tracer.log(logger);

// Các thao tác duyệt:
tracer.visit(targetNode, sourceNode, weight);   // Duyệt đỉnh/cạnh (Màu đỏ/xanh viền)
tracer.leave(targetNode, sourceNode, weight);   // Rời khỏi đỉnh/cạnh sau khi backtrack
tracer.select(targetNode, sourceNode);          // Chọn cố định đỉnh/cạnh (đường đi ngắn nhất)
tracer.deselect(targetNode, sourceNode);        // Bỏ chọn
```

---

### 2.4. `LogTracer` & `MarkdownTracer`

```javascript
// LogTracer: Dùng để in thông tin từng bước
const logger = new LogTracer('Log');
logger.println('Bắt đầu thuật toán Dijkstra');
logger.print('Kiểm tra đỉnh 3...');
logger.printf('Khoảng cách nhỏ nhất hiện tại: %d\n', minDistance);

// MarkdownTracer: Dùng để render hướng dẫn, lý thuyết
const md = new MarkdownTracer('Giải thích');
md.set(`
### Thuật toán Quick Sort
- **Time Complexity**: $O(N \log N)$
- **Space Complexity**: $O(\log N)$
`);
```

---

### 2.5. Bố Cục Đa Khung Nhìn (`Layout`)

Để hiển thị nhiều Tracer cùng một lúc trên một màn hình:

```javascript
// 1. Sắp xếp ngang (HorizontalLayout)
Layout.setRoot(new HorizontalLayout([arrayTracer, chartTracer]));

// 2. Sắp xếp dọc (VerticalLayout)
Layout.setRoot(new VerticalLayout([graphTracer, logTracer]));

// 3. Lồng ghép phức hợp
Layout.setRoot(new HorizontalLayout([
  new VerticalLayout([arrayTracer, logTracer]),
  chartTracer
]));
```

---

## 3. Ví Dụ Mẫu Hoàn Chỉnh: Thuật Toán Bubble Sort (JavaScript)

```javascript
import { Array1DTracer, ChartTracer, LogTracer, Layout, Tracer } from 'algorithm-visualizer';

// Khởi tạo các tracers
const arrayTracer = new Array1DTracer('Mảng dữ liệu');
const chartTracer = new ChartTracer('Biểu đồ');
const logger = new LogTracer('Tiến trình');

// Kết nối Array1D với Chart
arrayTracer.chart(chartTracer);

// Bố cục giao diện
Layout.setRoot(new VerticalLayout([
  new HorizontalLayout([arrayTracer, chartTracer]),
  logger
]));

const D = [15, 8, 20, 2, 11, 6];
arrayTracer.set(D);
Tracer.delay();

logger.println(`Mảng ban đầu: [${D.join(', ')}]`);

for (let i = 0; i < D.length - 1; i++) {
  for (let j = 0; j < D.length - i - 1; j++) {
    // 1. Highlight 2 phần tử đang xét
    arrayTracer.select(j);
    arrayTracer.select(j + 1);
    Tracer.delay();

    if (D[j] > D[j + 1]) {
      logger.println(`Đổi chỗ ${D[j]} và ${D[j + 1]}`);
      
      // Hoán đổi
      const temp = D[j];
      D[j] = D[j + 1];
      D[j + 1] = temp;

      // Cập nhật lên đồ họa
      arrayTracer.patch(j, D[j]);
      arrayTracer.patch(j + 1, D[j + 1]);
      Tracer.delay();

      arrayTracer.depatch(j);
      arrayTracer.depatch(j + 1);
    }

    arrayTracer.deselect(j);
    arrayTracer.deselect(j + 1);
  }
}

logger.println('Hoàn thành sắp xếp!');
```
