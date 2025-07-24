import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Main App Component with Scroll Animation
export default function HeroGlobe() {
  const heroSectionRef = useRef(null);
  const globeWrapperRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    // This timeline will control the animations linked to the scroll position
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: 'top top', // Animation starts when the top of the hero section hits the top of the viewport
        end: '+=900',    // The animation will last for a shorter 900px of scrolling
        scrub: 1,        // Smoothly links the animation progress to the scrollbar
        pin: true,       // Pins the hero section while the animation is active
        anticipatePin: 1,
      },
    });

    // Animate the globe to the bottom-right corner and scale it up
    tl.to(globeWrapperRef.current, {
      x: '50vw',  // Move further right
      y: '45vh',  // Move further down to cut off the top/left
      scale: 1.8,   // Adjust scale for the corner view
      ease: 'power2.inOut',
    })
    // Animate the hero text fading in from the left
    .to(heroTextRef.current, {
      opacity: 1,
      x: 0, // Animate from its initial translated position to 0
      ease: 'power2.inOut',
    }, '<'); // The '<' ensures this animation starts at the same time as the previous one

    // Cleanup function to kill ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-white text-black overflow-x-hidden">
      {/* Hero Section: This is the main container for the scroll animation */}
      <section ref={heroSectionRef} className="h-screen w-screen relative">
        {/* Wrapper for the Globe, centered initially */}
        <div ref={globeWrapperRef} className="absolute inset-0 flex items-center justify-center">
          <Globe />
        </div>
        {/* Wrapper for the hero text, now positioned on the left */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-1/3">
          <div ref={heroTextRef} style={{ opacity: 0, transform: 'translateX(-100px)' }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">Welcome to Finzep</h1>
            <p className="text-lg md:text-xl text-gray-700">
              Powering global fintech innovation. Experience seamless financial solutions with our cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Second Section: Content that appears after the scroll animation is complete */}
      <section className="h-screen w-screen flex items-center justify-center bg-orange-50">
        <h2 className="text-5xl font-bold text-orange-900">The Next Chapter</h2>
      </section>
    </div>
  );
}

// Globe Component
function Globe() {
  const mountRef = useRef(null);
  const sphereRef = useRef(null);

  useEffect(() => {
    // === THREE.JS CODE START ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: mountRef.current,
      alpha: true, // Make canvas transparent to see background
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Set clear color to transparent

    // OrbitControls are set up but disabled for user interaction.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false; // Disable all user controls (zoom, pan, rotate)
    controls.autoRotate = false; // Disable auto-rotation to allow for scroll-based rotation

    // Use a day-time texture for the globe
    const sphereGeometry = new THREE.SphereGeometry(5, 50, 50);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('https://unpkg.com/three-globe@2.27.1/example/img/earth-day.jpg',
      () => console.log("Texture loaded successfully"),
      undefined,
      (err) => {
        console.error('An error occurred loading the texture:', err);
        sphereRef.current.material = new THREE.MeshStandardMaterial({ color: 0xffa500 });
      }
    );
    const sphereMaterial = new THREE.MeshStandardMaterial({ map: texture });
    sphereRef.current = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphereRef.current);

    // Add an orange dot to mark India
    const indiaDotGeometry = new THREE.SphereGeometry(0.08, 20, 20); // Small sphere
    const indiaDotMaterial = new THREE.MeshBasicMaterial({ color: 0xFF5733 }); // Bright orange color
    const indiaDot = new THREE.Mesh(indiaDotGeometry, indiaDotMaterial);
    
    // Convert latitude/longitude of India to 3D coordinates
    const lat = 20.5937;
    const lon = 78.9629;
    const radius = 5;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    indiaDot.position.set(x, y, z);
    sphereRef.current.add(indiaDot); // Add the dot as a child of the globe

    // Atmosphere with an orange glow
    const atmosphereGeometry = new THREE.SphereGeometry(5, 50, 50);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `varying vec3 vertexNormal; void main() { vertexNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying vec3 vertexNormal; void main() { float intensity = pow(0.8 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0); gl_FragColor = vec4(1.0, 0.6, 0.2, 1.0) * intensity; }`,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.scale.set(1.1, 1.1, 1.1);
    scene.add(atmosphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    camera.position.z = 15;

    // Initial load-in animation
    gsap.timeline()
      .fromTo(sphereRef.current.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 2, ease: "power3.out" })
      // Changed camera's final z position from 10 to 15 to make the globe appear smaller
      .fromTo(camera.position, { z: 30 }, { z: 15, duration: 2.5, ease: "power3.inOut" }, "-=2");
      
    // Rotate globe to show India on scroll
    gsap.to(sphereRef.current.rotation, {
      scrollTrigger: {
        trigger: ".h-screen.w-screen.relative", // Using a class selector for the trigger
        start: 'top top',
        end: '+=900',
        scrub: 1,
      },
      // Rotate to bring the longitude and latitude of India to the front
      y: -lon * (Math.PI / 180),
      x: -lat * (Math.PI / 180),
      ease: 'power2.inOut',
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const width = mountRef.current.parentElement.clientWidth;
      const height = mountRef.current.parentElement.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      // Dispose of all created THREE.js objects
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      texture.dispose();
      indiaDotGeometry.dispose();
      indiaDotMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      controls.dispose();
    };
  }, []);

  return <canvas ref={mountRef} className="w-full h-full" />;
} 