export interface Campaign {
    name: string,
    description: string,
    characterIds: string[],
    mapIds: string[]
    owner: string,
    users: string[],
    invites: string[]
}