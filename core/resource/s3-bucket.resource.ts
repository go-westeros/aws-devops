import { Resource } from './base.resource'
import { S3 } from 'aws-sdk'

type Location = S3.Types.Location

export class S3BucketResource extends Resource<Location> {
    checkRunning(): Promise<Location[]> {
        throw new Error('Not implemented!')
    }

    checkRunnable(): Promise<Location[]> {
        throw new Error('Not implemented!')
    }

    startRunnable(): Promise<Location[]> {
        throw new Error('Not implemented!')
    }

    create(): Promise<Location[]> {
        throw new Error('Not implemented!')
    }

}
