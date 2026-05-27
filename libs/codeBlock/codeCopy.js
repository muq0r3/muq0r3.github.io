// One-click code block copy.
$(function () {
    $('.code-area').each(function () {
        var $block = $(this);
        $block.children('.code_copy, .codecopy_notice').remove();
        $block.prepend('<i class="fas fa-copy code_copy" title="复制代码" aria-hidden="true"></i>');
        $block.prepend('<div class="codecopy_notice"></div>');
    });

    function copy(text, ctx) {
        var $notice = $(ctx).siblings('.codecopy_notice');

        if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            try {
                document.execCommand('copy');
                $notice
                    .text("复制成功")
                    .animate({
                        opacity: 1,
                        top: 30
                    }, 450, function () {
                        setTimeout(function () {
                            $notice.animate({
                                opacity: 0,
                                top: 0
                            }, 650)
                        }, 400)
                    })
            } catch (ex) {
                $notice
                    .text("复制失败")
                    .animate({
                        opacity: 1,
                        top: 30
                    }, 650, function () {
                        setTimeout(function () {
                            $notice.animate({
                                opacity: 0,
                                top: 0
                            }, 650)
                        }, 400)
                    })
                return false
            }
        } else {
            $notice.text("浏览器不支持复制")
        }
    }

    $('.code-area .fa-copy').on('click', function () {
        var $block = $(this).closest('.code-area');
        var codeNode = $block.find('td.code pre')[0] || $block.children('pre').find('code')[0] || $block.children('pre')[0];

        if (!codeNode) {
            return;
        }

        var selection = window.getSelection()
        var range = document.createRange()
        range.selectNodeContents(codeNode)
        selection.removeAllRanges()
        selection.addRange(range)
        var text = selection.toString()
        copy(text, this)
        selection.removeAllRanges()
    })
});
