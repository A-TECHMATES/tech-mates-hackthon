'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * A slowly rotating wireframe icosahedron with an inner core and orbiting nodes.
 * Used as the centerpiece of the Mission section.
 */
export default function MissionOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Outer wireframe shell
    const shellGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0xd3beed,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    scene.add(shell);

    // Inner core
    const coreGeo = new THREE.IcosahedronGeometry(1.1, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x77658f,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Orbiting nodes
    const nodes: THREE.Mesh[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xcfcaff });
    for (let i = 0; i < 14; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const r = 2.6 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      node.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      node.userData = { speed: 0.2 + Math.random() * 0.4, axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize() };
      nodes.push(node);
      scene.add(node);
    }

    // Faint connecting lines from core to each node
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x77658f,
      transparent: true,
      opacity: 0.12,
    });
    nodes.forEach((n) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        n.position.clone(),
      ]);
      scene.add(new THREE.Line(geo, lineMat));
    });

    let frameId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      shell.rotation.y = t * 0.08;
      shell.rotation.x = t * 0.04;
      core.rotation.y = -t * 0.2;
      core.rotation.z = t * 0.1;
      nodes.forEach((n) => {
        n.position.applyAxisAngle(n.userData.axis, n.userData.speed * 0.01);
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      shellGeo.dispose();
      shellMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full max-w-[440px]"
      aria-hidden="true"
    />
  );
}
