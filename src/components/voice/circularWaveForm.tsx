/**
 * @fileoverview Circular Wave Form Animation Component
 *
 * This file contains the CircularWaveForm component that creates animated
 * wave patterns around a circular path on the scenario page. Used for visual
 * feedback during voice interactions with customizable animation properties.
 *
 * @author LeetCare Development Team
 */

import { useState, useEffect, useRef } from "react";

interface CircularWaveFormProps {
  /** Whether the wave animation should be active */
  isActive: boolean;

  /** Optional CSS class names for styling */
  className?: string;

  /** Speed of wave rotation in milliseconds @default 3000 */
  rotationSpeed?: number;

  /** Speed of amplitude pulsing in milliseconds @default 1000 */
  pulseSpeed?: number;

  /** Maximum amplitude of waves @default 30 */
  maxAmplitude?: number;

  /** Number of waves around the circle @default 4 */
  waveCount?: number;

  /** Transition speed for smooth state changes in milliseconds @default 1000 */
  transitionSpeed?: number;
}

/**
 * Circular Wave Form Animation Component
 *
 * Animated SVG wave pattern that rotates around a circular path with
 * pulsing amplitude. Smoothly transitions between active and inactive
 * states with customizable animation parameters.
 *
 * @example
 * ```tsx
 * <CircularWaveForm
 *   isActive={isSpeaking}
 *   rotationSpeed={2000}
 *   maxAmplitude={40}
 * />
 * ```
 */
export default function CircularWaveForm({
  isActive,
  className = "cursor-pointer",
  rotationSpeed = 6000, // One full rotation every 3 seconds
  pulseSpeed = 1000, // Pulse every 1 seconds
  maxAmplitude = 30, // Max wave height
  waveCount = 4, // Number of waves around circle
  transitionSpeed = 1000, // Time in ms for transition
}: CircularWaveFormProps) {
  const [amplitude, setAmplitude] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [targetAmplitude, setTargetAmplitude] = useState(0);
  // const [isAnimating, setIsAnimating] = useState(false);
  // const isAnimatingRef = useRef(false);
  const requestRef = useRef<number>();
  const startTime = useRef(Date.now());
  const lastUpdateTime = useRef(Date.now());

  useEffect(() => {
    // Update target amplitude based on active state
    setTargetAmplitude(isActive ? maxAmplitude : 0);
  }, [isActive, maxAmplitude]);

  // const toggleAnimation = () => {
  //   console.log("SVG Clicked")
  //   isAnimatingRef.current = !isAnimatingRef.current;
  //   console.log("Animation toggled:", isAnimatingRef.current);
  // };

  useEffect(() => {
    /*
     * Main animation loop that handles rotation, pulsing, and smooth transitions.
     */
    const animate = () => {
      // if (isAnimating) return;
      // if (!isAnimatingRef.current) return;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;
      const elapsed = currentTime - startTime.current;

      // Calculate rotation
      const newRotation = (elapsed / rotationSpeed) * Math.PI * 2;
      setRotation(newRotation);

      // Calculate pulsing effect (only when fully transitioned to active)
      const pulsePhase = (elapsed / pulseSpeed) * Math.PI * 2;
      const pulseAmount = (Math.sin(pulsePhase) + 1) / 2;

      // Smooth transition logic
      const transitionRate = deltaTime / transitionSpeed;
      const currentTarget = isActive ? targetAmplitude * pulseAmount : 0;

      setAmplitude((current) => {
        const diff = currentTarget - current;
        return current + diff * Math.min(transitionRate * 3, 1);
      });

      lastUpdateTime.current = currentTime;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [
    isActive,
    rotationSpeed,
    pulseSpeed,
    maxAmplitude,
    transitionSpeed,
    targetAmplitude,
  ]);

  /*
   * Generates SVG path data for circular sine wave pattern.
   */
  const generatePath = () => {
    const points = 100; // Number of points around the circle
    const baseRadius = 140; // Base circle radius
    let pathData = "";

    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;

      // Key change here: Add 1 to the sine wave before multiplying by amplitude/2
      // This transforms the sine wave from [-1, 1] to [0, 2] range
      // Then we halve the amplitude to maintain the same max distance
      const sineWave =
        (Math.sin(angle * waveCount + rotation) + 1) * (amplitude / 2);
      const radius = baseRadius + sineWave;

      // Convert to cartesian coordinates
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      pathData += `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }
    return pathData + "Z"; // Close the path
  };

  return (
    <svg
      viewBox="-160 -160 320 320"
      className={`absolute top-1/2 left-1/2 size-[130%] -translate-x-1/2 -translate-y-1/2 ${className}`}
    >
      <path
        d={generatePath()}
        className="fill-cobalt-500 stroke-cobalt-500 stroke-[1.5]"
      />
    </svg>
  );
}
