import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupAdmin() {
  const adminEmail = "sohail20338@gmail.com"
  const adminPassword = "Admin@123456"

  try {
    console.log("Creating admin user...")

    // Create admin user in auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    })

    if (authError) {
      console.error("Error creating auth user:", authError)
      return
    }

    console.log("Admin user created:", authData.user.id)

    // Create admin profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      email: adminEmail,
      full_name: "Admin",
      is_admin: true,
    })

    if (profileError) {
      console.error("Error creating profile:", profileError)
      return
    }

    console.log("✅ Admin account created successfully!")
    console.log(`Email: ${adminEmail}`)
    console.log(`Password: ${adminPassword}`)
    console.log("Please change the password after first login.")
  } catch (error) {
    console.error("Setup error:", error)
  }
}

setupAdmin()
