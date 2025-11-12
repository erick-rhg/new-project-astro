## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
index.astro
└─ BaseLayout
├─ HeroBanner
└─ PageBuilder (datos: home-json.json)
└─ Section (propiedades: layout_class, card_data, image_data)
├─ Cards -> Card (title, subtitle, img, buttons)
└─ Images -> Image
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

---

- ### [Documentación general del proyecto](src/utils/docu/DOCUMENTATION.md)

- ### [Documentación del layout](src/utils/docu/LAYOUT.md)

- ### [Documentación estructura JSON](src/utils/docu/DATA-JSON.md)