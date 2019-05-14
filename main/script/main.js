$(document).ready(function () {
    var search_form = $("#search");
    search_form.submit(function(e) {
        e.preventDefault();
        var tags = $('#tags').val().split(',');
        var newtags=null;
        for(var i=0;i<tags.length;i++){
            if(tags[i]!=""){
                newtags.push(tags[i])
            }
        }
        var search_data = {q: $('#query').val(), limit: parseInt($('#limit').val(),10), has_media: $("#has_media")[0].checked , accepted: $("#accepted")[0].checked, tags:newtags};
        console.log(search_data);
        $.ajax({
            type: 'post',
            url: 'http://130.245.171.196/search',
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
                    showQuestion(data.questions)
                }
            }
        })
    })
});






function showQuestion(json){
    var ul = $('<ul>').appendTo('body');
    for(var i=0;i<json.length;i++){
        console.log(json[i])
        var text = 
        ul.append(
            $(document.createElement('li')).text(json[i].title)
        );
    }
}