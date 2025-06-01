"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface LogoProps {
  variant?: "horizontal" | "vertical" | "icon-only"
  size?: "small" | "medium" | "large"
  className?: string
  href?: string
}

export default function Logo({ variant = "horizontal", size = "medium", className = "", href = "/" }: LogoProps) {
  // Size mappings
  const sizes = {
    small: {
      container: "h-8",
      image: { width: 32, height: 32 },
      text: "text-lg",
      spacing: "gap-2",
    },
    medium: {
      container: "h-10",
      image: { width: 40, height: 40 },
      text: "text-xl",
      spacing: "gap-3",
    },
    large: {
      container: "h-16",
      image: { width: 64, height: 64 },
      text: "text-3xl",
      spacing: "gap-4",
    },
  }

  const currentSize = sizes[size]

  const logoContent = (
    <>
      {variant !== "icon-only" && variant === "vertical" ? (
        <motion.div
          className={`flex flex-col items-center ${currentSize.spacing} ${className}`}
          // whileHover={{ scale: 1.05 }}
          // transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <Image
              src="/img/seahorse-logo.png"
              alt="Seahorse Ceramics Logo"
              width={currentSize.image.width}
              height={currentSize.image.height}
              className="object-contain rounded-full"
            />
          </div>
          <div className={`font-serif font-medium ${currentSize.text} text-gray-800`}>Seahorse Ceramics</div>
        </motion.div>
      ) : variant === "icon-only" ? (
        <motion.div
          className={`relative ${className}`}
          // whileHover={{ scale: 1.1, rotate: 5 }}
          // transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image
            src="/img/seahorse-logo.png"
            alt="Seahorse Ceramics Logo"
            width={currentSize.image.width}
            height={currentSize.image.height}
            className="object-contain rounded-full"
          />
        </motion.div>
      ) : (
        <motion.div
          className={`flex items-center ${currentSize.spacing} ${className}`}
            // whileHover={{ scale: 1.05 }}
            // transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <Image
              src="/img/seahorse-logo.png"
              alt="Seahorse Ceramics Logo"
              width={currentSize.image.width}
              height={currentSize.image.height}
              className="object-contain rounded-full"
            />
          </div>
          <div className={`font-serif font-medium ${currentSize.text} text-gray-800`}>Seahorse Ceramics</div>
        </motion.div>
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} className="focus:outline-none">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}
