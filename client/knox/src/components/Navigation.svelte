<script>
    import gsap from "gsap/dist/gsap"
    import {onMount, onDestroy} from "svelte"
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
    import LoginForm from "./account/LoginForm.svelte";

    let navigationBar, logo, logoName, logoImage, menuOverlay
    let screenWidth = window.innerWidth / 2
    let screenHeight = window.innerHeight / 2

    onMount(() => {     
        if(!$visited){
            const timeline = gsap.timeline()
            const duration = 1
            timeline
            .set(navigationBar, {position:"absolute"}, "+=1")
            .set(logo, {display: "none", width: 0, alpha: "0", x: screenWidth , y: screenHeight, xPercent:"-150", yPercent:"-50", zIndex: 10}, "+=1")
            .set(logoName, {display: "none", width: 0, fontSize: "2em", opacity: 0}, "+=1")
            .to(logo, {display: "flex", duration: 2, width: 100, opacity: 1, x: screenWidth , y: screenHeight, xPercent:"-150", yPercent:"-50"}, "+=1")
            .delay(1)
            .to(logoImage, {duration, marginRight: "auto"}, "+=1")
            .to(logo, {duration, width: "200px"}, "+=1")
            .to(logoName, {duration: 1.5, display: "flex", width: "100%", alpha: "1"}, "+=1")
            .set(logo, {duration, opacity: 1, x: screenWidth , y: screenHeight}, "+=1")
            .delay(1)
            .fromTo(logo, {opacity: 1, fontSize: "2em", x: screenWidth , y: screenHeight}, {duration: 2, fontSize: "8px", x: 0 , y:0, xPercent:"0", yPercent:"0"}, "+=1")
            .delay(1)
            .add('overlay')
            .to(menuOverlay, {duration, opacity: 0}, "+=1", 'overlay')
            .to(menuOverlay, {display: "none", zIndex: "-10"}, "+=1", 'overlay')
            .to(navigationBar, {position: "fixed"}, "+=1", 'overlay')
        }
        return () => { 
            visited.set(true)
        }
    })
    
</script>

<Router>
    <nav bind:this={navigationBar}>
        <div bind:this={logo} class="logo">
            <a href="/">
                <picture bind:this={logoImage}>

                </picture>
            </a>
            <p bind:this={logoName}>KNOX</p>
        </div>
        <div id="menu-container">
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
    <div bind:this={menuOverlay} id="menu-overlay">
            
    </div>
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
        height: 50px;
        width: 100%;
        margin-left: auto;
        align-items: center;
        background: white;
    }

    a{
        justify-content: center;
        align-items: center;
        display: flex;
        height: 100%;
        margin: 10px;
    }

    .logo{
        display: none;
        position: absolute;
        height: 50px;
        width: 120px;
        margin-left: 100px;
        background: rgba(5,100,50,.5);
        opacity: 0;
        align-items: center;
    }

    p{
        display: none;
        opacity: 0;
    }

    picture{
        display: flex;
        height: 40px;
        width: 40px;
        margin: 0 10px;
        background: rgba(50,100,10,.5);
        border-radius: 50px;
    }

    #menu-container{
        display: flex;
        height: 100%;
        width: 50%;
        margin-left: auto;
        background: rgba(100,50,10,.5);
        align-items: center;
        justify-content: space-evenly;
    }

    #menu-overlay{
        display: flex;
        position: absolute;
        height: 100%;
        width: 100%;
        background: white;
    }
</style>