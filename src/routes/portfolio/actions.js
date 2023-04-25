import Cookies from 'js-cookie'
import { get } from 'svelte/store'
import { goto } from '$app/navigation'
import ind from '$lib/store/indicators.js'
import portfolioStore from '$lib/store/portfolio.js'
import { urls as urlStrings } from '$lib/assets/data/urls.js'

export const loadPortfolio = async () => {
    let result = {
        success: true,
        error: false,
        data: null,
    }, ids = '',
        rawP = Cookies.get('miniPortfolio') ?? false

    if (!rawP)
        return result 

    let p = JSON.parse(rawP)
    p.tokens.map((t, i) => {
        if (i + 1 == p.tokens.length)
            ids += t.id
        else ids += `${t.id},`
    })
    await fetch(urlStrings(3, [ids, p.tokens.length]))
        .then(async res => {
            result = {
                ...result,
                data: {
                    ...p,
                    tokens: (await res.json()).map(t => {
                        let aux = p.tokens.find(tk => tk.id == t.id)
                        return {
                            ...t,
                            amount: +aux.amount,
                            value: +(aux.amount * t.current_price).toFixed(1)
                        }
                    })
                }
            }
            let total = {
                value: (result.data.tokens
                    .reduce((acc, curr) => acc + +curr.value, 0)).toFixed(1),
                percentage: result.data.tokens
                    .reduce((acc, curr) => acc + +curr.price_change_percentage_24h, 0)
            }
            result = {
                ...result,
                data: {
                    ...result.data,
                    total
                }
            }
            portfolioStore.update(ps => ps = {
                ...ps,
                tokens: result.data.tokens,
                name: result.data.name,
                total
            })
        })
        .catch(err => {
            result = {
                ...result,
                error: err,
                success: false
            }
            console.log(err)
        })
    return result
}

export const createPortfolio = async () => {
    const varData = get(portfolioStore)
    if (!varData.name ||
        !varData.addedTokens.length) {
        ind.update(i => i = {
            ...i,
            error: !varData.addedTokens.length ?
                'No tokens provided' : 'No portfolio name provided'
        })
        return
    }
    ind.update(i => i = {
        ...i,
        error: false
    })
    Cookies.set('miniPortfolio', JSON.stringify({
        name: varData.name,
        tokens: varData.addedTokens
    }), { path: '/' })
    goto('/portfolio')
}

export const disclose = (tk) => {
    ind.update(i => i = {
        ...i, open: { name: tk.name, id: tk.id }
    })
}

export const removeToken = (id) => {
    portfolioStore.update(i => i = {
        ...i,
        addedTokens: i.addedTokens.filter((tk) => tk.id !== id)
    })
}

export const addToken = () => {
    let indData = get(ind),
        varData = get(portfolioStore)
    if (varData.addedTokens.length == 7) {
        ind.update(i => i = {
            ...i,
            error2: 'Portfolio is full, to create bigger portfolios please log in.'
        })
        return
    }
    if (!indData.open.amount) {
        ind.update(i => i = { ...i, error2: 'Empty fileds' })
        return
    }
    portfolioStore.update(v => {
        return v = {
            ...v,
            addedToken: v?.addedTokens.push({
                id: indData.open.id,
                name: indData.open.name,
                amount: indData.open.amount,
            })
        }
    })
    ind.update(i => i = {
        ...i,
        open: { id: null, name: null, amount: null },
        error2: ''
    })
    portfolioStore.update(v => v = {
        ...v,
        seachedTokens: null,
        searchedText: ''
    })
}

export const addTokenToPortfolio = async (id, amount, name) => {
    let rawP = Cookies.get('miniPortfolio') ?? false, p
    if (rawP) p = JSON.parse(rawP)
    p.tokens.push({
        id, amount, name  
    })
    Cookies.set('miniPortfolio', JSON.stringify(p), {
        path: '/'
    })
    await fetch(urlStrings(3, [id, 1]))
        .then(async res => {
            // let total = {
            //     value: (result.data.tokens
            //         .reduce((acc, curr) => acc + +curr.value, 0)).toFixed(1),
            //     percentage: result.data.tokens
            //         .reduce((acc, curr) => acc + +curr.price_change_percentage_24h, 0)
            // }
            portfolioStore.update(async ps => ps = {
                ...ps,
                tokens: ps.tokens.push((await res.json())[0]),
                name: result.data.name,
            })
        })
        .catch(err => {
            result = {
                ...result,
                error: err,
                success: false
            }
            console.log(err)
        })
}

export const editToken = (id, amount) => {
    let rawP = Cookies.get('miniPortfolio') ?? false, p
    if (rawP) p = JSON.parse(rawP)
    p.tokens = p.tokens.map(t => {
        if (t.id == id) {
            return { ...t, amount }
        } else return t 
    })
    Cookies.set('miniPortfolio', JSON.stringify(p), {
        path: '/'
    })
    portfolioStore.update(p => p = {
        ...p,
        isEditing: null,
        tokens: p.tokens.map(t => {
            if (t.id == id) {
                return { 
                    ...t, 
                    amount,
                    value: +(amount * t.current_price).toFixed(2) 
                }
            } else return t
        }),
        total: {
            value: +(p.tokens.reduce((acc, curr) => acc + +curr.value, 0)).toFixed(1),
            percentage: +p.tokens.reduce((acc, curr) => acc + +curr.price_change_percentage_24h, 0)
        }
    })
}

export const removeFromPortfolio = (id) => {
    let rawP = Cookies.get('miniPortfolio') ?? false
    if (!rawP) return result
    let p = JSON.parse(rawP)
    Cookies.set('miniPortfolio', JSON.stringify({
        name: p.name,
        tokens: p.tokens.filter(t => t.id !== id)
    }), { path: '/' })
    portfolioStore.update(ps => ps = {
        ...ps,
        tokens: ps.tokens.filter(t => t.id !== id)
    })
}

export const deletePortfolio = () => {
    Cookies.remove('miniPortfolio')
    goto('/')
}
