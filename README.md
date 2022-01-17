# Simple Redis Hook for Node
A hook for accessing and utilizing redis within a node JS backend.
In this case, saving JWT ( json web tokens ) to an Invalidated cache, when a user logs out.

We will simulate a login by generating the JWT and sending it back.
Then when that is passed along with the logout, we will insert it into the redis cache.

A third route will be used to check if the token is invalidated, and deny usage.

### NPMs required:

- Express - route handling
- redis
- typescript - optional

If using typescript you may also need the following dev dependencies:
- @types/express
- @types/node
- ts-node - run code without building

use ts-node as follows. The path to our app in this case is ./src/App.ts
```
"scripts": {
    "start": "ts-node ./src/App.ts",
```
You can run the app with: ** npm run start **
