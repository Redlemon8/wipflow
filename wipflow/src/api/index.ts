import type { IList } from "../@types";

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

export async function addListIntoApi(title: string): Promise<null | IList> {

  try {
    const data = {title}

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