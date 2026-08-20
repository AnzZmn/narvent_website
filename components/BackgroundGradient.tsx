export default function BackgroundPlane() {
  const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position = projectionMatrix *
                  modelViewMatrix *
                  vec4(position, 1.0);
  }
`;

  const fragmentShader = `
  varying vec2 vUv;

  uniform float uTime;

  // ----------------------------------------
  // Smooth Gaussian glow
  // ----------------------------------------

  float glow(
    vec2 uv,
    vec2 position,
    float radius
  ) {
    float d = distance(uv, position);

    return exp(
      -(d * d) /
      (radius * radius)
    );
  }

  // ----------------------------------------
  // Simple hash noise
  // ----------------------------------------

  float hash(vec2 p) {
    return fract(
      sin(
        dot(
          p,
          vec2(127.1, 311.7)
        )
      ) * 43758.5453123
    );
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(
      mix(a, b, f.x),
      mix(c, d, f.x),
      f.y
    );
  }

  void main() {

    vec2 uv = vUv;

    // ----------------------------------------
    // Base
    // ----------------------------------------

    vec3 background =
      vec3(
        0.006,
        0.004,
        0.012
      );

    // ----------------------------------------
    // Purple colors
    // ----------------------------------------

    vec3 purple =
      vec3(
        0.43,
        0.16,
        0.95
      );

    vec3 violet =
      vec3(
        0.65,
        0.25,
        1.0
      );

    vec3 magenta =
      vec3(
        0.85,
        0.30,
        0.95
      );

    // ----------------------------------------
    // Large bottom-left glow
    // ----------------------------------------

    float glow1 = glow(
      uv,
      vec2(
        0.28,
        0.12
      ),
      0.35
    );

    // ----------------------------------------
    // Large center glow
    // ----------------------------------------

    float glow2 = glow(
      uv,
      vec2(
        0.48,
        0.20
      ),
      0.27
    );

    // ----------------------------------------
    // Right-side glow
    // ----------------------------------------

    float glow3 = glow(
      uv,
      vec2(
        0.82,
        0.16
      ),
      0.35
    );

    // ----------------------------------------
    // Purple light fields
    // ----------------------------------------

    background +=
      purple *
      glow1 *
      0.95;

    background +=
      violet *
      glow2 *
      0.85;

    background +=
      magenta *
      glow3 *
      0.75;

    // ----------------------------------------
    // Horizontal atmospheric field
    // ----------------------------------------

    float atmosphere =
      smoothstep(
        0.65,
        0.0,
        uv.y
      );

    background +=
      vec3(
        0.20,
        0.05,
        0.35
      ) *
      atmosphere *
      0.18;

    // ----------------------------------------
    // Animated distortion
    // ----------------------------------------

    float n = noise(
      uv * 3.0 +
      vec2(
        uTime * 0.015,
        uTime * 0.01
      )
    );

    background +=
      purple *
      n *
      0.025;

    // ----------------------------------------
    // Fine film grain
    // ----------------------------------------

    float grain =
      hash(
        uv * 1500.0 +
        uTime
      );

    background +=
      (grain - 0.5) *
      0.025;

    // ----------------------------------------
    // Slight vignette
    // ----------------------------------------

    vec2 centered =
      uv - 0.5;

    float vignette =
      1.0 -
      dot(
        centered,
        centered
      ) *
      0.65;

    background *= vignette;

    gl_FragColor =
      vec4(
        background,
        1.0
      );
  }
`;
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0, -10]} frustumCulled={false}>
      <planeGeometry args={[100, 100]} />

      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: {
            value: 0,
          },
        }}
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </mesh>
  );
}
