<script>
    import {Wave} from "svelte-loading-spinners"
    import {useNavigate} from "svelte-navigator"
    import {toast} from "../../modules/ToastContainer.svelte"

    let firstname, lastname, username, email, password
    let awaiting = false
    
    const navigate = useNavigate()

    const register = async () => {
        awaiting = true
        
        const response = await fetch("/api/register", {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({
                firstname, 
                lastname, 
                username, 
                email, 
                password
            })
        })

        if(response.status === 201){ 
            awaiting = false
            const {data} = await response.json()
            toast(data,2)
            navigate("/success",{replace: true})
        }
        else awaiting = false
    }
</script>

<form on:submit|preventDefault={register}>
    {#if !awaiting}
        <h1>Sign up for an account</h1>
        <div id="fullname-row">
            <div>
                <label for="firstName">First name:</label>
                <input bind:value={firstname} maxlength="255" type="text" name="firstName" placeholder="First name">
            </div>  
            <div>
                <label for="lastName">Last name:</label>
                <input bind:value={lastname} maxlength="255" type="text" name="lastName" placeholder="Last name">
            </div>
        </div>
        <label for="userName">Username<span class="required-field">*</span>:</label>
        <input bind:value={username} 
            minlength="8" 
            maxlength="255" 
            type="text" 
            name="userName" 
            placeholder="choose username" 
            required>
        <label for="userEmail">Email<span class="required-field">*</span>:</label>
        <input bind:value={email} 
            minlength="8" 
            maxlength="255" 
            type="email" 
            name="userEmail" 
            placeholder="Your email" 
            required> 
        <label for="userpassword">Password<span class="required-field">*</span>:</label>
        <input bind:value={password} 
            minlength="8" 
            maxlength="255" 
            type="password" 
            name="userpassword" 
            placeholder="password" 
            required>
        <button type="submit">Register</button>
    {:else}   
        <Wave size="50" unit="px" color="#d3d0cf" duration="1s" />
    {/if}
</form>

<style>
    h1{
        color: black;
        margin: 5px auto 30px auto;
        text-align: center;
    }

    form{
        display: flex;
        flex-direction: column;
        min-height: 300px;
        height: fit-content;
        width: 370px;
        align-items: center;
        padding: 20px;
        justify-content: center;
        box-shadow: 1px 1px 10px
    }

    label{
        font-weight: 600;
        margin: 5px 0;
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

    ::placeholder{
        border-bottom: solid 1px black;
        color: rbga(0,0,0,.3);
    }

    form *{
        width: 100%;
    }

    #fullname-row{
        display: flex;
    }

    #fullname-row > div:nth-child(odd){
        margin-right: 10px;
    }

    #fullname-row > div:nth-child(even){
        margin-left: 10px;
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