/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /

let isComma = false;

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner

    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        addDigit(digit)

    } else { // Inte en siffertangent, övriga tangenter.
        switch (btn) {
            case 'add':
                setOperator("+");
                break;
            case 'sub':
                setOperator("-")
                break;

            case 'mul':
                setOperator("x")
                break;

            case 'div':
                setOperator("/")
                break;

            case 'comma':
                addComma()
                break;

            case 'enter':
                calculate()
                break;
            case 'clear':
                memClear();
                break;
            default:
                break;
        }
    }
}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    lcd.value += digit
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    if (!isComma) {
        lcd.value += "."
    }
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator) {
    arithmetic = operator;
    if(isNumeric(lcd.value)) {
        memory = parseFloat(lcd.value);
        console.log(memory)
        clearLCD();
    } 
}
function isNumeric(str) {
    if (typeof str != "string") return false // för att bara processera strings
    return !isNaN(str) && 
           !isNaN(parseFloat(str))
  }
/**
 * Beräknar ovh visar resultatet på displayen.
 */
function calculate() {
    let result = 0
    console.log(memory);
    
    switch (arithmetic) {
        case '+':
            result = (memory) + parseFloat(lcd.value);

            break;
        case '-':
            result = (memory) - parseFloat(lcd.value);
            break;
        case 'x':
            result = (memory) * parseFloat(lcd.value);
            break;
        case '/':
            result = (memory) / parseFloat(lcd.value);
            break;
    }

    console.log(result);
    lcd.value = result
}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
    isComma = false;
}

/** Rensar allt, reset */
function memClear() {
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;
