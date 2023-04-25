import { urls as urlStrings } from "$lib/assets/data/urls"

export const loadChartData = async (id) => {
    const urls = [urlStrings(7, [id])]
    let data, error = false
    await Promise.all(urls.map(async u => {
        return fetch(u)
            .then(res => res.json())
            .catch(err => console.log(err))
    }))
        .then(res => data = res)
        .catch(err => {
            error = err
            console.log(err)
        })
    return {
        error,
        data,
    }
}