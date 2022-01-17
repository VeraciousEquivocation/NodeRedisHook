/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

import { createClient } from 'redis'

class RedisHookClass {
  private static instance: RedisHookClass;

  public redisClient: any;

  private constructor() {
    this.redisClient = createClient()
    this.redisClient.on('error', (err:Error) => console.log('Redis Client Error', err))
  }

  public connect = async () => {
    try {
      await this.redisClient.connect()
    } catch (e:any) {
      throw new Error(e.message)
    }

  }
  public disconnect = async () => {
    // should always return 'OK'
    try {
      await this.redisClient.quit()
    } catch(e:any) {
      throw new Error(e.message)
    }
  }

  // get's stored value, returns null if not found
  public getVal = async (jwt:string) => {
    let foundVal:string|null;

    await this.connect().catch(e=>{throw new Error('Failed to connect to Redis, when storing JWT')})
    try {
      foundVal = await this.redisClient.get(jwt)
    } catch(e:any) {
      throw new Error(e.message)
    }

    await this.disconnect()

    return foundVal;
  }

  public storeJwtToken = async (key:string,val:string) => {
    let result:string|null;
    
    await this.connect().catch(e=>{throw new Error('Failed to connect to Redis, when storing JWT')})
    try {
      result = await this.redisClient.set(key,val, {
        EX:60,
        NX: true
      })
    } catch(e:any) {
      throw new Error(e.message)
    }
    await this.disconnect()

    return result
  }

  public static getInstance(): RedisHookClass {
    if(!RedisHookClass.instance) {
      RedisHookClass.instance = new RedisHookClass
    }
    return RedisHookClass.instance
  }
}

export const RedisHook = RedisHookClass.getInstance();