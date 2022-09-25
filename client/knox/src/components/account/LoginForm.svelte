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
    <button type="submit">register</button>
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
        border: dashed 1px black;
    }

    label{
        margin: 5px 0;
    }

    form *{
        width: 100%;
    }

    button{
        margin-top: auto;
    }
</style>