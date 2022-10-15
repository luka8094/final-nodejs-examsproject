import {writable, derived} from "svelte/store"

export const rootPrivilege = writable(null)
export const user = writable(null)
export const account = writable({})

export const visited = writable(localStorage.getItem('_kc'))
export const trending = writable([])

export const milestones = writable([])
function createMilestones(){
    const {set, subscribe, update} = writable([])
    return{
        subscribe,
        updateMilestones: (index) => update(milestone => {milestone[index].currentValue + 1}),
        setMilestones: (milestones) => set(milestones)
    }
}

export const milestonesTest = createMilestones()