/**
 * TactileAudioSynth
 * Real-time procedural Web Audio API synthesizer and FFT spectrum analyzer
 * for the Tactile Spatial Audio Player.
 * Generates 3 distinct multi-layered electronic compositions with full timeline
 * arrangement (Intro, Verse, Chorus, Bridge, Climax, Outro) and instant seek.
 */
export declare class TactileAudioSynth {
    private ctx;
    private masterGain;
    private musicBus;
    private filterNode;
    private analyser;
    private delayLeft;
    private delayRight;
    private noiseBuffer;
    private fftData;
    private timeDomainData;
    private smoothedBars;
    private smoothedIdleBars;
    private smoothedGlowBars;
    private lastActivePlayTime;
    private isPlaying;
    private trackIndex;
    private progress;
    private currentStep;
    private nextStepTime;
    private lastSeekAudioTime;
    private schedulerTimer;
    private getTotalSteps;
    private ensureContext;
    /**
     * Smoothly fades out the active musicBus over 18ms and replaces it with a fresh bus
     * so sustained pad chords and bass notes from a previous timeline section stop cleanly.
     */
    private flushMusicBus;
    setPlaying(playing: boolean): void;
    setTrack(index: number): void;
    getProgress(): number;
    seek(progress01: number): void;
    private scheduleSteps;
    private triggerStep;
    private triggerPadChord;
    private triggerBass;
    private triggerArpNote;
    private triggerLeadNote;
    private triggerKick;
    private triggerSnare;
    private triggerHat;
    /**
     * Populates `outBars` with normalized [0..1] real-time audio spectrum amplitudes
     * driven 100% by the Web Audio API AnalyserNode (FFT + Time-Domain waveform).
     */
    getSpectrumBars(barCount: number, outBars: Float32Array, _time?: number): void;
    /**
     * Populates `outSignedBars` with a periodic [-1..1] traveling sine wave packet
     * from left to right when playback is paused, and optionally `outGlowBars` with [0..1]
     * local illumination (0 at rest, 1 inside the passing wave or during active playback).
     */
    getIdleWaveBars(barCount: number, outSignedBars: Float32Array, time?: number, outGlowBars?: Float32Array): void;
    dispose(): void;
}
export declare function getSharedAudioSynth(): TactileAudioSynth;
