<script>
    import {account} from "../../../../stores/systemd"
    import {toast} from "../../../modules/ToastContainer.svelte"

    const username = $account.username
    let currentPassword, newPassword

    const changePassword = async () =>{
        if(!currentPassword||!newPassword){ 
            toast("Fields can not be empty.",1)
        }
        const result = await fetch("/api/password",{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username: username,
                current: currentPassword,
                changed: newPassword
            })
        })

        if(result.status === 200){
            const {data} = await result.json()
            toast(data, 0)
        }
        if(result.status === 403 || result.status == 503){ 
            const {data} = await result.json()
            toast(data, 1) 
        }
    }
</script>

<div>
    <h2>Password change</h2>
    <article>
        In this section you can change your password to whatever you prefer whenever you like.
    </article>
    <form>
        <label for="current">Current password:</label>
        <input bind:value={currentPassword} 
        type="password" 
        name="current"/>
        <label for="new">New password:</label>
        <input bind:value={newPassword} 
        type="password" 
        name="new"/>
        <button type="button" on:click|preventDefault={changePassword}>confirm</button>
    </form>
</div>

<style>
    div{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        padding-left: 20px;
        background: rgba(255,255,255,.5);
    }

    h2{
        border-bottom: solid 1px black;
        width: 50%;
        margin-bottom: 20px;
        padding-bottom: 10px;
    }
    
    article{
        color: grey;
        word-break: break-word;
        width: 300px;
        margin-bottom: 20px;
        font-size: 20px;
    }

    form{
        display: flex;
        flex-direction: column;
        width: 200px;
    }

    label{
        margin: 10px 0;
        font-weight: 600px;
    }

    button{
        display: flex;
        width: 100px;
        justify-content: center;
    }
</style>