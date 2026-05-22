/**
 * API utility - Mock async functions
 * TODO: Replace each function with actual API calls to backend
 * 
 * Usage pattern:
 *   const data = await api.getChallenges();
 * 
 * When backend is ready, simply update the implementation
 * of each function to use fetch/axios with real endpoints.
 */

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  // ===== Auth =====
  /** TODO: POST /api/auth/login */
  login: async (role) => {
    await delay(300);
    return { success: true, role };
  },

  /** TODO: POST /api/auth/logout */
  logout: async () => {
    await delay(200);
    return { success: true };
  },

  // ===== Challenges =====
  /** TODO: GET /api/challenges */
  getChallenges: async () => {
    await delay(400);
    const { weeklyChallengeCurriculum } = await import('../data/mockChallenges');
    return weeklyChallengeCurriculum;
  },

  /** TODO: POST /api/challenges/:id/submit */
  submitChallenge: async (challengeId, answers, decision) => {
    await delay(600);
    return { success: true, challengeId, xpEarned: 60 };
  },

  // ===== Items =====
  /** TODO: GET /api/items?childId=xxx */
  getItems: async (childId) => {
    await delay(400);
    const { mockItems } = await import('../data/mockItems');
    return mockItems.filter((i) => i.childId === childId);
  },

  /** TODO: POST /api/items */
  createItem: async (itemData) => {
    await delay(500);
    return { success: true, id: `item-${Date.now()}` };
  },

  /** TODO: PUT /api/items/:id/action */
  updateItemAction: async (itemId, action, reason, price) => {
    await delay(400);
    return { success: true };
  },

  // ===== Approvals =====
  /** TODO: GET /api/approvals?parentId=xxx */
  getApprovals: async (parentId) => {
    await delay(400);
    const { mockApprovals } = await import('../data/mockApprovals');
    return mockApprovals;
  },

  /** TODO: PUT /api/approvals/:id */
  updateApproval: async (approvalId, status) => {
    await delay(400);
    return { success: true };
  },

  // ===== Three Jars =====
  /** TODO: GET /api/jars?childId=xxx */
  getJars: async (childId) => {
    await delay(300);
    return { saving: 120000, spending: 100000, sharing: 60000 };
  },

  /** TODO: POST /api/jars/allocate */
  allocateMoney: async (childId, distribution) => {
    await delay(500);
    return { success: true };
  },

  // ===== Reports =====
  /** TODO: GET /api/reports?childId=xxx */
  getReports: async (childId) => {
    await delay(400);
    const { mockWeeklyReports } = await import('../data/mockReports');
    return mockWeeklyReports;
  },

  /** TODO: GET /api/dashboard?childId=xxx */
  getDashboardStats: async (childId) => {
    await delay(400);
    const { mockDashboardStats } = await import('../data/mockReports');
    return mockDashboardStats;
  },

  // ===== Money Confirmation =====
  /** TODO: POST /api/money/confirm */
  confirmMoney: async (amount, note) => {
    await delay(500);
    return { success: true, transactionId: `txn-${Date.now()}` };
  },

  // ===== Teach AI =====
  /** TODO: POST /api/teach-ai/respond */
  submitTeachAIResponse: async (response) => {
    await delay(600);
    return {
      success: true,
      followUp: 'Hay quá! Vậy con nghĩ mình đã tiết kiệm được bao nhiêu từ quyết định này?',
      skillTags: ['delayed-gratification', 'saving-goal'],
    };
  },
};

export default api;
