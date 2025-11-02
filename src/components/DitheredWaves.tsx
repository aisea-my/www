"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { wrapEffect, EffectComposer } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import { useRef, ReactNode } from "react";
import * as THREE from "three";

import fragmentShader from "../shaders/fragmentShader.glsl";
import waveVertexShader from "../shaders/waveVertexShader.glsl";
import waveFragmentShader from "../shaders/waveFragmentShader.glsl";

const DEVICE_PIXEL_RATIO = 1;
const DEFAULT_COLOR_COUNT = 4.0;
const DEFAULT_PIXEL_SIZE = 2.0;

interface RetroEffectUniforms {
  colorNum: THREE.Uniform<number>;
  pixelSize: THREE.Uniform<number>;
  palette: THREE.Uniform<THREE.Texture>;
}

class RetroEffectImpl extends Effect {
  public uniforms: Map<string, THREE.Uniform>;

  constructor(palette: THREE.Texture) {
    const uniforms = new Map<string, THREE.Uniform>([
      ["colorNum", new THREE.Uniform(DEFAULT_COLOR_COUNT)],
      ["pixelSize", new THREE.Uniform(DEFAULT_PIXEL_SIZE)],
      ["palette", new THREE.Uniform(palette)],
    ]);

    super("RetroEffect", fragmentShader, {
      uniforms,
    });

    this.uniforms = uniforms;
  }

  set colorNum(value: number) {
    this.uniforms.get("colorNum")!.value = value;
  }

  get colorNum(): number {
    return this.uniforms.get("colorNum")!.value;
  }

  set pixelSize(value: number) {
    this.uniforms.get("pixelSize")!.value = value;
  }

  get pixelSize(): number {
    return this.uniforms.get("pixelSize")!.value;
  }

  set palette(value: THREE.Texture) {
    this.uniforms.get("palette")!.value = value;
  }

  get palette(): THREE.Texture {
    return this.uniforms.get("palette")!.value;
  }
}

const RetroEffect = wrapEffect(RetroEffectImpl);

const WaveMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useRef({
    time: { value: 0.0 },
    resolution: { value: new THREE.Vector2() },
  });

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = state.clock.getElapsedTime();
      material.uniforms.resolution.value.set(
        window.innerWidth * DEVICE_PIXEL_RATIO,
        window.innerHeight * DEVICE_PIXEL_RATIO
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        fragmentShader={waveFragmentShader}
        vertexShader={waveVertexShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
};

interface SceneProps {
  children?: ReactNode;
}

const Scene = ({ children }: SceneProps) => {
  const paletteTexture = useTexture("/palette.png");
  paletteTexture.wrapS = THREE.RepeatWrapping;
  paletteTexture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <WaveMesh />
      {children}
      <EffectComposer>
        <RetroEffect palette={paletteTexture} />
      </EffectComposer>
    </>
  );
};

interface DitheredWavesProps {
  children?: ReactNode;
}

export const DitheredWaves = ({ children }: DitheredWavesProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 6] }} dpr={[1, 2]}>
      <Scene>{children}</Scene>
    </Canvas>
  );
};
