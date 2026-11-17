import { motion } from 'framer-motion';

const WORD = 'busca';

/**
 * Wordmark tipográfico: contraste entre a Helvetica Neue fina ("TOLERANTE")
 * e a display expandida e pesada ("busca"). As letras sobem com mola, em cascata.
 */
export function Wordmark({ delay = 1 }: { delay?: number }) {
  return (
    <div className="flex flex-col items-center select-none" aria-label="Busca Tolerante">
      <motion.span
        initial={{ opacity: 0, y: 14, letterSpacing: '0.7em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.42em' }}
        transition={{ duration: 1.4, delay: delay + 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mb-[-0.15em] pl-[0.42em] text-[clamp(0.8rem,2.4vw,1.5rem)] font-extralight text-steel uppercase"
        aria-hidden="true"
      >
        Tolerante
      </motion.span>

      <h1
        aria-hidden="true"
        className="font-display flex text-[clamp(5rem,23vw,17rem)] leading-[0.82] font-black tracking-[-0.06em] text-white"
      >
        {WORD.split('').map((letter, i) => (
          <span key={i} className="-mr-[0.08em] overflow-hidden pr-[0.08em] pb-[0.12em]">
            <motion.span
              className="block"
              initial={{ y: '170%', rotate: 6, opacity: 0 }}
              animate={{ y: '0%', rotate: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 140,
                damping: 15,
                mass: 1,
                delay: delay + i * 0.07,
                opacity: { duration: 0.01, delay: delay + i * 0.07 },
              }}
            >
              {letter}
            </motion.span>
          </span>
        ))}
      </h1>
    </div>
  );
}

export default Wordmark;
