# Guild Table

> Guild Table is in active developemnt. Feature set and availibility is subject to change.

A solution for online Dungeons and Dragons that incldues:

- **Character Management**
  - generation
  - sheets
  - stats
  - inventory
- **Monster Management**
  - import your own monsters
  - deploy them to the VTT
- **Virtual Table Top (VTT)**
  - Support for different maps
  - object visiblity control (for the DM)
  - map annotationse
  - represents your character as a token
- **Battle Sequence Assistance**
  - Calculates damage values based on rolls and stats
  - Keeps track of turns
- **Basic Campaign Management**
  - Wiki system
    - private notes / wikis for DMs
    - public notes / lore for added fun
  - invite players into a campaign

The ultimate goal of Guild Table is to remove the need to 'share screen' if you were playing online.

## Running Guild-Table

- Install the dependencies with `npm install`
- Start up the docker images with Docker Compose
  - `Docker Compose up -d`
- Start up the Svelte server and open a new tab
  - `npm run dev --open`

## Production Instructions

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
