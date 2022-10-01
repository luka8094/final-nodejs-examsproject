<script context="module">
    let toaster
    let toastContainer

    export function toast(message){
        toaster = message
        console.log(message)
        toastContainer.style.right = "-100px"
    }
</script>

<div bind:this={toastContainer} id="toast-container">
    {toaster}
</div>

<style>
    #toast-container{
        display: flex;
        position: fixed;
        height: 70px;
        width: 150px;
        background: rgba(220,210,10,.5);
        bottom: 50px;
        right: 10px;
        transition: right 3s ease-in;
    }
</style>