/**
 * CIRCL Global Store using Zustand
 * Manages user session, approvals, challenges, jars, and items state
 * TODO: Replace mock mutations with actual API calls
 */

import { create } from 'zustand';
import { mockChild, mockParent, mockAdmin } from '../data/mockUsers';
import { weeklyChallengeCurriculum } from '../data/mockChallenges';
import { mockItems } from '../data/mockItems';
import { mockApprovals } from '../data/mockApprovals';
import { mockDashboardStats, mockJarHistory } from '../data/mockReports';

const useStore = create((set, get) => ({
  // ===== User / Auth State =====
  currentUser: null,
  currentRole: null,

  setRole: (role) => {
    const userMap = {
      child: mockChild,
      parent: mockParent,
      admin: mockAdmin,
    };
    set({
      currentUser: userMap[role] || null,
      currentRole: role,
    });
  },

  logout: () => {
    set({ currentUser: null, currentRole: null });
  },

  // ===== Challenge State =====
  challenges: [...weeklyChallengeCurriculum],
  currentChallengeStep: 0,
  challengeAnswers: {},
  challengeDecision: null,
  challengeSubmitted: false,

  setChallengeStep: (step) => set({ currentChallengeStep: step }),

  setChallengeAnswer: (questionId, answer) =>
    set((state) => ({
      challengeAnswers: { ...state.challengeAnswers, [questionId]: answer },
    })),

  setChallengeDecision: (decision) => set({ challengeDecision: decision }),

  submitChallenge: () => {
    set((state) => {
      const updatedChallenges = state.challenges.map((c) =>
        c.status === 'active' ? { ...c, status: 'completed' } : c
      );
      // Unlock the next locked challenge
      const nextIdx = updatedChallenges.findIndex((c) => c.status === 'locked');
      if (nextIdx !== -1) {
        updatedChallenges[nextIdx] = { ...updatedChallenges[nextIdx], status: 'active' };
      }
      return {
        challenges: updatedChallenges,
        challengeSubmitted: true,
        currentChallengeStep: 0,
        challengeAnswers: {},
        challengeDecision: null,
      };
    });
  },

  resetChallengeFlow: () =>
    set({
      currentChallengeStep: 0,
      challengeAnswers: {},
      challengeDecision: null,
      challengeSubmitted: false,
    }),

  // ===== Three Jars State =====
  jars: {
    saving: 120000,
    spending: 100000,
    sharing: 60000,
  },
  jarHistory: [...mockJarHistory],
  pendingAllocation: null,

  allocateMoney: (amount, distribution) => {
    // distribution = { saving: x, spending: y, sharing: z }
    set((state) => ({
      jars: {
        saving: state.jars.saving + distribution.saving,
        spending: state.jars.spending + distribution.spending,
        sharing: state.jars.sharing + distribution.sharing,
      },
      jarHistory: [
        ...state.jarHistory,
        {
          week: state.jarHistory.length + 1,
          ...distribution,
        },
      ],
    }));
  },

  setPendingAllocation: (allocation) => set({ pendingAllocation: allocation }),

  // ===== Items State =====
  items: [...mockItems],

  addItem: (item) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          ...item,
          id: `item-${Date.now()}`,
          parentApproval: 'pending',
          listingStatus: 'pending',
          createdAt: new Date().toISOString().split('T')[0],
          childId: 'child-001',
        },
      ],
    })),

  updateItemAction: (itemId, action, reason, price) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              action: action.id,
              actionLabel: action.label,
              reason,
              estimatedPrice: price,
              parentApproval: 'pending',
            }
          : item
      ),
    })),

  // ===== Approvals State =====
  approvals: [...mockApprovals],

  approveItem: (approvalId) =>
    set((state) => ({
      approvals: state.approvals.map((a) =>
        a.id === approvalId ? { ...a, status: 'approved' } : a
      ),
    })),

  rejectItem: (approvalId) =>
    set((state) => ({
      approvals: state.approvals.map((a) =>
        a.id === approvalId ? { ...a, status: 'rejected' } : a
      ),
    })),

  requestEdit: (approvalId) =>
    set((state) => ({
      approvals: state.approvals.map((a) =>
        a.id === approvalId ? { ...a, status: 'edit-requested' } : a
      ),
    })),

  // ===== Dashboard Stats =====
  dashboardStats: { ...mockDashboardStats },

  // ===== Money Confirmation =====
  confirmedTransactions: [],

  confirmMoney: (amount, note) =>
    set((state) => ({
      confirmedTransactions: [
        ...state.confirmedTransactions,
        {
          id: `txn-${Date.now()}`,
          amount,
          note,
          confirmedAt: new Date().toISOString(),
        },
      ],
    })),

  // ===== Teach AI State =====
  teachAIResponses: [],
  teachAIStep: 0,

  setTeachAIStep: (step) => set({ teachAIStep: step }),

  addTeachAIResponse: (response) =>
    set((state) => ({
      teachAIResponses: [...state.teachAIResponses, response],
    })),

  resetTeachAI: () =>
    set({ teachAIResponses: [], teachAIStep: 0 }),
}));

export default useStore;
