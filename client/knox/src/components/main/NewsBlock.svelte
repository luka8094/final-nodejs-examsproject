<script>
    export let image, headline, link, textbody
</script>

<article>
    <img src={image} alt={headline}>
    <div id="inner-news-container">
        <h5>{headline}</h5>
        <p>{textbody}</p>
        <a href={link}>read more</a>
    </div>
</article>

<style>
    article{
        display: flex;
        height: 200px;
        width: 500px;
        background: white;
        box-shadow: 1px 1px 10px 1px lightgrey;
        margin: 0 15px;
    }

    img{
        object-fit: contain;
        width: 150px;
        padding-left: 10px;
    }

    #inner-news-container{
        display: flex;
        flex-direction: column;
        width: 300px;
        padding: 0 10px;
    }

    p{
        display: -webkit-box;
        white-space: nowrap;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    a{
        height: 50px;
    }
</style>
