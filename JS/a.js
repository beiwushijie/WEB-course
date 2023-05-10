function infixToPostfix(infixToPostfix) {

    const tokens = infixToPostfix.match(/\d+|\+|\-|\*|\/|\(|\)|sin|cos|tan|!|%|\^|\.|N|e|log|π/g);
    const operatorPriority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '%': 3,
        'sin': 3,
        'cos': 3,
        'tan': 3,
        'log': 4,
        '^': 5,
        '!': 6
    };
    //定义函数列表，这里包括sin，cos和tan函数，区别一下运算符，因为这个是只需要一个运算就ok
    const functionList = ['sin', 'cos', 'tan'];
    var postfixExpression = "";
    const operatorStack = [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (!isNaN(parseFloat(token)) || token === "." || token === 'N') {
            // 如果是数字，小数点，这个N是我定义的负号，用来区别-，则直接添加到后缀表达式中
            postfixExpression += token;
        } else if (token === 'π') {

            postfixExpression += parseFloat("3.1415926");
        } else if (token === 'e') {

            postfixExpression += parseFloat("2.71828182846");
        }
        else if (functionList.includes(token)) {
            // 如果是函数，则压入栈中
            operatorStack.push(token)
        } else if (token === '(') {
            // 如果是左括号则压入栈中
            operatorStack.push(token);
        } else if (token === ')') {
            // 如果是右括号则把运算符弹出，加入到后缀表达式，直到遇到左括号
            while (operatorStack[operatorStack.length - 1] !== '(') {
                // postfixExpression.push(operatorStack.pop());
                postfixExpression += operatorStack.pop();
            }
            operatorStack.pop()
        } else if (Object.keys(operatorPriority).includes(token)) {
            // 如果是运算符，则判断与栈顶运算符的优先级
            postfixExpression += " ";
            while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(' && operatorPriority[token] <= operatorPriority[operatorStack[operatorStack.length - 1]]) {
                postfixExpression += operatorStack.pop();
                postfixExpression += " ";

            }
            operatorStack.push(token);
            postfixExpression += " ";
        }

    }
    // 把栈中剩余的运算符弹出，添加到后缀表达式中
    while (operatorStack.length) {

        postfixExpression += " ";
        postfixExpression += operatorStack.pop();

    }

    return postfixExpression;

}

function calculate(postfixExpression) {
    var temp = postfixExpression.replace(/\s+/g, " ");
    var tokens = temp.split(" ");
    const operandStack = [];
    const functionList = ['sin', 'cos', 'tan'];
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (!isNaN(parseFloat(token))) {
            // 如果是数字则压入操作数栈
            operandStack.push(parseFloat(token));
        } else if (token[0] === 'N') {
            token.replace(/N/, "-");
            operandStack.push(parseFloat(token.replace(/N/, "-")));
        }
        else {
            // 如果是运算符，则将对应的操作数出栈，执行相应的运算
            let rightOperand = operandStack.pop();
            let leftOperand = null;
            if (token !== '!' && !(functionList.includes(token))) {
                // 阶乘运算符只需要右操作数
                leftOperand = operandStack.pop();
            }
            switch (token) {
                case '+':
                    operandStack.push(leftOperand + rightOperand);
                    break;
                case '-':
                    operandStack.push(leftOperand - rightOperand);
                    break;
                case '*':
                    operandStack.push(leftOperand * rightOperand);
                    break;
                case '/':
                    operandStack.push(leftOperand / rightOperand);
                    break;
                case 'sin':
                    operandStack.push(Math.sin(rightOperand));
                    break;
                case 'cos':
                    operandStack.push(Math.cos(rightOperand));
                    break;
                case 'tan':
                    operandStack.push(Math.tan(rightOperand));
                    break;
                case '^':
                    operandStack.push(Math.pow(leftOperand, rightOperand));
                    break;
                case 'log':
                    operandStack.push(Math.log(leftOperand) / Math.log(rightOperand));
                    break;
                case '%':
                    operandStack.push(leftOperand % rightOperand);
                    break;
                case '!':
                    let res = 1;
                    for (let i = 1; i <= rightOperand; i++) {
                        res *= i;
                    }
                    operandStack.push(res);
                    break;
            }
        }
    }
    return operandStack.pop();

}



// 1.289 2.3 + 3 2 ^ 6.4 sin * 9 / 6.8 * 3.2 * + 4 ! +

const display = document.getElementsByClassName("dis")[0];
const numButton = document.getElementsByClassName("num");
const Button = document.querySelectorAll("button");
var expr;


notdisplay = ['c', 'ce', 'del', 'square', 'power', 'nega', 'tenpower', 'exp', 'fact', 'equal', 'root', 'mod', 'divied', 'multiple', 'log']
for (let i = 0; i < Button.length; i++) {
    Button[i].addEventListener('click', function () {
        myId = this.id;
        var saveValue;

        // 不显示某些按钮的内容值
        if (!(notdisplay.includes(myId.toString()))) {
            display.value += this.textContent;
        }
        // 以下是三种删除按钮
        if (myId === 'del') {
            var temp;
            temp = display.value
            display.value = temp.slice(0, -1);
        }
        else if (myId === 'ce') {
            saveValue = display.value;
            display.value = "";
        }
        else if (myId === 'c') {
            display.value = "";
        }

        else if (myId === 'fact') {
            display.value += '!';
        }
        else if (myId === 'square') {
            display.value += '^2';
        }
        else if (myId === 'power') {
            display.value += '^';
        }
        else if (myId === 'tenpower') {
            display.value += '10^';
        }
        else if (myId === 'exp') {
            display.value += 'e^';
        }
        else if (myId === 'root') {
            display.value += '^(N2)';
        }
        else if (myId === 'mod') {
            display.value += '%';
        } else if (myId === 'multiple') {
            display.value += '*';
        } else if (myId === 'divied') {
            display.value += '/';
        } else if (myId === 'log') {
            display.value += 'log';
        }

        else if (myId === 'nega') {

            display.value += 'N';

        } else if (myId === 'equal') {
            const infixExpression = display.value;
            const postfixExpression = infixToPostfix(infixExpression);
            // display.value = postfixExpression
            display.value = calculate(postfixExpression);
            currentValue = display.value
            display.value = Number(currentValue).toLocaleString("en-US");
        }
    });

}
const infixExpression = '1.289+2.3+N3^2*sin(6.4)/9*6.8*3.2+4!+10%2+N200';
// const infixExpression = '1.289+2.3+3^2*sin(6.4)/9*6.8*3.2+4!+10%2';
const postfixExpression = infixToPostfix(infixExpression);
