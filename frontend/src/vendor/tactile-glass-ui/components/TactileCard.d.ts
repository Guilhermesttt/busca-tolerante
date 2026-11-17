import React from "react";
export interface TactileCreditCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    children?: React.ReactNode;
    cardNumber?: string;
    cardHolder?: string;
    validThru?: string;
    bankName?: string;
    tier?: string;
    showContactless?: boolean;
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
    tilt3d?: boolean;
    maxTilt?: number;
}
export type TactileCardProps = TactileCreditCardProps;
/**
 * TactileCreditCard (TactileCard)
 * Liquid Glass Credit Card Component (ISO/IEC 7810 ID-1 standard ratio ~1.586).
 * Features real-time WebGL2 Snell refraction, chromatic dispersion,
 * procedural fluid caustics, etched EMV microchip, and interactive cursor light tracking.
 * Pure DOM interaction hull with zero decorative CSS borders/shadows.
 */
export declare const TactileCreditCard: React.FC<TactileCreditCardProps>;
export declare const TactileCard: React.FC<TactileCreditCardProps>;
export default TactileCreditCard;
