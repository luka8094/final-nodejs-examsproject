//Inspired by source: https://www.youtube.com/watch?v=kkuZTAMyAFI

function customToast(element, message, backgroundColor, color, duration){
    console.log("Toaster function called.")

    function instantiateToast({
        message,
        backgroundColor = '#efefef',
        color = '#000000',
        duration = '2500ms'
    }){
        return 
        `<p class="toast 
        style="background-color: ${backgroundColor};
        color: ${color}; animation-duration:${duration};">
        ${message}
        </p>`
    }

    const toaster = instantiateToast({message, backgroundColor, color, duration})
    element
}

export default customToast