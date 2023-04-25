import { writable } from "svelte/store"

const data = writable({
    watchlist: null,
    changes: false,
})

export default data 