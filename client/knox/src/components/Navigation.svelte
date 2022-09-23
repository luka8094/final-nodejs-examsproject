<script>
    import {Router, Link, Route} from 'svelte-navigator'
    import Main from '../pages/Main.svelte'
    import Account from '../pages/Account.svelte'
    import Chatrooms from '../pages/Chatrooms.svelte'
    import Market from '../pages/Market.svelte'
    import PrivateRoute from './authorization/PrivateRoute.svelte'
</script>

<Router>
    <nav>
        <Link to="/">Main</Link>
        <Link to="market">Market</Link>
        <Link to="account">Account</Link>
        <Link to="chatrooms">Chatrooms</Link>
    </nav>
    <Route path="/" component={Main}/>    
    <Route path="market" component={Market}/>    
    <PrivateRoute path="account" component={Account}/>    
    <Route path="chatrooms" component={Chatrooms}/>    
</Router>


<style>

</style>