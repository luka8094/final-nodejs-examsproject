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
    <input type="email" name="userEmail">
    <label for="userPassword">Password:</label>
    <input type="password" name="userPassword">
    <button type="submit">login</button>
</form>

<style>
    form{
        display: flex;
        flex-direction: column;
        height: 100px;
        width: 200px;
        align-items: center;
        justify-content: center;
    }
</style>