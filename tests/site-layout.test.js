const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const publicDir = path.join(__dirname, '..', 'public');
const postsDir = path.join(__dirname, '..', 'source', '_posts');

function readPublicFile(relativePath) {
  return fs.readFileSync(path.join(publicDir, relativePath), 'utf8');
}

test('home page uses the editorial layout', () => {
  const html = readPublicFile('index.html');
  const postCount = fs.readdirSync(postsDir)
    .filter((file) => file.endsWith('.md')).length;

  assert.match(html, /class="editorial-hero"/);
  assert.match(html, /class="home-intro"/);
  assert.match(html, postCount === 0 ? /class="post-empty"/ : /class="post-list"/);
  assert.doesNotMatch(html, /carousel carousel-slider/);
  assert.doesNotMatch(html, /class="empty-state"/);
});

test('about page uses a profile sidebar and reading column', () => {
  const html = readPublicFile('about/index.html');

  assert.match(html, /class="[^"]*about-shell[^"]*"/);
  assert.match(html, /class="[^"]*profile-panel[^"]*"/);
  assert.match(html, /class="[^"]*about-reading[^"]*"/);
});

test('site header uses the text mark instead of the default logo image', () => {
  const html = readPublicFile('index.html');

  assert.match(html, /class="brand-mark"/);
  assert.doesNotMatch(html, /class="logo-img"/);
});

test('custom stylesheet defines the editorial design tokens', () => {
  const css = readPublicFile('css/my.css');

  assert.match(css, /--paper:\s*#f4f1ea/);
  assert.match(css, /--ink:\s*#1c2421/);
  assert.match(css, /--accent:\s*#1f6a5a/);
});
