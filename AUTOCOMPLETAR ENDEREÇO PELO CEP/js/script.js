const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#street");
const cityInput = document.querySelector("#city");
const neighboordhoodInput = document.querySelector("#nheiborhood");
const regionIput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");
const fadeElement = document.querySelector("#fade");
const loaderElement = document.querySelector("#loader");
closeButton = document.querySelector("#close-message");

cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/
    const key = String.fromCharCode(e.keyCode);

    if (!onlyNumbers.test(key)){
        e.preventDefault();
        return;
    }
});

// Get address event 
cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;

    //Check if we have the correct legth
    if (inputValue.length === 8){
        getAddress(inputValue);
    }
    
});

// Get customer Address From API

const getAddress = async (cep) => {
    toggleLoader();
    cepInput.blur();

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

    const respose = await fetch(apiUrl)

    const data = await respose.json()

    if(data.erro === "true"){
        addressForm.reset()
        
        toggleMensage("CEP Invalido tente Novamente")
        return; 
    }

};

const toggleLoader = () => {

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide")
}

const toggleMensage = (msg) => {

    const messageElement = document.querySelector("#message")

    const messageElementText = document.querySelector("#message p")

    messageElementText.innerText = msg;

    fadeElement.classList.toggle("hide")
    messageElement.classList.toggle("hide")
}