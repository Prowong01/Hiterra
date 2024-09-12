"use client";

import { useRouter } from "next/navigation";

import { Button, Result } from 'antd';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<div className="mt-8 flex justify-center gap-2">
                    <Button onClick={() => router.back()} type="primary" size="large">
                        Go back
                    </Button>
                    <Button
                        onClick={() => router.push("/")}
                        type="default"
                        size="large"
                    >
                        Back to Home
                    </Button>
                </div>}
            />
        </div>
    );
}
