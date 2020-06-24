const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const signChangeButton = document.querySelector('[data-sign-change]');


class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);

    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return ;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return ;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return ;

        if(curr === 0 && this.operation === '/'){
            alert('Cannot divide by zero');
            return ;
        }

        switch(this.operation){
            case '+': 
                computation = prev + curr;
                break;
            
            case '-': 
                computation = prev - curr;
                break;

            case '*': 
                computation = prev * curr;
                break;

            case '/': 
                computation = prev / curr;
                break;

            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''

    }

    changeSign(){
        let changeResult;
        const curr = parseFloat(this.currentOperand);
        this.currentOperand = curr * -1;
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;

        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand}${this.operation}`;
        }

        else{
            this.previousOperandTextElement.innerText = '';
        }

    }

}

const calc = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
    })
});

operationsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText);
        calc.updateDisplay();
    })
});

equalsButton.addEventListener('click', () => {
        calc.compute();
        calc.updateDisplay();
});

clearButton.addEventListener('click', () => {
        calc.clear();
        calc.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calc.delete();
    calc.updateDisplay();
});

signChangeButton.addEventListener('click', () => {
    calc.changeSign();
    calc.updateDisplay();
})