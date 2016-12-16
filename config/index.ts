import { Config } from 'aws-sdk'

export const config = new Config({
    maxRetries: 15,
    region: 'ap-southeast-1'
})
