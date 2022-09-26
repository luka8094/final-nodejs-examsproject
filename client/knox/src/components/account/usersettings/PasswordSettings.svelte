<script>
    let currentPassword, newPassword

    const changePassword = () =>{
        console.log("clicked change password button.")
    }
</script>

<div>
    <p>Change your password</p>
    <form>
        <label for="current">Current password:</label>
        <input bind:value={currentPassword} type="text" name="current"/>
        <label for="new">New password:</label>
        <input bind:value={newPassword} type="text" name="new"/>
        <button on:click={changePassword}></button>
    </form>
</div>

<style>
    div{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 200px;
        background: rgba(255,255,255,.5);
    }  

    form{
        display: flex;
        flex-direction: column;
    }
</style>