import {Request, Response, NextFunction} from 'express'
import { RedisHook } from '../common/hooks/RedisHook'

let excludedUrls = [
    '/our-api/routes/login',
]

export const authenticationMiddleware = async (req: Request, res: Response, next:NextFunction) => {
    if(req.originalUrl === '/our-api/routes/login' || req.originalUrl === '/our-api/routes/login/') {
        return next()
    }

    let jwt = req.headers['jwt'] as string | undefined

    // if(undefined) throw error

    try {
        let jwtIsRevoked = await RedisHook.getVal(jwt)
        if(jwtIsRevoked) {
            throw new Error('Do not pass Go!')
        }
    } catch(e:any) {
        return next(e)
    } 
    next()
}