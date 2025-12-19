"use client"

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"

interface CartItem {
  id: string
  product_id: string
  quantity: number
  product_name: string
  product_price: number
  product_image: string
}

const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

const fetcher = async (key: string) => {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.log("[v0] No user found, returning empty cart")
      return []
    }

    const { data, error } = await supabase.from("cart_items_simple").select("*").eq("user_id", user.id)

    if (error) {
      console.error("[v0] Error fetching cart:", error)
      return []
    }

    console.log("[v0] Cart items fetched:", data)
    return data || []
  } catch (error) {
    console.error("[v0] Cart fetcher error:", error)
    return []
  }
}

export function useCart() {
  const {
    data: cartItems = [],
    mutate,
    isLoading,
  } = useSWR<CartItem[]>("cart", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 30000,
    onError: (error) => {
      console.error("[v0] SWR error:", error)
    },
  })

  const supabase = createClient()

  const addToCart = async (productId: string, quantity = 1, productName = "", productPrice = 0, productImage = "") => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        console.error("[v0] User not authenticated")
        throw new Error("Not authenticated")
      }

      if (!isValidUUID(productId)) {
        console.error("[v0] Invalid product ID format:", productId)
        throw new Error("Invalid product ID format")
      }

      console.log("[v0] Adding to cart - productId:", productId, "quantity:", quantity)

      // Check if product already in cart
      const existingItem = cartItems.find((item) => item.product_id === productId)

      if (existingItem) {
        console.log("[v0] Updating existing cart item")
        const { error } = await supabase
          .from("cart_items_simple")
          .update({ quantity: existingItem.quantity + quantity })
          .eq("id", existingItem.id)

        if (error) {
          console.error("[v0] Error updating cart item:", error)
          throw error
        }
      } else {
        console.log("[v0] Adding new cart item")
        const { error } = await supabase.from("cart_items_simple").insert({
          user_id: user.id,
          product_id: productId,
          product_name: productName,
          product_price: productPrice,
          product_image: productImage,
          quantity,
        })

        if (error) {
          console.error("[v0] Error inserting cart item:", error)
          throw error
        }
      }

      // Revalidate cart immediately
      console.log("[v0] Revalidating cart")
      await mutate()
      return true
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
      return false
    }
  }

  const getProductCount = (productId: string) => {
    const item = cartItems.find((item) => item.product_id === productId)
    return item?.quantity || 0
  }

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  const removeFromCart = async (cartItemId: string) => {
    try {
      const { error } = await supabase.from("cart_items_simple").delete().eq("id", cartItemId)

      if (error) {
        console.error("[v0] Error removing from cart:", error)
        throw error
      }

      await mutate()
      return true
    } catch (error) {
      console.error("[v0] Error removing from cart:", error)
      return false
    }
  }

  return {
    cartItems,
    addToCart,
    getProductCount,
    getTotalItems,
    mutate,
    removeFromCart,
    isLoading,
  }
}
