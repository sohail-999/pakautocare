"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface PageTransitionProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function PageTransition({ href, children, className = "" }: PageTransitionProps) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsTransitioning(true)

    // Smooth fade out and scale down
    setTimeout(() => {
      router.push(href)
      // Reset transition state after navigation completes
      setTimeout(() => setIsTransitioning(false), 100)
    }, 300)
  }

  return (
    <button
      onClick={handleClick}
      disabled={isTransitioning}
      className={`transition-all duration-300 ${
        isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
      } ${className}`}
    >
      {children}
    </button>
  )
}
