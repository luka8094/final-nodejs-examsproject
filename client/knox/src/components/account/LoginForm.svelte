<script>
    import {fade} from "svelte/transition"
    import {Wave} from "svelte-loading-spinners"
    import {useNavigate} from "svelte-navigator"
    import {user, privileged} from "../../../stores/systemd"
    import {toast} from "../../modules/ToastContainer.svelte"
    
    let email, password
    let awaiting = false
    const navigate = useNavigate()

    const login = async () => {
        awaiting = true
        const result = await fetch("/api/login",{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({email,password})
        })

        if(result.status === 401 ){ 
            const {data} = await result.json()
            awaiting = false
            return toast(data,1)
        } 

        if(result.status === 202){
            const {loggedIn, admin, message} = await result.json()
            $user = loggedIn
            $privileged = admin
            awaiting = false
            toast(message,0)
            navigate("/account")
        }
        else{
            awaiting = false
            toast("the server is unavailable at the moment",1)
        }
    }
</script>

<form style={ awaiting ? "box-shadow: 0;" : ""} on:submit|preventDefault={login}>
    {#if !awaiting}
        <h1>Sign into your account</h1>
        <label for="userEmail">Email<span class="required-field">*</span>:</label>
        <input bind:value={email} 
            minlength="8" 
            maxlength="255" 
            type="email" 
            name="userEmail" 
            placeholder="email@email.com" 
            required> 
        <label for="userpassword">Password<span class="required-field">*</span>:</label>
        <input bind:value={password} 
            minlength="8" 
            maxlength="255" 
            type="password" 
            name="userpassword" 
            placeholder="enter password" 
            required>
        <button type="submit">Log in</button>
    {:else}
        <Wave size="50" unit="px" color="#d3d0cf" duration="1s" />
    {/if}
</form>

<style>
    form{
        display: flex;
        flex-direction: column;
        min-height: 250px;
        height: 300px;
        width: 350px;
        background: white;
        align-items: center;
        padding: 20px;
        margin-top: 100px;
        justify-content: center;
        box-shadow: 1px 1px 10px;
        transition: all;
    }

    h1{
        color: black;
        margin: 5px auto 30px auto;
        text-align: center;
    }

    label{
        font-weight: 600;
        margin: 8px 0;
    }

    .required-field{
        color: red;
    }

    input{
        width: 90%;
        border: none;
        padding: 10px;
        background: rgba(100,100,100,.3);
    }

    form *{
        width: 100%;
    }

    ::placeholder{
        border-bottom: solid 1px black;
        color: rgba(0,0,0,.3);
    }

    button{
        width: var(--form-button-width);
        margin-top: 20px;
        background: lightgrey;
        color: var(--button-text);
        border: solid 2px black;
        border-radius: 50px;
    }
</style>