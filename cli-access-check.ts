// Load the SDK and UUID
import { S3 } from 'aws-sdk'
import * as uuid from 'uuid'

// Create an S3 client
const s3 = new S3()

// Create a bucket and upload something into it
const bucketName = `node-sdk-check-${uuid.v4()}`

async function main() {
    try {
        await s3.createBucket({ Bucket: bucketName }).promise()
        await s3.deleteBucket({ Bucket: bucketName }).promise()
        console.log("Successfull")
    } catch (error) {
        console.log(error)
    }
}

main()
