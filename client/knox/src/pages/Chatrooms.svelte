<script>
    import ChatroomLinkBox from "../components/chatrooms/ChatroomLinkBox.svelte"

    let testElements = [1,2,3,4,5,6,7,8,9,10]
</script>
<section>
    <h1>Chatrooms</h1>
    <div id="chatrooms-overview-container">
        {#each testElements as element, i}
            <ChatroomLinkBox number={i} />
        {/each}
    </div>
</section>

<style>
    section{
        display:grid;
        height: fit-content;
        width: 100%;
        background: rgba(100,50,100,.5);
        padding-top: var(--menu-padding);
        align-items: center;
        justify-content: center;
    }

    h1{
        display: flex;
        border-bottom: double 2px black;
    }

    #chatrooms-overview-container{
        display: grid;
        height: fit-content;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(5, 200px);
    }

    @media screen and (max-width: 1000px){
        #chatrooms-overview-container{
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media screen and (max-width: 500px){
        #chatrooms-overview-container{
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>