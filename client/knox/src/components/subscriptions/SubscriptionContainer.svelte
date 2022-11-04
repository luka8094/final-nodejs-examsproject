<script>
    import {createEventDispatcher} from "svelte"
    import {useNavigate} from "svelte-navigator"
    export let image, rank, name, marketCap, price, volume, supply
</script>

<div id="subscription-container">
    <div id="coin-data">
        <img src={image} alt={name}/>
        <div id="coin-data-row">
            <thead>
                <td>Rank</td>
                <td>Name</td>
                <td>Market cap</td>
                <td>Price</td>
                <td>Volume</td>
                <td>Supply</td>
            </thead>
            <tbody>
                <td>{rank}</td>
                <td>{name}</td>
                <td>{marketCap}</td>
                <td>{price}</td>
                <td>{volume}</td>
                <td>{supply}</td>
            </tbody>
        </div>
    </div>
</div>

<style>
    #subscription-container{
        display: flex;
        height: 60px;
        width: 100%;
        margin: 10px 0;
        padding: 5px;
        border-radius: 25px;
        box-shadow: 1px 1px 20px 1px grey;
    }

    img{
        object-fit: contain;
        width: 50px;
        border-radius: 50px;
    }

    #coin-data{
        display: flex;
        height: inherit;
        width: 100%;
    }

    #coin-data-row{
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: auto;
    }

    thead,
    tbody{
        display: flex;  
        width: 100%;  
    }
    
    thead{
        font-weight: 700;
    }

    tbody{
        margin-top: 5px;
    }

    td{
        width: 100px;
        margin: auto;
    }
</style>