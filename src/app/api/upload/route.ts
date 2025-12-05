import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, BUCKET_NAME } from "@/lib/s3";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const folder = formData.get("folder") as string || "products"; // Default to products

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${folder}/${Date.now()}-${file.name.replace(/\s/g, "-")}`;

        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: buffer,
            ContentType: file.type,
        });

        await s3Client.send(command);

        // Construct the public URL
        const url = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;

        return NextResponse.json({ urls: [url] });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
