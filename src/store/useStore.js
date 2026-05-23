/**
 * CIRCL Global Store using Zustand
 * Manages auth, challenges, jars, items, and approvals
 */

import { create } from 'zustand';
import { mockChild, mockParent, mockAdmin } from '../data/mockUsers';
import { weeklyChallengeCurriculum } from '../data/mockChallenges';
import { mockItems } from '../data/mockItems';
import { mockApprovals } from '../data/mockApprovals';
import { mockDashboardStats, mockJarHistory } from '../data/mockReports';
import { onAuthChange, getUserProfile, logoutUser, updateUserProfile } from '../utils/auth';

const useStore = create((set, get) => ({
  // ===== Auth State =====
  currentUser: null,
  currentRole: null,
  isAuthenticated: false,
  authLoading: true,

  // Initialize Firebase auth listener
  initAuth: () => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch profile from Firestore
          const profile = await getUserProfile(firebaseUser.uid);
          if (profile) {
            // Merge with mock data for demo richness
            const mockMap = { child: mockChild, parent: mockParent, admin: mockAdmin };
            const merged = { ...mockMap[profile.role], ...profile };
            set({ currentUser: merged, currentRole: profile.role, isAuthenticated: true, authLoading: false });
            return;
          }
        } catch (e) {
          console.error('Failed to load profile:', e);
        }
        // Fallback: basic Firebase user info
        set({
          currentUser: { uid: firebaseUser.uid, email: firebaseUser.email, name: firebaseUser.displayName || 'User', avatar: '🧒', role: 'child' },
          currentRole: 'child',
          isAuthenticated: true,
          authLoading: false,
        });
      } else {
        set({ currentUser: null, currentRole: null, isAuthenticated: false, authLoading: false });
      }
    });
    // Store unsubscribe for cleanup
    set({ _authUnsubscribe: unsubscribe });
  },

  // Set user after login/register (immediate, before Firestore loads)
  setAuthUser: (user) => {
    const mockMap = { child: mockChild, parent: mockParent, admin: mockAdmin };
    const merged = { ...mockMap[user.role], ...user };
    set({ currentUser: merged, currentRole: user.role, isAuthenticated: true, authLoading: false });
  },

  // Legacy: direct role selection for demo mode
  setRole: (role) => {
    const userMap = { child: mockChild, parent: mockParent, admin: mockAdmin };
    set({ currentUser: userMap[role] || null, currentRole: role, isAuthenticated: true });
  },

  logout: async () => {
    try { await logoutUser(); } catch (e) { console.error('Logout error:', e); }
    set({ currentUser: null, currentRole: null, isAuthenticated: false });
  },

  // Update avatar
  updateAvatar: async (avatarIndex) => {
    const { currentUser } = get();
    if (!currentUser) return;
    try {
      await updateUserProfile(currentUser.uid, { selectedAvatar: avatarIndex });
    } catch (e) {
      // Silently fail for demo mode users without Firestore docs
    }
    set((state) => ({ currentUser: { ...state.currentUser, selectedAvatar: avatarIndex } }));
  },

  // ===== Challenge State =====
  challenges: [...weeklyChallengeCurriculum],
  currentChallengeStep: 0,
  challengeAnswers: {},
  challengeDecision: null,
  challengeSubmitted: false,

  setChallengeStep: (step) => set({ currentChallengeStep: step }),
  setChallengeAnswer: (questionId, answer) =>
    set((state) => ({ challengeAnswers: { ...state.challengeAnswers, [questionId]: answer } })),
  setChallengeDecision: (decision) => set({ challengeDecision: decision }),

  submitChallenge: () => {
    set((state) => {
      const updatedChallenges = state.challenges.map((c) =>
        c.status === 'active' ? { ...c, status: 'completed' } : c
      );
      const nextIdx = updatedChallenges.findIndex((c) => c.status === 'locked');
      if (nextIdx !== -1) updatedChallenges[nextIdx] = { ...updatedChallenges[nextIdx], status: 'active' };
      return { challenges: updatedChallenges, challengeSubmitted: true, currentChallengeStep: 0, challengeAnswers: {}, challengeDecision: null };
    });
  },

  resetChallengeFlow: () =>
    set({ currentChallengeStep: 0, challengeAnswers: {}, challengeDecision: null, challengeSubmitted: false }),

  // ===== Three Jars State =====
  jars: { saving: 120000, spending: 100000, sharing: 60000 },
  jarHistory: [...mockJarHistory],
  pendingAllocation: null,

  allocateMoney: (amount, distribution) => {
    set((state) => ({
      jars: { saving: state.jars.saving + distribution.saving, spending: state.jars.spending + distribution.spending, sharing: state.jars.sharing + distribution.sharing },
      jarHistory: [...state.jarHistory, { week: state.jarHistory.length + 1, ...distribution }],
    }));
  },
  setPendingAllocation: (allocation) => set({ pendingAllocation: allocation }),

  // ===== Items State =====
  items: [...mockItems],

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, { ...item, id: `item-${Date.now()}`, parentApproval: 'pending', listingStatus: 'pending', createdAt: new Date().toISOString().split('T')[0], childId: 'child-001' }],
    })),

  updateItemAction: (itemId, action, reason, price) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, action: action.id, actionLabel: action.label, reason, estimatedPrice: price, parentApproval: 'pending' } : item
      ),
    })),

  // ===== Approvals State =====
  approvals: [...mockApprovals],
  approveItem: (id) => set((s) => ({ approvals: s.approvals.map((a) => a.id === id ? { ...a, status: 'approved' } : a) })),
  rejectItem: (id) => set((s) => ({ approvals: s.approvals.map((a) => a.id === id ? { ...a, status: 'rejected' } : a) })),
  requestEdit: (id) => set((s) => ({ approvals: s.approvals.map((a) => a.id === id ? { ...a, status: 'edit-requested' } : a) })),

  // ===== Dashboard Stats =====
  dashboardStats: { ...mockDashboardStats },

  // ===== Money Confirmation =====
  confirmedTransactions: [],
  confirmMoney: (amount, note) =>
    set((state) => ({
      confirmedTransactions: [...state.confirmedTransactions, { id: `txn-${Date.now()}`, amount, note, confirmedAt: new Date().toISOString() }],
    })),

  // ===== Teach AI State =====
  teachAIResponses: [],
  teachAIStep: 0,
  setTeachAIStep: (step) => set({ teachAIStep: step }),
  addTeachAIResponse: (response) => set((state) => ({ teachAIResponses: [...state.teachAIResponses, response] })),
  resetTeachAI: () => set({ teachAIResponses: [], teachAIStep: 0 }),
}));

export default useStore;
