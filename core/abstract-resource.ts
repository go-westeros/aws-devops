export abstract class Resource<T> {
    abstract async checkRunning(): Promise<T[]>

    abstract async checkRunable(): Promise<T[]>

    abstract async startRunable(): Promise<T[]>

    abstract async create(): Promise<T[]>

    async prepare(): Promise<T[]> {
        const runningEntities = await this.checkRunning()
        if (runningEntities.length !== 0) { return runningEntities }

        // TODO Run runable Ts

        const createdEntities = await this.create()
        if (createdEntities.length !== 0) { return createdEntities }

        throw new Error('Unknown Error')
    }
}
