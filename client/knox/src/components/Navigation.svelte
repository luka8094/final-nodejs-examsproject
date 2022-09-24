<script>
    import gsap from "gsap/dist/gsap"
    import {onMount} from "svelte"
    import {Router, Link, Route} from 'svelte-navigator'
    import PrivateRoute from './authorization/PrivateRoute.svelte'
    import {user, visited} from "../../stores/systemd"
    import Main from '../pages/Main.svelte'
    import Account from '../pages/Account.svelte'
    import Chatrooms from '../pages/Chatrooms.svelte'
    import Login from '../pages/Login.svelte'
    import Register from '../pages/Register.svelte'
    import Market from '../pages/Market.svelte'
    import AccessDenied from './authorization/AccessDenied.svelte'

    let logo, logoName
    let screenWidth = window.innerWidth / 2
    let screenHeight = window.innerHeight / 2

    $: if(!$visited){
        onMount(() => {
            const timeline = gsap.timeline()
            const duration = 1
            timeline
            .set(logo, {display: "none", width: 0, opacity: 0, x: screenWidth , y: screenHeight, xPercent:"-150", yPercent:"-50"}, "+=1")
            .set(logoName, {display: "none", opacity: 0}, "+=1")
            .to(logo, {display: "flex", duration: 2, width: 100, opacity: 1, x: screenWidth , y: screenHeight, xPercent:"-150", yPercent:"-50"}, "+=1")
            .delay(1)
            .set(logoName, {display: "flex", opacity: 1}, "+=1")
            .delay(3)
            .set(logo, {duration, opacity: 1, x: screenWidth , y: screenHeight}, "+=1")
            .delay(1)
            .set(logoName, {display: "flex", opacity: 1}, "+=1")
            .fromTo(logo, {opacity: 1, x: screenWidth , y: screenHeight}, {duration: 2, x: 0 , y:0, xPercent:"0", yPercent:"0"}, "+=1")
        })
    }else{ 
        $visited = true
        logo.style.opacity = "1;"
    }
</script>

<Router>
    <nav>
        <div bind:this={logo} class="logo">
            <picture>

            </picture>
            <p bind:this={logoName}>KNOX</p>
        </div>
        <div>
            <Link to="/">Main</Link>
            <Link to="market">Market</Link>
            {#if !$user}
                <Link to="login">Login</Link>
                <Link to="register">Register</Link>
            {:else}
                <Link to="account">Account</Link>
            {/if}
            <Link to="chatrooms">Chatrooms</Link>
        </div>
    </nav>
    <Route path="/" component={Main}/>    
    <Route path="market" component={Market}/>
    <Route path="login" component={Login}/>
    <Route path="register" component={Register}/>    
    <PrivateRoute path="account">
        <Account/>
    </PrivateRoute>   
    <Route path="chatrooms" component={Chatrooms}/>
    <Route path="unauthorized" component={AccessDenied}/>    
</Router>

<style>
    nav{
        display: flex;
        height: 150px;
        width: 100%;
        margin-left: auto;
        align-items: center;
    }

    .logo{
        display: flex;
        position: absolute;
        height: 50px;
        width: 120px;
        margin-left: 100px;
        background: rgba(5,100,50,.5);
        opacity: 0;
    }

    p{
        display: flex;
    }

    picture{
        display: flex;
        height: 40px;
        width: 40px;
        background: rgba(50,100,10,.5);
        border-radius: 50px;
    }

    div{
        display: flex;
        height: 100%;
        width: 50%;
        margin-left: auto;
        background: rgba(100,50,10,.5);
        align-items: center;
        justify-content: space-evenly;
    }
</style>