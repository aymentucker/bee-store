"use client";

import { useSettings } from "@/lib/settings-context";
import { useEffect } from "react";

export function DynamicFont() {
    const { fontFamily } = useSettings();

    useEffect(() => {
        // Remove previous font link if exists
        const existingLink = document.getElementById('dynamic-font');
        if (existingLink) {
            existingLink.remove();
        }

        // Add new font link
        const link = document.createElement('link');
        link.id = 'dynamic-font';
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@400;600;700&display=swap`;
        document.head.appendChild(link);

        // Apply font to body
        document.documentElement.style.setProperty('--font-family', fontFamily);
    }, [fontFamily]);

    return null;
}
