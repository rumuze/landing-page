import { useState, useEffect, useRef } from 'react';

/**
 * Easing function for smooth animation
 * Ease-out quartic
 */
const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

/**
 * Custom hook to animate a counter from 0 to a target value.
 * Handles prefixes, suffixes, decimal places, and intersection observation.
 * 
 * @param {string|number} targetValue - The target value to animate to (e.g., "47+", "99.9%")
 * @param {number} duration - Animation duration in milliseconds
 * @returns {object} { ref, display } - Ref to attach to the element, and current display string
 */
export function useCounterAnimation(targetValue, duration = 2000) {
    const ref = useRef(null);

    // Set initial state matching target format (e.g., "0+" for "47+", "0.0%" for "99.9%")
    const [display, setDisplay] = useState(() => {
        const strValue = String(targetValue);
        const match = strValue.match(/^([+-]?)(\d+\.?\d*)(.*)$/);
        if (!match) return strValue;
        const isDecimal = strValue.includes('.');
        return `${match[1] || ''}${isDecimal ? '0.0' : '0'}${match[3] || ''}`;
    });

    useEffect(() => {
        const strValue = String(targetValue);
        const match = strValue.match(/^([+-]?)(\d+\.?\d*)(.*)$/);
        let resetFrameId = null;

        if (!match) {
            resetFrameId = requestAnimationFrame(() => {
                setDisplay(strValue);
            });

            return () => {
                if (resetFrameId) cancelAnimationFrame(resetFrameId);
            };
        }

        const element = ref.current;
        if (!element) {
            return;
        }

        const prefix = match[1] || '';
        const targetNumber = parseFloat(match[2]);
        const suffix = match[3] || '';
        const isDecimal = strValue.includes('.');

        let startTime = null;
        let animationFrameId = null;
        let observer = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;

            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = targetNumber * easedProgress;

            const formattedNumber = isDecimal ? current.toFixed(1) : Math.floor(current);
            setDisplay(`${prefix}${formattedNumber}${suffix}`);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                // Enforce exact final value
                setDisplay(strValue);
            }
        };

        resetFrameId = requestAnimationFrame(() => {
            setDisplay(`${prefix}${isDecimal ? '0.0' : '0'}${suffix}`);
        });

        observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                // Stop any running frame, reset timestamp, start animation
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
                startTime = null;
                animationFrameId = requestAnimationFrame(animate);

                // Unobserve to run exactly once per component mount (handles React Router navigations)
                observer.unobserve(element);
            }
        }, { threshold: 0.1 });

        observer.observe(element);

        return () => {
            if (resetFrameId) cancelAnimationFrame(resetFrameId);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (observer && element) observer.disconnect();
        };
    }, [targetValue, duration]);

    return { ref, display };
}
