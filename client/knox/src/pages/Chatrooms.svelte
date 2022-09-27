<section>
    Chatrooms
    <div id="chatrooms-overview-container">

    </div>
</section>

<style>
    section{
        display:flex;
        height: 100vh;
        width: 100%;
        background: rgba(100,50,100,.5);
        padding-top: var(--menu-padding);
        align-items: center;
        justify-content: center;
    }

    #chatrooms-overview-container{
        display: grid;
        height: fit-content;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(10, 120px);
    }
</style>