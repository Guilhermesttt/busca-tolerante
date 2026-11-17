import React from "react";
export interface TactileTabItem {
    value: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
}
export interface TactileTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    items: Array<TactileTabItem | string>;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    size?: "xl";
    className?: string;
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
 * TactileTabs (Segmented Control)
 * Pure React + TypeScript + Design System CSS Tokens.
 * Features a sliding optical glass pill indicator powered by the shared WebGL2 singleton engine.
 */
export declare const TactileTabs: React.FC<TactileTabsProps>;
export declare const TactileSegmented: React.FC<TactileTabsProps>;
export default TactileTabs;
