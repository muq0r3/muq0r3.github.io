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

test('day1 note is published with grouped sections and icon labels', () => {
  const html = readPublicFile('2026/10/29/embodied-ai-basics/index.html');

  assert.match(html, /具身智能基础/);
  assert.match(html, /动作空间/);
  assert.match(html, /Open X-Embodiment/);
  assert.match(html, /Forward Kinematic/);
  assert.match(html, /note-badge/);
});

test('learning page indexes completed course notes without status labels', () => {
  const html = readPublicFile('learning/index.html');

  assert.match(html, /class="[^"]*learning-shell[^"]*"/);
  assert.doesNotMatch(html, /学习状态/);
  assert.doesNotMatch(html, /在学|计划中/);
});

test('site navigation exposes the learning module', () => {
  const html = readPublicFile('index.html');

  assert.match(html, /href="\/learning"/);
});

test('public metadata no longer presents security research as a topic', () => {
  const config = fs.readFileSync(path.join(__dirname, '..', '_config.yml'), 'utf8');
  const about = fs.readFileSync(path.join(__dirname, '..', 'source', 'about', 'index.md'), 'utf8');
  const home = readPublicFile('index.html');

  assert.doesNotMatch(config, /安全/);
  assert.doesNotMatch(about, /安全/);
  assert.doesNotMatch(home, /安全/);
});
