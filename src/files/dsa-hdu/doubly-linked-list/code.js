import { GraphTracer, LogTracer, Layout, Tracer } from 'algorithm-visualizer';

// ============================================================================
// MINH HỌA CÁC THAO TÁC XÓA TRONG DANH SÁCH LIÊN KẾT ĐÔI (DSA - HDU)
// Tham chiếu mã nguồn C++: 02-Lien_Ket_Doi_Dap_An.cpp
// Gồm 3 hàm: xoaDau(L), xoaCuoi(L), xoaViTriK(L, k)
// ============================================================================

const tracer = new GraphTracer('Mô Phỏng Danh Sách Liên Kết Đôi');
const logger = new LogTracer('Nhật Ký Thực Thi (C++ Tracer)');

tracer.directed(true);
tracer.weighted(false);

Layout.setRoot(new Layout([tracer, logger]));

// Khởi tạo danh sách đôi ban đầu: NULL <- [ 10 ] <-> [ 20 ] <-> [ 30 ] <-> [ 40 ] <-> [ 50 ] -> NULL
const initialNodes = [
  { id: 1, val: 10 },
  { id: 2, val: 20 },
  { id: 3, val: 30 },
  { id: 4, val: 40 },
  { id: 5, val: 50 },
];

initialNodes.forEach(node => tracer.addNode(node.id, node.val));
for (let i = 0; i < initialNodes.length - 1; i++) {
  // Liên kết xuôi (sau)
  tracer.addEdge(initialNodes[i].id, initialNodes[i + 1].id);
  // Liên kết ngược (truoc)
  tracer.addEdge(initialNodes[i + 1].id, initialNodes[i].id);
}
tracer.layoutTree(1);
Tracer.delay(1);

logger.println('====================================================');
logger.println('[DSA HDU] KHỞI TẠO DANH SÁCH LIÊN KẾT ĐÔI:');
logger.println('  NULL <- [ 10 ] <-> [ 20 ] <-> [ 30 ] <-> [ 40 ] <-> [ 50 ] -> NULL');
logger.println('====================================================\n');
Tracer.delay(2);

// ----------------------------------------------------------------------------
// 1. MINH HỌA HÀM xoaDau(L)
// ----------------------------------------------------------------------------
logger.println('>>> [THAO TÁC 1]: THỰC THI HÀM xoaDau(L)');
logger.println('    - Dòng 192: nut *p = L.dau; (Đánh dấu Node 1 [10])');
tracer.select(1);
Tracer.delay(192);

logger.println('    - Dòng 196-198: L.dau = L.dau->sau; L.dau->truoc = NULL; p->sau = NULL;');
tracer.removeEdge(1, 2);
tracer.removeEdge(2, 1);
tracer.visit(2);
Tracer.delay(197);

logger.println('    - Dòng 200: delete p; (Giải phóng Node 1)');
tracer.removeNode(1);
tracer.leave(2);
tracer.layoutTree(2);
Tracer.delay(200);

logger.println('    => KẾT QUẢ XÓA ĐẦU: NULL <- [ 20 ] <-> [ 30 ] <-> [ 40 ] <-> [ 50 ] -> NULL\n');
Tracer.delay(201);

// ----------------------------------------------------------------------------
// 2. MINH HỌA HÀM xoaCuoi(L)
// ----------------------------------------------------------------------------
logger.println('>>> [THAO TÁC 2]: THỰC THI HÀM xoaCuoi(L)');
logger.println('    - Dòng 206: nut *p = L.cuoi; (Đánh dấu nút cuối Node 5 [50])');
tracer.select(5);
Tracer.delay(206);

logger.println('    - Dòng 210-212: L.cuoi = L.cuoi->truoc; L.cuoi->sau = NULL; p->truoc = NULL;');
tracer.removeEdge(4, 5);
tracer.removeEdge(5, 4);
tracer.visit(4);
Tracer.delay(211);

logger.println('    - Dòng 214: delete p; (Giải phóng Node 5)');
tracer.removeNode(5);
tracer.leave(4);
tracer.layoutTree(2);
Tracer.delay(214);

logger.println('    => KẾT QUẢ XÓA CUỐI: NULL <- [ 20 ] <-> [ 30 ] <-> [ 40 ] -> NULL\n');
Tracer.delay(215);

// ----------------------------------------------------------------------------
// 3. MINH HỌA HÀM xoaViTriK(L, k = 2) (Xóa Node 3 [30])
// ----------------------------------------------------------------------------
logger.println('>>> [THAO TÁC 3]: THỰC THI HÀM xoaViTriK(L, k = 2)');
logger.println('    - Mục tiêu: Xóa nút ở giữa danh sách đôi (Node 3 [30])');
logger.println('    - Dòng 231-234: Duyệt biến dem đến k = 2 -> p trỏ tới Node 3 [30]');
tracer.select(3);
Tracer.delay(234);

logger.println('    - Dòng 236: p->truoc->sau = p->sau; (Mũi tên xuôi: Node 2 nhảy cóc trỏ tới Node 4)');
tracer.addEdge(2, 4);
tracer.removeEdge(2, 3);
Tracer.delay(236);

logger.println('    - Dòng 237: p->sau->truoc = p->truoc; (Mũi tên ngược: Node 4 nhảy cóc trỏ về Node 2)');
tracer.addEdge(4, 2);
tracer.removeEdge(4, 3);
Tracer.delay(237);

logger.println('    - Dòng 238-240: Cô lập và thu hồi delete p (Node 3)');
tracer.removeEdge(3, 2);
tracer.removeEdge(3, 4);
tracer.removeNode(3);
tracer.layoutTree(2);
Tracer.delay(240);

logger.println('====================================================');
logger.println('[HOÀN THÀNH TOÀN BỘ 3 THAO TÁC XÓA TRÊN DANH SÁCH ĐÔI]');
logger.println('  Danh sách cuối cùng: NULL <- [ 20 ] <-> [ 40 ] -> NULL');
logger.println('====================================================');
