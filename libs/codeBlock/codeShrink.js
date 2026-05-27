// Code block collapse.
$(function () {
  $('.code-area').each(function () {
    var $block = $(this);
    $block.children('.code-expand').remove();
    $block.prepend('<i class="fas fa-angle-up code-expand" aria-hidden="true"></i>');
  });

  $('.code-expand').on('click', function () {
    var $block = $(this).closest('.code-area');
    var $content = $block.children('table').length ? $block.children('table') : $block.children('pre').find('code');

    if ($block.hasClass('code-closed')) {
      $content.show();
      $block.removeClass('code-closed');
    } else {
      $content.hide();
      $block.addClass('code-closed');
    }
  });
});
