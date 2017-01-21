function existingTag(newTag) {
    var existing = false;
    newTag = newTag.toLowerCase();

    $(".addedTag").each(function () {
        var curTag = $(this).text().toLowerCase();
        curTag = curTag.substring(0, curTag.length - 1);
        if (curTag == newTag) {
            existing = true;
        }
    });
    return existing;
}

$(function () {
    $('.tags input').keyup(function () {
        var tag = $(this).val().trim();

        if ((event.which == '13') && (tag != "")) {
            if (!existingTag(tag)) {
                $('<li class="addedTag"><span>' + tag + '</span><span class="tagRemove" onclick="$(this).parent().remove();">x</span></li>').insertBefore('.tags .tagAdd');
                $(this).val("");
            }
            else {
                $(this).val("");
            }
        }
    });

    $('.tagRemove').click(function (event) {
        event.preventDefault();
        $(this).parent().remove();
    });

});