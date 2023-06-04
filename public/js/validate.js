document.addEventListener("DOMContentLoaded", function (event) {
    OTPInput();
});

function validateOTP() {
    const otpContainer = document.getElementById('otp');
    const otpInputs = otpContainer.getElementsByTagName('input');

    let otpValue = '';
    for (let i = 0; i < otpInputs.length; i++) {
        otpValue += otpInputs[i].value;
    }

    let otpElement = $("#otp")[0]
    let type = otpElement.dataset.type

    fetch(BASE_URL + "users/validate/" + type, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: otpValue
        })
    })
        .then(json => json.json())
        .then(result => {
            if(result.validation) {
                switch (type) {
                    case "1":
                        location.replace(BASE_URL)
                        break;
                    case "2":
                        location.replace(BASE_URL + "login")
                        break;
                }
            }
        })
        .catch(error => {
            console.log(error)
        })
}

function OTPInput() {
    const inputs = document.querySelectorAll('#otp > *[id]');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keydown', function (event) {
            if (event.key === "Backspace") {
                inputs[i].value = '';
                if (i !== 0)
                    inputs[i - 1].focus();
            } else {
                if (i === inputs.length - 1 && inputs[i].value !== '') {
                    return true;
                }
                else if (event.keyCode > 47 && event.keyCode < 58) {
                    inputs[i].value = event.key;
                    if (i !== inputs.length - 1)
                        inputs[i + 1].focus();
                    event.preventDefault();
                } else if (event.keyCode > 64 && event.keyCode < 91) {
                    inputs[i].value = String.fromCharCode(event.keyCode);
                    if (i !== inputs.length - 1)
                        inputs[i + 1].focus();
                    event.preventDefault();
                }
            }
        });
    }
}