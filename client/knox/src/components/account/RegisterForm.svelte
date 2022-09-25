<script>
    import {navigate} from "svelte-navigator"   

    const register = async () => {
        const response = await fetch("/api/register")
        const result = response.json()

        if(response.status === 201){ 
            console.log("registration successful.")
            navigate("/")
        }
        else console.log("an error occured.")
    }
</script>

<form on:submit={register}>
    <div id="fullname-row">
        <div>
            <label for="firstName">First name:</label>
            <input type="text" name="firstName" placeholder="your firstname...">
        </div>  
        <div>
            <label for="lastName">Last name:</label>
            <input type="text" name="lastName" placeholder="..and your lastname">
        </div>
    </div>
    <label for="userName">Username:</label>
    <input type="text" name="userName" placeholder="choose an username">
    <label for="userEmail">Email:</label>
    <input type="email" name="userEmail" placeholder="type your email"> 
    <label for="userpassword">Password:</label>
    <input type="password" name="userpassword" placeholder="pick a nice password">
    <button type="submit">register</button>
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