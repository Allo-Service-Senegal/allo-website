const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

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

// Catégories
export const getCategories = () => 
  apiFetch('/api/categories')

// Prestataires
export const getPrestataires = (params?: string) => 
  apiFetch(`/api/prestataires${params ? `?${params}` : ''}`)

// Régions
export const getRegions = (includeVilles = true) => 
  apiFetch(`/api/regions?villes=${includeVilles}`)

// Témoignages
export const getTemoignages = () => 
  apiFetch('/api/temoignages')

// Auth
export const inscription = (data: any) => 
  apiFetch('/api/auth/inscription', {
    method: 'POST',
    body: JSON.stringify(data)
  })

export const connexion = (data: { email: string; motDePasse: string }) => 
  apiFetch('/api/auth/connexion', {
    method: 'POST',
    body: JSON.stringify(data)
  })
