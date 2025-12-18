"use client"

import { motion } from "framer-motion"
import { MonitorPlay } from "lucide-react"

// A custom Shoe SVG component using standard paths or a simplified shape
const ShoeIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M21.5 12.5C21.5 12.5 19.5 8.5 16 7L13 6.5L10 8L7 6L3 11V18H21.5V12.5Z" />
        <path d="M3 18H21.5V20H3V18Z" />
    </svg>
)

export function ShoeLoader({ text = "Loading..." }: { text?: string }) {
    const shoeVariants = {
        animate: {
            rotate: [0, 10, 0, -5, 0],
            y: [0, -10, 0],
            x: [0, 5, 10, 15, 20, 0], // Move forward then reset (moonwalk/roll feel)
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    const wheelVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: "linear"
            }
        }
    }

    // Using a simpler Lucide icon for reliable rendering if SVG is tricky, 
    // but let's try a composite for "rolling".
    // Actually, let's use a Footprint or standard icon but animate it nicely.

    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="relative h-16 w-32 flex items-end justify-center overflow-hidden">
                {/* Track/Road */}
                <motion.div
                    className="absolute bottom-0 h-1 w-full bg-slate-300"
                    initial={{ x: 0 }}
                    animate={{ x: -20 }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                >
                    <div className="w-2 h-1 bg-slate-400 absolute left-2" />
                    <div className="w-2 h-1 bg-slate-400 absolute left-8" />
                    <div className="w-2 h-1 bg-slate-400 absolute left-14" />
                    <div className="w-2 h-1 bg-slate-400 absolute left-24" />
                </motion.div>

                {/* The Shoe */}
                <motion.div
                    className="mb-1 text-primary"
                    animate={{
                        y: [0, -8, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                >
                    {/* Using a rough shoe shape with lucide didn't exist properly, let's use text/emoji or a generic path */}
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                        <path d="M12 12v9" />
                        <path d="m16 16-4-4-4 4" />
                        {/* Visual replacement: A sneaker outline */}
                        <path d="M17 19h4" />
                        <path d="M3 19h14" />
                        <path d="M3 19v-4c0-2 1-3.5 3-4l3-1 2-2 3 1v5Z" />
                        <circle cx="13" cy="19" r="2" />
                        <circle cx="6" cy="19" r="2" />
                    </svg>
                </motion.div>
            </div>

            {/* Progress Text */}
            <motion.p
                className="text-muted-foreground font-medium text-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                {text}
            </motion.p>
        </div>
    )
}
