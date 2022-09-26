<script>
    let currentPassword, newPassword, errorMessage

    const changePassword = async () =>{
        const result = await fetch("/api/change",{method: 'PATCH'})
        console.log("clicked change password button.")
        if(!currentPassword||!newPassword) return errorMessage = "Fields can not be empty"
        console.log(currentPassword, newPassword)
    }
</script>

<div>
    <p>Change your password</p>
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
        margin-left: 10px;
        padding-left: 10px;
        background: rgba(255,255,255,.5);
    }  

    form{
        display: flex;
        flex-direction: column;
        width: 200px;
    }

    button{
        display: flex;
        width: 100px;
    }

    #error-message{
        color: red;
    }
</style>