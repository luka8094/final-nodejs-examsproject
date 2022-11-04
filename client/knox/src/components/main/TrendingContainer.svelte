<script>
    export let position, name, price, symbol, image, marketRank
</script>

<div id="trending-coin-container">
    <div id="coin-data-container">
        <p>No. {position += 1}.</p>
        <img src={image} alt={name}>
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Market price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{marketRank}</td> 
                    <td>{name}</td> 
                    <td>{symbol}</td> 
                    <td id="coin-price">{price}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<style>
    #trending-coin-container{
        display: flex;
        flex-direction: column;
        height: 50px;
        width: calc(100% - 60px);
        background: white;
        border-radius: 20px;
        padding: 5px;
        margin: 10px auto;
        box-shadow: 0px 0px 11px 0px lightgrey;
    }

    #coin-data-container{
        display: flex;
        width: 100%;
    }

    img{
        height: 50px;
        object-fit: contain;
        margin: 0 20px;
        border-radius: 50px;
    }

    p{
        width: 60px;
        margin-left: 20px;
    }

    table{
        display: flex;
        flex-direction: column;
        width: 100%;
        border-spacing: 35px 0;
    }

    thead,
    tbody{
        display: flex;
        width: 100%;
    }

    tr{
        display: flex;
        width: 100%;
        justify-content: flex-start;
    }

    th, 
    td{
        width: 150px;
        text-align: left;
    }

    #coin-price{
        text-overflow: ellipsis;
    }
</style>