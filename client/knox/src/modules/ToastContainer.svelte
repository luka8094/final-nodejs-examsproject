<script context="module">
    import {fade} from "svelte/transition"
    let toastContainer
    let toastMessage

    export function toast(message){
        toastMessage.innerText = message

        toastContainer.style.opacity = 1
        toastContainer.style.bottom = "50px"
        toastContainer.style.transform = "rotateY(360deg)"

        setTimeout(()=>{
            toastContainer.style.opacity = 0
            toastContainer.style.bottom = "-100px"  
            toastContainer.style.transform = "rotateY(180deg)"
        }, 3000)
    }

    function hideToast(){
        console.log("clicked hide toast button.")
        toastContainer.style.bottom = "-100px"
    }
</script>

<div bind:this={toastContainer} id="toast-container" in:fade out:fade>
    <button on:click={hideToast}>
        <div class="line line-one"></div>
        <div class="line line-two"></div>
    </button>
    <span bind:this={toastMessage}></span>
</div>

<style>
    span{
        display: flex;
        position: relative;
        height: fit-content;
        width: 100%;
        background: rgba(255,255,255,.5);
    }

    #toast-container{
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 60px;
        width: fit-content;
        padding: 10px;
        background: rgba(255,255,255,1);
        border-radius: 0 0 0 15px;
        bottom: -100px;
        right: 50px;
        transition: all .5s ease-in-out;
        overflow: hidden;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: 700;
        transform: rotateY(180);
        box-shadow: 1px 3px 10px 1px;
    }

    button{
        display: flex;
        height: 20px;
        width: 20px;
        margin-left: auto;
        background: lightgrey;
        border-radius: 50px;
    }

    .line{
        display: flex;
        position: absolute;
        height: 15px;
        width: 1px;
        background: black;
    }

    .line-one{
        transform: rotate(45deg);
        top: 18%;
        right: 11%;
    }

    .line-two{
        transform: rotate(-45deg);
        top: 18%;
        right: 11%;
        outline: 1.5 solid lightgrey;
    }
</style>