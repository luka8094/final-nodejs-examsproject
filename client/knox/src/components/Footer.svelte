<section>
    Footer
    <div id="footer-container">
        <aside></aside>
        <aside></aside>
        <aside></aside>
    </div>
    <div id="socials">

    </div>
    <div id="signature">

    </div>
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: 100%;
        background: rgba(10,10,10,.5);
        padding: 10px 0;
    }

    #footer-container{
        display: flex;
        height: 300px;
        width: calc(100% - 200px);
        margin: 0 auto;
        justify-content: space-evenly;
    }

    #footer-container *{
        display: flex;
        flex-direction: column;
        height: 250px;
        width: 200px;
        border-top: solid 2px black;
        border-bottom: solid 2px black;
    }

    #socials{
        display: flex;
        height: 60px;
        width: 100%;    
        background: rgba(50,50,10,.5);
    }

    #signature{
        display: flex;
        height: 20px;
        width: 100%;
        background: rgba(20,30,40,.5);
    }
</style>