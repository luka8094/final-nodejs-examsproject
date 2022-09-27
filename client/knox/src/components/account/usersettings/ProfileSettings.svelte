<script>
    let description

    function saveProfile(){
        console.log("Clicked on 'save profile' button.")
    }
</script>
<div>
    <p>profile settings</p>
    <textarea bind:value={description}></textarea>
    <button on:click={saveProfile}>save</button>
</div>

<style>
    div{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: rgba(30,30,30,.5);
        padding-left: 10px;
    }

    textarea{
        width: 400px;
        display: flex;
        height: 120px;
    }

    button{
        width: 50px;
    }
</style>