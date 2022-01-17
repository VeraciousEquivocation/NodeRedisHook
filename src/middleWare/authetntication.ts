import {Request, Response, NextFunction} from 'express'

export const authenticationMiddleware = (req: Request, res: Response, next:NextFunction) => {
    next()
}