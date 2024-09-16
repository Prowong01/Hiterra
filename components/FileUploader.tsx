"use client";

import { UploadButton } from "../lib/uploadthing";

interface FileUploaderProps {
    onFileUpload: (urls: string[]) => void;
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
    return (
        <main className="flex flex-col items-center justify-between p-24">
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    if (Array.isArray(res)) {
                        const fileUrls = res.map(file => file.url);
                        onFileUpload(fileUrls);
                        alert("Upload Completed");
                    }
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
        </main>
    );
}