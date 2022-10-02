<script>
    import {setCookie} from "svelte-cookie"
    let cookieConsent
    let accept = false

    function acceptCookies(){
        setCookie("_kc", true)
        cookieConsent.style.display = "none"
    }
</script>

<div bind:this={cookieConsent} id="cookie-banner-underlay">
    <div id="cookie-banner-container">
        <p id="agreement-clause">Using this website you're consenting to the privacy and cookie policy detailed in the TOS provided by KNOX</p>
        <div id="statement-container">
            <p id="agreement-statement">I accept the terms and conditions of KNOX</p>
            <input type="checkbox" bind:checked={accept}>
            <button on:click={acceptCookies} disabled={!accept}>
                accept
            </button>
        </div>
    </div>
</div>

<style>
    #cookie-banner-underlay{
        display: flex;
        position: fixed;
        height: -webkit-fill-available;
        background: rgba(0,0,0,.5);
        height: 100%;
        width: 100%;
        z-index: 100;
    }

    #cookie-banner-container{
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 100px;
        width: 100%;
        padding-left: 10px;
        background: lightgrey;
        bottom: 0;
        justify-content: center;
        align-items: center;
    }

    #agreement-clause{
        width: 100%;
        margin-bottom: auto;
    }

    #statement-container{
        display: flex;
        width: 450px;
        align-items: baseline;
        margin-right: auto;
    }

    #agreement-statement{
        text-decoration: underline;
        font-weight: 600;
    }

    input{
        margin: 0 10px;
    }
</style>