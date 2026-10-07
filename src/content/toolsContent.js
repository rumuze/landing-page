// Copy for the free tools: the shared labels, the tools hub, and each tool's page.
// English and Arabic must keep the same shape (a test checks it).

import { batch2Content } from './toolsContent.batch2';

export const toolsContent = {
  en: {
    common: {
      eyebrow: 'Free tool',
      privacy: 'Runs in your browser. What you type is not sent anywhere.',
      copy: 'Copy',
      copied: 'Copied',
      howTitle: 'How to use it',
      faqTitle: 'Questions',
      moreTitle: 'More free tools',
      allTools: 'All tools',
      openTool: 'Open tool',
    },
    hub: {
      qr: {
        title: 'QR Code Generator',
        text: 'Create QR codes for links, text, and contact details, style them, and download them as images.',
      },
      whatsapp: {
        title: 'WhatsApp Link Generator',
        text: 'Make a wa.me link, with a message already written, that opens a chat with your number.',
      },
      utm: {
        title: 'UTM Link Builder',
        text: 'Add campaign tags to a link so analytics shows where each visit came from.',
      },
      serp: {
        title: 'Google Result Preview',
        text: 'See how a page title and description may look in Google, and check their length.',
      },
    },
    whatsapp: {
      h1: 'WhatsApp link generator',
      subtitle: 'Make a wa.me link that opens a chat with your number, with a message already written.',
      country: 'Country',
      number: 'WhatsApp number',
      numberHint: 'With or without the country code. A leading 0 is removed for you.',
      message: 'Message (optional)',
      messageHint: 'Appears in the chat box when someone opens the link.',
      messagePlaceholder: 'Hello, I would like to ask about…',
      result: 'Your link',
      opensChat: 'Opens a chat with',
      test: 'Test the link',
      makeQr: 'Make a QR code for this link',
      errors: {
        invalidChars: 'Use digits only. Spaces, dashes and a leading + are fine.',
        tooShort: 'That number looks too short.',
        tooLong: 'That number is too long. A full number has at most 15 digits.',
      },
      longUrl: 'This link is very long. A QR code for it will be crowded and harder to scan, so consider a shorter message.',
      steps: [
        'Choose the country and type the number.',
        'Write the message people should start with, if you want one.',
        'Copy the link, or turn it into a QR code, and put it on your site, ads or print.',
      ],
      faq: [
        {
          q: 'What is a wa.me link?',
          a: 'A wa.me link is WhatsApp\'s own link format. When someone opens it on a phone or computer with WhatsApp, it starts a chat with the number in the link, and it can carry a message that is ready to send.',
        },
        {
          q: 'Do I need to type the country code?',
          a: 'No. The tool adds the code of the country you choose and removes a leading zero. If you type a number that already starts with + or 00, it is used as typed.',
        },
        {
          q: 'Does the person need to save my number first?',
          a: 'No. The link opens a chat with the number directly.',
        },
        {
          q: 'Is it free, and is my number stored?',
          a: 'It is free. The link is built in your browser, and the number and message are not sent to us or to anyone else.',
        },
      ],
      cta: {
        title: 'Know which campaign each chat came from',
        text: 'We connect websites, forms and CRM systems, and capture the source of every lead.',
        button: 'See integrations and tracking',
      },
    },
    utm: {
      h1: 'UTM link builder',
      subtitle: 'Add campaign tags to a link so analytics shows where each visit came from.',
      url: 'Page address',
      urlHint: 'The page people will land on.',
      source: 'Source',
      sourceHint: 'Where the link is placed, such as google or newsletter.',
      medium: 'Medium',
      mediumHint: 'The kind of channel, such as cpc, email or social.',
      campaign: 'Campaign name',
      campaignHint: 'What you call this campaign, such as ramadan_sale.',
      term: 'Keyword (optional)',
      content: 'Content (optional)',
      contentHint: 'To tell two ads or links in one campaign apart.',
      presets: 'Quick fill',
      lowercase: 'Lower-case everything',
      underscores: 'Join words with underscores',
      result: 'Your link',
      parameters: 'Parameters added',
      required: 'This field is required.',
      errors: {
        empty: 'Enter the page address.',
        invalid: 'That does not look like a web address.',
        protocol: 'Only http and https addresses can be tagged.',
      },
      steps: [
        'Type the page address people should land on.',
        'Fill in the source, the medium and a campaign name, or pick a quick fill.',
        'Copy the link and use it in the ad, email or post.',
      ],
      faq: [
        {
          q: 'What are UTM parameters?',
          a: 'They are tags added to the end of a link, such as utm_source and utm_campaign. Analytics tools such as Google Analytics read them to show which source, medium and campaign each visit came from.',
        },
        {
          q: 'Which fields are required?',
          a: 'Source, medium and campaign name. Keyword and content are optional and help when you run several ads in one campaign.',
        },
        {
          q: 'Why lower case and underscores?',
          a: 'Google Analytics treats Facebook and facebook as two different sources. Keeping everything lower case with underscores avoids split reports. You can turn both options off.',
        },
        {
          q: 'What happens to parameters already in the link?',
          a: 'They are kept, and so is anything after a #. Any existing utm_ parameters are replaced by the ones you enter.',
        },
        {
          q: 'Is anything stored or sent?',
          a: 'No. The link is built in your browser and nothing you type is sent anywhere.',
        },
      ],
      cta: {
        title: 'Campaign links are only the start',
        text: 'We plan and manage paid campaigns that begin from working conversion tracking, and report against what you count as a lead or a sale.',
        button: 'See paid advertising',
      },
    },
    serp: {
      h1: 'Google result preview',
      subtitle: 'See how a page title and description may look in Google, and check their length.',
      pageTitle: 'Page title',
      description: 'Meta description',
      address: 'Page address',
      addressPlaceholder: 'https://example.com/services',
      device: 'Preview on',
      desktop: 'Desktop',
      mobile: 'Mobile',
      preview: 'Preview',
      characters: 'characters',
      words: 'words',
      advice: 'A common range is {min} to {max} characters.',
      status: { empty: 'Empty', short: 'Short', good: 'Good length', long: 'May be cut off' },
      sampleTitle: 'Your page title appears here',
      sampleDescription: 'Your meta description appears here. Write a clear sentence about what the page offers.',
      approximate: 'This is an approximation. Google decides what to show and how much, based on the device and on the search.',
      steps: [
        'Type the title and description you plan to use for the page.',
        'Check the counters and see where the preview is cut off, on desktop and mobile.',
        'Adjust the text until the important words come first and nothing is lost.',
      ],
      faq: [
        {
          q: 'How long should a title be?',
          a: 'A common guide is 30 to 60 characters. Google cuts titles by width, not by characters, so wide letters take more room. The preview here measures the width, but only approximately.',
        },
        {
          q: 'How long should a meta description be?',
          a: 'A common guide is 70 to 160 characters. Google may show a different text from the page if it thinks that answers the search better.',
        },
        {
          q: 'Does a good preview improve my ranking?',
          a: 'Not directly. A clear title and description can make people more likely to click your result, but they do not decide where the page ranks.',
        },
        {
          q: 'Does it work for Arabic?',
          a: 'Yes. Arabic text is previewed right to left. The width is measured with the fonts in your browser, so the cut-off point is approximate.',
        },
        {
          q: 'Is anything stored or sent?',
          a: 'No. Everything is measured in your browser and nothing you type is sent anywhere.',
        },
      ],
      cta: {
        title: 'Titles are the easy part of SEO',
        text: 'We implement the technical side: canonical and hreflang tags, sitemaps, structured data and crawlable rendering, for Arabic and English sites.',
        button: 'See SEO services',
      },
    },
  },
  ar: {
    common: {
      eyebrow: 'أداة مجانية',
      privacy: 'تعمل داخل متصفحك. ما تكتبه لا يُرسل إلى أي مكان.',
      copy: 'نسخ',
      copied: 'تم النسخ',
      howTitle: 'طريقة الاستخدام',
      faqTitle: 'أسئلة شائعة',
      moreTitle: 'المزيد من الأدوات المجانية',
      allTools: 'كل الأدوات',
      openTool: 'افتح الأداة',
    },
    hub: {
      qr: {
        title: 'مولّد رموز QR',
        text: 'أنشئ رموز QR للروابط والنصوص وبيانات الاتصال، وخصّص شكلها ونزّلها كصور.',
      },
      whatsapp: {
        title: 'مولّد رابط واتساب',
        text: 'اصنع رابط wa.me برسالة جاهزة يفتح محادثة مع رقمك.',
      },
      utm: {
        title: 'منشئ روابط UTM',
        text: 'أضف وسوم الحملة إلى الرابط لتعرف من أين جاءت كل زيارة في التحليلات.',
      },
      serp: {
        title: 'معاينة نتيجة جوجل',
        text: 'شاهد كيف قد يظهر عنوان الصفحة ووصفها في جوجل، وتحقق من طولهما.',
      },
    },
    whatsapp: {
      h1: 'مولّد رابط واتساب',
      subtitle: 'اصنع رابط wa.me يفتح محادثة مع رقمك، برسالة مكتوبة مسبقاً.',
      country: 'الدولة',
      number: 'رقم واتساب',
      numberHint: 'مع مفتاح الدولة أو بدونه. يُحذف الصفر في البداية تلقائياً.',
      message: 'الرسالة (اختيارية)',
      messageHint: 'تظهر في خانة الكتابة عندما يفتح أحدهم الرابط.',
      messagePlaceholder: 'مرحباً، أود الاستفسار عن…',
      result: 'رابطك',
      opensChat: 'يفتح محادثة مع',
      test: 'جرّب الرابط',
      makeQr: 'اصنع رمز QR لهذا الرابط',
      errors: {
        invalidChars: 'استخدم الأرقام فقط. المسافات والشرطات وعلامة + في البداية مقبولة.',
        tooShort: 'يبدو هذا الرقم قصيراً.',
        tooLong: 'هذا الرقم طويل جداً. الرقم الكامل لا يزيد عن 15 رقماً.',
      },
      longUrl: 'هذا الرابط طويل جداً. سيكون رمز QR له مزدحماً وأصعب في المسح، فيُفضّل تقصير الرسالة.',
      steps: [
        'اختر الدولة واكتب الرقم.',
        'اكتب الرسالة التي تريد أن يبدأ بها الناس، إن أردت رسالة.',
        'انسخ الرابط، أو حوّله إلى رمز QR، وضعه في موقعك أو إعلاناتك أو مطبوعاتك.',
      ],
      faq: [
        {
          q: 'ما هو رابط wa.me؟',
          a: 'رابط wa.me هو صيغة الروابط الخاصة بواتساب. عندما يفتحه أحدهم على هاتف أو حاسوب عليه واتساب، تبدأ محادثة مع الرقم الموجود في الرابط، ويمكن أن يحمل رسالة جاهزة للإرسال.',
        },
        {
          q: 'هل أحتاج إلى كتابة مفتاح الدولة؟',
          a: 'لا. تضيف الأداة مفتاح الدولة التي تختارها وتحذف الصفر في البداية. وإذا كتبت رقماً يبدأ أصلاً بعلامة + أو 00 فيُستخدم كما كتبته.',
        },
        {
          q: 'هل يجب أن يحفظ الشخص رقمي أولاً؟',
          a: 'لا. يفتح الرابط محادثة مع الرقم مباشرة.',
        },
        {
          q: 'هل الأداة مجانية، وهل يُحفظ رقمي؟',
          a: 'الأداة مجانية. يُبنى الرابط داخل متصفحك، ولا يُرسل الرقم ولا الرسالة إلينا ولا إلى أي جهة أخرى.',
        },
      ],
      cta: {
        title: 'اعرف من أي حملة جاءت كل محادثة',
        text: 'نربط المواقع والنماذج وأنظمة CRM، ونلتقط مصدر كل عميل محتمل.',
        button: 'اطّلع على التكامل والتتبع',
      },
    },
    utm: {
      h1: 'منشئ روابط UTM',
      subtitle: 'أضف وسوم الحملة إلى الرابط لتعرف من أين جاءت كل زيارة في التحليلات.',
      url: 'عنوان الصفحة',
      urlHint: 'الصفحة التي سيصل إليها الزائر.',
      source: 'المصدر',
      sourceHint: 'أين يوضع الرابط، مثل google أو newsletter.',
      medium: 'الوسيلة',
      mediumHint: 'نوع القناة، مثل cpc أو email أو social.',
      campaign: 'اسم الحملة',
      campaignHint: 'الاسم الذي تطلقه على الحملة، مثل ramadan_sale.',
      term: 'الكلمة المفتاحية (اختياري)',
      content: 'المحتوى (اختياري)',
      contentHint: 'للتفريق بين إعلانين أو رابطين في الحملة نفسها.',
      presets: 'تعبئة سريعة',
      lowercase: 'اجعل كل شيء بأحرف صغيرة',
      underscores: 'اربط الكلمات بشرطة سفلية',
      result: 'رابطك',
      parameters: 'الوسوم المضافة',
      required: 'هذا الحقل مطلوب.',
      errors: {
        empty: 'أدخل عنوان الصفحة.',
        invalid: 'لا يبدو هذا عنوان موقع صالحاً.',
        protocol: 'يمكن وسم عناوين http وhttps فقط.',
      },
      steps: [
        'اكتب عنوان الصفحة التي تريد أن يصل إليها الزوار.',
        'املأ المصدر والوسيلة واسم الحملة، أو اختر تعبئة سريعة.',
        'انسخ الرابط واستخدمه في الإعلان أو البريد أو المنشور.',
      ],
      faq: [
        {
          q: 'ما هي وسوم UTM؟',
          a: 'هي وسوم تُضاف إلى نهاية الرابط مثل utm_source وutm_campaign. تقرؤها أدوات التحليلات مثل Google Analytics لتعرض من أي مصدر ووسيلة وحملة جاءت كل زيارة.',
        },
        {
          q: 'ما الحقول المطلوبة؟',
          a: 'المصدر والوسيلة واسم الحملة. الكلمة المفتاحية والمحتوى اختياريان، ويفيدان عند تشغيل عدة إعلانات في حملة واحدة.',
        },
        {
          q: 'لماذا الأحرف الصغيرة والشرطة السفلية؟',
          a: 'يعامل Google Analytics الاسمين Facebook وfacebook كمصدرين مختلفين. الحفاظ على الأحرف الصغيرة والشرطة السفلية يمنع تفرّق التقارير. ويمكنك إيقاف الخيارين.',
        },
        {
          q: 'ماذا يحدث للوسوم الموجودة في الرابط أصلاً؟',
          a: 'تبقى كما هي، ويبقى كذلك كل ما بعد علامة #. أما وسوم utm_ الموجودة فتُستبدل بما تدخله.',
        },
        {
          q: 'هل يُحفظ شيء أو يُرسل؟',
          a: 'لا. يُبنى الرابط داخل متصفحك، ولا يُرسل أي شيء تكتبه إلى أي مكان.',
        },
      ],
      cta: {
        title: 'روابط الحملات مجرد بداية',
        text: 'نخطط الحملات المدفوعة وندير أدائها، ونبدأها من تتبع تحويلات يعمل، ونقدّم النتائج مقابل ما تعدّه عميلاً محتملاً أو عملية بيع.',
        button: 'اطّلع على الإعلانات المدفوعة',
      },
    },
    serp: {
      h1: 'معاينة نتيجة جوجل',
      subtitle: 'شاهد كيف قد يظهر عنوان الصفحة ووصفها في جوجل، وتحقق من طولهما.',
      pageTitle: 'عنوان الصفحة',
      description: 'الوصف (Meta description)',
      address: 'عنوان الصفحة (الرابط)',
      addressPlaceholder: 'https://example.com/services',
      device: 'المعاينة على',
      desktop: 'الحاسوب',
      mobile: 'الجوال',
      preview: 'المعاينة',
      characters: 'حرفاً',
      words: 'كلمة',
      advice: 'المدى الشائع هو من {min} إلى {max} حرفاً.',
      status: { empty: 'فارغ', short: 'قصير', good: 'طول مناسب', long: 'قد يُقطع' },
      sampleTitle: 'يظهر هنا عنوان صفحتك',
      sampleDescription: 'يظهر هنا وصف صفحتك. اكتب جملة واضحة عمّا تقدمه الصفحة.',
      approximate: 'هذه معاينة تقريبية. تقرر جوجل ما تعرضه وكم تعرض منه بحسب الجهاز وعملية البحث.',
      steps: [
        'اكتب العنوان والوصف الذي تنوي استخدامه للصفحة.',
        'تحقق من العدّادات وانظر أين تُقطع المعاينة على الحاسوب والجوال.',
        'عدّل النص حتى تأتي الكلمات المهمة أولاً ولا يضيع منه شيء.',
      ],
      faq: [
        {
          q: 'ما الطول المناسب للعنوان؟',
          a: 'المدى الشائع من 30 إلى 60 حرفاً. تقطع جوجل العناوين بحسب العرض لا عدد الحروف، فالحروف العريضة تحتل مساحة أكبر. تقيس المعاينة هنا العرض لكن بشكل تقريبي.',
        },
        {
          q: 'ما الطول المناسب للوصف؟',
          a: 'المدى الشائع من 70 إلى 160 حرفاً. وقد تعرض جوجل نصاً آخر من الصفحة إن رأته يجيب عن البحث بصورة أفضل.',
        },
        {
          q: 'هل تحسّن المعاينة الجيدة ترتيبي في البحث؟',
          a: 'ليس بشكل مباشر. العنوان والوصف الواضحان قد يزيدان احتمال النقر على نتيجتك، لكنهما لا يحددان ترتيب الصفحة.',
        },
        {
          q: 'هل تعمل الأداة مع العربية؟',
          a: 'نعم. يُعرض النص العربي من اليمين إلى اليسار. ويُقاس العرض بخطوط متصفحك، لذلك تكون نقطة القطع تقريبية.',
        },
        {
          q: 'هل يُحفظ شيء أو يُرسل؟',
          a: 'لا. كل شيء يُقاس داخل متصفحك ولا يُرسل أي شيء تكتبه إلى أي مكان.',
        },
      ],
      cta: {
        title: 'العناوين هي الجزء السهل من الـ SEO',
        text: 'ننفذ الجانب التقني: وسوم canonical وhreflang وخرائط الموقع والبيانات المنظمة والعرض القابل للزحف، للمواقع العربية والإنجليزية.',
        button: 'اطّلع على خدمات الـ SEO',
      },
    },
  },
};

// The second batch of tools lives in its own file; merge it in so there is one place to read from.
for (const lang of ['en', 'ar']) {
  const { hub, ...pages } = batch2Content[lang];
  Object.assign(toolsContent[lang].hub, hub);
  Object.assign(toolsContent[lang], pages);
}
