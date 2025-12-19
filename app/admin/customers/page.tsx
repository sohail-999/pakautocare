"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export const dynamic = 'force-dynamic'

interface Customer {
  id: string
  email: string
  full_name: string
  phone: string
  created_at: string
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

      setCustomers(data || [])
      setLoading(false)
    }

    fetchCustomers()
  }, [])

  if (loading) {
    return <div>Loading customers...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customers</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{customer.email}</td>
                <td className="px-6 py-4">{customer.full_name || "N/A"}</td>
                <td className="px-6 py-4 text-sm">{customer.phone || "N/A"}</td>
                <td className="px-6 py-4 text-sm">{new Date(customer.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
