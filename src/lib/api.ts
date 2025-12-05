const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      next: { revalidate: 60 } // Cache 1 minute
    })

    const data = await response.json()
    return data

  } catch (error) {
    console.error('API Error:', error)
    return {
      success: false,
      error: 'Erreur de connexion au serveur'
    }
  }
}

// Services
export const getServices = (params?: string) => 
  apiFetch(`/api/services${params ? `?${params}` : ''}`)

export const getServicesEnVedette = () => 
  apiFetch('/api/services?vedette=true&limit=6')

export const getServiceById = (id: string | number) => 
  apiFetch(`/api/services/${id}`)

// Catégories
export const getCategories = () => 
  apiFetch('/api/categories')

// Prestataires
export const getPrestataires = (params?: string) => 
  apiFetch(`/api/prestataires${params ? `?${params}` : ''}`)

export const getPrestataireById = (id: string | number) => 
  apiFetch(`/api/prestataires/${id}`)

// Régions / Villes / Quartiers
export const getRegions = () => 
  apiFetch('/api/regions')

export const getVilles = (regionId?: number) => 
  apiFetch(`/api/villes${regionId ? `?region_id=${regionId}` : ''}`)

export const getQuartiers = (villeId?: number) => 
  apiFetch(`/api/quartiers${villeId ? `?ville_id=${villeId}` : ''}`)

// Témoignages
export const getTemoignages = () => 
  apiFetch('/api/temoignages')

// Articles du blog
export const getArticles = (params?: string) => 
  apiFetch(`/api/articles${params ? `?${params}` : ''}`)

export const getArticleBySlug = (slug: string) => 
  apiFetch(`/api/articles/${slug}`)

// Auth
export const inscription = (data: any) => 
  apiFetch('/api/auth/inscription', {
    method: 'POST',
    body: JSON.stringify(data)
  })

export const connexion = (data: { email: string; mot_de_passe: string }) => 
  apiFetch('/api/auth/connexion', {
    method: 'POST',
    body: JSON.stringify(data)
  })

// Contact
export const sendContact = (data: { nom: string; email: string; telephone?: string; sujet: string; message: string }) => 
  apiFetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data)
  })
