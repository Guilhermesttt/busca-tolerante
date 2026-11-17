import React from "react";
export interface TactileGlassWordProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    /** Optional array of words to cycle through on click */
    cycleWords?: string[];
    className?: string;
    style?: React.CSSProperties;
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
}
/**
 * TactileGlassWord
 * Fluid Glass Typography Component.
 * The letter glyphs themselves are filled with real-time WebGL2 fluid caustics,
 * polar aurora flow, chromatic dispersion and interactive ripple wave dynamics.
 * Zero background plate/capsule — pure typographic liquid glass.
 */
export declare const TactileGlassWord: React.FC<TactileGlassWordProps>;
export default TactileGlassWord;
