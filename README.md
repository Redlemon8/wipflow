# wipflow

Application de gestion de workflow développée avec React + TypeScript + Vite.

## Technologies utilisées

- React
- TypeScript
- Vite
- ESLint

## Configuration ESLint

Si vous développez une application de production, nous recommandons de mettre à jour la configuration pour activer les règles de linting basées sur les types :

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

Vous pouvez également installer [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) et [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) pour les règles de linting spécifiques à React :

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Icônes utilisées

### Crayon
```html
<div> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
```

### Plus
```html
<div> Icons made by <a href="https://www.flaticon.com/authors/md-tanvirul-haque" title="Md Tanvirul Haque"> Md Tanvirul Haque </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
```
