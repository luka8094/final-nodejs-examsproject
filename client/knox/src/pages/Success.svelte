<script>
    import {useNavigate} from "svelte-navigator"

    const navigate = useNavigate()

    setTimeout(() =>{
        navigate("/",{replace: true})
    },3000)
</script>

<section>
    <h1>Account registered!</h1>
    <p>Hang on! We'll redirected you in a just few..</p>
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        height: 90vh;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    h1{
        font-size: 5em;
        margin: 0;
    }
</style>