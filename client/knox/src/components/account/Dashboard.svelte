<script>
    import {rootPrivilege} from "../../../stores/systemd"
    import Adminsettings from "./usersettings/Adminsettings.svelte"
    import PasswordSettings from "./usersettings/PasswordSettings.svelte"

    export let username, logout
    let choice
    $rootPrivilege = false

    function optionButton(e){
        choice = e.target.id
    }
</script>

<div id="dashboard-container">
    <div id="dashboard-container-title">
        <h1>KNOX account</h1><span>Welcome back {username}</span>
    </div>
    <div id="dashboard-user-panel">
        <aside id="user-options">
            <button id="profile" on:click={optionButton}>Profile</button>
            <button id="milestones" on:click={optionButton}>Milestones</button>
            <button id="transactions" on:click={optionButton}>Transactions</button>
            <button id="password" on:click={optionButton}>Password</button>
        {#if $rootPrivilege}
            <button id="adminstrate" on:click={optionButton}>Administrate</button>
        {/if}
        </aside>
        <aside id="user-settings">
            {#if choice === 'profile'}
                <p>profile settings</p>
            {:else if choice === 'milestones'}
                <p>milestones overview</p>
            {:else if choice === 'transactions'}
                <p>transaction history</p>
            {:else if choice === 'password'}
                <PasswordSettings username={username}/>
            {:else if choice === 'administrate' && $rootPrivilege}
                <Adminsettings/>
            {/if}
        </aside>
    </div>
    <button id="logout" on:click={logout}>Log out</button>
</div>



<style>
    h1{
        font-family: 'Saira Stencil One';
        color: black;
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