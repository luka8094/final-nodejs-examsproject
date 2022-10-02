<script>
    import {account} from "../../../../stores/systemd"
    let description
    let email = $account.email+""
    console.log(email)

    function saveProfile(){
        console.log("Clicked on 'save profile' button.")
    }
</script>
<div>
    <h2>Profile settings</h2>
    <article id="account-overview">
        In this section you have a brief oveview of your account details.
        <p>name: {$account.name}</p>
        <p>email: ********@</p>
    </article>
    <article id="account-description">
        Add an optional profile description to your account and user profile.
    </article>
    <textarea bind:value={description}></textarea>
    <button on:click={saveProfile}>save</button>
</div>

<style>
    div{
        display: flex;
        flex-direction: column;
        height: 100%;
        padding-left: 20px;
        background: rgba(255,255,255,.5);
    }

    h2{
        border-bottom: solid 1px black;
        width: 50%;
        margin-bottom: 20px;
        padding-bottom: 10px;
    }

    #account-overview,
    #account-description{
        color: grey;
        word-break: break-word;
        width: 300px;
        margin-bottom: 20px;
        padding-bottom: 10px;
        font-size: 20px;
    }

    textarea{
        max-width: 400px;
        min-width: 300px;
        display: flex;
        min-height: 100px;
        max-height: 150px;
    }

    button{
        width: 50px;
    }
</style>