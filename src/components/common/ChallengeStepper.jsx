import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

/**
 * ChallengeStepper - Step progress indicator for challenge flow
 */
export default function ChallengeStepper({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-center gap-1 mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className="flex items-center">
            <motion.div
              className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold transition-all duration-300 ${
                isCompleted
                  ? 'bg-leaf-500 text-white'
                  : isActive
                  ? 'bg-gradient-to-br from-mint-400 to-leaf-500 text-white shadow-lg shadow-mint-200'
                  : 'bg-white/60 text-gray-400 border border-gray-200'
              }`}
              initial={false}
              animate={isActive ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {isCompleted ? <Check size={16} /> : index + 1}
            </motion.div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 md:w-12 h-0.5 mx-1 rounded transition-colors duration-300 ${
                  isCompleted ? 'bg-leaf-400' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
