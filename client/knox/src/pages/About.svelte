<script>
    import Footer from "../components/Footer.svelte"
</script>

<section>
    <div id="about-image-container">
    </div>
    <h1>About</h1>
</section>
<Footer />

<style>
    section{
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
        padding-top: var(--menu-padding);
        background: rgba(200,100,0,.5);
    }

    #about-image-container{
        display: flex;
        flex-direction: column;
        height: 600px;
        width: 100%;
        background: rgba(100,100,10,.5);
    }

    h1{
        display: flex;
        width: 100%;
        margin: 0 0 0 20px;
    }
</style>