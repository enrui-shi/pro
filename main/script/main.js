$(document).ready(function () {
    var search_form = $("#search");
    search_form.submit(function (e) {
        var search_data = {q: $('#query').val(), limit: $('#limit').val(),has_media: $("#has_media")[0].checked , accepted: $("#accepted")[0].checked};
        console.log(search_data)
        e.preventDefault();
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
                    console.log(data);
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