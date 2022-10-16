<script>
    import {rootPrivilege} from "../../../stores/systemd"
    import ProfileSettings from "./usersettings/ProfileSettings.svelte"
    import MilestonesOverview from "./usersettings/MilestonesOverview.svelte"
    import TransactionsOverview from "./usersettings/TransactionsOverview.svelte"
    import PasswordSettings from "./usersettings/PasswordSettings.svelte"
    import VisualModeSettings from "./usersettings/VisualModeSettings.svelte"
    import LanguageSettings from "./usersettings/LanguageSettings.svelte"
    import Adminsettings from "./usersettings/Adminsettings.svelte"

    export let username, logout
    let choice = ProfileSettings

    //TODO: IMPORTANT|WARNING - THIS REQUIRES A MORE ROBUST CONTROL VERIFICATION/VALIDATION THAN JUST SETTING 'TRUE' OR 'FALSE'
    $rootPrivilege = true
</script>

<div id="dashboard-container">
    <div id="dashboard-container-title">
        <div id="dashboard-title">
            <h1>ACCOUNT</h1>
        </div><span>Welcome back <b>{username}</b></span>
    </div>
    <div id="dashboard-user-panel">
        <aside id="user-options">
            <button on:click={() => (choice = ProfileSettings)}>Profile</button>
            <button on:click={() => (choice = MilestonesOverview)}>Milestones</button>
            <button on:click={() => (choice = TransactionsOverview)}>Transactions</button>
            <button on:click={() => (choice = PasswordSettings)}>Password</button>
            <button on:click={() => (choice = LanguageSettings)}>Language</button>
            <button on:click={() => (choice = VisualModeSettings)}>Visual mode</button>
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
        margin-bottom: 25px;
        padding-left: 15px;
    }

    h1{
        display: flex;
        margin: 10px 0;
        align-self: center;
        color: black;
    }

    span{
        font-family: sans-serif;
        font-weight: 500;
        color: black;
        padding-left: 15px;
    }

    #dashboard-container{
        display: flex;
        flex-direction: column;
        min-height: 700px;
        width: 1100px;
        background: white;
        margin: 0 auto 10px;
        box-shadow: 1px 1px 11px 1px;
    }

    #dashboard-container-title{
        padding-bottom: 20px;
        border-bottom: solid 1px black;
    }

    #dashboard-user-panel{
        display: flex;
        margin-left: 10px;
        background: white;
    }

    #user-options{
        display: flex;
        flex-direction: column;
        flex-flow: column;
        height: 550px;
        width: 200px;
        background: white;
    }

    #user-settings{
        width: 100%;
        background: rgba(0,0,0,.1);
        overflow: hidden;
    }

    button{
        display: flex;
        height: 50px;
        background: white;
        border: none;
        border-radius: 0;
        transition: all .9s ease-in;
        align-items: flex-end;
    }

    button:hover {
        border-right: solid 1px black;
    }

    #logout{
        display: flex;
        width: 100px;
        background: #f6f6f6;
        color: tomato;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 0;
        margin: 10px 0 10px 10px;
        transition: background-color 1s ease-in;
    }

    #logout:hover{
        background: lightgrey;
    }
</style>