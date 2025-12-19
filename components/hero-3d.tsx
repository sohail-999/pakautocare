"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationId: number
    let rotation = 0

    const drawCar = (x: number, y: number, scale: number, angle: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.scale(scale, scale)

      ctx.fillStyle = "rgb(220, 38, 38)"
      ctx.fillRect(-40, -20, 80, 40)

      ctx.fillStyle = "rgb(254, 226, 226)"
      ctx.fillRect(-30, -15, 25, 15)
      ctx.fillRect(10, -15, 25, 15)

      // Wheels
      ctx.fillStyle = "#1f2937"
      ctx.beginPath()
      ctx.arc(-25, 20, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(25, 20, 8, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#fef2f2")
      gradient.addColorStop(1, "#fee2e2")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      rotation += 0.01

      // Draw multiple cars at different positions
      drawCar(canvas.width * 0.25, canvas.height * 0.4, 1.5, rotation)
      drawCar(canvas.width * 0.75, canvas.height * 0.6, 1.2, -rotation * 0.7)

      ctx.strokeStyle = "rgb(248, 113, 113)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(canvas.width * 0.5, canvas.height * 0.5, 100 + Math.sin(rotation) * 20, 0, Math.PI * 2)
      ctx.stroke()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-red-50 to-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 text-balance">
          Premium Vehicle Care for Pakistani Roads
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl text-balance">
          Professional-grade automotive care products designed for harsh climates. Protect your vehicle with Pak Auto
          Care.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors"
          >
            Shop Now
          </Link>
          <Link
            href="/subscription"
            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-colors"
          >
            Subscribe to The Detailer's Crate
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-primary">10K+</p>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">500+</p>
            <p className="text-gray-600">5-Star Reviews</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">100%</p>
            <p className="text-gray-600">Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  )
}
