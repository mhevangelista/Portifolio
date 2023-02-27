const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#street");
const cityInput = document.querySelector("#city");
const neighboordhoodInput = document.querySelector("#nheiborhood");
const regionIput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");

closeButton = document.querySelector("#close-message");

cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/
    const key = String.fromCharCode(e.keyCode);

    if(!onlyNumbers.test(key)){
        e.preventDefault();
        return;
    }
    
});

