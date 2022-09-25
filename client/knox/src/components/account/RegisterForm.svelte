<script>
    import {navigate} from "svelte-navigator"   

    let firstname, lastname, username, email, password

    const register = async () => {
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
            console.log("registration successful.")
            navigate("/success",{replace: true})
        }
        else console.log("an error occured.")
    }
</script>

<form on:submit={register}>
    <div id="fullname-row">
        <div>
            <label for="firstName">First name:</label>
            <input bind:value={firstname} type="text" name="firstName" placeholder="your firstname...">
        </div>  
        <div>
            <label for="lastName">Last name:</label>
            <input bind:value={lastname} type="text" name="lastName" placeholder="..and your lastname">
        </div>
    </div>
    <label for="userName">Username:</label>
    <input bind:value={username} type="text" name="userName" placeholder="choose an username">
    <label for="userEmail">Email:</label>
    <input bind:value={email} type="email" name="userEmail" placeholder="type your email"> 
    <label for="userpassword">Password:</label>
    <input bind:value={password} type="password" name="userpassword" placeholder="pick a nice password">
    <button type="submit">Register</button>
</form>

<style>
    form{
        display: flex;
        flex-direction: column;
        height: 380px;
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
        border: none;
        border-bottom: solid 1px black;
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
        margin-top: auto;
        background: var(--button-background);
        color: var(--button-text)
    }
</style>