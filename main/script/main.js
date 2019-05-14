$(document).ready(function () {
    var search_form = $("#search");
    search_form.submit(function(e) {
        e.preventDefault();
        var tags = $('#tags').val().split(',')
        var search_data = {q: $('#query').val(), limit: parseInt($('#limit').val(),10), has_media: $("#has_media")[0].checked , accepted: $("#accepted")[0].checked, tags:tags};
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
                    console.log(data.questions)
                    showQuestion(data.questions)
                }
            }
        })
    })
});






function showQuestion(json){
    var ul = $('<ul>').appendTo('body');
    $(json.items).each(function(index, item) {
        ul.append(
            $(document.createElement('li')).text(item)
        );
    })
}