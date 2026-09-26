import { GraphTracer, LogTracer, Layout, Tracer } from 'algorithm-visualizer';

// ============================================================================
// MINH HỌA CÁC THAO TÁC XÓA TRONG DANH SÁCH LIÊN KẾT ĐƠN (DSA - HDU)
// Tham chiếu mã nguồn C++: 00-Danh_Sach_1_chieu.cpp
// Gồm 3 hàm: xoaDau(L), xoaCuoi(L), xoaViTriK(L, k)
// ============================================================================

const tracer = new GraphTracer('Mô Phỏng Danh Sách Liên Kết Đơn');
const logger = new LogTracer('Nhật Ký Thực Thi (C++ Tracer)');

tracer.directed(true);
tracer.weighted(false);

Layout.setRoot(new Layout([tracer, logger]));

// Khởi tạo danh sách ban đầu: 10 -> 20 -> 30 -> 40 -> 50 -> NULL
// Các Node: 1(10), 2(20), 3(30), 4(40), 5(50)
const initialNodes = [
  { id: 1, val: 10 },
  { id: 2, val: 20 },
  { id: 3, val: 30 },
  { id: 4, val: 40 },
  { id: 5, val: 50 },
];

initialNodes.forEach(node => tracer.addNode(node.id, node.val));
for (let i = 0; i < initialNodes.length - 1; i++) {
  tracer.addEdge(initialNodes[i].id, initialNodes[i + 1].id);
}
tracer.layoutTree(1);
Tracer.delay(1);

logger.println('====================================================');
logger.println('[DSA HDU] KHỞI TẠO DANH SÁCH LIÊN KẾT ĐƠN:');
logger.println('  L.dau -> [ 10 ] -> [ 20 ] -> [ 30 ] -> [ 40 ] -> [ 50 ] -> NULL');
logger.println('====================================================\n');
Tracer.delay(2);

// ----------------------------------------------------------------------------
// 1. MINH HỌA HÀM xoaDau(L)
// ----------------------------------------------------------------------------
logger.println('>>> [THAO TÁC 1]: THỰC THI HÀM xoaDau(L)');
logger.println('    - Dòng 167: nut *p = L.dau; (Trỏ p vào Node 1 [10])');
tracer.select(1);
Tracer.delay(167);

logger.println('    - Dòng 171: L.dau = L.dau->sau; (Dời L.dau sang Node 2 [20])');
tracer.visit(2);
Tracer.delay(171);

logger.println('    - Dòng 173: delete p; (Ngắt kết nối và giải phóng vùng nhớ Node 1)');
tracer.removeEdge(1, 2);
tracer.removeNode(1);
tracer.deselect(2);
tracer.layoutTree(2);
Tracer.delay(173);

logger.println('    => KẾT QUẢ XÓA ĐẦU: Danh sách còn lại: [ 20 ] -> [ 30 ] -> [ 40 ] -> [ 50 ] -> NULL\n');
Tracer.delay(174);

// ----------------------------------------------------------------------------
// 2. MINH HỌA HÀM xoaCuoi(L)
// ----------------------------------------------------------------------------
logger.println('>>> [THAO TÁC 2]: THỰC THI HÀM xoaCuoi(L)');
logger.println('    - Dòng 184: Duyệt tìm nút áp chót (p->sau->sau == NULL)...');
tracer.visit(2);
Tracer.delay(184);
tracer.leave(2);

tracer.visit(3);
Tracer.delay(185);
tracer.leave(3);

tracer.visit(4);
logger.println('    - Dòng 184: Dừng tại Node 4 [40] vì p->sau->sau == NULL');
logger.println('    - Dòng 187: nut *q = p->sau; (Đánh dấu nút cần xóa q = Node 5 [50])');
tracer.select(5);
Tracer.delay(187);

logger.println('    - Dòng 188-189: p->sau = NULL; L.cuoi = p; (Ngắt liên kết nút cuối)');
tracer.removeEdge(4, 5);
Tracer.delay(189);

logger.println('    - Dòng 190: delete q; (Giải phóng bộ nhớ Node 5)');
tracer.removeNode(5);
tracer.leave(4);
tracer.layoutTree(2);
Tracer.delay(190);

logger.println('    => KẾT QUẢ XÓA CUỐI: Danh sách còn lại: [ 20 ] -> [ 30 ] -> [ 40 ] -> NULL\n');
Tracer.delay(191);

// ----------------------------------------------------------------------------
// 3. MINH HỌA HÀM xoaViTriK(L, k) với k = 2 (Nút 30)
// ----------------------------------------------------------------------------
logger.println('>>> [THAO TÁC 3]: THỰC THI HÀM xoaViTriK(L, k = 2)');
logger.println('    - Mục tiêu: Xóa phần tử thứ 2 trong danh sách hiện tại (Node 3 [30])');
logger.println('    - Dòng 203: Duyệt biến đếm đến k - 1 = 1 (Dừng tại Node 2 [20])');
tracer.visit(2);
Tracer.delay(203);

logger.println('    - Dòng 207: nut *q = p->sau; (Nút bị xóa q là Node 3 [30])');
tracer.select(3);
Tracer.delay(207);

logger.println('    - Dòng 208: p->sau = q->sau; (Bắc cầu nối thẳng từ Node 2 sang Node 4)');
tracer.addEdge(2, 4);
tracer.removeEdge(2, 3);
tracer.removeEdge(3, 4);
Tracer.delay(208);

logger.println('    - Dòng 209: delete q; (Thu hồi vùng nhớ Node 3)');
tracer.removeNode(3);
tracer.leave(2);
tracer.layoutTree(2);
Tracer.delay(209);

logger.println('====================================================');
logger.println('[HOÀN THÀNH TOÀN BỘ 3 THAO TÁC XÓA TRÊN DANH SÁCH ĐƠN]');
logger.println('  Danh sách cuối cùng: [ 20 ] -> [ 40 ] -> NULL');
logger.println('====================================================');
