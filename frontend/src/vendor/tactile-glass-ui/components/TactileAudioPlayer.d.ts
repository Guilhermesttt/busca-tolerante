import React from "react";
export interface TactileAudioTrack {
    title: string;
    durationSec: number;
}
export declare const DEFAULT_AUDIO_TRACKS: TactileAudioTrack[];
export interface TactileAudioPlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    tracks?: TactileAudioTrack[];
    defaultTrackIndex?: number;
    defaultPlaying?: boolean;
    radius?: number;
    className?: string;
    style?: React.CSSProperties;
    onPlayChange?: (playing: boolean) => void;
    onTrackChange?: (trackIndex: number, track: TactileAudioTrack) => void;
    refraction?: number;
    thickness?: number;
    bevelWidth?: number;
    frost?: number;
    dispersion?: number;
    sheen?: number;
    lightAngle?: number;
    darkness?: number;
    rim?: number;
    fluidBrightness?: number;
    fluidSpeed?: number;
    fluidScale?: number;
    fluidAuraWidth?: number;
    fluidCenter?: number;
    auroraFlow?: number;
    hoverBrightness?: number;
    trackCursorLight?: boolean;
    lightTrackingStrength?: number;
    clickShockwave?: boolean;
    shockwaveStrength?: number;
    tilt3d?: boolean;
    maxTilt?: number;
}
/**
 * TactileAudioPlayer
 * Spatial Glass Audio Deck Component (480x304px, strict 4px grid).
 * Features real-time WebGL2 Snell refraction, chromatic dispersion,
 * procedural fluid caustics, Web Audio API synthesis, interactive 3D tilt,
 * track switching, and timeline scrubbing.
 */
export declare const TactileAudioPlayer: React.FC<TactileAudioPlayerProps>;
export default TactileAudioPlayer;
