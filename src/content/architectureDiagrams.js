// Layered architecture summaries for the products on the work page. Node names
// are technical terms and stay in Latin script; tier labels are localised.
// Each diagram is derived from the product's README; keep them in sync.

export const architectureDiagrams = {
  RumuzePMO: {
    caption: {
      en: 'Request flow through the modular monolith',
      ar: 'مسار الطلب داخل الكتلة المعيارية',
    },
    tiers: [
      { label: { en: 'Entry', ar: 'الدخول' }, nodes: ['FrankenPHP + Octane', 'Request tracing', 'Tenant guard'] },
      { label: { en: 'Contracts', ar: 'العقود' }, nodes: ['Module contracts', 'QueryEngine dispatch'] },
      { label: { en: 'Modules', ar: 'الوحدات' }, nodes: ['CRM', 'ERP', 'HRM', 'Projects', 'Payments', 'Support', 'Landing page'] },
      { label: { en: 'Data', ar: 'البيانات' }, nodes: ['MySQL', 'Redis cache and queues', 'Queue worker'] },
    ],
  },
  Rveta: {
    caption: {
      en: 'Driver app, API, and services',
      ar: 'تطبيق السائق وواجهة API والخدمات',
    },
    tiers: [
      { label: { en: 'Clients', ar: 'العملاء' }, nodes: ['Flutter driver app', 'Push notifications', 'Live location'] },
      { label: { en: 'Edge', ar: 'الحافة' }, nodes: ['Nginx', 'Let\'s Encrypt TLS'] },
      { label: { en: 'API', ar: 'الواجهة' }, nodes: ['Laravel API', 'Scheduler', 'Queue worker'] },
      { label: { en: 'Data', ar: 'البيانات' }, nodes: ['MySQL', 'Redis'] },
    ],
  },
  'Rumuze Core': {
    caption: {
      en: 'Event flow from API to webhooks and realtime',
      ar: 'مسار الأحداث من الواجهة إلى Webhooks والاتصال اللحظي',
    },
    tiers: [
      { label: { en: 'Clients', ar: 'العملاء' }, nodes: ['Next.js dashboard', 'API clients', 'Webhook senders'] },
      { label: { en: 'Kernel', ar: 'النواة' }, nodes: ['NestJS API', 'EventBus', 'Transactional outbox'] },
      { label: { en: 'Delivery', ar: 'التسليم' }, nodes: ['Webhook engine', 'Socket.IO realtime'] },
      { label: { en: 'Data', ar: 'البيانات' }, nodes: ['PostgreSQL (Prisma)', 'Redis'] },
    ],
  },
  'Rveta Connector': {
    caption: {
      en: 'Device session and command channel',
      ar: 'جلسة الجهاز وقناة الأوامر',
    },
    tiers: [
      { label: { en: 'Device', ar: 'الجهاز' }, nodes: ['Flutter app', 'Secure token storage'] },
      { label: { en: 'Session', ar: 'الجلسة' }, nodes: ['Device pairing', 'Token rotation', 'Revocation handling'] },
      { label: { en: 'Control plane', ar: 'منصة التحكم' }, nodes: ['Laravel API', 'Command channel (ping, refresh_status)'] },
    ],
  },
};
