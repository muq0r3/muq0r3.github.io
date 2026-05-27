// Code block language label.
$(function () {
  var langTag = '<div class="code_lang" title="代码语言"></div>';

  $('figure.highlight').each(function () {
    var $block = $(this);
    var lang_name = ($block.attr('class') || '')
      .split(/\s+/)
      .filter(function (name) {
        return name && name !== 'highlight' && name !== 'code-area';
      })[0];

    if (!lang_name) {
      return true;
    }

    $block.children('.code_lang').remove();
    $block.prepend($(langTag).text(lang_name));
  });

  $('.code-area > pre').each(function () {
    var $pre = $(this);
    var code_language = $pre.attr('class');

    if (!code_language) {
      return true;
    }

    var lang_name = code_language.replace('line-numbers', '').trim().replace('language-', '').trim();

    $pre.siblings('.code_lang').remove();
    $pre.before($(langTag).text(lang_name));
  });
});
