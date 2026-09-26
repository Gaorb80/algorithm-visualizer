import { LinkedListTracer, LogTracer, VerticalLayout, Layout, Tracer } from 'algorithm-visualizer';

// ============================================================================
// MINH HỌA CÁC THAO TÁC XÓA TRONG DANH SÁCH LIÊN KẾT ĐƠN (DSA - HDU)
// Tham chiếu mã nguồn C++: 00-Danh_Sach_1_chieu.cpp
// Bộ vẽ: LinkedListTracer (Chuẩn Anatomy Hộp Bộ Nhớ & Con Trỏ)
// ============================================================================

const tracer = new LinkedListTracer('Mô Phỏng Danh Sách Liên Kết Đơn (Memory Anatomy)');
const logger = new LogTracer('Nhật Ký Thực Thi (C++ Tracer)');

Layout.setRoot(new VerticalLayout([tracer, logger]));

// Khởi tạo danh sách ban đầu: 10 -> 20 -> 30 -> 40 -> 50 -> NULL
const nodes = [
  { id: 1, val: 10, addr: '0x10A4' },
  { id: 2, val: 20, addr: '0x10B8' },
  { id: 3, val: 30, addr: '0x10CC' },
  { id: 4, val: 40, addr: '0x10E0' },
  { id: 5, val: 50, addr: '0x10F4' },
];

tracer.set(nodes, false);
tracer.setPointer('L.dau', 1);
tracer.setPointer('L.cuoi', 5);
Tracer.delay(1);

logger.println('====================================================');
logger.println('[DSA HDU] KHỞI TẠO DANH SÁCH LIÊN KẾT ĐƠN:');
logger.println('  L.dau [0x10A4] -> [ 10 ] -> [ 20 ] -> [ 30 ] -> [ 40 ] -> [ 50 ] -> NULL (L.cuoi)');
logger.println('====================================================\n');
Tracer.delay(2);

// ----------------------------------------------------------------------------
// 1. MINH HỌA HÀM xoaDau(L)
// ----------------------------------------------------------------------------
logger.println('>>> [THAO TÁC 1]: THỰC THI HÀM xoaDau(L)');
logger.println('    - Dòng 167: nut *p = L.dau; (Gán con trỏ tạm p trỏ vào Node #1 [10])');
tracer.setPointer('p', 1);
tracer.focus(1);
Tracer.delay(167);

logger.println('    - Dòng 171: L.dau = L.dau->sau; (Dời L.dau sang Node #2 [20])');
tracer.setPointer('L.dau', 2);
tracer.target(1);
Tracer.delay(171);

logger.println('    - Dòng 173: delete p; (Cô lập và thu hồi vùng nhớ Node #1)');
tracer.isolate(1);
tracer.removePointer('p');
Tracer.delay(172);

tracer.removeNode(1);
tracer.unhighlight(2);
Tracer.delay(173);

logger.println('    => KẾT QUẢ XÓA ĐẦU: L.dau [0x10B8] -> [ 20 ] -> [ 30 ] -> [ 40 ] -> [ 50 ] -> NULL\n');
Tracer.delay(174);

// ----------------------------------------------------------------------------
// 2. MINH HỌA HÀM xoaCuoi(L)
// ----------------------------------------------------------------------------
logger.println('>>> [THAO TÁC 2]: THỰC THI HÀM xoaCuoi(L)');
logger.println('    - Dòng 184: Duyệt tìm nút áp chót (p->sau->sau == NULL)...');
tracer.setPointer('p', 2);
Tracer.delay(184);

tracer.setPointer('p', 3);
Tracer.delay(185);

tracer.setPointer('p', 4);
logger.println('    - Dòng 184: Dừng tại Node #4 [40] vì p->sau->sau == NULL');
logger.println('    - Dòng 187: nut *q = p->sau; (Đánh dấu nút cần xóa q = Node #5 [50])');
tracer.setPointer('q', 5);
tracer.focus(4);
tracer.target(5);
Tracer.delay(187);

logger.println('    - Dòng 188-189: p->sau = NULL; L.cuoi = p; (Ngắt liên kết nút cuối, dời L.cuoi về Node #4)');
tracer.setPointer('L.cuoi', 4);
tracer.isolate(5);
Tracer.delay(189);

logger.println('    - Dòng 190: delete q; (Thu hồi vùng nhớ Node #5)');
tracer.removePointer('q');
tracer.removePointer('p');
tracer.removeNode(5);
tracer.unhighlight(4);
Tracer.delay(190);

logger.println('    => KẾT QUẢ XÓA CUỐI: L.dau -> [ 20 ] -> [ 30 ] -> [ 40 ] -> NULL (L.cuoi)\n');
Tracer.delay(191);

// ----------------------------------------------------------------------------
// 3. MINH HỌA HÀM xoaViTriK(L, k = 2) (Xóa Node #3 [30])
// ----------------------------------------------------------------------------
logger.println('>>> [THAO TÁC 3]: THỰC THI HÀM xoaViTriK(L, k = 2)');
logger.println('    - Mục tiêu: Xóa phần tử thứ 2 trong danh sách hiện tại (Node #3 [30])');
logger.println('    - Dòng 203: Duyệt biến dem đến k - 1 = 1 (Dừng tại Node #2 [20])');
tracer.setPointer('p', 2);
tracer.focus(2);
Tracer.delay(203);

logger.println('    - Dòng 207: nut *q = p->sau; (Nút bị xóa q là Node #3 [30])');
tracer.setPointer('q', 3);
tracer.target(3);
Tracer.delay(207);

logger.println('    - Dòng 208: p->sau = q->sau; (Bắc cầu nối thẳng từ Node #2 sang Node #4)');
tracer.setBypass(2, 4, 'p->sau = q->sau');
Tracer.delay(208);

logger.println('    - Dòng 209: delete q; (Cô lập và thu hồi vùng nhớ Node #3)');
tracer.isolate(3);
tracer.removePointer('q');
tracer.removePointer('p');
Tracer.delay(209);

tracer.removeNode(3);
tracer.unhighlight(2);
Tracer.delay(210);

logger.println('====================================================');
logger.println('[HOÀN THÀNH TOÀN BỘ 3 THAO TÁC XÓA TRÊN DANH SÁCH ĐƠN]');
logger.println('  Danh sách cuối cùng: L.dau -> [ 20 ] -> [ 40 ] -> NULL (L.cuoi)');
logger.println('====================================================');
