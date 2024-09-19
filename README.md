This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
