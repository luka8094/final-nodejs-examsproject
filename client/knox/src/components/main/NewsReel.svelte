<script>
    import {onMount} from "svelte"
    import NewsBlock from "./NewsBlock.svelte"

    let news = []

    onMount(async() =>{
        const result = await fetch("/api/coins/news")
        const {data} = await result.json()
        news = data.Data.slice(0,10)
    })
</script>

<section>
    <h1>Latest Cryptocurrency news</h1>
    <div>
        {#each news as newsblock}
            <NewsBlock
                image={newsblock.imageurl}
                headline={newsblock.title}
                textbody={newsblock.body}
                link={newsblock.url}
            />
        {/each}
    </div>
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        position: relative;
        height: 500px;
        width: 100%;
        background: white;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        z-index: -10;
    }

    h1{
        margin: 0 auto 0 50px;
        height: 25%;
    }

    div{
        display: flex;
        position: relative;
        height: 75%;
        width: fit-content;
        z-index: 1;
        animation: newsreel 20s linear infinite;
    }

    section:hover{
        z-index: 10;
    }

    section:hover > div{
        z-index: 0;
    }

    div:hover{
        animation-play-state: paused;
    }

    @keyframes newsreel
    {
        0%{
            left: 0%;
        }
        100%{
            left: 100%;
        }
    }
</style>