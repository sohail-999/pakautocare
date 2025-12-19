"use client"

import { useState, useEffect } from "react"
import { NavbarStatic } from "@/components/navbar-static"
import { Footer } from "@/components/footer"
import { Background3D } from "@/components/3d-page-background"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { PageTransition } from "@/components/page-transition"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  rating: number
  reviews_count: number
  stock: number
  category_id: string
}

interface Category {
  id: string
  name: string
}

// Mock data for demonstration (will be replaced with real data)
const mockCategories: Category[] = [
  { id: "550e8400-e29b-41d4-a716-446655440001", name: "Exterior Care" },
  { id: "550e8400-e29b-41d4-a716-446655440002", name: "Interior Care" },
  { id: "550e8400-e29b-41d4-a716-446655440003", name: "Protection" },
]

const mockProducts: Product[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    name: "Premium Car Wash Shampoo",
    description: "Professional-grade car wash shampoo for Pakistani climate",
    price: 1500,
    image_url: "/car-wash-shampoo-bottle.jpg",
    rating: 4.8,
    reviews_count: 245,
    stock: 50,
    category_id: "550e8400-e29b-41d4-a716-446655440001",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    name: "UV Protection Wax",
    description: "Advanced UV protection wax for harsh weather conditions",
    price: 2500,
    image_url: "/car-wax.png",
    rating: 4.9,
    reviews_count: 189,
    stock: 35,
    category_id: "550e8400-e29b-41d4-a716-446655440001",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    name: "Interior Leather Conditioner",
    description: "Gentle yet effective leather conditioning formula",
    price: 1800,
    image_url: "/leather-conditioner-bottle.jpg",
    rating: 4.7,
    reviews_count: 156,
    stock: 42,
    category_id: "550e8400-e29b-41d4-a716-446655440002",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440013",
    name: "Glass Protective Coating",
    description: "Water-repellent coating for windshields and windows",
    price: 3000,
    image_url: "/glass-coating-spray.jpg",
    rating: 4.6,
    reviews_count: 128,
    stock: 28,
    category_id: "550e8400-e29b-41d4-a716-446655440003",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440014",
    name: "Paint Protection Film",
    description: "Durable protection against scratches and UV damage",
    price: 5000,
    image_url: "/paint-protection-film.jpg",
    rating: 4.9,
    reviews_count: 203,
    stock: 15,
    category_id: "550e8400-e29b-41d4-a716-446655440003",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440015",
    name: "Tire Shine Gel",
    description: "Long-lasting tire shine with UV protection",
    price: 800,
    image_url: "/tire-shine-gel-bottle.jpg",
    rating: 4.5,
    reviews_count: 98,
    stock: 60,
    category_id: "550e8400-e29b-41d4-a716-446655440001",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: productsData } = await supabase.from("products").select("*")
      const { data: categoriesData } = await supabase.from("categories").select("*")

      setProducts(productsData || [])
      setCategories(categoriesData || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category_id === selectedCategory)
    : products

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-red-50 to-rose-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Background3D type="car-detail" />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-rose-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Background3D type="car-detail" />
      </div>

      <div className="relative z-10">
        <NavbarStatic />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Our Products</h1>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white/95 backdrop-blur border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-yellow-600">★ {product.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews_count} reviews)</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">Rs {product.price}</span>
                    <AddToCartButton
                      productId={product.id}
                      productName={product.name}
                      productPrice={product.price}
                      productImage={product.image_url}
                    />
                  </div>

                  {product.stock < 5 && product.stock > 0 && (
                    <p className="text-xs text-orange-600 mt-2">Only {product.stock} left in stock</p>
                  )}
                  {product.stock === 0 && <p className="text-xs text-red-600 mt-2">Out of stock</p>}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section with Smooth Transition */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Professional Service?</h2>
            <p className="text-gray-600 mb-6">Check out our subscription plans for regular maintenance</p>
            <PageTransition
              href="/subscription"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90"
            >
              View Subscriptions
            </PageTransition>
          </div>
        </div>

        <Footer />
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedProduct.image_url || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h3>
                  <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{selectedProduct.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-500">({selectedProduct.reviews_count} reviews)</span>
                </div>

                <div className="text-3xl font-bold text-primary">Rs {selectedProduct.price}</div>

                <div className="space-y-2">
                  {selectedProduct.stock > 0 ? (
                    <p className="text-green-600 font-medium">In Stock ({selectedProduct.stock} available)</p>
                  ) : (
                    <p className="text-red-600 font-medium">Out of Stock</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <AddToCartButton
                    productId={selectedProduct.id}
                    productName={selectedProduct.name}
                    productPrice={selectedProduct.price}
                    productImage={selectedProduct.image_url}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
