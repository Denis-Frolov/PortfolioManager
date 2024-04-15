// Asset has Upper case field names to accommodate Yahoo API format
export interface Asset {
    Symbol: string
    QuoteType: string
    FullExchangeName: string
    MarketState: string
    RegularMarketPrice: number
}

export interface HistoryItem {
    dateTime: string
    close: string
}