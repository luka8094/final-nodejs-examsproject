<script>
    //Background animation inspired by source: https://redstapler.co/css-animated-gradient-background/
    import LoginForm from "../components/account/LoginForm.svelte"
</script>

<section>
    <LoginForm/>
    <div id="background-layer-two">
        Wave
    </div>
    <div id="background-layer-one">

    </div>
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        height: 90vh;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    #background-layer-two{
        display: flex;
        position: absolute;
        height: 100%;
        width: 100%;
        background: linear-gradient(45deg, #e7ecda, #daebe1, #e5e9ec, #c2c4c5, #c4c2c4, #c4c2c4);
        background-size: 500% 100%;
        animation: wave 5s linear infinite;
        animation-direction: alternate;
        z-index: -10;
        -webkit-clip-path: polygon(1% 48%, 8% 36%, 17% 28%, 26% 28%, 33% 33%, 40% 44%, 46% 52%, 51% 57%, 58% 60%, 62% 61%, 68% 59%, 72% 57%, 76% 53%, 81% 48%, 86% 45%, 90% 44%, 95% 46%, 99% 49%, 100% 52%, 100% 100%, 0% 100%, 0% 52%);
        clip-path: polygon(1% 48%, 8% 36%, 17% 28%, 26% 28%, 33% 33%, 40% 44%, 46% 52%, 51% 57%, 58% 60%, 62% 61%, 68% 59%, 72% 57%, 76% 53%, 81% 48%, 86% 45%, 90% 44%, 95% 46%, 99% 49%, 100% 52%, 100% 100%, 0% 100%, 0% 52%);
    }

    #background-layer-one{
        display: flex;
        position: absolute;
        height: 350px;
        width: 100%;
        background: linear-gradient(180deg, transparent, white);
        bottom: 0;
        z-index: -5;
    }

    @keyframes wave{
        0%{
            background-position: 0%;
        }
        100%{
            background-position: 100%;
        }   
    }
</style>