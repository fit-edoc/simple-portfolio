"use client";

import Link, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

interface TransitionLinkProps extends LinkProps {
    children: React.ReactNode;
    className?: string;
    href: string;
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({
    children,
    href,
    ...props
}: TransitionLinkProps) => {
    const router = useRouter();
    const pathname = usePathname(); // 👈 get current route

    const handleTransition = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        // 🔥 1. If user clicks the SAME page, stop transition
        if (pathname === href) {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        // 2. If browser doesn't support view transitions → normal nav
        if (!document.startViewTransition) {
            router.push(href);
            return;
        }

        // 3. Run animated transition only if going to a new route
        document.startViewTransition(async () => {
            router.push(href);
            await sleep(500);
        });
    };

    return (
        <Link onClick={handleTransition} href={href} {...props}>
            {children}
        </Link>
    );
};
