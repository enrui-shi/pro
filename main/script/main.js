var ul = $('<ul>').appendTo('body');
var json = { items: ['item 1', 'item 2', 'item 3'] };
$(json.items).each(function(index, item) {
    ul.append(
        $(document.createElement('li')).text(item)
    );
});