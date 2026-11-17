import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Cubes } from './Cubes';

export interface BackgroundProps {
  /** 0 = repouso, 1 = digitando/resultados, 2 = buscando (glow mais intenso). */
  energy: 0 | 1 | 2;
}

/** Quanto do horizonte sobe na tela (fração da altura) em cada nível de energia. */
const RISE = [0.18, 0.24, 0.31] as const;
const BLOOM = [0.7, 0.95, 1] as const;

const INTRO_EASE = [0.16, 1, 0.3, 1] as const;

const CUBES_MASK =
  'radial-gradient(ellipse 48% 24% at 50% 46%, #000 0%, rgba(0,0,0,0.5) 50%, transparent 100%)';

/**
 * Fundo preto com horizonte de luz azul (glow) e cubos 3D ao fundo.
 * Tudo responde com física de mola: o horizonte sobe com a energia da busca
 * e acompanha o cursor; a entrada acontece sempre que a página recarrega.
 */
export function Background({ energy }: BackgroundProps) {
  const [vh, setVh] = useState(() => window.innerHeight);
  const [showCubes, setShowCubes] = useState(false);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    // Cubos entram quando o horizonte já está subindo (sincroniza o "intro" deles)
    const t = window.setTimeout(() => setShowCubes(true), 650);
    return () => {
      window.removeEventListener('resize', onResize);
      window.clearTimeout(t);
    };
  }, []);

  // Paralaxe do glow seguindo o cursor (mola suave)
  const pointerX = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 60, damping: 18, mass: 1.2 });
  const shiftX = useTransform(smoothX, (v) => v * 70);
  const bloomShift = useTransform(smoothX, (v) => v * -40);

  useEffect(() => {
    const onMove = (e: PointerEvent) =>
      pointerX.set((e.clientX / window.innerWidth - 0.5) * 2);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [pointerX]);

  const rise = Math.round(vh * RISE[energy]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">

      {/* Cubos 3D: só aparecem na região do glow (máscara radial) */}
      {showCubes && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.6, ease: INTRO_EASE }}
          className="absolute bottom-0 left-1/2 aspect-square w-[min(130vw,1300px)] -translate-x-1/2 translate-y-[38%]"
          style={{ maskImage: CUBES_MASK, WebkitMaskImage: CUBES_MASK }}
        >
          <Cubes
            gridSize={11}
            gap={0.26}
            faceColor="#00040f"
            faceOpacity={0.7}
            edgeColor="#bcd7f7"
            edgeWidth={1}
            shading={0.5}
            maxAngle={50}
            radius={3.2}
            bounce={0.5}
            rippleColor="#2929fd"
            autoAnimate={false}
            intro
          />
        </motion.div>
      )}

      {/* Bloom amplo atrás do horizonte */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: BLOOM[energy], scale: 1 }}
        transition={{
          opacity: { type: 'spring', stiffness: 60, damping: 18 },
          scale: { duration: 2.2, delay: 0.5, ease: INTRO_EASE },
        }}
        style={{ x: bloomShift }}
        className="pointer-events-none absolute inset-x-[-20%] bottom-[-10%] h-[70%]"
      >
        <motion.div
          animate={{ opacity: [0.82, 1, 0.82] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(ellipse 55% 60% at 50% 100%, rgba(41,41,253,0.55) 0%, rgba(41,41,253,0.22) 38%, rgba(0,14,41,0) 72%)',
            filter: 'blur(30px)',
          }}
        />
      </motion.div>

      {/* Horizonte: elipse enorme cuja borda superior vira o arco de luz */}
      <motion.div
        aria-hidden="true"
        initial={{ y: 0 }}
        animate={{ y: -rise }}
        transition={{
          type: 'spring',
          stiffness: energy === 0 ? 38 : 70,
          damping: 16,
          mass: 1.4,
          delay: energy === 0 ? 0.55 : 0,
        }}
        style={{ x: shiftX }}
        className="pointer-events-none absolute top-full left-1/2 -ml-[95vw] h-screen w-[190vw] rounded-[50%]"
      >
        <div
          className="relative h-full w-full rounded-[50%]"
          style={{
            background:
              'radial-gradient(ellipse 50% 70% at 50% 0%, rgba(220,235,255,0.95) 0%, rgba(188,215,247,0.55) 6%, rgba(41,41,253,0.75) 20%, rgba(0,14,41,0.95) 48%, #000 75%)',
            borderTop: '1px solid rgba(225,238,255,0.9)',
            boxShadow:
              '0 -6px 40px 2px rgba(41,41,253,0.75), 0 -50px 140px 10px rgba(41,41,253,0.35)',
          }}
        >
          {/* Rastro de luz: um cometa percorre a borda de um canto da tela ao outro */}
          <div className="horizon-trail horizon-trail-glow" />
          <div className="horizon-trail" />
        </div>
      </motion.div>

      {/* Intro: um fio de luz abre do centro antes do glow subir */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          scaleX: { duration: 0.7, ease: INTRO_EASE },
          opacity: { duration: 0.5, delay: 0.7 },
        }}
        className="pointer-events-none absolute bottom-[18%] left-0 h-px w-full origin-center bg-linear-to-r from-transparent via-steel to-transparent"
      />

      {/* Vinheta: mantém centro/topo realmente pretos e o texto legível */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_30%,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0)_75%)]" />

      <div className="bg-grain pointer-events-none absolute inset-0" />
    </div>
  );
}

export default Background;
