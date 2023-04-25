import { writable } from "svelte/store"

const search = writable({
    searchedText: '',
    loading: null,
    data: {
        data: null,
        error: null,
        fetched: null,
    },
})

export default search