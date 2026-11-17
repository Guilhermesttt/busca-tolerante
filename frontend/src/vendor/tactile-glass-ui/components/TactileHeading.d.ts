import React from "react";
import { TactileGlassWordProps } from "./TactileGlassWord";
export type TactileHeadingLevel = "h1" | "h2" | "h3" | "h4" | "div";
export type TactileHeadingSize = "sm" | "md" | "lg" | "xl" | "hero";
export interface TactileHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: TactileHeadingLevel;
    size?: TactileHeadingSize;
    align?: "left" | "center" | "right";
    /** Full heading text when not using children composition */
    title?: string;
    /** Substring/word within title to wrap with optical glass */
    highlight?: string | string[];
    /** Optional array of words to cycle through on click within the highlighted word */
    highlightCycle?: string[];
    /** Optional subtitle or description underneath */
    subtitle?: React.ReactNode;
    /** Optional top badge or category tag */
    badge?: React.ReactNode;
    /** Custom props passed to the highlighted TactileGlassWord */
    wordProps?: Partial<TactileGlassWordProps>;
    className?: string;
    children?: React.ReactNode;
}
/**
 * TactileHeading
 * High-impact display typography heading with an integrated real-time WebGL2
 * TactileGlassWord optical capsule. Supports both automatic keyword highlighting
 * and rich children composition.
 */
export declare const TactileHeading: React.FC<TactileHeadingProps>;
export default TactileHeading;
