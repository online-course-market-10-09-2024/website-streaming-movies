import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/libs/utils";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

type NavItem = {
    name: string;
    link: string;
    icon?: JSX.Element;
};

export const FloatingNav = ({
                                navItems,
                                className,
                            }: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();
    const navigate = useNavigate();

    const [visible, setVisible] = useState(true);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        const direction = current! - scrollYProgress.getPrevious()!;
        console.log(direction);
        if (scrollYProgress.get() < 0) {
            setVisible(false);
        } else {
            if (direction <= 0) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: 0,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                className={cn(
                    "flex max-w-fit fixed top-5 inset-x-0 mx-5 border-white/[0.2] rounded-full bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] items-center justify-center space-x-4",
                    className,
                )}
            >
                <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="bg-black text-white flex items-center space-x-2"
                >
                    {navItems.map((navItem: NavItem, idx: number) => (
                        <div
                            key={`link=${idx}`}
                            onClick={() => navigate(navItem.link)}
                            className={cn(
                                "relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300",
                            )}
                        >
                            <span className="block max-w-sm:hidden">{navItem.icon}</span>
                            <span className="absolute inset-x-0 w-full mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                            <span className="hidden sm:block text-xl">{navItem.name}</span>
                        </div>
                    ))}
                </HoverBorderGradient>
            </motion.div>
        </AnimatePresence>
    );
};