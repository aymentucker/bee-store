"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function GlobalScripts() {
    const [scripts, setScripts] = useState<{ header: string; footer: string } | null>(null);

    useEffect(() => {
        const fetchScripts = async () => {
            try {
                const docRef = doc(db, "settings", "global");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setScripts({
                        header: data.headerScripts || "",
                        footer: data.footerScripts || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching global scripts:", error);
            }
        };

        fetchScripts();
    }, []);

    if (!scripts) return null;

    return (
        <>
            {scripts.header && (
                <div dangerouslySetInnerHTML={{ __html: scripts.header }} />
            )}
            {/* Footer scripts are usually placed at the end of body, but here we render them. 
          If they are script tags, they will execute. */}
            {scripts.footer && (
                <div dangerouslySetInnerHTML={{ __html: scripts.footer }} />
            )}
        </>
    );
}
