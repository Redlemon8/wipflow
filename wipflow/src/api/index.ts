import type { ICard, IList } from "../@types";

export async function getLits(): Promise<IList[]> {
  try {
    const result = await fetch("http://localhost:3000/lists")
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

    const result = await fetch("http://localhost:3000/lists", {
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

export async function addCardIntoApi(content: string, list_id: number): Promise<null | ICard> {

  try {
    const data = {content, list_id}

    const result = await fetch("http://localhost:3000/cards", {
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

export async function updateListIntoApi(title: string, id: number): Promise<null | IList > {
  
  try {

    const data = {title}

    const result = await fetch(`http://localhost:3000/lists/${id}`, {
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
    const result = await fetch(`http://localhost:3000/lists/${list.id}`, {
      method: 'DELETE'
    });

    return result.ok
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la list", error);
    return false;
  }
}