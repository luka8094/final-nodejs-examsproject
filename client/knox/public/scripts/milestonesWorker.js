self.onmessage = async function(message){
    const result = await fetch("/api/milestones",{
        method:'PATCH',
        headers:{'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({milestones: message.data})
    })

    if(result.status === 204)return self.postMessage("process complete")
    else return self.postMessage("process interrupted")
}