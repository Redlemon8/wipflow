import type { ICard, IList, ITag, ILoginRequest, IRegisterRequest, IAuthResponse } from "../@types";

const API_URL = import.meta.env.VITE_API_URL;

// Authentication functions
export async function register(userData: IRegisterRequest): Promise<IAuthResponse | null> {
  try {
    const result = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    if (result.ok) {
      const authData: IAuthResponse = await result.json();
      localStorage.setItem('access_token', authData.accessToken);
      localStorage.setItem('refresh_token', authData.refreshToken);
      return authData;
    }

    return null;
  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
    return null;
  }
}

export async function login(credentials: ILoginRequest): Promise<IAuthResponse | null> {
  try {
    const result = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });


    if (result.ok) {
      const authData: IAuthResponse = await result.json();
      
      if (authData.accessToken && authData.accessToken !== 'undefined') {
        localStorage.setItem('access_token', authData.accessToken);
        localStorage.setItem('refresh_token', authData.refreshToken);
      } else {
        console.error('Token invalide reçu de l\'API:', authData.accessToken);
        return null;
      }

      return authData;
    }

    return null;
  } catch (error) {
    console.error("Erreur lors de la connexion", error);
    return null;
  }
}

export async function refreshToken(): Promise<IAuthResponse | null> {
  try {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) return null;

    const result = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token })
    });

    if (result.ok) {
      const authData: IAuthResponse = await result.json();
      localStorage.setItem('access_token', authData.accessToken);
      localStorage.setItem('refresh_token', authData.refreshToken);
      return authData;
    }

    return null;
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token", error);
    return null;
  }
}

export async function logout(): Promise<boolean> {
  try {
    const access_token = localStorage.getItem('access_token');
    
    const result = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      }
    });

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    return result.ok;
  } catch (error) {
    console.error("Erreur lors de la déconnexion", error);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return false;
  }
}

export async function logoutAll(): Promise<boolean> {
  try {
    const access_token = localStorage.getItem('access_token');
    
    const result = await fetch(`${API_URL}/auth/logout-all`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      }
    });

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    return result.ok;
  } catch (error) {
    console.error("Erreur lors de la déconnexion totale", error);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return false;
  }
}

