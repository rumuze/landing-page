// Copy for the fourth batch of free tools: email signature generator, palette from an image and
// social share preview. English and Arabic must keep the same shape (a test checks it).

const en = {
  hub: {
    signature: {
      title: 'Email Signature Generator',
      text: 'Make a clean HTML email signature, see it as you type, and copy it ready to paste into Gmail or Outlook.',
    },
    palette: {
      title: 'Palette from Image',
      text: 'Pick the main colours of a logo or photo, with their codes and how readable text is on each one.',
    },
    social: {
      title: 'Social Share Preview',
      text: 'See how a link may look when shared on WhatsApp, X, LinkedIn and Facebook, and copy the meta tags that control it.',
    },
  },

  signature: {
    h1: 'Email signature generator',
    subtitle: 'Fill in your details, choose a layout and see the signature take shape. Copy it, then paste it into your mail settings.',
    fields: {
      name: 'Full name',
      title: 'Job title',
      company: 'Company',
      phone: 'Phone',
      email: 'Email',
      website: 'Website',
      address: 'Address',
      logo: 'Logo address',
    },
    placeholders: { name: 'Sara Al-Harbi', title: 'Head of Marketing', company: 'Example Studio', phone: '+966 55 123 4567', email: 'sara@example.com', website: 'example.com', address: 'King Fahd Road, Riyadh', logo: 'https://example.com/logo.png' },
    hints: {
      logo: 'Optional. A web address of an image. It loads in the email program, not on this page, so the preview shows your initials.',
    },
    errors: {
      email: 'That does not look like an email address.',
      phone: 'Use 7 to 15 digits. Spaces, dashes and a leading + are fine.',
      website: 'Enter a web address such as example.com.',
      logo: 'Enter a web address that starts with http or https.',
    },
    templateLabel: 'Layout',
    templates: { classic: 'Classic', bar: 'Side bar', compact: 'Compact' },
    accent: 'Accent colour',
    preview: 'Preview',
    previewEmpty: 'Type your name to see the signature.',
    loadExample: 'Fill with an example',
    clear: 'Clear',
    copyRich: 'Copy signature',
    copyHtml: 'Copy HTML code',
    copyText: 'Copy plain text',
    htmlLabel: 'HTML code',
    howToPaste: {
      title: 'Where to paste it',
      gmail: 'Gmail: Settings, See all settings, General, Signature. Paste into the box and save.',
      outlook: 'Outlook: Settings, Accounts, Signatures. Paste into the editor and save.',
      apple: 'Apple Mail: Settings, Signatures. Untick "Always match my default message font", then paste.',
    },
    notice:
      'The signature is a small table with inline styles, which most mail programs keep. Some block images until the reader allows them, and some change fonts, so check it by sending yourself a test. Links are made only from web addresses, phone numbers and email addresses you type.',
    steps: [
      'Fill in your details and pick a layout and an accent colour.',
      'Press "Copy signature" and paste it into the signature box of your mail program.',
      'Send yourself a test message to check how it looks on a phone and on a computer.',
    ],
    faq: [
      {
        q: 'How do I add the signature to Gmail or Outlook?',
        a: 'Press "Copy signature", open the signature settings of your mail program, paste into the editor and save. The steps for the common programs are listed under the preview.',
      },
      {
        q: 'Why does my logo not show in the preview?',
        a: 'The logo is a picture that your email program loads from the address you give. Showing it here would mean this page asking another site for it, so the preview shows your initials instead. The logo is in the copied signature.',
      },
      {
        q: 'Why do some readers see no logo?',
        a: 'Many mail programs hide pictures from senders they do not know until the reader allows them. Keep your name and contact details as text, as this signature does, so they are always readable.',
      },
      {
        q: 'What if the paste loses the formatting?',
        a: 'Use "Copy HTML code" if your program has a place to paste HTML, or choose the plain text version. Some programs only accept a signature built in their own editor.',
      },
      {
        q: 'Is anything stored or sent?',
        a: 'No. The signature is built in your browser and nothing you type is sent anywhere.',
      },
    ],
    cta: {
      title: 'Want your email to look as good as your site?',
      text: 'We set up branded email, domain authentication and the systems around it, so what you send arrives and looks right.',
      button: 'See digital solutions',
    },
  },

  palette: {
    h1: 'Palette from image',
    subtitle: 'Drop a logo or photo and get its main colours, with their codes and how readable text is on each one.',
    drop: {
      title: 'Drop an image here',
      hint: 'JPEG, PNG or WebP. It is read on your device and never uploaded. You can also paste an image.',
      choose: 'Choose an image',
    },
    sample: 'Sample image. Drop your own to replace it.',
    count: 'Number of colours',
    swatch: { copy: 'Copy {hex}', copied: 'Copied {hex}', share: '{n}% of the image' },
    notations: { hex: 'HEX', rgb: 'RGB', hsl: 'HSL' },
    contrast: {
      title: 'Text on each colour',
      intro: 'The contrast ratio of white and black text on each colour. 4.5 or more passes AA for body text, 7 or more passes AAA.',
      white: 'White text',
      black: 'Black text',
      levels: { AAA: 'AAA', AA: 'AA', fail: 'Fails' },
      best: 'Best',
    },
    export: { title: 'Use the palette', css: 'CSS variables', copyCss: 'Copy CSS', copyHexes: 'Copy all HEX codes' },
    errors: {
      type: 'Choose a JPEG, PNG or WebP image.',
      decode: 'This browser could not read that image.',
      empty: 'There are no visible pixels in that image.',
    },
    notice:
      'Colours are picked from a scaled-down copy of the image, so they are close to, not exactly, the colours in the file. A screen and its colour profile can also change how a colour looks. Contrast is worked out with the WCAG 2 formula for white and black text only.',
    steps: [
      'Drop an image on the page, or choose one from your device.',
      'Choose how many colours you want. The swatches update at once.',
      'Click a colour to copy its code, check the contrast, and copy the whole palette as CSS.',
    ],
    faq: [
      {
        q: 'Is my image uploaded?',
        a: 'No. Your browser reads it and works out the colours on your device. Nothing is sent to a server.',
      },
      {
        q: 'How are the colours chosen?',
        a: 'The picture is scaled down and its pixels are split into groups of similar colour. Each group becomes one swatch, shown with the share of the picture it covers.',
      },
      {
        q: 'What does the contrast ratio mean?',
        a: 'It compares the brightness of two colours, from 1 (the same) to 21 (black on white). WCAG asks for at least 4.5 for body text and 3 for large text so that people with low vision can read it.',
      },
      {
        q: 'Why are my brand colours slightly different?',
        a: 'The tool averages groups of pixels from a reduced copy, and an image can contain compression and anti-aliasing. For an exact brand colour, use the code from your brand guide.',
      },
      {
        q: 'Can I use the colours commercially?',
        a: 'Colours themselves are just numbers, but a logo or photo may belong to someone else. Check you have the right to use the image the colours come from.',
      },
    ],
    cta: {
      title: 'A palette is the start of an identity',
      text: 'We turn colours into a full design system for your site and app, with the contrast, the dark mode and the components that go with it.',
      button: 'See digital solutions',
    },
  },

  social: {
    h1: 'Social share preview',
    subtitle: 'See how a link may look when it is shared, and copy the meta tags that control it.',
    fields: {
      title: 'Title',
      description: 'Description',
      url: 'Page address',
      siteName: 'Site name',
      image: 'Preview image',
      imageUrl: 'Image address for the tags',
    },
    placeholders: {
      title: 'Example Studio: websites and stores for growing brands',
      description: 'We design and build fast websites and online stores in Arabic and English.',
      url: 'https://example.com',
      siteName: 'Example Studio',
      imageUrl: 'https://example.com/share.jpg',
    },
    hints: {
      title: 'Common guidance: 30 to 60 characters.',
      description: 'Common guidance: 70 to 160 characters.',
      image: 'Only for this preview. It stays on your device.',
      imageUrl: 'The address of the image on your site. It goes in the tags, and is not loaded here.',
    },
    chooseImage: 'Choose an image',
    removeImage: 'Remove the image',
    status: { empty: 'Empty', short: 'Short', good: 'Good length', long: 'May be cut off' },
    platformLabel: 'Platform',
    platforms: { whatsapp: 'WhatsApp', x: 'X', linkedin: 'LinkedIn', facebook: 'Facebook' },
    card: {
      sampleTitle: 'Your page title appears here',
      sampleDescription: 'Your description appears here. Say what the page offers in one clear sentence.',
      sampleDomain: 'example.com',
      noImage: 'No image',
    },
    tagsLabel: 'Meta tags',
    copyTags: 'Copy the tags',
    tagsHint: 'Paste them inside the <head> of the page.',
    approximate:
      'These are approximations. Each platform decides how to draw a card, can change it, and may keep an old version of your page until it is refreshed.',
    steps: [
      'Type the title, description and address of the page, and choose an image to preview.',
      'Switch between WhatsApp, X, LinkedIn and Facebook to see the card on each one.',
      'Copy the meta tags and paste them into the head of your page.',
    ],
    faq: [
      {
        q: 'What are meta tags for sharing?',
        a: 'They are lines in the head of a page, called Open Graph and Twitter Card tags, that tell WhatsApp, X, LinkedIn, Facebook and others which title, description and image to show when someone shares the link.',
      },
      {
        q: 'Why does my shared link still show the old card?',
        a: 'Platforms keep a copy of the card for a while. After you change the tags, use the platform’s own tool to refresh it, or wait. This preview cannot show what a platform has stored.',
      },
      {
        q: 'Which image size should I use?',
        a: 'A wide image, often about 1200 by 630 pixels, is a common choice, and it should still make sense when cropped. Each platform has its own rules, so check their documentation.',
      },
      {
        q: 'Is my image uploaded?',
        a: 'No. A picture you choose is shown from your own device and never sent anywhere. The address you type for the tags is only written into the code and is not loaded.',
      },
      {
        q: 'Is anything stored or sent?',
        a: 'No. The preview and the tags are made in your browser and nothing you type is sent anywhere.',
      },
    ],
    cta: {
      title: 'Links that look right get clicked',
      text: 'We set up the metadata, sharing images and structured data across a whole site, in Arabic and English, so every page is shared well.',
      button: 'See SEO services',
    },
  },
};

