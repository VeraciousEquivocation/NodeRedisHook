import express, {NextFunction,Request,Response} from 'express'
import { RedisHook } from '../common/hooks/RedisHook';
import { secondHop } from './services'

const theAppRouter = express.Router()

export { theAppRouter };

const userInfo = {
    id:'111',
    jwt:'abc123'
}

theAppRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    // create a UserId
    try {
        // if(!req.body.email || !req.body.password)
        //     throw new Error('gotta pass me the word to be heard')
        res.status(200).json({message: 'you may enter',id:userInfo.id,jwt:userInfo.jwt})
    } catch (err) {
        next(err)
    }
})
theAppRouter.get('/logout', async (req: Request, res: Response, next: NextFunction) => {
    let uId = req.headers.user_id as string | undefined
    let jwt = req.headers.jwt as string | undefined

    // if(missing headers) throw an error 

    try {
        let storeWasSuccessful = await RedisHook.storeJwtToken(jwt,uId)
        if(storeWasSuccessful === 'OK'){
            res.send('Token Revoken, this is not how you pronounce revocation')
        }
        // throw new Error('Oh snap doodle, this aint no poodle')
    } catch (err) {
        next(err)
    }
})
theAppRouter.get('/hops', async (req: Request, res: Response, next: NextFunction) => {
    // will only hit here if they pass the authentication middleware
    console.log('THE FIRST HOP')
    secondHop(next)
})