// Helper function to get authorization headers
export function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('access_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  
  if (token && token !== 'undefined' && token !== 'null' && token.trim() !== '') {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

// Helper function to make authenticated requests with automatic token refresh
export async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  // First attempt with current token
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers
    }
  });

  // If token expired, try to refresh and retry
  if (response.status === 401) {
    try {
      const errorData = await response.clone().json();
      if (errorData.code === 'TOKEN_EXPIRED') {
        console.log('Token expiré, tentative de rafraîchissement...');
        
        const refreshResult = await refreshToken();
        if (refreshResult) {
          // Retry with new token
          console.log('Token rafraîchi, nouvelle tentative...');
          return fetch(url, {
            ...options,
            headers: {
              ...getAuthHeaders(),
              ...options.headers
            }
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
    }
  }

  return response;
}

export async function getLits(projectId: number): Promise<IList[]> {
  try {
    const result = await authenticatedFetch(`${API_URL}/projects/${projectId}/lists`)
    
    if (result.ok && result.status === 200) {
      const lists = await result.json();
      return lists
    }

    // Si l'erreur est liée à l'authentification, token invalide
    if (result.status === 401) {
      console.warn('Token invalide ou expiré');
      // Le ProtectedRoute va rediriger vers la page de login
    }

    return[]
  } catch (error) {
    console.error("erreur lors du chargement des listes", error)
    return []
  }
}

export async function addListIntoApi(title: string, position: number, projectId: number): Promise<null | IList> {

  try {
    const data = {title, position}

    console.log("addListIntoApi", data, projectId);

    const result = await authenticatedFetch(`${API_URL}/projects/${projectId}/lists`, {
      method: "post",
      body: JSON.stringify(data)
    })

    console.log(result);

    if (result.ok) {
      const newList: IList = await result.json()
      return newList
    }

    return null
  } catch (error) {
    console.error("erreur lors de la création de la liste", error)
    return null
  }
}

export async function updateListIntoApi(title: string, id: number, projectId: number): Promise<null | IList > {
  
  try {

    const data = {title}

    const result = await authenticatedFetch(`${API_URL}/projects/${projectId}/lists/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });

    if (result.ok) {
      const updateList = await result.json();
      return updateList;
    }

    console.error("Erreur API:", result.status, result.statusText);
    return null;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la list", error);
    return null;
  }
}

export async function deleteListIntoApi(list: IList, projectId: number): Promise<boolean> {
  
  try {
    console.log(`call list ${list.id} to be delete`);
    const result = await authenticatedFetch(`${API_URL}/projects/${projectId}/lists/${list.id}`, {
      method: 'DELETE'
    });

    return result.ok
  } catch (error) {
    console.error("Erreur lors de la suppression de la list", error);
    return false;
  }
}

export async function addCardIntoApi(content: string, list_id: number): Promise<null | ICard> {

  try {
    const data = {content, list_id}

    const result = await authenticatedFetch(`${API_URL}/cards`, {
      method: "post",
      body: JSON.stringify(data)
    })

    console.log(result);

    if (result.ok) {
      const newCard: ICard = await result.json()
      console.log(newCard);
      return newCard
    }

    return null
  } catch (error) {
    console.error("erreur lors de la création de la carte", error)
    return null
  }
}

export async function updateCardIntoApi(id: number, content: string, color: string): Promise<null | ICard > {
  try {

    const data = {content, color}
    console.log(data);
    const result = await fetch(`${API_URL}/cards/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });

    if (result.ok) {
      const updateCard = await result.json();
      return updateCard;
    }

    console.error("Erreur API:", result.status, result.statusText);
    return null;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la carte", error);
    return null;
  }
}

export async function deleteCardIntoApi(id: number): Promise<boolean> {
  try {
    const result = await fetch(`${API_URL}/cards/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    return result.ok
  } catch (error) {
    console.error("Erreur lors de la suppression de la carte", error);
    return false;
  }
}

export async function getTags(): Promise<ITag[]> {
  try {
    const result = await authenticatedFetch(`${API_URL}/tags`)
    if (result.ok) {
      const tags = await result.json()
      console.log(tags);
      return tags
    }

    return []
  } catch (error) {
    console.error("Erreur lors du chargement des tags", error);
    return []
  }
}

export async function addTagIntoApi(name: string, color: string): Promise<null | ITag> {
  try {
    const data = {name, color}

    const result = await fetch(`${API_URL}/tags`, {
      method: "post",
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })

    if (result.ok) {
      const newTag: ITag = await result.json()
      return newTag
    }

    return null
    
  } catch (error) {
    console.error("Erreur lors de la création du tag", error);
    return null;
  }
}

export async function deleteTagIntoApi(id: number): Promise<boolean> {
  try {
    const result = await fetch(`${API_URL}/tags/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    return result.ok
  } catch (error) {
    console.error("Erreur lors de la suppression du tag", error);
    return false;
  }
}

export async function createTagAndAddToCard(card_id: number, tagName: string, tagColor: string = "#000000"): Promise<null | ITag> {
  try {
    // 1. Créer le tag
    const newTag = await addTagIntoApi(tagName, tagColor);
    
    if (!newTag) {
      console.error("Erreur lors de la création du tag");
      return null;
    }

    // 2. Ajouter le tag à la carte
    const result = await fetch(`${API_URL}/cards/${card_id}/tags/${newTag.id}`, {
      method: "put",
      headers: getAuthHeaders(),
      body: JSON.stringify({ name: tagName, color: tagColor })
    });

    if (result.ok) {
      return newTag;
    }

    return null;
    
  } catch (error) {
    console.error("Erreur lors de la création et ajout du tag à la carte", error);
    return null;
  }
}

export async function linkTagToCard(card_id: number, tag_id: number): Promise<boolean> {
  try {
    const result = await fetch(`${API_URL}/cards/${card_id}/tags/${tag_id}`, {
      method: "put",
      headers: getAuthHeaders(),
      body: JSON.stringify({})
    });

    return result.ok;
    
  } catch (error) {
    console.error("Erreur lors de la liaison du tag à la carte", error);
    return false;
  }
}

export async function unlinkTagFromCard(card_id: number, tag_id: number): Promise<boolean> {
  try {
    const result = await fetch(`${API_URL}/cards/${card_id}/tags/${tag_id}`, {
      method: "delete",
      headers: getAuthHeaders()
    });

    return result.ok;
    
  } catch (error) {
    console.error("Erreur lors de la suppression du tag de la carte", error);
    return false;
  }
}