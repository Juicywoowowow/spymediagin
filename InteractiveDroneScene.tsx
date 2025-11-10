"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * InteractiveDroneScene renders a lightweight stylised drone model visitors can rotate.
 * OrbitControls provide intuitive interaction on desktop and touch devices.
 */
const InteractiveDroneScene = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const width = wrapperRef.current.clientWidth;
    const height = wrapperRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x040405);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    wrapperRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 6;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.25;

    const spotlight = new THREE.SpotLight(0x6bf2ff, 2.5, 40, Math.PI / 6, 0.5);
    spotlight.position.set(7, 10, 6);
    spotlight.castShadow = false;
    scene.add(spotlight);

    const fillLight = new THREE.SpotLight(0xfff1d6, 1.2, 40, Math.PI / 5, 0.5);
    fillLight.position.set(-4, -3, -2);
    scene.add(fillLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const droneGroup = new THREE.Group();
    scene.add(droneGroup);

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x101217,
      metalness: 0.6,
      roughness: 0.3,
      emissive: 0x041317,
      emissiveIntensity: 0.4,
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0x6bf2ff,
      emissive: 0x0f3a40,
      emissiveIntensity: 0.8,
      metalness: 1,
      roughness: 0.05,
    });

    // Drone body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.35, 1),
      bodyMaterial
    );
    body.castShadow = false;
    droneGroup.add(body);

    // Front lens
    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.25, 0.5, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x1a2d30,
        transmission: 0.8,
        thickness: 0.4,
        roughness: 0.1,
        metalness: 0.2,
      })
    );
    lens.rotation.z = Math.PI / 2;
    lens.position.set(0.8, -0.1, 0);
    droneGroup.add(lens);

    // Arms & propellers
    const armGeometry = new THREE.CylinderGeometry(0.06, 0.06, 2.3, 24);
    const arm = new THREE.Mesh(armGeometry, bodyMaterial);
    arm.rotation.z = Math.PI / 2;
    arm.position.set(0, 0.05, 0.4);
    droneGroup.add(arm);

    const backArm = arm.clone();
    backArm.position.z = -0.4;
    droneGroup.add(backArm);

    const propellerGeometry = new THREE.CircleGeometry(0.35, 32);
    propellerGeometry.rotateX(-Math.PI / 2);

    const propellers: THREE.Mesh[] = [];
    const propPositions = [
      [1.15, 0.25, 0.4],
      [-1.15, 0.25, 0.4],
      [1.15, 0.25, -0.4],
      [-1.15, 0.25, -0.4],
    ];

    propPositions.forEach(([x, y, z]) => {
      const prop = new THREE.Mesh(propellerGeometry, accentMaterial);
      prop.position.set(x, y, z);
      droneGroup.add(prop);
      propellers.push(prop);
    });

    // Undercarriage lights
    const lightStrip = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.05, 0.12),
      accentMaterial
    );
    lightStrip.position.set(0, -0.15, 0);
    droneGroup.add(lightStrip);

    const clock = new THREE.Clock();

    const resize = () => {
      if (!wrapperRef.current) {
        return;
      }
      const newWidth = wrapperRef.current.clientWidth;
      const newHeight = wrapperRef.current.clientHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", resize);

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      controls.update();
      droneGroup.position.y = Math.sin(elapsed * 0.6) * 0.05;
      propellers.forEach((prop, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        prop.rotation.y = elapsed * 8 * direction;
      });
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      controls.dispose();
      renderer.dispose();
      if (wrapperRef.current?.contains(renderer.domElement)) {
        wrapperRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative h-[360px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-glass backdrop-blur-xl md:h-[420px]"
    />
  );
};

export default InteractiveDroneScene;

