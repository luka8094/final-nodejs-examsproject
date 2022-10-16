import {milestones} from "../../stores/systemd"

self.postMessage("updating milestones")
const result = await fetch("/api/milestones",{
    method:'PATCH',
    credentials: 'include',
    body :{
        milestones: JSON.stringify(milestones)
    }
})

if(result.created) self.postMessage("milestones updated")