/**
 * Mock users data for CIRCL platform
 * TODO: Replace with API calls to backend user service
 */

export const mockChild = {
  id: 'child-001',
  name: 'Minh',
  age: 9,
  avatar: '🧒',
  role: 'child',
  parentId: 'parent-001',
  streak: 5,
  currentWeek: 4,
  totalWeeks: 8,
  xp: 340,
  level: 3,
  joinDate: '2026-04-01',
  completedChallenges: [1, 2, 3],
  badges: ['Nhà tiết kiệm nhí', 'Người tiêu dùng thông thái', 'Bảo vệ môi trường'],
};

export const mockParent = {
  id: 'parent-001',
  name: 'Chị Lan',
  avatar: '👩',
  role: 'parent',
  childrenIds: ['child-001'],
  email: 'lan.nguyen@email.com',
  joinDate: '2026-03-28',
  notificationsEnabled: true,
};

export const mockAdmin = {
  id: 'admin-001',
  name: 'Admin CIRCL',
  avatar: '🛡️',
  role: 'admin',
  email: 'admin@circl.vn',
};

export const roles = [
  {
    id: 'child',
    label: 'Con',
    description: 'Học quản lý tiền và tiêu dùng có trách nhiệm',
    emoji: '🧒',
    color: 'from-mint-400 to-leaf-400',
    bgColor: 'bg-mint-50',
  },
  {
    id: 'parent',
    label: 'Phụ huynh',
    description: 'Theo dõi và hướng dẫn con học tài chính',
    emoji: '👩',
    color: 'from-leaf-400 to-mint-500',
    bgColor: 'bg-leaf-50',
  },
  {
    id: 'admin',
    label: 'Quản trị',
    description: 'Quản lý hệ thống và nội dung CIRCL',
    emoji: '🛡️',
    color: 'from-sun-400 to-coral-400',
    bgColor: 'bg-sun-50',
  },
];
