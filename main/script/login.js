$(document).ready(function () {
    var login_form = $("#login");
    login_form.submit(function (e) {
        var login_data = {userEmail: $('#email').val(), password: $('#password').val()};
        console.log(login_data.userEmail, " ", login_data.password)
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'http://130.245.171.196/login',
            contentType: "application/json; charset=utf-8",
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            data: JSON.stringify(login_data),
            dataType: "json",
            success: function (data) {
                if (data.status == 'error') {
                    alert(data.error);
                } else {
                    window.location.replace("/main");
                    console.log(data);
                }
            }
        })
    })
});