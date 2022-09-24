<script>
    import {navigate} from "svelte-navigator"
    import {user} from "../../stores/systemd"

    function logout(){
        $user = null    
        navigate("/")
    }
</script>
<section>
    <p>Account</p>
    <button on:click={logout}>logout</button>
</section>

<style>
    section{
        display:flex;
        height: 100vh;
        width: 100%;
        background: rgba(10,250,150,.5);
        align-items: center;
        justify-content: center;
    }
</style>