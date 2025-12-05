import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const COOLDOWN_HOURS = 5;

export async function POST(req: NextRequest) {
    try {
        // Get IP address from request
        const forwarded = req.headers.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(",")[0] : req.headers.get("x-real-ip") || "unknown";

        if (ip === "unknown") {
            return NextResponse.json({ success: false, message: "Could not determine IP" });
        }

        // Hash IP for privacy (simple hash)
        const hashedIp = Buffer.from(ip).toString('base64').replace(/[^a-zA-Z0-9]/g, '_');

        const now = Date.now();
        const cooldownMs = COOLDOWN_HOURS * 60 * 60 * 1000;

        // Check if this IP visited recently
        const visitorRef = doc(db, "visitors", hashedIp);
        const visitorSnap = await getDoc(visitorRef);

        let shouldCount = true;

        if (visitorSnap.exists()) {
            const lastVisit = visitorSnap.data().lastVisit;
            const timeSinceLastVisit = now - lastVisit;

            if (timeSinceLastVisit < cooldownMs) {
                // Within cooldown period, don't count
                shouldCount = false;
            } else {
                // Update last visit time
                await updateDoc(visitorRef, {
                    lastVisit: now,
                    visitCount: increment(1),
                });
            }
        } else {
            // New visitor
            await setDoc(visitorRef, {
                lastVisit: now,
                visitCount: 1,
                firstVisit: now,
            });
        }

        // Increment total views counter only if should count
        if (shouldCount) {
            const statsRef = doc(db, "analytics", "stats");
            const statsSnap = await getDoc(statsRef);

            if (statsSnap.exists()) {
                await updateDoc(statsRef, {
                    totalViews: increment(1),
                    lastUpdated: now,
                });
            } else {
                await setDoc(statsRef, {
                    totalViews: 1,
                    lastUpdated: now,
                });
            }
        }

        return NextResponse.json({
            success: true,
            counted: shouldCount,
            message: shouldCount ? "Visit counted successfully" : "Visit not counted (cooldown period)"
        });
    } catch (error) {
        console.error("Analytics error:", error);
        // Return success even on error to not break the page
        return NextResponse.json({
            success: true,
            counted: false,
            error: "Failed to track visit"
        });
    }
}
