// 1. Get coins with general data. Receives: (How many coins)
// 2. Search coin. Receives: (Coin id)
// 3. Get individual coin general data. Receives: (Coin ids (concatenated by ,), Coins length)
// 4. Comunity, sites and description data about a coin. Receives: (Coin id)
// 6. Get only price. Receives: (Coin id)
// 7. Get 30 days chart data: (Coin id)

const geckoBase = 'https://api.coingecko.com/api/v3'

export const urls = (urlId, args) => {
    switch (urlId) {
        case 1: return `${geckoBase}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${args[0]}&page=1&sparkline=false`
        case 2: return `${geckoBase}/search?query=${args[0]}`
        case 3: return `${geckoBase}/coins/markets?vs_currency=usd&ids=${args[0]}&order=market_cap_desc&per_page=${args[1]}&page=1&sparkline=false&locale=en`
        case 4: return `${geckoBase}/coins/${args[0]}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
        case 6: return `${geckoBase}/simple/price?ids=${args[0]}&vs_currencies=usd`
        case 7: return `${geckoBase}/coins/${args[0]}/market_chart?vs_currency=usd&days=30&interval=daily`
        default: break
    }
}