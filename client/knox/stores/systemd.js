import {writable} from "svelte/store"

export const privileged = writable(null)
export const user = writable(null)
export const account = writable({})
export const requestCanceller = writable(new AbortController())
export const cancelSignal = writable(requestCanceller.signal)

export const visited = writable(localStorage.getItem('_kc'))
export const trending = writable([])
export const coinsList = writable([])

export const milestones = writable([])
export const description = writable(null)
export const preferences = writable([])
export const subscriptions = writable([])

export const cryptoBag = writable([])