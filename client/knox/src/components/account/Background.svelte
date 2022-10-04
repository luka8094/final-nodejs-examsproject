<script>

</script>

<div id="login-background">
    <div id="layer"></div>
    <div id="layer"></div>
    <div id="layer"></div>
    <div id="layer"></div>
    <div id="layer"></div>
    <div id="layer"></div>
</div>

<style>
    #login-background{
        display: flex;
        position: absolute;
        height: 100%;
        width: 100%;
        background: rgba(255,255,255,.5);
        z-index: -5;
        overflow: hidden;
    }

    #layer{
        display: flex;
        position: absolute;
        height: 1500px;
        width: 500px;
        opacity: 0.3;
        transform: rotate(-60deg);
        left: 10%;
        top: 20%;
        background: linear-gradient(90deg, white, white, white, darkgrey, black);
    }

    #login-background #layer:nth-child(1){
        left: -300px;
        top: -100px;
        z-index: 10;
        transform: rotate(-45deg);
    }

    #login-background #layer:nth-child(2){
        top: 50px;
        left: -265px;
        z-index: 9;
        transform: rotate(-75deg);
    }

    #login-background #layer:nth-child(3){
        z-index: 10;
        left: 435px;
        transform: rotate(-70deg);
        height: 2000px;
    }

    #login-background #layer:nth-child(4){
        z-index: 8;
        top: 88px;
        left: 728px;
        transform: rotate(-102deg);
        height: 1700px;
    }

    #login-background #layer:nth-child(5){
        z-index: 9;
        transform: rotate(-129deg);
        left: 1150px;
        top: 10px;
    }

    #login-background #layer:nth-child(6){
        top: -603px;
        left: 1393px;
        transform: rotate(-156deg);
    }
</style>