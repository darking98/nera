This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

How to begin start using the app.

1. Go to http://localhost:3000/login
2. Click on 'Registrar' and create an account. 'Nombre' (could be whatever you want) and 'Número de cuenta' (need to be 10 characters in length e.g '1234567891')
3. Dive into the dashboard starting by using the three different actions on the left side

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
4. Set up the environment variables using the .env.local.template file by creating a .env.local file
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
