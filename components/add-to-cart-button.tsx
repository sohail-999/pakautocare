"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

interface AddToCartButtonProps {
  productId: string
  productName: string
  productPrice: number
  productImage: string
  className?: string
}

export function AddToCartButton({
  productId,
  productName,
  productPrice,
  productImage,
  className = "",
}: AddToCartButtonProps) {
  const { addToCart, getProductCount, isLoading: cartLoading } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
    }
    checkAuth()
  }, [])

  useEffect(() => {
    const newCount = getProductCount(productId)
    setCount(newCount)
  }, [productId, getProductCount])

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to cart",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    console.log("[v0] Adding product to cart:", productId)
    const success = await addToCart(productId, 1, productName, productPrice, productImage)
    setIsLoading(false)

    if (success) {
      console.log("[v0] Successfully added to cart")
      toast({
        title: "Added to cart",
        description: "Product added successfully!",
      })
      setCount((prev) => prev + 1)
    } else {
      console.error("[v0] Failed to add to cart")
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading || cartLoading}
      className={`px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? "Adding..." : count > 0 ? `In Cart (${count})` : "Add to Cart"}
    </button>
  )
}
