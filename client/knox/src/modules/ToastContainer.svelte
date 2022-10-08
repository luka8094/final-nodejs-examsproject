<script context="module">
    import {fade} from "svelte/transition"
    let toastContainer
    let toastMessage
    const options = ["white","tomato","lightgren"]

    export function toast(message, option){
        toastMessage.innerText = message

        toastContainer.style.backgroundColor = options[option]
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
    <div id="toast-button-container">
        <button on:click={hideToast}>
            <div class="line line-one"></div>
            <div class="line line-two"></div>
        </button>
    </div>
    <span bind:this={toastMessage}></span>
</div>

<style>
    #toast-container{
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 60px;
        width: fit-content;
        padding: 10px;
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

    /*

    TODO: 3D flipping toaster
    #inner-toast-container{
        display: flex;
        position: relative;
        height: 100%;
        width: 100%;
        transform-style: preserve-3d;
    }
    #inner-toast-container-front,
    #inner-toast-container-back{
        height: 100%;
        width: 100%;
        transition: all 1s ease-in-out;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    #inner-toast-container-back{
        background: grey;
        transform: rotateY(180deg);
    }*/

    span{
        display: flex;
        position: relative;
        height: fit-content;
        width: 100%;
        background: transparent;
    }

    #toast-button-container{
        width: 20px;
        height: 20px;
        margin-left: auto;
    }

    button{
        display: flex;
        position: relative;
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
        top: 5%;
    }

    .line-two{
        transform: rotate(-45deg);
        top: 5%;
        right: 45%;
        outline: 1.5 solid lightgrey;
    }
</style>