"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, BarChart3, Package, ShoppingBag, Users } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { data: profile, error } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

      if (error || !profile?.is_admin) {
        router.push("/")
        return
      }

      setUser(user)
      setLoading(false)
    }

    checkAdmin()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Pak Auto Care</h1>
        <h2 className="text-sm text-gray-400 mb-8">Admin Dashboard</h2>

        <nav className="space-y-4">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              <BarChart3 className="w-5 h-5 mr-3" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/products">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              <Package className="w-5 h-5 mr-3" />
              Products
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              <ShoppingBag className="w-5 h-5 mr-3" />
              Orders
            </Button>
          </Link>
          <Link href="/admin/customers">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              <Users className="w-5 h-5 mr-3" />
              Customers
            </Button>
          </Link>
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-800">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-red-400 hover:bg-gray-800"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
