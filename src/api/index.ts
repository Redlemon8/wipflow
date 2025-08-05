import type { ICard, IList, ITag } from "../@types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getLits(): Promise<IList[]> {
  try {
    const result = await fetch(`${API_URL}/lists`)
    if (result.ok && result.status === 200) {
      const lists = await result.json();
      return lists
    }

    return[]
  } catch (error) {
    console.error("erreur lors du chargement des listes", error)
    return []
  }
}

export async function addListIntoApi(title: string, position: number): Promise<null | IList> {

  try {
    const data = {title, position}

    const result = await fetch(`${API_URL}/lists`, {
      method: "post",
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(data)
    })

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

export async function updateListIntoApi(title: string, id: number): Promise<null | IList > {
  
  try {

    const data = {title}

    const result = await fetch(`${API_URL}/lists/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
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

export async function deleteListIntoApi(list: IList): Promise<boolean> {
  
  try {
    console.log(`call list ${list.id} to be delete`);
    const result = await fetch(`${API_URL}/lists/${list.id}`, {
      method: 'DELETE'
    });

    return result.ok
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la list", error);
    return false;
  }
}

export async function addCardIntoApi(content: string, list_id: number): Promise<null | ICard> {

  try {
    const data = {content, list_id}

    const result = await fetch(`${API_URL}/cards`, {
      method: "post",
      headers: { 'content-type': 'application/json'},
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
      headers: { 'Content-Type': 'application/json' },
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
      method: 'DELETE'
    });

    return result.ok
  } catch (error) {
    console.error("Erreur lors de la suppression de la carte", error);
    return false;
  }
}

export async function getTags(): Promise<ITag[]> {
  try {
    const result = await fetch(`${API_URL}/tags`)
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
      headers: { 'content-type': 'application/json'},
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
      method: 'DELETE'
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
      headers: { 'content-type': 'application/json'},
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
      headers: { 'content-type': 'application/json'},
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
      method: "delete"
    });

    return result.ok;
    
  } catch (error) {
    console.error("Erreur lors de la suppression du tag de la carte", error);
    return false;
  }
}