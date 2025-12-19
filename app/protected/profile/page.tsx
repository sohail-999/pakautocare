"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  const refreshProfile = async (userId: string) => {
    const { data: profileData } = await supabase.from("profiles").select("*").eq("id", userId).single()
    setProfile(profileData)
  }

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }
      setUser(user)

      await refreshProfile(user.id)
      setLoading(false)
    }

    getUser()

    const channel = supabase
      .channel("profile-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
        },
        (payload) => {
          if (payload.new) {
            setProfile(payload.new)
          }
        },
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [router, supabase])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12">Loading...</div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Profile</h1>
          <Link
            href="/protected/profile/edit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold"
          >
            Edit Profile
          </Link>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="space-y-4">
            <div>
              <label className="text-muted-foreground text-sm">Email</label>
              <p className="font-semibold text-lg">{user?.email}</p>
            </div>
            {profile && (
              <>
                <div>
                  <label className="text-muted-foreground text-sm">Full Name</label>
                  <p className="font-semibold text-lg">{profile.full_name || "Not set"}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm">Phone</label>
                  <p className="font-semibold text-lg">{profile.phone || "Not set"}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm">Address</label>
                  <p className="font-semibold text-lg">{profile.address || "Not set"}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm">City</label>
                  <p className="font-semibold text-lg">{profile.city || "Not set"}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm">Postal Code</label>
                  <p className="font-semibold text-lg">{profile.postal_code || "Not set"}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
