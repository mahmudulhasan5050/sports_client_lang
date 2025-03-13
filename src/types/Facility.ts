export interface Facility {
    _id?: string
    type: { en: string; fi: string; sv: string }
    courtNumber: number
    pricePerHour: number
    isActive: boolean
}
