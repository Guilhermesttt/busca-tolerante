import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { X } from 'lucide-react';
import type { SearchEngine } from '../types/book';
import { PixelWave } from './PixelWave';
import { TactileGlassFx } from '../vendor/tactile-glass-ui';
import '../vendor/tactile-glass-ui/tactile-glass-ui.css';
import { SearchIcon } from './SearchIcon';
import { playKey, playSfx } from '../utils/sounds';

export interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  engine: SearchEngine;
  onEngineChange: (engine: SearchEngine) => void;
  isLoading: boolean;
}

const ENGINES: { id: SearchEngine; label: string }[] = [
  { id: 'mysql', label: 'MySQL LIKE' },
  { id: 'meili', label: 'Meilisearch' },
];

const BAR_HEIGHT = 56;
const BAR_MAX_WIDTH = 640;
const GUTTER = 32;
const SPRING = { type: 'spring', stiffness: 260, damping: 24, mass: 0.9 } as const;

function useBarWidth() {
  const [width, setWidth] = useState(() =>
    Math.min(BAR_MAX_WIDTH, window.innerWidth - GUTTER)
  );
  useEffect(() => {
    const onResize = () =>
      setWidth(Math.min(BAR_MAX_WIDTH, window.innerWidth - GUTTER));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
}

/**
 * Botão de lupa que expande (spring) em um campo de busca.
 * O cursor é customizado: pisca suave e desliza até a posição de digitação.
 */
export function SearchBar({
  query,
  onQueryChange,
  engine,
  onEngineChange,
  isLoading,
}: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [typing, setTyping] = useState(false);
  const barWidth = useBarWidth();
  const openRef = useRef(false);

  const openBar = useCallback(() => {
    if (openRef.current) return;
    openRef.current = true;
    playSfx('open');
    setOpen(true);
  }, []);

  const closeBar = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    playSfx('close');
    setOpen(false);
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const typingTimer = useRef<number | undefined>(undefined);

  // Cursor: posição alvo -> spring (movimento "smooth")
  const caretTarget = useMotionValue(0);
  const caretX = useSpring(caretTarget, {
    stiffness: 520,
    damping: 38,
    mass: 0.5,
  });

  const updateCaret = useCallback(() => {
    const input = inputRef.current;
    const measure = measureRef.current;
    if (!input || !measure) return;
    const pos = input.selectionStart ?? input.value.length;
    measure.textContent = input.value.slice(0, pos);
    caretTarget.set(measure.offsetWidth - input.scrollLeft);

    // Enquanto digita/move, o cursor fica sólido; depois volta a piscar
    setTyping(true);
    window.clearTimeout(typingTimer.current);
    typingTimer.current = window.setTimeout(() => setTyping(false), 520);
  }, [caretTarget]);

  useEffect(() => () => window.clearTimeout(typingTimer.current), []);

  // Atalhos: Ctrl/Cmd+K abre; Escape limpa/fecha
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openBar();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openBar]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!event.repeat && !event.ctrlKey && !event.metaKey) {
      playKey(event.code, 'down');
    }
    if (event.key === 'Escape') {
      if (query) {
        playSfx('clear');
        onQueryChange('');
      } else {
        closeBar();
        inputRef.current?.blur();
      }
    }
  };

  const closeIfEmpty = () => {
    setFocused(false);
    if (!query.trim()) closeBar();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="relative"
        whileHover={open ? undefined : { scale: 1.06 }}
        whileTap={open ? undefined : { scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      >
        {/* Halo de foco fica FORA do vidro (o hull precisa ficar sem sombra/borda) */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: focused ? 0.9 : open ? 0.35 : 0.2, scale: focused ? 1.04 : 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="pointer-events-none absolute -inset-3 rounded-full bg-tech/40 blur-2xl"
        />
        <TactileGlassFx
          className="rounded-full"
          refraction={34}
          thickness={28}
          bevelWidth={3}
          frost={10}
          dispersion={70}
          sheen={18}
          rim={34}
          fluidBrightness={70}
          fluidSpeed={90}
          fluidScale={22}
          fluidAuraWidth={18}
          fluidCenter={14}
          auroraFlow={80}
          hoverBrightness={220}
        >
      <motion.div
        role={open ? undefined : 'button'}
        tabIndex={open ? undefined : 0}
        aria-label={open ? undefined : 'Abrir busca'}
        onClick={() => !open && openBar()}
        onKeyDown={(e) => {
          if (!open && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            openBar();
          }
        }}
        initial={false}
        animate={{
          width: open ? barWidth : BAR_HEIGHT,
        }}
        transition={{ width: SPRING }}
        style={{ height: BAR_HEIGHT }}
        className={`relative flex items-center overflow-hidden rounded-full text-white/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60 ${
          open ? 'cursor-text' : 'cursor-pointer hover:text-white'
        }`}
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center">
          <SearchIcon size={22} active={open && isLoading} />
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="field"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.12, duration: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.08 } }}
              className="flex min-w-0 flex-1 items-center gap-2 pr-3"
            >
              <div className="relative min-w-0 flex-1">
                <input
                  ref={inputRef}
                  autoFocus
                  type="text"
                  value={query}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Buscar livros por título, autor, gênero, ano ou sinopse"
                  placeholder="Busque mesmo com erros…"
                  onChange={(e) => {
                    onQueryChange(e.target.value);
                    requestAnimationFrame(updateCaret);
                  }}
                  onKeyDown={handleKeyDown}
                  onKeyUp={(e) => {
                    if (!e.ctrlKey && !e.metaKey) playKey(e.code, 'up');
                    updateCaret();
                  }}
                  onSelect={updateCaret}
                  onClick={updateCaret}
                  onScroll={updateCaret}
                  onFocus={() => {
                    setFocused(true);
                    updateCaret();
                  }}
                  onBlur={closeIfEmpty}
                  className="block w-full bg-transparent text-base tracking-[-0.01em] text-white caret-transparent placeholder:text-steel/60 focus:outline-none sm:text-lg"
                />

                {/* Régua invisível para medir a largura do texto até o cursor */}
                <span
                  ref={measureRef}
                  aria-hidden="true"
                  className="pointer-events-none invisible absolute top-0 left-0 text-base tracking-[-0.01em] whitespace-pre sm:text-lg"
                />

                {/* Cursor customizado */}
                {focused && (
                  <motion.span
                    aria-hidden="true"
                    style={{ x: caretX }}
                    className="pointer-events-none absolute top-1/2 left-0 -mt-3 h-6 w-[2px] rounded-full bg-steel shadow-[0_0_10px_rgba(188,215,247,0.7)]"
                  >
                    <span
                      className={`block h-full w-full rounded-full bg-steel ${
                        typing ? '' : 'caret-smooth-blink'
                      }`}
                    />
                  </motion.span>
                )}
              </div>

              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  {isLoading ? (
                    <motion.div
                      key="wave"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.15 }}
                    >
                      <PixelWave pixelSize={4} gap={1} />
                    </motion.div>
                  ) : query ? (
                    <motion.button
                      key="clear"
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        playSfx('clear');
                        onQueryChange('');
                        inputRef.current?.focus();
                        requestAnimationFrame(updateCaret);
                      }}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      aria-label="Limpar busca"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-steel/[0.08] text-white/75 hover:text-white"
                    >
                      <X className="h-3.5 w-3.5" />
                    </motion.button>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
        </TactileGlassFx>
      </motion.div>

      {/* Dica (fechado) / seletor de motor (aberto) */}
      <div className="flex h-8 items-center">
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="engines"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.1 } }}
              role="tablist"
              aria-label="Motor de busca"
              className="relative inline-flex rounded-full border border-steel/10 bg-navy/60 p-0.5"
            >
              {ENGINES.map((option) => {
                const isActive = engine === option.id;
                return (
                  <button
                    key={option.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      if (!isActive) playSfx('engine');
                      onEngineChange(option.id);
                    }}
                    className={`relative rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${
                      isActive ? 'text-navy' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="engine-pill"
                        transition={{ type: 'spring', stiffness: 440, damping: 32 }}
                        className="absolute inset-0 -z-0 rounded-full bg-steel"
                      />
                    )}
                    <span className="relative">{option.label}</span>
                  </button>
                );
              })}
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.08 } }}
              className="font-mono text-[11px] tracking-[0.14em] text-steel/60 uppercase"
            >
              Clique ou Ctrl K
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SearchBar;
