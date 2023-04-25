import { writable } from "svelte/store"

const indicators = writable({
    loading: null,
    error: false,
    error2: false,
    open: {
        id: null,
        name: null,
        amount: null,
    },
    active: 3,
})

export default indicators