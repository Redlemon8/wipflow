# Structure des Composants

Cette documentation décrit l'organisation des composants React dans l'application Wipflow.

## 📁 Organisation des dossiers

```
components/
├── ui/                    # Composants UI réutilisables
│   ├── Header.tsx        # En-tête de l'application
│   ├── InputBehaviour.tsx # Composant d'édition/ajout réutilisable
│   └── index.ts          # Exports des composants UI
├── features/             # Composants métier par fonctionnalité
│   ├── Card/            # Fonctionnalité des cartes
│   │   ├── Card.tsx     # Affichage d'une carte
│   │   ├── CardModal.tsx # Modal de détails d'une carte
│   │   └── index.ts     # Exports des composants Card
│   └── List/            # Fonctionnalité des listes
│       ├── List.tsx     # Affichage d'une liste avec ses cartes
│       ├── Lists.tsx    # Affichage de toutes les listes
│       └── index.ts     # Exports des composants List
├── hooks/               # Hooks personnalisés
│   ├── useListsAndCards.ts # Hook de gestion des listes et cartes
│   └── index.ts         # Exports des hooks
└── index.ts             # Export principal de tous les composants
```

## 🎯 Composants UI (`ui/`)

### Header
- **Fichier**: `ui/Header.tsx`
- **Responsabilité**: Affichage de l'en-tête avec logo et navigation
- **Props**: Aucune
- **Utilisation**: Composant racine de l'application

### InputBehaviour
- **Fichier**: `ui/InputBehaviour.tsx`
- **Responsabilité**: Gestion des modes édition/ajout avec validation
- **Props**:
  - `defaultValue`: Valeur initiale
  - `onSubmit`: Fonction de soumission
  - `isEditing`: Mode édition (true) ou ajout (false)
  - `showIcon`: Afficher l'icône
  - `buttonClassName`: Classe CSS du bouton
  - `inputClassName`: Classe CSS de l'input
- **Utilisation**: Titres de listes, contenu des cartes, couleurs

## 🃏 Composants Card (`features/Card/`)

### Card
- **Fichier**: `features/Card/Card.tsx`
- **Responsabilité**: Affichage d'une carte avec interaction
- **Props**:
  - `card`: Données de la carte
  - `onUpdateCard`: Fonction de mise à jour
  - `onDeleteCard`: Fonction de suppression
- **Fonctionnalités**: Ouverture de modal, clic pour détails

### CardModal
- **Fichier**: `features/Card/CardModal.tsx`
- **Responsabilité**: Modal de détails et édition d'une carte
- **Props**:
  - `card`: Données de la carte
  - `onClose`: Fonction de fermeture
  - `onUpdateCard`: Fonction de mise à jour
  - `onDeleteCard`: Fonction de suppression
- **Fonctionnalités**: Édition du contenu et de la couleur

## 📋 Composants List (`features/List/`)

### List
- **Fichier**: `features/List/List.tsx`
- **Responsabilité**: Affichage d'une liste avec ses cartes
- **Props**:
  - `list`: Données de la liste
  - `onAddCard`: Fonction d'ajout de carte
  - `onUpdateList`: Fonction de mise à jour de liste
  - `onDeleteList`: Fonction de suppression de liste
  - `onUpdateCard`: Fonction de mise à jour de carte
  - `onDeleteCard`: Fonction de suppression de carte
- **Fonctionnalités**: Gestion des cartes, édition du titre, suppression

### Lists
- **Fichier**: `features/List/Lists.tsx`
- **Responsabilité**: Affichage de toutes les listes
- **Props**: Mêmes que List mais pour un tableau de listes
- **Fonctionnalités**: Rendu de toutes les listes

## 🪝 Hooks (`hooks/`)

### useListsAndCards
- **Fichier**: `hooks/useListsAndCards.ts`
- **Responsabilité**: Gestion de l'état global des listes et cartes
- **Retour**:
  - `lists`: Tableau des listes
  - `loading`: État de chargement
  - `error`: Message d'erreur
  - `handleAddList`: Ajouter une liste
  - `handleAddCard`: Ajouter une carte
  - `handleUpdateList`: Mettre à jour une liste
  - `handleDeleteList`: Supprimer une liste
  - `handleUpdateCard`: Mettre à jour une carte
  - `handleDeleteCard`: Supprimer une carte
- **Fonctionnalités**: Gestion des appels API, état de chargement, gestion d'erreurs

## 📦 Imports

### Import principal
```typescript
import { Header, InputBehaviour, Card, Lists, useListsAndCards } from './components';
```

### Import par catégorie
```typescript
// UI Components
import { Header, InputBehaviour } from './components/ui';

// Feature Components
import { Card, CardModal } from './components/features/Card';
import { List, Lists } from './components/features/List';

// Hooks
import { useListsAndCards } from './components/hooks';
```

## 🔄 Améliorations apportées

1. **Séparation des responsabilités**: Chaque composant a une responsabilité claire
2. **Réutilisabilité**: Composants UI réutilisables
3. **Maintenabilité**: Structure claire et organisée
4. **Gestion d'erreurs**: États de loading et d'erreur dans le hook
5. **Accessibilité**: Ajout d'attributs ARIA
6. **TypeScript**: Types bien définis et exports typés

## 🚀 Utilisation

```typescript
function App() {
  const { lists, loading, error, handleAddList, ... } = useListsAndCards();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <>
      <Header />
      <main>
        <Lists lists={lists} {...handlers} />
        <InputBehaviour onSubmit={handleAddList} isEditing />
      </main>
    </>
  );
}
``` 