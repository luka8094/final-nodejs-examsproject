<script>
    //Progression bar line iteration inspired by source: https://www.eternaldev.com/blog/5-ways-to-perform-for-loop-in-svelte-each-block/
    import {milestones} from "../../../../../stores/systemd"
    export let milestoneTitle, milestoneDescription, currentMark, goal
</script>

<article>
    <h1>Milestone: {milestoneTitle}</h1>
    <p>{milestoneDescription}</p>
    <div id="progression-data-container">
        <div id="progress-line">
            {#each Array(currentMark) as _, index(index)}
                <div id="bar" style="width: {100 / goal}%;"></div>
            {/each}
        </div>
        <p>{currentMark} / {goal}</p>
        <p>{currentMark >= goal ? "unlocked!" : ""}
    </div>
</article>

<style>
    article{
        height: fit-content;
        width: 750px;
        border: dashed .5px black;
        align-items: center;
        margin-bottom: 5px;
        padding: 5px 0;
    }

    article h1, 
    article p{
        margin: 5px 0;
    }

    #progression-data-container{
        display: flex;
        height: 30px;
        width: 100%;
        background: rgba(200,200,100,.5);
        align-items: center;
    }

    #progression-data-container p{
        width: 100px;
        text-align: center;
    }

    #progress-line{
        display: flex;
        height: 10px;
        width: 100%;
        background: rgba(255,255,255,.5);
        align-items: center;
    }

    #bar{
        display: flex;
        height: 10px;
        background: green;
    }
</style>