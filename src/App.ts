import { Console } from 'console';
import express, {NextFunction, Request, Response} from 'express';
import {theAppRouter} from './routes'
import { authenticationMiddleware } from './middleWare/authetntication';

const app = express();

const port = '3000';

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

// handle json messages
app.use(express.json())

app.use(authenticationMiddleware)

app.use('/our-api/routes',theAppRouter)

// all errors passed along to here
app.use(async (error: Error, req: Request, res: Response, next:NextFunction) => {
    console.error(error.message)
    res.status(500).send(error.message)
})

console.log('APPLICATION HAS STARTED')