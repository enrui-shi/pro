






function showQuestion(json){
    var ul = $('<ul>').appendTo('body');
    $(json.items).each(function(index, item) {
        ul.append(
            $(document.createElement('li')).text(item)
        );
    })
}