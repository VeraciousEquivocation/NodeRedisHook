import express, {NextFunction,Request,Response} from 'express'
import { secondHop } from './services'

const theAppRouter = express.Router()

export { theAppRouter };

theAppRouter.get('/logout', async(req: Request, res: Response, next: NextFunction) => {
    try {
        throw new Error('Oh snap doodle, this aint no poodle')
    } catch (err) {
        next(err)
    }
})
theAppRouter.post('/login', async(req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body.email || !req.body.password)
            throw new Error('gotta pass me the word to be heard')
            res.status(200).json({message: 'you may enter'})
    } catch (err) {
        next(err)
    }
})
theAppRouter.get('/hops', async(req: Request, res: Response, next: NextFunction) => {
    console.log('THE FIRST HOP')
    secondHop(next)
})