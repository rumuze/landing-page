// Copy for the third batch of free tools: VAT calculator, ad budget calculator and image
// compressor. English and Arabic must keep the same shape (a test checks it).

const en = {
  hub: {
    vat: {
      title: 'VAT Calculator',
      text: 'Add VAT to a price or take it out of one for Saudi Arabia, the UAE, Bahrain, Oman, Egypt, Jordan or your own rate.',
    },
    adbudget: {
      title: 'Ad Budget Calculator',
      text: 'Work out what a number of sales or leads will cost, or what a budget can buy, from your own conversion rate and click price.',
    },
    imagecompress: {
      title: 'Image Compressor',
      text: 'Make JPEG, PNG and WebP images smaller and compare the result, without uploading them anywhere.',
    },
  },

  vat: {
    h1: 'VAT calculator',
    subtitle: 'Add VAT to a price or take it out of one, and see the receipt build up as you type.',
    country: 'Country',
    countries: { custom: 'Another rate' },
    customRate: 'VAT rate (%)',
    rateLabel: 'Standard rate',
    modeLabel: 'What do you want to do?',
    modes: { add: 'Add VAT', remove: 'Remove VAT' },
    amount: { add: 'Price before VAT', remove: 'Price including VAT' },
    amountHint: 'In your own currency. Commas and Arabic digits are fine.',
    errors: {
      amount: 'Enter an amount, such as 1250 or 99.50.',
      rate: 'Enter a rate between 0 and 100, with up to two decimals.',
    },
    receipt: {
      title: 'Receipt',
      net: 'Price before VAT',
      vat: 'VAT ({rate}%)',
      gross: 'Total including VAT',
      share: 'VAT is {share}% of the total',
      empty: 'Enter an amount to see the receipt.',
    },
    summary: '{net} before VAT + {vat} VAT ({rate}%) = {gross} in total',
    copySummary: 'Copy the summary',
    notice:
      'These are standard rates, checked in October 2026 against published tax summaries. Some goods and services are zero-rated or exempt, and rates can change, so confirm with your tax authority before you invoice. The VAT is rounded to the nearest cent, half up; currencies with three decimals, such as the Bahraini dinar and the Omani rial, are shown to two.',
    steps: [
      'Choose the country, or choose "Another rate" and type your own.',
      'Choose whether to add VAT to a price or take it out of one, then type the amount.',
      'Read the price before VAT, the VAT and the total on the receipt, and copy the summary if you need it.',
    ],
    faq: [
      {
        q: 'Which rates does it use?',
        a: 'The standard rate in each country: 15% in Saudi Arabia, 5% in the UAE, 10% in Bahrain, 5% in Oman, 14% in Egypt and 16% in Jordan. They were checked in October 2026 against published tax summaries.',
      },
      {
        q: 'How do I take VAT out of a price that already includes it?',
        a: 'Choose "Remove VAT" and type the total. The VAT is the total multiplied by the rate and divided by one plus the rate. For example, 115 at 15% is 100 plus 15 of VAT, not 100 minus 15%.',
      },
      {
        q: 'What about zero-rated and exempt goods?',
        a: 'This calculator applies one standard rate to the whole amount. Goods and services that are zero-rated or exempt follow their own rules, so check with your tax authority or accountant.',
      },
      {
        q: 'Why is there no Kuwait or Qatar?',
        a: 'They did not apply a general VAT when these rates were checked. If that changes, you can type the new rate with "Another rate".',
      },
      {
        q: 'Is anything stored or sent?',
        a: 'No. The calculation is done in your browser and nothing you type is sent anywhere.',
      },
    ],
    cta: {
      title: 'Selling online in the Gulf?',
      text: 'We build online stores and invoicing flows that handle VAT per country, in Arabic and English, from the first order.',
      button: 'See digital solutions',
    },
  },

  adbudget: {
    h1: 'Ad budget calculator',
    subtitle: 'Work out what a number of sales or leads will cost, or what a budget can buy, from your own numbers.',
    modeLabel: 'Start from',
    modes: { target: 'Results I want', budget: 'Budget I have' },
    fields: {
      target: 'Results wanted per month',
      budget: 'Monthly budget',
      conversionRate: 'Conversion rate (%)',
      cpc: 'Cost per click',
      ctr: 'Click-through rate (%)',
      aov: 'Value of one result',
      margin: 'Profit margin (%)',
    },
    hints: {
      target: 'Sales, leads or sign-ups.',
      budget: 'In your own currency.',
      conversionRate: 'The share of clicks that become a result.',
      cpc: 'The average price you pay for one click.',
      ctr: 'Optional. The share of people who see the ad and click it. Gives the number of views.',
      aov: 'Optional. For a sale, the average order value.',
      margin: 'Optional. The share of that value you keep as profit. Gives break-even and profit.',
    },
    optional: 'Optional',
    errors: {
      target: 'Enter a number above zero.',
      budget: 'Enter an amount above zero.',
      conversionRate: 'Enter a rate above 0 and up to 100.',
      cpc: 'Enter a price above zero.',
    },
    results: {
      budget: 'Monthly budget',
      cpa: 'Cost per result',
      funnel: { views: 'Views', clicks: 'Clicks', results: 'Results' },
      funnelNote: 'The bars show the order of the steps, not their real proportions.',
      revenue: 'Revenue',
      roas: 'Return on ad spend',
      breakEven: 'Break-even return',
      profit: 'Profit after ads',
      empty: 'Fill in the numbers to see the plan.',
    },
    verdict: {
      profit: 'At these numbers the ads earn back their cost and leave {value} of profit.',
      loss: 'At these numbers the ads do not earn back their cost. The loss is {value}.',
      roasOnly: 'Each unit spent returns {roas}. Add your profit margin to see whether that is profitable.',
    },
    example: 'These are example numbers. Replace them with yours.',
    clear: 'Clear',
    copySummary: 'Copy the plan',
    summary: 'Ad plan: {results} results from {clicks} clicks. Budget {budget}, cost per result {cpa}.',
    notice:
      'This is arithmetic on the numbers you enter. Conversion rates and click prices differ by market, product and campaign, so use figures from your own ad accounts rather than averages. Nothing here predicts what a campaign will do.',
    steps: [
      'Choose whether you start from the results you want or from the budget you have.',
      'Enter your conversion rate and cost per click. Add the optional numbers to see views, revenue and profit.',
      'Read the plan and the verdict, and change a number to see how the result moves.',
    ],
    faq: [
      {
        q: 'Where do I find my conversion rate and cost per click?',
        a: 'In your ad account: the platform reports clicks, cost and results for each campaign. Divide results by clicks for the conversion rate and cost by clicks for the cost per click. Use your own recent figures.',
      },
      {
        q: 'What is break-even return?',
        a: 'It is the return on ad spend at which the ads exactly pay for themselves. It is one divided by your profit margin: at a 40% margin it is 2.5, so each unit spent must bring back 2.5 in revenue.',
      },
      {
        q: 'Why are the clicks rounded up?',
        a: 'To reach the results you want you need at least that many clicks, so a part of a click is counted as a whole one.',
      },
      {
        q: 'Does this predict my results?',
        a: 'No. It shows what your own assumptions lead to. If the assumptions are wrong the plan will be wrong, so test with a small budget and update the numbers.',
      },
      {
        q: 'Is anything stored or sent?',
        a: 'No. The calculation is done in your browser and nothing you type is sent anywhere.',
      },
    ],
    cta: {
      title: 'Want the numbers to hold up in real campaigns?',
      text: 'We set up tracking and campaigns so conversion rate, cost per click and return are measured, not guessed, and the budget goes where it earns.',
      button: 'See paid advertising',
    },
  },

  imagecompress: {
    h1: 'Image compressor',
    subtitle: 'Make JPEG, PNG and WebP images smaller and compare the result. Your images never leave your device.',
    drop: {
      title: 'Drop images here',
      hint: 'JPEG, PNG or WebP, up to 10 images of 30 MB each. You can also paste an image.',
      choose: 'Choose images',
    },
    settings: {
      format: 'Save as',
      formats: { webp: 'WebP', jpeg: 'JPEG' },
      quality: 'Quality',
      qualityHint: 'Lower is smaller, higher keeps more detail.',
      maxWidth: 'Largest width',
      widths: { original: 'Original size', limit: 'Up to {n} px wide' },
    },
    item: {
      before: 'Before',
      after: 'After',
      saved: 'Saved {n}%',
      working: 'Compressing…',
      kept: 'Already small. The original is kept.',
      download: 'Download',
      remove: 'Remove',
      show: 'Compare',
      dimensions: '{w} × {h} px',
    },
    clear: 'Clear all',
    totals: 'Total: {before} to {after}',
    compare: {
      label: 'Compare the original and the compressed image',
      original: 'Original',
      compressed: 'Compressed',
    },
    errors: {
      type: '{name} is not a JPEG, PNG or WebP image.',
      size: '{name} is larger than 30 MB.',
      tooMany: 'Only the first 10 images were added.',
      decode: '{name} could not be read by this browser.',
      encode: 'This browser cannot save images in that format. Try the other one.',
    },
    notice:
      'The image is re-encoded in your browser, so the details you remove with a lower quality cannot be brought back; keep your originals. Metadata such as camera details and location is not kept in the new file. JPEG has no transparency, so transparent areas become white. Results depend on the picture.',
    steps: [
      'Drop your images on the page, or choose them from your device.',
      'Pick the format, the quality and the largest width. The images are compressed again as you change them.',
      'Compare the original and the new image with the slider, then download the ones you like.',
    ],
    faq: [
      {
        q: 'Are my images uploaded?',
        a: 'No. They are read and compressed by your browser on your device. Nothing is sent to a server.',
      },
      {
        q: 'Which format should I choose?',
        a: 'WebP is usually the smallest at the same quality and works in current browsers. Choose JPEG when you need a file that opens everywhere, such as in older software or email.',
      },
      {
        q: 'What quality should I use?',
        a: 'Many photos look fine at around 75 to 85, but it depends on the picture, so use the slider to compare. Lower the largest width as well when the image is shown smaller than its real size.',
      },
      {
        q: 'Why did a file stay the same size?',
        a: 'Some images are already well compressed. When the new file would be larger, the tool keeps your original instead of giving you a worse one.',
      },
      {
        q: 'Will the picture lose quality?',
        a: 'Compression at a lower quality removes some detail, which is how it makes the file smaller. At a high quality the difference is hard to see, and the comparison slider lets you judge it yourself.',
      },
    ],
    cta: {
      title: 'Heavy images slow a site down',
      text: 'We build sites that serve the right size and format of every image, load fast on mobile, and score well on Core Web Vitals.',
      button: 'See digital solutions',
    },
  },
};

