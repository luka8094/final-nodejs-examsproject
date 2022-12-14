<script>
    import gsap from "gsap/dist/gsap"
    import {onMount} from "svelte"
    import {Router, Link, Route, createHistory, createMemorySource} from 'svelte-navigator'
    import PrivateRoute from './authorization/PrivateRoute.svelte'
    import {user, visited} from "../../stores/systemd"
    import Main from '../pages/Main.svelte'
    import Account from '../pages/Account.svelte'
    import Subscriptions from '../pages/Subscriptions.svelte'
    import Chatroom from '../pages/Chatroom.svelte'
    import Chatrooms from '../pages/Chatrooms.svelte'
    import Login from '../pages/Login.svelte'
    import Register from '../pages/Register.svelte'
    import AccessDenied from './authorization/AccessDenied.svelte'
    import Success from '../pages/Success.svelte'

    const history = createHistory(createMemorySource())

    let navigationBar, logo, logoName, logoImage, menuOverlay
    let menuMain, menuService, menuLogin, menuRegister, menuChatrooms

    let screenWidth = window.innerWidth / 2
    let screenHeight = window.innerHeight / 2
    
    onMount(() => {     
        if(!$visited){

            const timeline = gsap.timeline()
            const duration = 1
            
            timeline
            .set("body", {overflow: "hidden"})
            .set(navigationBar, {position: "absolute", boxShadow: "0"})
            .set(menuOverlay, {height: "100%"})
            .set(menuMain, {top: "-100%"})
            .set(menuService, {top: "-100%"})
            .set(menuLogin, {top: "-100%"})
            .set(menuRegister, {top: "-100%"})
            .set(menuChatrooms, {top: "-100%"})
            .set(logoImage, {height: "3.5em", width: "3.5em"})
            .set(logo, {display: "none", width: 0, alpha: "0", x: screenWidth , y: screenHeight, xPercent:"-50", yPercent:"-50", zIndex: 10}, "+=1")
            .set(logoName, {display: "none", width: 0, fontSize: "1.8em", opacity: 0}, "+=1")
            .to(logo, {display: "flex", duration: 2, width: 150, height: 75, opacity: 1, x: screenWidth , y: screenHeight, xPercent:"-100", yPercent:"-50"}, "+=1")
            .delay(1)
            .to(logoImage, {duration, height: "40px", width: "40px", marginRight: "auto"}, "+=1")
            .to(logo, {duration, width: "200px"}, "+=1")
            .to(logoName, {duration: 1.5, display: "flex", width: "100%", lineHeight: "15px", alpha: "1", ease: "power2.easeIn"}, "+=1")
            .set(logo, {duration, opacity: 1, x: screenWidth , y: screenHeight}, "+=1")
            .delay(1)
            .fromTo(logo, {opacity: 1, fontSize: "2em", x: screenWidth , y: screenHeight}, {duration: 2, height: 60, fontSize: "1.2em", x: 0 , y:0, xPercent:"0", yPercent:"0"}, "+=1")
            .add('overlay')
            .to(menuOverlay, {duration: .5, opacity: 0}, "+=1", 'overlay')
            .to(menuOverlay, {display: "none", zIndex: "5"}, "+=1", 'overlay')
            .to(navigationBar, {duration: .5, position: "fixed", zIndex: 10, boxShadow: "1px 1px 5px 1px"}, "+=1.2", 'overlay')
            .add('menu-rollout', 5)
            .to(menuMain, {duration: 1, top: "0%", ease: "power2.easeOut", delay: 1}, "-=.970", 'menu-rollout')
            .to(menuService, {duration: 1, top: "0%", ease: "power2.easeOut", delay: .9}, "-=.975", 'menu-rollout')
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
                    <img src="images/knox-logo-8.svg" alt="knox logo"/>
                </picture>
            </a>
            <p bind:this={logoName}>KNOX</p>
        </div>
        <div id="menu-container-general">
            <div class="menu-element" bind:this={menuMain}>
                <Link to="/">Main</Link>
            </div>
        </div>
        <div id="menu-container-account">
            {#if !$user}
                <div class="menu-element" bind:this={menuRegister}>
                    <Link customBinding={menuRegister} to="register">Register</Link>
                </div>
                <div class="menu-element" bind:this={menuLogin} id="login-reference">
                    <Link customBinding={menuLogin} to="login">Log in</Link>
                </div>
            {:else}
                <div class="sub-menu-element">
                    <Link to="account">Account<span class="dropdown-menu-indicator"></span></Link>
                    <div class="sub-menu-content">
                        <div>
                            <Link to="subscriptions">Subscriptions</Link>
                        </div>
                        <div>
                            <Link to="chatrooms">Chatrooms</Link>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </nav>
    <div bind:this={menuOverlay} id="menu-overlay">
            
    </div>
    <Route path="/" component={Main}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>    
    <PrivateRoute path="/account">
        <Account/>
    </PrivateRoute>
    <PrivateRoute path="/chatrooms/*">
        <PrivateRoute path="/">
            <Chatrooms/>
        </PrivateRoute>
        <PrivateRoute path=":id" let:params>
            <Chatroom id={params.id}/>   
        </PrivateRoute>
    </PrivateRoute>
    <PrivateRoute path="/subscriptions">
        <Subscriptions/>
    </PrivateRoute>
    <Route path="/unauthorized" component={AccessDenied}/>
    <Route path="/success" component={Success}/>    
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
        transition: color .5s ease-in;
    }

    .logo{
        display: none;
        position: absolute;
        height: 50px;
        width: 120px;
        margin-left: 100px;
        background: transparent;
        opacity: 0;
        align-items: center;
    }

    p{
        display: none;
        opacity: 0;
        align-self: center;
        font-family: "November Stencil Pro Blk";
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

    #menu-container-general{
        display: flex;
        height: 100%;
        width: 310px;
        margin: 0 50px 0 300px;
        align-items: center;
        justify-content: space-evenly;
    }

    #menu-container-general div:last-child{
        margin-right: auto;
    }

    #menu-container-account{
        display: flex;
        height: 100%;
        width: 200px;
        margin: 0 100px 0 auto;
        justify-content: space-around;
        align-items: center;
    }

    #menu-container-general::before{
        content: '';
        height: 30px;
        width: 1.5px;
        margin-right: 20px;
        background: black;
    }

    .menu-element{
        display: flex;
        position: relative;
        height: 20px;
        margin: 0 15px;
        width: fit-content;
    }

    .menu-element:hover{
        border-bottom: solid 1px black;
    }

    .sub-menu-element{
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    .dropdown-menu-indicator{
        display: flex;
        border-left: solid 5px transparent;
        border-right: solid 5px transparent;
        border-top: solid 10px black;
        margin: 6px 0 auto 10px;
    }

    .sub-menu-element:hover .sub-menu-content{
        display: flex;
        align-items: center;
        justify-content: end;
    }

    .sub-menu-content{
        display: none;
        position: absolute;
        height: 35px;
        width: 100%;
        left: 0;
        top: 60px;
        background-color: white;
        box-shadow: inset 0px 5px 15px -11px;
    }

    .sub-menu-content div:hover{
        border-bottom: solid 1px black;
    }

    .sub-menu-content *{
        margin: 10px;
    }

    .sub-menu-content:hover{
        display: flex;
    }

    .sub-menu-content div:last-child{
        margin-right: 100px;
    }

    #login-reference{
        display: flex;
        width: 70px;
        height: 30px;
        color: white;
        border-radius: 50px;
        align-items: center;
        justify-content: center;
        background: lightgrey;
        transition: background .5s ease-in;
    }

    #login-reference:hover{
        background: rgba(100,100,100,.2);
    }

    #menu-overlay{
        display: flex;
        position: fixed;
        height: 100%;
        width: 100%;
        background: rgba(255, 255, 255, 1);
    }
</style>