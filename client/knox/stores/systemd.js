import {writable} from "svelte/store"

export const user = writable(null)
export const account = writable({})
export const visited = writable(false)