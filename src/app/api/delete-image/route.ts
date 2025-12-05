import { NextRequest, NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, BUCKET_NAME } from "@/lib/s3";

export async function DELETE(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "No URL provided" }, { status: 400 });
        }

        // Extract the key from the URL
        // URL format: https://beekeeper-store.s3.eu-north-1.amazonaws.com/folder/filename.jpg
        const urlParts = url.split('.amazonaws.com/');
        if (urlParts.length !== 2) {
            return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
        }

        const key = urlParts[1]; // e.g., "products/123456-image.jpg"

        const command = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        });

        await s3Client.send(command);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
