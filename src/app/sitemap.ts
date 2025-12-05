import { MetadataRoute } from 'next'
import { products } from '@/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://bee-web.vercel.app' // TODO: Update with actual domain

    // Static pages
    const routes = [
        '',
        '/about',
        '/contact',
        '/products',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic product pages
    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...routes, ...productRoutes]
}
