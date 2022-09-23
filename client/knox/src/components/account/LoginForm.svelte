<script>
    import {navigate} from "svelte-navigator"
    import {user} from "../../../stores/systemd"

    function login(){
        $user = true
        navigate("/account", {replace: true})
    }
</script>

<form on:submit={login}>
    <button type="submit">login</button>
</form>

<style>
     form{
        display: flex;
        height: 100px;
        width: 200px;
        align-items: center;
        justify-content: center;
    }
</style>