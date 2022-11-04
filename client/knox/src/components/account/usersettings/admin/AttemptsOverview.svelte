<script>
    export let email, password, ipVFour, ipVSix, date
</script>

<div>
    <h3>Attempted at: {date}</h3>
    <p>Email: {email}</p>
    <p>password: {password}</p>
    <p>IPv4 address: {ipVFour}</p>
    <p>IPv6 address: {ipVSix}</p>
</div>

<style>
    div{
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: 100%;
        background: rgba(100,100,100,.1);
        margin: 10px;
        padding: 10px 0;
        box-shadow: 1px 1px 5px 1px lightgrey;
    }

    h3, p{
        margin: 0;
        margin-left: 15px;
    }
</style>