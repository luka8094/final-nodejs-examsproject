<script>
    import {rootPrivilege} from "../../../stores/systemd"
    import ProfileSettings from "./usersettings/ProfileSettings.svelte"
    import MilestonesOverview from "./usersettings/MilestonesOverview.svelte"
    import TransactionsOverview from "./usersettings/TransactionsOverview.svelte"
    import PasswordSettings from "./usersettings/PasswordSettings.svelte"
    import Adminsettings from "./usersettings/Adminsettings.svelte"

    export let username, logout
    let choice = ProfileSettings

    $rootPrivilege = false
</script>

<div id="dashboard-container">
    <div id="dashboard-container-title">
        <div id="dashboard-title">
            <img src="./images/knox-logo-8.svg" alt=""/>
            <h1>ACCOUNT</h1>
        </div><span>Welcome back {username}</span>
    </div>
    <div id="dashboard-user-panel">
        <aside id="user-options">
            <button on:click={() => (choice = ProfileSettings)}>Profile</button>
            <button on:click={() => (choice = MilestonesOverview)}>Milestones</button>
            <button on:click={() => (choice = TransactionsOverview)}>Transactions</button>
            <button on:click={() => (choice = PasswordSettings)}>Password</button>
        {#if $rootPrivilege}
            <button on:click={() => (choice = Adminsettings)}>Administrate</button>
        {/if}
        </aside>
        <aside id="user-settings">
            <svelte:component this={choice}/>
        </aside>
    </div>
    <button id="logout" on:click={logout}>Log out</button>
</div>

<style>
    #dashboard-title{
        display: flex;
        width: 150px;
        align-items: center;
    }

    img{
        height: 50px;
    }


    h1{
        font-family: 'Saira Stencil One';
        color: black;
        margin: auto 0 auto auto;
        align-self: center;
    }

    span{
        font-family: sans-serif;
        font-weight: 500;
        color: black;
    }

    #dashboard-container{
        display: flex;
        flex-direction: column;
        min-height: 700px;
        width: 900px;
        background: rgba(100,150,50,.5);
        margin: 0 auto 100px;
    }

    #dashboard-container-title{
        margin: 10px;
    }

    #dashboard-user-panel{
        display: flex;
        margin-left: 10px;
        background: rgba(10,20,30,.5);
    }

    #user-options{
        display: flex;
        flex-direction: column;
        flex-flow: column;
        height: 500px;
        width: 200px;
        background: rgba(10,20,30,.5);
    }

    #user-settings{
        width: 100%;
        background: rgba(200,100,100,.5);
        overflow: hidden;
    }

    button{
        display: flex;
        height: 50px;
    }

    #logout{
        display: flex;
        width: 100px;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 0;
        margin: auto 0 auto 10px;
    }
</style>