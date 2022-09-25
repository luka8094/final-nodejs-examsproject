<script>
    import {navigate} from "svelte-navigator"
    import {user} from "../../../stores/systemd"

    let email, password, message

    const login = async () => {
        const result = await fetch("/api/login",{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({email,password})
        })

        if(result.status === 401 ){ 
            const {data} = result.json()
            message = data
        } 
        if(result.status === 202){
            const {data} = 
            $user = true
            navigate("/account", {replace: true})
        }
        else message = "the server is unavailable at the moment."
    }
</script>

<form on:submit|preventDefault={login}>
    <label for="userEmail">Email:</label>
    <input bind:value={email} type="email" name="userEmail" placeholder="type your email"> 
    <label for="userpassword">Password:</label>
    <input bind:value={password} type="password" name="userpassword" placeholder="pick a nice password">
    <button type="submit">Log in</button>
</form>

<style>
    form{
        display: flex;
        flex-direction: column;
        height: 250px;
        width: 370px;
        align-items: center;
        padding: 10px;
        justify-content: center;
        box-shadow: 1px 1px 10px
    }

    label{
        margin: 5px 0;
    }

    input{
        width: 90%;
        border: none;
        border-bottom: solid 1px black;
    }

    form *{
        width: 100%;
    }

    button{
        width: var(--form-button-width);
        margin-top: auto;
        background: var(--button-background);
        color: var(--button-text)
    }
</style>