<script>
    import {onDestroy} from "svelte"
    import {milestones} from "../../../../stores/systemd"
    import MilestonesLine from "./milestones/MilestonesLine.svelte"
    /*
    let milestonesArray = []

    const unsubscribe = milestones.subscribe( milestones => {
        console.log(milestones, milestonesArray)
        milestonesArray = milestones
        console.log(milestonesArray)
    })

    onDestroy(unsubscribe)
    let milestonesArray
    $: milestonesArray = [...$milestones]
    */

    console.log($milestones)
</script>

<div id="milestones-container">
    <h2>Milestones overview</h2>
    <article>
        In this section you can get an overview of the milestones you've achieved during your activity on KNOX.
    </article>
    {#each $milestones as milestone}
        <MilestonesLine 
        milestoneTitle={milestone.name} 
        milestoneDescription={milestone.description} 
        currentMark={milestone.currentValue}
        goal={milestone.goalValue}
        />
    {/each}
</div>

<style>
    #milestones-container{
        display: flex;
        flex-direction: column;
        height: 550px;
        padding-left: 20px;
        background: rgba(255,255,255,.5);
        overflow-y: scroll;
    }

    h2{
        border-bottom: solid 1px black;
        width: 50%;
        margin-bottom: 20px;
        padding-bottom: 10px;
    }

    article{
        color: grey;
        word-break: break-word;
        width: 300px;
        margin-bottom: 20px;
        font-size: 20px;
    }
</style>