<script>
    import {rootPrivilege} from "../../../stores/systemd"
    import Adminsettings from "./usersettings/Adminsettings.svelte"
    import PasswordSettings from "./usersettings/PasswordSettings.svelte"

    export let username, choice
    $rootPrivilege = true

    function optionButton(e){
        choice = e.target.id
    }
</script>

<div id="dashboard-container">
    <div id="dashboard-container-title">
        <h1>Dashboard</h1><span>Welcome {username}</span>
    </div>
    <div id="dashboard-user-panel">
        <aside id="user-options">
            <button id="profile" on:click={optionButton}>Profile</button>
            <button id="milestones" on:click={optionButton}>Milestones</button>
            <button id="transactions" on:click={optionButton}>Transactions</button>
            <button id="password" on:click={optionButton}>Password</button>
        </aside>
        <aside id="user-settings">
            {#if choice === 'profile'}
                <p>profile settings</p>
            {:else if choice === 'milestones'}
                <p>milestones overview</p>
            {:else if choice === 'transactions'}
                <p>transaction history</p>
            {:else if choice === 'password'}
                <PasswordSettings/>
            {/if}
        </aside>
    </div>
</div>

{#if rootPrivilege}
    <Adminsettings/>
{/if}

<style>
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
    }

    button{
        display: flex;
        height: 50px;
    }
</style>