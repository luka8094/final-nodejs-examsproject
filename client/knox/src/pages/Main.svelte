<script>
    import {useNavigate} from "svelte-navigator"
    import Trends from "../components/main/Trends.svelte"
    import Footer from "../components/Footer.svelte"

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
                <p>A new social platform for the cryptoenthusiast.</p>
            </article>
            <button on:click={joinRedirect}>Join the community</button>
        </aside>
        Main
    </div>
</section>
<Trends/>
<Footer/>

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
        height: 500px;
        width: calc(100% - 450px);
        margin: auto;
        background: rgba(100,110,150,.5);
        border: dashed 1px black;
    }

    #splash-welcome-message{
        display: flex;
        flex-direction: column;
        height: 370px;
        width: 300px;
        background: rgba(100,150,100,.5);
        border: dashed 1px black;
        margin: 10px auto auto 10px;
        padding: 10px;
    }

    h1, article{
        color: black;
    }

    h1{
        font-family: "Oxygen", sans-serif;
        font-size: 3em;
        font-weight: 700;
        margin: 0;
        border-bottom: solid 4.5px black;
    }

    article{
        display: flex;
        font-family: "Abyssinica SIL";
        font-size: 2.5em;
    }

    article p{
        margin-top: 10px;
        width: 250px;
        font-size: 0.81em;
    }

    button{
        height: 50px;
        width: 170px;
        border: none;
        border-radius: 0;
        margin: 0 auto auto 0;;
        background: rgba(100,50,50,.5);
        color: white;
    }

    @media screen and (max-width: 1000px){ 
        section{
            height: 110vh;
        }

        #splash-container{
            height: 550px;
            width: calc(100% - 300px);
        }
    }
</style>