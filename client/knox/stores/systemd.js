import {writable, derived} from "svelte/store"

export const rootPrivilege = writable(null)
export const user = writable(null)
export const account = writable({})
export const visited = writable(false)