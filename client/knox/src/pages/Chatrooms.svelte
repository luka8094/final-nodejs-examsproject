<script>
    import ChatroomLinkBox from "../components/chatrooms/ChatroomLinkBox.svelte"

    let elements = [1,2,3,4,5,6,7,8,9,10]
</script>
<section>
    Chatrooms
    <div id="chatrooms-overview-container">
        {#each elements as element, i}
            <ChatroomLinkBox number={i} />
        {/each}
    </div>
</section>

<style>
    section{
        display:grid;
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