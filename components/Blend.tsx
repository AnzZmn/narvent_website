import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { color } from "three/tsl";

type ColorBendsProps = {
  rotation?: number;
  speed?: number;
  colors?: string[];
  transparent?: boolean;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  iterations?: number;
  intensity?: number;
  bandWidth?: number;

  position?: [number, number, number];
  rotation3D?: [number, number, number];
};

const MAX_COLORS = 8;

const frag = `
#define MAX_COLORS ${MAX_COLORS}

uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;

varying vec2 vUv;

void main() {
    float t = uTime * uSpeed;

    vec2 p = vUv * 2.0 - 1.0;

    p += uPointer * uParallax * 0.1;

    vec2 rp = vec2(
        p.x * uRot.x - p.y * uRot.y,
        p.x * uRot.y + p.y * uRot.x
    );

    vec2 q = vec2(
        rp.x * (uCanvas.x / uCanvas.y),
        rp.y
    );

    q /= max(uScale, 0.0001);

    q /= 0.5 + 0.2 * dot(q, q);

    q += 0.2 * cos(t) - 7.56;

    vec2 toward = uPointer - rp;

    q += toward * uMouseInfluence * 0.2;

    for (int j = 0; j < 5; j++) {
        if (j >= uIterations - 1) break;

        vec2 rr = sin(
            1.5 * (q.yx * uFrequency)
            + 2.0 * cos(q * uFrequency)
        );

        q += (rr - q) * 0.15;
    }

    vec3 col = vec3(0.0);
    float a = 1.0;

    if (uColorCount > 0) {

        vec2 s = q;
        vec3 sumCol = vec3(0.0);
        float cover = 0.0;

        for (int i = 0; i < MAX_COLORS; ++i) {

            if (i >= uColorCount) break;

            s -= 0.01;

            vec2 r = sin(
                1.5 * (s.yx * uFrequency)
                + 2.0 * cos(s * uFrequency)
            );

            float m0 = length(
                r +
                sin(
                    5.0 * r.y * uFrequency
                    - 3.0 * t
                    + float(i)
                ) / 4.0
            );

            float kBelow = clamp(
                uWarpStrength,
                0.0,
                1.0
            );

            float kMix = pow(kBelow, 0.3);

            float gain =
                1.0 +
                max(uWarpStrength - 1.0, 0.0);

            vec2 disp = (r - s) * kBelow;

            vec2 warped = s + disp * gain;

            float m1 = length(
                warped +
                sin(
                    5.0 * warped.y * uFrequency
                    - 3.0 * t
                    + float(i)
                ) / 4.0
            );

            float m = mix(m0, m1, kMix);

            float w =
                1.0 -
                exp(
                    -uBandWidth /
                    exp(uBandWidth * m)
                );

            sumCol += uColors[i] * w;

            cover = max(cover, w);
        }

        col = clamp(sumCol, 0.0, 1.0);

        a = uTransparent > 0
            ? cover
            : 1.0;

    } else {

        vec2 s = q;

        for (int k = 0; k < 3; ++k) {

            s -= 0.01;

            vec2 r = sin(
                1.5 * (s.yx * uFrequency)
                + 2.0 * cos(s * uFrequency)
            );

            float m0 = length(
                r +
                sin(
                    5.0 * r.y * uFrequency
                    - 3.0 * t
                    + float(k)
                ) / 4.0
            );

            float kBelow = clamp(
                uWarpStrength,
                0.0,
                1.0
            );

            float kMix = pow(kBelow, 0.3);

            float gain =
                1.0 +
                max(uWarpStrength - 1.0, 0.0);

            vec2 disp = (r - s) * kBelow;

            vec2 warped = s + disp * gain;

            float m1 = length(
                warped +
                sin(
                    5.0 * warped.y * uFrequency
                    - 3.0 * t
                    + float(k)
                ) / 4.0
            );

            float m = mix(m0, m1, kMix);

            col[k] =
                1.0 -
                exp(
                    -uBandWidth /
                    exp(uBandWidth * m)
                );
        }

        a = uTransparent > 0
            ? max(max(col.r, col.g), col.b)
            : 1.0;
    }

    col *= uIntensity;

    if (uNoise > 0.0001) {

        float n = fract(
            sin(
                dot(
                    gl_FragCoord.xy + vec2(uTime),
                    vec2(12.9898, 78.233)
                )
            ) * 43758.5453123
        );

        col += (n - 0.5) * uNoise;

        col = clamp(col, 0.0, 1.0);
    }
    vec3 background = vec3(0.0);

    vec3 rgb = mix(
     background,
     col,
     a
    );

    gl_FragColor = vec4(rgb, 1.0);	
}
`;

