import { useSyncExternalStore } from 'react';
import musicUrl from '../sounds/Background_Music.mp3';
import showModal from '../sounds/deck_ui_show_modal.wav';
import hideModal from '../sounds/deck_ui_hide_modal.wav';
import keyboardUrl from '../sounds/keyboard/sound.ogg';
import keyTimings from '../sounds/keyboard/keys.json';
import toggleOff from '../sounds/deck_ui_switch_toggle_off.wav';
import tabTransition from '../sounds/deck_ui_tab_transition_01.wav';
import miscFound from '../sounds/deck_ui_misc_10.wav';
import volumeEmpty from '../sounds/deck_ui_volume.wav';

/** Ação da interface -> arquivo + volume base. */
const SFX = {
  open: { url: showModal, volume: 0.5, channel: 'modal' },
  close: { url: hideModal, volume: 0.45, channel: 'modal' },
  clear: { url: toggleOff, volume: 0.4 },
  engine: { url: tabTransition, volume: 0.45 },
  found: { url: miscFound, volume: 0.45, channel: 'result' },
  empty: { url: volumeEmpty, volume: 0.4, channel: 'result' },
} as const;

export type SfxName = keyof typeof SFX;

const MUSIC_VOLUME = 0.22;
const STORAGE_KEY = 'busca-tolerante:muted';

let ctx: AudioContext | null = null;
const buffers = new Map<string, Promise<AudioBuffer>>();
const channels = new Map<string, { source: AudioBufferSourceNode; gain: GainNode }>();
let music: HTMLAudioElement | null = null;
let unlocked = false;

function readMuted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

let muted = readMuted();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function getCtx(): AudioContext {
  ctx ??= new AudioContext();
  return ctx;
}

function load(url: string): Promise<AudioBuffer> {
  let promise = buffers.get(url);
  if (!promise) {
    promise = fetch(url)
      .then((res) => res.arrayBuffer())
      .then((data) => getCtx().decodeAudioData(data));
    buffers.set(url, promise);
  }
  return promise;
}

function fadeMusic(target: number, ms: number) {
  if (!music) return;
  const el = music;
  const from = el.volume;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / ms);
    el.volume = from + (target - from) * t;
    if (t < 1) requestAnimationFrame(tick);
    else if (target === 0) el.pause();
  };
  requestAnimationFrame(tick);
}

function startMusic() {
  if (muted) return;
  if (!music) {
    music = new Audio(musicUrl);
    music.loop = true;
    music.volume = 0;
  }
  music.play().then(() => fadeMusic(MUSIC_VOLUME, 1800)).catch(() => {});
}

/**
 * Navegadores só liberam áudio após um gesto do usuário:
 * no primeiro clique/tecla começa a música de fundo e pré-carrega os efeitos.
 */
export function initAudioOnFirstGesture() {
  const unlock = () => {
    if (unlocked) return;
    unlocked = true;
    void getCtx().resume();
    Object.values(SFX).forEach((s) => void load(s.url));
    void load(keyboardUrl);
    startMusic();
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
  };
  window.addEventListener('pointerdown', unlock);
  window.addEventListener('keydown', unlock);
  return () => {
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
  };
}

export function playSfx(name: SfxName) {
  if (muted || !unlocked) return;

  const def: { url: string; volume: number; channel?: string } = SFX[name];
  void load(def.url).then((buffer) => {
    const audio = getCtx();
    const source = audio.createBufferSource();
    const gain = audio.createGain();
    source.buffer = buffer;
    gain.gain.value = def.volume;
    source.connect(gain).connect(audio.destination);

    // Mesmo canal = o som anterior sai em fade rápido (abrir/fechar não se atropelam)
    if (def.channel) {
      const prev = channels.get(def.channel);
      if (prev) {
        prev.gain.gain.setTargetAtTime(0, audio.currentTime, 0.04);
        prev.source.stop(audio.currentTime + 0.25);
      }
      channels.set(def.channel, { source, gain });
    }
    source.start();
  });
}

const timings = keyTimings as Record<string, number[][]>;
const FALLBACK_KEYS = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyJ', 'KeyK'];

/**
 * Teclado mecânico (sprite único): cada tecla tem um trecho de "down" e outro de "up"
 * dentro do mesmo arquivo. Teclas fora do mapa usam uma letra aleatória.
 */
export function playKey(code: string, phase: 'down' | 'up') {
  if (muted || !unlocked) return;
  const entry =
    timings[code] ??
    timings[FALLBACK_KEYS[Math.floor(Math.random() * FALLBACK_KEYS.length)]];
  const range = entry?.[phase === 'down' ? 0 : 1];
  if (!range) return;

  void load(keyboardUrl).then((buffer) => {
    const audio = getCtx();
    const source = audio.createBufferSource();
    const gain = audio.createGain();
    source.buffer = buffer;
    gain.gain.value = phase === 'down' ? 0.7 : 0.45;
    source.connect(gain).connect(audio.destination);
    source.start(0, range[0] / 1000, (range[1] - range[0]) / 1000);
  });
}

export function toggleMuted() {
  muted = !muted;
  try {
    localStorage.setItem(STORAGE_KEY, muted ? '1' : '0');
  } catch {
    /* sem storage: apenas não persiste */
  }
  if (muted) fadeMusic(0, 400);
  else if (unlocked) startMusic();
  emit();
}

export function useMuted(): boolean {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => muted
  );
}
