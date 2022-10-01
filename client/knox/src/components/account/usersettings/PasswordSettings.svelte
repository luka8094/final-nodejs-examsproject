<script>
    export let username
    let currentPassword, newPassword, errorMessage


    const changePassword = async () =>{
        const result = await fetch("/api/password",{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                current: currentPassword,
                changed: newPassword
            })
        })
        console.log("clicked change password button.")
        if(!currentPassword||!newPassword) return errorMessage = "Fields can not be empty"
        console.log(currentPassword, newPassword)
    }
</script>

<div>
    <h2>Password change</h2>
    <article>
        In this section you can change your password to whatever you prefer whenever you like.
    </article>
    <form>
        <label for="current">Current password:</label>
        <input bind:value={currentPassword} type="text" name="current"/>
        <label for="new">New password:</label>
        <input bind:value={newPassword} type="text" name="new"/>
        <button type="button" on:click|preventDefault={changePassword}>confirm</button>
    </form>
    <p id="error-message">{errorMessage === undefined ? "": errorMessage}</p>
</div>

<style>
    div{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        padding-left: 20px;
        background: rgba(255,255,255,.5);
    }

    h2{
        border-bottom: solid 1px black;
        width: 50%;
        margin-bottom: 20px;
        padding-bottom: 10px;
    }
    
    article{
        color: grey;
        word-break: break-word;
        width: 300px;
        margin-bottom: 20px;
        font-size: 20px;
    }

    form{
        display: flex;
        flex-direction: column;
        width: 200px;
    }

    button{
        display: flex;
        width: 100px;
        justify-content: center;
    }

    #error-message{
        color: red;
    }
</style>