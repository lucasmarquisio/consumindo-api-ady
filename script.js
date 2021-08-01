const convertBtn = document.querySelector('.convert-button');
const URL_input = document.querySelector('.URL-input');
const mp3 = document.querySelector('#mp3')
const body_mp3 = document.querySelector('#flex-screen label')
const isUrlYoutube = /youtu/

mp3.addEventListener('change', ()=>{
    mp3.checked == true ? body_mp3.style.backgroundColor = "#2828d5" : body_mp3.style.backgroundColor = "#808080"
   
})

function message(message, url, messageTime, color){
    const alertMessage = document.querySelector("#message")
    atualizationStatus(color, messageTime)
    alertMessage.innerHTML = `${message}`
    if(url){
        window.location.href = `${url}`
    }
    setTimeout(() => { alertMessage.innerHTML = ``}, Number(messageTime) );
}

function atualizationStatus(color, messageTime){
    const messageStatusStyle = document.querySelector('.status-style')
    messageStatusStyle.classList.toggle('status')
    messageStatusStyle.style.backgroundColor = `${color}`
    setTimeout(() => { messageStatusStyle.style.backgroundColor = "initial"}, messageTime);
}

function sendURL(URL) {
    if(URL_input.value == '' || URL_input.value == ' ') return message('Digite uma url', false, 2000, '#ff000061')
    if(!isUrlYoutube.test(URL_input.value)) return message('Url Invalida, verifique e tente novamente.', false, 3000, '#ff000061')

    message("Preparando download...", false, 2000, '#bdbdfe')
    
    axios.get(`http://localhost:3001/download?URL=${URL}&MP3=${mp3.checked}`)
            .then(data => {
            
                message("Baixando, aguarde...", data.config.url, 2200, '#0080004f') 
                setTimeout(() => { URL_input.value = ""}, 4000); 
            })
            .catch(e =>  message("Video não encontrado!", false, 2000, '#ff000061') )
}

convertBtn.addEventListener('click', () => {
    sendURL(URL_input.value);
});