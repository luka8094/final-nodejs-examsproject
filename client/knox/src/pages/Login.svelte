<script>
    //Background animation inspired by source: https://redstapler.co/css-animated-gradient-background/
    import LoginForm from "../components/account/LoginForm.svelte"
    import Background from "../components/account/Background.svelte"
</script>

<section>
    <LoginForm />
    <Background />
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
</style>