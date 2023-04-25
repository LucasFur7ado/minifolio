import { writable } from "svelte/store"

const portfolio = writable({
    name: "",
    tokens: null,
    // CREATE 
    addedTokens: [],
    searchedTokens: null,
    searchedText: "",
    isEditing: null,
    isAdding: null
})

export default portfolio 