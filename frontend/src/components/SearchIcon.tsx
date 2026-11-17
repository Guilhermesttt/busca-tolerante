import { motion, useAnimation } from 'framer-motion';

export interface SearchIconProps {
  size?: number;
  /** Quando true, a lupa "procura" em loop (ex.: carregando). */
  active?: boolean;
  className?: string;
}

/**
 * Lupa animada no estilo lucide-animated: ao passar o mouse,
 * a lente percorre um pequeno trajeto de "procura".
 */
export const SearchIcon = ({ size = 22, active = false, className }: SearchIconProps) => {
  const controls = useAnimation();

  const play = () =>
    controls.start({
      x: [0, -2.5, 2, -1.5, 0],
      y: [0, 2, -2.5, 1.5, 0],
      rotate: [0, -8, 6, -3, 0],
      transition: { duration: 0.9, ease: 'easeInOut' },
    });

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onHoverStart={play}
      animate={
        active
          ? {
              x: [0, -2.5, 2, -1.5, 0],
              y: [0, 2, -2.5, 1.5, 0],
              transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
            }
          : controls
      }
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </motion.svg>
  );
};

export default SearchIcon;
