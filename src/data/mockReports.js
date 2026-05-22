/**
 * Mock reports data for Parent Dashboard
 * TODO: Replace with API calls to analytics service
 */

export const mockWeeklyReports = [
  {
    id: 'report-w1',
    week: 1,
    dateRange: '01/04 - 07/04',
    challengeCompleted: true,
    challengeTitle: 'Con muốn hay con cần?',
    moneyRecorded: 100000,
    savingAmount: 40000,
    spendingAmount: 40000,
    sharingAmount: 20000,
    itemsReviewed: 2,
    itemsReused: 1,
    itemsDonated: 0,
    itemsSold: 1,
    avoidedPurchases: 1,
    teachBackCompleted: true,
    skillsLearned: ['needs-vs-wants', 'delayed-gratification'],
    parentInsight: 'Tuần này Minh đã hiểu rõ sự khác biệt giữa "cần" và "muốn". Bé chọn chờ thêm trước khi mua robot mới — thể hiện kỹ năng kiên nhẫn tốt!',
  },
  {
    id: 'report-w2',
    week: 2,
    dateRange: '08/04 - 14/04',
    challengeCompleted: true,
    challengeTitle: 'Lọ tiết kiệm kỳ diệu',
    moneyRecorded: 100000,
    savingAmount: 50000,
    spendingAmount: 30000,
    sharingAmount: 20000,
    itemsReviewed: 1,
    itemsReused: 0,
    itemsDonated: 0,
    itemsSold: 0,
    avoidedPurchases: 0,
    teachBackCompleted: true,
    skillsLearned: ['saving-goal', 'budgeting', 'sharing'],
    parentInsight: 'Minh đã phân bổ tiền hợp lý vào 3 lọ. Bé chọn tiết kiệm 50% vì muốn mua sách mới sau 4 tuần. Rất tốt!',
  },
  {
    id: 'report-w3',
    week: 3,
    dateRange: '15/04 - 21/04',
    challengeCompleted: true,
    challengeTitle: 'Đồ cũ kể chuyện',
    moneyRecorded: 80000,
    savingAmount: 30000,
    spendingAmount: 30000,
    sharingAmount: 20000,
    itemsReviewed: 3,
    itemsReused: 1,
    itemsDonated: 1,
    itemsSold: 1,
    avoidedPurchases: 2,
    teachBackCompleted: true,
    skillsLearned: ['reuse-thinking', 'responsible-consumption', 'decluttering'],
    parentInsight: 'Minh đã tìm được 3 món đồ không dùng và quyết định tặng áo cũ cho em họ. Bé bán bộ LEGO và tiết kiệm tiền. Tinh thần tái sử dụng rất tốt!',
  },
];

export const mockJarHistory = [
  { week: 1, saving: 40000, spending: 40000, sharing: 20000 },
  { week: 2, saving: 50000, spending: 30000, sharing: 20000 },
  { week: 3, saving: 30000, spending: 30000, sharing: 20000 },
  { week: 4, saving: 0, spending: 0, sharing: 0 },
];

export const mockDashboardStats = {
  totalMoneyRecorded: 280000,
  totalSaving: 120000,
  totalSpending: 100000,
  totalSharing: 60000,
  savingRatio: 43,
  spendingRatio: 36,
  sharingRatio: 21,
  challengesCompleted: 3,
  totalChallenges: 8,
  teachBackCount: 3,
  itemsReviewed: 6,
  itemsReused: 2,
  itemsDonated: 1,
  itemsSold: 2,
  avoidedPurchases: 3,
  streak: 5,
  skillTags: ['needs-vs-wants', 'delayed-gratification', 'saving-goal', 'budgeting', 'sharing', 'reuse-thinking', 'responsible-consumption'],
};

export const mockMoneyFlowChart = [
  { name: 'Tuần 1', tiết_kiệm: 40000, chi_tiêu: 40000, chia_sẻ: 20000 },
  { name: 'Tuần 2', tiết_kiệm: 50000, chi_tiêu: 30000, chia_sẻ: 20000 },
  { name: 'Tuần 3', tiết_kiệm: 30000, chi_tiêu: 30000, chia_sẻ: 20000 },
];
