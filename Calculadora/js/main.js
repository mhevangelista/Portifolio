const PreviousOperationText = document.querySelector("#previous-operation")
const CurrentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator{
    constructor(PreviousOperationText, CurrentOperationText){
        this.PreviousOperationText = PreviousOperationText;
        this.CurrentOperationText = CurrentOperationText;
        this.CurrentOperation = "";
    };

    // add digit to calculator screen
    addDigital(digit){
        if(digit === "." && this.CurrentOperationText.innerText.includes(".")){
            return;
        }
        this.CurrentOperation = digit;
        this.updateScreen()
    };


    processOperation(operation){
        
        // Checando se o current esta vazio
        if(this.CurrentOperationText.innerText === "" && operation !== "C"){
            if(this.PreviousOperationText.innerText !== ""){
                this.changeoperation(operation)
            }
            return
        }

        let operationValue;
        const current = +this.CurrentOperationText.innerText;
        const previous = +this.PreviousOperationText.innerText.split(" ")[0];

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperator();
                break;
            case "C":
                this.processClearOperator();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;         
        };
    }
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ){
        if (operation === null){
        this.CurrentOperationText.innerText += this.CurrentOperation;
        }else{
            if( previous === 0 ){
                operationValue = current
            }
            this.PreviousOperationText.innerText = `${operationValue} ${operation}`;
            this.CurrentOperationText.innerText = "";
        }
    }
    changeoperation(operation){
        const mathOperations = ["*", "/", "+", "-"]
        if(!mathOperations.includes(operation)){
            return
        }
        this.PreviousOperationText.innerText = this.PreviousOperationText.innerText.slice(0, -1) + operation
    }
        // Delete a digit
    processDelOperator() {
        this.CurrentOperationText.innerText = this.CurrentOperationText.innerText.slice(0, -1)
    }
    

    // Clear current operation
    processClearCurrentOperator() {
        this.CurrentOperationText.innerText = "";
    }

    // Clear all operations
    processClearOperator() {
        this.CurrentOperationText.innerText = "";
        this.PreviousOperationText.innerText = "";
    }

    // Process an operation
    processEqualOperator() {
        let operation = this.PreviousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
  }
}


const calc = new Calculator(PreviousOperationText, CurrentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || +value === "."){
            calc.addDigital(value)
        }else{
            calc.processOperation(value)
        }

    })    
});