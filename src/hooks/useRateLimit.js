import { useState, useEffect, useCallback } from 'react';

export const useRateLimit = (key, maxAttempts = 5, windowMs = 15 * 60 * 1000) => { // 5 Kali per 15 menit default
    const [attempts, setAttempts] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        const storedData = localStorage.getItem(`rateLimit_${key}`);
        if (storedData) {
            const { attempts: storedAttempts, timestamp } = JSON.parse(storedData);
            const now = Date.now();
            
            if (now - timestamp < windowMs) {
                setAttempts(storedAttempts);
                if (storedAttempts >= maxAttempts) {
                    setIsBlocked(true);
                    setTimeRemaining(windowMs - (now - timestamp));
                }
            } else {
                localStorage.removeItem(`rateLimit_${key}`);
                setAttempts(0);
                setIsBlocked(false);
            }
        }
    }, [key, maxAttempts, windowMs]);

    useEffect(() => {
        let interval;
        if (isBlocked && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1000) {
                        setIsBlocked(false);
                        setAttempts(0);
                        localStorage.removeItem(`rateLimit_${key}`);
                        return 0;
                    }
                    return prev - 1000;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isBlocked, timeRemaining, key]);

    const addAttempt = useCallback(() => {
        const newAttempts = attempts + 1;
        const timestamp = Date.now();
        
        setAttempts(newAttempts);
        localStorage.setItem(`rateLimit_${key}`, JSON.stringify({
            attempts: newAttempts,
            timestamp
        }));

        if (newAttempts >= maxAttempts) {
            setIsBlocked(true);
            setTimeRemaining(windowMs);
        }
    }, [attempts, key, maxAttempts, windowMs]);

    const reset = useCallback(() => {
        setAttempts(0);
        setIsBlocked(false);
        setTimeRemaining(0);
        localStorage.removeItem(`rateLimit_${key}`);
    }, [key]);

    const formatTimeRemaining = useCallback(() => {
        const minutes = Math.floor(timeRemaining / 60000);
        const seconds = Math.floor((timeRemaining % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, [timeRemaining]);

    return {
        attempts,
        isBlocked,
        timeRemaining,
        addAttempt,
        reset,
        remainingAttempts: Math.max(0, maxAttempts - attempts),
        formatTimeRemaining
    };
};