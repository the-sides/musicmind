# Music Mind
This is the final app with Spotify, as a collection of tools to use. 
Visualizers, Schedulable events, filters, details. Anything I think of from here on out should be built into this so I don't write auth and fetching mechanisms for a 5th time. 

## Auth Evolutions
I intend to build this in steps:

🔨 Base authentication using redirect urls

💿 User database with Prisma [Auth.js](https://authjs.dev/reference/sveltekit) on top of [PlanetScale](https://planetscale.com/)

🕋 Server-side service with client auth for executing scheduled events
## Developing


Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
