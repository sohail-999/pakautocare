"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const [contactInfo, setContactInfo] = useState({
    id: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postal_code: "",
    business_hours: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const supabase = createClient()

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data, error } = await supabase.from("contact_info").select("*").single()

        if (error && error.code !== "PGRST116") {
          // PGRST116 means no rows found, which is okay
          throw error
        }

        if (data) {
          console.log("[v0] Contact info fetched:", data)
          setContactInfo(data)
        } else {
          // No data exists, will create new record on save
          console.log("[v0] No contact info found, will create new record")
        }
      } catch (error) {
        console.error("[v0] Error fetching contact info:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContactInfo()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage("")

    try {
      if (contactInfo.id) {
        // Update existing record
        const { error } = await supabase
          .from("contact_info")
          .update({
            phone: contactInfo.phone,
            email: contactInfo.email,
            address: contactInfo.address,
            city: contactInfo.city,
            postal_code: contactInfo.postal_code,
            business_hours: contactInfo.business_hours,
          })
          .eq("id", contactInfo.id)

        if (error) throw error
      } else {
        // Insert new record
        const { data, error } = await supabase
          .from("contact_info")
          .insert({
            phone: contactInfo.phone,
            email: contactInfo.email,
            address: contactInfo.address,
            city: contactInfo.city,
            postal_code: contactInfo.postal_code,
            business_hours: contactInfo.business_hours,
          })
          .select()
          .single()

        if (error) throw error
        if (data) {
          setContactInfo(data)
          console.log("[v0] New contact info created:", data)
        }
      }

      setMessage("Contact information updated successfully!")
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      console.error("[v0] Error saving contact info:", error)
      setMessage("Error saving contact information")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-6">Loading settings...</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Business Settings</h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Phone Number</label>
          <input
            type="text"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Address</label>
          <input
            type="text"
            value={contactInfo.address}
            onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">City</label>
          <input
            type="text"
            value={contactInfo.city}
            onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Postal Code</label>
          <input
            type="text"
            value={contactInfo.postal_code}
            onChange={(e) => setContactInfo({ ...contactInfo, postal_code: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Business Hours</label>
          <input
            type="text"
            value={contactInfo.business_hours}
            onChange={(e) => setContactInfo({ ...contactInfo, business_hours: e.target.value })}
            placeholder="e.g., Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg ${message.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {message}
          </div>
        )}

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
