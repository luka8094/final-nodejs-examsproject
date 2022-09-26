<script>
    import {fade} from "svelte/transition"
    import {useNavigate} from "svelte-navigator"
    import {user} from "../../../stores/systemd"
    
    let email, password, message
    const navigate = useNavigate()

    const login = async () => {
        const result = await fetch("/api/login",{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({email,password})
        })

        if(result.status === 401 ){ 
            const {data} = await result.json()
            console.log(data)
            return message = data
        } 
        if(result.status === 202){
            $user = true
            navigate("/account")
        }
        else return message = "the server is unavailable at the moment."
    }

</script>

<form on:submit|preventDefault={login}>
    <picture>
        <img src="/images/knox-logo-2.svg" alt="knox">
    </picture>
    <label for="userEmail">Email:</label>
    <input bind:value={email} type="email" name="userEmail" placeholder="email@email.com"> 
    <label for="userpassword">Password:</label>
    <input bind:value={password} type="password" name="userpassword" placeholder="enter password">
    <button type="submit">Log in</button>
</form>
<span id="login-error-box">{message === undefined ? "": message}</span>


<style>
    picture{
        display: flex;
        height: 50px;
    }

    form{
        display: flex;
        flex-direction: column;
        min-height: 250px;
        height: fit-content;
        width: 370px;
        align-items: center;
        padding: 20px;
        margin-top: 100px;
        justify-content: center;
        box-shadow: 1px 1px 10px
    }

    label{
        font-weight: 600;
        margin: 5px 0;
    }

    input{
        width: 90%;
        border: none;
        background: rgba(100,100,100,.3);
    }

    form *{
        width: 100%;
    }

    ::placeholder{
        border-bottom: solid 1px black;
    }

    button{
        width: var(--form-button-width);
        margin-top: auto;
        background: var(--button-background);
        color: var(--button-text)
    }

    #login-error-box{
        display: flex;
        color: red;
        height: 50px;
        width: 300px;
        font-size: 15px;
        font-weight: bold;
        align-items: center;
        justify-content: center;
    }
</style>