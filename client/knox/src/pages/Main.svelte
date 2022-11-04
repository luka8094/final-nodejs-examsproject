<script>
    //Scrambling effect inspired by source(s): 
    //https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield
    import {useNavigate, useLocation} from "svelte-navigator"
    import {user} from "../../stores/systemd"
    import SplashBackground from "../components/main/SplashBackground.svelte"
    import Trends from "../components/main/Trends.svelte"
    import NewsReel from "../components/main/NewsReel.svelte"
    import Footer from "../components/Footer.svelte"

    let title = "52FA20224A2B4171"
    const navigate = useNavigate()
    const location = useLocation()

    async function introduction(){
        function sleepTimer(milliseconds){
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }

        function* scrambler(){
            let welcomeString = 'WELCOME TO KNOX'
            let message
            for(let i = 0; i <= welcomeString.length; i++){
                let randomString = size => [...Array(size)].map( () => Math.floor(Math.random() * 16).toString(16)).join('')
                message = welcomeString.substring(0,i)+randomString((welcomeString.length-i))
                yield message
            }
        }
        
        const titleScrambler = scrambler()

        for(let i = 0; i < 16; i++){
            await sleepTimer(150)
            title = titleScrambler.next().value
        }
    }

    const decrypt = async (initiate) => {new Promise(introduction, setTimeout(introduction, initiate) )}

    ;(async() => {
        await decrypt(18600)
    })()

    function joinRedirect(){
        if(!$user) navigate("/register", {state:{from: $location}, replace: true})
        else if($user) navigate("/account", {state:{from: $location}, replace: true})
    }
</script>

<svelte:window scrollY={0} />

<section>
    <div id="splash-container">
        <aside id="splash-welcome-message">
            <h1>{title}</h1>
            <article>
                <p>A new social platform for the cryptoenthusiast.</p>
            </article>
            <div id="button-container">
                <button on:click={joinRedirect}>Join the community</button>
                <div id="arrow">
                    <div class="line line-one"></div>
                    <div class="line line-two"></div>
                    <div class="line line-three"></div>
                </div>
            </div>
        </aside>
     </div>
     <SplashBackground/>
</section>
<Trends/>
<NewsReel/>
<Footer/>

<style>
    section{
        display:flex;
        height: 85vh;
        width: 100%;
        padding-top: var(--menu-padding);
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    #splash-container{
        display: flex;
        height: 500px;
        width: calc(100% - 450px);
        margin: auto;
    }

    #splash-welcome-message{
        display: flex;
        flex-direction: column;
        height: 370px;
        width: 300px;
        border-left: solid 2px black;
        margin: 10px auto auto 10px;
        padding: 10px;
    }

    h1, article{
        color: black;
    }

    h1:focus{
        outline: none;
    }

    h1{
        font-family: "Oxygen", sans-serif;
        font-size: 3em;
        font-weight: 700;
        width: 300px;
        word-wrap: break-word;
        margin: 0;
        border-bottom: 6.5px double black;
    }

    article{
        display: flex;
        font-family: "Abyssinica SIL";
        font-size: 2.5em;
    }

    article p{
        margin-top: 10px;
        width: 245px;
        font-size: 0.81em;
    }

    #button-container{
        display: flex;
    }

    button{
        height: 50px;
        width: 170px;
        border: none;
        border-radius: 0;
        margin: 0 auto auto 0;;
        background: lightgrey;
        color: var(--button-text);
    }

    #arrow{
        display: flex;
        position: relative;
        height: 20px;
        width: 50px;
        margin-right: 60px;
        background: rgba(100,10,150,0);
        top: 50%;
        z-index: -1;
        transition: margin .2s ease-in;
    }

    #button-container:hover > #arrow{
        margin-right: 70px;
    }

    .line{
        display: flex;
        width: 30px;
        height: 2px;
        background: black;
    }

    .line-one,
    .line-two,
    .line-three{
        position: absolute;
    }

    .line-one,
    .line-two{
        width: 10px;
        border-radius: 10px 0 0 10px;
    }

    .line-one{
        transform: rotate(45deg);
        top: 19%;
        left: -2%;
    }

    .line-two{
        transform: rotate(-45deg);
        top: -15%;
        left: -2%;
    }

    .line-three{
        border-radius: 10px 0 0 10px;
        left: 1%;
        top: 3%;
    }


    @media screen and (max-width: 1200px){
        #splash-container{
            height: 410px;
        }
    }


    @media screen and (max-width: 1000px){ 
        section{
            height: 100vh;
        }

        #splash-container{
            height: 550px;
            width: calc(100% - 300px);
        }
    }
</style>