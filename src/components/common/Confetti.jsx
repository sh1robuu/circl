import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Confetti - Lightweight celebration confetti burst
 * Used in challenge completion, milestone achievements
 */

const COLORS = ['#14b89c', '#22c55e', '#facc15', '#fb7185', '#9af5df', '#fef08a', '#bbf7d0'];
const SHAPES = ['●', '■', '▲', '★', '♦'];

function ConfettiPiece({ index, total }) {
  const color = COLORS[index % COLORS.length];
  const shape = SHAPES[index % SHAPES.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 0.6;
  const duration = 2 + Math.random() * 2;
  const initialRotation = Math.random() * 360;
  const horizontalDrift = (Math.random() - 0.5) * 200;
  const size = 8 + Math.random() * 10;

  return (
    <motion.div
      className="fixed pointer-events-none z-[100]"
      style={{
        left: `${left}%`,
        top: '-20px',
        color,
        fontSize: `${size}px`,
      }}
      initial={{
        y: -20,
        x: 0,
        opacity: 1,
        rotate: initialRotation,
        scale: 0,
      }}
      animate={{
        y: window.innerHeight + 50,
        x: horizontalDrift,
        opacity: [1, 1, 0.8, 0],
        rotate: initialRotation + 720,
        scale: [0, 1.2, 1, 0.8],
      }}
      transition={{
        duration,
        delay,
        ease: 'easeIn',
      }}
    >
      {shape}
    </motion.div>
  );
}

export default function Confetti({ active = false, duration = 3000, pieces = 40 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  return (
    <AnimatePresence>
      {show && (
        <>
          {Array.from({ length: pieces }).map((_, i) => (
            <ConfettiPiece key={i} index={i} total={pieces} />
          ))}
        </>
      )}
    </AnimatePresence>
  );
}
