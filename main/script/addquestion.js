$(document).ready(function () {
    var question_form = $("#question");
    question_form.submit(function (e) {
        e.preventDefault();

        var tags = $('#tags').val().split(',');
        var newtags=null;
        for(var i=0;i<tags.length;i++){
            if(tags[i]!=""){
                newtags.push(tags[i])
            }
        }

        var question_data = {title: $('#title').val(), body: $('#body').val(), tags:newtags};
        
        console.log(login_data.userEmail, " ", login_data.password)
        $.ajax({
            type: 'post',
            url: '/question/add',
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
                    alert("add success")
                    window.location.replace("/");
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert(jqXHR.responseJSON.error);
            }
        })
    })
});