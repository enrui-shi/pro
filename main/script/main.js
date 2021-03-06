$(document).ready(function () {
    check()
    var search_form = $("#search");
    search_form.submit(function(e) {
        e.preventDefault();
        var tags = $('#tags').val().split(',');
        var newtags=[];
        for(var i=0;i<tags.length;i++){
            if(tags[i]!=""){
                newtags.push(tags[i])
            }
        }
        if(newtags.length==0){
            newtags=null
        }
        var search_data = {q: $('#query').val(), limit: parseInt($('#limit').val(),10), has_media: $("#has_media")[0].checked , accepted: $("#accepted")[0].checked, tags:newtags};
        console.log(search_data);
        $.ajax({
            type: 'post',
            url: '/search',
            contentType: "application/json; charset=utf-8",
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            data: JSON.stringify(search_data),
            dataType: "json",
            success: function (data) {
                if (data.status == 'error') {
                    alert(data.error);
                } else {
                    //console.log(data.questions)
                    //window.location.replace("/main");
                    showQuestion(data.questions)
                }
            }
        })
    })
});


function check(){
    var x = document.cookie;
    console.log(x)
}



function showQuestion(json){
    $("#search-result").empty();
    var ul = '<ul>';
    for(var i=0;i<json.length;i++){
        console.log(json[i]);
        ul +=  '<li>'+'<h3>'+json[i].title+'</h3>'+'<br>'+'post by'+json[i].user+'<br>'+ 'tags:'+ json[i].tags +'</br>'+json[i].body +'</li>';
            //$(document.createElement('li')).text("title: " +json[i].title +"\n"+"body: "+json[i].body)
    }
    ul += "</ul>";
    $("#search-result").append(ul);
}