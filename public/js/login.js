function login() {
    let email = $("#email").val()
    let password = $("#password").val()
    let error = ""
    if (!email) {
        error = "Vui lòng nhập email";
    }
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        error = "Vui lòng nhập đúng địa chỉ email"
    }
    else if (!password) {
        error = "Vui lòng nhập password"
    }
    else if (password.length < 6) {
        error = "Mật khẩu phải dài hơn 6 kí tự"
    }

    if (error) {
        return showError(error)
    }
    else {
        return signIn(email, password)
    }
}

function showError(message) {
    alert(message);
}

function signIn(email, password) {
    fetch(BASE_URL + "auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(json => json.json())
    .then(result => {
        if(result.login) {
            if(!result.validate) {
                location.replace(BASE_URL + "validate/1")
            }
            else {
                location.replace(BASE_URL)
            }
        }
        else {
            $("#password").val("")
            showError(result.message)
        }
    })
    .catch(error => {
        console.log(error)
    })
}

function register() {
    let name = $("#registerName").val()
    let surName = $("#registerSurname").val()
    let email = $("#registerEmail").val()
    let password = $("#registerPassword").val()
    let confirm = $("#registerRepeatPassword").val()
    let agree = $("#registerCheck")
    let error = ""

    if (!name) {
        error = "Vui lòng nhập tên của bạn"
    }
    else if (!surName) {
        error = "Vui lòng nhập họ của bạn"
    }
    else if (!email) {
        error = "Vui lòng nhập email của bạn"
    }
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        error = "Email không hợp lệ vui lòng nhập lại"
    }
    else if (!password) {
        error = "Vui lòng nhập password"
    }
    else if (password.length < 6) {
        error = "Password phải từ 6 ký tự trở lên"
    }
    else if (!confirm) {
        error = "Vui lòng xác nhận mật khẩu"
    }
    else if (confirm != password) {
        error = "Password phải trùng nhau"
    }
    else if (!agree.prop("checked")) {
        error = "Hãy đọc điều khoản của chúng tôi"
    }

    if (error) {
        showError(error)
    }
    else {
        signUp(name, surName, email, password)
    }
}

function signUp(name, surName, email, password) {
    fetch(BASE_URL + "users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: name,
            lastName: surName,
            mail: email,
            password
        })
    })
        .then(json => json.json())
        .then(result => {
            console.log(result)
            if (result.isCreated) {
                // show validation page
                location.replace(BASE_URL + "/validate/1")
            }
            else {
                // show error
                $("#registerPassword").val("")
                $("#registerRepeatPassword").val("")
                if(result.error) {
                    showError(result.error)
                }
            }
        })
        .catch(error => {
            showError(error.message)
            $("#registerPassword").val("")
            $("#registerRepeatPassword").val("")
        }
        )
}