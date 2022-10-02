<script context="module">
    let toastContainer, toastMessage

    export function toast(message){
        toastMessage = message
        toastContainer.style.backgound = "rgba(255,255,255,1)"
        toastContainer.style.right = "100px"
        setTimeout(()=>{
            toastContainer.style.backgound = "rgba(255,255,255,0)"
            toastContainer.style.right = "-200px"
        }, 5000)
    }
</script>

<div bind:this={toastContainer} id="toast-container">
    <div bind:innerHTML={toastMessage} contenteditable="true">
    </div>
</div>

<style>
    [contenteditable]{
        display: flex;
        height: 100px;
        width: 100%;
        background: rgba(50,50,50,.5);
    }

    #toast-container{
        display: flex;
        position: fixed;
        height: 70px;
        width: 150px;
        background: rgba(255,255,255,0);
        opacity: 0;
        border: solid 1px black;
        border-radius: 15px 0;
        bottom: 50px;
        right: -200px;
        transition: right background 1s ease-in;
    }
</style>