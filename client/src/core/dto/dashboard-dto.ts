export interface DashboardDTO {
    cards: {
        title: string
        icon: string
        value: string | number
    }[]    
    recommended_providers: {
        month: string
        amount: number
    }[]
    top_providers: {
        name: string
        email: string
        value: number
    }[]
}