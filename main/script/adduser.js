$(document).ready(function () {
    var adduser_form = $("#adduser");
    adduser_form.submit(function (e) {
        var adduser_data = {username: $('#name').val(), password: $('#password').val(), email: $('email')};
        console.log(adduser_data.username, " ", adduser_data.password)
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'http://130.245.171.196/adduser',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(adduser_data),
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