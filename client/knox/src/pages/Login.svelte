<script>
    import LoginForm from "../components/account/LoginForm.svelte"
</script>

<section>
    <LoginForm/>
    <div>
        Wave
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

    div{
        display: flex;
        position: absolute;
        height: 100%;
        width: 100%;
        background: rgba(0,0,0,.03);
        z-index: -10;
        -webkit-clip-path: polygon(1% 48%, 8% 36%, 17% 28%, 26% 28%, 33% 33%, 40% 44%, 46% 52%, 51% 57%, 58% 60%, 62% 61%, 68% 59%, 72% 57%, 76% 53%, 81% 48%, 86% 45%, 90% 44%, 95% 46%, 99% 49%, 100% 52%, 100% 100%, 0% 100%, 0% 52%);
        clip-path: polygon(1% 48%, 8% 36%, 17% 28%, 26% 28%, 33% 33%, 40% 44%, 46% 52%, 51% 57%, 58% 60%, 62% 61%, 68% 59%, 72% 57%, 76% 53%, 81% 48%, 86% 45%, 90% 44%, 95% 46%, 99% 49%, 100% 52%, 100% 100%, 0% 100%, 0% 52%);
    }

    @keyframes wave{
        0%{

        }
        100%{

        }
    }
</style>