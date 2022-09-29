//Inspired by source: https://www.youtube.com/watch?v=kkuZTAMyAFI

function customToast(element){
    console.log("Toaster function called.")
    let toaster

    function instantiateToast({
        message,
        backgroundColor = '#efefef',
        color = '000000',
        duration = '2500ms'
    }){
        toaster.insertAdjacentHTML('beforeend', 
        `<p class="toast 
        style="background-color: ${backgroundColor};
        color: ${color}; animation-duration:${duration};">
        ${message}
        </p>`)
    }

    ;(function initToast(){
        document.body.insertAdjacentHTML('afterbegin',
        `<div bind:this{toaster} id="toast-container"></div>`)
    })()

    if(element !== undefined){
        element.onclick = () => {
        instantiateToast({
            message: 'Toast test',
            backgroundColor: 'hsl(171 100% 46.1%)',
            color: 'hsl(171 100% 46.1%)',
            duration: '5000ms'
            })
        }
    }
}

export default customToast