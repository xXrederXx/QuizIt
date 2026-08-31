# QuizIt

QuizIt is a small, dark, Quizlet-style learning app. Pick a CSV training set, choose Flashcards or Typing, and work through every card. Wrong cards return to the end of the queue until they are answered correctly. There is no backend, account, database, or required environment variable.

## Local development

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. Create a production build with `npm run build` and preview it with `npm run preview`.

## Add training sets

Drop a `.csv` file into `src/sets/`, then rebuild the app. The filename becomes the set name: `biology.csv` displays as `Biology`.

Each file must have a header row and `question,answer` columns:

```csv
question,answer
What do plants use to make food?,Photosynthesis
Primary color,Red
```

QuizIt discovers files at build time with Vite's `import.meta.glob('./sets/*.csv', ...)`. The CSV is bundled into the static frontend and parsed in the browser with Papa Parse. No set registration or server is needed.

## Coolify deployment

1. Push this project to a Git provider connected to Coolify.
2. In Coolify, create a new **Application** and choose the repository.
3. Select **Dockerfile** as the build pack. The included Dockerfile builds the Vite app and serves the result with Nginx.
4. Set the container port to `80`. Enable HTTPS and attach your domain as usual.
5. Deploy. No environment variables are required.

The production container listens on port `80` and serves the static `dist` directory. To update sets or code, commit and push the changes. Trigger a new Coolify deployment; the build stage will rediscover every CSV in `src/sets/` and include it in the new frontend bundle.
