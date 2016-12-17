import { EC2InstanceResource } from '../core/resource'

const instanceResource = new EC2InstanceResource()

async function main() {
    try {
        await instanceResource.prepare()
        console.log('Successful')
    } catch (error) {
        console.log(error)
    }
}

main()
