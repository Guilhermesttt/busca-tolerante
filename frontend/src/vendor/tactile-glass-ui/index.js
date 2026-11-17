// Vendored from tactile-glass-ui@0.1.1 (MIT, uixNinja). Modified: aurora palette recolored to steel/tech blue.
// (runtime CSS injection removed: styles are imported from ./tactile-glass-ui.css)

var pe = Object.defineProperty;
var ve = (m, t, e) => t in m ? pe(m, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : m[t] = e;
var l = (m, t, e) => ve(m, typeof t != "symbol" ? t + "" : t, e);
import { jsxs as ht, jsx as D, Fragment as xe } from "react/jsx-runtime";
import be, { useId as Ht, useRef as ct, useEffect as vt, useState as Ft, useMemo as Te, useCallback as we } from "react";
const Tt = {
  refraction: 4,
  thickness: 8,
  bevelWidth: 2,
  frost: 2,
  dispersion: 88,
  sheen: 12,
  lightAngle: 24,
  darkness: 0,
  rim: 16,
  fluidBright: 36,
  fluidSpeed: 80,
  fluidScale: 24,
  fluidAuraWidth: 8,
  fluidCenter: 32,
  auroraFlow: 100,
  hoverBright: 264,
  lightTrack: 100,
  clickWave: 100
}, yt = {
  refraction: 2,
  thickness: 8,
  bevelWidth: 2,
  frost: 16,
  dispersion: 80,
  sheen: 40,
  lightAngle: 24,
  darkness: 0,
  rim: 48,
  fluidBright: 48,
  fluidSpeed: 80,
  fluidScale: 16,
  fluidAuraWidth: 12,
  fluidCenter: 0,
  auroraFlow: 0,
  hoverBright: 256,
  lightTrack: 100,
  clickWave: 96
}, St = {
  refraction: 72,
  thickness: 16,
  bevelWidth: 4,
  frost: 80,
  dispersion: 0,
  sheen: 16,
  lightAngle: 24,
  darkness: 24,
  rim: 40,
  fluidBright: 32,
  fluidSpeed: 0,
  fluidScale: 4,
  fluidAuraWidth: 32,
  fluidCenter: 96,
  auroraFlow: 0,
  hoverBright: 144,
  lightTrack: 100,
  clickWave: 96
}, Mt = {
  refraction: 2,
  thickness: 8,
  bevelWidth: 2,
  frost: 8,
  dispersion: 80,
  sheen: 24,
  lightAngle: 24,
  darkness: 0,
  rim: 48,
  fluidBright: 40,
  fluidSpeed: 80,
  fluidScale: 8,
  fluidAuraWidth: 12,
  fluidCenter: 0,
  auroraFlow: 64,
  hoverBright: 256,
  lightTrack: 100,
  clickWave: 96
}, kt = {
  refraction: 88,
  thickness: 88,
  bevelWidth: 8,
  frost: 24,
  dispersion: 96,
  sheen: 24,
  lightAngle: 24,
  darkness: 8,
  rim: 24,
  fluidBright: 32,
  fluidSpeed: 88,
  fluidScale: 56,
  fluidAuraWidth: 28,
  fluidCenter: 0,
  auroraFlow: 100,
  hoverBright: 200,
  lightTrack: 100,
  clickWave: 96
}, Pt = {
  refraction: 88,
  thickness: 72,
  bevelWidth: 3,
  frost: 4,
  dispersion: 96,
  sheen: 12,
  lightAngle: 24,
  darkness: 0,
  rim: 16,
  fluidBright: 24,
  fluidSpeed: 64,
  fluidScale: 16,
  fluidAuraWidth: 16,
  fluidCenter: 0,
  auroraFlow: 100,
  hoverBright: 200,
  lightTrack: 100,
  clickWave: 96
}, Rt = {
  refraction: 80,
  thickness: 48,
  bevelWidth: 2,
  frost: 40,
  dispersion: 80,
  sheen: 24,
  lightAngle: 24,
  angle: 24,
  darkness: 0,
  rim: 16,
  fluidBright: 80,
  fluidSpeed: 80,
  fluidScale: 8,
  fluidAuraWidth: 2,
  fluidCenter: 8,
  auroraFlow: 0,
  hoverBright: 96,
  lightTrack: 100,
  clickWave: 96
}, _t = {
  refraction: 88,
  thickness: 88,
  bevelWidth: 8,
  frost: 4,
  dispersion: 96,
  sheen: 16,
  lightAngle: 24,
  angle: 24,
  darkness: 0,
  rim: 16,
  fluidBright: 24,
  fluidSpeed: 64,
  fluidScale: 48,
  fluidAuraWidth: 40,
  fluidCenter: 32,
  auroraFlow: 100,
  hoverBright: 144,
  lightTrack: 100,
  clickWave: 96
}, Et = {
  refraction: 80,
  thickness: 88,
  bevelWidth: 0,
  frost: 0,
  dispersion: 96,
  sheen: 0,
  lightAngle: 0,
  angle: 0,
  darkness: 0,
  rim: 0,
  fluidBright: 12,
  fluidSpeed: 40,
  fluidScale: 48,
  fluidAuraWidth: 64,
  fluidCenter: 12,
  auroraFlow: 100,
  hoverBright: 128,
  lightTrack: 100,
  clickWave: 56
}, ye = `#version 300 es
  in vec2 a_pos;
  out vec2 v_uv;
  void main() {
    v_uv = (a_pos + 1.0) * 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`, Me = `#version 300 es
  precision highp float;
  in vec2 v_uv;
  out vec4 fragColor;

  uniform vec2 u_resolution;
  uniform sampler2D u_src;
  uniform float u_srcComposite;
  uniform sampler2D u_textMask;
  uniform float u_isText;
  uniform float u_isAudioDeck;
  uniform vec4 u_switchThumb;
  uniform vec4 u_rect;
  uniform float u_radius;
  uniform float u_useBackdrop;
  uniform vec4 u_tilt;
  uniform vec3 u_bgColor;

  // Glass optic parameters
  uniform float u_refraction;
  uniform float u_thickness;
  uniform float u_bevelWidth;
  uniform float u_frost;
  uniform float u_dispersion;
  uniform float u_sheen;
  uniform float u_lightAngle;
  uniform float u_darkness;
  uniform float u_rim;
  uniform float u_time;

  // Fluid caustic uniforms
  uniform float u_fluidBright;
  uniform float u_fluidSpeed;
  uniform float u_fluidScale;
  uniform float u_fluidAuraWidth;
  uniform float u_fluidCenter;
  uniform float u_auroraFlow;

  // Interactivity uniforms
  uniform vec2 u_mousePos;
  uniform float u_hoverStrength;
  uniform float u_lightTrack;
  uniform float u_hoverBright;
  uniform vec2 u_clickPos;
  uniform float u_clickTime;
  uniform float u_clickWave;


  float smax(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return max(a, b) + h * h * k * 0.25;
  }

  float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
  }

  float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    vec2 u = max(-q, 0.0);
    float inner = -(u.x * u.y) / max(length(u), 1e-4);
    return inner + length(max(q, 0.0)) - r;
  }

  float opSmoothUnion(float d1, float d2, float k) {
    vec2 u = max(vec2(k - d1, k - d2), vec2(0.0));
    return max(k, min(d1, d2)) - length(u);
  }

  float sdAudioDeck(vec2 p, vec2 b, float r) {
    float s = b.x / 240.0;
    float dCard = sdRoundRect(p, b, r);
    float dPlay = length(p - vec2(0.0, -b.y)) - 40.0 * s;
    float dPrev = length(p - vec2(-64.0 * s, -b.y)) - 28.0 * s;
    float dNext = length(p - vec2(64.0 * s, -b.y)) - 28.0 * s;
    float dBridge = length(p - vec2(clamp(p.x, -64.0 * s, 64.0 * s), -b.y)) - 9.0 * s;
    float dBtns = opSmoothUnion(opSmoothUnion(dPlay, min(dPrev, dNext), 2.0 * s), dBridge, 2.0 * s);
    return opSmoothUnion(dCard, dBtns, 2.0 * s);
  }

  float evalLensSDF(vec2 p, vec2 b, float r) {
    if (u_isAudioDeck > 0.5) {
      return sdAudioDeck(p, b, r);
    }
    return sdRoundRect(p, b, r);
  }

  // Domain-Warped Silky Fluid Caustic Field (Deep S-curls, soft rounded crests, zero straight sticks or grid tears)
  float getCausticWave(vec2 p, float t, float frostAmt, float dispOffset) {
    p *= 0.95;

    // 1. Primary S-curve vortex warp (tight enough to curve visibly inside edge auras)
    float w1 = sin(p.x * 1.85 + p.y * 0.55 + t * 0.62) * 0.62 +
               cos(p.y * 1.95 - p.x * 0.65 - t * 0.48) * 0.58;
    vec2 pWarp = p + vec2(
      cos(w1 * 2.25 + p.y * 1.15 + t * 0.45),
      sin(w1 * 2.25 - p.x * 1.15 - t * 0.35)
    ) * 0.56;

    // 2. Secondary swirl modulation so waves bend into flowing S-ribbons instead of straight sticks or square grids
    float swirl = sin(pWarp.y * 1.75 - pWarp.x * 1.25 + t * 0.52) * 0.75;
    float w2 = sin(pWarp.x * 2.05 + pWarp.y * 1.35 - t * 0.58 + swirl) * 0.58 +
               cos(pWarp.y * 2.30 - pWarp.x * 0.95 + t * 0.50 - swirl * 0.6) * 0.42;

    float w2_disp = w2 + dispOffset;
    // Intrinsic optical softness (0.022) eliminates hard laser "sticks" and prevents razor tears on refracted text
    float wAbs = sqrt(w2_disp * w2_disp + 0.022 + frostAmt * frostAmt * 0.045);
    float width = 0.11 + frostAmt * 0.16;
    float ridge = width / (pow(wAbs, 1.50) + width);
    float halo = exp(-wAbs * 1.65) * 0.50;
    return ridge * 0.68 + halo;
  }

  // Interactively warps fluid coordinate field based on cursor presence and click splash
  vec2 warpFluid(vec2 p, vec2 pSurf, vec2 mouseNorm, float hoverAmt, vec2 clickNorm, float clickDt, float clickAmt) {
    // 1. Smooth fingertip displacement: zero displacement at exact touch point, smooth outward swell
    if (hoverAmt > 0.001) {
      vec2 dMouse = pSurf - mouseNorm;
      float rMouse = length(dMouse);
      float radius = 0.90;
      float mouseInf = smoothstep(radius, 0.0, rMouse);
      
      vec2 push = dMouse * (mouseInf * 0.70);
      vec2 swirl = vec2(-dMouse.y, dMouse.x) * (mouseInf * 0.45);
      
      p += (push + swirl) * hoverAmt;
    }
    
    // 2. Click impulse: physical liquid undulation / splash wave expanding from tap point
    if (clickAmt > 0.001 && clickDt >= 0.0 && clickDt < 0.90) {
      vec2 dClick = pSurf - clickNorm;
      float rClick = length(dClick);
      float waveSpeed = 2.8;
      float waveFront = clickDt * waveSpeed;
      float waveWidth = 0.35 + clickDt * 0.30;
      float ring = smoothstep(waveWidth, 0.0, abs(rClick - waveFront));
      float decay = (1.0 - clickDt / 0.90) * exp(-clickDt * 2.2);
      
      vec2 waveDir = rClick > 1e-4 ? dClick / rClick : vec2(0.0);
      float splashDisplacement = ring * sin((rClick - waveFront) * 7.5) * decay * (clickAmt * 0.50);
      p += waveDir * splashDisplacement;
    }
    
    return p;
  }

  float getFluidExcitation(vec2 pSurf, vec2 mouseNorm, float hoverAmt, float hoverBright, vec2 clickNorm, float clickDt, float clickAmt) {
    float glow = 0.0;
    float brightScale = hoverBright * 0.01;
    
    // Faint bioluminescent / caustic awakening directly under the finger
    if (hoverAmt > 0.001) {
      float rMouse = length(pSurf - mouseNorm);
      float mouseInf = smoothstep(0.85, 0.0, rMouse);
      glow += mouseInf * hoverAmt * (brightScale * 0.45);
    }
    
    // Fluid splash glow expanding with the liquid wave
    if (clickAmt > 0.001 && clickDt >= 0.0 && clickDt < 0.90) {
      float rClick = length(pSurf - clickNorm);
      float waveFront = clickDt * 2.8;
      float waveWidth = 0.35 + clickDt * 0.30;
      float ring = smoothstep(waveWidth, 0.0, abs(rClick - waveFront));
      float decay = (1.0 - clickDt / 0.90) * exp(-clickDt * 2.2);
      glow += ring * decay * clickAmt * (brightScale * 0.70);
    }
    
    return glow;
  }

  vec4 sampleBackdropRGBA(vec2 uv) {
    if (u_srcComposite < -0.5) {
      return vec4(0.0);
    }
    vec2 uvSafe = 1.0 - abs(1.0 - abs(uv));
    if (u_srcComposite > 1.5) {
      vec4 s = texture(u_src, vec2(uvSafe.x, 1.0 - uvSafe.y));
      return vec4(s.rgb * s.a, s.a);
    }
    if (u_srcComposite > 0.5) {
      vec4 s = texture(u_src, uvSafe);
      return vec4(s.rgb + u_bgColor * (1.0 - s.a), 1.0);
    }
    vec2 uvTex = vec2(uvSafe.x, 1.0 - uvSafe.y);
    return vec4(mix(u_bgColor, vec3(1.0), texture(u_src, uvTex).a), 1.0);
  }

  vec4 sampleFrostedRGBA(vec2 uv, float frostAmt) {
    if (u_srcComposite < -0.5) {
      return vec4(0.0);
    }
    vec4 centerCol = sampleBackdropRGBA(uv);
    if (frostAmt <= 0.01) return centerCol;

    // Real GPU Frosted Glass Diffusion (Golden-Angle Fermat Spiral Blur)
    vec2 texel = 1.0 / u_resolution;
    float radius = frostAmt * 40.0;
    
    vec4 accumCol = centerCol * 0.20;
    float totalW = 0.20;

    for (int i = 1; i <= 10; i++) {
      float fi = float(i);
      float r = sqrt(fi / 10.0) * radius;
      float theta = fi * 2.3999632;
      vec2 offset = vec2(cos(theta), sin(theta)) * r * texel;
      
      float w = exp(-0.5 * (r * r) / max(radius * radius * 0.4, 1.0));
      accumCol += sampleBackdropRGBA(uv + offset) * w;
      totalW += w;
    }

    return accumCol / totalW;
  }

  vec4 renderSingleGlassLens(vec2 screenPx, vec4 rect, float radius, bool isThumb, out float outBaseAlpha) {
    outBaseAlpha = 1.0;
    vec2 center = rect.xy + rect.zw * 0.5;
    vec2 localPx = screenPx - center;
    vec2 halfSize = rect.zw * 0.5;

    // Interactive 3D Perspective Raycast projection for tilted surfaces
    if (!isThumb && u_tilt.w > 0.5) {
      float d = u_tilt.w;
      float rx = u_tilt.x;
      float ry = u_tilt.y;
      float sc = max(u_tilt.z, 0.001);

      float cosX = cos(rx), sinX = sin(rx);
      float cosY = cos(ry), sinY = sin(ry);

      // Plane normal in CSS 3D camera coordinates (Rotate around Y then around X)
      vec3 N = vec3(sinY, -cosY * sinX, cosY * cosX);

      // WebGL localPx has Y up, CSS 3D camera has Y down
      vec3 V = vec3(localPx.x, -localPx.y, -d);
      float denom = dot(V, N);
      if (abs(denom) > 1e-5) {
        float tHit = (-d * N.z) / denom;
        vec3 P = vec3(tHit * V.x, tHit * V.y, d * (1.0 - tHit));

        // Inverse RotateX (by -rx)
        vec3 P1 = vec3(P.x, P.y * cosX + P.z * sinX, -P.y * sinX + P.z * cosX);
        // Inverse RotateY (by -ry)
        vec3 P0 = vec3(P1.x * cosY - P1.z * sinY, P1.y, P1.x * sinY + P1.z * cosY);

        // Scale and convert back to WebGL localPx (Y up)
        localPx = vec2(P0.x, -P0.y) / sc;
      }
    }

    float coverage = 0.0;
    vec2 norm = vec2(0.0);
    float distIn = 0.0;

    if (u_isText > 0.5) {
      vec2 textUV = (screenPx - rect.xy) / rect.zw;
      if (textUV.x < 0.0 || textUV.x > 1.0 || textUV.y < 0.0 || textUV.y > 1.0) {
        return vec4(0.0);
      }
      vec2 maskUV = vec2(textUV.x, 1.0 - textUV.y);
      vec4 tData = texture(u_textMask, maskUV);
      coverage = tData.a;
      if (coverage <= 0.005) return vec4(0.0);

      distIn = tData.r * 32.0;

      // 32-bit floating point continuous normal from GPU hardware bilinear central difference
      vec2 texel = 1.0 / rect.zw;
      vec2 step = texel * 1.5;
      float d_r  = texture(u_textMask, maskUV + vec2(step.x, 0.0)).r;
      float d_l  = texture(u_textMask, maskUV - vec2(step.x, 0.0)).r;
      float d_t  = texture(u_textMask, maskUV + vec2(0.0, step.y)).r;
      float d_b  = texture(u_textMask, maskUV - vec2(0.0, step.y)).r;
      float d_tr = texture(u_textMask, maskUV + vec2(step.x, step.y)).r;
      float d_tl = texture(u_textMask, maskUV + vec2(-step.x, step.y)).r;
      float d_br = texture(u_textMask, maskUV + vec2(step.x, -step.y)).r;
      float d_bl = texture(u_textMask, maskUV + vec2(-step.x, -step.y)).r;

      float dx = -( (d_tr + 2.0 * d_r + d_br) - (d_tl + 2.0 * d_l + d_bl) );
      float dy = -( (d_tr + 2.0 * d_t + d_tl) - (d_br + 2.0 * d_b + d_bl) );

      norm = vec2(dx, dy);
      float nLen = length(norm);
      if (nLen > 1e-4) norm /= nLen;
      else norm = vec2(0.0);

      // Smooth 3D dome profile: 2D normal tilt smoothly decays to 0 at the top of the bevel/apex,
      // completely eliminating medial axis crease lines, harsh step cliffs, and rectangular offset cutouts!
      float bVal = max(u_bevelWidth, 0.5);
      float strokeRad = max(bVal * 1.2, 4.0);
      float domeTilt = cos(clamp(distIn / strokeRad, 0.0, 1.0) * 1.5707963);
      norm *= domeTilt;
    } else if (isThumb) {
      float sdf = length(localPx) - radius;
      coverage = 1.0 - smoothstep(-0.75, 0.75, sdf);
      if (coverage <= 0.0) return vec4(0.0);
      float rLen = length(localPx);
      norm = rLen > 1e-4 ? localPx / rLen : vec2(0.0, 1.0);
      distIn = -sdf;
    } else {
      float effRad = min(radius, min(halfSize.x, halfSize.y));
      float sdf = evalLensSDF(localPx, halfSize, effRad);
      coverage = 1.0 - smoothstep(-0.75, 0.75, sdf);
      if (coverage <= 0.0) return vec4(0.0);

      // Analytical Normal from smooth SDF for outer border & bevel
      float eps = 1.0;
      float dx = evalLensSDF(localPx + vec2(eps, 0.0), halfSize, effRad) -
                 evalLensSDF(localPx - vec2(eps, 0.0), halfSize, effRad);
      float dy = evalLensSDF(localPx + vec2(0.0, eps), halfSize, effRad) -
                 evalLensSDF(localPx - vec2(0.0, eps), halfSize, effRad);
      float gLen = length(vec2(dx, dy));
      norm = gLen > 1e-4 ? vec2(dx, dy) / gLen : vec2(0.0);

      distIn = -sdf;
    }

    bool isFullBleed = (!isThumb && u_isText < 0.5 && radius <= 0.01 && u_bevelWidth <= 0.01);
    if (isFullBleed) {
      coverage = 1.0;
    }

    // 1. Edge Bevel Refraction strictly on perimeter (distIn < bWidthVal)
    float bWidthVal = max(u_bevelWidth, 0.5);
    float bevelSlope = 0.0;
    if (u_bevelWidth > 0.01 && distIn < bWidthVal) {
      float t = distIn / bWidthVal;
      bevelSlope = (1.0 - t) / max(sqrt(max(1.0 - (1.0 - t) * (1.0 - t), 0.001)), 0.15) * clamp(u_bevelWidth, 0.0, 1.0);
    }
    float edgeTaper = isFullBleed ? 1.0 : smoothstep(0.0, 1.8, distIn);
    float thicknessScale = 0.35 + (u_thickness * 0.01) * 1.3;
    float bevelRefr = (u_refraction * 0.001) * thicknessScale;
    vec2 dispBevel = norm * (bevelSlope * 0.85 * bevelRefr);
    if (u_isText > 0.5) {
      float bRad = max(u_bevelWidth * 1.2, 4.0);
      float t = clamp(distIn / bRad, 0.0, 1.0);
      bevelSlope = (1.0 - t) / max(sqrt(max(1.0 - (1.0 - t) * (1.0 - t), 0.001)), 0.2) * clamp(u_bevelWidth * 0.4 + 0.6, 0.0, 1.5);
      dispBevel = norm * (bevelSlope * 0.85 * bevelRefr);
    } else if (u_isAudioDeck > 0.5) {
      // Subtle molded-glass refraction along the outer Boolean union arc of the transport buttons
      float s = halfSize.x / 240.0;
      vec2 pPlay = localPx - vec2(0.0, -halfSize.y);
      vec2 pPrev = localPx - vec2(-64.0 * s, -halfSize.y);
      vec2 pNext = localPx - vec2(64.0 * s, -halfSize.y);
      float dPlay = length(pPlay) - 40.0 * s;
      float dPrev = length(pPrev) - 28.0 * s;
      float dNext = length(pNext) - 28.0 * s;
      float dSec = min(dPrev, dNext);
      vec2 nPlay = length(pPlay) > 1e-4 ? pPlay / length(pPlay) : vec2(0.0, 1.0);
      vec2 nSec = dPrev < dNext
        ? (length(pPrev) > 1e-4 ? pPrev / length(pPrev) : vec2(0.0, 1.0))
        : (length(pNext) > 1e-4 ? pNext / length(pNext) : vec2(0.0, 1.0));
      float innerTransition = smoothstep(1.5 * s, bWidthVal, distIn);
      float playMask = smoothstep(1.0 * s, 5.0 * s, distIn + dPlay) * smoothstep(0.0, 4.0 * s, dSec) * innerTransition;
      float secMask = smoothstep(1.0 * s, 5.0 * s, distIn + dSec) * smoothstep(0.0, 4.0 * s, dPlay) * innerTransition;
      float playEdge = smoothstep(-1.0 * s, 1.0 * s, -dPlay) * exp(-max(-dPlay, 0.0) / (3.2 * s)) * playMask;
      float secEdge = smoothstep(-1.0 * s, 1.0 * s, -dSec) * exp(-max(-dSec, 0.0) / (2.8 * s)) * secMask;
      dispBevel += (nPlay * playEdge * 0.45 + nSec * secEdge * 0.35) * bevelRefr;
    } else if (u_switchThumb.z > 0.5 && u_switchThumb.w > 0.5) {
      vec2 pThumb = localPx - u_switchThumb.xy;
      vec2 halfThumb = u_switchThumb.zw;
      float capRad = min(halfThumb.x, halfThumb.y);
      float segHalf = max(halfThumb.x - capRad, 0.0);
      vec2 qExact = vec2(pThumb.x - clamp(pThumb.x, -segHalf, segHalf), pThumb.y);
      float dThumb = length(qExact) - capRad;
      if (dThumb < 2.0) {
        vec2 pNorm = qExact / max(capRad, 1.0);
        float r2 = clamp(dot(pNorm, pNorm), 0.0, 1.0);
        float thumbTaper = smoothstep(-0.75, 0.75, -dThumb);
        float thumbBevel = pow(r2, mix(2.0, 0.8, clamp(u_bevelWidth / 15.0, 0.0, 1.0)));
        dispBevel += pNorm * (thumbBevel * 0.65 * bevelRefr * thumbTaper);
      }
    }
    float contourFactor = (1.0 - smoothstep(0.0, bWidthVal * 1.25, distIn)) * clamp(u_bevelWidth, 0.0, 1.0);

    // 2. Liquid Surface & Dome Refraction across element body (100% continuous, zero creases, zero ovals)
    float btnHeight = max(halfSize.y * 2.0, 1.0);
    float frostVal = u_frost * 0.01;
    float fluidT = u_time * (u_fluidSpeed * 0.01);
    float fluidSc = 0.40 + u_fluidScale * 0.04;

    vec2 localMouse = isThumb ? (u_mousePos - u_switchThumb.xy) : u_mousePos;
    vec2 localClick = isThumb ? (u_clickPos - u_switchThumb.xy) : u_clickPos;
    vec2 pPhys = (localPx / btnHeight) * 1.15;
    vec2 mouseNorm = (localMouse / btnHeight) * 1.15;
    vec2 clickNorm = (localClick / btnHeight) * 1.15;
    float fluidPull = u_hoverStrength * (u_lightTrack * 0.01);
    float hoverGlow = u_hoverStrength;
    float clickAmt = u_clickWave * 0.01;
    float clickDt = u_time - u_clickTime;

    // Physical surface coordinate on the button (unrefracted by glass)
    vec2 pSurf = (localPx / btnHeight) * fluidSc;
    vec2 pSurf_warped = warpFluid(pSurf, pPhys, mouseNorm, fluidPull, clickNorm, clickDt, clickAmt);

    // Dynamic 2D isotropic fluid gradient refraction: wave crests naturally refract light in 2D
    float epsF = 0.04;
    float gradFrost = max(frostVal, 0.28);
    float fDx = getCausticWave(pSurf_warped + vec2(epsF, 0.0), fluidT, gradFrost, 0.0) -
                getCausticWave(pSurf_warped - vec2(epsF, 0.0), fluidT, gradFrost, 0.0);
    float fDy = getCausticWave(pSurf_warped + vec2(0.0, epsF), fluidT, gradFrost, 0.0) -
                getCausticWave(pSurf_warped - vec2(0.0, epsF), fluidT, gradFrost, 0.0);
    vec2 fluidGrad = vec2(fDx, fDy) / (2.0 * epsF);
    fluidGrad /= (1.0 + length(fluidGrad) * 0.22);

    // Smooth exponential rim aura decay: tight, seamless falloff hugging the bevel chamfer
    // Tightly confined to the bevel edge, with delicate exponential fade onto the immediate perimeter (2-4px)
    float rimDist = max(distIn - bWidthVal, 0.0);
    float auraWidth = max(u_fluidAuraWidth, 1.0);
    float auraDecay = exp(-rimDist / max(auraWidth * 0.65, 0.75)) * (1.0 - smoothstep(0.0, auraWidth * 2.0, rimDist));
    float fluidPresence = max(contourFactor, auraDecay);

    // Liquid refraction ripples are focused strictly where fluid is present (bevel + aura)
    // The central core remains 100% pure optical dome magnification without soapy fluid turbulence!
    float centerFluidFactor = clamp(u_fluidCenter * 0.01, 0.0, 1.0);
    float refrFluidWeight = mix(centerFluidFactor, 1.0, fluidPresence);

    float fluidBend = (u_refraction * 0.0004) * (0.35 + (u_thickness * 0.01) * 0.95);
    vec2 dispFluid = fluidGrad * (fluidBend * refrFluidWeight);

    // Gentle isotropic convex glass magnification (smooth C-infinity dome profile)
    vec2 dispDome = vec2(0.0);
    float domeBend = (u_thickness * 0.00015) * (u_refraction * 0.01);
    if (u_isText > 0.5) {
      dispDome = -norm * (domeBend * 3.5);
    } else {
      vec2 pIso = localPx / (halfSize.y * 1.5);
      float domeProfile = 1.0 / (1.0 + dot(pIso, pIso) * 0.35);
      dispDome = -pIso * (domeProfile * domeBend);
    }

    // Total displacement: strictly tapered to zero at boundary
    vec2 disp = (dispBevel + dispFluid + dispDome) * edgeTaper;

    // Prismatic dispersion spread factor on the bevel chamfer and perimeter
    float dispSpread = (u_dispersion * 0.01) * (contourFactor * 0.85 + 0.15);

    // 3. Chromatic Background Refraction (smooth spectral split without negative delta)
    vec4 bgSample = sampleFrostedRGBA(v_uv - disp, frostVal);
    vec3 bgSpectral = bgSample.rgb;
    float bgAlpha = bgSample.a;

    if (dispSpread > 0.0005 && bgAlpha > 0.001) {
      vec2 dR = disp * (1.0 - dispSpread * 0.85);
      vec2 dY = disp * (1.0 - dispSpread * 0.40);
      vec2 dC = disp * (1.0 + dispSpread * 0.40);
      vec2 dB = disp * (1.0 + dispSpread * 0.85);

      vec4 sR_bg = sampleFrostedRGBA(v_uv - dR, frostVal);
      vec4 sY_bg = sampleFrostedRGBA(v_uv - dY, frostVal);
      vec4 sC_bg = sampleFrostedRGBA(v_uv - dC, frostVal);
      vec4 sB_bg = sampleFrostedRGBA(v_uv - dB, frostVal);

      float rEdge = sR_bg.r * 0.60 + sY_bg.r * 0.40;
      float gEdge = sY_bg.g * 0.35 + bgSample.g * 0.30 + sC_bg.g * 0.35;
      float bEdge = sC_bg.b * 0.40 + sB_bg.b * 0.60;
      bgSpectral = vec3(rEdge, gEdge, bEdge);
      bgAlpha = (sR_bg.a + sY_bg.a + bgSample.a + sC_bg.a + sB_bg.a) * 0.20;
    }

    vec2 hitPxG = (v_uv - (dispBevel + dispDome + dispFluid * 0.25) * edgeTaper) * u_resolution;

    // Interactive fluid coordinate for the element body
    vec2 pG_raw = (hitPxG - center) / btnHeight * fluidSc;
    vec2 pG_warped = warpFluid(pG_raw, pPhys, mouseNorm, fluidPull, clickNorm, clickDt, clickAmt);
    
    // Pure fluid caustic field
    float fG_body = getCausticWave(pG_warped, fluidT, frostVal, 0.0);

    // Dynamic polar border beam orbiting the perimeter (for buttons and prompt box)
    float beamSpeed = u_fluidSpeed * 0.015;
    float aspect = halfSize.x / max(halfSize.y, 1.0);
    float theta = atan(localPx.y * aspect, localPx.x);
    float beamPhase = theta - u_time * beamSpeed;

    // Smooth traveling wave along the rim
    // Dynamic comet crest that sweeps along the border beam
    float cosB = cos(beamPhase);
    float beamHead = pow(clamp(cosB * 0.5 + 0.5, 0.0, 1.0), 3.5);
    float beamGlow = pow(clamp(cosB * 0.5 + 0.5, 0.0, 1.0), 1.8) * 0.35;
    float beamProfile = beamHead * 1.5 + beamGlow;
    float flowAmt = clamp(u_auroraFlow * 0.01, 0.0, 1.0);
    float flowMod = mix(1.0, beamProfile * 1.4 + 0.08, flowAmt);

    // Dynamic rainbow polar aurora chromatic phase (border beam style)
    // Seamless 2pi-periodic spectrum without branch-cut seams across the negative X axis
    vec3 polarRainbow = mix(vec3(0.161, 0.161, 0.992), vec3(0.737, 0.843, 0.969), 0.5 + 0.5 * cos(beamPhase));
    vec3 auroraColor = polarRainbow;

    if (u_isText > 0.5) {
      // Smooth continuous spectral gradient across the word with slow organic breathing drift
      float xSpan = (localPx.x / max(halfSize.x, 1.0)) * 0.5 + 0.5;
      float slowDrift = u_time * (u_fluidSpeed * 0.0035);
      float textPhase = xSpan * 3.14159265 * 1.35 + slowDrift;
      auroraColor = mix(vec3(0.161, 0.161, 0.992), vec3(0.737, 0.843, 0.969), 0.5 + 0.5 * cos(textPhase));

      // Organic liquid caustic shimmer: gentle luminous wave breathing through the living fluid
      float waveShimmer = 0.82 + 0.28 * cos(xSpan * 4.71239 - u_time * (u_fluidSpeed * 0.008));
      flowMod = mix(1.0, waveShimmer * 1.25, flowAmt);
    }

    // Edge fluid mask (confined to bevel & tight edge aura; Center Clarity drives pure colorless refraction on panels)
    float edgeFluidMask = fluidPresence * flowMod;
    float fluidMask = u_isText > 0.5 ? mix(centerFluidFactor, 1.0, edgeFluidMask) : edgeFluidMask;

    float dispFactor = clamp(u_dispersion * 0.01, 0.0, 1.0);
    vec3 causticTint = mix(vec3(1.0), auroraColor, dispFactor);

    // Fluid illumination on the glass rim
    float fluidGlow = getFluidExcitation(pPhys, mouseNorm, hoverGlow, u_hoverBright, clickNorm, clickDt, clickAmt);
    if (u_isText > 0.5 && hoverGlow > 0.001) {
      // For typography: bathe the entire word in luminous caustic glow, with gentle focus on the cursor
      float xDist = abs(pPhys.x - mouseNorm.x);
      float textHoverFalloff = exp(-xDist * 0.5);
      float wordAmbientHover = hoverGlow * (u_hoverBright * 0.01) * 0.45;
      fluidGlow = max(fluidGlow, wordAmbientHover * (0.60 + 0.40 * textHoverFalloff));
    }
    float fluidEdgeFade = isFullBleed ? 1.0 : smoothstep(0.0, 1.8, distIn);
    float causticBrightScale = (u_fluidBright * 0.01) + fluidGlow;
    float totalFluidFactor = causticBrightScale * fluidEdgeFade * fluidMask;

    // Caustic highlight: monochromatic wave modulated by iridescent aurora tint
    vec3 causticEmission = causticTint * (fG_body * totalFluidFactor * edgeTaper);
    if (dispSpread > 0.0005) {
      vec3 prismAccent = mix(vec3(0.161, 0.161, 0.992), vec3(0.737, 0.843, 0.969), 0.5 + 0.5 * cos(beamPhase * 2.0));
      causticEmission += (prismAccent - 0.45) * (fG_body * totalFluidFactor * edgeTaper * clamp(u_dispersion * 0.012, 0.0, 1.0) * (1.0 + contourFactor * 1.5));
    }

    // Smoked Glass Absorption Tint (obsidian glass)
    float absorptionScale = 0.5 + (u_thickness * 0.01) * 0.8;
    float darkFactor = clamp((u_darkness * 0.01) * absorptionScale, 0.0, 0.95);
    float bevelThickness = 1.0 - bevelSlope * 0.35;
    float darkAtten = darkFactor * bevelThickness * 0.85;
    vec3 obsidianTint = u_bgColor * 0.45;

    // Clean, crisp achromatic specular gleam strictly on the contour facing light
    vec2 lightDir2D = vec2(cos(u_lightAngle), sin(u_lightAngle));
    float lightAlign = dot(norm, lightDir2D);

    float textFade = u_isText > 0.5 ? smoothstep(0.08, 0.85, coverage) : 1.0;
    float bevelPeak = smoothstep(0.0, 1.0, distIn) * (1.0 - smoothstep(1.0, bWidthVal + 1.2, distIn)) * textFade;
    float mainGleam = pow(clamp(lightAlign, 0.0, 1.0), 16.0) * bevelPeak * (u_sheen * 0.01) * 1.5;
    float backGleam = pow(clamp(-lightAlign, 0.0, 1.0), 8.0) * bevelPeak * (u_rim * 0.01) * 0.7;
    float edgeRim = pow(clamp(1.0 - distIn / 2.5, 0.0, 1.0), 2.0) * edgeTaper * (0.35 + 0.5 * clamp(lightAlign * 0.5 + 0.5, 0.0, 1.0)) * (u_rim * 0.01) * 0.85 * textFade;

    if (u_isText > 0.5) {
      // Single continuous physical glass bevel highlight:
      // Organic exponential profile hugging the outer perimeter with zero double-contours or square cutouts
      float gleamWidth = max(u_bevelWidth * 1.4, 2.4);
      float gleamFalloff = exp(-distIn / gleamWidth) * edgeTaper * textFade;
      mainGleam = pow(clamp(lightAlign, 0.0, 1.0), 14.0) * gleamFalloff * (u_sheen * 0.01) * 1.8;
      backGleam = pow(clamp(-lightAlign, 0.0, 1.0), 7.0) * gleamFalloff * (u_rim * 0.01) * 0.75;
      edgeRim = pow(clamp(1.0 - distIn / max(u_bevelWidth * 1.6, 2.8), 0.0, 1.0), 1.6) * edgeTaper *
                (0.35 + 0.55 * clamp(lightAlign * 0.5 + 0.5, 0.0, 1.0)) * (u_rim * 0.01) * 0.85 * textFade;
    }

    // Prismatic chromatic sheen on the bevel gleam
    float prismAngle = dot(vec2(-norm.y, norm.x), lightDir2D);
    vec3 gleamColor = vec3(1.0);
    if (u_dispersion > 1.0) {
      float gleamDisp = (u_dispersion * 0.01) * 0.55;
      gleamColor = vec3(
        1.0 - abs(prismAngle) * gleamDisp * 0.45,
        1.0 - abs(prismAngle) * gleamDisp * 0.18,
        1.0
      );
    }

    vec3 lensCol = vec3(0.0);
    if (u_srcComposite < -0.5 || u_srcComposite > 1.5) {
      float domTransparency = 1.0 - bgAlpha;
      float absorbAlpha = darkAtten * 0.75;
      outBaseAlpha = clamp(bgAlpha + absorbAlpha * domTransparency, 0.0, 1.0);

      vec3 baseCol = bgSpectral * (1.0 - absorbAlpha) + (u_bgColor * 0.35) * (absorbAlpha * domTransparency);
      vec3 opticalEmit = causticEmission * (1.0 - darkAtten * 0.65);

      if (u_isText > 0.5) {
        float bRad = max(u_bevelWidth * 1.2, 4.0);
        float strokeDome = cos(clamp(distIn / bRad, 0.0, 1.0) * 1.5707963);
        float glyphFresnel = (0.045 + 0.095 * strokeDome) * (0.45 + (u_refraction * 0.01) * 0.55) * (0.45 + frostVal * 0.55) * (1.0 - darkAtten * 0.7) * textFade;
        opticalEmit += mix(vec3(1.0), auroraColor, dispFactor * 0.40) * (glyphFresnel * domTransparency);
      } else if (!isFullBleed) {
        float bevelFresnel = contourFactor * (0.04 + (u_refraction * 0.01) * 0.06) * (0.5 + (u_thickness * 0.01) * 0.5) * edgeTaper;
        float frostVeil = (frostVal * 0.03 + (u_sheen * 0.01) * 0.012) * (1.0 - darkAtten * 0.7) * edgeTaper;
        opticalEmit += (vec3(bevelFresnel) * gleamColor + vec3(frostVeil)) * domTransparency;
      }

      lensCol = baseCol + opticalEmit + (mainGleam + backGleam) * gleamColor + vec3(edgeRim);
    } else {
      outBaseAlpha = 1.0;
      vec3 baseSample = bgSpectral + causticEmission;
      lensCol = mix(baseSample, obsidianTint, darkAtten);
      lensCol += (mainGleam + backGleam) * gleamColor + vec3(edgeRim);
    }

    if (u_isAudioDeck > 0.5) {
      // Convex molded-glass dome relief along the mutual Boolean union boundary of the transport buttons
      float s = halfSize.x / 240.0;
      vec2 pPlay = localPx - vec2(0.0, -halfSize.y);
      vec2 pPrev = localPx - vec2(-64.0 * s, -halfSize.y);
      vec2 pNext = localPx - vec2(64.0 * s, -halfSize.y);
      float rPlay = length(pPlay);
      float rPrev = length(pPrev);
      float rNext = length(pNext);
      float dPlay = rPlay - 40.0 * s;
      float dPrev = rPrev - 28.0 * s;
      float dNext = rNext - 28.0 * s;
      float dSec = min(dPrev, dNext);

      vec2 nPlay = rPlay > 1e-4 ? pPlay / rPlay : vec2(0.0, 1.0);
      vec2 nSec = dPrev < dNext
        ? (rPrev > 1e-4 ? pPrev / rPrev : vec2(0.0, 1.0))
        : (rNext > 1e-4 ? pNext / rNext : vec2(0.0, 1.0));

      float innerTransition = smoothstep(1.5 * s, bWidthVal, distIn);
      float playMask = smoothstep(1.0 * s, 5.0 * s, distIn + dPlay) * smoothstep(0.0, 4.0 * s, dSec) * innerTransition;
      float secMask = smoothstep(1.0 * s, 5.0 * s, distIn + dSec) * smoothstep(0.0, 4.0 * s, dPlay) * innerTransition;
      float distPlay = -dPlay;
      float distSec = -dSec;
      float playTaper = smoothstep(-0.8 * s, 0.8 * s, distPlay) * clamp(rPlay / (40.0 * s), 0.0, 1.0);
      float secTaper = smoothstep(-0.8 * s, 0.8 * s, distSec) * clamp(min(rPrev, rNext) / (28.0 * s), 0.0, 1.0);

      float playSheenProf = playTaper * (1.0 - smoothstep(1.0 * s, bWidthVal + 1.2 * s, max(distPlay, 0.0))) * playMask;
      float secSheenProf = secTaper * (1.0 - smoothstep(1.0 * s, bWidthVal * 0.85 + 1.2 * s, max(distSec, 0.0))) * secMask;
      float playRimProf = playTaper * pow(clamp(1.0 - max(distPlay, 0.0) / (2.5 * s), 0.0, 1.0), 2.0) * playMask;
      float secRimProf = secTaper * pow(clamp(1.0 - max(distSec, 0.0) / (2.2 * s), 0.0, 1.0), 2.0) * secMask;

      float alignPlay = dot(nPlay, lightDir2D);
      float alignSec = dot(nSec, lightDir2D);

      float playGleam = (pow(clamp(alignPlay, 0.0, 1.0), 8.0) * (u_sheen * 0.01) * 0.85 +
                         pow(clamp(-alignPlay, 0.0, 1.0), 6.0) * (u_rim * 0.01) * 0.35) * playSheenProf;
      float secGleam = (pow(clamp(alignSec, 0.0, 1.0), 8.0) * (u_sheen * 0.01) * 0.72 +
                        pow(clamp(-alignSec, 0.0, 1.0), 6.0) * (u_rim * 0.01) * 0.28) * secSheenProf;

      float playEdgeRim = playRimProf * (0.25 + 0.55 * clamp(alignPlay * 0.5 + 0.5, 0.0, 1.0)) * (u_rim * 0.01) * 0.48;
      float secEdgeRim = secRimProf * (0.22 + 0.50 * clamp(alignSec * 0.5 + 0.5, 0.0, 1.0)) * (u_rim * 0.01) * 0.40;

      vec2 nDome = dPlay < dSec ? nPlay : nSec;
      float domePrism = dot(vec2(-nDome.y, nDome.x), lightDir2D);
      vec3 domeGleamColor = vec3(1.0);
      if (u_dispersion > 1.0) {
        float gDisp = (u_dispersion * 0.01) * 0.55;
        domeGleamColor = vec3(
          1.0 + domePrism * gDisp * 0.65,
          1.0 - abs(domePrism) * gDisp * 0.35,
          1.0 - domePrism * gDisp * 0.65
        );
      }

      lensCol += (playGleam + secGleam) * domeGleamColor + vec3(playEdgeRim + secEdgeRim);
    }

    return vec4(lensCol, coverage);
  }

  vec4 renderGlassLens(vec2 screenPx, vec4 rect, float radius) {
    float baseAlpha = 1.0;
    vec4 lens = renderSingleGlassLens(screenPx, rect, radius, false, baseAlpha);
    if (u_switchThumb.z > 0.5 && u_switchThumb.w > 0.5 && lens.a > 0.0) {
      vec2 trackCenter = rect.xy + rect.zw * 0.5;
      vec2 thumbCenter = trackCenter + u_switchThumb.xy;
      vec2 halfThumb = u_switchThumb.zw;
      float capRad = min(halfThumb.x, halfThumb.y);
      float segHalf = max(halfThumb.x - capRad, 0.0);
      vec2 pThumb = screenPx - thumbCenter;
      vec2 qExact = vec2(pThumb.x - clamp(pThumb.x, -segHalf, segHalf), pThumb.y);
      float dThumb = length(qExact) - capRad;
      if (dThumb <= 2.0) {
        float distThumb = -dThumb;
        float thumbTaper = smoothstep(-0.75, 0.75, distThumb);

        // Normalized radial coordinates from capsule medial axis: r in [0, 1], r2 = r^2 in [0, 1]
        vec2 pNorm = qExact / max(capRad, 1.0);
        float r2 = clamp(dot(pNorm, pNorm), 0.0, 1.0);
        vec2 nThumb = length(qExact) > 1e-4 ? qExact / length(qExact) : vec2(0.0, 1.0);

        float frostVal = u_frost * 0.01;
        float sheenAmt = u_sheen * 0.01;
        float rimAmt = u_rim * 0.01;

        // Smooth C-infinity bevel cushion: flatter central plateau, gentler bevel closer to the perimeter
        float domeExp = mix(1.85, 0.85, clamp(u_bevelWidth / 15.0, 0.0, 1.0));
        float smoothDome = pow(r2, domeExp);
        float softEdge = pow(r2, 4.8);

        vec2 lightDir2D = vec2(cos(u_lightAngle), sin(u_lightAngle));
        float alignSmooth = dot(pNorm, lightDir2D);
        float alignEdge = dot(nThumb, lightDir2D);

        // Delicate 3D bevel lighting (less bulging/puffy, more refined flat-topped glass lens)
        float darkFade = 1.0 - clamp(u_darkness * 0.01, 0.0, 0.9);
        float primaryGlow = pow(clamp(alignSmooth * 0.5 + 0.5, 0.0, 1.0), 2.2) * sheenAmt * 0.28;
        float counterGlow = pow(clamp(-alignSmooth * 0.5 + 0.5, 0.0, 1.0), 2.4) * rimAmt * 0.20;
        float ambientDome = (sheenAmt * 0.09 + rimAmt * 0.09 + frostVal * 0.04) * darkFade;
        // Soft achromatic frosted glass base fill so the interior is evenly translucent
        float innerTranslucentFill = (0.05 + frostVal * 0.07 + sheenAmt * 0.04) * darkFade;
        float domeCushion = (primaryGlow + counterGlow + ambientDome) * smoothDome + innerTranslucentFill;

        // Delicate outer glass rim at r -> 1
        float dirRim = 0.45 + 0.55 * max(pow(clamp(alignEdge * 0.5 + 0.5, 0.0, 1.0), 2.2),
                                         pow(clamp(-alignEdge * 0.5 + 0.5, 0.0, 1.0), 2.2) * 0.85);
        float edgeHighlight = softEdge * dirRim * (rimAmt * 0.24 + sheenAmt * 0.12);

        // Subtle chromatic dispersion flare on the bevel (driven by Dispersion slider)
        float domePrism = dot(vec2(-pNorm.y, pNorm.x), lightDir2D);
        vec3 domeGleamColor = vec3(1.0);
        if (u_dispersion > 1.0) {
          float gDisp = (u_dispersion * 0.01) * 0.25;
          domeGleamColor = vec3(
            1.0 - abs(domePrism) * gDisp * 0.40,
            1.0 - abs(domePrism) * gDisp * 0.16,
            1.0
          );
        }

        // Purely additive optical glass dome over the transparent refracted capsule (zero opaque darkening!)
        lens.rgb += ((domeCushion + edgeHighlight) * domeGleamColor) * thumbTaper;
      }
    }
    if (u_srcComposite < -0.5 || u_srcComposite > 1.5) {
      float coverage = lens.a;
      vec3 clampedRGB = clamp(lens.rgb, 0.0, 1.0);
      float lightPeak = max(clampedRGB.r, max(clampedRGB.g, clampedRGB.b));
      float finalAlpha = clamp(baseAlpha + lightPeak * (1.0 - baseAlpha), 0.0, 1.0) * coverage;
      return vec4(clampedRGB * coverage, finalAlpha);
    }
    return vec4(lens.rgb * lens.a, lens.a);
  }

  void main() {
    if (u_useBackdrop > 0.5) {
      float a = texture(u_src, vec2(v_uv.x, 1.0 - v_uv.y)).a;
      fragColor = vec4(vec3(a), a);
      return;
    }
    vec2 screenPx = v_uv * u_resolution;
    fragColor = renderGlassLens(screenPx, u_rect, u_radius);
  }
`;
function se(m, t, e) {
  const i = m.createShader(t);
  return m.shaderSource(i, e), m.compileShader(i), m.getShaderParameter(i, m.COMPILE_STATUS) || console.error("TactileGlassEngine: Shader compile error", m.getShaderInfoLog(i)), i;
}
function ce(m) {
  const t = m.createProgram();
  return m.attachShader(t, se(m, m.VERTEX_SHADER, ye)), m.attachShader(t, se(m, m.FRAGMENT_SHADER, Me)), m.linkProgram(t), m.getProgramParameter(t, m.LINK_STATUS) || console.error("TactileGlassEngine: Program link error", m.getProgramInfoLog(t)), t;
}
function ne(m) {
  const t = m.trim();
  if (!t || t === "transparent") return null;
  if (t.startsWith("#")) {
    const i = t.slice(1);
    if (i.length === 3)
      return [
        parseInt(i[0] + i[0], 16) / 255,
        parseInt(i[1] + i[1], 16) / 255,
        parseInt(i[2] + i[2], 16) / 255
      ];
    if (i.length >= 6)
      return [
        parseInt(i.slice(0, 2), 16) / 255,
        parseInt(i.slice(2, 4), 16) / 255,
        parseInt(i.slice(4, 6), 16) / 255
      ];
  }
  const e = t.match(/rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/i);
  return e ? (e[4] !== void 0 ? parseFloat(e[4]) : 1) <= 0.01 ? null : [
    Math.min(255, Math.max(0, parseFloat(e[1]))) / 255,
    Math.min(255, Math.max(0, parseFloat(e[2]))) / 255,
    Math.min(255, Math.max(0, parseFloat(e[3]))) / 255
  ] : null;
}
function le(m) {
  if (typeof window < "u" && typeof document < "u") {
    let t = (m == null ? void 0 : m.parentElement) || document.body;
    for (; t; ) {
      const n = window.getComputedStyle(t).backgroundColor, r = ne(n);
      if (r) return r;
      t = t.parentElement;
    }
    const e = window.getComputedStyle(document.documentElement).getPropertyValue("--bg-canvas"), i = ne(e);
    if (i) return i;
  }
  return [0, 0, 0];
}
function oe(m, t, e, i, n) {
  let r = 0;
  e[0] = 0, i[0] = -1 / 0, i[1] = 1 / 0;
  for (let c = 1; c < n; c++) {
    let s = (m[c] + c * c - (m[e[r]] + e[r] * e[r])) / (2 * c - 2 * e[r]);
    for (; s <= i[r]; )
      r--, s = (m[c] + c * c - (m[e[r]] + e[r] * e[r])) / (2 * c - 2 * e[r]);
    r++, e[r] = c, i[r] = s, i[r + 1] = 1 / 0;
  }
  r = 0;
  for (let c = 0; c < n; c++) {
    for (; i[r + 1] < c; ) r++;
    t[c] = (c - e[r]) * (c - e[r]) + m[e[r]];
  }
}
function ke(m, t, e) {
  const n = new Float32Array(t * e), r = Math.max(t, e), c = new Float32Array(r), s = new Int32Array(r), u = new Float32Array(r + 1);
  for (let v = 0; v < t; v++) {
    for (let p = 0; p < e; p++)
      c[p] = m[p * t + v] ? 1e9 : 0;
    oe(c, c, s, u, e);
    for (let p = 0; p < e; p++) n[p * t + v] = c[p];
  }
  for (let v = 0; v < e; v++) {
    const p = v * t;
    for (let o = 0; o < t; o++) c[o] = n[p + o];
    oe(c, c, s, u, t);
    for (let o = 0; o < t; o++) n[p + o] = Math.sqrt(c[o]);
  }
  return n;
}
function ue(m, t, e, i, n, r, c, s) {
  m.clearRect(0, 0, t, e), m.font = n, "letterSpacing" in m && (m.letterSpacing = r && r !== "normal" ? r : "0px"), m.textBaseline = "alphabetic", m.textAlign = "left", m.fillStyle = "#ffffff", m.fillText(i, c, s);
  const v = m.getImageData(0, 0, t, e).data, p = t * e, o = new Uint8Array(p);
  for (let h = 0; h < p; h++)
    o[h] = v[h * 4 + 3] >= 128 ? 1 : 0;
  const g = ke(o, t, e), R = new Float32Array(p);
  for (let h = 0; h < p; h++) {
    const P = g[h], F = v[h * 4 + 3];
    F === 0 ? R[h] = 0 : P <= 2 ? R[h] = Math.max(0, P - 1 + F / 255) : R[h] = P;
  }
  const S = new Float32Array(p), V = new Float32Array(p), A = 6 / 16, a = 4 / 16, f = 1 / 16;
  for (let h = 0; h < e; h++) {
    const P = h * t;
    for (let F = 0; F < t; F++) {
      const G = Math.max(0, F - 2), Y = Math.max(0, F - 1), $ = Math.min(t - 1, F + 1), z = Math.min(t - 1, F + 2);
      S[P + F] = R[P + F] * A + (R[P + Y] + R[P + $]) * a + (R[P + G] + R[P + z]) * f;
    }
  }
  for (let h = 0; h < e; h++) {
    const P = h * t, F = Math.max(0, h - 2) * t, G = Math.max(0, h - 1) * t, Y = Math.min(e - 1, h + 1) * t, $ = Math.min(e - 1, h + 2) * t;
    for (let z = 0; z < t; z++)
      V[P + z] = S[P + z] * A + (S[G + z] + S[Y + z]) * a + (S[F + z] + S[$ + z]) * f;
  }
  for (let h = 0; h < p; h++) {
    const P = h * 4;
    v[P + 3] === 0 ? (v[P] = 0, v[P + 1] = 0, v[P + 2] = 0, v[P + 3] = 0) : (v[P] = Math.min(255, Math.round(V[h] * 8)), v[P + 1] = 0, v[P + 2] = 0);
  }
  return v;
}
class Pe {
  constructor() {
    l(this, "glCanvas", null);
    l(this, "gl", null);
    l(this, "prog", null);
    l(this, "quadBuf", null);
    l(this, "bgTexture", null);
    l(this, "compositeCanvas", null);
    l(this, "compositeCtx", null);
    l(this, "compositeTexture", null);
    l(this, "textMaskCanvas", null);
    l(this, "textMaskCtx", null);
    l(this, "textMaskTextures", /* @__PURE__ */ new Map());
    // Uniform locations
    l(this, "uSrc", null);
    l(this, "uSrcComposite", null);
    l(this, "uTextMask", null);
    l(this, "uIsText", null);
    l(this, "uResolution", null);
    l(this, "uRect", null);
    l(this, "uRadius", null);
    l(this, "uUseBackdrop", null);
    l(this, "uTilt", null);
    l(this, "uBgColor", null);
    l(this, "uRefraction", null);
    l(this, "uThickness", null);
    l(this, "uBevelWidth", null);
    l(this, "uFrost", null);
    l(this, "uDispersion", null);
    l(this, "uSheen", null);
    l(this, "uLightAngle", null);
    l(this, "uDarkness", null);
    l(this, "uRim", null);
    l(this, "uTime", null);
    l(this, "uFluidBright", null);
    l(this, "uFluidSpeed", null);
    l(this, "uFluidScale", null);
    l(this, "uFluidAuraWidth", null);
    l(this, "uFluidCenter", null);
    l(this, "uAuroraFlow", null);
    l(this, "uMousePos", null);
    l(this, "uHoverStrength", null);
    l(this, "uLightTrack", null);
    l(this, "uHoverBright", null);
    l(this, "uClickPos", null);
    l(this, "uClickTime", null);
    l(this, "uClickWave", null);
    l(this, "uIsAudioDeck", null);
    l(this, "uSwitchThumb", null);
    l(this, "instances", /* @__PURE__ */ new Map());
    l(this, "animId", null);
    l(this, "startTime", performance.now());
    l(this, "isTabVisible", !0);
    l(this, "handleVisibilityChange", () => {
      this.isTabVisible = !document.hidden, this.isTabVisible ? this.instances.size > 0 && !this.animId && this.startLoop() : this.stopLoop();
    });
    typeof window < "u" && document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }
  initGL() {
    if (this.gl) return !0;
    if (typeof window > "u") return !1;
    this.glCanvas = document.createElement("canvas"), this.glCanvas.width = 512, this.glCanvas.height = 256;
    const t = this.glCanvas.getContext("webgl2", {
      alpha: !0,
      antialias: !1,
      powerPreference: "high-performance"
    });
    if (!t) return !1;
    this.gl = t, this.prog = ce(t), this.quadBuf = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, this.quadBuf), t.bufferData(
      t.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      t.STATIC_DRAW
    );
    const e = t.getAttribLocation(this.prog, "a_pos");
    return t.enableVertexAttribArray(e), t.vertexAttribPointer(e, 2, t.FLOAT, !1, 0, 0), this.uSrc = t.getUniformLocation(this.prog, "u_src"), this.uSrcComposite = t.getUniformLocation(this.prog, "u_srcComposite"), this.uTextMask = t.getUniformLocation(this.prog, "u_textMask"), this.uIsText = t.getUniformLocation(this.prog, "u_isText"), this.uResolution = t.getUniformLocation(this.prog, "u_resolution"), this.uRect = t.getUniformLocation(this.prog, "u_rect"), this.uRadius = t.getUniformLocation(this.prog, "u_radius"), this.uUseBackdrop = t.getUniformLocation(this.prog, "u_useBackdrop"), this.uTilt = t.getUniformLocation(this.prog, "u_tilt"), this.uBgColor = t.getUniformLocation(this.prog, "u_bgColor"), this.uRefraction = t.getUniformLocation(this.prog, "u_refraction"), this.uThickness = t.getUniformLocation(this.prog, "u_thickness"), this.uBevelWidth = t.getUniformLocation(this.prog, "u_bevelWidth"), this.uFrost = t.getUniformLocation(this.prog, "u_frost"), this.uDispersion = t.getUniformLocation(this.prog, "u_dispersion"), this.uSheen = t.getUniformLocation(this.prog, "u_sheen"), this.uLightAngle = t.getUniformLocation(this.prog, "u_lightAngle"), this.uDarkness = t.getUniformLocation(this.prog, "u_darkness"), this.uRim = t.getUniformLocation(this.prog, "u_rim"), this.uTime = t.getUniformLocation(this.prog, "u_time"), this.uFluidBright = t.getUniformLocation(this.prog, "u_fluidBright"), this.uFluidSpeed = t.getUniformLocation(this.prog, "u_fluidSpeed"), this.uFluidScale = t.getUniformLocation(this.prog, "u_fluidScale"), this.uFluidAuraWidth = t.getUniformLocation(this.prog, "u_fluidAuraWidth"), this.uFluidCenter = t.getUniformLocation(this.prog, "u_fluidCenter"), this.uAuroraFlow = t.getUniformLocation(this.prog, "u_auroraFlow"), this.uMousePos = t.getUniformLocation(this.prog, "u_mousePos"), this.uHoverStrength = t.getUniformLocation(this.prog, "u_hoverStrength"), this.uLightTrack = t.getUniformLocation(this.prog, "u_lightTrack"), this.uHoverBright = t.getUniformLocation(this.prog, "u_hoverBright"), this.uClickPos = t.getUniformLocation(this.prog, "u_clickPos"), this.uClickTime = t.getUniformLocation(this.prog, "u_clickTime"), this.uClickWave = t.getUniformLocation(this.prog, "u_clickWave"), this.uIsAudioDeck = t.getUniformLocation(this.prog, "u_isAudioDeck"), this.uSwitchThumb = t.getUniformLocation(this.prog, "u_switchThumb"), this.bgTexture = t.createTexture(), t.bindTexture(t.TEXTURE_2D, this.bgTexture), t.texImage2D(
      t.TEXTURE_2D,
      0,
      t.RGBA,
      1,
      1,
      0,
      t.RGBA,
      t.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0])
    ), !0;
  }
  register(t) {
    this.instances.set(t.id, t), this.gl || this.initGL(), this.instances.size === 1 && this.startLoop();
  }
  unregister(t) {
    this.instances.delete(t);
    const e = this.textMaskTextures.get(t);
    e && this.gl && this.gl.deleteTexture(e.tex), this.textMaskTextures.delete(t), this.instances.size === 0 && this.stopLoop();
  }
  startLoop() {
    if (this.animId !== null) return;
    const t = () => {
      this.renderFrame(), this.instances.size > 0 && this.isTabVisible ? this.animId = requestAnimationFrame(t) : this.animId = null;
    };
    this.animId = requestAnimationFrame(t);
  }
  stopLoop() {
    this.animId !== null && (cancelAnimationFrame(this.animId), this.animId = null);
  }
  getTime() {
    return (performance.now() - this.startTime) * 1e-3;
  }
  renderFrame() {
    const t = this.gl, e = this.glCanvas, i = this.prog;
    if (!t || !e || !i) return;
    const n = this.getTime(), r = /* @__PURE__ */ new Map();
    this.instances.forEach((s) => {
      s.visible && r.set(s, s.canvas.getBoundingClientRect());
    });
    const c = Array.from(this.instances.values()).sort((s, u) => {
      const v = s.canvas.parentElement, p = u.canvas.parentElement;
      if (v && v.contains(u.canvas)) return -1;
      if (p && p.contains(s.canvas)) return 1;
      const o = s.canvas.width * s.canvas.height, g = u.canvas.width * u.canvas.height;
      return o !== g ? g - o : 0;
    });
    c.forEach((s, u) => {
      var Q;
      if (!s.visible) return;
      const { canvas: v, ctx: p } = s, o = v.width, g = v.height;
      if (o <= 0 || g <= 0) return;
      (e.width < o || e.height < g) && (e.width = Math.max(e.width, o), e.height = Math.max(e.height, g)), t.viewport(0, 0, o, g), t.useProgram(i);
      const R = Math.min(window.devicePixelRatio || 1, 2), S = r.get(s) || v.getBoundingClientRect(), V = o * g;
      let A;
      for (let k = u - 1; k >= 0; k--) {
        const C = c[k];
        if (!C.visible || C.canvas.width <= 0 || C.canvas.height <= 0) continue;
        if ((Q = C.canvas.parentElement) != null && Q.contains(v)) {
          A = C;
          break;
        }
        const x = r.get(C), q = C.canvas.width * C.canvas.height;
        if (x && q > V * 1.5 && S.right > x.left && S.left < x.right && S.bottom > x.top && S.top < x.bottom) {
          A = C;
          break;
        }
      }
      if (t.activeTexture(t.TEXTURE0), A && A.canvas.width > 0 && A.canvas.height > 0)
        if (this.compositeCanvas || (this.compositeCanvas = document.createElement("canvas"), this.compositeCtx = this.compositeCanvas.getContext("2d"), this.compositeTexture = t.createTexture()), (this.compositeCanvas.width !== o || this.compositeCanvas.height !== g) && (this.compositeCanvas.width = o, this.compositeCanvas.height = g), this.compositeCtx && this.compositeTexture) {
          const k = r.get(A) || A.canvas.getBoundingClientRect(), C = Math.round((S.left - k.left) * R), x = Math.round((S.top - k.top) * R);
          this.compositeCtx.clearRect(0, 0, o, g), this.compositeCtx.drawImage(A.canvas, C, x, o, g, 0, 0, o, g), t.bindTexture(t.TEXTURE_2D, this.compositeTexture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, this.compositeCanvas), this.uSrcComposite && t.uniform1f(this.uSrcComposite, 2);
        } else
          t.bindTexture(t.TEXTURE_2D, this.bgTexture), this.uSrcComposite && t.uniform1f(this.uSrcComposite, -1);
      else
        t.bindTexture(t.TEXTURE_2D, this.bgTexture), this.uSrcComposite && t.uniform1f(this.uSrcComposite, -1);
      this.uSrc && t.uniform1i(this.uSrc, 0), s.curHover += (s.targetHover - s.curHover) * 0.12, s.curMouseX += (s.targetMouseX - s.curMouseX) * 0.14, s.curMouseY += (s.targetMouseY - s.curMouseY) * 0.14;
      const a = s.getParams();
      if (!s.textMask && !s.isAudioDeck) {
        const k = a.frost > 1 ? Math.round(a.frost * 0.25 * 10) / 10 : 0, C = k > 0 ? `blur(${k}px)` : "";
        v.style.backdropFilter !== C && (v.style.backdropFilter = C, v.style.webkitBackdropFilter = C);
      }
      const f = le(v);
      this.uBgColor && t.uniform3f(this.uBgColor, f[0], f[1], f[2]);
      const h = s.getRect ? s.getRect() : null, P = h ? h[0] : 0, F = h ? h[1] : 0, G = h ? h[2] : o, Y = h ? h[3] : g;
      if (t.uniform2f(this.uResolution, o, g), t.uniform4f(this.uRect, P, F, G, Y), t.uniform1f(this.uRadius, a.radius ?? Y * 0.5), t.uniform1f(this.uUseBackdrop, 0), this.uIsAudioDeck && t.uniform1f(this.uIsAudioDeck, s.isAudioDeck ? 1 : 0), this.uSwitchThumb) {
        const k = s.getSwitchThumb ? s.getSwitchThumb() : null;
        if (k) {
          const C = k[2], x = k.length >= 4 ? k[3] : k[2];
          t.uniform4f(this.uSwitchThumb, k[0], k[1], C, x);
        } else
          t.uniform4f(this.uSwitchThumb, 0, 0, 0, 0);
      }
      if (s.textMask) {
        this.textMaskCanvas || (this.textMaskCanvas = document.createElement("canvas"), this.textMaskCtx = this.textMaskCanvas.getContext("2d", { willReadFrequently: !0 }));
        const k = s.textFont || `800 ${Math.round(g * 0.72)}px sans-serif`, C = s.textLetterSpacing || "normal", x = `${s.textMask}_${o}_${g}_${k}_${C}`;
        let q = this.textMaskTextures.get(s.id);
        if (q || (q = { tex: t.createTexture(), key: "" }, this.textMaskTextures.set(s.id, q)), q.key !== x && this.textMaskCtx) {
          q.key = x, (this.textMaskCanvas.width !== o || this.textMaskCanvas.height !== g) && (this.textMaskCanvas.width = o, this.textMaskCanvas.height = g), this.textMaskCtx.font = k, "letterSpacing" in this.textMaskCtx && (this.textMaskCtx.letterSpacing = C !== "normal" ? C : "0px");
          const B = this.textMaskCtx.measureText(s.textMask), H = B.actualBoundingBoxLeft ?? 0, ft = B.actualBoundingBoxRight ?? B.width, O = B.actualBoundingBoxAscent ?? g * 0.36, L = B.actualBoundingBoxDescent ?? g * 0.1, U = Math.round(o * 0.5 - (ft - H) * 0.5), X = Math.round(g * 0.5 + (O - L) * 0.5), Z = ue(
            this.textMaskCtx,
            o,
            g,
            s.textMask,
            k,
            C,
            U,
            X
          );
          t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, q.tex), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, o, g, 0, t.RGBA, t.UNSIGNED_BYTE, Z);
        } else
          t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, q.tex);
        this.uTextMask && t.uniform1i(this.uTextMask, 1), this.uIsText && t.uniform1f(this.uIsText, 1);
      } else
        this.uIsText && t.uniform1f(this.uIsText, 0);
      if (s.tilt && (Math.abs(s.tilt.rotX) > 1e-3 || Math.abs(s.tilt.rotY) > 1e-3 || Math.abs(s.tilt.scale - 1) > 1e-3)) {
        const k = s.tilt.rotX * Math.PI / 180, C = s.tilt.rotY * Math.PI / 180, x = s.tilt.scale || 1, q = (s.tilt.focalLength || 1e3) * R;
        this.uTilt && t.uniform4f(this.uTilt, k, C, x, q);
      } else
        this.uTilt && t.uniform4f(this.uTilt, 0, 0, 1, 0);
      t.uniform1f(this.uTime, n), t.uniform1f(this.uRefraction, a.refraction), t.uniform1f(this.uThickness, a.thickness), t.uniform1f(this.uBevelWidth, a.bevelWidth * R), t.uniform1f(this.uFrost, a.frost), t.uniform1f(this.uDispersion, a.dispersion), t.uniform1f(this.uSheen, a.sheen);
      const $ = a.lightAngle ?? a.angle ?? 24;
      t.uniform1f(this.uLightAngle, $ * Math.PI / 180), t.uniform1f(this.uDarkness, a.darkness), t.uniform1f(this.uRim, a.rim);
      const z = a.causticBright ?? a.fluidBright, et = a.causticSpeed ?? a.fluidSpeed, it = a.causticScale ?? a.fluidScale;
      t.uniform1f(this.uFluidBright, z), t.uniform1f(this.uFluidSpeed, et), t.uniform1f(this.uFluidScale, it), t.uniform1f(this.uFluidAuraWidth, (a.fluidAuraWidth ?? 4) * R), t.uniform1f(this.uFluidCenter, a.fluidCenter ?? 0), t.uniform1f(this.uAuroraFlow, a.auroraFlow ?? 75), t.uniform2f(this.uMousePos, s.curMouseX, s.curMouseY), t.uniform1f(this.uHoverStrength, s.curHover), t.uniform1f(this.uLightTrack, a.lightTrack), t.uniform1f(this.uHoverBright, a.hoverBright), t.uniform2f(this.uClickPos, s.clickPos[0], s.clickPos[1]), t.uniform1f(this.uClickTime, s.clickTime), t.uniform1f(this.uClickWave, a.clickWave), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), t.drawArrays(t.TRIANGLES, 0, 6), p.clearRect(0, 0, o, g), p.drawImage(e, 0, e.height - g, o, g, 0, 0, o, g);
    });
  }
  teardown() {
    this.stopLoop(), this.gl && this.prog && (this.textMaskTextures.forEach((t) => {
      var e;
      (e = this.gl) == null || e.deleteTexture(t.tex);
    }), this.textMaskTextures.clear(), this.gl.deleteProgram(this.prog), this.quadBuf && this.gl.deleteBuffer(this.quadBuf), this.bgTexture && this.gl.deleteTexture(this.bgTexture), this.compositeTexture && this.gl.deleteTexture(this.compositeTexture), this.gl = null, this.prog = null, this.compositeTexture = null, this.compositeCanvas = null, this.compositeCtx = null), typeof window < "u" && document.removeEventListener("visibilitychange", this.handleVisibilityChange);
  }
}
let te = null;
function It() {
  return te || (te = new Pe()), te;
}
class Fe {
  constructor(t, e) {
    l(this, "canvas");
    l(this, "config");
    l(this, "gl", null);
    l(this, "prog", null);
    l(this, "quadBuf", null);
    l(this, "bgCanvas");
    l(this, "bgCtx", null);
    l(this, "bgTexture", null);
    l(this, "sceneTexture", null);
    l(this, "sceneTexW", 0);
    l(this, "sceneTexH", 0);
    l(this, "cleanBgCanvas", null);
    l(this, "cleanBgCtx", null);
    l(this, "bgPatchCanvas", null);
    l(this, "bgPatchCtx", null);
    // Uniform locations
    l(this, "uResolution", null);
    l(this, "uSrc", null);
    l(this, "uSrcComposite", null);
    l(this, "uTextMask", null);
    l(this, "uIsText", null);
    l(this, "uIsAudioDeck", null);
    l(this, "uSwitchThumb", null);
    l(this, "textMaskCanvas", null);
    l(this, "textMaskCtx", null);
    l(this, "textMaskTexture", null);
    l(this, "lastTextMaskKey", "");
    l(this, "uRect", null);
    l(this, "uRadius", null);
    l(this, "uUseBackdrop", null);
    l(this, "uTilt", null);
    l(this, "uBgColor", null);
    l(this, "uRefraction", null);
    l(this, "uThickness", null);
    l(this, "uBevelWidth", null);
    l(this, "uFrost", null);
    l(this, "uDispersion", null);
    l(this, "uSheen", null);
    l(this, "uLightAngle", null);
    l(this, "uDarkness", null);
    l(this, "uRim", null);
    l(this, "uTime", null);
    l(this, "uFluidBright", null);
    l(this, "uFluidSpeed", null);
    l(this, "uFluidScale", null);
    l(this, "uFluidAuraWidth", null);
    l(this, "uFluidCenter", null);
    l(this, "uAuroraFlow", null);
    l(this, "uMousePos", null);
    l(this, "uHoverStrength", null);
    l(this, "uLightTrack", null);
    l(this, "uHoverBright", null);
    l(this, "uClickPos", null);
    l(this, "uClickTime", null);
    l(this, "uClickWave", null);
    // Per-element pointer tracking for smooth independent hover & ripple decay
    l(this, "pointerStates", /* @__PURE__ */ new Map());
    l(this, "startTime", performance.now());
    l(this, "animId", null);
    l(this, "dpr", 1);
    l(this, "resizeObserver", null);
    l(this, "isPaused", !1);
    l(this, "isTabVisible", typeof document < "u" ? !document.hidden : !0);
    l(this, "handleResize", () => {
      this.resize();
    });
    l(this, "attachedEls", /* @__PURE__ */ new Set());
    l(this, "handleVisibilityChange", () => {
      this.isTabVisible = !document.hidden, this.syncLoopState();
    });
    this.canvas = t, this.config = e, this.bgCanvas = document.createElement("canvas"), this.bgCtx = this.bgCanvas.getContext("2d"), this.initGL(), window.addEventListener("resize", this.handleResize), typeof document < "u" && document.addEventListener("visibilitychange", this.handleVisibilityChange), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(this.handleResize), this.resizeObserver.observe(this.canvas)), this.resize(), this.syncLoopState();
  }
  getPointerState(t) {
    let e = this.pointerStates.get(t);
    return e || (e = {
      targetMouseX: 0,
      targetMouseY: 0,
      curMouseX: 0,
      curMouseY: 0,
      targetHover: 0,
      curHover: 0,
      clickPos: [-999, -999],
      clickTime: -999,
      hasCoords: !1
    }, this.pointerStates.set(t, e)), e;
  }
  initGL() {
    const t = this.canvas.getContext("webgl2", {
      alpha: !0,
      premultipliedAlpha: !0,
      antialias: !1,
      powerPreference: "high-performance"
    });
    if (!t)
      return console.error("TactileGlassStage: WebGL2 required"), !1;
    this.gl = t, this.bgTexture = t.createTexture(), this.prog = ce(t), t.useProgram(this.prog), this.quadBuf = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, this.quadBuf), t.bufferData(
      t.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      t.STATIC_DRAW
    );
    const e = t.getAttribLocation(this.prog, "a_pos");
    return t.enableVertexAttribArray(e), t.vertexAttribPointer(e, 2, t.FLOAT, !1, 0, 0), this.uResolution = t.getUniformLocation(this.prog, "u_resolution"), this.uSrc = t.getUniformLocation(this.prog, "u_src"), this.uSrcComposite = t.getUniformLocation(this.prog, "u_srcComposite"), this.uTextMask = t.getUniformLocation(this.prog, "u_textMask"), this.uIsText = t.getUniformLocation(this.prog, "u_isText"), this.uIsAudioDeck = t.getUniformLocation(this.prog, "u_isAudioDeck"), this.uSwitchThumb = t.getUniformLocation(this.prog, "u_switchThumb"), this.uRect = t.getUniformLocation(this.prog, "u_rect"), this.uRadius = t.getUniformLocation(this.prog, "u_radius"), this.uUseBackdrop = t.getUniformLocation(this.prog, "u_useBackdrop"), this.uTilt = t.getUniformLocation(this.prog, "u_tilt"), this.uBgColor = t.getUniformLocation(this.prog, "u_bgColor"), this.uRefraction = t.getUniformLocation(this.prog, "u_refraction"), this.uThickness = t.getUniformLocation(this.prog, "u_thickness"), this.uBevelWidth = t.getUniformLocation(this.prog, "u_bevelWidth"), this.uFrost = t.getUniformLocation(this.prog, "u_frost"), this.uDispersion = t.getUniformLocation(this.prog, "u_dispersion"), this.uSheen = t.getUniformLocation(this.prog, "u_sheen"), this.uLightAngle = t.getUniformLocation(this.prog, "u_lightAngle"), this.uDarkness = t.getUniformLocation(this.prog, "u_darkness"), this.uRim = t.getUniformLocation(this.prog, "u_rim"), this.uTime = t.getUniformLocation(this.prog, "u_time"), this.uFluidBright = t.getUniformLocation(this.prog, "u_fluidBright"), this.uFluidSpeed = t.getUniformLocation(this.prog, "u_fluidSpeed"), this.uFluidScale = t.getUniformLocation(this.prog, "u_fluidScale"), this.uFluidAuraWidth = t.getUniformLocation(this.prog, "u_fluidAuraWidth"), this.uFluidCenter = t.getUniformLocation(this.prog, "u_fluidCenter"), this.uAuroraFlow = t.getUniformLocation(this.prog, "u_auroraFlow"), this.uMousePos = t.getUniformLocation(this.prog, "u_mousePos"), this.uHoverStrength = t.getUniformLocation(this.prog, "u_hoverStrength"), this.uLightTrack = t.getUniformLocation(this.prog, "u_lightTrack"), this.uHoverBright = t.getUniformLocation(this.prog, "u_hoverBright"), this.uClickPos = t.getUniformLocation(this.prog, "u_clickPos"), this.uClickTime = t.getUniformLocation(this.prog, "u_clickTime"), this.uClickWave = t.getUniformLocation(this.prog, "u_clickWave"), !0;
  }
  updateBackground(t = 0) {
    const e = this.gl, i = this.bgCtx;
    if (!e || !i || !this.bgTexture) return;
    (this.bgCanvas.width !== this.canvas.width || this.bgCanvas.height !== this.canvas.height) && (this.bgCanvas.width = this.canvas.width, this.bgCanvas.height = this.canvas.height), this.cleanBgCanvas || (this.cleanBgCanvas = document.createElement("canvas"), this.cleanBgCtx = this.cleanBgCanvas.getContext("2d")), (this.cleanBgCanvas.width !== this.canvas.width || this.cleanBgCanvas.height !== this.canvas.height) && (this.cleanBgCanvas.width = this.canvas.width, this.cleanBgCanvas.height = this.canvas.height);
    const n = this.cleanBgCtx;
    if (n) {
      n.clearRect(0, 0, this.canvas.width, this.canvas.height), n.fillStyle = "rgba(255, 255, 255, 0.12)";
      const r = Math.round(24 * this.dpr), c = 1 * this.dpr, s = Math.floor(r * 0.5) + 0.5, u = Math.floor(r * 0.5) + 0.5;
      n.beginPath();
      const v = this.canvas.width - c - 1, p = this.canvas.height - c - 1;
      for (let o = u; o < p; o += r)
        for (let g = s; g < v; g += r)
          n.moveTo(g + c, o), n.arc(g, o, c, 0, Math.PI * 2);
      n.fill();
    }
    i.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height), this.cleanBgCanvas && i.drawImage(this.cleanBgCanvas, 0, 0), this.config.drawBackground && this.config.drawBackground(i, this.bgCanvas.width, this.bgCanvas.height, this.dpr, t, 0, 0), e.bindTexture(e.TEXTURE_2D, this.bgTexture), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, this.bgCanvas);
  }
  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    const t = this.canvas.getBoundingClientRect(), e = t.width > 0 ? t.width : window.innerWidth, i = t.height > 0 ? t.height : window.innerHeight;
    this.canvas.width = Math.max(1, Math.round(e * this.dpr)), this.canvas.height = Math.max(1, Math.round(i * this.dpr)), this.gl && this.gl.viewport(0, 0, this.canvas.width, this.canvas.height), this.config.onResize && this.config.onResize(), this.updateBackground();
  }
  handlePointerCoord(t, e) {
    let i = e.getBoundingClientRect();
    if (e.firstChild && (e.classList.contains("heading-word-target") || e.classList.contains("tactile-glass-word") || e.childNodes.length === 1 && e.firstChild.nodeType === 3)) {
      const s = document.createRange();
      s.selectNodeContents(e.firstChild);
      const u = s.getBoundingClientRect();
      u.width > 0 && u.height > 0 && (i = u);
    }
    const n = i.left + i.width * 0.5, r = i.top + i.height * 0.5, c = this.getPointerState(e);
    c.targetMouseX = (t.clientX - n) * this.dpr, c.targetMouseY = (r - t.clientY) * this.dpr, c.hasCoords || (c.curMouseX = c.targetMouseX, c.curMouseY = c.targetMouseY, c.hasCoords = !0);
  }
  hasNestedAttachedTarget(t, e) {
    if (!(e instanceof Node)) return !1;
    for (const i of this.attachedEls)
      if (i !== t && t.contains(i) && i.contains(e))
        return !0;
    return !1;
  }
  attachPointer(t) {
    if (!t) return;
    this.attachedEls.add(t), this.getPointerState(t), t.addEventListener("pointerenter", (i) => {
      const n = this.getPointerState(t);
      if (this.handlePointerCoord(i, t), this.hasNestedAttachedTarget(t, i.target)) {
        n.targetHover = 0;
        return;
      }
      n.targetHover = 1;
    }), t.addEventListener("pointermove", (i) => {
      const n = this.getPointerState(t);
      if (this.handlePointerCoord(i, t), this.hasNestedAttachedTarget(t, i.target)) {
        n.targetHover = 0;
        return;
      }
      n.targetHover = 1;
    }), t.addEventListener("pointerleave", (i) => {
      if (i.pointerType === "touch") return;
      const n = this.getPointerState(t);
      n.targetHover = 0;
    }), t.addEventListener("pointercancel", (i) => {
      if (i.pointerType === "touch") return;
      const n = this.getPointerState(t);
      n.targetHover = 0;
    }), t.addEventListener("pointerup", (i) => {
      if (i.pointerType === "touch") {
        const n = this.getPointerState(t);
        n.targetHover = 0;
      }
    }), t.addEventListener("pointerdown", (i) => {
      if (this.hasNestedAttachedTarget(t, i.target)) return;
      const n = this.getPointerState(t);
      this.handlePointerCoord(i, t), n.targetHover = 1, n.clickPos = [n.targetMouseX, n.targetMouseY], n.clickTime = (performance.now() - this.startTime) * 1e-3;
    }), t.addEventListener(
      "touchstart",
      (i) => {
        const n = i.touches[0];
        if (!n) return;
        const r = this.getPointerState(t);
        if (this.handlePointerCoord(n, t), this.hasNestedAttachedTarget(t, i.target)) {
          r.targetHover = 0;
          return;
        }
        r.targetHover = 1;
      },
      { passive: !0 }
    ), t.addEventListener(
      "touchmove",
      (i) => {
        const n = i.touches[0];
        if (!n) return;
        const r = this.getPointerState(t);
        this.handlePointerCoord(n, t);
        const c = document.elementFromPoint(n.clientX, n.clientY);
        if (!c || !t.contains(c) || this.hasNestedAttachedTarget(t, c)) {
          r.targetHover = 0;
          return;
        }
        r.targetHover = 1;
      },
      { passive: !0 }
    );
    const e = () => {
      const i = this.getPointerState(t);
      i.targetHover = 0;
    };
    t.addEventListener("touchend", e, { passive: !0 }), t.addEventListener("touchcancel", e, { passive: !0 });
  }
  resetPointer() {
    this.pointerStates.forEach((t) => {
      t.targetHover = 0, t.curHover = 0, t.clickPos = [-999, -999], t.clickTime = -999, t.hasCoords = !1;
    });
  }
  setPaused(t) {
    this.isPaused !== t && (this.isPaused = t, this.syncLoopState());
  }
  syncLoopState() {
    !this.isPaused && this.isTabVisible ? this.startLoop() : this.stopLoop();
  }
  startLoop() {
    if (this.animId !== null) return;
    const t = () => {
      if (this.isPaused || !this.isTabVisible) {
        this.animId = null;
        return;
      }
      this.render(), this.animId = requestAnimationFrame(t);
    };
    this.animId = requestAnimationFrame(t);
  }
  stopLoop() {
    this.animId !== null && (cancelAnimationFrame(this.animId), this.animId = null);
  }
  render() {
    var o, g, R, S, V, A;
    const t = this.gl, e = this.prog;
    if (!t || !e) return;
    const i = this.config.getTargets().filter(Boolean);
    t.useProgram(e);
    const n = (performance.now() - this.startTime) * 1e-3;
    if ((g = (o = this.config).isBackgroundDynamic) != null && g.call(o) && this.config.drawBackground && this.cleanBgCanvas && this.bgTexture) {
      const a = (S = (R = this.config).getBackgroundDirtyRect) == null ? void 0 : S.call(R);
      if (a && a.width > 0 && a.height > 0) {
        this.bgPatchCanvas || (this.bgPatchCanvas = document.createElement("canvas"), this.bgPatchCtx = this.bgPatchCanvas.getContext("2d")), (this.bgPatchCanvas.width !== a.width || this.bgPatchCanvas.height !== a.height) && (this.bgPatchCanvas.width = a.width, this.bgPatchCanvas.height = a.height);
        const f = this.bgPatchCtx;
        f && (f.clearRect(0, 0, a.width, a.height), f.drawImage(this.cleanBgCanvas, a.x, a.y, a.width, a.height, 0, 0, a.width, a.height), this.config.drawBackground(f, a.width, a.height, this.dpr, n, a.x, a.y), (V = this.bgCtx) == null || V.clearRect(a.x, a.y, a.width, a.height), (A = this.bgCtx) == null || A.drawImage(this.bgPatchCanvas, a.x, a.y), t.bindTexture(t.TEXTURE_2D, this.bgTexture), t.texSubImage2D(t.TEXTURE_2D, 0, a.x, a.y, t.RGBA, t.UNSIGNED_BYTE, this.bgPatchCanvas));
      }
    }
    t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, this.bgTexture), this.uSrc && t.uniform1i(this.uSrc, 0), this.uSrcComposite && t.uniform1f(this.uSrcComposite, 0), t.uniform2f(this.uResolution, this.canvas.width, this.canvas.height), this.uUseBackdrop && t.uniform1f(this.uUseBackdrop, 1);
    const r = le(this.canvas);
    this.uBgColor && t.uniform3f(this.uBgColor, r[0], r[1], r[2]), this.pointerStates.forEach((a) => {
      a.curHover += (a.targetHover - a.curHover) * 0.12, a.curMouseX += (a.targetMouseX - a.curMouseX) * 0.14, a.curMouseY += (a.targetMouseY - a.curMouseY) * 0.14;
    }), t.disable(t.BLEND), t.disable(t.SCISSOR_TEST), t.uniform4f(this.uRect, -9999, -9999, 1, 1), t.uniform1f(this.uRadius, 0), t.uniform1f(this.uFluidBright, 0), t.uniform1f(this.uHoverStrength, 0), this.uIsText && t.uniform1f(this.uIsText, 0), this.uIsAudioDeck && t.uniform1f(this.uIsAudioDeck, 0), this.uSwitchThumb && t.uniform4f(this.uSwitchThumb, 0, 0, 0, 0), this.uTilt && t.uniform4f(this.uTilt, 0, 0, 1, 0), t.drawArrays(t.TRIANGLES, 0, 6), this.uUseBackdrop && t.uniform1f(this.uUseBackdrop, 0), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA), t.enable(t.SCISSOR_TEST);
    const c = this.canvas.getBoundingClientRect(), s = c.left, u = c.top, v = c.height > 0 ? c.height : window.innerHeight, p = [];
    i.forEach((a) => {
      var Z, J;
      const f = a.element;
      if (!f || !f.isConnected) return;
      let h, P, F, G, Y, $ = 0, z = 0;
      if (a.isText) {
        let M = f.getBoundingClientRect();
        if (f.firstChild) {
          const ot = document.createRange();
          ot.selectNodeContents(f.firstChild);
          const at = ot.getBoundingClientRect();
          at.width > 0 && at.height > 0 && (M = at);
        }
        const N = window.getComputedStyle(f), T = parseFloat(N.fontSize) * this.dpr, _ = `${N.fontWeight} ${T}px ${N.fontFamily}`, y = N.letterSpacing || "normal";
        if (this.textMaskCanvas || (this.textMaskCanvas = document.createElement("canvas"), this.textMaskCtx = this.textMaskCanvas.getContext("2d", { willReadFrequently: !0 }), this.textMaskTexture = t.createTexture()), this.textMaskCtx) {
          this.textMaskCtx.font = _, "letterSpacing" in this.textMaskCtx && y !== "normal" && (this.textMaskCtx.letterSpacing = y), this.textMaskCtx.textBaseline = "alphabetic", this.textMaskCtx.textAlign = "left";
          const ot = ((Z = f.textContent) == null ? void 0 : Z.trim()) || "", at = this.textMaskCtx.measureText(ot);
          z = Math.round(at.fontBoundingBoxAscent || T * 0.82);
        }
        $ = Math.ceil(32 * this.dpr);
        const d = Math.round((M.left - s) * this.dpr), E = Math.round((v - (M.top - u + M.height)) * this.dpr), b = Math.round(M.width * this.dpr), W = Math.round(M.height * this.dpr);
        h = d - $, P = E - $, F = b + $ * 2, G = W + $ * 2, Y = 0;
      } else {
        const M = f.getBoundingClientRect(), N = a.isCircle || f.classList.contains("btn-circle"), T = N ? Math.min(M.width, M.height) : 0, _ = N ? T : a.tilt ? f.offsetWidth : M.width, y = N ? T : a.tilt ? f.offsetHeight : M.height, d = N ? M.left + (M.width - T) * 0.5 : a.tilt ? M.left + M.width * 0.5 - _ * 0.5 : M.left, E = N ? M.top + (M.height - T) * 0.5 : a.tilt ? M.top + M.height * 0.5 - y * 0.5 : M.top;
        h = Math.round((d - s) * this.dpr), P = Math.round((v - (E - u + y)) * this.dpr), F = Math.round(_ * this.dpr), G = Math.round(y * this.dpr);
        const b = Math.min(F, G) * 0.5, W = a.params.radius !== void 0 ? a.params.radius : parseFloat(getComputedStyle(f).borderRadius);
        Y = N ? b : Math.min(
          (Number.isFinite(W) ? W : y * 0.5) * this.dpr,
          b
        );
      }
      if (F <= 0 || G <= 0) return;
      const et = a.isText ? 0 : a.tilt || a.isAudioDeck ? Math.ceil(64 * this.dpr) : Math.ceil(1 * this.dpr), it = Math.max(0, Math.min(this.canvas.width, h - et)), Q = Math.max(0, Math.min(this.canvas.height, P - et)), k = Math.max(0, Math.min(this.canvas.width, h + F + et)), C = Math.max(0, Math.min(this.canvas.height, P + G + et)), x = k - it, q = C - Q;
      if (x <= 0 || q <= 0) return;
      const B = p.some(
        (M) => M.el.contains(f) || M.w * M.h > F * G * 1.5 && h < M.x + M.w && h + F > M.x && P < M.y + M.h && P + G > M.y
      );
      if (p.push({ el: f, x: h, y: P, w: F, h: G }), t.activeTexture(t.TEXTURE0), B) {
        this.sceneTexture || (this.sceneTexture = t.createTexture()), t.bindTexture(t.TEXTURE_2D, this.sceneTexture), (this.sceneTexW !== this.canvas.width || this.sceneTexH !== this.canvas.height) && (this.sceneTexW = this.canvas.width, this.sceneTexH = this.canvas.height, t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texImage2D(
          t.TEXTURE_2D,
          0,
          t.RGBA,
          this.sceneTexW,
          this.sceneTexH,
          0,
          t.RGBA,
          t.UNSIGNED_BYTE,
          null
        ));
        const M = Math.ceil(64 * this.dpr), N = Math.max(0, it - M), T = Math.max(0, Q - M), _ = Math.min(this.canvas.width, k + M), y = Math.min(this.canvas.height, C + M), d = _ - N, E = y - T;
        d > 0 && E > 0 && t.copyTexSubImage2D(t.TEXTURE_2D, 0, N, T, N, T, d, E), this.uSrcComposite && t.uniform1f(this.uSrcComposite, 1);
      } else
        t.bindTexture(t.TEXTURE_2D, this.bgTexture), this.uSrcComposite && t.uniform1f(this.uSrcComposite, 0);
      if (t.scissor(it, Q, x, q), t.uniform4f(this.uRect, h, P, F, G), t.uniform1f(this.uRadius, Y), this.uIsAudioDeck && t.uniform1f(this.uIsAudioDeck, a.isAudioDeck ? 1 : 0), this.uSwitchThumb) {
        const M = a.isText ? null : f.querySelector(".switch-thumb, .tabs-indicator, [data-switch-thumb], [data-tabs-indicator]");
        if (M) {
          const N = M.getBoundingClientRect(), T = f.getBoundingClientRect(), _ = (N.left + N.width * 0.5 - (T.left + T.width * 0.5)) * this.dpr, y = (T.top + T.height * 0.5 - (N.top + N.height * 0.5)) * this.dpr, d = N.width * 0.5 * this.dpr, E = N.height * 0.5 * this.dpr;
          t.uniform4f(this.uSwitchThumb, _, y, d, E);
        } else
          t.uniform4f(this.uSwitchThumb, 0, 0, 0, 0);
      }
      if (a.isText) {
        this.textMaskCanvas || (this.textMaskCanvas = document.createElement("canvas"), this.textMaskCtx = this.textMaskCanvas.getContext("2d", { willReadFrequently: !0 }), this.textMaskTexture = t.createTexture());
        const M = ((J = f.textContent) == null ? void 0 : J.trim()) || "", N = window.getComputedStyle(f), T = Math.max(1, Math.round(F)), _ = Math.max(1, Math.round(G)), y = parseFloat(N.fontSize) * this.dpr, d = `${N.fontWeight} ${y}px ${N.fontFamily}`, E = N.letterSpacing || "normal", b = `${M}_${T}_${_}_${d}_${E}_${$}_${z}`;
        if (this.lastTextMaskKey !== b) {
          if (this.lastTextMaskKey = b, (this.textMaskCanvas.width !== T || this.textMaskCanvas.height !== _) && (this.textMaskCanvas.width = T, this.textMaskCanvas.height = _), this.textMaskCtx) {
            const W = ue(
              this.textMaskCtx,
              T,
              _,
              M,
              d,
              E,
              $,
              $ + z
            );
            t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, this.textMaskTexture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, T, _, 0, t.RGBA, t.UNSIGNED_BYTE, W);
          }
        } else
          t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, this.textMaskTexture);
        this.uTextMask && t.uniform1i(this.uTextMask, 1), this.uIsText && t.uniform1f(this.uIsText, 1);
      } else
        this.uIsText && t.uniform1f(this.uIsText, 0);
      if (a.tilt && (Math.abs(a.tilt.rotX) > 1e-3 || Math.abs(a.tilt.rotY) > 1e-3 || Math.abs(a.tilt.scale - 1) > 1e-3)) {
        const M = a.tilt.rotX * Math.PI / 180, N = a.tilt.rotY * Math.PI / 180, T = a.tilt.scale || 1, _ = (a.tilt.focalLength || 1e3) * this.dpr;
        this.uTilt && t.uniform4f(this.uTilt, M, N, T, _);
      } else
        this.uTilt && t.uniform4f(this.uTilt, 0, 0, 1, 0);
      const H = a.params;
      t.uniform1f(this.uRefraction, H.refraction), t.uniform1f(this.uThickness, H.thickness), t.uniform1f(this.uBevelWidth, H.bevelWidth * this.dpr), t.uniform1f(this.uFrost, H.frost), t.uniform1f(this.uDispersion, H.dispersion), t.uniform1f(this.uSheen, H.sheen);
      const ft = H.lightAngle ?? H.angle ?? 24;
      t.uniform1f(this.uLightAngle, ft * Math.PI / 180), t.uniform1f(this.uDarkness, H.darkness), t.uniform1f(this.uRim, H.rim), t.uniform1f(this.uTime, n);
      const O = H.causticBright ?? H.fluidBright, L = H.causticSpeed ?? H.fluidSpeed, U = H.causticScale ?? H.fluidScale;
      t.uniform1f(this.uFluidBright, O), t.uniform1f(this.uFluidSpeed, L), t.uniform1f(this.uFluidScale, U), t.uniform1f(this.uFluidAuraWidth, (H.fluidAuraWidth ?? 4) * this.dpr), t.uniform1f(this.uFluidCenter, H.fluidCenter ?? 0), t.uniform1f(this.uAuroraFlow, H.auroraFlow ?? 75), t.uniform1f(this.uLightTrack, H.lightTrack), t.uniform1f(this.uHoverBright, H.hoverBright), t.uniform1f(this.uClickWave, H.clickWave);
      let X = this.pointerStates.get(f);
      if (!X && !this.attachedEls.has(f)) {
        for (const [M, N] of this.pointerStates.entries())
          if (M.contains(f) || f.contains(M)) {
            X = N;
            break;
          }
      }
      t.uniform1f(this.uHoverStrength, X ? X.curHover : 0), t.uniform2f(
        this.uMousePos,
        X ? X.curMouseX : 0,
        X ? X.curMouseY : 0
      ), t.uniform2f(
        this.uClickPos,
        X ? X.clickPos[0] : -999,
        X ? X.clickPos[1] : -999
      ), t.uniform1f(this.uClickTime, X ? X.clickTime : -999), t.drawArrays(t.TRIANGLES, 0, 6);
    }), t.disable(t.SCISSOR_TEST), t.disable(t.BLEND);
  }
  teardown() {
    this.stopLoop(), window.removeEventListener("resize", this.handleResize), typeof document < "u" && document.removeEventListener("visibilitychange", this.handleVisibilityChange), this.resizeObserver && (this.resizeObserver.disconnect(), this.resizeObserver = null), this.gl && this.prog && (this.gl.deleteProgram(this.prog), this.quadBuf && this.gl.deleteBuffer(this.quadBuf), this.bgTexture && this.gl.deleteTexture(this.bgTexture), this.sceneTexture && this.gl.deleteTexture(this.sceneTexture), this.textMaskTexture && this.gl.deleteTexture(this.textMaskTexture), this.gl = null, this.prog = null, this.sceneTexture = null, this.textMaskTexture = null, this.cleanBgCanvas = null, this.cleanBgCtx = null, this.bgPatchCanvas = null, this.bgPatchCtx = null);
  }
}
const Yt = [
  // Track 01: SOLARIS PHASE — 114 BPM, 228s, F Minor 9 Melodic Electronica
  {
    bpm: 114,
    durationSec: 228,
    chords: [
      [53, 56, 60, 67],
      // Fm9 (F3, Ab3, C4, G4)
      [49, 53, 56, 63],
      // Dbmaj9 (Db3, F3, Ab3, Eb4)
      [56, 60, 63, 67],
      // Abmaj7 (Ab3, C4, Eb4, G4)
      [51, 55, 58, 65]
      // Eb9 (Eb3, G3, Bb3, F4)
    ],
    altChords: [
      [58, 61, 65, 72],
      // Bbm9 (Bb3, Db4, F4, C5)
      [56, 60, 63, 70],
      // Abmaj9 (Ab3, C4, Eb4, Bb4)
      [49, 53, 56, 65],
      // Dbmaj7#11 (Db3, F3, Ab3, F4)
      [55, 58, 64, 67]
      // C7alt / Edim (G3, Bb3, E4, G4)
    ],
    bassNotes: [29, 25, 32, 27],
    // F1, Db1, Ab1, Eb1
    altBassNotes: [34, 32, 25, 36],
    // Bb1, Ab1, Db1, C2
    arpPattern: [0, 2, 3, 2, 1, 3, 2, 0, 0, 2, 3, 1, 2, 3, 1, 0],
    leadPattern: [3, -1, -1, 2, -1, 3, 1, -1, 2, -1, 3, -1, 1, 2, 0, -1],
    style: "solaris"
  },
  // Track 02: OBSIDIAN BLOOM — 92 BPM, 256s, D Dorian Warm Halftime Synthwave
  {
    bpm: 92,
    durationSec: 256,
    chords: [
      [50, 53, 57, 64],
      // Dm9 (D3, F3, A3, E4)
      [55, 58, 62, 65],
      // Gm7 (G3, Bb3, D4, F4)
      [46, 50, 53, 60],
      // Bbmaj9 (Bb2, D3, F3, C4)
      [45, 52, 55, 61]
      // A7sus/A7 (A2, E3, G3, C#4)
    ],
    altChords: [
      [53, 57, 60, 67],
      // Fmaj9 (F3, A3, C4, G4)
      [52, 55, 59, 64],
      // Em7 (E3, G3, B3, E4)
      [46, 50, 57, 62],
      // Bbmaj7 (Bb2, D3, A3, D4)
      [45, 52, 57, 64]
      // Asus4 (A2, E3, A3, E4)
    ],
    bassNotes: [26, 31, 34, 33],
    // D1, G1, Bb1, A1
    altBassNotes: [29, 28, 34, 33],
    // F1, E1, Bb1, A1
    arpPattern: [3, -1, 2, 1, -1, 3, 2, -1, 1, -1, 0, 2, -1, 1, 0, -1],
    leadPattern: [-1, 3, 2, -1, 1, -1, 3, 2, -1, 0, 1, -1, 2, -1, 3, -1],
    style: "obsidian"
  },
  // Track 03: CAUSTIC HORIZON — 126 BPM, 192s, A Minor 11 Atmospheric Liquid Breakbeat
  {
    bpm: 126,
    durationSec: 192,
    chords: [
      [57, 60, 64, 71],
      // Am9 (A3, C4, E4, B4)
      [53, 57, 60, 67],
      // Fmaj9 (F3, A3, C4, G4)
      [48, 55, 59, 64],
      // Cmaj7 (C3, G3, B3, E4)
      [55, 59, 62, 69]
      // G6 (G3, B3, D4, A4)
    ],
    altChords: [
      [50, 53, 57, 64],
      // Dm9 (D3, F3, A3, E4)
      [52, 56, 59, 64],
      // E7 (E3, G#3, B3, E4)
      [57, 60, 64, 69],
      // Am7 (A3, C4, E4, A4)
      [53, 57, 60, 64]
      // Fmaj7 (F3, A3, C4, E4)
    ],
    bassNotes: [33, 29, 36, 31],
    // A1, F1, C2, G1
    altBassNotes: [26, 28, 33, 29],
    // D1, E1, A1, F1
    arpPattern: [0, 1, 2, 3, 2, 1, 3, 2, 0, 3, 2, 1, 3, 2, 1, 0],
    leadPattern: [3, 2, -1, 1, 3, -1, 2, 0, 3, -1, 1, 2, -1, 3, 2, -1],
    style: "caustic"
  }
];
function he(m) {
  return m < 0.14 ? "intro" : m < 0.32 ? "verse" : m < 0.56 ? "chorus" : m < 0.72 ? "bridge" : m < 0.9 ? "climax" : "outro";
}
function Jt(m) {
  switch (he(m)) {
    case "intro":
      return 1650 + m / 0.14 * 1050;
    case "verse":
      return 2750;
    case "chorus":
      return 4800;
    case "bridge": {
      const e = (m - 0.56) / 0.16;
      return 1650 + Math.sin(e * Math.PI) * 1400;
    }
    case "climax":
      return 5800;
    case "outro": {
      const e = (m - 0.9) / 0.1;
      return Math.max(700, 2600 * (1 - e * 0.72));
    }
  }
}
function Vt(m) {
  return 440 * Math.pow(2, (m - 69) / 12);
}
class Re {
  constructor() {
    l(this, "ctx", null);
    l(this, "masterGain", null);
    l(this, "musicBus", null);
    l(this, "filterNode", null);
    l(this, "analyser", null);
    l(this, "delayLeft", null);
    l(this, "delayRight", null);
    l(this, "noiseBuffer", null);
    l(this, "fftData", null);
    l(this, "timeDomainData", null);
    l(this, "smoothedBars", new Float32Array(72));
    l(this, "smoothedIdleBars", new Float32Array(72));
    l(this, "smoothedGlowBars", new Float32Array(72));
    l(this, "lastActivePlayTime", -999);
    l(this, "isPlaying", !1);
    l(this, "trackIndex", 0);
    l(this, "progress", 0);
    l(this, "currentStep", 0);
    l(this, "nextStepTime", 0);
    l(this, "lastSeekAudioTime", 0);
    l(this, "schedulerTimer", null);
  }
  getTotalSteps(t) {
    const e = 60 / t.bpm / 4;
    return Math.max(64, Math.round(t.durationSec / e));
  }
  ensureContext() {
    if (this.ctx) return;
    const t = window.AudioContext || window.webkitAudioContext;
    if (!t) return;
    const e = new t();
    this.ctx = e;
    const i = e.createGain();
    i.gain.value = 1e-4, this.masterGain = i;
    const n = e.createBiquadFilter();
    n.type = "lowpass", n.frequency.value = Jt(this.progress), n.Q.value = 0.85, this.filterNode = n;
    const r = e.createGain();
    r.gain.value = 1, this.musicBus = r;
    const c = e.createDynamicsCompressor();
    c.threshold.value = -14, c.knee.value = 10, c.ratio.value = 3.5, c.attack.value = 4e-3, c.release.value = 0.16;
    const s = e.createAnalyser();
    s.fftSize = 2048, s.minDecibels = -80, s.maxDecibels = -10, s.smoothingTimeConstant = 0.72, this.analyser = s, this.fftData = new Uint8Array(s.frequencyBinCount), this.timeDomainData = new Uint8Array(s.fftSize);
    const u = e.createDelay(1), v = e.createDelay(1);
    u.delayTime.value = 0.26, v.delayTime.value = 0.39;
    const p = e.createGain(), o = e.createGain();
    p.gain.value = 0.32, o.gain.value = 0.32;
    const g = e.createGain();
    g.gain.value = 0.28;
    const R = e.createChannelMerger(2);
    u.connect(p), p.connect(v), v.connect(o), o.connect(u), u.connect(R, 0, 0), v.connect(R, 0, 1), R.connect(g), this.delayLeft = u, this.delayRight = v, r.connect(n), n.connect(i), n.connect(u), g.connect(i), i.connect(c), c.connect(s), s.connect(e.destination);
    const S = e.sampleRate * 1, V = e.createBuffer(1, S, e.sampleRate), A = V.getChannelData(0);
    for (let a = 0; a < S; a++)
      A[a] = Math.random() * 2 - 1;
    this.noiseBuffer = V;
  }
  /**
   * Smoothly fades out the active musicBus over 18ms and replaces it with a fresh bus
   * so sustained pad chords and bass notes from a previous timeline section stop cleanly.
   */
  flushMusicBus() {
    if (!this.ctx || !this.filterNode) return;
    const t = this.ctx.currentTime, e = this.musicBus;
    if (e)
      try {
        e.gain.cancelScheduledValues(t), e.gain.setValueAtTime(Math.max(1e-4, e.gain.value), t), e.gain.exponentialRampToValueAtTime(1e-4, t + 0.018), window.setTimeout(() => {
          try {
            e.disconnect();
          } catch {
          }
        }, 35);
      } catch {
      }
    const i = this.ctx.createGain();
    i.gain.setValueAtTime(1e-4, t), i.gain.linearRampToValueAtTime(1, t + 0.015), i.connect(this.filterNode), this.musicBus = i;
  }
  setPlaying(t) {
    if (this.isPlaying = t, t) {
      if (this.ensureContext(), !this.ctx || !this.masterGain) return;
      this.ctx.state === "suspended" && this.ctx.resume().catch(() => {
      });
      const e = Yt[this.trackIndex], i = this.getTotalSteps(e);
      this.currentStep = Math.min(i - 1, Math.floor(this.progress * i));
      const n = this.ctx.currentTime;
      this.filterNode && this.filterNode.frequency.setTargetAtTime(Jt(this.progress), n, 0.04), this.masterGain.gain.cancelScheduledValues(n), this.masterGain.gain.setTargetAtTime(0.9, n, 0.05), this.flushMusicBus();
      const r = 60 / e.bpm / 4;
      this.triggerStep(this.currentStep, n + 0.01, r, e, !0), this.currentStep = (this.currentStep + 1) % i, this.nextStepTime = n + 0.01 + r, this.schedulerTimer === null && (this.schedulerTimer = window.setInterval(() => this.scheduleSteps(), 25));
    } else {
      if (this.ctx && this.masterGain) {
        const e = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(e), this.masterGain.gain.setTargetAtTime(1e-4, e, 0.06);
      }
      this.schedulerTimer !== null && (clearInterval(this.schedulerTimer), this.schedulerTimer = null);
    }
  }
  setTrack(t) {
    const e = (t % Yt.length + Yt.length) % Yt.length, i = e !== this.trackIndex;
    if (this.trackIndex = e, i) {
      const n = Yt[this.trackIndex], r = this.getTotalSteps(n);
      if (this.currentStep = Math.min(r - 1, Math.floor(this.progress * r)), this.ctx && this.delayLeft && this.delayRight) {
        const c = 60 / n.bpm / 4;
        this.delayLeft.delayTime.setTargetAtTime(c * 3, this.ctx.currentTime, 0.05), this.delayRight.delayTime.setTargetAtTime(c * 4, this.ctx.currentTime, 0.05);
      }
      if (this.isPlaying && this.ctx) {
        this.flushMusicBus();
        const c = this.ctx.currentTime, s = 60 / n.bpm / 4;
        this.triggerStep(this.currentStep, c + 0.01, s, n, !0), this.currentStep = (this.currentStep + 1) % r, this.nextStepTime = c + 0.01 + s;
      }
    }
  }
  getProgress() {
    return this.progress;
  }
  seek(t) {
    const e = Math.max(0, Math.min(1, t));
    this.progress = e;
    const i = Yt[this.trackIndex], n = this.getTotalSteps(i), r = Math.min(n - 1, Math.floor(e * n)), c = r !== this.currentStep;
    if (this.currentStep = r, !this.ctx || !this.filterNode) return;
    const s = this.ctx.currentTime, u = Jt(e);
    if (this.filterNode.frequency.cancelScheduledValues(s), this.filterNode.frequency.setTargetAtTime(u, s, 0.03), this.isPlaying && c) {
      const v = performance.now(), p = 60 / i.bpm / 4;
      v - this.lastSeekAudioTime >= 60 ? (this.lastSeekAudioTime = v, this.flushMusicBus(), this.triggerStep(this.currentStep, s + 8e-3, p, i, !0), this.currentStep = (this.currentStep + 1) % n, this.nextStepTime = s + 8e-3 + p) : this.nextStepTime = Math.min(this.nextStepTime, s + p * 0.5);
    }
  }
  scheduleSteps() {
    if (!this.ctx || !this.isPlaying) return;
    const t = Yt[this.trackIndex], e = 60 / t.bpm / 4, i = this.getTotalSteps(t);
    for (; this.nextStepTime < this.ctx.currentTime + 0.12; ) {
      if (this.progress = this.currentStep / i, this.filterNode) {
        const n = Jt(this.progress);
        this.filterNode.frequency.setTargetAtTime(n, this.nextStepTime, 0.08);
      }
      this.triggerStep(this.currentStep, this.nextStepTime, e, t, !1), this.nextStepTime += e, this.currentStep = (this.currentStep + 1) % i;
    }
  }
  triggerStep(t, e, i, n, r) {
    if (!this.ctx || !this.musicBus) return;
    const c = this.getTotalSteps(n), s = t / c, u = he(s), v = Math.floor(t / 16), p = v % 4, o = t % 16, g = u === "bridge" || u === "climax" && Math.floor(v / 4) % 2 === 1, R = g ? n.altChords[p] : n.chords[p], S = g ? n.altBassNotes[p] : n.bassNotes[p];
    if (o === 0 || n.style === "caustic" && o === 8 || r) {
      const f = n.style === "caustic" ? 8 - o % 8 : 16 - o, h = Math.max(2, f) * i, P = u === "bridge" || u === "climax" || u === "outro" ? 12 : 0, F = u === "chorus" || u === "climax";
      this.triggerPadChord(R, e, h, n.style, P, F);
    }
    if (u === "intro" || u === "outro") {
      if (o === 0 || r) {
        const f = Math.max(2, 12 - o) * i;
        this.triggerBass(Vt(S), e, f, n.style, 0.2);
      }
    } else if (u === "bridge")
      (o === 0 || o === 8 || r) && this.triggerBass(Vt(S), e, i * 6.5, n.style, 0.24);
    else {
      const f = u === "climax" && o % 4 === 2 ? 12 : 0;
      if (n.style === "solaris") {
        if (o % 4 === 2 || o === 7 || o === 15 || r) {
          const h = o === 15 ? 12 : f;
          this.triggerBass(Vt(S + h), e, i * 2.2, "solaris", 0.3);
        }
      } else if (n.style === "obsidian") {
        if (o === 0 || o === 10 || u === "climax" && o === 6 || r) {
          const h = o === 0 ? i * 6.5 : i * 4.5;
          this.triggerBass(Vt(S + f), e, h, "obsidian", 0.3);
        }
      } else if (o === 0 || o === 3 || o === 6 || o === 10 || o === 12 || r) {
        const h = o === 6 ? 12 : f;
        this.triggerBass(Vt(S + h), e, i * 2.4, "caustic", 0.3);
      }
    }
    const A = n.arpPattern[o], a = u === "intro" || u === "outro" ? o % 2 === 0 : !0;
    if (A >= 0 && a) {
      const f = R[A % R.length];
      let h = n.style === "caustic" && o % 2 === 1 ? 24 : 12;
      u === "climax" && (h += 12);
      const P = Vt(f + h);
      this.triggerArpNote(P, e, i, n.style, u === "intro" ? 0.095 : 0.115);
    }
    if (u === "chorus" || u === "bridge" || u === "climax") {
      const f = n.leadPattern[o];
      if (f >= 0) {
        const h = R[f % R.length] + (u === "bridge" ? 24 : 19);
        this.triggerLeadNote(Vt(h), e, i * 2.4, n.style);
      }
    }
    if (u === "intro")
      (o === 0 || o === 8) && this.triggerKick(e, 0.28), o % 4 === 2 && this.triggerHat(e, 0.055, 0.05);
    else if (u === "bridge")
      o === 8 && this.triggerSnare(e, 0.095), o % 2 === 0 && this.triggerHat(e, 0.042, 0.045);
    else if (u === "outro")
      o % 4 === 0 && this.triggerHat(e, 0.038, 0.04);
    else {
      const f = u === "chorus" || u === "climax", h = u === "climax" && p === 3 && o >= 12;
      n.style === "solaris" ? (o % 4 === 0 && this.triggerKick(e, f ? 0.42 : 0.34), f && (o === 4 || o === 12) && this.triggerSnare(e, 0.115), h && this.triggerSnare(e, 0.095), o % 4 === 2 ? this.triggerHat(e, 0.08, 0.08) : f && o % 2 === 1 && this.triggerHat(e, 0.042, 0.04)) : n.style === "obsidian" ? ((o === 0 || o === 6 || o === 10) && this.triggerKick(e, f ? 0.44 : 0.35), (o === 8 || h) && this.triggerSnare(e, f ? 0.155 : 0.115), (o % 2 === 0 || f && o % 4 === 3) && this.triggerHat(e, 0.048, 0.05)) : ((o === 0 || o === 10 || u === "climax" && o === 6) && this.triggerKick(e, f ? 0.4 : 0.32), (o === 4 || o === 12 || h) && this.triggerSnare(e, f ? 0.14 : 0.095), (f || o % 2 === 0) && this.triggerHat(e, o % 2 === 0 ? 0.058 : 0.032, 0.035));
    }
  }
  triggerPadChord(t, e, i, n, r, c) {
    if (!this.ctx || !this.musicBus) return;
    const s = this.ctx, u = this.musicBus;
    (c ? [...t, t[0] + 12 + r] : t.map((p, o) => o >= 2 ? p + r : p)).forEach((p, o) => {
      const g = s.createOscillator(), R = s.createGain();
      g.type = n === "obsidian" ? "sawtooth" : o % 2 === 0 ? "triangle" : "sine", g.frequency.setValueAtTime(Vt(p), e), g.detune.setValueAtTime((o - 1.5) * 8, e);
      const S = n === "obsidian" ? 0.062 : 0.078;
      R.gain.setValueAtTime(1e-4, e), R.gain.linearRampToValueAtTime(S, e + Math.min(0.18, i * 0.25)), R.gain.exponentialRampToValueAtTime(1e-4, e + i), g.connect(R), R.connect(u), g.start(e), g.stop(e + i + 0.02);
    });
  }
  triggerBass(t, e, i, n, r) {
    if (!this.ctx || !this.musicBus) return;
    const c = this.ctx, s = this.musicBus, u = c.createOscillator(), v = c.createOscillator(), p = c.createBiquadFilter(), o = c.createGain();
    u.type = n === "caustic" ? "triangle" : "sawtooth", u.frequency.setValueAtTime(t, e), v.type = "sine", v.frequency.setValueAtTime(t, e), p.type = "lowpass", p.frequency.setValueAtTime(n === "obsidian" ? 280 : 440, e), p.frequency.exponentialRampToValueAtTime(110, e + i), o.gain.setValueAtTime(1e-4, e), o.gain.linearRampToValueAtTime(r, e + 0.015), o.gain.exponentialRampToValueAtTime(1e-4, e + i), u.connect(p), v.connect(p), p.connect(o), o.connect(s), u.start(e), v.start(e), u.stop(e + i + 0.02), v.stop(e + i + 0.02);
  }
  triggerArpNote(t, e, i, n, r) {
    if (!this.ctx || !this.musicBus) return;
    const c = this.ctx, s = c.createOscillator(), u = c.createGain();
    s.type = n === "solaris" ? "triangle" : "sine", s.frequency.setValueAtTime(t, e);
    const v = n === "obsidian" ? i * 3 : i * 1.6;
    u.gain.setValueAtTime(1e-4, e), u.gain.linearRampToValueAtTime(r, e + 8e-3), u.gain.exponentialRampToValueAtTime(1e-4, e + v), s.connect(u), u.connect(this.musicBus), s.start(e), s.stop(e + v + 0.02);
  }
  triggerLeadNote(t, e, i, n) {
    if (!this.ctx || !this.musicBus) return;
    const r = this.ctx, c = r.createOscillator(), s = r.createGain();
    c.type = n === "obsidian" ? "sawtooth" : "triangle", c.frequency.setValueAtTime(t, e), c.detune.setValueAtTime(6, e);
    const u = n === "obsidian" ? 0.065 : 0.08;
    s.gain.setValueAtTime(1e-4, e), s.gain.linearRampToValueAtTime(u, e + 0.014), s.gain.exponentialRampToValueAtTime(1e-4, e + i), c.connect(s), s.connect(this.musicBus), c.start(e), c.stop(e + i + 0.02);
  }
  triggerKick(t, e) {
    if (!this.ctx || !this.musicBus) return;
    const i = this.ctx, n = i.createOscillator(), r = i.createGain();
    n.type = "sine", n.frequency.setValueAtTime(132, t), n.frequency.exponentialRampToValueAtTime(42, t + 0.09), n.frequency.exponentialRampToValueAtTime(28, t + 0.24), r.gain.setValueAtTime(1e-4, t), r.gain.linearRampToValueAtTime(e, t + 5e-3), r.gain.exponentialRampToValueAtTime(1e-4, t + 0.25), n.connect(r), r.connect(this.musicBus), n.start(t), n.stop(t + 0.26);
  }
  triggerSnare(t, e) {
    if (!this.ctx || !this.musicBus || !this.noiseBuffer) return;
    const i = this.ctx, n = i.createBufferSource();
    n.buffer = this.noiseBuffer;
    const r = i.createBiquadFilter();
    r.type = "bandpass", r.frequency.setValueAtTime(1850, t), r.Q.setValueAtTime(1.2, t);
    const c = i.createGain();
    c.gain.setValueAtTime(1e-4, t), c.gain.linearRampToValueAtTime(e, t + 4e-3), c.gain.exponentialRampToValueAtTime(1e-4, t + 0.14), n.connect(r), r.connect(c), c.connect(this.musicBus), n.start(t), n.stop(t + 0.15);
  }
  triggerHat(t, e, i) {
    if (!this.ctx || !this.musicBus || !this.noiseBuffer) return;
    const n = this.ctx, r = n.createBufferSource();
    r.buffer = this.noiseBuffer;
    const c = n.createBiquadFilter();
    c.type = "highpass", c.frequency.setValueAtTime(6800, t);
    const s = n.createGain();
    s.gain.setValueAtTime(1e-4, t), s.gain.linearRampToValueAtTime(e, t + 2e-3), s.gain.exponentialRampToValueAtTime(1e-4, t + i), r.connect(c), c.connect(s), s.connect(this.musicBus), r.start(t), r.stop(t + i + 0.01);
  }
  /**
   * Populates `outBars` with normalized [0..1] real-time audio spectrum amplitudes
   * driven 100% by the Web Audio API AnalyserNode (FFT + Time-Domain waveform).
   */
  getSpectrumBars(t, e, i = 0) {
    var v, p;
    const n = this.isPlaying && this.analyser !== null && this.fftData !== null && this.timeDomainData !== null && ((v = this.ctx) == null ? void 0 : v.state) === "running";
    n && this.analyser && this.fftData && this.timeDomainData && (this.analyser.getByteFrequencyData(this.fftData), this.analyser.getByteTimeDomainData(this.timeDomainData));
    const r = this.fftData ? this.fftData.length : 0, s = (((p = this.ctx) == null ? void 0 : p.sampleRate) || 48e3) * 0.5 / Math.max(1, r), u = (o, g) => {
      if (!this.fftData || r === 0) return 0;
      const R = o / s, S = Math.max(1, Math.floor(R - g)), V = Math.min(r - 1, Math.ceil(R + g));
      let A = 0, a = 0;
      for (let f = S; f <= V; f++) {
        const h = Math.abs(f - R) / Math.max(1, g + 0.5), P = Math.max(0.15, 1 - h * 0.75);
        A += this.fftData[f] / 255 * P, a += P;
      }
      return a > 0 ? A / a : 0;
    };
    for (let o = 0; o < t; o++) {
      const g = t > 1 ? o / (t - 1) : 0.5;
      let R = 0;
      if (n && this.fftData && this.timeDomainData && r > 0) {
        const a = Math.abs(g - 0.5) * 2, f = g < 0.5 ? 0 : 0.035, h = Math.min(1, a * 0.92 + f), P = 48 * Math.pow(3200 / 48, h), F = u(P, 2 + Math.floor(h * 5)), G = Math.pow(P / 90, 0.24), Y = Math.min(1, F * G), $ = 1800 * Math.pow(8600 / 1800, h), z = Math.min(1, u($, 6) * 1.45), et = this.timeDomainData.length, it = Math.floor(g * (et - 16));
        let Q = 0;
        for (let x = 0; x < 16; x++) {
          const q = Math.abs((this.timeDomainData[it + x] - 128) / 128);
          q > Q && (Q = q);
        }
        const k = Math.min(1, Q * 2.6), C = Y * 0.68 + z * 0.22 + k * 0.32;
        R = C > 0.01 ? Math.min(1, Math.pow(C, 0.88)) : 0;
      }
      const S = this.smoothedBars[o] || 0, V = R > S ? 0.34 : 0.16;
      let A = S + (R - S) * V;
      !this.isPlaying && A < 2e-3 && (A = 0), this.smoothedBars[o] = A, e[o] = A;
    }
  }
  /**
   * Populates `outSignedBars` with a periodic [-1..1] traveling sine wave packet
   * from left to right when playback is paused, and optionally `outGlowBars` with [0..1]
   * local illumination (0 at rest, 1 inside the passing wave or during active playback).
   */
  getIdleWaveBars(t, e, i = 0, n) {
    this.isPlaying && (this.lastActivePlayTime = i);
    const r = this.lastActivePlayTime > -100 ? i - this.lastActivePlayTime : 999, c = !this.isPlaying && r > 0.75, s = 3.9, u = 2.35, p = ((this.lastActivePlayTime > -100 ? Math.max(0, r - 0.75) : i) % s + s) % s, o = c && p < u, g = o ? p / u : 0, R = -0.38 + g * 1.76, S = 0.44, V = o ? Math.pow(Math.sin(g * Math.PI), 0.6) : 0;
    for (let A = 0; A < t; A++) {
      const a = t > 1 ? A / (t - 1) : 0.5;
      let f = 0, h = this.isPlaying ? 1 : 0;
      if (o) {
        const et = a - R;
        if (Math.abs(et) < S) {
          const it = et / S, Q = 0.5 * (1 + Math.cos(it * Math.PI)), k = Q * Math.sqrt(Q), C = 0.35 + 0.65 * Math.pow(Math.sin(a * Math.PI), 0.5), x = -it * Math.PI * 1.65;
          f = Math.sin(x) * k * C * V * 1.32, h = Math.min(
            1,
            Math.max(k * C * V * 1.18, Math.abs(f) * 1.15)
          );
        }
      }
      const P = this.smoothedIdleBars[A] || 0, F = this.isPlaying ? 0.28 : 0.2;
      let G = P + (f - P) * F;
      Math.abs(G) < 1e-3 && (G = 0), this.smoothedIdleBars[A] = G, e[A] = G;
      const Y = this.smoothedGlowBars[A] || 0, $ = h > Y ? 0.24 : 0.14;
      let z = Y + (h - Y) * $;
      z < 1e-3 && (z = 0), this.smoothedGlowBars[A] = z, n && (n[A] = z);
    }
  }
  dispose() {
    this.schedulerTimer !== null && (clearInterval(this.schedulerTimer), this.schedulerTimer = null), this.ctx && (this.ctx.close().catch(() => {
    }), this.ctx = null);
  }
}
let ee = null;
function Nt() {
  return ee || (ee = new Re()), ee;
}
const Ie = ({
  children: m,
  refraction: t,
  thickness: e,
  bevelWidth: i,
  frost: n,
  dispersion: r,
  sheen: c,
  lightAngle: s,
  darkness: u,
  rim: v,
  fluidBrightness: p,
  fluidSpeed: o,
  fluidScale: g,
  fluidAuraWidth: R,
  fluidCenter: S,
  auroraFlow: V,
  causticBrightness: A,
  causticSpeed: a,
  causticScale: f,
  hoverBrightness: h,
  trackCursorLight: P = !0,
  lightTrackingStrength: F,
  clickShockwave: G = !0,
  shockwaveStrength: Y,
  overlayZIndex: $ = 2,
  className: z = "",
  style: et,
  ...it
}) => {
  const Q = Ht(), k = ct(null), C = ct(null), x = Tt, q = ct({
    radius: 20,
    refraction: t ?? x.refraction,
    thickness: e ?? x.thickness,
    bevelWidth: i ?? x.bevelWidth,
    frost: n ?? x.frost,
    dispersion: r ?? x.dispersion,
    sheen: c ?? x.sheen,
    lightAngle: s ?? x.lightAngle,
    darkness: u ?? x.darkness,
    rim: v ?? x.rim,
    fluidBright: p ?? x.fluidBright,
    fluidSpeed: o ?? x.fluidSpeed,
    fluidScale: g ?? x.fluidScale,
    fluidAuraWidth: R ?? x.fluidAuraWidth,
    fluidCenter: S ?? x.fluidCenter,
    auroraFlow: V ?? x.auroraFlow,
    hoverBright: h ?? x.hoverBright,
    lightTrack: P ? F ?? x.lightTrack : 0,
    clickWave: G ? Y ?? x.clickWave : 0
  });
  return vt(() => {
    q.current = {
      ...q.current,
      refraction: t ?? x.refraction,
      thickness: e ?? x.thickness,
      bevelWidth: i ?? x.bevelWidth,
      frost: n ?? x.frost,
      dispersion: r ?? x.dispersion,
      sheen: c ?? x.sheen,
      lightAngle: s ?? x.lightAngle,
      darkness: u ?? x.darkness,
      rim: v ?? x.rim,
      fluidBright: A ?? p ?? x.fluidBright,
      fluidSpeed: a ?? o ?? x.fluidSpeed,
      fluidScale: f ?? g ?? x.fluidScale,
      fluidAuraWidth: R ?? x.fluidAuraWidth,
      fluidCenter: S ?? x.fluidCenter,
      auroraFlow: V ?? x.auroraFlow,
      causticBright: A ?? p ?? x.fluidBright,
      causticSpeed: a ?? o ?? x.fluidSpeed,
      causticScale: f ?? g ?? x.fluidScale,
      hoverBright: h ?? x.hoverBright,
      lightTrack: P ? F ?? x.lightTrack : 0,
      clickWave: G ? Y ?? x.clickWave : 0
    };
  }, [
    t,
    e,
    i,
    n,
    r,
    c,
    s,
    u,
    v,
    p,
    o,
    g,
    R,
    S,
    V,
    A,
    a,
    f,
    h,
    P,
    F,
    G,
    Y
  ]), vt(() => {
    const B = k.current, H = C.current;
    if (!B || !H) return;
    const ft = H.getContext("2d", { alpha: !0 });
    if (!ft) return;
    const O = It(), L = {
      id: Q,
      canvas: H,
      ctx: ft,
      getParams: () => {
        if (!B) return q.current;
        const y = Math.min(window.devicePixelRatio || 1, 2), d = window.getComputedStyle(B), E = parseFloat(d.borderRadius), b = Math.min(B.offsetWidth, B.offsetHeight) * 0.5 * y, W = !isNaN(E) && E >= 0 ? E * y : b;
        return q.current.radius = Math.min(W, b), q.current;
      },
      getSwitchThumb: () => {
        if (!B) return null;
        const y = B.querySelector(
          ".switch-thumb, [data-switch-thumb], .tabs-indicator, [data-tabs-indicator]"
        );
        if (!y) return null;
        const d = Math.min(window.devicePixelRatio || 1, 2), E = B.getBoundingClientRect(), b = y.getBoundingClientRect();
        if (b.width <= 0 || b.height <= 0) return null;
        const W = (b.left + b.width * 0.5 - (E.left + E.width * 0.5)) * d, ot = (E.top + E.height * 0.5 - (b.top + b.height * 0.5)) * d, at = b.width * 0.5 * d, tt = b.height * 0.5 * d;
        return [W, ot, at, tt];
      },
      curHover: 0,
      targetHover: 0,
      curMouseX: 0,
      curMouseY: 0,
      targetMouseX: 0,
      targetMouseY: 0,
      clickPos: [-999, -999],
      clickTime: -999,
      visible: !0
    }, U = () => {
      const y = Math.min(window.devicePixelRatio || 1, 2), d = Math.round(B.offsetWidth * y), E = Math.round(B.offsetHeight * y);
      (H.width !== d || H.height !== E) && (H.width = d, H.height = E);
    };
    U();
    let X = null;
    typeof ResizeObserver < "u" && (X = new ResizeObserver(() => U()), X.observe(B));
    let Z = null;
    typeof IntersectionObserver < "u" && (Z = new IntersectionObserver(([y]) => {
      L.visible = y.isIntersecting;
    }), Z.observe(B));
    const J = (y) => {
      const d = B.getBoundingClientRect(), E = d.left + d.width * 0.5, b = d.top + d.height * 0.5, W = Math.min(window.devicePixelRatio || 1, 2);
      L.targetMouseX = (y.clientX - E) * W, L.targetMouseY = (b - y.clientY) * W;
    }, M = (y) => {
      L.targetHover = 1, J(y);
    }, N = (y) => {
      L.targetHover = 1, J(y);
    }, T = () => {
      L.targetHover = 0;
    }, _ = (y) => {
      J(y), L.clickPos = [L.targetMouseX, L.targetMouseY], L.clickTime = O.getTime();
    };
    return B.addEventListener("pointerenter", M), B.addEventListener("pointermove", N), B.addEventListener("pointerleave", T), B.addEventListener("pointerdown", _), O.register(L), () => {
      O.unregister(Q), B.removeEventListener("pointerenter", M), B.removeEventListener("pointermove", N), B.removeEventListener("pointerleave", T), B.removeEventListener("pointerdown", _), X && X.disconnect(), Z && Z.disconnect();
    };
  }, [Q]), /* @__PURE__ */ ht(
    "div",
    {
      ref: k,
      className: `tactile-glass-fx ${z}`.trim(),
      style: {
        position: "relative",
        display: "inline-flex",
        overflow: "hidden",
        WebkitTapHighlightColor: "transparent",
        ...et
      },
      ...it,
      children: [
        /* @__PURE__ */ D(
          "canvas",
          {
            ref: C,
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              borderRadius: "inherit",
              zIndex: $
            }
          }
        ),
        /* @__PURE__ */ D(
          "div",
          {
            style: {
              position: "relative",
              zIndex: $ + 1,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: m
          }
        )
      ]
    }
  );
}, de = ({
  children: m,
  size: t = "xl",
  shape: e = "pill",
  className: i = "",
  refraction: n = Tt.refraction,
  thickness: r = Tt.thickness,
  bevelWidth: c = Tt.bevelWidth,
  frost: s = Tt.frost,
  dispersion: u = Tt.dispersion,
  sheen: v = Tt.sheen,
  lightAngle: p = Tt.lightAngle,
  darkness: o = Tt.darkness,
  rim: g = Tt.rim,
  fluidBrightness: R = Tt.fluidBright,
  fluidSpeed: S = Tt.fluidSpeed,
  fluidScale: V = Tt.fluidScale,
  fluidAuraWidth: A = Tt.fluidAuraWidth,
  fluidCenter: a = Tt.fluidCenter,
  auroraFlow: f = Tt.auroraFlow,
  causticBrightness: h,
  causticSpeed: P,
  causticScale: F,
  fluidDispersion: G,
  hoverBrightness: Y = Tt.hoverBright,
  trackCursorLight: $ = !0,
  lightTrackingStrength: z = Tt.lightTrack,
  clickShockwave: et = !0,
  shockwaveStrength: it = Tt.clickWave,
  onClick: Q,
  ...k
}) => {
  const C = Ht(), x = ct(null), q = ct(null), B = G !== void 0 ? G : u, H = ct({
    radius: 20,
    refraction: n,
    thickness: r,
    bevelWidth: c,
    frost: s,
    dispersion: B,
    sheen: v,
    lightAngle: p,
    darkness: o,
    rim: g,
    fluidBright: R,
    fluidSpeed: S,
    fluidScale: V,
    fluidAuraWidth: A,
    fluidCenter: a,
    auroraFlow: f,
    hoverBright: Y,
    lightTrack: $ ? z : 0,
    clickWave: et ? it : 0
  });
  vt(() => {
    H.current = {
      ...H.current,
      refraction: n,
      thickness: r,
      bevelWidth: c,
      frost: s,
      dispersion: B,
      sheen: v,
      lightAngle: p,
      darkness: o,
      rim: g,
      fluidBright: h ?? R,
      fluidSpeed: P ?? S,
      fluidScale: F ?? V,
      fluidAuraWidth: A,
      fluidCenter: a,
      auroraFlow: f,
      causticBright: h ?? R,
      causticSpeed: P ?? S,
      causticScale: F ?? V,
      hoverBright: Y,
      lightTrack: $ ? z : 0,
      clickWave: et ? it : 0
    };
  }, [
    n,
    r,
    c,
    s,
    B,
    v,
    p,
    o,
    g,
    R,
    S,
    V,
    A,
    a,
    f,
    h,
    P,
    F,
    Y,
    $,
    z,
    et,
    it
  ]), vt(() => {
    const O = x.current, L = q.current;
    if (!O || !L) return;
    const U = L.getContext("2d", { alpha: !0 });
    if (!U) return;
    const X = It(), Z = {
      id: C,
      canvas: L,
      ctx: U,
      getParams: () => {
        const E = L.height;
        return H.current.radius = E * 0.5, H.current;
      },
      curHover: 0,
      targetHover: 0,
      curMouseX: 0,
      curMouseY: 0,
      targetMouseX: 0,
      targetMouseY: 0,
      clickPos: [-999, -999],
      clickTime: -999,
      visible: !0
    }, J = () => {
      const E = Math.min(window.devicePixelRatio || 1, 2), b = Math.round(O.offsetWidth * E), W = Math.round(O.offsetHeight * E);
      (L.width !== b || L.height !== W) && (L.width = b, L.height = W);
    };
    J();
    const M = new ResizeObserver(J);
    M.observe(O);
    const N = (E) => {
      const b = O.getBoundingClientRect(), W = b.left + b.width * 0.5, ot = b.top + b.height * 0.5, at = Math.min(window.devicePixelRatio || 1, 2);
      Z.targetMouseX = (E.clientX - W) * at, Z.targetMouseY = (ot - E.clientY) * at;
    }, T = (E) => {
      Z.targetHover = 1, N(E);
    }, _ = (E) => {
      Z.targetHover = 1, N(E);
    }, y = () => {
      Z.targetHover = 0;
    }, d = (E) => {
      N(E), Z.clickPos = [Z.targetMouseX, Z.targetMouseY], Z.clickTime = X.getTime();
    };
    return O.addEventListener("pointerenter", T), O.addEventListener("pointermove", _), O.addEventListener("pointerleave", y), O.addEventListener("pointerdown", d), X.register(Z), () => {
      X.unregister(C), M.disconnect(), O.removeEventListener("pointerenter", T), O.removeEventListener("pointermove", _), O.removeEventListener("pointerleave", y), O.removeEventListener("pointerdown", d);
    };
  }, [C]);
  const ft = e === "circle";
  return /* @__PURE__ */ ht(
    "button",
    {
      ref: x,
      type: "button",
      onClick: Q,
      className: `tactile-btn ${ft ? "btn-circle" : ""} ${i}`.trim(),
      ...k,
      children: [
        /* @__PURE__ */ D(
          "canvas",
          {
            ref: q,
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              borderRadius: "inherit",
              zIndex: 0
            }
          }
        ),
        /* @__PURE__ */ D(
          "span",
          {
            className: "btn-label",
            style: {
              position: "relative",
              zIndex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: ft ? 0 : "var(--space-12)"
            },
            children: m
          }
        )
      ]
    }
  );
}, Ue = de, We = de, Ne = ({
  checked: m,
  defaultChecked: t = !1,
  onChange: e,
  size: i = "xl",
  className: n = "",
  disabled: r = !1,
  refraction: c = yt.refraction,
  refractionOff: s = St.refraction,
  thickness: u = yt.thickness,
  thicknessOff: v = St.thickness,
  bevelWidth: p = yt.bevelWidth,
  bevelWidthOff: o = St.bevelWidth,
  frost: g = yt.frost,
  frostOff: R = St.frost,
  dispersion: S = yt.dispersion,
  dispersionOff: V = St.dispersion,
  sheen: A = yt.sheen,
  sheenOff: a = St.sheen,
  lightAngle: f = yt.lightAngle,
  darkness: h = yt.darkness,
  darknessOff: P = St.darkness,
  rim: F = yt.rim,
  rimOff: G = St.rim,
  fluidBrightness: Y = yt.fluidBright,
  fluidBrightnessOff: $ = St.fluidBright,
  fluidSpeed: z = yt.fluidSpeed,
  fluidSpeedOff: et = St.fluidSpeed,
  fluidScale: it = yt.fluidScale,
  fluidScaleOff: Q = St.fluidScale,
  fluidAuraWidth: k = yt.fluidAuraWidth,
  fluidAuraWidthOff: C = St.fluidAuraWidth,
  fluidCenter: x = yt.fluidCenter,
  fluidCenterOff: q = St.fluidCenter,
  auroraFlow: B = yt.auroraFlow,
  auroraFlowOff: H = St.auroraFlow,
  hoverBrightness: ft = yt.hoverBright,
  hoverBrightnessOff: O = St.hoverBright,
  trackCursorLight: L = !0,
  lightTrackingStrength: U = yt.lightTrack,
  lightTrackingStrengthOff: X = St.lightTrack,
  clickShockwave: Z = !0,
  shockwaveStrength: J = yt.clickWave,
  shockwaveStrengthOff: M = St.clickWave,
  ...N
}) => {
  const T = Ht(), [_, y] = Ft(t), d = m !== void 0 ? m : _, E = ct(null), b = ct(null), W = ct(null), ot = ct({
    radius: 16,
    refraction: d ? c : s,
    thickness: d ? u : v,
    bevelWidth: d ? p : o,
    frost: d ? g : R,
    dispersion: d ? S : V,
    sheen: d ? A : a,
    lightAngle: f,
    darkness: d ? h : P,
    rim: d ? F : G,
    fluidBright: d ? Y : $,
    fluidSpeed: d ? z : et,
    fluidScale: d ? it : Q,
    fluidAuraWidth: d ? k : C,
    fluidCenter: d ? x : q,
    auroraFlow: d ? B : H,
    hoverBright: d ? ft : O,
    lightTrack: L ? d ? U : X : 0,
    clickWave: Z ? d ? J : M : 0
  });
  vt(() => {
    ot.current = {
      ...ot.current,
      refraction: d ? c : s,
      thickness: d ? u : v,
      bevelWidth: d ? p : o,
      frost: d ? g : R,
      dispersion: d ? S : V,
      sheen: d ? A : a,
      lightAngle: f,
      darkness: d ? h : P,
      rim: d ? F : G,
      fluidBright: d ? Y : $,
      fluidSpeed: d ? z : et,
      fluidScale: d ? it : Q,
      fluidAuraWidth: d ? k : C,
      fluidCenter: d ? x : q,
      auroraFlow: d ? B : H,
      hoverBright: d ? ft : O,
      lightTrack: L ? d ? U : X : 0,
      clickWave: Z ? d ? J : M : 0
    };
  }, [
    d,
    c,
    s,
    u,
    v,
    p,
    o,
    g,
    R,
    S,
    V,
    A,
    a,
    f,
    h,
    P,
    F,
    G,
    Y,
    $,
    z,
    et,
    it,
    Q,
    k,
    C,
    x,
    q,
    B,
    H,
    ft,
    O,
    L,
    U,
    X,
    Z,
    J,
    M
  ]);
  const at = () => {
    if (r) return;
    const tt = !d;
    m === void 0 && y(tt), e == null || e(tt);
  };
  return vt(() => {
    const tt = E.current, rt = b.current;
    if (!tt || !rt) return;
    const w = tt.getContext("2d", { alpha: !0 });
    if (!w) return;
    const I = It(), K = {
      id: T,
      canvas: tt,
      ctx: w,
      getParams: () => {
        const ut = tt.height;
        return ot.current.radius = ut * 0.5, ot.current;
      },
      getSwitchThumb: () => {
        const ut = W.current;
        if (!ut || !rt) return null;
        const pt = Math.min(window.devicePixelRatio || 1, 2), wt = rt.getBoundingClientRect(), bt = ut.getBoundingClientRect();
        if (bt.width <= 0 || bt.height <= 0) return null;
        const Ct = (bt.left + bt.width * 0.5 - (wt.left + wt.width * 0.5)) * pt, Bt = (wt.top + wt.height * 0.5 - (bt.top + bt.height * 0.5)) * pt, Dt = bt.width * 0.5 * pt, Lt = bt.height * 0.5 * pt;
        return [Ct, Bt, Dt, Lt];
      },
      curHover: 0,
      targetHover: 0,
      curMouseX: 0,
      curMouseY: 0,
      targetMouseX: 0,
      targetMouseY: 0,
      clickPos: [-999, -999],
      clickTime: -999,
      visible: !0
    }, lt = () => {
      const ut = Math.min(window.devicePixelRatio || 1, 2), pt = Math.round(rt.offsetWidth * ut), wt = Math.round(rt.offsetHeight * ut);
      (tt.width !== pt || tt.height !== wt) && (tt.width = pt, tt.height = wt);
    };
    lt();
    const dt = new ResizeObserver(lt);
    dt.observe(rt);
    const j = (ut) => {
      const pt = rt.getBoundingClientRect(), wt = pt.left + pt.width * 0.5, bt = pt.top + pt.height * 0.5, Ct = Math.min(window.devicePixelRatio || 1, 2);
      K.targetMouseX = (ut.clientX - wt) * Ct, K.targetMouseY = (bt - ut.clientY) * Ct;
    }, st = (ut) => {
      K.targetHover = 1, j(ut);
    }, nt = (ut) => {
      K.targetHover = 1, j(ut);
    }, gt = () => {
      K.targetHover = 0;
    }, xt = (ut) => {
      j(ut), K.clickPos = [K.targetMouseX, K.targetMouseY], K.clickTime = I.getTime();
    };
    return rt.addEventListener("pointerenter", st), rt.addEventListener("pointermove", nt), rt.addEventListener("pointerleave", gt), rt.addEventListener("pointerdown", xt), I.register(K), () => {
      I.unregister(T), dt.disconnect(), rt.removeEventListener("pointerenter", st), rt.removeEventListener("pointermove", nt), rt.removeEventListener("pointerleave", gt), rt.removeEventListener("pointerdown", xt);
    };
  }, [T]), /* @__PURE__ */ ht(
    "button",
    {
      ref: b,
      type: "button",
      role: "switch",
      "aria-checked": d,
      disabled: r,
      onClick: at,
      onKeyDown: (tt) => {
        (tt.key === " " || tt.key === "Enter") && (tt.preventDefault(), at());
      },
      className: `tactile-switch ${d ? "active" : ""} ${n}`.trim(),
      ...N,
      children: [
        /* @__PURE__ */ D(
          "canvas",
          {
            ref: E,
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              borderRadius: "inherit",
              zIndex: 0
            }
          }
        ),
        /* @__PURE__ */ D(
          "span",
          {
            ref: W,
            className: "switch-thumb"
          }
        )
      ]
    }
  );
}, _e = ({
  items: m,
  value: t,
  defaultValue: e,
  onChange: i,
  size: n = "xl",
  className: r = "",
  refraction: c = Mt.refraction,
  thickness: s = Mt.thickness,
  bevelWidth: u = Mt.bevelWidth,
  frost: v = Mt.frost,
  dispersion: p = Mt.dispersion,
  sheen: o = Mt.sheen,
  lightAngle: g = Mt.lightAngle,
  darkness: R = Mt.darkness,
  rim: S = Mt.rim,
  fluidBrightness: V = Mt.fluidBright,
  fluidSpeed: A = Mt.fluidSpeed,
  fluidScale: a = Mt.fluidScale,
  fluidAuraWidth: f = Mt.fluidAuraWidth,
  fluidCenter: h = Mt.fluidCenter,
  auroraFlow: P = Mt.auroraFlow,
  hoverBrightness: F = Mt.hoverBright,
  trackCursorLight: G = !0,
  lightTrackingStrength: Y = Mt.lightTrack,
  clickShockwave: $ = !0,
  shockwaveStrength: z = Mt.clickWave,
  ...et
}) => {
  var N;
  const it = Ht(), Q = ct(null), k = ct(null), C = ct(null), x = ct(/* @__PURE__ */ new Map()), q = Te(() => m.map((T) => typeof T == "string" ? { value: T, label: T } : T), [m]), B = e ?? ((N = q[0]) == null ? void 0 : N.value) ?? "", [H, ft] = Ft(B), O = t !== void 0 ? t : H, [L, U] = Ft({
    left: 0,
    width: 0,
    ready: !1
  }), X = ct({
    radius: 16,
    refraction: c,
    thickness: s,
    bevelWidth: u,
    frost: v,
    dispersion: p,
    sheen: o,
    lightAngle: g,
    darkness: R,
    rim: S,
    fluidBright: V,
    fluidSpeed: A,
    fluidScale: a,
    fluidAuraWidth: f,
    fluidCenter: h,
    auroraFlow: P,
    hoverBright: F,
    lightTrack: G ? Y : 0,
    clickWave: $ ? z : 0
  });
  vt(() => {
    X.current = {
      ...X.current,
      refraction: c,
      thickness: s,
      bevelWidth: u,
      frost: v,
      dispersion: p,
      sheen: o,
      lightAngle: g,
      darkness: R,
      rim: S,
      fluidBright: V,
      fluidSpeed: A,
      fluidScale: a,
      fluidAuraWidth: f,
      fluidCenter: h,
      auroraFlow: P,
      hoverBright: F,
      lightTrack: G ? Y : 0,
      clickWave: $ ? z : 0
    };
  }, [
    c,
    s,
    u,
    v,
    p,
    o,
    g,
    R,
    S,
    V,
    A,
    a,
    f,
    h,
    P,
    F,
    G,
    Y,
    $,
    z
  ]);
  const Z = we(() => {
    const T = x.current.get(O);
    T && U({
      left: T.offsetLeft,
      width: T.offsetWidth,
      ready: !0
    });
  }, [O]);
  vt(() => {
    Z();
  }, [Z, q]), vt(() => {
    const T = C.current, _ = Q.current;
    if (!T || !_) return;
    const y = T.getContext("2d", { alpha: !0 });
    if (!y) return;
    const d = It(), E = {
      id: it,
      canvas: T,
      ctx: y,
      getParams: () => {
        const I = T.height;
        return X.current.radius = I * 0.5, X.current;
      },
      getSwitchThumb: () => {
        const I = k.current;
        if (!I || !_) return null;
        const K = Math.min(window.devicePixelRatio || 1, 2), lt = _.getBoundingClientRect(), dt = I.getBoundingClientRect();
        if (dt.width <= 0 || dt.height <= 0) return null;
        const j = (dt.left + dt.width * 0.5 - (lt.left + lt.width * 0.5)) * K, st = (lt.top + lt.height * 0.5 - (dt.top + dt.height * 0.5)) * K, nt = dt.width * 0.5 * K, gt = dt.height * 0.5 * K;
        return [j, st, nt, gt];
      },
      curHover: 0,
      targetHover: 0,
      curMouseX: 0,
      curMouseY: 0,
      targetMouseX: 0,
      targetMouseY: 0,
      clickPos: [-999, -999],
      clickTime: -999,
      visible: !0
    }, b = () => {
      const I = Math.min(window.devicePixelRatio || 1, 2), K = Math.round(_.offsetWidth * I), lt = Math.round(_.offsetHeight * I);
      K > 0 && lt > 0 && (T.width !== K || T.height !== lt) && (T.width = K, T.height = lt);
    };
    b();
    let W = null;
    typeof ResizeObserver < "u" && (W = new ResizeObserver(() => {
      Z(), b();
    }), W.observe(_));
    const ot = (I) => {
      const K = _.getBoundingClientRect(), lt = K.left + K.width * 0.5, dt = K.top + K.height * 0.5, j = Math.min(window.devicePixelRatio || 1, 2);
      E.targetMouseX = (I.clientX - lt) * j, E.targetMouseY = (dt - I.clientY) * j;
    }, at = (I) => {
      E.targetHover = 1, ot(I);
    }, tt = (I) => {
      E.targetHover = 1, ot(I);
    }, rt = () => {
      E.targetHover = 0;
    }, w = (I) => {
      ot(I), E.clickPos = [E.targetMouseX, E.targetMouseY], E.clickTime = d.getTime();
    };
    return _.addEventListener("pointerenter", at), _.addEventListener("pointermove", tt), _.addEventListener("pointerleave", rt), _.addEventListener("pointerdown", w), d.register(E), () => {
      d.unregister(it), W && W.disconnect(), _.removeEventListener("pointerenter", at), _.removeEventListener("pointermove", tt), _.removeEventListener("pointerleave", rt), _.removeEventListener("pointerdown", w);
    };
  }, [it, Z]);
  const J = (T, _) => {
    _ || (t === void 0 && ft(T), i == null || i(T));
  }, M = (T) => {
    var d, E;
    const _ = q.filter((b) => !b.disabled);
    if (_.length <= 1) return;
    const y = _.findIndex((b) => b.value === O);
    if (T.key === "ArrowRight") {
      T.preventDefault();
      const b = _[(y + 1) % _.length];
      J(b.value), (d = x.current.get(b.value)) == null || d.focus();
    } else if (T.key === "ArrowLeft") {
      T.preventDefault();
      const b = _[(y - 1 + _.length) % _.length];
      J(b.value), (E = x.current.get(b.value)) == null || E.focus();
    }
  };
  return /* @__PURE__ */ ht(
    "div",
    {
      ref: Q,
      role: "tablist",
      "aria-label": et["aria-label"] || "Tabs",
      onKeyDown: M,
      className: `tactile-tabs ${r}`.trim(),
      ...et,
      children: [
        /* @__PURE__ */ D(
          "canvas",
          {
            ref: C,
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              borderRadius: "inherit",
              zIndex: 0
            }
          }
        ),
        /* @__PURE__ */ D(
          "span",
          {
            ref: k,
            "data-tabs-indicator": !0,
            "aria-hidden": "true",
            className: "tabs-indicator",
            style: {
              transform: `translateX(${L.left}px)`,
              width: `${L.width}px`,
              opacity: L.ready ? 1 : 0
            }
          }
        ),
        q.map((T) => {
          const _ = T.value === O;
          return /* @__PURE__ */ ht(
            "button",
            {
              ref: (y) => {
                y ? x.current.set(T.value, y) : x.current.delete(T.value);
              },
              type: "button",
              role: "tab",
              "aria-selected": _,
              disabled: T.disabled,
              tabIndex: _ ? 0 : -1,
              onClick: () => J(T.value, T.disabled),
              className: `tab-item ${_ ? "active" : ""}`.trim(),
              children: [
                T.icon && /* @__PURE__ */ D("span", { style: { display: "inline-flex", flexShrink: 0 }, children: T.icon }),
                /* @__PURE__ */ D("span", { children: T.label })
              ]
            },
            T.value
          );
        })
      ]
    }
  );
}, He = _e, Ee = ({
  value: m,
  defaultValue: t = "",
  placeholder: e = "Ask anything, @ to mention, / for actions",
  onChange: i,
  onSubmit: n,
  onMentionClick: r,
  agentLabel: c = "Agent",
  modeLabel: s,
  onAgentClick: u,
  onModeClick: v,
  className: p = "",
  refraction: o = Pt.refraction,
  thickness: g = Pt.thickness,
  bevelWidth: R = Pt.bevelWidth,
  frost: S = Pt.frost,
  dispersion: V = Pt.dispersion,
  sheen: A = Pt.sheen,
  lightAngle: a = Pt.lightAngle,
  darkness: f = Pt.darkness,
  rim: h = Pt.rim,
  fluidBrightness: P = Pt.fluidBright,
  fluidSpeed: F = Pt.fluidSpeed,
  fluidScale: G = Pt.fluidScale,
  fluidAuraWidth: Y = Pt.fluidAuraWidth,
  fluidCenter: $ = Pt.fluidCenter,
  auroraFlow: z = Pt.auroraFlow,
  hoverBrightness: et = Pt.hoverBright,
  trackCursorLight: it = !0,
  lightTrackingStrength: Q = Pt.lightTrack,
  clickShockwave: k = !0,
  shockwaveStrength: C = Pt.clickWave
}) => {
  const x = Ht(), q = ct(null), B = ct(null), H = ct(null), [ft, O] = Ft(t), L = m !== void 0 ? m : ft, U = ct({
    radius: 24,
    refraction: o,
    thickness: g,
    bevelWidth: R,
    frost: S,
    dispersion: V,
    sheen: A,
    lightAngle: a,
    darkness: f,
    rim: h,
    fluidBright: P,
    fluidSpeed: F,
    fluidScale: G,
    fluidAuraWidth: Y,
    fluidCenter: $,
    auroraFlow: z,
    hoverBright: et,
    lightTrack: it ? Q : 0,
    clickWave: k ? C : 0
  });
  vt(() => {
    U.current = {
      ...U.current,
      refraction: o,
      thickness: g,
      bevelWidth: R,
      frost: S,
      dispersion: V,
      sheen: A,
      lightAngle: a,
      darkness: f,
      rim: h,
      fluidBright: P,
      fluidSpeed: F,
      fluidScale: G,
      fluidAuraWidth: Y,
      fluidCenter: $,
      auroraFlow: z,
      hoverBright: et,
      lightTrack: it ? Q : 0,
      clickWave: k ? C : 0
    };
  }, [
    o,
    g,
    R,
    S,
    V,
    A,
    a,
    f,
    h,
    P,
    F,
    G,
    Y,
    $,
    z,
    et,
    it,
    Q,
    k,
    C
  ]), vt(() => {
    const b = q.current, W = B.current;
    if (!b || !W) return;
    const ot = W.getContext("2d", { alpha: !0 });
    if (!ot) return;
    const at = It(), tt = {
      id: x,
      canvas: W,
      ctx: ot,
      getParams: () => U.current,
      curMouseX: 0,
      curMouseY: 0,
      targetMouseX: 0,
      targetMouseY: 0,
      curHover: 0,
      targetHover: 0,
      clickPos: [-999, -999],
      clickTime: -999,
      visible: !0
    }, rt = () => {
      if (!b || !W) return;
      const st = b.getBoundingClientRect(), nt = Math.min(window.devicePixelRatio || 1, 2), gt = Math.round(st.width * nt), xt = Math.round(st.height * nt);
      (W.width !== gt || W.height !== xt) && (W.width = gt, W.height = xt), U.current.radius = Math.min(24 * nt, Math.min(gt, xt) * 0.5);
    };
    rt();
    const w = new ResizeObserver(() => {
      rt();
    });
    w.observe(b);
    const I = (st) => {
      tt.targetHover = 1, j(st);
    }, K = (st) => {
      tt.targetHover = 1, j(st);
    }, lt = () => {
      tt.targetHover = 0;
    }, dt = (st) => {
      j(st), tt.clickPos = [tt.targetMouseX, tt.targetMouseY], tt.clickTime = at.getTime();
    }, j = (st) => {
      if (!b) return;
      const nt = b.getBoundingClientRect(), gt = Math.min(window.devicePixelRatio || 1, 2), xt = nt.left + nt.width * 0.5, ut = nt.top + nt.height * 0.5;
      tt.targetMouseX = (st.clientX - xt) * gt, tt.targetMouseY = (ut - st.clientY) * gt;
    };
    return b.addEventListener("pointerenter", I), b.addEventListener("pointermove", K), b.addEventListener("pointerleave", lt), b.addEventListener("pointerdown", dt), at.register(tt), () => {
      at.unregister(x), w.disconnect(), b.removeEventListener("pointerenter", I), b.removeEventListener("pointermove", K), b.removeEventListener("pointerleave", lt), b.removeEventListener("pointerdown", dt);
    };
  }, [x]);
  const X = () => {
    const b = H.current;
    if (b) {
      b.style.height = "auto";
      const W = parseFloat(window.getComputedStyle(b).maxHeight) || 160;
      b.style.height = `${Math.min(b.scrollHeight, W)}px`;
    }
  }, Z = (b) => {
    const W = b.target.value;
    m === void 0 && O(W), i == null || i(W), X();
  }, J = (b) => {
    b.key === "Enter" && !b.shiftKey && (b.preventDefault(), E());
  }, [M, N] = Ft(0), T = [
    { label: c, placeholder: e },
    { label: "Plan", placeholder: "Plan architecture, @ to mention, / for actions" },
    { label: "Ask", placeholder: "Ask a question, @ to mention, / for actions" }
  ], _ = T[M % T.length], y = () => {
    var b;
    if (r) {
      r();
      return;
    }
    (b = H.current) == null || b.focus();
  }, d = () => {
    if (u) {
      u();
      return;
    }
    N((b) => (b + 1) % T.length);
  }, E = () => {
    L.trim() && (n == null || n(L), m === void 0 && (O(""), requestAnimationFrame(() => X())));
  };
  return /* @__PURE__ */ ht(
    "div",
    {
      ref: q,
      className: `tactile-prompt-box ${p}`.trim(),
      children: [
        /* @__PURE__ */ D(
          "canvas",
          {
            ref: B,
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              borderRadius: "inherit",
              zIndex: 0
            }
          }
        ),
        /* @__PURE__ */ ht(
          "div",
          {
            style: {
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-16)",
              width: "100%"
            },
            children: [
              /* @__PURE__ */ D("div", { className: "prompt-body", children: /* @__PURE__ */ D(
                "textarea",
                {
                  ref: H,
                  value: L,
                  onChange: Z,
                  onKeyDown: J,
                  placeholder: _.placeholder,
                  rows: 1,
                  className: "prompt-textarea"
                }
              ) }),
              /* @__PURE__ */ ht("div", { className: "prompt-bottom-bar", children: [
                /* @__PURE__ */ ht("div", { className: "prompt-pills-row", children: [
                  /* @__PURE__ */ D(
                    "button",
                    {
                      type: "button",
                      onClick: y,
                      "aria-label": "Add context",
                      className: "prompt-mention-btn",
                      children: /* @__PURE__ */ ht(
                        "svg",
                        {
                          className: "prompt-submit-icon",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2.2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          children: [
                            /* @__PURE__ */ D("path", { d: "M5 12h14" }),
                            /* @__PURE__ */ D("path", { d: "M12 5v14" })
                          ]
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ D(
                    "button",
                    {
                      type: "button",
                      onClick: d,
                      className: "prompt-pill",
                      children: /* @__PURE__ */ D("span", { className: "prompt-pill-label", children: _.label })
                    }
                  ),
                  s && /* @__PURE__ */ D(
                    "button",
                    {
                      type: "button",
                      onClick: v,
                      className: "prompt-pill",
                      children: /* @__PURE__ */ D("span", { className: "prompt-pill-label", children: s })
                    }
                  )
                ] }),
                /* @__PURE__ */ D(
                  "button",
                  {
                    type: "button",
                    onClick: E,
                    "aria-label": "Submit prompt",
                    disabled: !L.trim(),
                    className: "prompt-submit-btn",
                    children: /* @__PURE__ */ ht(
                      "svg",
                      {
                        className: "prompt-submit-icon",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        children: [
                          /* @__PURE__ */ D("path", { d: "m5 12 7-7 7 7" }),
                          /* @__PURE__ */ D("path", { d: "M12 19V5" })
                        ]
                      }
                    )
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}, Xe = Ee, Se = ({
  children: m,
  cycleWords: t,
  className: e = "",
  style: i,
  onClick: n,
  refraction: r = Rt.refraction,
  thickness: c = Rt.thickness,
  bevelWidth: s = Rt.bevelWidth,
  frost: u = Rt.frost,
  dispersion: v = Rt.dispersion,
  sheen: p = Rt.sheen,
  lightAngle: o = Rt.lightAngle,
  darkness: g = Rt.darkness,
  rim: R = Rt.rim,
  fluidBrightness: S = Rt.fluidBright,
  fluidSpeed: V = Rt.fluidSpeed,
  fluidScale: A = Rt.fluidScale,
  fluidAuraWidth: a = Rt.fluidAuraWidth,
  fluidCenter: f = Rt.fluidCenter,
  auroraFlow: h = Rt.auroraFlow,
  hoverBrightness: P = Rt.hoverBright,
  trackCursorLight: F = !0,
  lightTrackingStrength: G = Rt.lightTrack,
  clickShockwave: Y = !0,
  shockwaveStrength: $ = Rt.clickWave,
  ...z
}) => {
  const et = Ht(), it = ct(null), Q = ct(null), [k, C] = Ft(0), x = t && t.length > 0 ? t[k % t.length] : m, q = typeof x == "string" ? x : String(x ?? ""), B = ct({
    radius: 0,
    refraction: r,
    thickness: c,
    bevelWidth: s,
    frost: u,
    dispersion: v,
    sheen: p,
    lightAngle: o,
    darkness: g,
    rim: R,
    fluidBright: S,
    fluidSpeed: V,
    fluidScale: A,
    fluidAuraWidth: a,
    fluidCenter: f,
    auroraFlow: h,
    hoverBright: P,
    lightTrack: F ? G : 0,
    clickWave: Y ? $ : 0
  }), H = ct(null);
  vt(() => {
    B.current = {
      ...B.current,
      refraction: r,
      thickness: c,
      bevelWidth: s,
      frost: u,
      dispersion: v,
      sheen: p,
      lightAngle: o,
      darkness: g,
      rim: R,
      fluidBright: S,
      fluidSpeed: V,
      fluidScale: A,
      fluidAuraWidth: a,
      fluidCenter: f,
      auroraFlow: h,
      hoverBright: P,
      lightTrack: F ? G : 0,
      clickWave: Y ? $ : 0
    };
  }, [
    r,
    c,
    s,
    u,
    v,
    p,
    o,
    g,
    R,
    S,
    V,
    A,
    a,
    f,
    h,
    P,
    F,
    G,
    Y,
    $
  ]), vt(() => {
    const L = it.current, U = Q.current;
    if (!L || !U) return;
    const X = U.getContext("2d", { alpha: !0 });
    if (!X) return;
    const Z = It(), J = {
      id: et,
      canvas: U,
      ctx: X,
      textMask: q,
      getParams: () => B.current,
      curHover: 0,
      targetHover: 0,
      curMouseX: 0,
      curMouseY: 0,
      targetMouseX: 0,
      targetMouseY: 0,
      clickPos: [-999, -999],
      clickTime: -999,
      visible: !0
    };
    H.current = J;
    const M = () => {
      const W = Math.min(window.devicePixelRatio || 1, 2), ot = 16, at = Math.round((L.offsetWidth + ot * 2) * W), tt = Math.round((L.offsetHeight + ot * 2) * W);
      (U.width !== at || U.height !== tt) && (U.width = at, U.height = tt);
      const rt = window.getComputedStyle(L), w = parseFloat(rt.fontSize) * W;
      J.textFont = `${rt.fontWeight} ${w}px ${rt.fontFamily}`, J.textLetterSpacing = rt.letterSpacing || "normal", J.textMask = q;
    };
    M();
    let N = null;
    typeof ResizeObserver < "u" && (N = new ResizeObserver(() => M()), N.observe(L));
    let T = null;
    typeof IntersectionObserver < "u" && (T = new IntersectionObserver(([W]) => {
      J.visible = W.isIntersecting;
    }), T.observe(L));
    const _ = (W) => {
      const ot = L.getBoundingClientRect(), at = ot.left + ot.width * 0.5, tt = ot.top + ot.height * 0.5, rt = Math.min(window.devicePixelRatio || 1, 2);
      J.targetMouseX = (W.clientX - at) * rt, J.targetMouseY = (tt - W.clientY) * rt;
    }, y = (W) => {
      J.targetHover = 1, _(W);
    }, d = (W) => {
      J.targetHover = 1, _(W);
    }, E = () => {
      J.targetHover = 0;
    }, b = (W) => {
      _(W), J.clickPos = [J.targetMouseX, J.targetMouseY], J.clickTime = Z.getTime();
    };
    return L.addEventListener("pointerenter", y), L.addEventListener("pointermove", d), L.addEventListener("pointerleave", E), L.addEventListener("pointerdown", b), Z.register(J), () => {
      Z.unregister(et), L.removeEventListener("pointerenter", y), L.removeEventListener("pointermove", d), L.removeEventListener("pointerleave", E), L.removeEventListener("pointerdown", b), N && N.disconnect(), T && T.disconnect();
    };
  }, [et, q]);
  const ft = (L) => {
    t && t.length > 1 && C((U) => U + 1), n && n(L);
  }, O = !!(t && t.length > 1) || !!n;
  return /* @__PURE__ */ ht(
    "span",
    {
      ref: it,
      className: `tactile-glass-word ${e}`.trim(),
      style: {
        position: "relative",
        display: "inline-flex",
        alignItems: "baseline",
        justifyContent: "center",
        verticalAlign: "baseline",
        margin: 0,
        padding: 0,
        lineHeight: "inherit",
        border: "none",
        background: "transparent",
        userSelect: "none",
        cursor: O ? "pointer" : "default",
        WebkitTapHighlightColor: "transparent",
        ...i
      },
      onClick: ft,
      ...z,
      children: [
        /* @__PURE__ */ D(
          "canvas",
          {
            ref: Q,
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: "calc(var(--space-16) * -1)",
              width: "calc(100% + var(--space-32))",
              height: "calc(100% + var(--space-32))",
              pointerEvents: "none",
              zIndex: 2
            }
          }
        ),
        /* @__PURE__ */ D(
          "span",
          {
            style: {
              opacity: 0,
              pointerEvents: "none",
              userSelect: "none",
              fontWeight: "inherit",
              letterSpacing: "inherit"
            },
            children: x
          }
        )
      ]
    }
  );
}, Ge = ({
  level: m = "h1",
  size: t = "hero",
  align: e = "center",
  title: i,
  highlight: n,
  highlightCycle: r,
  subtitle: c,
  badge: s,
  wordProps: u,
  className: v = "",
  children: p,
  ...o
}) => {
  const g = m, R = () => {
    if (!i) return null;
    if (!n && (!r || r.length === 0))
      return i;
    const S = [];
    if (Array.isArray(n) ? S.push(...n) : typeof n == "string" && S.push(n), r && r.length > 0 && !S.includes(r[0]) && S.push(r[0]), S.length === 0) return i;
    const V = new RegExp(`(${S.map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
    return i.split(V).map((a, f) => S.find((P) => P.toLowerCase() === a.toLowerCase()) ? /* @__PURE__ */ D(
      Se,
      {
        cycleWords: r && r.length > 0 ? r : void 0,
        ...u,
        children: a
      },
      f
    ) : /* @__PURE__ */ D(be.Fragment, { children: a }, f));
  };
  return /* @__PURE__ */ ht(
    "div",
    {
      className: `tactile-heading-container ${v}`.trim(),
      style: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "var(--heading-max-w)",
        alignItems: e === "left" ? "flex-start" : e === "right" ? "flex-end" : "center",
        textAlign: e
      },
      children: [
        s && /* @__PURE__ */ D(
          "div",
          {
            className: "tactile-heading-badge",
            style: { marginBottom: "var(--space-16)", display: "inline-flex", alignItems: "center" },
            children: s
          }
        ),
        /* @__PURE__ */ D(
          g,
          {
            className: "tactile-heading-title display-heading",
            style: {
              fontFamily: "var(--font-sans)",
              color: "var(--text-primary)",
              fontSize: t === "sm" ? "var(--font-size-xl)" : t === "md" ? "var(--font-size-2xl)" : "var(--font-size-display)",
              fontWeight: "var(--font-weight-extrabold)",
              lineHeight: t === "md" ? "var(--line-height-2xl)" : "var(--line-height-none)",
              letterSpacing: "var(--letter-spacing-display)",
              textAlign: e,
              margin: 0
            },
            ...o,
            children: p || R()
          }
        ),
        c && /* @__PURE__ */ D(
          "p",
          {
            className: "tactile-heading-subtitle",
            style: {
              fontSize: "var(--font-size-md)",
              color: "var(--text-secondary)",
              maxWidth: "var(--subtitle-max-w)",
              marginTop: t === "sm" ? "var(--space-8)" : t === "md" ? "var(--space-12)" : "var(--space-16)",
              textAlign: e
            },
            children: c
          }
        )
      ]
    }
  );
}, Ae = ({
  children: m,
  cardNumber: t = "••••  ••••  ••••  8042",
  cardHolder: e = "ALEXANDER WRIGHT",
  validThru: i = "08 / 29",
  bankName: n = "TACTILE",
  tier: r = "",
  showContactless: c = !0,
  radius: s,
  className: u = "",
  style: v,
  refraction: p = kt.refraction,
  thickness: o = kt.thickness,
  bevelWidth: g = kt.bevelWidth,
  frost: R = kt.frost,
  dispersion: S = kt.dispersion,
  sheen: V = kt.sheen,
  lightAngle: A = kt.lightAngle,
  darkness: a = kt.darkness,
  rim: f = kt.rim,
  fluidBrightness: h = kt.fluidBright,
  fluidSpeed: P = kt.fluidSpeed,
  fluidScale: F = kt.fluidScale,
  fluidAuraWidth: G = kt.fluidAuraWidth,
  fluidCenter: Y = kt.fluidCenter,
  auroraFlow: $ = kt.auroraFlow,
  hoverBrightness: z = kt.hoverBright,
  trackCursorLight: et = !0,
  lightTrackingStrength: it = kt.lightTrack,
  clickShockwave: Q = !0,
  shockwaveStrength: k = kt.clickWave,
  tilt3d: C = !0,
  maxTilt: x = 12,
  onClick: q,
  ...B
}) => {
  const H = Ht(), ft = ct(null), O = ct(null), L = ct({
    radius: s ?? 24,
    refraction: p,
    thickness: o,
    bevelWidth: g,
    frost: R,
    dispersion: S,
    sheen: V,
    lightAngle: A,
    darkness: a,
    rim: f,
    fluidBright: h,
    fluidSpeed: P,
    fluidScale: F,
    fluidAuraWidth: G,
    fluidCenter: Y,
    auroraFlow: $,
    hoverBright: z,
    lightTrack: et ? it : 0,
    clickWave: Q ? k : 0
  });
  return vt(() => {
    L.current = {
      ...L.current,
      refraction: p,
      thickness: o,
      bevelWidth: g,
      frost: R,
      dispersion: S,
      sheen: V,
      lightAngle: A,
      darkness: a,
      rim: f,
      fluidBright: h,
      fluidSpeed: P,
      fluidScale: F,
      fluidAuraWidth: G,
      fluidCenter: Y,
      auroraFlow: $,
      hoverBright: z,
      lightTrack: et ? it : 0,
      clickWave: Q ? k : 0
    };
  }, [
    p,
    o,
    g,
    R,
    S,
    V,
    A,
    a,
    f,
    h,
    P,
    F,
    G,
    Y,
    $,
    z,
    et,
    it,
    Q,
    k
  ]), vt(() => {
    const U = ft.current, X = O.current;
    if (!U || !X) return;
    const Z = X.getContext("2d", { alpha: !0 });
    if (!Z) return;
    const J = It(), M = {
      id: H,
      canvas: X,
      ctx: Z,
      getParams: () => {
        const j = Math.min(window.devicePixelRatio || 1, 2), st = Math.min(X.width, X.height) * 0.5, nt = s !== void 0 ? s : parseFloat(window.getComputedStyle(U).borderRadius) || 24;
        return L.current.radius = Math.min(nt * j, st), L.current;
      },
      curHover: 0,
      targetHover: 0,
      curMouseX: 0,
      curMouseY: 0,
      targetMouseX: 0,
      targetMouseY: 0,
      clickPos: [-999, -999],
      clickTime: -999,
      visible: !0
    }, N = () => {
      const j = Math.min(window.devicePixelRatio || 1, 2), st = Math.round(U.offsetWidth * j), nt = Math.round(U.offsetHeight * j);
      (X.width !== st || X.height !== nt) && (X.width = st, X.height = nt);
    };
    N();
    const T = new ResizeObserver(N);
    T.observe(U);
    let _ = null, y = 0, d = 0, E = 0, b = 0, W = 1, ot = 1, at = !1;
    const tt = () => {
      if (!C) return;
      const j = at ? 0.12 : 0.08;
      E += (y - E) * j, b += (d - b) * j, ot += (W - ot) * j, M.tilt = { rotX: E, rotY: b, scale: ot, focalLength: 1e3 }, U.style.transform = `perspective(var(--perspective-3d)) rotateX(${E.toFixed(2)}deg) rotateY(${b.toFixed(2)}deg) scale3d(${ot.toFixed(3)}, ${ot.toFixed(3)}, ${ot.toFixed(3)})`;
      const st = Math.abs(y - E) > 0.01 || Math.abs(d - b) > 0.01 || Math.abs(W - ot) > 1e-3;
      at || st ? _ = requestAnimationFrame(tt) : (_ = null, M.tilt = null, U.style.transform = "");
    }, rt = (j) => {
      const st = U.getBoundingClientRect(), nt = st.left + st.width * 0.5, gt = st.top + st.height * 0.5, xt = Math.min(window.devicePixelRatio || 1, 2);
      if (M.targetMouseX = (j.clientX - nt) * xt, M.targetMouseY = (gt - j.clientY) * xt, C) {
        const ut = Math.max(-1, Math.min(1, (j.clientX - nt) / (st.width * 0.5)));
        y = -Math.max(-1, Math.min(1, (j.clientY - gt) / (st.height * 0.5))) * (x * 0.92), d = ut * (x * 1.08), W = 1.03;
      }
    }, w = (j) => {
      at = !0, M.targetHover = 1, rt(j), C && !_ && (_ = requestAnimationFrame(tt));
    }, I = (j) => {
      at = !0, M.targetHover = 1, rt(j), C && !_ && (_ = requestAnimationFrame(tt));
    }, K = () => {
      at = !1, M.targetHover = 0, C && (y = 0, d = 0, W = 1, _ || (_ = requestAnimationFrame(tt)));
    }, lt = (j) => {
      rt(j), M.clickPos = [M.targetMouseX, M.targetMouseY], M.clickTime = J.getTime();
    }, dt = (j) => {
      j.pointerType === "touch" && K();
    };
    return U.addEventListener("pointerenter", w), U.addEventListener("pointermove", I), U.addEventListener("pointerleave", K), U.addEventListener("pointercancel", K), U.addEventListener("pointerup", dt), U.addEventListener("pointerdown", lt), J.register(M), () => {
      _ && cancelAnimationFrame(_), J.unregister(H), T.disconnect(), U.removeEventListener("pointerenter", w), U.removeEventListener("pointermove", I), U.removeEventListener("pointerleave", K), U.removeEventListener("pointercancel", K), U.removeEventListener("pointerup", dt), U.removeEventListener("pointerdown", lt);
    };
  }, [H, s, C, x]), /* @__PURE__ */ ht(
    "div",
    {
      ref: ft,
      onClick: q,
      className: `tactile-card tactile-credit-card ${u}`,
      style: {
        borderRadius: s !== void 0 ? `${s}px` : "var(--card-radius)",
        transformStyle: "preserve-3d",
        willChange: "transform",
        WebkitTapHighlightColor: "transparent",
        ...v
      },
      ...B,
      children: [
        /* @__PURE__ */ D(
          "canvas",
          {
            ref: O,
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
              borderRadius: "inherit"
            }
          }
        ),
        /* @__PURE__ */ D(
          "div",
          {
            className: "credit-card-inner",
            style: {
              transform: "translateZ(var(--space-20))",
              transformStyle: "preserve-3d"
            },
            children: m || /* @__PURE__ */ ht(xe, { children: [
              /* @__PURE__ */ ht("div", { className: "credit-card-top", children: [
                c ? /* @__PURE__ */ ht(
                  "svg",
                  {
                    className: "credit-card-contactless",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2.2",
                    strokeLinecap: "round",
                    "aria-label": "Contactless payment",
                    children: [
                      /* @__PURE__ */ D("path", { d: "M7 7a7 7 0 0 1 0 10" }),
                      /* @__PURE__ */ D("path", { d: "M11 4a11 11 0 0 1 0 16" }),
                      /* @__PURE__ */ D("path", { d: "M15 1a15 15 0 0 1 0 22" })
                    ]
                  }
                ) : /* @__PURE__ */ D("span", {}),
                /* @__PURE__ */ ht("div", { className: "credit-card-brand", children: [
                  /* @__PURE__ */ D("span", { className: "credit-card-bank-name", children: n }),
                  r && /* @__PURE__ */ D("span", { className: "credit-card-tier", children: r })
                ] })
              ] }),
              /* @__PURE__ */ D("div", { className: "credit-card-number", "aria-label": `Card number: ${t}`, children: t.includes(" ") ? t.split(/\s+/).map((U, X) => /* @__PURE__ */ D("span", { children: U }, X)) : /* @__PURE__ */ D("span", { children: t }) }),
              /* @__PURE__ */ ht("div", { className: "credit-card-bottom", children: [
                /* @__PURE__ */ D("div", { className: "credit-card-field", children: /* @__PURE__ */ D("span", { className: "credit-card-value", children: e }) }),
                /* @__PURE__ */ D("div", { className: "credit-card-field", children: /* @__PURE__ */ D("span", { className: "credit-card-value", children: i }) }),
                /* @__PURE__ */ ht("div", { className: "credit-card-network", "aria-label": "Payment network emblem", children: [
                  /* @__PURE__ */ D("div", { className: "network-circle network-circle-left" }),
                  /* @__PURE__ */ D("div", { className: "network-circle network-circle-right" })
                ] })
              ] })
            ] })
          }
        )
      ]
    }
  );
}, Ve = Ae, re = [
  {
    title: "Solaris Phase",
    durationSec: 228
  },
  {
    title: "Obsidian Bloom",
    durationSec: 256
  },
  {
    title: "Caustic Horizon",
    durationSec: 192
  }
];
function ae(m) {
  const t = Math.max(0, Math.floor(m)), e = Math.floor(t / 60), i = t % 60;
  return `${String(e).padStart(2, "0")}:${String(i).padStart(2, "0")}`;
}
const ze = ({
  tracks: m = re,
  defaultTrackIndex: t = 0,
  defaultPlaying: e = !1,
  radius: i,
  className: n = "",
  style: r,
  onPlayChange: c,
  onTrackChange: s,
  refraction: u = _t.refraction,
  thickness: v = _t.thickness,
  bevelWidth: p = _t.bevelWidth,
  frost: o = _t.frost,
  dispersion: g = _t.dispersion,
  sheen: R = _t.sheen,
  lightAngle: S = _t.lightAngle,
  darkness: V = _t.darkness,
  rim: A = _t.rim,
  fluidBrightness: a = _t.fluidBright,
  fluidSpeed: f = _t.fluidSpeed,
  fluidScale: h = _t.fluidScale,
  fluidAuraWidth: P = _t.fluidAuraWidth,
  fluidCenter: F = _t.fluidCenter,
  auroraFlow: G = _t.auroraFlow,
  hoverBrightness: Y = _t.hoverBright,
  trackCursorLight: $ = !0,
  lightTrackingStrength: z = _t.lightTrack,
  clickShockwave: et = !0,
  shockwaveStrength: it = _t.clickWave,
  tilt3d: Q = !0,
  maxTilt: k = 10,
  ...C
}) => {
  const x = Ht(), q = ct(null), B = ct(null), H = ct(null), ft = ct(null), [O, L] = Ft(
    Math.max(0, Math.min(m.length - 1, t))
  ), [U, X] = Ft(e), [Z, J] = Ft(!1), [M, N] = Ft(0), T = m[O] || re[0], _ = ct({
    radius: i ?? 32,
    refraction: u,
    thickness: v,
    bevelWidth: p,
    frost: o,
    dispersion: g,
    sheen: R,
    lightAngle: S,
    darkness: V,
    rim: A,
    fluidBright: a,
    fluidSpeed: f,
    fluidScale: h,
    fluidAuraWidth: P,
    fluidCenter: F,
    auroraFlow: G,
    hoverBright: Y,
    lightTrack: $ ? z : 0,
    clickWave: et ? it : 0
  });
  vt(() => {
    _.current = {
      ..._.current,
      refraction: u,
      thickness: v,
      bevelWidth: p,
      frost: o,
      dispersion: g,
      sheen: R,
      lightAngle: S,
      darkness: V,
      rim: A,
      fluidBright: a,
      fluidSpeed: f,
      fluidScale: h,
      fluidAuraWidth: P,
      fluidCenter: F,
      auroraFlow: G,
      hoverBright: Y,
      lightTrack: $ ? z : 0,
      clickWave: et ? it : 0
    };
  }, [
    u,
    v,
    p,
    o,
    g,
    R,
    S,
    V,
    A,
    a,
    f,
    h,
    P,
    F,
    G,
    Y,
    $,
    z,
    et,
    it
  ]), vt(() => () => {
    Nt().setPlaying(!1);
  }, []), vt(() => {
    const w = H.current, I = q.current;
    if (!w || !I) return;
    const K = w.getContext("2d");
    if (!K) return;
    const lt = Nt(), dt = It(), j = 70, st = new Float32Array(j), nt = new Float32Array(j), gt = new Float32Array(j);
    let xt = null;
    const ut = () => {
      const pt = Math.min(window.devicePixelRatio || 1, 2), wt = w.clientWidth || 480, bt = w.clientHeight || 304, Ct = Math.round(wt * pt), Bt = Math.round(bt * pt);
      (w.width !== Ct || w.height !== Bt) && (w.width = Ct, w.height = Bt);
      const Dt = dt.getTime();
      lt.getSpectrumBars(j, st, Dt), lt.getIdleWaveBars(j, nt, Dt, gt), K.clearRect(0, 0, Ct, Bt);
      const Lt = Math.max(1, Math.round(1.5 * pt)), qt = Math.max(2, Math.round(6 * (wt / 480) * pt)), Ot = (j - 1) * qt + Lt, jt = Math.round((Ct - Ot) * 0.5), Qt = Math.round(146 / 304 * Bt), Ut = bt / 304 * pt, Kt = Math.max(2, Math.round(2 * Ut));
      for (let Wt = 0; Wt < j; Wt++) {
        const mt = jt + Wt * qt, At = st[Wt], Xt = nt[Wt], Gt = 0.16 + 0.76 * Math.min(1, Math.max(gt[Wt], At * 2.5)), zt = 130 * At * Ut, Zt = Xt * 56 * Ut, ie = zt * 0.5 + Math.max(0, Zt), fe = zt * 0.5 + Math.max(0, -Zt), me = Kt + ie + fe, ge = Qt - Kt * 0.5 - ie;
        K.fillStyle = `rgba(255, 255, 255, ${Gt.toFixed(3)})`, K.beginPath(), K.roundRect(mt, ge, Lt, me, Lt * 0.5), K.fill();
      }
      xt = requestAnimationFrame(ut);
    };
    return xt = requestAnimationFrame(ut), () => {
      xt !== null && cancelAnimationFrame(xt);
    };
  }, []), vt(() => {
    if (!U) return;
    let w = performance.now(), I = null;
    const K = (lt) => {
      const dt = (lt - w) * 1e-3;
      w = lt, N((j) => {
        const st = j + dt / Math.max(1, T.durationSec);
        if (st >= 1) {
          const nt = Nt();
          if (nt.seek(0), !Z) {
            const gt = (O + 1) % m.length;
            nt.setTrack(gt), L(gt), s == null || s(gt, m[gt]);
          }
          return 0;
        }
        return st;
      }), I = requestAnimationFrame(K);
    };
    return I = requestAnimationFrame(K), () => {
      I !== null && cancelAnimationFrame(I);
    };
  }, [U, T.durationSec, Z, O, m, s]), vt(() => {
    const w = q.current, I = B.current;
    if (!w || !I) return;
    const K = I.getContext("2d", { alpha: !0 });
    if (!K) return;
    const lt = It();
    let dt = 0, j = 0, st = 0;
    const nt = {
      id: x,
      canvas: I,
      ctx: K,
      getParams: () => {
        const mt = Math.min(window.devicePixelRatio || 1, 2), At = Math.min(dt || I.width, j || I.height) * 0.5, Xt = i !== void 0 ? i : parseFloat(window.getComputedStyle(w).borderRadius) || 32;
        return _.current.radius = Math.min(Xt * mt, At), _.current;
      },
      getRect: () => [0, st, dt, j],
      curHover: 0,
      targetHover: 0,
      curMouseX: 0,
      curMouseY: 0,
      targetMouseX: 0,
      targetMouseY: 0,
      clickPos: [-999, -999],
      clickTime: -999,
      visible: !0,
      isAudioDeck: !0
    }, gt = () => {
      const mt = Math.min(window.devicePixelRatio || 1, 2), At = w.offsetWidth || 480, Xt = w.offsetHeight || 304, $t = Math.min(1, At / 480);
      w.style.setProperty("--audio-scale", $t.toFixed(4));
      const Gt = Math.ceil(48 * $t);
      I.style.bottom = `-${Gt}px`, I.style.height = `calc(100% + ${Gt}px)`, dt = Math.round(At * mt), j = Math.round(Xt * mt), st = Math.round(Gt * mt);
      const zt = j + st;
      (I.width !== dt || I.height !== zt) && (I.width = dt, I.height = zt);
    };
    gt();
    const xt = new ResizeObserver(gt);
    xt.observe(w);
    let ut = null, pt = 0, wt = 0, bt = 0, Ct = 0, Bt = 1, Dt = 1, Lt = !1;
    const qt = () => {
      if (!Q) return;
      const mt = Lt ? 0.1 : 0.07;
      bt += (pt - bt) * mt, Ct += (wt - Ct) * mt, Dt += (Bt - Dt) * mt, nt.tilt = { rotX: bt, rotY: Ct, scale: Dt, focalLength: 1e3 }, w.style.transform = `perspective(var(--perspective-3d)) rotateX(${bt.toFixed(2)}deg) rotateY(${Ct.toFixed(2)}deg) scale3d(${Dt.toFixed(3)}, ${Dt.toFixed(3)}, ${Dt.toFixed(3)})`;
      const At = Math.abs(pt - bt) > 0.01 || Math.abs(wt - Ct) > 0.01 || Math.abs(Bt - Dt) > 1e-3;
      Lt || At ? ut = requestAnimationFrame(qt) : (ut = null, nt.tilt = null, w.style.transform = "");
    }, Ot = (mt) => {
      const At = w.getBoundingClientRect(), Xt = At.left + At.width * 0.5, $t = At.top + At.height * 0.5, Gt = Math.min(window.devicePixelRatio || 1, 2);
      if (nt.targetMouseX = (mt.clientX - Xt) * Gt, nt.targetMouseY = ($t - mt.clientY) * Gt, Q) {
        if (mt.target instanceof Element && mt.target.closest(".audio-controls-dock, .audio-timeline-group, .audio-like-btn"))
          pt = 0, wt = 0, Bt = 1;
        else {
          const zt = Math.max(-1, Math.min(1, (mt.clientX - Xt) / (At.width * 0.5)));
          pt = -Math.max(-1, Math.min(1, (mt.clientY - $t) / (At.height * 0.5))) * k, wt = zt * k, Bt = 1.025;
        }
        ut === null && (ut = requestAnimationFrame(qt));
      }
    }, jt = (mt) => {
      Lt = !0, nt.targetHover = 1, Ot(mt);
    }, Qt = (mt) => {
      Lt && (nt.targetHover = 1, Ot(mt));
    }, Ut = () => {
      Lt = !1, nt.targetHover = 0, pt = 0, wt = 0, Bt = 1, Q && ut === null && (ut = requestAnimationFrame(qt));
    }, Kt = (mt) => {
      Ot(mt), nt.clickPos = [nt.targetMouseX, nt.targetMouseY], nt.clickTime = lt.getTime();
    }, Wt = (mt) => {
      mt.pointerType === "touch" && Ut();
    };
    return w.addEventListener("pointerenter", jt), w.addEventListener("pointermove", Qt), w.addEventListener("pointerleave", Ut), w.addEventListener("pointercancel", Ut), w.addEventListener("pointerup", Wt), w.addEventListener("pointerdown", Kt), lt.register(nt), () => {
      xt.disconnect(), ut !== null && cancelAnimationFrame(ut), w.removeEventListener("pointerenter", jt), w.removeEventListener("pointermove", Qt), w.removeEventListener("pointerleave", Ut), w.removeEventListener("pointercancel", Ut), w.removeEventListener("pointerup", Wt), w.removeEventListener("pointerdown", Kt), lt.unregister(x);
    };
  }, [x, i, Q, k]);
  const y = () => {
    const w = !U, I = Nt();
    I.setTrack(O), I.seek(M), I.setPlaying(w), X(w), c == null || c(w);
  }, d = () => {
    const w = (O - 1 + m.length) % m.length, I = Nt();
    I.seek(0), I.setTrack(w), I.setPlaying(!0), L(w), N(0), X(!0), s == null || s(w, m[w]);
  }, E = () => {
    const w = (O + 1) % m.length, I = Nt();
    I.seek(0), I.setTrack(w), I.setPlaying(!0), L(w), N(0), X(!0), s == null || s(w, m[w]);
  }, b = (w) => {
    const I = ft.current;
    if (!I) return;
    const K = I.getBoundingClientRect();
    if (K.width <= 0) return;
    const lt = Math.max(0, Math.min(1, (w - K.left) / K.width));
    Nt().seek(lt), N(lt);
  }, W = (w) => {
    w.stopPropagation();
    try {
      w.currentTarget.setPointerCapture(w.pointerId);
    } catch {
    }
    b(w.clientX);
  }, ot = (w) => {
    (w.currentTarget.hasPointerCapture(w.pointerId) || w.buttons === 1) && (w.stopPropagation(), b(w.clientX));
  }, at = (w) => {
    try {
      w.currentTarget.hasPointerCapture(w.pointerId) && w.currentTarget.releasePointerCapture(w.pointerId);
    } catch {
    }
  }, tt = M * T.durationSec, rt = Math.max(0, T.durationSec - tt);
  return /* @__PURE__ */ ht(
    "div",
    {
      ref: q,
      className: `tactile-audio-player ${n}`.trim(),
      style: {
        position: "relative",
        width: "min(100%, var(--audio-w))",
        aspectRatio: "480 / 304",
        height: "auto",
        padding: "var(--audio-pad-top) var(--audio-pad-h) var(--audio-pad-bottom)",
        borderRadius: i !== void 0 ? `${i}px` : "var(--audio-radius)",
        border: "none",
        background: "transparent",
        outline: "none",
        boxSizing: "border-box",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
        ...r
      },
      ...C,
      children: [
        /* @__PURE__ */ D(
          "canvas",
          {
            ref: B,
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
              borderRadius: "inherit"
            }
          }
        ),
        /* @__PURE__ */ D(
          "canvas",
          {
            ref: H,
            className: "audio-spectrum-front",
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 1
            }
          }
        ),
        /* @__PURE__ */ ht("div", { className: "audio-player-inner", children: [
          /* @__PURE__ */ ht("div", { className: "audio-top-row", children: [
            /* @__PURE__ */ D("div", { className: "audio-track-title", children: T.title }),
            /* @__PURE__ */ D(
              "button",
              {
                type: "button",
                className: "audio-like-btn",
                "aria-label": "Repeat track",
                "aria-pressed": Z,
                onClick: () => J((w) => !w),
                children: /* @__PURE__ */ ht("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ D("path", { d: "m17 2 4 4-4 4" }),
                  /* @__PURE__ */ D("path", { d: "M3 11v-1a4 4 0 0 1 4-4h14" }),
                  /* @__PURE__ */ D("path", { d: "m7 22-4-4 4-4" }),
                  /* @__PURE__ */ D("path", { d: "M21 13v1a4 4 0 0 1-4 4H3" })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ ht("div", { className: "audio-timeline-group", children: [
            /* @__PURE__ */ D(
              "div",
              {
                ref: ft,
                className: "audio-progress-hit",
                role: "slider",
                "aria-label": "Playback progress",
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                "aria-valuenow": Math.round(M * 100),
                tabIndex: 0,
                onPointerDown: W,
                onPointerMove: ot,
                onPointerUp: at,
                onPointerCancel: at,
                onClick: (w) => {
                  w.stopPropagation(), b(w.clientX);
                },
                onKeyDown: (w) => {
                  if (w.key === "ArrowLeft" || w.key === "ArrowDown") {
                    w.preventDefault();
                    const I = Math.max(0, M - 0.05);
                    Nt().seek(I), N(I);
                  } else if (w.key === "ArrowRight" || w.key === "ArrowUp") {
                    w.preventDefault();
                    const I = Math.min(1, M + 0.05);
                    Nt().seek(I), N(I);
                  }
                },
                children: /* @__PURE__ */ D("div", { className: "audio-progress-track", children: /* @__PURE__ */ D(
                  "div",
                  {
                    className: "audio-progress-fill",
                    style: { width: `${(M * 100).toFixed(1)}%` }
                  }
                ) })
              }
            ),
            /* @__PURE__ */ ht("div", { className: "audio-time-row", children: [
              /* @__PURE__ */ D("span", { children: ae(tt) }),
              /* @__PURE__ */ ht("span", { children: [
                "-",
                ae(rt)
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ ht("div", { className: "audio-controls-dock", children: [
          /* @__PURE__ */ D(
            "button",
            {
              type: "button",
              className: "audio-transport-btn",
              "aria-label": "Previous track",
              onClick: d,
              children: /* @__PURE__ */ ht("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ D("polygon", { points: "19 20 9 12 19 4 19 20" }),
                /* @__PURE__ */ D("line", { x1: "5", x2: "5", y1: "19", y2: "5" })
              ] })
            }
          ),
          /* @__PURE__ */ D(
            "button",
            {
              type: "button",
              className: "audio-play-btn",
              "aria-label": U ? "Pause" : "Play",
              onClick: y,
              children: U ? /* @__PURE__ */ ht("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ D("rect", { x: "14", y: "4", width: "4", height: "16", rx: "1" }),
                /* @__PURE__ */ D("rect", { x: "6", y: "4", width: "4", height: "16", rx: "1" })
              ] }) : /* @__PURE__ */ D("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ D("polygon", { points: "6 3 20 12 6 21 6 3" }) })
            }
          ),
          /* @__PURE__ */ D(
            "button",
            {
              type: "button",
              className: "audio-transport-btn",
              "aria-label": "Next track",
              onClick: E,
              children: /* @__PURE__ */ ht("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ D("polygon", { points: "5 4 15 12 5 20 5 4" }),
                /* @__PURE__ */ D("line", { x1: "19", x2: "19", y1: "5", y2: "19" })
              ] })
            }
          )
        ] })
      ]
    }
  );
}, Ce = ({
  children: m,
  radius: t,
  className: e = "",
  style: i,
  refraction: n = Et.refraction,
  thickness: r = Et.thickness,
  bevelWidth: c = Et.bevelWidth,
  frost: s = Et.frost,
  dispersion: u = Et.dispersion,
  sheen: v = Et.sheen,
  lightAngle: p = Et.lightAngle,
  darkness: o = Et.darkness,
  rim: g = Et.rim,
  fluidBrightness: R = Et.fluidBright,
  fluidSpeed: S = Et.fluidSpeed,
  fluidScale: V = Et.fluidScale,
  fluidAuraWidth: A = Et.fluidAuraWidth,
  fluidCenter: a = Et.fluidCenter,
  auroraFlow: f = Et.auroraFlow,
  hoverBrightness: h = Et.hoverBright,
  trackCursorLight: P = !0,
  lightTrackingStrength: F = Et.lightTrack,
  clickShockwave: G = !0,
  shockwaveStrength: Y = Et.clickWave,
  ...$
}) => {
  const z = Ht(), et = ct(null), it = ct(null), Q = ct({
    radius: t ?? 16,
    refraction: n,
    thickness: r,
    bevelWidth: c,
    frost: s,
    dispersion: u,
    sheen: v,
    lightAngle: p,
    darkness: o,
    rim: g,
    fluidBright: R,
    fluidSpeed: S,
    fluidScale: V,
    fluidAuraWidth: A,
    fluidCenter: a,
    auroraFlow: f,
    hoverBright: h,
    lightTrack: P ? F : 0,
    clickWave: G ? Y : 0
  });
  return vt(() => {
    Q.current = {
      ...Q.current,
      refraction: n,
      thickness: r,
      bevelWidth: c,
      frost: s,
      dispersion: u,
      sheen: v,
      lightAngle: p,
      darkness: o,
      rim: g,
      fluidBright: R,
      fluidSpeed: S,
      fluidScale: V,
      fluidAuraWidth: A,
      fluidCenter: a,
      auroraFlow: f,
      hoverBright: h,
      lightTrack: P ? F : 0,
      clickWave: G ? Y : 0
    };
  }, [
    n,
    r,
    c,
    s,
    u,
    v,
    p,
    o,
    g,
    R,
    S,
    V,
    A,
    a,
    f,
    h,
    P,
    F,
    G,
    Y
  ]), vt(() => {
    const k = et.current, C = it.current;
    if (!k || !C) return;
    const x = C.getContext("2d", { alpha: !0 });
    if (!x) return;
    const q = It(), B = {
      id: z,
      canvas: C,
      ctx: x,
      getParams: () => {
        const y = Math.min(window.devicePixelRatio || 1, 2), d = Math.min(C.width, C.height) * 0.5, E = parseFloat(window.getComputedStyle(k).borderRadius), b = t !== void 0 ? t : Number.isFinite(E) ? E : 16;
        return Q.current.radius = Math.min(b * y, d), Q.current;
      },
      curHover: 0,
      targetHover: 0,
      curMouseX: 0,
      curMouseY: 0,
      targetMouseX: 0,
      targetMouseY: 0,
      clickPos: [-999, -999],
      clickTime: -999,
      visible: !0
    }, H = () => {
      const y = Math.min(window.devicePixelRatio || 1, 2), d = Math.round(k.offsetWidth * y), E = Math.round(k.offsetHeight * y);
      (C.width !== d || C.height !== E) && (C.width = d, C.height = E);
    };
    H();
    const ft = new ResizeObserver(H);
    ft.observe(k);
    let O = null;
    typeof IntersectionObserver < "u" && (O = new IntersectionObserver(([y]) => {
      B.visible = y.isIntersecting;
    }), O.observe(k));
    const L = (y) => {
      const d = k.getBoundingClientRect(), E = d.left + d.width * 0.5, b = d.top + d.height * 0.5, W = Math.min(window.devicePixelRatio || 1, 2);
      B.targetMouseX = (y.clientX - E) * W, B.targetMouseY = (b - y.clientY) * W;
    }, U = (y) => {
      if (!(y instanceof Element) || y === k) return !1;
      const d = y.closest(
        "button, a, [role='button'], [role='switch'], [role='tab'], .tactile-card, .tactile-prompt-box, .tactile-audio-player"
      );
      return !!(d && k.contains(d));
    }, X = (y) => {
      if (L(y), U(y.target)) {
        B.targetHover = 0;
        return;
      }
      B.targetHover = 1;
    }, Z = (y) => {
      if (L(y), U(y.target)) {
        B.targetHover = 0;
        return;
      }
      B.targetHover = 1;
    }, J = (y) => {
      y.pointerType !== "touch" && (B.targetHover = 0);
    }, M = (y) => {
      U(y.target) || (L(y), B.targetHover = 1, B.clickPos = [B.targetMouseX, B.targetMouseY], B.clickTime = q.getTime());
    }, N = (y) => {
      const d = y.touches[0];
      if (d) {
        if (L(d), U(y.target)) {
          B.targetHover = 0;
          return;
        }
        B.targetHover = 1;
      }
    }, T = (y) => {
      const d = y.touches[0];
      if (!d) return;
      L(d);
      const E = document.elementFromPoint(d.clientX, d.clientY);
      if (!E || !k.contains(E) || U(E)) {
        B.targetHover = 0;
        return;
      }
      B.targetHover = 1;
    }, _ = () => {
      B.targetHover = 0;
    };
    return k.addEventListener("pointerenter", X), k.addEventListener("pointermove", Z), k.addEventListener("pointerleave", J), k.addEventListener("pointercancel", J), k.addEventListener("pointerdown", M), k.addEventListener("touchstart", N, { passive: !0 }), k.addEventListener("touchmove", T, { passive: !0 }), k.addEventListener("touchend", _, { passive: !0 }), k.addEventListener("touchcancel", _, { passive: !0 }), q.register(B), () => {
      q.unregister(z), ft.disconnect(), O && O.disconnect(), k.removeEventListener("pointerenter", X), k.removeEventListener("pointermove", Z), k.removeEventListener("pointerleave", J), k.removeEventListener("pointercancel", J), k.removeEventListener("pointerdown", M), k.removeEventListener("touchstart", N), k.removeEventListener("touchmove", T), k.removeEventListener("touchend", _), k.removeEventListener("touchcancel", _);
    };
  }, [z, t]), /* @__PURE__ */ ht(
    "div",
    {
      ref: et,
      className: `tactile-background ${e}`.trim(),
      style: {
        position: "relative",
        width: "100%",
        minHeight: "var(--bg-panel-min-h)",
        padding: "var(--bg-panel-pad)",
        borderRadius: t !== void 0 ? `${t}px` : "var(--bg-panel-radius)",
        border: "none",
        background: "transparent",
        outline: "none",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        WebkitTapHighlightColor: "transparent",
        ...i
      },
      ...$,
      children: [
        /* @__PURE__ */ D(
          "canvas",
          {
            ref: it,
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
              borderRadius: "inherit"
            }
          }
        ),
        /* @__PURE__ */ D(
          "div",
          {
            style: {
              position: "relative",
              zIndex: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            },
            children: m
          }
        )
      ]
    }
  );
}, Ye = Ce;
export {
  _t as AUDIO_DEFAULT_PARAMS,
  Et as BACKGROUND_DEFAULT_PARAMS,
  Tt as BUTTON_DEFAULT_PARAMS,
  kt as CARD_DEFAULT_PARAMS,
  re as DEFAULT_AUDIO_TRACKS,
  Me as FRAGMENT_SHADER,
  We as FluidCausticButton,
  Rt as HEADING_DEFAULT_PARAMS,
  Pt as PROMPT_DEFAULT_PARAMS,
  St as SWITCH_OFF_DEFAULT_PARAMS,
  yt as SWITCH_ON_DEFAULT_PARAMS,
  Pe as SharedCausticEngine,
  Mt as TABS_DEFAULT_PARAMS,
  Xe as TactileAgentInput,
  ze as TactileAudioPlayer,
  Re as TactileAudioSynth,
  Ce as TactileBackground,
  Ue as TactileButton,
  Ve as TactileCard,
  Ae as TactileCreditCard,
  de as TactileGlassButton,
  Ie as TactileGlassFx,
  Fe as TactileGlassStage,
  Se as TactileGlassWord,
  Ge as TactileHeading,
  Ye as TactileHeroBackground,
  Ee as TactilePromptInput,
  He as TactileSegmented,
  Ne as TactileSwitch,
  _e as TactileTabs,
  ye as VERTEX_SHADER,
  Nt as getSharedAudioSynth,
  It as getSharedCausticEngine
};
