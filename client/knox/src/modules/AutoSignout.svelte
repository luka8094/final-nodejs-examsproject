<script context="module">
    import {useNavigate, useLocation} from "svelte-navigator"
    const navigate = useNavigate()
    const location = useLocation()
    
    export function autoSignout(){
        setTimeout(async ()=>{
            const valid = await fetch("/api/token")

            if(!valid) navigate("/",{replace: true})
        },(5 * 60 * 1000))
    }
</script>