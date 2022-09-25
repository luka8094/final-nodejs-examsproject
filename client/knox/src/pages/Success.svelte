<script>
    import {useNavigate} from "svelte-navigator"
    import {fade} from "svelte/transition"

    const navigate = useNavigate()

    setTimeout(() =>{
        navigate("/",{replace: true})
    },3000)
</script>

<section>
    <h1 transition:fade>Account registered!</h1>
    <p transition:fade={{delay: 500}}>Hang on! We'll redirect you shortly..</p>
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