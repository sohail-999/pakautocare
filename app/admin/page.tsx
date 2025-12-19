"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0,
    recentOrders: [],
    ordersByStatus: [],
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      // Get total orders and revenue
      const { data: orders } = await supabase.from("orders").select("*")
      const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0

      // Get total customers
      const { data: profiles } = await supabase.from("profiles").select("*")

      // Get total products
      const { data: products } = await supabase.from("products").select("*")

      // Get orders by status
      const ordersByStatus = [
        { name: "Pending", value: orders?.filter((o) => o.status === "pending").length || 0 },
        { name: "Processing", value: orders?.filter((o) => o.status === "processing").length || 0 },
        { name: "Shipped", value: orders?.filter((o) => o.status === "shipped").length || 0 },
        { name: "Delivered", value: orders?.filter((o) => o.status === "delivered").length || 0 },
      ]

      setStats({
        totalOrders: orders?.length || 0,
        totalRevenue,
        totalCustomers: profiles?.length || 0,
        totalProducts: products?.length || 0,
        recentOrders: orders?.slice(-5).reverse() || [],
        ordersByStatus,
      })
      setLoading(false)
    }

    fetchStats()
  }, [])

  const COLORS = ["#dc2626", "#10b981", "#f59e0b", "#ef4444"]

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/settings"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
          >
            Settings
          </Link>
          <Link
            href="/admin/profile"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-primary">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">Rs {stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Customers</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalCustomers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.totalProducts}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Orders by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.ordersByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.ordersByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {stats.recentOrders.map((order: any) => (
              <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-semibold text-sm">{order.id.slice(0, 8)}...</p>
                  <p className="text-xs text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Rs {order.total_amount}</p>
                  <p
                    className={`text-xs font-semibold ${
                      order.status === "delivered"
                        ? "text-green-600"
                        : order.status === "shipped"
                          ? "text-primary"
                          : order.status === "processing"
                            ? "text-yellow-600"
                            : "text-gray-600"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