const vert = `
varying vec2 vUv;

void main() {
    vUv = uv;

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(position, 1.0);
}
`;

export default function Blend({
  rotation = 90,
  speed = 0.2,
  colors = [],
  transparent = true,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.1,
  iterations = 1,
  intensity = 1.5,
  bandWidth = 6,

  position = [0, 0, -10],
  rotation3D = [0, 0, 0],
}: ColorBendsProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { size, pointer } = useThree();

  const colorVectors = useMemo(() => {
    const result = Array.from({ length: MAX_COLORS }, () => new THREE.Color());

    colors
      .filter(Boolean)
      .slice(0, MAX_COLORS)
      .forEach((hex, i) => {
        result[i].set(hex);
      });

    return result;
  }, [colors]);

  const uniforms = useMemo(() => {
    return {
      uCanvas: {
        value: new THREE.Vector2(size.width, size.height),
      },

      uTime: {
        value: 0,
      },

      uSpeed: {
        value: speed,
      },

      uRot: {
        value: new THREE.Vector2(1, 0),
      },

      uColorCount: {
        value: Math.min(colors.length, MAX_COLORS),
      },

      uColors: {
        value: colorVectors,
      },

      uTransparent: {
        value: transparent ? 1 : 0,
      },

      uScale: {
        value: scale,
      },

      uFrequency: {
        value: frequency,
      },

      uWarpStrength: {
        value: warpStrength,
      },

      uPointer: {
        value: new THREE.Vector2(),
      },

      uMouseInfluence: {
        value: mouseInfluence,
      },

      uParallax: {
        value: parallax,
      },

      uNoise: {
        value: noise,
      },

      uIterations: {
        value: iterations,
      },

      uIntensity: {
        value: intensity,
      },

      uBandWidth: {
        value: bandWidth,
      },
    };
  }, [colors]);

  useFrame((state, delta) => {
    const material = materialRef.current;

    if (!material) return;

    const elapsed = state.clock.elapsedTime;

    material.uniforms.uTime.value = elapsed;

    material.uniforms.uCanvas.value.set(size.width, size.height);

    /*
     * Mouse / pointer
     */
    material.uniforms.uPointer.value.lerp(pointer, Math.min(1, delta * 8));

    /*
     * Rotation
     */
    const deg = (rotation % 360) + autoRotate * elapsed;

    const rad = (deg * Math.PI) / 180;

    material.uniforms.uRot.value.set(Math.cos(rad), Math.sin(rad));

    /*
     * Live props
     */
    material.uniforms.uSpeed.value = speed;
    material.uniforms.uScale.value = scale;
    material.uniforms.uFrequency.value = frequency;
    material.uniforms.uWarpStrength.value = warpStrength;
    material.uniforms.uMouseInfluence.value = mouseInfluence;
    material.uniforms.uParallax.value = parallax;
    material.uniforms.uNoise.value = noise;
    material.uniforms.uIterations.value = iterations;
    material.uniforms.uIntensity.value = intensity;
    material.uniforms.uBandWidth.value = bandWidth;
    material.uniforms.uTransparent.value = transparent ? 1 : 0;
  });

  const { camera } = useThree();
  const plane = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!plane.current) return;
    plane.current.quaternion.copy(camera.quaternion);
    plane.current.position.copy(camera.position);
    plane.current.translateZ(-60);
  });

  return (
    <group position={position} rotation={rotation3D}>
      <mesh ref={plane}>
        <planeGeometry args={[112.5, 80]} />

        <shaderMaterial
          ref={materialRef}
          vertexShader={vert}
          fragmentShader={frag}
          uniforms={uniforms}
          transparent={transparent}
          premultipliedAlpha
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
