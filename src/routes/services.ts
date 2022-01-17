import {NextFunction} from 'express'

export const secondHop = (next: NextFunction) => {
    try {
        throw new Error('ERROR ON SECOND HOP')
    } catch (err) {
        next(err)
    }
}