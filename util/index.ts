import { EC2 } from 'aws-sdk'
import { config } from '../config'

export const ec2 = new EC2(config)
