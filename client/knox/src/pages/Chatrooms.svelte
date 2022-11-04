<script>
    import {onMount} from "svelte"
    import {Wave} from "svelte-loading-spinners"
    import {coinsList} from "../../stores/systemd"
    import ChatroomLinkBox from "../components/chatrooms/ChatroomLinkBox.svelte"

    let awaiting = false

    onMount(async () => {
        const result = await fetch("/api/coins")
        const {data} = await result.json()
        $coinsList = data.list.slice(0,20)
        awaiting = true
    })
</script>

<section>
    {#if !awaiting}
        <div id="chatrooms-loading">
            <Wave size="50" unit="px" color="#d3d0cf" duration="1s" />
        </div>
    {:else}
        <h1>Chatrooms</h1>
        <div id="chatrooms-overview-container">  
        {#each $coinsList as coin}
            <ChatroomLinkBox coinName={coin.id} coin={coin}/>
        {/each}
        </div>
    {/if}
</section>

<style>
    section{
        display:grid;
        height: fit-content;
        width: 100%;
        background: white;
        padding-top: calc(var(--menu-padding) + 50px);
        align-items: center;
        justify-content: center;
    }

    h1{
        display: flex;
        border-bottom: double 2px black;
    }

    #chatrooms-loading{
        display: flex;
        height: 100vh;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    #chatrooms-overview-container{
        display: grid;
        height: fit-content;
        grid-template-columns: repeat(2, 1fr);
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