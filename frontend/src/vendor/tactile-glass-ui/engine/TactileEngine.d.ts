/**
 * Achromatic Tactile Glass Shared Singleton WebGL Engine
 * Zero Runtime Dependencies: Pure React, TypeScript, WebGL2 and Canvas 2D.
 */
export interface TactileGlassParams {
    radius?: number;
    refraction: number;
    thickness: number;
    bevelWidth: number;
    frost: number;
    dispersion: number;
    sheen: number;
    lightAngle?: number;
    angle?: number;
    darkness: number;
    rim: number;
    fluidBright: number;
    fluidSpeed: number;
    fluidScale: number;
    fluidAuraWidth?: number;
    fluidCenter?: number;
    auroraFlow?: number;
    causticBright?: number;
    causticSpeed?: number;
    causticScale?: number;
    hoverBright: number;
    lightTrack: number;
    clickWave: number;
}
export interface TactileGlassInstance {
    id: string;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    getParams: () => TactileGlassParams;
    curHover: number;
    targetHover: number;
    curMouseX: number;
    curMouseY: number;
    targetMouseX: number;
    targetMouseY: number;
    clickPos: [number, number];
    clickTime: number;
    visible: boolean;
    textMask?: string;
    textFont?: string;
    textLetterSpacing?: string;
    textPadding?: number;
    isAudioDeck?: boolean;
    getRect?: () => [number, number, number, number] | null;
    getSwitchThumb?: () => [number, number, number] | [number, number, number, number] | null;
    tilt?: {
        rotX: number;
        rotY: number;
        scale: number;
        focalLength?: number;
    } | null;
}
export declare const BUTTON_DEFAULT_PARAMS: Omit<TactileGlassParams, "radius">;
export declare const SWITCH_ON_DEFAULT_PARAMS: Omit<TactileGlassParams, "radius">;
export declare const SWITCH_OFF_DEFAULT_PARAMS: Omit<TactileGlassParams, "radius">;
export declare const TABS_DEFAULT_PARAMS: Omit<TactileGlassParams, "radius">;
export declare const CARD_DEFAULT_PARAMS: Omit<TactileGlassParams, "radius">;
export declare const PROMPT_DEFAULT_PARAMS: Omit<TactileGlassParams, "radius">;
export declare const HEADING_DEFAULT_PARAMS: Omit<TactileGlassParams, "radius">;
export declare const AUDIO_DEFAULT_PARAMS: Omit<TactileGlassParams, "radius">;
export declare const BACKGROUND_DEFAULT_PARAMS: Omit<TactileGlassParams, "radius">;
export declare const VERTEX_SHADER = "#version 300 es\n  in vec2 a_pos;\n  out vec2 v_uv;\n  void main() {\n    v_uv = (a_pos + 1.0) * 0.5;\n    gl_Position = vec4(a_pos, 0.0, 1.0);\n  }\n";
export declare const FRAGMENT_SHADER = "#version 300 es\n  precision highp float;\n  in vec2 v_uv;\n  out vec4 fragColor;\n\n  uniform vec2 u_resolution;\n  uniform sampler2D u_src;\n  uniform float u_srcComposite;\n  uniform sampler2D u_textMask;\n  uniform float u_isText;\n  uniform float u_isAudioDeck;\n  uniform vec4 u_switchThumb;\n  uniform vec4 u_rect;\n  uniform float u_radius;\n  uniform float u_useBackdrop;\n  uniform vec4 u_tilt;\n  uniform vec3 u_bgColor;\n\n  // Glass optic parameters\n  uniform float u_refraction;\n  uniform float u_thickness;\n  uniform float u_bevelWidth;\n  uniform float u_frost;\n  uniform float u_dispersion;\n  uniform float u_sheen;\n  uniform float u_lightAngle;\n  uniform float u_darkness;\n  uniform float u_rim;\n  uniform float u_time;\n\n  // Fluid caustic uniforms\n  uniform float u_fluidBright;\n  uniform float u_fluidSpeed;\n  uniform float u_fluidScale;\n  uniform float u_fluidAuraWidth;\n  uniform float u_fluidCenter;\n  uniform float u_auroraFlow;\n\n  // Interactivity uniforms\n  uniform vec2 u_mousePos;\n  uniform float u_hoverStrength;\n  uniform float u_lightTrack;\n  uniform float u_hoverBright;\n  uniform vec2 u_clickPos;\n  uniform float u_clickTime;\n  uniform float u_clickWave;\n\n\n  float smax(float a, float b, float k) {\n    float h = max(k - abs(a - b), 0.0) / k;\n    return max(a, b) + h * h * k * 0.25;\n  }\n\n  float smin(float a, float b, float k) {\n    float h = max(k - abs(a - b), 0.0) / k;\n    return min(a, b) - h * h * k * 0.25;\n  }\n\n  float sdRoundRect(vec2 p, vec2 b, float r) {\n    vec2 q = abs(p) - b + r;\n    vec2 u = max(-q, 0.0);\n    float inner = -(u.x * u.y) / max(length(u), 1e-4);\n    return inner + length(max(q, 0.0)) - r;\n  }\n\n  float opSmoothUnion(float d1, float d2, float k) {\n    vec2 u = max(vec2(k - d1, k - d2), vec2(0.0));\n    return max(k, min(d1, d2)) - length(u);\n  }\n\n  float sdAudioDeck(vec2 p, vec2 b, float r) {\n    float s = b.x / 240.0;\n    float dCard = sdRoundRect(p, b, r);\n    float dPlay = length(p - vec2(0.0, -b.y)) - 40.0 * s;\n    float dPrev = length(p - vec2(-64.0 * s, -b.y)) - 28.0 * s;\n    float dNext = length(p - vec2(64.0 * s, -b.y)) - 28.0 * s;\n    float dBridge = length(p - vec2(clamp(p.x, -64.0 * s, 64.0 * s), -b.y)) - 9.0 * s;\n    float dBtns = opSmoothUnion(opSmoothUnion(dPlay, min(dPrev, dNext), 2.0 * s), dBridge, 2.0 * s);\n    return opSmoothUnion(dCard, dBtns, 2.0 * s);\n  }\n\n  float evalLensSDF(vec2 p, vec2 b, float r) {\n    if (u_isAudioDeck > 0.5) {\n      return sdAudioDeck(p, b, r);\n    }\n    return sdRoundRect(p, b, r);\n  }\n\n  // Domain-Warped Silky Fluid Caustic Field (Deep S-curls, soft rounded crests, zero straight sticks or grid tears)\n  float getCausticWave(vec2 p, float t, float frostAmt, float dispOffset) {\n    p *= 0.95;\n\n    // 1. Primary S-curve vortex warp (tight enough to curve visibly inside edge auras)\n    float w1 = sin(p.x * 1.85 + p.y * 0.55 + t * 0.62) * 0.62 +\n               cos(p.y * 1.95 - p.x * 0.65 - t * 0.48) * 0.58;\n    vec2 pWarp = p + vec2(\n      cos(w1 * 2.25 + p.y * 1.15 + t * 0.45),\n      sin(w1 * 2.25 - p.x * 1.15 - t * 0.35)\n    ) * 0.56;\n\n    // 2. Secondary swirl modulation so waves bend into flowing S-ribbons instead of straight sticks or square grids\n    float swirl = sin(pWarp.y * 1.75 - pWarp.x * 1.25 + t * 0.52) * 0.75;\n    float w2 = sin(pWarp.x * 2.05 + pWarp.y * 1.35 - t * 0.58 + swirl) * 0.58 +\n               cos(pWarp.y * 2.30 - pWarp.x * 0.95 + t * 0.50 - swirl * 0.6) * 0.42;\n\n    float w2_disp = w2 + dispOffset;\n    // Intrinsic optical softness (0.022) eliminates hard laser \"sticks\" and prevents razor tears on refracted text\n    float wAbs = sqrt(w2_disp * w2_disp + 0.022 + frostAmt * frostAmt * 0.045);\n    float width = 0.11 + frostAmt * 0.16;\n    float ridge = width / (pow(wAbs, 1.50) + width);\n    float halo = exp(-wAbs * 1.65) * 0.50;\n    return ridge * 0.68 + halo;\n  }\n\n  // Interactively warps fluid coordinate field based on cursor presence and click splash\n  vec2 warpFluid(vec2 p, vec2 pSurf, vec2 mouseNorm, float hoverAmt, vec2 clickNorm, float clickDt, float clickAmt) {\n    // 1. Smooth fingertip displacement: zero displacement at exact touch point, smooth outward swell\n    if (hoverAmt > 0.001) {\n      vec2 dMouse = pSurf - mouseNorm;\n      float rMouse = length(dMouse);\n      float radius = 0.90;\n      float mouseInf = smoothstep(radius, 0.0, rMouse);\n      \n      vec2 push = dMouse * (mouseInf * 0.70);\n      vec2 swirl = vec2(-dMouse.y, dMouse.x) * (mouseInf * 0.45);\n      \n      p += (push + swirl) * hoverAmt;\n    }\n    \n    // 2. Click impulse: physical liquid undulation / splash wave expanding from tap point\n    if (clickAmt > 0.001 && clickDt >= 0.0 && clickDt < 0.90) {\n      vec2 dClick = pSurf - clickNorm;\n      float rClick = length(dClick);\n      float waveSpeed = 2.8;\n      float waveFront = clickDt * waveSpeed;\n      float waveWidth = 0.35 + clickDt * 0.30;\n      float ring = smoothstep(waveWidth, 0.0, abs(rClick - waveFront));\n      float decay = (1.0 - clickDt / 0.90) * exp(-clickDt * 2.2);\n      \n      vec2 waveDir = rClick > 1e-4 ? dClick / rClick : vec2(0.0);\n      float splashDisplacement = ring * sin((rClick - waveFront) * 7.5) * decay * (clickAmt * 0.50);\n      p += waveDir * splashDisplacement;\n    }\n    \n    return p;\n  }\n\n  float getFluidExcitation(vec2 pSurf, vec2 mouseNorm, float hoverAmt, float hoverBright, vec2 clickNorm, float clickDt, float clickAmt) {\n    float glow = 0.0;\n    float brightScale = hoverBright * 0.01;\n    \n    // Faint bioluminescent / caustic awakening directly under the finger\n    if (hoverAmt > 0.001) {\n      float rMouse = length(pSurf - mouseNorm);\n      float mouseInf = smoothstep(0.85, 0.0, rMouse);\n      glow += mouseInf * hoverAmt * (brightScale * 0.45);\n    }\n    \n    // Fluid splash glow expanding with the liquid wave\n    if (clickAmt > 0.001 && clickDt >= 0.0 && clickDt < 0.90) {\n      float rClick = length(pSurf - clickNorm);\n      float waveFront = clickDt * 2.8;\n      float waveWidth = 0.35 + clickDt * 0.30;\n      float ring = smoothstep(waveWidth, 0.0, abs(rClick - waveFront));\n      float decay = (1.0 - clickDt / 0.90) * exp(-clickDt * 2.2);\n      glow += ring * decay * clickAmt * (brightScale * 0.70);\n    }\n    \n    return glow;\n  }\n\n  vec4 sampleBackdropRGBA(vec2 uv) {\n    if (u_srcComposite < -0.5) {\n      return vec4(0.0);\n    }\n    vec2 uvSafe = 1.0 - abs(1.0 - abs(uv));\n    if (u_srcComposite > 1.5) {\n      vec4 s = texture(u_src, vec2(uvSafe.x, 1.0 - uvSafe.y));\n      return vec4(s.rgb * s.a, s.a);\n    }\n    if (u_srcComposite > 0.5) {\n      vec4 s = texture(u_src, uvSafe);\n      return vec4(s.rgb + u_bgColor * (1.0 - s.a), 1.0);\n    }\n    vec2 uvTex = vec2(uvSafe.x, 1.0 - uvSafe.y);\n    return vec4(mix(u_bgColor, vec3(1.0), texture(u_src, uvTex).a), 1.0);\n  }\n\n  vec4 sampleFrostedRGBA(vec2 uv, float frostAmt) {\n    if (u_srcComposite < -0.5) {\n      return vec4(0.0);\n    }\n    vec4 centerCol = sampleBackdropRGBA(uv);\n    if (frostAmt <= 0.01) return centerCol;\n\n    // Real GPU Frosted Glass Diffusion (Golden-Angle Fermat Spiral Blur)\n    vec2 texel = 1.0 / u_resolution;\n    float radius = frostAmt * 40.0;\n    \n    vec4 accumCol = centerCol * 0.20;\n    float totalW = 0.20;\n\n    for (int i = 1; i <= 10; i++) {\n      float fi = float(i);\n      float r = sqrt(fi / 10.0) * radius;\n      float theta = fi * 2.3999632;\n      vec2 offset = vec2(cos(theta), sin(theta)) * r * texel;\n      \n      float w = exp(-0.5 * (r * r) / max(radius * radius * 0.4, 1.0));\n      accumCol += sampleBackdropRGBA(uv + offset) * w;\n      totalW += w;\n    }\n\n    return accumCol / totalW;\n  }\n\n  vec4 renderSingleGlassLens(vec2 screenPx, vec4 rect, float radius, bool isThumb, out float outBaseAlpha) {\n    outBaseAlpha = 1.0;\n    vec2 center = rect.xy + rect.zw * 0.5;\n    vec2 localPx = screenPx - center;\n    vec2 halfSize = rect.zw * 0.5;\n\n    // Interactive 3D Perspective Raycast projection for tilted surfaces\n    if (!isThumb && u_tilt.w > 0.5) {\n      float d = u_tilt.w;\n      float rx = u_tilt.x;\n      float ry = u_tilt.y;\n      float sc = max(u_tilt.z, 0.001);\n\n      float cosX = cos(rx), sinX = sin(rx);\n      float cosY = cos(ry), sinY = sin(ry);\n\n      // Plane normal in CSS 3D camera coordinates (Rotate around Y then around X)\n      vec3 N = vec3(sinY, -cosY * sinX, cosY * cosX);\n\n      // WebGL localPx has Y up, CSS 3D camera has Y down\n      vec3 V = vec3(localPx.x, -localPx.y, -d);\n      float denom = dot(V, N);\n      if (abs(denom) > 1e-5) {\n        float tHit = (-d * N.z) / denom;\n        vec3 P = vec3(tHit * V.x, tHit * V.y, d * (1.0 - tHit));\n\n        // Inverse RotateX (by -rx)\n        vec3 P1 = vec3(P.x, P.y * cosX + P.z * sinX, -P.y * sinX + P.z * cosX);\n        // Inverse RotateY (by -ry)\n        vec3 P0 = vec3(P1.x * cosY - P1.z * sinY, P1.y, P1.x * sinY + P1.z * cosY);\n\n        // Scale and convert back to WebGL localPx (Y up)\n        localPx = vec2(P0.x, -P0.y) / sc;\n      }\n    }\n\n    float coverage = 0.0;\n    vec2 norm = vec2(0.0);\n    float distIn = 0.0;\n\n    if (u_isText > 0.5) {\n      vec2 textUV = (screenPx - rect.xy) / rect.zw;\n      if (textUV.x < 0.0 || textUV.x > 1.0 || textUV.y < 0.0 || textUV.y > 1.0) {\n        return vec4(0.0);\n      }\n      vec2 maskUV = vec2(textUV.x, 1.0 - textUV.y);\n      vec4 tData = texture(u_textMask, maskUV);\n      coverage = tData.a;\n      if (coverage <= 0.005) return vec4(0.0);\n\n      distIn = tData.r * 32.0;\n\n      // 32-bit floating point continuous normal from GPU hardware bilinear central difference\n      vec2 texel = 1.0 / rect.zw;\n      vec2 step = texel * 1.5;\n      float d_r  = texture(u_textMask, maskUV + vec2(step.x, 0.0)).r;\n      float d_l  = texture(u_textMask, maskUV - vec2(step.x, 0.0)).r;\n      float d_t  = texture(u_textMask, maskUV + vec2(0.0, step.y)).r;\n      float d_b  = texture(u_textMask, maskUV - vec2(0.0, step.y)).r;\n      float d_tr = texture(u_textMask, maskUV + vec2(step.x, step.y)).r;\n      float d_tl = texture(u_textMask, maskUV + vec2(-step.x, step.y)).r;\n      float d_br = texture(u_textMask, maskUV + vec2(step.x, -step.y)).r;\n      float d_bl = texture(u_textMask, maskUV + vec2(-step.x, -step.y)).r;\n\n      float dx = -( (d_tr + 2.0 * d_r + d_br) - (d_tl + 2.0 * d_l + d_bl) );\n      float dy = -( (d_tr + 2.0 * d_t + d_tl) - (d_br + 2.0 * d_b + d_bl) );\n\n      norm = vec2(dx, dy);\n      float nLen = length(norm);\n      if (nLen > 1e-4) norm /= nLen;\n      else norm = vec2(0.0);\n\n      // Smooth 3D dome profile: 2D normal tilt smoothly decays to 0 at the top of the bevel/apex,\n      // completely eliminating medial axis crease lines, harsh step cliffs, and rectangular offset cutouts!\n      float bVal = max(u_bevelWidth, 0.5);\n      float strokeRad = max(bVal * 1.2, 4.0);\n      float domeTilt = cos(clamp(distIn / strokeRad, 0.0, 1.0) * 1.5707963);\n      norm *= domeTilt;\n    } else if (isThumb) {\n      float sdf = length(localPx) - radius;\n      coverage = 1.0 - smoothstep(-0.75, 0.75, sdf);\n      if (coverage <= 0.0) return vec4(0.0);\n      float rLen = length(localPx);\n      norm = rLen > 1e-4 ? localPx / rLen : vec2(0.0, 1.0);\n      distIn = -sdf;\n    } else {\n      float effRad = min(radius, min(halfSize.x, halfSize.y));\n      float sdf = evalLensSDF(localPx, halfSize, effRad);\n      coverage = 1.0 - smoothstep(-0.75, 0.75, sdf);\n      if (coverage <= 0.0) return vec4(0.0);\n\n      // Analytical Normal from smooth SDF for outer border & bevel\n      float eps = 1.0;\n      float dx = evalLensSDF(localPx + vec2(eps, 0.0), halfSize, effRad) -\n                 evalLensSDF(localPx - vec2(eps, 0.0), halfSize, effRad);\n      float dy = evalLensSDF(localPx + vec2(0.0, eps), halfSize, effRad) -\n                 evalLensSDF(localPx - vec2(0.0, eps), halfSize, effRad);\n      float gLen = length(vec2(dx, dy));\n      norm = gLen > 1e-4 ? vec2(dx, dy) / gLen : vec2(0.0);\n\n      distIn = -sdf;\n    }\n\n    bool isFullBleed = (!isThumb && u_isText < 0.5 && radius <= 0.01 && u_bevelWidth <= 0.01);\n    if (isFullBleed) {\n      coverage = 1.0;\n    }\n\n    // 1. Edge Bevel Refraction strictly on perimeter (distIn < bWidthVal)\n    float bWidthVal = max(u_bevelWidth, 0.5);\n    float bevelSlope = 0.0;\n    if (u_bevelWidth > 0.01 && distIn < bWidthVal) {\n      float t = distIn / bWidthVal;\n      bevelSlope = (1.0 - t) / max(sqrt(max(1.0 - (1.0 - t) * (1.0 - t), 0.001)), 0.15) * clamp(u_bevelWidth, 0.0, 1.0);\n    }\n    float edgeTaper = isFullBleed ? 1.0 : smoothstep(0.0, 1.8, distIn);\n    float thicknessScale = 0.35 + (u_thickness * 0.01) * 1.3;\n    float bevelRefr = (u_refraction * 0.001) * thicknessScale;\n    vec2 dispBevel = norm * (bevelSlope * 0.85 * bevelRefr);\n    if (u_isText > 0.5) {\n      float bRad = max(u_bevelWidth * 1.2, 4.0);\n      float t = clamp(distIn / bRad, 0.0, 1.0);\n      bevelSlope = (1.0 - t) / max(sqrt(max(1.0 - (1.0 - t) * (1.0 - t), 0.001)), 0.2) * clamp(u_bevelWidth * 0.4 + 0.6, 0.0, 1.5);\n      dispBevel = norm * (bevelSlope * 0.85 * bevelRefr);\n    } else if (u_isAudioDeck > 0.5) {\n      // Subtle molded-glass refraction along the outer Boolean union arc of the transport buttons\n      float s = halfSize.x / 240.0;\n      vec2 pPlay = localPx - vec2(0.0, -halfSize.y);\n      vec2 pPrev = localPx - vec2(-64.0 * s, -halfSize.y);\n      vec2 pNext = localPx - vec2(64.0 * s, -halfSize.y);\n      float dPlay = length(pPlay) - 40.0 * s;\n      float dPrev = length(pPrev) - 28.0 * s;\n      float dNext = length(pNext) - 28.0 * s;\n      float dSec = min(dPrev, dNext);\n      vec2 nPlay = length(pPlay) > 1e-4 ? pPlay / length(pPlay) : vec2(0.0, 1.0);\n      vec2 nSec = dPrev < dNext\n        ? (length(pPrev) > 1e-4 ? pPrev / length(pPrev) : vec2(0.0, 1.0))\n        : (length(pNext) > 1e-4 ? pNext / length(pNext) : vec2(0.0, 1.0));\n      float innerTransition = smoothstep(1.5 * s, bWidthVal, distIn);\n      float playMask = smoothstep(1.0 * s, 5.0 * s, distIn + dPlay) * smoothstep(0.0, 4.0 * s, dSec) * innerTransition;\n      float secMask = smoothstep(1.0 * s, 5.0 * s, distIn + dSec) * smoothstep(0.0, 4.0 * s, dPlay) * innerTransition;\n      float playEdge = smoothstep(-1.0 * s, 1.0 * s, -dPlay) * exp(-max(-dPlay, 0.0) / (3.2 * s)) * playMask;\n      float secEdge = smoothstep(-1.0 * s, 1.0 * s, -dSec) * exp(-max(-dSec, 0.0) / (2.8 * s)) * secMask;\n      dispBevel += (nPlay * playEdge * 0.45 + nSec * secEdge * 0.35) * bevelRefr;\n    } else if (u_switchThumb.z > 0.5 && u_switchThumb.w > 0.5) {\n      vec2 pThumb = localPx - u_switchThumb.xy;\n      vec2 halfThumb = u_switchThumb.zw;\n      float capRad = min(halfThumb.x, halfThumb.y);\n      float segHalf = max(halfThumb.x - capRad, 0.0);\n      vec2 qExact = vec2(pThumb.x - clamp(pThumb.x, -segHalf, segHalf), pThumb.y);\n      float dThumb = length(qExact) - capRad;\n      if (dThumb < 2.0) {\n        vec2 pNorm = qExact / max(capRad, 1.0);\n        float r2 = clamp(dot(pNorm, pNorm), 0.0, 1.0);\n        float thumbTaper = smoothstep(-0.75, 0.75, -dThumb);\n        float thumbBevel = pow(r2, mix(2.0, 0.8, clamp(u_bevelWidth / 15.0, 0.0, 1.0)));\n        dispBevel += pNorm * (thumbBevel * 0.65 * bevelRefr * thumbTaper);\n      }\n    }\n    float contourFactor = (1.0 - smoothstep(0.0, bWidthVal * 1.25, distIn)) * clamp(u_bevelWidth, 0.0, 1.0);\n\n    // 2. Liquid Surface & Dome Refraction across element body (100% continuous, zero creases, zero ovals)\n    float btnHeight = max(halfSize.y * 2.0, 1.0);\n    float frostVal = u_frost * 0.01;\n    float fluidT = u_time * (u_fluidSpeed * 0.01);\n    float fluidSc = 0.40 + u_fluidScale * 0.04;\n\n    vec2 localMouse = isThumb ? (u_mousePos - u_switchThumb.xy) : u_mousePos;\n    vec2 localClick = isThumb ? (u_clickPos - u_switchThumb.xy) : u_clickPos;\n    vec2 pPhys = (localPx / btnHeight) * 1.15;\n    vec2 mouseNorm = (localMouse / btnHeight) * 1.15;\n    vec2 clickNorm = (localClick / btnHeight) * 1.15;\n    float fluidPull = u_hoverStrength * (u_lightTrack * 0.01);\n    float hoverGlow = u_hoverStrength;\n    float clickAmt = u_clickWave * 0.01;\n    float clickDt = u_time - u_clickTime;\n\n    // Physical surface coordinate on the button (unrefracted by glass)\n    vec2 pSurf = (localPx / btnHeight) * fluidSc;\n    vec2 pSurf_warped = warpFluid(pSurf, pPhys, mouseNorm, fluidPull, clickNorm, clickDt, clickAmt);\n\n    // Dynamic 2D isotropic fluid gradient refraction: wave crests naturally refract light in 2D\n    float epsF = 0.04;\n    float gradFrost = max(frostVal, 0.28);\n    float fDx = getCausticWave(pSurf_warped + vec2(epsF, 0.0), fluidT, gradFrost, 0.0) -\n                getCausticWave(pSurf_warped - vec2(epsF, 0.0), fluidT, gradFrost, 0.0);\n    float fDy = getCausticWave(pSurf_warped + vec2(0.0, epsF), fluidT, gradFrost, 0.0) -\n                getCausticWave(pSurf_warped - vec2(0.0, epsF), fluidT, gradFrost, 0.0);\n    vec2 fluidGrad = vec2(fDx, fDy) / (2.0 * epsF);\n    fluidGrad /= (1.0 + length(fluidGrad) * 0.22);\n\n    // Smooth exponential rim aura decay: tight, seamless falloff hugging the bevel chamfer\n    // Tightly confined to the bevel edge, with delicate exponential fade onto the immediate perimeter (2-4px)\n    float rimDist = max(distIn - bWidthVal, 0.0);\n    float auraWidth = max(u_fluidAuraWidth, 1.0);\n    float auraDecay = exp(-rimDist / max(auraWidth * 0.65, 0.75)) * (1.0 - smoothstep(0.0, auraWidth * 2.0, rimDist));\n    float fluidPresence = max(contourFactor, auraDecay);\n\n    // Liquid refraction ripples are focused strictly where fluid is present (bevel + aura)\n    // The central core remains 100% pure optical dome magnification without soapy fluid turbulence!\n    float centerFluidFactor = clamp(u_fluidCenter * 0.01, 0.0, 1.0);\n    float refrFluidWeight = mix(centerFluidFactor, 1.0, fluidPresence);\n\n    float fluidBend = (u_refraction * 0.0004) * (0.35 + (u_thickness * 0.01) * 0.95);\n    vec2 dispFluid = fluidGrad * (fluidBend * refrFluidWeight);\n\n    // Gentle isotropic convex glass magnification (smooth C-infinity dome profile)\n    vec2 dispDome = vec2(0.0);\n    float domeBend = (u_thickness * 0.00015) * (u_refraction * 0.01);\n    if (u_isText > 0.5) {\n      dispDome = -norm * (domeBend * 3.5);\n    } else {\n      vec2 pIso = localPx / (halfSize.y * 1.5);\n      float domeProfile = 1.0 / (1.0 + dot(pIso, pIso) * 0.35);\n      dispDome = -pIso * (domeProfile * domeBend);\n    }\n\n    // Total displacement: strictly tapered to zero at boundary\n    vec2 disp = (dispBevel + dispFluid + dispDome) * edgeTaper;\n\n    // Prismatic dispersion spread factor on the bevel chamfer and perimeter\n    float dispSpread = (u_dispersion * 0.01) * (contourFactor * 0.85 + 0.15);\n\n    // 3. Chromatic Background Refraction (smooth spectral split without negative delta)\n    vec4 bgSample = sampleFrostedRGBA(v_uv - disp, frostVal);\n    vec3 bgSpectral = bgSample.rgb;\n    float bgAlpha = bgSample.a;\n\n    if (dispSpread > 0.0005 && bgAlpha > 0.001) {\n      vec2 dR = disp * (1.0 - dispSpread * 0.85);\n      vec2 dY = disp * (1.0 - dispSpread * 0.40);\n      vec2 dC = disp * (1.0 + dispSpread * 0.40);\n      vec2 dB = disp * (1.0 + dispSpread * 0.85);\n\n      vec4 sR_bg = sampleFrostedRGBA(v_uv - dR, frostVal);\n      vec4 sY_bg = sampleFrostedRGBA(v_uv - dY, frostVal);\n      vec4 sC_bg = sampleFrostedRGBA(v_uv - dC, frostVal);\n      vec4 sB_bg = sampleFrostedRGBA(v_uv - dB, frostVal);\n\n      float rEdge = sR_bg.r * 0.60 + sY_bg.r * 0.40;\n      float gEdge = sY_bg.g * 0.35 + bgSample.g * 0.30 + sC_bg.g * 0.35;\n      float bEdge = sC_bg.b * 0.40 + sB_bg.b * 0.60;\n      bgSpectral = vec3(rEdge, gEdge, bEdge);\n      bgAlpha = (sR_bg.a + sY_bg.a + bgSample.a + sC_bg.a + sB_bg.a) * 0.20;\n    }\n\n    vec2 hitPxG = (v_uv - (dispBevel + dispDome + dispFluid * 0.25) * edgeTaper) * u_resolution;\n\n    // Interactive fluid coordinate for the element body\n    vec2 pG_raw = (hitPxG - center) / btnHeight * fluidSc;\n    vec2 pG_warped = warpFluid(pG_raw, pPhys, mouseNorm, fluidPull, clickNorm, clickDt, clickAmt);\n    \n    // Pure fluid caustic field\n    float fG_body = getCausticWave(pG_warped, fluidT, frostVal, 0.0);\n\n    // Dynamic polar border beam orbiting the perimeter (for buttons and prompt box)\n    float beamSpeed = u_fluidSpeed * 0.015;\n    float aspect = halfSize.x / max(halfSize.y, 1.0);\n    float theta = atan(localPx.y * aspect, localPx.x);\n    float beamPhase = theta - u_time * beamSpeed;\n\n    // Smooth traveling wave along the rim\n    // Dynamic comet crest that sweeps along the border beam\n    float cosB = cos(beamPhase);\n    float beamHead = pow(clamp(cosB * 0.5 + 0.5, 0.0, 1.0), 3.5);\n    float beamGlow = pow(clamp(cosB * 0.5 + 0.5, 0.0, 1.0), 1.8) * 0.35;\n    float beamProfile = beamHead * 1.5 + beamGlow;\n    float flowAmt = clamp(u_auroraFlow * 0.01, 0.0, 1.0);\n    float flowMod = mix(1.0, beamProfile * 1.4 + 0.08, flowAmt);\n\n    // Dynamic rainbow polar aurora chromatic phase (border beam style)\n    // Seamless 2pi-periodic spectrum without branch-cut seams across the negative X axis\n    vec3 polarRainbow = 0.55 + 0.45 * cos(beamPhase + vec3(0.0, 2.0944, 4.1888));\n    vec3 auroraColor = polarRainbow;\n\n    if (u_isText > 0.5) {\n      // Smooth continuous spectral gradient across the word with slow organic breathing drift\n      float xSpan = (localPx.x / max(halfSize.x, 1.0)) * 0.5 + 0.5;\n      float slowDrift = u_time * (u_fluidSpeed * 0.0035);\n      float textPhase = xSpan * 3.14159265 * 1.35 + slowDrift;\n      auroraColor = 0.55 + 0.45 * cos(textPhase + vec3(0.0, 2.0944, 4.1888));\n\n      // Organic liquid caustic shimmer: gentle luminous wave breathing through the living fluid\n      float waveShimmer = 0.82 + 0.28 * cos(xSpan * 4.71239 - u_time * (u_fluidSpeed * 0.008));\n      flowMod = mix(1.0, waveShimmer * 1.25, flowAmt);\n    }\n\n    // Edge fluid mask (confined to bevel & tight edge aura; Center Clarity drives pure colorless refraction on panels)\n    float edgeFluidMask = fluidPresence * flowMod;\n    float fluidMask = u_isText > 0.5 ? mix(centerFluidFactor, 1.0, edgeFluidMask) : edgeFluidMask;\n\n    float dispFactor = clamp(u_dispersion * 0.01, 0.0, 1.0);\n    vec3 causticTint = mix(vec3(1.0), auroraColor, dispFactor);\n\n    // Fluid illumination on the glass rim\n    float fluidGlow = getFluidExcitation(pPhys, mouseNorm, hoverGlow, u_hoverBright, clickNorm, clickDt, clickAmt);\n    if (u_isText > 0.5 && hoverGlow > 0.001) {\n      // For typography: bathe the entire word in luminous caustic glow, with gentle focus on the cursor\n      float xDist = abs(pPhys.x - mouseNorm.x);\n      float textHoverFalloff = exp(-xDist * 0.5);\n      float wordAmbientHover = hoverGlow * (u_hoverBright * 0.01) * 0.45;\n      fluidGlow = max(fluidGlow, wordAmbientHover * (0.60 + 0.40 * textHoverFalloff));\n    }\n    float fluidEdgeFade = isFullBleed ? 1.0 : smoothstep(0.0, 1.8, distIn);\n    float causticBrightScale = (u_fluidBright * 0.01) + fluidGlow;\n    float totalFluidFactor = causticBrightScale * fluidEdgeFade * fluidMask;\n\n    // Caustic highlight: monochromatic wave modulated by iridescent aurora tint\n    vec3 causticEmission = causticTint * (fG_body * totalFluidFactor * edgeTaper);\n    if (dispSpread > 0.0005) {\n      vec3 prismAccent = 0.55 + 0.45 * cos(beamPhase * 2.0 + vec3(0.0, 2.0944, 4.1888));\n      causticEmission += (prismAccent - 0.45) * (fG_body * totalFluidFactor * edgeTaper * clamp(u_dispersion * 0.012, 0.0, 1.0) * (1.0 + contourFactor * 1.5));\n    }\n\n    // Smoked Glass Absorption Tint (obsidian glass)\n    float absorptionScale = 0.5 + (u_thickness * 0.01) * 0.8;\n    float darkFactor = clamp((u_darkness * 0.01) * absorptionScale, 0.0, 0.95);\n    float bevelThickness = 1.0 - bevelSlope * 0.35;\n    float darkAtten = darkFactor * bevelThickness * 0.85;\n    vec3 obsidianTint = u_bgColor * 0.45;\n\n    // Clean, crisp achromatic specular gleam strictly on the contour facing light\n    vec2 lightDir2D = vec2(cos(u_lightAngle), sin(u_lightAngle));\n    float lightAlign = dot(norm, lightDir2D);\n\n    float textFade = u_isText > 0.5 ? smoothstep(0.08, 0.85, coverage) : 1.0;\n    float bevelPeak = smoothstep(0.0, 1.0, distIn) * (1.0 - smoothstep(1.0, bWidthVal + 1.2, distIn)) * textFade;\n    float mainGleam = pow(clamp(lightAlign, 0.0, 1.0), 16.0) * bevelPeak * (u_sheen * 0.01) * 1.5;\n    float backGleam = pow(clamp(-lightAlign, 0.0, 1.0), 8.0) * bevelPeak * (u_rim * 0.01) * 0.7;\n    float edgeRim = pow(clamp(1.0 - distIn / 2.5, 0.0, 1.0), 2.0) * edgeTaper * (0.35 + 0.5 * clamp(lightAlign * 0.5 + 0.5, 0.0, 1.0)) * (u_rim * 0.01) * 0.85 * textFade;\n\n    if (u_isText > 0.5) {\n      // Single continuous physical glass bevel highlight:\n      // Organic exponential profile hugging the outer perimeter with zero double-contours or square cutouts\n      float gleamWidth = max(u_bevelWidth * 1.4, 2.4);\n      float gleamFalloff = exp(-distIn / gleamWidth) * edgeTaper * textFade;\n      mainGleam = pow(clamp(lightAlign, 0.0, 1.0), 14.0) * gleamFalloff * (u_sheen * 0.01) * 1.8;\n      backGleam = pow(clamp(-lightAlign, 0.0, 1.0), 7.0) * gleamFalloff * (u_rim * 0.01) * 0.75;\n      edgeRim = pow(clamp(1.0 - distIn / max(u_bevelWidth * 1.6, 2.8), 0.0, 1.0), 1.6) * edgeTaper *\n                (0.35 + 0.55 * clamp(lightAlign * 0.5 + 0.5, 0.0, 1.0)) * (u_rim * 0.01) * 0.85 * textFade;\n    }\n\n    // Prismatic chromatic sheen on the bevel gleam\n    float prismAngle = dot(vec2(-norm.y, norm.x), lightDir2D);\n    vec3 gleamColor = vec3(1.0);\n    if (u_dispersion > 1.0) {\n      float gleamDisp = (u_dispersion * 0.01) * 0.55;\n      gleamColor = vec3(\n        1.0 + prismAngle * gleamDisp * 0.65,\n        1.0 - abs(prismAngle) * gleamDisp * 0.35,\n        1.0 - prismAngle * gleamDisp * 0.65\n      );\n    }\n\n    vec3 lensCol = vec3(0.0);\n    if (u_srcComposite < -0.5 || u_srcComposite > 1.5) {\n      float domTransparency = 1.0 - bgAlpha;\n      float absorbAlpha = darkAtten * 0.75;\n      outBaseAlpha = clamp(bgAlpha + absorbAlpha * domTransparency, 0.0, 1.0);\n\n      vec3 baseCol = bgSpectral * (1.0 - absorbAlpha) + (u_bgColor * 0.35) * (absorbAlpha * domTransparency);\n      vec3 opticalEmit = causticEmission * (1.0 - darkAtten * 0.65);\n\n      if (u_isText > 0.5) {\n        float bRad = max(u_bevelWidth * 1.2, 4.0);\n        float strokeDome = cos(clamp(distIn / bRad, 0.0, 1.0) * 1.5707963);\n        float glyphFresnel = (0.045 + 0.095 * strokeDome) * (0.45 + (u_refraction * 0.01) * 0.55) * (0.45 + frostVal * 0.55) * (1.0 - darkAtten * 0.7) * textFade;\n        opticalEmit += mix(vec3(1.0), auroraColor, dispFactor * 0.40) * (glyphFresnel * domTransparency);\n      } else if (!isFullBleed) {\n        float bevelFresnel = contourFactor * (0.04 + (u_refraction * 0.01) * 0.06) * (0.5 + (u_thickness * 0.01) * 0.5) * edgeTaper;\n        float frostVeil = (frostVal * 0.03 + (u_sheen * 0.01) * 0.012) * (1.0 - darkAtten * 0.7) * edgeTaper;\n        opticalEmit += (vec3(bevelFresnel) * gleamColor + vec3(frostVeil)) * domTransparency;\n      }\n\n      lensCol = baseCol + opticalEmit + (mainGleam + backGleam) * gleamColor + vec3(edgeRim);\n    } else {\n      outBaseAlpha = 1.0;\n      vec3 baseSample = bgSpectral + causticEmission;\n      lensCol = mix(baseSample, obsidianTint, darkAtten);\n      lensCol += (mainGleam + backGleam) * gleamColor + vec3(edgeRim);\n    }\n\n    if (u_isAudioDeck > 0.5) {\n      // Convex molded-glass dome relief along the mutual Boolean union boundary of the transport buttons\n      float s = halfSize.x / 240.0;\n      vec2 pPlay = localPx - vec2(0.0, -halfSize.y);\n      vec2 pPrev = localPx - vec2(-64.0 * s, -halfSize.y);\n      vec2 pNext = localPx - vec2(64.0 * s, -halfSize.y);\n      float rPlay = length(pPlay);\n      float rPrev = length(pPrev);\n      float rNext = length(pNext);\n      float dPlay = rPlay - 40.0 * s;\n      float dPrev = rPrev - 28.0 * s;\n      float dNext = rNext - 28.0 * s;\n      float dSec = min(dPrev, dNext);\n\n      vec2 nPlay = rPlay > 1e-4 ? pPlay / rPlay : vec2(0.0, 1.0);\n      vec2 nSec = dPrev < dNext\n        ? (rPrev > 1e-4 ? pPrev / rPrev : vec2(0.0, 1.0))\n        : (rNext > 1e-4 ? pNext / rNext : vec2(0.0, 1.0));\n\n      float innerTransition = smoothstep(1.5 * s, bWidthVal, distIn);\n      float playMask = smoothstep(1.0 * s, 5.0 * s, distIn + dPlay) * smoothstep(0.0, 4.0 * s, dSec) * innerTransition;\n      float secMask = smoothstep(1.0 * s, 5.0 * s, distIn + dSec) * smoothstep(0.0, 4.0 * s, dPlay) * innerTransition;\n      float distPlay = -dPlay;\n      float distSec = -dSec;\n      float playTaper = smoothstep(-0.8 * s, 0.8 * s, distPlay) * clamp(rPlay / (40.0 * s), 0.0, 1.0);\n      float secTaper = smoothstep(-0.8 * s, 0.8 * s, distSec) * clamp(min(rPrev, rNext) / (28.0 * s), 0.0, 1.0);\n\n      float playSheenProf = playTaper * (1.0 - smoothstep(1.0 * s, bWidthVal + 1.2 * s, max(distPlay, 0.0))) * playMask;\n      float secSheenProf = secTaper * (1.0 - smoothstep(1.0 * s, bWidthVal * 0.85 + 1.2 * s, max(distSec, 0.0))) * secMask;\n      float playRimProf = playTaper * pow(clamp(1.0 - max(distPlay, 0.0) / (2.5 * s), 0.0, 1.0), 2.0) * playMask;\n      float secRimProf = secTaper * pow(clamp(1.0 - max(distSec, 0.0) / (2.2 * s), 0.0, 1.0), 2.0) * secMask;\n\n      float alignPlay = dot(nPlay, lightDir2D);\n      float alignSec = dot(nSec, lightDir2D);\n\n      float playGleam = (pow(clamp(alignPlay, 0.0, 1.0), 8.0) * (u_sheen * 0.01) * 0.85 +\n                         pow(clamp(-alignPlay, 0.0, 1.0), 6.0) * (u_rim * 0.01) * 0.35) * playSheenProf;\n      float secGleam = (pow(clamp(alignSec, 0.0, 1.0), 8.0) * (u_sheen * 0.01) * 0.72 +\n                        pow(clamp(-alignSec, 0.0, 1.0), 6.0) * (u_rim * 0.01) * 0.28) * secSheenProf;\n\n      float playEdgeRim = playRimProf * (0.25 + 0.55 * clamp(alignPlay * 0.5 + 0.5, 0.0, 1.0)) * (u_rim * 0.01) * 0.48;\n      float secEdgeRim = secRimProf * (0.22 + 0.50 * clamp(alignSec * 0.5 + 0.5, 0.0, 1.0)) * (u_rim * 0.01) * 0.40;\n\n      vec2 nDome = dPlay < dSec ? nPlay : nSec;\n      float domePrism = dot(vec2(-nDome.y, nDome.x), lightDir2D);\n      vec3 domeGleamColor = vec3(1.0);\n      if (u_dispersion > 1.0) {\n        float gDisp = (u_dispersion * 0.01) * 0.55;\n        domeGleamColor = vec3(\n          1.0 + domePrism * gDisp * 0.65,\n          1.0 - abs(domePrism) * gDisp * 0.35,\n          1.0 - domePrism * gDisp * 0.65\n        );\n      }\n\n      lensCol += (playGleam + secGleam) * domeGleamColor + vec3(playEdgeRim + secEdgeRim);\n    }\n\n    return vec4(lensCol, coverage);\n  }\n\n  vec4 renderGlassLens(vec2 screenPx, vec4 rect, float radius) {\n    float baseAlpha = 1.0;\n    vec4 lens = renderSingleGlassLens(screenPx, rect, radius, false, baseAlpha);\n    if (u_switchThumb.z > 0.5 && u_switchThumb.w > 0.5 && lens.a > 0.0) {\n      vec2 trackCenter = rect.xy + rect.zw * 0.5;\n      vec2 thumbCenter = trackCenter + u_switchThumb.xy;\n      vec2 halfThumb = u_switchThumb.zw;\n      float capRad = min(halfThumb.x, halfThumb.y);\n      float segHalf = max(halfThumb.x - capRad, 0.0);\n      vec2 pThumb = screenPx - thumbCenter;\n      vec2 qExact = vec2(pThumb.x - clamp(pThumb.x, -segHalf, segHalf), pThumb.y);\n      float dThumb = length(qExact) - capRad;\n      if (dThumb <= 2.0) {\n        float distThumb = -dThumb;\n        float thumbTaper = smoothstep(-0.75, 0.75, distThumb);\n\n        // Normalized radial coordinates from capsule medial axis: r in [0, 1], r2 = r^2 in [0, 1]\n        vec2 pNorm = qExact / max(capRad, 1.0);\n        float r2 = clamp(dot(pNorm, pNorm), 0.0, 1.0);\n        vec2 nThumb = length(qExact) > 1e-4 ? qExact / length(qExact) : vec2(0.0, 1.0);\n\n        float frostVal = u_frost * 0.01;\n        float sheenAmt = u_sheen * 0.01;\n        float rimAmt = u_rim * 0.01;\n\n        // Smooth C-infinity bevel cushion: flatter central plateau, gentler bevel closer to the perimeter\n        float domeExp = mix(1.85, 0.85, clamp(u_bevelWidth / 15.0, 0.0, 1.0));\n        float smoothDome = pow(r2, domeExp);\n        float softEdge = pow(r2, 4.8);\n\n        vec2 lightDir2D = vec2(cos(u_lightAngle), sin(u_lightAngle));\n        float alignSmooth = dot(pNorm, lightDir2D);\n        float alignEdge = dot(nThumb, lightDir2D);\n\n        // Delicate 3D bevel lighting (less bulging/puffy, more refined flat-topped glass lens)\n        float darkFade = 1.0 - clamp(u_darkness * 0.01, 0.0, 0.9);\n        float primaryGlow = pow(clamp(alignSmooth * 0.5 + 0.5, 0.0, 1.0), 2.2) * sheenAmt * 0.28;\n        float counterGlow = pow(clamp(-alignSmooth * 0.5 + 0.5, 0.0, 1.0), 2.4) * rimAmt * 0.20;\n        float ambientDome = (sheenAmt * 0.09 + rimAmt * 0.09 + frostVal * 0.04) * darkFade;\n        // Soft achromatic frosted glass base fill so the interior is evenly translucent\n        float innerTranslucentFill = (0.05 + frostVal * 0.07 + sheenAmt * 0.04) * darkFade;\n        float domeCushion = (primaryGlow + counterGlow + ambientDome) * smoothDome + innerTranslucentFill;\n\n        // Delicate outer glass rim at r -> 1\n        float dirRim = 0.45 + 0.55 * max(pow(clamp(alignEdge * 0.5 + 0.5, 0.0, 1.0), 2.2),\n                                         pow(clamp(-alignEdge * 0.5 + 0.5, 0.0, 1.0), 2.2) * 0.85);\n        float edgeHighlight = softEdge * dirRim * (rimAmt * 0.24 + sheenAmt * 0.12);\n\n        // Subtle chromatic dispersion flare on the bevel (driven by Dispersion slider)\n        float domePrism = dot(vec2(-pNorm.y, pNorm.x), lightDir2D);\n        vec3 domeGleamColor = vec3(1.0);\n        if (u_dispersion > 1.0) {\n          float gDisp = (u_dispersion * 0.01) * 0.25;\n          domeGleamColor = vec3(\n            1.0 + domePrism * gDisp * 0.50,\n            1.0 - abs(domePrism) * gDisp * 0.22,\n            1.0 - domePrism * gDisp * 0.50\n          );\n        }\n\n        // Purely additive optical glass dome over the transparent refracted capsule (zero opaque darkening!)\n        lens.rgb += ((domeCushion + edgeHighlight) * domeGleamColor) * thumbTaper;\n      }\n    }\n    if (u_srcComposite < -0.5 || u_srcComposite > 1.5) {\n      float coverage = lens.a;\n      vec3 clampedRGB = clamp(lens.rgb, 0.0, 1.0);\n      float lightPeak = max(clampedRGB.r, max(clampedRGB.g, clampedRGB.b));\n      float finalAlpha = clamp(baseAlpha + lightPeak * (1.0 - baseAlpha), 0.0, 1.0) * coverage;\n      return vec4(clampedRGB * coverage, finalAlpha);\n    }\n    return vec4(lens.rgb * lens.a, lens.a);\n  }\n\n  void main() {\n    if (u_useBackdrop > 0.5) {\n      float a = texture(u_src, vec2(v_uv.x, 1.0 - v_uv.y)).a;\n      fragColor = vec4(vec3(a), a);\n      return;\n    }\n    vec2 screenPx = v_uv * u_resolution;\n    fragColor = renderGlassLens(screenPx, u_rect, u_radius);\n  }\n";
export declare class SharedCausticEngine {
    private glCanvas;
    private gl;
    private prog;
    private quadBuf;
    private bgTexture;
    private compositeCanvas;
    private compositeCtx;
    private compositeTexture;
    private textMaskCanvas;
    private textMaskCtx;
    private textMaskTextures;
    private uSrc;
    private uSrcComposite;
    private uTextMask;
    private uIsText;
    private uResolution;
    private uRect;
    private uRadius;
    private uUseBackdrop;
    private uTilt;
    private uBgColor;
    private uRefraction;
    private uThickness;
    private uBevelWidth;
    private uFrost;
    private uDispersion;
    private uSheen;
    private uLightAngle;
    private uDarkness;
    private uRim;
    private uTime;
    private uFluidBright;
    private uFluidSpeed;
    private uFluidScale;
    private uFluidAuraWidth;
    private uFluidCenter;
    private uAuroraFlow;
    private uMousePos;
    private uHoverStrength;
    private uLightTrack;
    private uHoverBright;
    private uClickPos;
    private uClickTime;
    private uClickWave;
    private uIsAudioDeck;
    private uSwitchThumb;
    private instances;
    private animId;
    private startTime;
    private isTabVisible;
    constructor();
    private handleVisibilityChange;
    private initGL;
    register(inst: TactileGlassInstance): void;
    unregister(id: string): void;
    private startLoop;
    private stopLoop;
    getTime(): number;
    private renderFrame;
    teardown(): void;
}
export declare function getSharedCausticEngine(): SharedCausticEngine;
/**
 * TactileGlassStage:
 * Drives showcase or viewport fullscreen canvas with scissor testing,
 * background grid upload, and interaction tracking.
 */
