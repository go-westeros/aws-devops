import { EC2, Config } from 'aws-sdk'
import { InstanceResource } from '../core/instance-resource'

const instanceResource = new InstanceResource()

async function main() {
    try {
        await instanceResource.prepare()
        console.log('Successful')
    } catch (error) {
        console.log(error)
    }
}

main()
