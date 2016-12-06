import { EC2, Config } from 'aws-sdk'

const config = new Config({
    maxRetries: 15,
    region: 'ap-southeast-1'
})

const ec2 = new EC2(config)

async function main() {
    try {
        const { Reservations: reservations } = await ec2.describeInstances({
            Filters: [{
                Name: 'tag:role',
                Values: ['westeros-host']
            }],
            MaxResults: 1000
        }).promise()
        
        let res = reservations.find(res => res.Instances.length > 0)

        if (!res) {
            res = await ec2.runInstances({
                ImageId: 'ami-a1288ec2',
                InstanceType: 't2.micro',
                MinCount: 1,
                MaxCount: 1
            }).promise()
        }

        const instances = res.Instances

        await ec2.createTags({
            Resources: res.Instances.map(ins => ins.InstanceId),
            Tags: [{ Key: 'role', Value: 'westeros-host'}]
        }).promise()

        console.log('Successful')
    } catch (error) {
        console.log(error)
    }
}

main()