export interface StageTargetInfo {
    element: HTMLElement;
    isCircle?: boolean;
    isText?: boolean;
    isAudioDeck?: boolean;
    params: TactileGlassParams;
    tilt?: {
        rotX: number;
        rotY: number;
        scale: number;
        focalLength?: number;
    } | null;
}
export interface TactileGlassStageConfig {
    getTargets: () => (StageTargetInfo | null | undefined)[];
    onResize?: () => void;
    drawBackground?: (ctx: CanvasRenderingContext2D, width: number, height: number, dpr: number, time: number, offsetX?: number, offsetY?: number) => void;
    isBackgroundDynamic?: () => boolean;
    getBackgroundDirtyRect?: () => {
        x: number;
        y: number;
        width: number;
        height: number;
    } | null;
}
export declare class TactileGlassStage {
    private canvas;
    private config;
    private gl;
    private prog;
    private quadBuf;
    private bgCanvas;
    private bgCtx;
    private bgTexture;
    private sceneTexture;
    private sceneTexW;
    private sceneTexH;
    private cleanBgCanvas;
    private cleanBgCtx;
    private bgPatchCanvas;
    private bgPatchCtx;
    private uResolution;
    private uSrc;
    private uSrcComposite;
    private uTextMask;
    private uIsText;
    private uIsAudioDeck;
    private uSwitchThumb;
    private textMaskCanvas;
    private textMaskCtx;
    private textMaskTexture;
    private lastTextMaskKey;
    private uRect;
    private uRadius;
    private uUseBackdrop;
    private uTilt;
    private uBgColor;
    private uRefraction;
    private uThickness;
    private uBevelWidth;
    private uFrost;
    private uDispersion;
    private uSheen;
    private uLightAngle;
    private uDarkness;
    private uRim;
    private uTime;
    private uFluidBright;
    private uFluidSpeed;
    private uFluidScale;
    private uFluidAuraWidth;
    private uFluidCenter;
    private uAuroraFlow;
    private uMousePos;
    private uHoverStrength;
    private uLightTrack;
    private uHoverBright;
    private uClickPos;
    private uClickTime;
    private uClickWave;
    private pointerStates;
    private getPointerState;
    private startTime;
    private animId;
    private dpr;
    private resizeObserver;
    private isPaused;
    private isTabVisible;
    constructor(canvas: HTMLCanvasElement, config: TactileGlassStageConfig);
    private initGL;
    updateBackground(time?: number): void;
    private handleResize;
    resize(): void;
    private handlePointerCoord;
    private attachedEls;
    private hasNestedAttachedTarget;
    attachPointer(el: HTMLElement | null | undefined): void;
    resetPointer(): void;
    private handleVisibilityChange;
    setPaused(paused: boolean): void;
    private syncLoopState;
    private startLoop;
    private stopLoop;
    render(): void;
    teardown(): void;
}
