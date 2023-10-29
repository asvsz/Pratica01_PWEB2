//Variáveis
let currentInput = document.querySelector('.currentInput');
let answerScreen = document.querySelector('.answerScreen');
let buttons = document.querySelectorAll('button');
let erasebtn = document.querySelector('#erase');
let clearbtn = document.querySelector('#clear');
let evaluate = document.querySelector('#evaluate');
let historyBtn = document.querySelector('#historyBtn'); 

let realTimeScreenValue = [];
let expressionHistory = [];

//Função Limpar a Tela
clearbtn.addEventListener("click", () => {
    realTimeScreenValue = [''];
    answerScreen.innerHTML = 0;
    currentInput.className = 'currentInput';
    answerScreen.className = 'answerScreen';
    answerScreen.style.color = "rgba(150, 150, 150, 0.87)";
});

// Função para atualizar e exibir o histórico
function updateHistory() {
    expressionHistory.push(`${expression} = ${result}`);
}

//Função para calcular a expressão, substitui o eval
function calculateExpression(expression) {
    try {
        const fn = new Function(`return ${expression}`);
        return fn();
    } catch (error) {
        return undefined;
    }
}

//Eventos
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (!btn.id.match('erase')) {
            realTimeScreenValue.push(btn.value);
            currentInput.innerHTML = realTimeScreenValue.join('');

            if (btn.classList.contains('num_btn')) {
                answerScreen.innerHTML = calculateExpression(realTimeScreenValue.join(''));
            }
        }
        if (btn.id.match('erase')) {
            realTimeScreenValue.pop();
            currentInput.innerHTML = realTimeScreenValue.join('');
            answerScreen.innerHTML = calculateExpression(realTimeScreenValue.join(''));
        }
        if (btn.id.match('evaluate')) {
            currentInput.className = 'answerScreen';
            answerScreen.className = 'currentInput';
            answerScreen.style.color = 'white';
            expression = realTimeScreenValue.join('');
            result = calculateExpression(expression);
            updateHistory(expression, result);
        }

        if (btn.id.match('historyBtn')) {
            if (expressionHistory.length > 0) {
                window.alert("Histórico:\n" + expressionHistory.join('\n'));
            } else {
                window.alert("Histórico vazio.");
            }
        }
        if (typeof calculateExpression(realTimeScreenValue.join('')) == 'undefined') {
            answerScreen.innerHTML = 0;
        }
    });
});
