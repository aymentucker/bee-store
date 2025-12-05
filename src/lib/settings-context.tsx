"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { defaultSettings } from "@/data/default-settings";

interface Settings {
    siteName: string;
    logoUrl: string;
    faviconUrl: string;
    currency: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    headerScripts: string;
    footerScripts: string;
    primaryColor: string;
    fontFamily: string;
    aboutUs: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    privacyPolicy: string;
    termsConditions: string;
}

const SettingsContext = createContext<Settings>(defaultSettings as Settings);

export function useSettings() {
    return useContext(SettingsContext);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<Settings>(defaultSettings as Settings);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "settings", "global");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // Merge fetched data with defaults (fetched data takes priority)
                    setSettings({ ...defaultSettings, ...docSnap.data() } as Settings);
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
                // Keep using default settings on error
            }
        };

        fetchSettings();
    }, []);

    // Apply theme dynamically
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
        }
    }, [settings.primaryColor]);

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
}
