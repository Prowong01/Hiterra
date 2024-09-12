import { Menu, MenuItem, ProductItem } from "../components/ui/navbar-menu";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <>
            {active && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-40" />
            )}

            <div
                className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 text-md", className)}
            >
                <Menu setActive={setActive}>
                    <MenuItem setActive={setActive} active={active} item="Begin Here!">
                        <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                            <ProductItem
                                title="Sign Up"
                                href="/sign-up"
                                src="/sign-up.png"
                                description="New here? Register now and explore what we have to offer."
                            />
                            <ProductItem
                                title="Sign In"
                                href="/sign-in"
                                src="/sign-in.png"
                                description="Log in to continue your journey with us"
                            />
                        </div>
                    </MenuItem>
                </Menu>
            </div>
        </>

    );
}