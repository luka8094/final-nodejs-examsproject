//inspired by source(s): 
// https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield

async function introduction(atom, text){
    console.log("introduction called")
    function sleepTimer(milliseconds){
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    function* scrambler(){
        let welcomeString = text
        let message
        for(let i = 0; i <= welcomeString.length; i++){
            let randomString = size => [...Array(size)].map( () => Math.floor(Math.random() * 16).toString(16)).join('')
            message = welcomeString.substring(0,i)+randomString((welcomeString.length-i))
            yield message
        }
    }
    
    const titleScrambler = scrambler()

    for(let i = 0; i < 16; i++){
        await sleepTimer(150)
        atom = titleScrambler.next().value
    }
}

export default introduction