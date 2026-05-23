import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import { updateUserProfile } from '../utils/auth';
import WelcomeScreen from '../components/common/WelcomeScreen';
import OnboardingWalkthrough from '../components/common/OnboardingWalkthrough';

/**
 * WelcomePage — Orchestrates the post-auth experience:
 * 1. Jaw-dropping welcome animation (always)
 * 2. Onboarding walkthrough (first-time or new registration)
 * 3. Redirect to role-specific dashboard
 */
export default function WelcomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, currentRole } = useStore();
  const isNewUser = location.state?.isNewUser ?? false;

  // Phases: 'welcome' → 'onboarding' → redirect
  const [phase, setPhase] = useState('welcome');

  const roleHome = { child: '/child', parent: '/parent', admin: '/admin' }[currentRole] || '/';

  // Check if user has completed onboarding before
  const hasCompletedOnboarding = currentUser?.onboardingCompleted === true;

  const handleWelcomeDone = useCallback(() => {
    // Show onboarding for: new registrations OR users who haven't completed it
    if (isNewUser || !hasCompletedOnboarding) {
      setPhase('onboarding');
    } else {
      navigate(roleHome, { replace: true });
    }
  }, [isNewUser, hasCompletedOnboarding, navigate, roleHome]);

  const handleOnboardingDone = useCallback(async () => {
    // Mark onboarding as completed in Firestore
    try {
      if (currentUser?.uid) {
        await updateUserProfile(currentUser.uid, { onboardingCompleted: true });
      }
    } catch (e) {
      // Demo mode users don't have Firestore docs, that's fine
    }
    navigate(roleHome, { replace: true });
  }, [currentUser, navigate, roleHome]);

  // No user? Redirect to auth
  if (!currentUser || !currentRole) {
    navigate('/auth', { replace: true });
    return null;
  }

  return (
    <AnimatePresence>
      {phase === 'welcome' && (
        <WelcomeScreen
          key="welcome"
          user={currentUser}
          role={currentRole}
          onComplete={handleWelcomeDone}
        />
      )}
      {phase === 'onboarding' && (
        <OnboardingWalkthrough
          key="onboarding"
          role={currentRole}
          onComplete={handleOnboardingDone}
        />
      )}
    </AnimatePresence>
  );
}
