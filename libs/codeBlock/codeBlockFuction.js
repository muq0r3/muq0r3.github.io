// Code block helpers.
$(function () {
    $('figure.highlight').each(function () {
        $(this).addClass('code-area').css('position', 'relative');
    });

    $('pre').not('figure.highlight pre').each(function () {
        var $pre = $(this);
        if (!$pre.parent().hasClass('code-area')) {
            $pre.wrap('<div class="code-area" style="position: relative"></div>');
        }
    });
});
