// Public repositories from github.com/elbayoumi shown on /portfolio.
// Only public, non-fork repositories are listed; private repositories must
// never be added here. Facts are limited to what GitHub itself shows for the
// repository (name, language, description, homepage), see docs/CLAIMS_REGISTRY.md.
// `summary` is set only when the repository has a description to translate.

export const GITHUB_PROFILE_URL = 'https://github.com/elbayoumi';

export const githubProjects = [
  {
    name: 'crewloom',
    language: 'Python',
    summary: {
      en: 'Repository-native specialist agent skills, working memory, bilingual context packs, and checks. Apache-2.0.',
      ar: 'مهارات وكلاء متخصصة داخل المستودع، وذاكرة عمل، وحزم سياق ثنائية اللغة، وفحوصات. ترخيص Apache-2.0.',
    },
  },
  {
    name: 'app.busatyapp.com',
    language: 'CSS',
    homepage: 'https://app.elbayoumi.net',
    summary: {
      en: 'Unified Dockerized platform combining Laravel (PHP 8.2) and Node.js (Socket.IO), with Caddy, Nginx, MySQL, Redis and phpMyAdmin.',
      ar: 'منصة موحّدة على Docker تجمع Laravel (PHP 8.2) وNode.js (Socket.IO) مع Caddy وNginx وMySQL وRedis وphpMyAdmin.',
    },
  },
  { name: 'Rveta-Framework', language: 'Rust' },
  { name: 'Forge-Framework', language: 'JavaScript' },
  { name: 'forge-web-builder', language: 'JavaScript' },
  { name: 'ai-cli', language: 'JavaScript' },
  { name: 'laravel-tap-payment', language: 'PHP' },
  { name: 'payment-paypal', language: 'PHP' },
  { name: 'store-notifications', language: 'PHP' },
  {
    name: 'laravel-socket.io',
    language: 'PHP',
    summary: { en: 'Chat app for testing Socket.IO.', ar: 'تطبيق دردشة لتجربة Socket.IO.' },
  },
  { name: 'Video-Streaming-Node', language: 'EJS' },
  { name: 'CRUDAPI-express-sequelize', language: 'JavaScript' },
  { name: 'TaskMastery', language: 'Blade' },
  { name: 'pwa-notify', language: 'JavaScript', homepage: 'https://pwa-notify-three.vercel.app' },
  { name: 'pwa-native', language: 'CSS', homepage: 'https://pwa-native.vercel.app' },
  { name: 'Bu-Hashem', language: 'HTML', homepage: 'https://bu-hashem.vercel.app' },
  { name: 'abouhashim-lnding-page', language: 'JavaScript', homepage: 'https://abouhashim-lnding-page.vercel.app' },
  { name: 'abdallah.ww0.uk', language: 'TypeScript', homepage: 'https://abdallah-dusky.vercel.app' },
  { name: 'elbayoumi.github.io', language: 'HTML', homepage: 'https://elbayoumi.vercel.app' },
].map((project) => ({ ...project, url: `${GITHUB_PROFILE_URL}/${project.name}` }));
