<script>
    import {Router, Link, Route} from 'svelte-navigator'
    import {user} from "../../stores/systemd"
    import Main from '../pages/Main.svelte'
    import Account from '../pages/Account.svelte'
    import Chatrooms from '../pages/Chatrooms.svelte'
    import Login from '../pages/Login.svelte'
    import Register from '../pages/Register.svelte'
    import Market from '../pages/Market.svelte'
    import PrivateRoute from './authorization/PrivateRoute.svelte'
</script>

<Router>
    <nav>
        <picture>

        </picture>
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
</Router>

<style>
    nav{
        display: flex;
        height: 150px;
        width: 100%;
        margin-left: auto;
        align-items: center;
    }

    picture{
        display: flex;
        height: 50px;
        width: 50px;
        margin-left: 10px;
        background: cadetblue;
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