const ar = {
  hub: {
    vat: {
      title: 'حاسبة ضريبة القيمة المضافة',
      text: 'أضف الضريبة إلى سعر أو استخرجها منه للسعودية والإمارات والبحرين وعُمان ومصر والأردن أو بنسبة تحددها.',
    },
    adbudget: {
      title: 'حاسبة ميزانية الإعلانات',
      text: 'اعرف تكلفة عدد من المبيعات أو العملاء المحتملين، أو ما تشتريه ميزانيتك، من نسبة تحويلك وسعر نقرتك.',
    },
    imagecompress: {
      title: 'ضاغط الصور',
      text: 'صغّر صور JPEG وPNG وWebP وقارن النتيجة، دون رفعها إلى أي مكان.',
    },
  },

  vat: {
    h1: 'حاسبة ضريبة القيمة المضافة',
    subtitle: 'أضف الضريبة إلى سعر أو استخرجها منه، وشاهد الإيصال يتكوّن وأنت تكتب.',
    country: 'الدولة',
    countries: { custom: 'نسبة أخرى' },
    customRate: 'نسبة الضريبة (%)',
    rateLabel: 'النسبة الأساسية',
    modeLabel: 'ماذا تريد؟',
    modes: { add: 'إضافة الضريبة', remove: 'استخراج الضريبة' },
    amount: { add: 'السعر قبل الضريبة', remove: 'السعر شامل الضريبة' },
    amountHint: 'بعملتك أنت. الفواصل والأرقام العربية مقبولة.',
    errors: {
      amount: 'اكتب مبلغاً مثل 1250 أو 99.50.',
      rate: 'اكتب نسبة بين 0 و100، بكسرين عشريين على الأكثر.',
    },
    receipt: {
      title: 'الإيصال',
      net: 'السعر قبل الضريبة',
      vat: 'الضريبة ({rate}%)',
      gross: 'الإجمالي شامل الضريبة',
      share: 'الضريبة {share}% من الإجمالي',
      empty: 'اكتب مبلغاً لترى الإيصال.',
    },
    summary: '{net} قبل الضريبة + {vat} ضريبة ({rate}%) = {gross} إجمالاً',
    copySummary: 'انسخ الملخص',
    notice:
      'هذه هي النسب الأساسية، وقد روجعت في أكتوبر 2026 على ملخصات ضريبية منشورة. بعض السلع والخدمات خاضعة لنسبة صفرية أو معفاة، وقد تتغير النسب، فتأكد من الهيئة الضريبية قبل إصدار الفواتير. تُقرَّب الضريبة إلى أقرب هللة، مع رفع المنتصف؛ والعملات ذات الخانات الثلاث مثل الدينار البحريني والريال العُماني تُعرض بخانتين.',
    steps: [
      'اختر الدولة، أو اختر «نسبة أخرى» واكتب نسبتك.',
      'اختر هل تضيف الضريبة إلى سعر أم تستخرجها منه، ثم اكتب المبلغ.',
      'اقرأ السعر قبل الضريبة والضريبة والإجمالي في الإيصال، وانسخ الملخص إن احتجته.',
    ],
    faq: [
      {
        q: 'ما النسب التي تستخدمها؟',
        a: 'النسبة الأساسية في كل دولة: 15% في السعودية، و5% في الإمارات، و10% في البحرين، و5% في عُمان، و14% في مصر، و16% في الأردن. وقد روجعت في أكتوبر 2026 على ملخصات ضريبية منشورة.',
      },
      {
        q: 'كيف أستخرج الضريبة من سعر شامل لها؟',
        a: 'اختر «استخراج الضريبة» واكتب الإجمالي. الضريبة هي الإجمالي مضروباً في النسبة ومقسوماً على واحد زائد النسبة. فمثلاً 115 بنسبة 15% تساوي 100 زائد 15 ضريبة، وليست 100 ناقص 15%.',
      },
      {
        q: 'ماذا عن السلع ذات النسبة الصفرية والمعفاة؟',
        a: 'تطبّق الحاسبة نسبة أساسية واحدة على المبلغ كله. أما السلع والخدمات ذات النسبة الصفرية أو المعفاة فلها قواعدها، فراجع الهيئة الضريبية أو المحاسب.',
      },
      {
        q: 'لماذا لا توجد الكويت وقطر؟',
        a: 'لم تكونا تطبقان ضريبة قيمة مضافة عامة عند مراجعة هذه النسب. وإن تغير ذلك فيمكنك كتابة النسبة الجديدة عبر «نسبة أخرى».',
      },
      {
        q: 'هل يُخزَّن أو يُرسَل شيء؟',
        a: 'لا. تُجرى الحسبة في متصفحك ولا يُرسل ما تكتبه إلى أي مكان.',
      },
    ],
    cta: {
      title: 'تبيع عبر الإنترنت في الخليج؟',
      text: 'نبني متاجر إلكترونية ومسارات فوترة تتعامل مع الضريبة لكل دولة، بالعربية والإنجليزية، من أول طلب.',
      button: 'تعرّف على الحلول الرقمية',
    },
  },

  adbudget: {
    h1: 'حاسبة ميزانية الإعلانات',
    subtitle: 'اعرف تكلفة عدد من المبيعات أو العملاء المحتملين، أو ما تشتريه ميزانيتك، من أرقامك أنت.',
    modeLabel: 'ابدأ من',
    modes: { target: 'النتائج التي أريدها', budget: 'الميزانية التي أملكها' },
    fields: {
      target: 'النتائج المطلوبة شهرياً',
      budget: 'الميزانية الشهرية',
      conversionRate: 'نسبة التحويل (%)',
      cpc: 'تكلفة النقرة',
      ctr: 'نسبة النقر (%)',
      aov: 'قيمة النتيجة الواحدة',
      margin: 'هامش الربح (%)',
    },
    hints: {
      target: 'مبيعات أو عملاء محتملون أو تسجيلات.',
      budget: 'بعملتك أنت.',
      conversionRate: 'نسبة النقرات التي تتحول إلى نتيجة.',
      cpc: 'متوسط ما تدفعه مقابل نقرة واحدة.',
      ctr: 'اختياري. نسبة من يرون الإعلان وينقرون عليه. تعطي عدد المشاهدات.',
      aov: 'اختياري. في البيع هي متوسط قيمة الطلب.',
      margin: 'اختياري. نسبة ما تحتفظ به ربحاً من تلك القيمة. تعطي نقطة التعادل والربح.',
    },
    optional: 'اختياري',
    errors: {
      target: 'اكتب رقماً أكبر من صفر.',
      budget: 'اكتب مبلغاً أكبر من صفر.',
      conversionRate: 'اكتب نسبة أكبر من 0 وحتى 100.',
      cpc: 'اكتب سعراً أكبر من صفر.',
    },
    results: {
      budget: 'الميزانية الشهرية',
      cpa: 'تكلفة النتيجة',
      funnel: { views: 'المشاهدات', clicks: 'النقرات', results: 'النتائج' },
      funnelNote: 'الأشرطة تُظهر ترتيب الخطوات لا نسبها الحقيقية.',
      revenue: 'الإيراد',
      roas: 'العائد على الإنفاق الإعلاني',
      breakEven: 'عائد التعادل',
      profit: 'الربح بعد الإعلانات',
      empty: 'املأ الأرقام لترى الخطة.',
    },
    verdict: {
      profit: 'بهذه الأرقام تسترد الإعلانات تكلفتها ويبقى لك ربح قدره {value}.',
      loss: 'بهذه الأرقام لا تسترد الإعلانات تكلفتها. الخسارة {value}.',
      roasOnly: 'كل وحدة تنفقها تعود بـ {roas}. أضف هامش ربحك لترى هل هذا مربح.',
    },
    example: 'هذه أرقام مثال. استبدلها بأرقامك.',
    clear: 'امسح',
    copySummary: 'انسخ الخطة',
    summary: 'خطة إعلانية: {results} نتيجة من {clicks} نقرة. الميزانية {budget}، وتكلفة النتيجة {cpa}.',
    notice:
      'هذه حسبة على الأرقام التي تدخلها. تختلف نسب التحويل وأسعار النقرات بحسب السوق والمنتج والحملة، فاستخدم أرقاماً من حساباتك الإعلانية بدل المتوسطات. ولا يتنبأ شيء هنا بما ستفعله الحملة.',
    steps: [
      'اختر هل تبدأ من النتائج التي تريدها أم من الميزانية التي تملكها.',
      'أدخل نسبة التحويل وتكلفة النقرة. وأضف الأرقام الاختيارية لترى المشاهدات والإيراد والربح.',
      'اقرأ الخطة والحكم، وغيّر رقماً لترى كيف تتحرك النتيجة.',
    ],
    faq: [
      {
        q: 'أين أجد نسبة التحويل وتكلفة النقرة؟',
        a: 'في حسابك الإعلاني: تعرض المنصة النقرات والتكلفة والنتائج لكل حملة. اقسم النتائج على النقرات لنسبة التحويل، والتكلفة على النقرات لتكلفة النقرة. واستخدم أرقامك الحديثة أنت.',
      },
      {
        q: 'ما عائد التعادل؟',
        a: 'هو العائد على الإنفاق الإعلاني الذي تغطي عنده الإعلانات تكلفتها بالضبط. وهو واحد مقسوماً على هامش الربح: عند هامش 40% يكون 2.5، أي يجب أن تعود كل وحدة منفقة بـ 2.5 إيراداً.',
      },
      {
        q: 'لماذا تُقرَّب النقرات إلى الأعلى؟',
        a: 'للوصول إلى النتائج التي تريدها تحتاج على الأقل هذا العدد من النقرات، فيُحسب جزء النقرة نقرة كاملة.',
      },
      {
        q: 'هل تتنبأ هذه الحاسبة بنتائجي؟',
        a: 'لا. إنها تُظهر إلى ماذا تقود افتراضاتك أنت. فإن كانت الافتراضات خاطئة كانت الخطة خاطئة، لذا جرّب بميزانية صغيرة وحدّث الأرقام.',
      },
      {
        q: 'هل يُخزَّن أو يُرسَل شيء؟',
        a: 'لا. تُجرى الحسبة في متصفحك ولا يُرسل ما تكتبه إلى أي مكان.',
      },
    ],
    cta: {
      title: 'تريد أن تصمد الأرقام في الحملات الفعلية؟',
      text: 'نُعدّ التتبع والحملات بحيث تُقاس نسبة التحويل وتكلفة النقرة والعائد ولا تُخمَّن، وتذهب الميزانية إلى حيث تربح.',
      button: 'تعرّف على الإعلانات المدفوعة',
    },
  },

  imagecompress: {
    h1: 'ضاغط الصور',
    subtitle: 'صغّر صور JPEG وPNG وWebP وقارن النتيجة. صورك لا تغادر جهازك.',
    drop: {
      title: 'أفلت الصور هنا',
      hint: 'JPEG أو PNG أو WebP، حتى 10 صور بحجم 30 ميغابايت لكل منها. ويمكنك لصق صورة أيضاً.',
      choose: 'اختر الصور',
    },
    settings: {
      format: 'احفظ بصيغة',
      formats: { webp: 'WebP', jpeg: 'JPEG' },
      quality: 'الجودة',
      qualityHint: 'الأقل أصغر حجماً، والأعلى يحتفظ بتفاصيل أكثر.',
      maxWidth: 'أكبر عرض',
      widths: { original: 'الحجم الأصلي', limit: 'حتى {n} بكسل عرضاً' },
    },
    item: {
      before: 'قبل',
      after: 'بعد',
      saved: 'وفّرت {n}%',
      working: 'جارٍ الضغط…',
      kept: 'الصورة صغيرة أصلاً. تم الإبقاء على الأصل.',
      download: 'نزّل',
      remove: 'احذف',
      show: 'قارن',
      dimensions: '{w} × {h} بكسل',
    },
    clear: 'امسح الكل',
    totals: 'الإجمالي: من {before} إلى {after}',
    compare: {
      label: 'قارن بين الصورة الأصلية والمضغوطة',
      original: 'الأصل',
      compressed: 'المضغوطة',
    },
    errors: {
      type: '{name} ليست صورة JPEG أو PNG أو WebP.',
      size: '{name} أكبر من 30 ميغابايت.',
      tooMany: 'أُضيفت أول 10 صور فقط.',
      decode: 'لم يستطع هذا المتصفح قراءة {name}.',
      encode: 'لا يستطيع هذا المتصفح حفظ الصور بهذه الصيغة. جرّب الأخرى.',
    },
    notice:
      'تُعاد كتابة الصورة داخل متصفحك، فالتفاصيل التي تزيلها بجودة أقل لا يمكن استرجاعها؛ فاحتفظ بأصولك. ولا تُحفظ في الملف الجديد البيانات الوصفية مثل بيانات الكاميرا والموقع. وJPEG لا يدعم الشفافية، فتصبح المناطق الشفافة بيضاء. وتختلف النتائج بحسب الصورة.',
    steps: [
      'أفلت صورك على الصفحة، أو اخترها من جهازك.',
      'اختر الصيغة والجودة وأكبر عرض. تُضغط الصور من جديد كلما غيّرت.',
      'قارن الأصل بالصورة الجديدة بالشريط، ثم نزّل ما يعجبك.',
    ],
    faq: [
      {
        q: 'هل تُرفع صوري؟',
        a: 'لا. يقرؤها متصفحك ويضغطها على جهازك. ولا يُرسل شيء إلى أي خادم.',
      },
      {
        q: 'أي صيغة أختار؟',
        a: 'WebP هو الأصغر عادةً بالجودة نفسها، ويعمل في المتصفحات الحديثة. واختر JPEG عندما تريد ملفاً يُفتح في كل مكان، كالبرامج القديمة والبريد.',
      },
      {
        q: 'ما الجودة التي أستخدمها؟',
        a: 'تبدو كثير من الصور جيدة عند نحو 75 إلى 85، لكن ذلك يعتمد على الصورة، فاستخدم الشريط للمقارنة. وخفّض أكبر عرض أيضاً حين تُعرض الصورة أصغر من حجمها الحقيقي.',
      },
      {
        q: 'لماذا بقي ملف بالحجم نفسه؟',
        a: 'بعض الصور مضغوطة جيداً أصلاً. وعندما يكون الملف الجديد أكبر تُبقي الأداة على أصلك بدل أن تعطيك أسوأ منه.',
      },
      {
        q: 'هل تفقد الصورة جودتها؟',
        a: 'الضغط بجودة أقل يزيل بعض التفاصيل، وبهذا يصغّر الملف. وعند جودة عالية يصعب ملاحظة الفرق، ويتيح لك شريط المقارنة أن تحكم بنفسك.',
      },
    ],
    cta: {
      title: 'الصور الثقيلة تبطّئ الموقع',
      text: 'نبني مواقع تقدّم لكل صورة الحجم والصيغة المناسبين، وتحمَّل بسرعة على الجوال، وتحقق نتائج جيدة في Core Web Vitals.',
      button: 'تعرّف على الحلول الرقمية',
    },
  },
};

export const batch3Content = { en, ar };
