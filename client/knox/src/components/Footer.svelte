<script>
    import {Router, Route, Link} from "svelte-navigator"
    import Login from '../pages/Login.svelte'
    import Register from '../pages/Register.svelte'
</script>

<section>
    <div id="footer-container">
        <aside>
            <h2>Contact</h2>
            <ul>
                <li><p>City street 1234</p></li>
                <li><p>10 flr.</p></li>
                <li><p>Postbox 1234</p></li>
                <li><p>Copenhagen</p></li>
            </ul>
        </aside>
    </div>
    <div id="socials">
    </div>
    <div id="signature">
    </div>
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: 100%;
        background: black;
        padding: 10px 0;
    }

    #footer-container{
        display: flex;
        height: 300px;
        width: calc(100% - 450px);
        margin: 0 auto;
        padding-top: 50px;
        justify-content: space-evenly;
    }

    #footer-container > aside{
        display: flex;
        flex-direction: column;
        min-height: 250px;
        height: fit-content;
        width: 300px;
        margin-left: 10px;
        border-top: solid 2px white;
        border-bottom: solid 2px white;
        color: white;
    }

    #footer-container > aside:first-child{
        margin-left: auto;
    }

    aside{
        display: flex;
        align-items: flex-end;
    }

    ul{
        list-style: none;
    }

    #socials{
        display: flex;
        height: 60px;
        width: 100%;    
        background: black;
    }

    #signature{
        display: flex;
        height: 20px;
        width: 100%;
        background: black;
    }

    @media screen and (max-width: 1000px){
        #footer-container{
            width: calc(100% - 200px);
        }
    }
</style>