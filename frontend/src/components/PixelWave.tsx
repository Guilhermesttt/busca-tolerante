import { motion } from 'framer-motion';

export interface PixelWaveProps {
  /** Tamanho do grid (lado x lado). */
  gridSize?: number;
  /** Lado de cada pixel em px. */
  pixelSize?: number;
  gap?: number;
  /** Cor em rgb "r, g, b" para permitir o brilho com alpha. */
  rgb?: string;
  className?: string;
}

/**
 * Pixel Wave (morphin.dev): grid de pixels que pulsa em onda diagonal.
 */
export function PixelWave({
  gridSize = 3,
  pixelSize = 16,
  gap = 0,
  rgb = '188, 215, 247',
  className,
}: PixelWaveProps) {
  const pixels = Array.from({ length: gridSize * gridSize }, (_, i) => i);
  const glow = Math.round(pixelSize * 1.5);

  return (
    <div
      role="status"
      aria-label="Carregando"
      className={`grid ${className ?? ''}`}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, ${pixelSize}px)`,
        gap: `${gap}px`,
      }}
    >
      {pixels.map((i) => {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;

        return (
          <motion.div
            key={i}
            style={{
              width: pixelSize,
              height: pixelSize,
              backgroundColor: `rgb(${rgb})`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.7, 1, 0.7],
              boxShadow: [
                `0 0 0px rgba(${rgb}, 0)`,
                `0 0 ${glow}px rgba(${rgb}, 0.8)`,
                `0 0 0px rgba(${rgb}, 0)`,
              ],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (row + col) * 0.15,
            }}
          />
        );
      })}
    </div>
  );
}

export default PixelWave;
