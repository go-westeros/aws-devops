export abstract class Resource<T> {
    abstract async checkRunning(): Promise<T[]>

    abstract async checkRunnable(): Promise<T[]>

    abstract async startRunnable(): Promise<T[]>

    abstract async create(): Promise<T[]>

    async prepare(): Promise<T[]> {
        const runningEntities = await this.checkRunning()
        if (runningEntities.length !== 0) { return runningEntities }

        // TODO Start runnable Entities

        const createdEntities = await this.create()
        if (createdEntities.length !== 0) { return createdEntities }

        throw new Error('Unknown Error')
    }
}
