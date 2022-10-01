<script>
    let description

    function saveProfile(){
        console.log("Clicked on 'save profile' button.")
    }
</script>
<div>
    <h2>profile settings</h2>
    <article>
        In this section you can edit your profile settings.
    </article>
    <textarea bind:value={description}></textarea>
    <button on:click={saveProfile}>save</button>
</div>

<style>
    div{
        display: flex;
        flex-direction: column;
        width: 100%;
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

    article{
        color: grey;
        word-break: break-word;
        width: 300px;
        margin-bottom: 20px;
        padding-bottom: 10px;
        font-size: 20px;
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