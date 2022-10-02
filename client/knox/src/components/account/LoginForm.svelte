<script>
    import {fade} from "svelte/transition"
    import {useNavigate} from "svelte-navigator"
    import {user} from "../../../stores/systemd"
    import {toast} from "../../modules/ToastContainer.svelte"
    
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
            toast("Login success! 👌","white")
            navigate("/account")
        }
        else return message = "the server is unavailable at the moment."
    }

</script>

<form on:submit|preventDefault={login}>
    <h1>Sign into your account</h1>
    <label for="userEmail">Email<span class="required-field">*</span>:</label>
    <input bind:value={email} type="email" name="userEmail" placeholder="email@email.com"> 
    <label for="userpassword">Password<span class="required-field">*</span>:</label>
    <input bind:value={password} type="password" name="userpassword" placeholder="enter password">
    <button type="submit">Log in</button>
</form>
<span id="login-error-box">{message === undefined ? "": message}</span>


<style>
    form{
        display: flex;
        flex-direction: column;
        min-height: 250px;
        height: fit-content;
        width: 350px;
        background: white;
        align-items: center;
        padding: 20px;
        margin-top: 100px;
        justify-content: center;
        box-shadow: 1px 1px 10px
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
    }

    button{
        width: var(--form-button-width);
        margin-top: 20px;
        background: lightgrey;
        color: var(--button-text);
        border: solid 2px black;
        border-radius: 50px;
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