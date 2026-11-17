import React from "react";
/**
 * Achromatic Tactile Glass FX Smart Wrapper
 * Zero Runtime Dependencies: Pure React, TypeScript, WebGL2 and Canvas 2D.
 * Utilizes a shared singleton WebGL2 engine with lightweight Canvas 2D blitting.
 */
export interface TactileGlassFxProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
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
    causticBrightness?: number;
    causticSpeed?: number;
    causticScale?: number;
    hoverBrightness?: number;
    trackCursorLight?: boolean;
    lightTrackingStrength?: number;
    clickShockwave?: boolean;
    shockwaveStrength?: number;
    overlayZIndex?: number;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * TactileGlassFx: Smart Wrapper Component
 * Wraps any native element (button, switch, card, pill, container) with liquid caustic glass optics.
 * Renders via a lightweight 2D canvas backed by the shared singleton WebGL2 engine.
 */
export declare const TactileGlassFx: React.FC<TactileGlassFxProps>;
export default TactileGlassFx;
