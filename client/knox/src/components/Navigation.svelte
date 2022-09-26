<script>
    import gsap from "gsap/dist/gsap"
    import {onMount} from "svelte"
    import {Router, Link, Route, createHistory, createMemorySource} from 'svelte-navigator'
    import PrivateRoute from './authorization/PrivateRoute.svelte'
    import {user, visited} from "../../stores/systemd"
    import Main from '../pages/Main.svelte'
    import Account from '../pages/Account.svelte'
    import Chatrooms from '../pages/Chatrooms.svelte'
    import Login from '../pages/Login.svelte'
    import Register from '../pages/Register.svelte'
    import Market from '../pages/Market.svelte'
    import AccessDenied from './authorization/AccessDenied.svelte'
    import Success from '../pages/Success.svelte'

    const history = createHistory(createMemorySource())

    let navigationBar, logo, logoName, logoImage, menuOverlay
    let menuMain, menuMarket, menuLogin, menuRegister, menuChatrooms

    let screenWidth = window.innerWidth / 2
    let screenHeight = window.innerHeight / 2

    onMount(() => {     
        if(!$visited){
            window.scroll(0,0)

            const timeline = gsap.timeline()
            const duration = 1
            
            timeline
            .set("body", {overflow: "hidden"})
            .set(navigationBar, {position: "absolute", boxShadow: "0"})
            .set(menuOverlay, {height: "100%"})
            .set(menuMain, {top: "-100%"})
            .set(menuMarket, {top: "-100%"})
            .set(menuLogin, {top: "-100%"})
            .set(menuRegister, {top: "-100%"})
            .set(menuChatrooms, {top: "-100%"})
            .set(logoImage, {height: "3.5em", width: "3.5em"})
            .set(logo, {display: "none", width: 0, alpha: "0", x: screenWidth , y: screenHeight, xPercent:"-50", yPercent:"-50", zIndex: 10}, "+=1")
            .set(logoName, {display: "none", width: 0, fontSize: "1.8em", opacity: 0}, "+=1")
            .to(logo, {display: "flex", duration: 2, width: 150, height: 75, opacity: 1, x: screenWidth , y: screenHeight, xPercent:"-100", yPercent:"-50"}, "+=1")
            .delay(1)
            .to(logoImage, {duration, height: "55px", width: "55px", marginRight: "auto"}, "+=1")
            .to(logo, {duration, width: "200px"}, "+=1")
            .to(logoName, {duration: 1.5, display: "flex", width: "100%", lineHeight: "15px", alpha: "1", ease: "power2.easeIn"}, "+=1")
            .set(logo, {duration, opacity: 1, x: screenWidth , y: screenHeight}, "+=1")
            .delay(1)
            .fromTo(logo, {opacity: 1, fontSize: "2em", x: screenWidth , y: screenHeight}, {duration: 2, height: 60, fontSize: "1.2em", x: 0 , y:0, xPercent:"0", yPercent:"0"}, "+=1")
            .add('overlay')
            .to(menuOverlay, {duration: .5, opacity: 0}, "+=1", 'overlay')
            .to(menuOverlay, {display: "none", zIndex: "1"}, "+=1", 'overlay')
            .to(navigationBar, {duration: .5, position: "fixed", boxShadow: "1px 1px 5px 1px"}, "+=1.2", 'overlay')
            .add('menu-rollout', 5)
            .to(menuMain, {duration: 1, top: "0%", ease: "power2.easeOut", delay: 1}, "-=.970", 'menu-rollout')
            .to(menuMarket, {duration: 1, top: "0%", ease: "power2.easeOut", delay: .9}, "-=.975", 'menu-rollout')
            .to(menuLogin, {duration: 1, top: "0%", ease: "power2.easeOut", delay: .7}, "-=.95", 'menu-rollout')
            .to(menuRegister, {duration: 1, top: "0%", ease: "power2.easeOut", delay: .5}, "-=.925", 'menu-rollout')
            .to(menuChatrooms, {duration: 1, top: "0%", ease: "power2.easeOut", delay: .3},"-=.9", 'menu-rollout')
            .set("body",{overflow:"visible"})
        }
        return () => { 
            localStorage.setItem('_visited', true)
        }
    })
    
</script>

<Router history={history}>
    <nav bind:this={navigationBar}>
        <div bind:this={logo} class="logo">
            <a href="/">
                <picture bind:this={logoImage}>
                    <img src="images/knox-logo-2.svg" alt="knox logo"/>
                </picture>
            </a>
            <p bind:this={logoName}>KNOX</p>
        </div>
        <div id="menu-container">
            <div class="menu-element" bind:this={menuMain}>
                <Link to="/">Main</Link>
            </div>
            <div class="menu-element" bind:this={menuMarket}>
                <Link customBinding={menuMarket} to="market">Market</Link>
            </div>
            {#if !$user}
                <div class="menu-element" bind:this={menuLogin}>
                    <Link customBinding={menuLogin} to="login">Log in</Link>
                </div>
                <div class="menu-element" bind:this={menuRegister}>
                    <Link customBinding={menuRegister} to="register">Register</Link>
                </div>
            {:else}
                <Link to="account">Account</Link>
            {/if}
            <div class="menu-element" bind:this={menuChatrooms}>
                <Link customBinding={menuChatrooms} to="chatrooms">Chatrooms</Link>
            </div>
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
    <Route path="success" component={Success}/>
    <Route path="unauthorized" component={AccessDenied}/>    
</Router>

<style>
    nav{
        display: flex;
        height: 60px;
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
        align-self: center;
        font-family: "Saira Stencil One";
        color: black;
    }

    picture{
        display: flex;
        height: 45px;
        width: 45px;
        margin: 0 10px;
        background: transparent;
        border-radius: 50px;
    }

    #menu-container{
        display: flex;
        height: 100%;
        width: 50%;
        margin: 0 50px 0 auto;
        background: rgba(100,50,10,.5);
        align-items: center;
        justify-content: space-evenly;
    }

    .menu-element{
        display: flex;
        position: relative;
        height: 20px;
        width: fit-content;
    }

    #menu-overlay{
        display: flex;
        position: fixed;
        height: 100%;
        width: 100%;
        background: white;
    }
</style>