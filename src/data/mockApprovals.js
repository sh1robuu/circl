/**
 * Mock approvals data for Parent Approval Queue
 * TODO: Replace with API calls to approval service
 */

export const mockApprovals = [
  {
    id: 'approval-001',
    type: 'challenge',
    typeLabel: 'Nhiệm vụ tuần',
    title: 'Mua thông minh - Tuần 4',
    childName: 'Minh',
    childId: 'child-001',
    submittedAt: '2026-04-28T10:30:00',
    status: 'pending',
    content: {
      challengeTitle: 'Mua thông minh',
      answers: [
        { question: 'Con đang muốn mua gì?', answer: 'Con muốn mua bộ màu vẽ mới' },
        { question: 'Có thể tìm giá rẻ hơn?', answer: 'Có, con tìm được trên mạng đồ cũ' },
        { question: 'Nếu chờ 1 tuần?', answer: 'Có thể không muốn nữa' },
      ],
      decision: 'Chờ 1 tuần',
      decisionEmoji: '📅',
    },
    riskChecklist: [
      { label: 'Không có thông tin cá nhân', checked: true },
      { label: 'Phù hợp với lứa tuổi', checked: true },
      { label: 'Không có nội dung nhạy cảm', checked: true },
    ],
  },
  {
    id: 'approval-002',
    type: 'item-action',
    typeLabel: 'Hành động với đồ',
    title: 'Tặng áo khoác mùa đông',
    childName: 'Minh',
    childId: 'child-001',
    submittedAt: '2026-04-27T14:00:00',
    status: 'pending',
    content: {
      itemName: 'Áo khoác mùa đông size 130',
      action: 'Tặng',
      reason: 'Con mặc không vừa nữa, muốn tặng cho bạn cần',
      estimatedPrice: null,
    },
    riskChecklist: [
      { label: 'Không có ảnh khuôn mặt trẻ', checked: true },
      { label: 'Không lộ địa chỉ', checked: true },
      { label: 'Phụ huynh đồng ý giao dịch', checked: false },
    ],
  },
  {
    id: 'approval-003',
    type: 'item-action',
    typeLabel: 'Hành động với đồ',
    title: 'Đổi bút màu lấy bút chì nước',
    childName: 'Minh',
    childId: 'child-001',
    submittedAt: '2026-04-26T09:15:00',
    status: 'pending',
    content: {
      itemName: 'Hộp bút màu 24 cây Faber-Castell',
      action: 'Đổi',
      reason: 'Con muốn đổi lấy bút chì màu nước',
      estimatedPrice: 30000,
    },
    riskChecklist: [
      { label: 'Không có ảnh khuôn mặt trẻ', checked: true },
      { label: 'Không lộ thông tin cá nhân', checked: true },
      { label: 'Giá trị trao đổi hợp lý', checked: true },
    ],
  },
  {
    id: 'approval-004',
    type: 'money-split',
    typeLabel: 'Chia tiền vào lọ',
    title: 'Phân bổ 100.000đ vào 3 lọ',
    childName: 'Minh',
    childId: 'child-001',
    submittedAt: '2026-04-25T16:45:00',
    status: 'approved',
    content: {
      totalAmount: 100000,
      saving: 40000,
      spending: 35000,
      sharing: 25000,
    },
    riskChecklist: [
      { label: 'Số tiền hợp lý', checked: true },
      { label: 'Phân bổ cân đối', checked: true },
    ],
  },
];

export const approvalTypes = [
  { id: 'challenge', label: 'Nhiệm vụ tuần', emoji: '📋', color: 'mint' },
  { id: 'item-action', label: 'Hành động với đồ', emoji: '📦', color: 'sun' },
  { id: 'listing', label: 'Đăng bán', emoji: '🏷️', color: 'leaf' },
  { id: 'money-split', label: 'Chia tiền vào lọ', emoji: '🏦', color: 'coral' },
];
