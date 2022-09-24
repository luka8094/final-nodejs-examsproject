<script>
    import {useNavigate} from "svelte-navigator"
    import Trends from "../components/main/Trends.svelte"

    const navigate = useNavigate()

    function joinRedirect(){
        navigate("/register", {replace: true})
    }
</script>  

<section>
    <div id="splash-container">
        <aside id="splash-welcome-message">
            <h1>WELCOME TO KNOX</h1>
            <article>
            A new social platform for the cryptoenthusiast.
            </article>
            <button on:click={joinRedirect}>Join the new era</button>
        </aside>
        Main
    </div>
</section>

<style>
    section{
        display:flex;
        height: 85vh;
        width: 100%;
        background: rgba(100,200,250,.5);
        padding-top: var(--menu-padding);
        align-items: center;
        justify-content: center;
    }

    #splash-container{
        display: flex;
        height: 550px;
        width: calc(100% - 300px);
        margin: auto;
        background: rgba(100,110,150,.5);
        border: dashed 1px black;
    }

    #splash-welcome-message{
        display: flex;
        flex-direction: column;
        height: 450px;
        width: 300px;
        background: rgba(100,150,100,.5);
        border: dashed 1px black;
        margin: auto auto auto 10px;
        padding: 10px;
    }

    h1{
        font-size: 3em;
        border-bottom: solid 1px black;
        margin: 0;
    }

    article{
        display: flex;
        font-size: 2.5em;
    }

    button{
        height: 50px;
        width: 150px;
        border: none;
        border-radius: 0;
        margin: 30px auto auto 0;;
        background: rgba(100,50,50,.5);
        color: white;
    }
</style>