const ar = {
  hub: {
    signature: {
      title: 'مولّد توقيع البريد الإلكتروني',
      text: 'اصنع توقيع بريد HTML أنيقاً، وشاهده وأنت تكتب، وانسخه جاهزاً للصق في Gmail أو Outlook.',
    },
    palette: {
      title: 'ألوان من صورة',
      text: 'استخرج الألوان الرئيسية لشعار أو صورة، مع رموزها ومدى وضوح النص فوق كل لون.',
    },
    social: {
      title: 'معاينة المشاركة الاجتماعية',
      text: 'شاهد كيف قد يظهر الرابط عند مشاركته في واتساب وX ولينكدإن وفيسبوك، وانسخ وسوم meta التي تتحكم فيه.',
    },
  },

  signature: {
    h1: 'مولّد توقيع البريد الإلكتروني',
    subtitle: 'املأ بياناتك واختر التصميم وشاهد التوقيع يتشكل. انسخه ثم الصقه في إعدادات بريدك.',
    fields: {
      name: 'الاسم الكامل',
      title: 'المسمى الوظيفي',
      company: 'الشركة',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      website: 'الموقع',
      address: 'العنوان',
      logo: 'عنوان الشعار',
    },
    placeholders: { name: 'سارة الحربي', title: 'مديرة التسويق', company: 'استوديو المثال', phone: '+966 55 123 4567', email: 'sara@example.com', website: 'example.com', address: 'طريق الملك فهد، الرياض', logo: 'https://example.com/logo.png' },
    hints: {
      logo: 'اختياري. عنوان ويب لصورة. يُحمَّل في برنامج البريد لا في هذه الصفحة، لذا تُظهر المعاينة الأحرف الأولى من اسمك.',
    },
    errors: {
      email: 'هذا لا يبدو عنوان بريد إلكتروني.',
      phone: 'استخدم من 7 إلى 15 رقماً. المسافات والشرطات وعلامة + في البداية مقبولة.',
      website: 'اكتب عنوان موقع مثل example.com.',
      logo: 'اكتب عنوان ويب يبدأ بـ http أو https.',
    },
    templateLabel: 'التصميم',
    templates: { classic: 'كلاسيكي', bar: 'شريط جانبي', compact: 'مدمج' },
    accent: 'لون التمييز',
    preview: 'المعاينة',
    previewEmpty: 'اكتب اسمك لترى التوقيع.',
    loadExample: 'املأ بمثال',
    clear: 'امسح',
    copyRich: 'انسخ التوقيع',
    copyHtml: 'انسخ كود HTML',
    copyText: 'انسخ النص العادي',
    htmlLabel: 'كود HTML',
    howToPaste: {
      title: 'أين تلصقه',
      gmail: 'Gmail: الإعدادات، عرض كل الإعدادات، عام، التوقيع. الصق في الخانة واحفظ.',
      outlook: 'Outlook: الإعدادات، الحسابات، التواقيع. الصق في المحرر واحفظ.',
      apple: 'Apple Mail: الإعدادات، التواقيع. ألغِ تحديد «مطابقة خط رسالتي الافتراضي دائماً» ثم الصق.',
    },
    notice:
      'التوقيع جدول صغير بأنماط مضمّنة، تحتفظ بها أغلب برامج البريد. بعضها يحجب الصور حتى يسمح القارئ بها، وبعضها يغيّر الخطوط، لذا تحقق بإرسال رسالة تجريبية إلى نفسك. وتُصنع الروابط فقط من عناوين الويب وأرقام الهاتف والبريد التي تكتبها.',
    steps: [
      'املأ بياناتك واختر تصميماً ولون تمييز.',
      'اضغط «انسخ التوقيع» والصقه في خانة التوقيع في برنامج بريدك.',
      'أرسل رسالة تجريبية إلى نفسك لترى شكله على الجوال وعلى الحاسوب.',
    ],
    faq: [
      {
        q: 'كيف أضيف التوقيع إلى Gmail أو Outlook؟',
        a: 'اضغط «انسخ التوقيع»، وافتح إعدادات التوقيع في برنامج بريدك، والصق في المحرر واحفظ. وخطوات البرامج الشائعة مذكورة تحت المعاينة.',
      },
      {
        q: 'لماذا لا يظهر شعاري في المعاينة؟',
        a: 'الشعار صورة يحمّلها برنامج بريدك من العنوان الذي تعطيه. وعرضها هنا يعني أن هذه الصفحة تطلبها من موقع آخر، لذا تُظهر المعاينة الأحرف الأولى من اسمك. والشعار موجود في التوقيع المنسوخ.',
      },
      {
        q: 'لماذا لا يرى بعض القراء الشعار؟',
        a: 'تُخفي برامج بريد كثيرة الصور من مرسلين لا تعرفهم حتى يسمح القارئ بها. فأبقِ اسمك وبيانات الاتصال نصاً، كما يفعل هذا التوقيع، لتبقى مقروءة دائماً.',
      },
      {
        q: 'ماذا لو ضاع التنسيق عند اللصق؟',
        a: 'استخدم «انسخ كود HTML» إن كان في برنامجك مكان للصق HTML، أو اختر النص العادي. وبعض البرامج لا تقبل إلا توقيعاً مبنياً في محررها.',
      },
      {
        q: 'هل يُخزَّن أو يُرسَل شيء؟',
        a: 'لا. يُبنى التوقيع في متصفحك ولا يُرسل ما تكتبه إلى أي مكان.',
      },
    ],
    cta: {
      title: 'تريد أن يبدو بريدك بجودة موقعك؟',
      text: 'نُعدّ البريد باسم شركتك، وتوثيق النطاق، والأنظمة المحيطة به، فتصل رسائلك وتظهر كما يجب.',
      button: 'تعرّف على الحلول الرقمية',
    },
  },

  palette: {
    h1: 'ألوان من صورة',
    subtitle: 'أفلت شعاراً أو صورة لتحصل على ألوانها الرئيسية، مع رموزها ومدى وضوح النص فوق كل لون.',
    drop: {
      title: 'أفلت صورة هنا',
      hint: 'JPEG أو PNG أو WebP. تُقرأ على جهازك ولا تُرفع أبداً. ويمكنك لصق صورة أيضاً.',
      choose: 'اختر صورة',
    },
    sample: 'صورة مثال. أفلت صورتك لتحل محلها.',
    count: 'عدد الألوان',
    swatch: { copy: 'انسخ {hex}', copied: 'تم نسخ {hex}', share: '{n}% من الصورة' },
    notations: { hex: 'HEX', rgb: 'RGB', hsl: 'HSL' },
    contrast: {
      title: 'النص فوق كل لون',
      intro: 'نسبة التباين لنص أبيض ونص أسود فوق كل لون. 4.5 أو أكثر تجتاز AA للنص العادي، و7 أو أكثر تجتاز AAA.',
      white: 'نص أبيض',
      black: 'نص أسود',
      levels: { AAA: 'AAA', AA: 'AA', fail: 'لا يجتاز' },
      best: 'الأفضل',
    },
    export: { title: 'استخدم الألوان', css: 'متغيرات CSS', copyCss: 'انسخ CSS', copyHexes: 'انسخ كل رموز HEX' },
    errors: {
      type: 'اختر صورة JPEG أو PNG أو WebP.',
      decode: 'لم يستطع هذا المتصفح قراءة تلك الصورة.',
      empty: 'لا توجد بكسلات مرئية في تلك الصورة.',
    },
    notice:
      'تُستخرج الألوان من نسخة مصغّرة من الصورة، فهي قريبة من ألوان الملف لا مطابقة لها تماماً. وقد تغيّر الشاشة وملف الألوان فيها مظهر اللون. ويُحسب التباين بمعادلة WCAG 2 للنص الأبيض والأسود فقط.',
    steps: [
      'أفلت صورة على الصفحة، أو اخترها من جهازك.',
      'اختر عدد الألوان الذي تريده. تتحدث الألوان فوراً.',
      'اضغط لوناً لنسخ رمزه، وراجع التباين، وانسخ الألوان كلها بصيغة CSS.',
    ],
    faq: [
      {
        q: 'هل تُرفع صورتي؟',
        a: 'لا. يقرؤها متصفحك ويستخرج الألوان على جهازك. ولا يُرسل شيء إلى أي خادم.',
      },
      {
        q: 'كيف تُختار الألوان؟',
        a: 'تُصغَّر الصورة وتُقسم بكسلاتها إلى مجموعات متقاربة اللون. وتصبح كل مجموعة لوناً واحداً، يُعرض مع نسبة ما تغطيه من الصورة.',
      },
      {
        q: 'ماذا تعني نسبة التباين؟',
        a: 'تقارن سطوع لونين، من 1 (متطابقان) إلى 21 (أسود على أبيض). وتشترط WCAG ما لا يقل عن 4.5 للنص العادي و3 للنص الكبير ليتمكن ضعاف البصر من قراءته.',
      },
      {
        q: 'لماذا تختلف ألوان علامتي قليلاً؟',
        a: 'تحسب الأداة متوسط مجموعات من البكسلات في نسخة مصغّرة، وقد تحتوي الصورة على أثر الضغط والتنعيم. وللون العلامة الدقيق استخدم الرمز من دليل هويتك.',
      },
      {
        q: 'هل أستطيع استخدام الألوان تجارياً؟',
        a: 'الألوان نفسها مجرد أرقام، لكن الشعار أو الصورة قد يملكها غيرك. تأكد أن لك الحق في استخدام الصورة التي أُخذت منها الألوان.',
      },
    ],
    cta: {
      title: 'الألوان بداية الهوية',
      text: 'نحوّل الألوان إلى نظام تصميم كامل لموقعك وتطبيقك، مع التباين والوضع الداكن والمكوّنات المرافقة.',
      button: 'تعرّف على الحلول الرقمية',
    },
  },

  social: {
    h1: 'معاينة المشاركة الاجتماعية',
    subtitle: 'شاهد كيف قد يظهر الرابط عند مشاركته، وانسخ وسوم meta التي تتحكم فيه.',
    fields: {
      title: 'العنوان',
      description: 'الوصف',
      url: 'عنوان الصفحة',
      siteName: 'اسم الموقع',
      image: 'صورة المعاينة',
      imageUrl: 'عنوان الصورة للوسوم',
    },
    placeholders: {
      title: 'استوديو المثال: مواقع ومتاجر للعلامات النامية',
      description: 'نصمم ونبني مواقع ومتاجر إلكترونية سريعة بالعربية والإنجليزية.',
      url: 'https://example.com',
      siteName: 'استوديو المثال',
      imageUrl: 'https://example.com/share.jpg',
    },
    hints: {
      title: 'الإرشاد الشائع: من 30 إلى 60 حرفاً.',
      description: 'الإرشاد الشائع: من 70 إلى 160 حرفاً.',
      image: 'لهذه المعاينة فقط. تبقى على جهازك.',
      imageUrl: 'عنوان الصورة على موقعك. يُكتب في الوسوم ولا يُحمَّل هنا.',
    },
    chooseImage: 'اختر صورة',
    removeImage: 'أزل الصورة',
    status: { empty: 'فارغ', short: 'قصير', good: 'طول جيد', long: 'قد يُقتطع' },
    platformLabel: 'المنصة',
    platforms: { whatsapp: 'واتساب', x: 'X', linkedin: 'لينكدإن', facebook: 'فيسبوك' },
    card: {
      sampleTitle: 'يظهر عنوان صفحتك هنا',
      sampleDescription: 'يظهر وصفك هنا. قل ما تقدمه الصفحة في جملة واحدة واضحة.',
      sampleDomain: 'example.com',
      noImage: 'لا توجد صورة',
    },
    tagsLabel: 'وسوم meta',
    copyTags: 'انسخ الوسوم',
    tagsHint: 'الصقها داخل head الصفحة.',
    approximate:
      'هذه معاينات تقريبية. تقرر كل منصة كيف ترسم البطاقة، وقد تغيّرها، وقد تحتفظ بنسخة قديمة من صفحتك حتى تُحدَّث.',
    steps: [
      'اكتب عنوان الصفحة ووصفها وعنوانها، واختر صورة للمعاينة.',
      'بدّل بين واتساب وX ولينكدإن وفيسبوك لترى البطاقة في كل منها.',
      'انسخ وسوم meta والصقها في head صفحتك.',
    ],
    faq: [
      {
        q: 'ما وسوم meta للمشاركة؟',
        a: 'هي أسطر في head الصفحة، تسمى وسوم Open Graph وTwitter Card، تخبر واتساب وX ولينكدإن وفيسبوك وغيرها أي عنوان ووصف وصورة تعرض حين يشارك أحدهم الرابط.',
      },
      {
        q: 'لماذا ما زال الرابط المشارك يظهر ببطاقة قديمة؟',
        a: 'تحتفظ المنصات بنسخة من البطاقة لفترة. بعد تغيير الوسوم استخدم أداة المنصة نفسها لتحديثها، أو انتظر. ولا تستطيع هذه المعاينة أن تُظهر ما خزّنته المنصة.',
      },
      {
        q: 'أي مقاس صورة أستخدم؟',
        a: 'صورة عريضة، غالباً نحو 1200 في 630 بكسل، خيار شائع، ويجب أن تبقى مفهومة عند اقتصاصها. ولكل منصة قواعدها، فراجع وثائقها.',
      },
      {
        q: 'هل تُرفع صورتي؟',
        a: 'لا. تُعرض الصورة التي تختارها من جهازك ولا تُرسل إلى أي مكان. والعنوان الذي تكتبه للوسوم يُكتب في الكود فقط ولا يُحمَّل.',
      },
      {
        q: 'هل يُخزَّن أو يُرسَل شيء؟',
        a: 'لا. تُصنع المعاينة والوسوم في متصفحك ولا يُرسل ما تكتبه إلى أي مكان.',
      },
    ],
    cta: {
      title: 'الروابط التي تظهر جيداً يُنقر عليها',
      text: 'نُعدّ الوسوم وصور المشاركة والبيانات المنظمة على موقع كامل، بالعربية والإنجليزية، فتُشارَك كل صفحة بشكل جيد.',
      button: 'تعرّف على خدمات السيو',
    },
  },
};

export const batch4Content = { en, ar };
