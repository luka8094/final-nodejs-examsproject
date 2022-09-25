<script>
    import {navigate} from "svelte-navigator"
    import {user} from "../../../stores/systemd"

    const login = () => {
        $user = true
        navigate("/account", {replace: true})
    }
</script>

<form on:submit={login}>
    <label for="userEmail">Email:</label>
    <input type="email" name="userEmail" placeholder="type your email"> 
    <label for="userpassword">Password:</label>
    <input type="password" name="userpassword" placeholder="pick a nice password">
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