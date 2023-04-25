import { writable } from "svelte/store"

const convert = writable({
    token: null,
    loading: null,
    searchedText: '',
    data: {
        data: null,
        error: null,
        fetched: null,
    },
    opens: [0, 0],
    searches: ['', ''],
    coins: [null, null],
    values: [null, null]
})

export default convert