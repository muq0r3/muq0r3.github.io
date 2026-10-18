/**
 * Hexo's index and archive generators skip route generation when there are no
 * posts. Keep the site usable after a content reset by generating those pages
 * only while the post collection is empty.
 */
hexo.extend.generator.register('empty-site-pages', function (locals) {
  if (locals.posts.length > 0) {
    return;
  }

  const pageData = {
    title: hexo.config.title,
    current: 1,
    total: 1,
    posts: locals.posts
  };

  return [
    {
      path: 'index.html',
      layout: 'index',
      data: Object.assign({}, pageData, { __index: true })
    },
    {
      path: 'archives/index.html',
      layout: 'archive',
      data: Object.assign({}, pageData, { title: '归档' })
    }
  ];
});
