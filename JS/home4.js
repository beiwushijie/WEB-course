const display = document.getElementsByClassName("dis")[0];
const Button = document.querySelectorAll("button");

notdisplay = ['c', 'ce', 'del', 'square', 'power', 'nega', 'tenpower', 'exp', 'fact', 'equal', 'root', 'mod', 'divied', 'multiple', 'log']
for (let i = 0; i < Button.length; i++) {
    Button[i].addEventListener('click', function () {
        myId = this.id;
        var saveValue;

        if (!(notdisplay.includes(myId.toString()))) {
            display.value += this.textContent;
        }
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
            display.value += 'sqrt(';
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

            $(function () {
                $.post('http://0.0.0.0:8000/calculate',
                    display.value,
                    function (data) {
                        console.log(data['res'])
                        display.value = data['res']

                    });
            });

            
        }

    });

}

