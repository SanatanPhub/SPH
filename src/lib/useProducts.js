import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { products as staticProducts, services as staticServices } from '../data/products'

function mapProduct(p) {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    originalPrice: p.original_price,
    description: p.description,
    image: p.image_url,
    rating: parseFloat(p.rating),
    reviews: p.reviews_count,
    inStock: p.in_stock,
    featured: p.featured,
  }
}

export function useProducts() {
  const [products, setProducts] = useState(staticProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }

    supabase.from('products').select('*').order('featured', { ascending: false }).then(({ data, error }) => {
      if (!error && data?.length) setProducts(data.map(mapProduct))
      setLoading(false)
    })
  }, [])

  return { products, loading }
}

export function useServices() {
  const [services, setServices] = useState(staticServices)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }

    supabase.from('services').select('*').then(({ data, error }) => {
      if (!error && data?.length) {
        setServices(data.map(s => ({
          id: s.id,
          name: s.name,
          category: 'consultation',
          price: s.price,
          originalPrice: s.original_price,
          description: s.description,
          image: s.image_url,
          duration: s.duration,
          icon: s.icon,
          rating: parseFloat(s.rating),
          reviews: s.reviews_count,
          features: s.features || [],
        })))
      }
      setLoading(false)
    })
  }, [])

  return { services, loading }
}
