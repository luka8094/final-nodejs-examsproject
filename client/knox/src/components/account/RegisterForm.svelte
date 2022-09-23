<script>
    import {navigate} from "svelte-navigator"   

    function register(){
        navigate("/")
    }
</script>

<form on:submit={register}>
    <button type="submit">register</button>
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