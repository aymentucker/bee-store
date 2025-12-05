"use client";

import { useEffect } from "react";

export function VisitorTracker() {
    useEffect(() => {
        // Track visit on component mount
        const trackVisit = async () => {
            try {
                await fetch("/api/track-visit", {
                    method: "POST",
                });
            } catch (error) {
                console.error("Failed to track visit:", error);
            }
        };

        trackVisit();
    }, []);

    return null; // This component doesn't render anything
}
