import { LinkedListTracer, LogTracer, VerticalLayout, Layout, Tracer } from 'algorithm-visualizer';

// ============================================================================
// MINH HỌA CÁC THAO TÁC XÓA TRONG DANH SÁCH LIÊN KẾT ĐÔI (DSA - HDU)
// Tham chiếu mã nguồn C++: 02-Lien_Ket_Doi_Dap_An.cpp
// Bộ vẽ: LinkedListTracer (Chuẩn Anatomy Hộp Bộ Nhớ & Con Trỏ 2 Chiều)
// ============================================================================

const tracer = new LinkedListTracer('Mô Phỏng Danh Sách Liên Kết Đôi (Memory Anatomy)');
const logger = new LogTracer('Nhật Ký Thực Thi (C++ Tracer)');

Layout.setRoot(new VerticalLayout([tracer, logger]));

// Khởi tạo danh sách liên kết đôi: NULL <- [ 10 ] <-> [ 20 ] <-> [ 30 ] <-> [ 40 ] <-> [ 50 ] -> NULL
const nodes = [
  { id: 1, val: 10, addr: '0x20A0' },
  { id: 2, val: 20, addr: '0x20B8' },
  { id: 3, val: 30, addr: '0x20D0' },
  { id: 4, val: 40, addr: '0x20E8' },
  { id: 5, val: 50, addr: '0x2100' },
];

tracer.set(nodes, true);
tracer.setPointer('L.dau', 1);
tracer.setPointer('L.cuoi', 5);
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
logger.println('    - Dòng 192: nut *p = L.dau; (Gán p trỏ vào Node #1 [10])');
tracer.setPointer('p', 1);
tracer.focus(1);
Tracer.delay(192);

logger.println('    - Dòng 196-198: L.dau = L.dau->sau; L.dau->truoc = NULL; p->sau = NULL;');
tracer.setPointer('L.dau', 2);
tracer.target(1);
tracer.isolate(1);
Tracer.delay(197);

logger.println('    - Dòng 200: delete p; (Giải phóng vùng nhớ Node #1)');
tracer.removePointer('p');
tracer.removeNode(1);
tracer.unhighlight(2);
Tracer.delay(200);

logger.println('    => KẾT QUẢ XÓA ĐẦU: NULL <- [ 20 ] <-> [ 30 ] <-> [ 40 ] <-> [ 50 ] -> NULL\n');
Tracer.delay(201);

// ----------------------------------------------------------------------------
// 2. MINH HỌA HÀM xoaCuoi(L)
// ----------------------------------------------------------------------------
logger.println('>>> [THAO TÁC 2]: THỰC THI HÀM xoaCuoi(L)');
logger.println('    - Dòng 206: nut *p = L.cuoi; (Gán p trỏ vào nút cuối Node #5 [50])');
tracer.setPointer('p', 5);
tracer.target(5);
Tracer.delay(206);

logger.println('    - Dòng 210-212: L.cuoi = L.cuoi->truoc; L.cuoi->sau = NULL; p->truoc = NULL;');
tracer.setPointer('L.cuoi', 4);
tracer.isolate(5);
Tracer.delay(211);

logger.println('    - Dòng 214: delete p; (Giải phóng Node #5)');
tracer.removePointer('p');
tracer.removeNode(5);
tracer.unhighlight(4);
Tracer.delay(214);

logger.println('    => KẾT QUẢ XÓA CUỐI: NULL <- [ 20 ] <-> [ 30 ] <-> [ 40 ] -> NULL\n');
Tracer.delay(215);

// ----------------------------------------------------------------------------
// 3. MINH HỌA HÀM xoaViTriK(L, k = 2) (Xóa Node #3 [30])
// ----------------------------------------------------------------------------
logger.println('>>> [THAO TÁC 3]: THỰC THI HÀM xoaViTriK(L, k = 2)');
logger.println('    - Mục tiêu: Xóa nút ở giữa danh sách đôi (Node #3 [30])');
logger.println('    - Dòng 231-234: Duyệt biến dem đến k = 2 -> p trỏ trực tiếp vào Node #3 [30]');
tracer.setPointer('p', 3);
tracer.target(3);
tracer.focus(2);
tracer.focus(4);
Tracer.delay(234);

logger.println('    - Dòng 236: p->truoc->sau = p->sau; (Cầu tiến: Node #2 trỏ cóc qua Node #4)');
tracer.setBypass(2, 4, 'p->truoc->sau = p->sau');
Tracer.delay(236);

logger.println('    - Dòng 237: p->sau->truoc = p->truoc; (Cầu lùi: Node #4 trỏ cóc về Node #2)');
tracer.setPrevBypass(4, 2, 'p->sau->truoc = p->truoc');
Tracer.delay(237);

logger.println('    - Dòng 238-240: Cô lập và thu hồi delete p (Node #3)');
tracer.isolate(3);
tracer.removePointer('p');
Tracer.delay(240);

tracer.removeNode(3);
tracer.unhighlight(2);
tracer.unhighlight(4);
Tracer.delay(241);

logger.println('====================================================');
logger.println('[HOÀN THÀNH TOÀN BỘ 3 THAO TÁC XÓA TRÊN DANH SÁCH ĐÔI]');
logger.println('  Danh sách cuối cùng: NULL <- [ 20 ] <-> [ 40 ] -> NULL');
logger.println('====================================================');
