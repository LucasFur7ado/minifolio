import { urls as urlStrings } from "$lib/assets/data/urls"
import convertStore from '$lib/store/convert.js'
import searchStore from '$lib/store/search.js'
import dataStore from '$lib/store/data.js'
import ind from '$lib/store/indicators.js'
import { get } from 'svelte/store'
import Cookies from 'js-cookie'

// HOME PAGE

export const loadData = async () => {
    let data = {
        data: null,
        success: true,
        error: null
    }
    const urls = [urlStrings(1, ['27'])]
    await Promise.all(urls.map(async u => {
        return fetch(u)
            .then(res => res.json())
    }))
        .then(res => data.data = res[0])
        .catch(err => {
            data = {
                ...data,
                success: false,
                error: err
            }
            console.log(err)
        })
    return data
}

export const disclose = (nbr) => {
    let active
    ind.subscribe(i => {
        active = i.active
    })
    ind.update(i => i = {
        ...i, active: active == nbr ? 0 : nbr
    })
}

// WATCHLIST

export const loadWatchlist = async () => {
    let result = {
        data: null,
        success: true,
        error: null
    },
        favs = Cookies.get('miniWatchlist') ?? null,
        aux = get(dataStore),
        ids = ''
    if (aux.watchlist !== null && !aux.changes) {
        return {
            ...result,
            data: aux.watchlist
        }
    }
    if (!favs) return {
        ...result,
        data: []
    }
    favs = JSON.parse(favs)
    favs.map((f, i) => {
        if (i !== favs.length - 1)
            ids += `${f},`
        else ids += f
    })
    await fetch(urlStrings(3, [ids, favs.length]))
        .then(async res => {
            result.data = await res.json()
            dataStore.update(d => d = {
                ...d,
                watchlist: result.data,
                changes: false
            })
        })
        .catch(err => {
            result = {
                ...result,
                success: false,
                error: err
            }
            console.log(err)
        })
    return result
}

export const removeFromWatchlist = (id) => {
    const pCookie = Cookies.get("miniWatchlist") ?? null
    let p = pCookie ? JSON.parse(pCookie) : false
    if (!p)
        return
    p = p.filter(t => t !== id)
    dataStore.update(d => d = {
        ...d,
        watchlist: d.watchlist.filter(t => t.id !== id)
    })
    Cookies.set('miniWatchlist', JSON.stringify(p), {
        path: '/'
    })
}

// PORTFOLIO

export const getPortfolio = async () => {
    const pCookie = Cookies.get("miniPortfolio") ?? null
    let p = pCookie ? JSON.parse(pCookie) : false
    if (p) {
        await Promise.all(
            p.tokens.map((tk) => {
                return fetch(urlStrings(6, [tk.id]))
                    .then((res) => res.json())
                    .catch((err) => console.log(err))
            }))
            .then((res) => {
                const newArr = p.tokens.map((tk) => ({
                    ...tk,
                    value: res.find((t) => t[tk.id])
                }))
                p.total = newArr.reduce(
                    (acc, curr) => acc + Number(curr.amount * curr.value[curr.id].usd),
                    0)
            })
            .catch((err) => console.log(err))
    }
    return p
}

// SEARCH BOX

export const search = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    let text = formData.get('searchedText')
    searchStore.update(s => s = {
        ...s,
        searchedText: text,
        data: {
            ...s.data,
            fetched: false,
            error: null
        }
    })
    if (text == "") return;
    if (text.length < 2) return;
    searchStore.update(s => s = {
        ...s,
        loading: true
    })
    await fetch(urlStrings(2, [text]))
        .then(async (res) => {
            let result = await res.json();
            searchStore.update(s => s = {
                ...s,
                loading: false,
                data: {
                    data: result.coins,
                    fetched: true,
                    error: false
                }
            })
        })
        .catch((err) => {
            searchStore.update(s => s = {
                ...s,
                data: {
                    ...s.data,
                    error: err
                }
            })
            console.log(err);
        });
};

export const resetSearch = () => {
    searchStore.update(s => s = {
        searchedText: '',
        loading: null,
        data: {
            data: null,
            error: null,
            fetched: null
        }
    })
}

// CONVERT 

export const discloseConvert = (nbr) => {
    convertStore.update(c => c = {
        ...c,
        searched: ['', '']
    })
    if (nbr == 1) {
        convertStore.update(c => c = {
            ...c,
            opens: [!c.opens[0], false]
        })
    } else {
        convertStore.update(c => c = {
            ...c,
            opens: [false, !c.opens[1]]
        })
    }
}

export const searchConvert = async (e) => {
    convertStore.update(c => c = {
        ...c,
        searchText: e.target.value,
        data: {
            ...c.data,
            fetched: false,
            error: null,
        }
    })
    if (e.target.value == '') return;
    if (e.target.value.length < 2) return;
    convertStore.update(c => c = {
        ...c,
        loading: true,
    })
    await fetch(urlStrings(2, [e.target.value]))
        .then(async (res) => {
            let result = await res.json()
            convertStore.update(c => c = {
                ...c,
                loading: false,
                data: {
                    ...c.data,
                    data: result.coins,
                    fetched: true,
                    error: false,
                }
            })
        })
        .catch((err) => {
            convertStore.update(c => c = {
                ...c,
                data: {
                    ...c.data,
                    error: err
                }
            })
            console.log(err)
        })
}

export const setValue = (e) => {
    if (e.target.name == 'first') {
        convertStore.update(c => c = {
                ...c,
                values: [+e.target.value, +((c.coins[0].current_price 
                    * e.target.value) / c.coins[1].current_price).toFixed(2)] 
            })
        return
    }
    convertStore.update(c => c = {
        ...c,
        values: [+((c.coins[1].current_price * e.target.value) /
            c.coins[0].current_price).toFixed(2), +e.target.value]
    })
}

export const select = async (tk) => {
    convertStore.update(c => c = {
        ...c,
        token: tk
    })
    if (!tk.current_price)
        fetch(urlStrings(6, [tk.id]))
            .then(async (res) => {
                const price = await res.json()
                convertStore.update(c => c = {
                    ...c,
                    token: {
                        ...c.token,
                        current_price: +price[tk.id].usd
                    }
                })
            })
            .catch((err) => console.log(err))
    convertStore.update(c => c = {
        ...c,
        data: {
            ...c.data,
            data: [],
            fetched: false
        },
        opens: c.opens[0] == 1 ? [false, c.opens[1]] : [c.opens[0], false],
        coins: c.opens[0] == 1 ? [c.token, c.coins[1]] : [c.coins[0], c.token]
    })
}

export let clearResult = () => {
    convertStore.update(c => c = {
        ...c,
        searchedText: '',
        data: {
            ...c.data,
            data: [],
            fetched: false
        }
    })
}