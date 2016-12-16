import { EC2 } from 'aws-sdk'
import { ec2 } from '../util'
import { Resource } from './abstract-resource'

type Instance = EC2.Types.Instance
type InstanceConfig = EC2.Types.RunInstancesRequest

function inStates(states: string[]) {
    return {
        Filters: [{
            Name: 'tag:role',
            Values: ['westeros-host']
        }, {
            Name: 'instance-state-name',
            Values: states
        }]
    }
}

const instanceConfig: InstanceConfig = {
    ImageId: 'ami-a1288ec2',
    InstanceType: 't2.micro',
    MinCount: 1,
    MaxCount: 1,
    KeyName: 'main'
}

export class InstanceResource extends Resource<Instance> {
    async checkRunning(): Promise<Instance[]> {
        const { Reservations: reservations } = await ec2.describeInstances(inStates(['pending', 'running'])).promise()
        return reservations.reduce((instances, res) => [...instances, ...res.Instances], [] as Instance[])
    }

    async checkRunable(): Promise<Instance[]> {
        const { Reservations: reservations } = await ec2.describeInstances(inStates(['stopping', 'stopped'])).promise()
        return reservations.reduce((instances, res) => [...instances, ...res.Instances], [] as Instance[])
    }

    async startRunable(): Promise<Instance[]> {
        throw new Error('Not implemented!')
    }

    async create(): Promise<Instance[]> {
        const { Instances: instances } = await ec2.runInstances(instanceConfig).promise()

        await ec2.createTags({
            Resources: instances.map(ins => ins.InstanceId),
            Tags: [{ Key: 'role', Value: 'westeros-host'}]
        }).promise()

        return instances
    }
}