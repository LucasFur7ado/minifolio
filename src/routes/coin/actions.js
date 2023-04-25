import { urls as urlStrings } from "$lib/assets/data/urls"
import dataStore from '$lib/store/data.js'
import Cookies from 'js-cookie'

export const loadData = async (id) => {
    let result = {
        data: null,
        success: true,
        error: null
    }
    const urls = [
        urlStrings(3, [id, 1]),
        urlStrings(4, [id]),
    ]
    await Promise.all(urls.map(async u => {
        return fetch(u)
            .then(res => res.json())
    }))
        .then(res => result.data = {
            ...result.data,
            data: res
        })
        .catch(err => {
            result = {
                ...result,
                success: false,
                error: err,
                data: false
            }
        })
    if (!result.success)
        return result
    const favs = Cookies.get('miniWatchlist')
    const fav = favs ? JSON.parse(favs) : false
    result.data = {
        ...result.data,
        coin: result.data?.data ? result.data?.data[0][0] : {},
        isFav: fav ? fav.find(tk => tk == id) : false
    }
    return result
}

export const addToWatchlist = async (id) => {
    const favs = Cookies.get('miniWatchlist') ?? false
    dataStore.update(d => d = {
        ...d,
        changes: true
    })
    if (!favs) {
        Cookies.set('miniWatchlist', JSON.stringify([id]), {
            path: '/'
        })
        return {
            success: true,
            favs: id
        }
    }
    let parsedFavs = JSON.parse(favs)
    const already = parsedFavs.find(tk => tk == id)
    if (already) {
        const editedFavs = parsedFavs.filter(tk => tk !== id)
        Cookies.set('miniWatchlist', JSON.stringify(editedFavs), {
            path: '/'
        })
        return {
            success: true,
            isFav: false
        }
    }
    parsedFavs.push(id)
    Cookies.set('miniWatchlist', JSON.stringify(parsedFavs), {
        path: '/'
    })
    return {
        success: true,
        isFav: parsedFavs ? parsedFavs.find(tk => tk == id) : false
    }
}