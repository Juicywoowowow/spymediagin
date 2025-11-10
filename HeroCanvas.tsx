"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * HeroCanvas renders the fullscreen Three.js hero background:
 * - Animated camera lens / drone-inspired geometry
 * - Moving particles and light streaks for a cinematic feel
 * The scene is kept intentionally lightweight so it performs well on mobile.
 */
const HeroCanvas = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050506, 0.02);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    containerRef.current.appendChild(renderer.domElement);

    const lensGroup = new THREE.Group();
    scene.add(lensGroup);

    const lensMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x101116,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.95,
      transmission: 0.3,
    });

    // Outer ring of the lens
    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(3, 0.25, 32, 160),
      lensMaterial
    );
    lensGroup.add(outerRing);

    // Inner rotating blades
    const bladeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1b1d,
      emissive: 0x041f24,
      metalness: 1,
      roughness: 0.2,
    });

    for (let i = 0; i < 6; i += 1) {
      const blade = new THREE.Mesh(
        new THREE.RingGeometry(1.2, 1.8, 32, 1, 0, Math.PI / 3),
        bladeMaterial
      );
      blade.rotation.z = (i * Math.PI) / 3;
      lensGroup.add(blade);
    }

    // Central glass element
    const glass = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 48, 48),
      new THREE.MeshPhysicalMaterial({
        color: 0x0a0b0d,
        metalness: 0.2,
        roughness: 0,
        transmission: 0.9,
        thickness: 0.6,
        envMapIntensity: 1.2,
      })
    );
    lensGroup.add(glass);

    // Add light streak lines
    const streakMaterial = new THREE.LineBasicMaterial({
      color: 0x6bf2ff,
      transparent: true,
      opacity: 0.35,
    });

    const streakGeometry = new THREE.BufferGeometry();
    const streakVertices: number[] = [];
    for (let i = 0; i < 120; i += 1) {
      const angle = (i / 120) * Math.PI * 2;
      const radius = 4 + Math.random() * 1.5;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 2;
      const z = Math.sin(angle) * radius;
      streakVertices.push(x, y, z, x * 1.2, y * 1.2, z * 1.2);
    }
    streakGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(streakVertices, 3)
    );
    const streaks = new THREE.LineSegments(streakGeometry, streakMaterial);
    scene.add(streaks);

    // Floating particle fog
    const particlesCount = 500;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i += 1) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x6bf2ff,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const ambientLight = new THREE.AmbientLight(0x88a0ff, 0.6);
    scene.add(ambientLight);

    const rimLight = new THREE.PointLight(0x6bf2ff, 2.4, 30);
    rimLight.position.set(6, 4, 6);
    scene.add(rimLight);

    const warmLight = new THREE.PointLight(0xffd0a0, 1.2, 40);
    warmLight.position.set(-5, -2, -6);
    scene.add(warmLight);

    const clock = new THREE.Clock();

    const onResize = () => {
      if (!containerRef.current) {
        return;
      }
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", onResize);

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      lensGroup.rotation.z = elapsed * 0.15;
      glass.rotation.y = elapsed * 0.2;
      particles.rotation.y = elapsed * 0.05;
      streaks.rotation.y = elapsed * 0.02;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      particleGeometry.dispose();
      streakGeometry.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
};

export default HeroCanvas;

