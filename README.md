# Nera

This repository contains two branches with different setups for the backend and frontend.

## only-nextjs

In this branch, both the backend and frontend are built entirely with Next.js. Supabase is integrated directly into the project through the @supabase/supabase-js dependency, which is used in the server actions.

### How to run the project

1. Clone the repository
```
git clone https://github.com/darking98/nera.git
```
2. Switch to the only-nextjs branch
```
git checkout only-nextjs
```
3. Install the dependencies
```
npm install
```
4. Set up the environment variables using the .env.local.template file
5. Start the development server
```
npm run dev
```
6. Open your browser and go to http://localhost:3000.

### How to build the project

1. Run the following command to build the project for production
```
npm run build
```
2. To serve the production build locally
```
npm start
```

## with-express

In this branch, the backend is built with Express, and the frontend is built with Next.js. The Express server runs on port 3001, while the Next.js frontend runs on port 3000. The frontend communicates with the backend through API calls in the actions.

### How to run the project

1. Clone the repository
```
git clone https://github.com/darking98/nera.git
```
2. Switch to the only-nextjs branch
```
git checkout with-express
```
3. Install the dependencies
```
npm install
```
4. Set up the environment variables using the .env.local.template and .env.template file
5. Start the Express backend server. The server will run on http://localhost:3001
```
npm run start
```
7. Start the NextJs frontend. The frontend will run on http://localhost:3000
```
npm run dev
```
### How to build the project

1. Run the following command to build the project for production
```
npm run build
```
2. To serve the production build locally
```
npm start
```
