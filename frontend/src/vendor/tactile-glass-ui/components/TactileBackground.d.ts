import React from "react";
export interface TactileBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    radius?: number;
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
 * TactileBackground
 * Full-section / Hero Optical Glass Panel Component.
 * Designed to sit beneath hero sections, feature blocks, or full-bleed containers
 * with physical Snell refraction, perimeter bevel dispersion, liquid caustic aura,
 * and interactive pointer ripples.
 */
export declare const TactileBackground: React.FC<TactileBackgroundProps>;
export declare const TactileHeroBackground: React.FC<TactileBackgroundProps>;
export default TactileBackground;
