// Copy for the sixth batch of free tools: JSON formatter, favicon generator, and CSS unit converter.
// English and Arabic must keep the same shape (a test checks it).

const en = {
  hub: {
    json: {
      title: 'JSON Formatter and Validator',
      text: 'Check JSON, find the exact line of a mistake, then format it, minify it or sort its keys.',
    },
    favicon: {
      title: 'Favicon Generator',
      text: 'Make a favicon from letters, an emoji or a picture, with every size, favicon.ico and the code to paste.',
    },
    cssunits: {
      title: 'CSS Unit Converter and Fluid Type',
      text: 'Convert px and rem, build a type scale, and write a clamp() size that grows smoothly with the screen.',
    },
  },

  json: {
    h1: 'JSON formatter and validator',
    subtitle: 'Paste JSON to check it. A mistake is shown with its line and column; valid JSON can be formatted, minified or sorted. Nothing leaves your browser.',
    inputLabel: 'Your JSON',
    placeholder: '{"name": "value"}',
    example: 'Fill with an example',
    clear: 'Clear',
    modeLabel: 'What to do',
    modes: { format: 'Format', minify: 'Minify' },
    indentLabel: 'Indentation',
    indents: { 2: '2 spaces', 4: '4 spaces', tab: 'Tab' },
    sortKeys: 'Sort keys A to Z',
    valid: 'Valid JSON.',
    invalid: 'This is not valid JSON.',
    invalidAt: 'Not valid JSON: the problem is at line {line}, column {column}.',
    hints: {
      notJson: 'JSON starts with { or [. Is something before it, such as a variable name or a log prefix?',
      trailingComma: 'There is a comma before a closing } or ]. JSON does not allow a trailing comma.',
      singleQuotes: 'Strings and keys need double quotes ("), not single quotes (\').',
      comments: 'JSON does not allow comments. Remove the // or /* … */ parts.',
      unquotedKey: 'Keys must be in double quotes, for example "name": 1 and not name: 1.',
      badValue: 'undefined, NaN and Infinity are not JSON values. Use null, a number, or a string.',
    },
    empty: 'Paste JSON on the left and the result appears here.',
    output: 'Formatted JSON',
    cut: 'Showing the first {n} of {total} lines. Copy and download include all of it.',
    copy: 'Copy',
    download: 'Download .json',
    stats: { keys: 'Keys', depth: 'Depth', bytes: 'Bytes', saved: 'Smaller by', added: 'Size change' },
    types: { object: 'objects', array: 'arrays', string: 'strings', number: 'numbers', boolean: 'booleans', null: 'nulls' },
    unsafeNumber: 'A whole number in this JSON is too large to keep exactly. The result may round it. If it is an id, keep it as a string.',
    notice:
      'The JSON is read by your browser. Duplicate keys keep the last value, and very large numbers may be rounded, as in JavaScript. The line shown for a mistake is where the text first stops being valid, which can be just after the real cause.',
    steps: [
      'Paste your JSON in the box.',
      'If there is a mistake, go to the line and column shown and read the hint under it.',
      'Choose Format or Minify, then copy the result or download it as a file.',
    ],
    faq: [
      {
        q: 'What is the difference between formatting and minifying?',
        a: 'Formatting adds line breaks and indentation so people can read the data. Minifying removes all the extra spaces so the file is as small as possible. The data is the same either way.',
      },
      {
        q: 'Why does it say my JSON is not valid when it works in my code?',
        a: 'JavaScript objects allow things JSON does not: single quotes, keys without quotes, comments and a trailing comma. Fix those and it will pass.',
      },
      {
        q: 'Does sorting keys change my data?',
        a: 'It changes only the order of keys inside objects, which has no meaning in JSON. The order of items in an array is kept as it is.',
      },
      {
        q: 'Why is a long number changed?',
        a: 'Browsers read JSON numbers as floating point, which is exact only up to 9,007,199,254,740,991. A longer whole number, such as a long id, is rounded. The page warns you when it sees one.',
      },
      {
        q: 'Is my JSON stored or sent?',
        a: 'No. It is checked and formatted in your browser and never sent anywhere.',
      },
    ],
    cta: {
      title: 'Data that moves between your systems',
      text: 'We build the integrations and APIs that connect your store, CRM and tools, with clean data on both sides.',
      button: 'Explore digital solutions',
    },
  },

  favicon: {
    h1: 'Favicon generator',
    subtitle: 'Make the small icon for browser tabs and phone home screens from letters, an emoji or a picture. You get every size, a favicon.ico and the code to paste.',
    textLabel: 'Letters or an emoji',
    textHint: 'One or two characters work best.',
    shapeLabel: 'Shape',
    shapes: { square: 'Square', rounded: 'Rounded', circle: 'Circle' },
    background: 'Background',
    letters: 'Letters',
    lowContrast: 'The letters and the background are close in colour (contrast {ratio}:1). At 16 pixels the icon may be hard to read. Pick colours that differ more.',
    pictureLabel: 'Or use a picture',
    choosePicture: 'Choose a picture',
    removePicture: 'Remove the picture',
    pictureHint: 'PNG, JPG, WebP or SVG. It is cut to a square from the middle.',
    errors: {
      type: 'Choose a PNG, JPG, WebP or SVG file.',
      size: 'That file is larger than 8 MB.',
      read: 'This picture could not be opened.',
    },
    siteName: 'Site name',
    tabNote: 'How the icon looks in a browser tab.',
    iconLabel: 'Icon at {size} pixels',
    saveOne: 'Download the {size} pixel PNG',
    saveAll: 'Download everything',
    head: {
      title: 'Code for your <head>',
      text: 'Put the files at the root of your site, then paste this inside the head of every page.',
    },
    manifest: {
      title: 'site.webmanifest',
      text: 'Lets phones use the two larger icons when the site is added to the home screen.',
    },
    copy: 'Copy',
    notice:
      'The icons are drawn in your browser from what you chose. Letters use the fonts on your device, so check the result at 16 pixels before you publish. Browsers keep favicons for a long time, so a new icon can take a while to show.',
    steps: [
      'Type one or two letters or an emoji, or choose a picture, then pick the shape and colours.',
      'Look at the small sizes in the tab preview and fix the contrast if it warns you.',
      'Download everything, upload the files to the root of your site and paste the code into your head.',
    ],
    faq: [
      {
        q: 'Which files do I need?',
        a: 'favicon.ico for older browsers and tools, the 16 and 32 pixel PNGs for tabs, the 180 pixel apple-touch-icon for iPhones, and the 192 and 512 pixel icons for Android through the manifest. The download includes them all.',
      },
      {
        q: 'Where do the files go?',
        a: 'At the root of your site, so that they open at /favicon.ico and /apple-touch-icon.png. Then paste the code shown into the head of your pages. A website builder usually has a place to upload a favicon instead.',
      },
      {
        q: 'Why is my new favicon not showing?',
        a: 'Browsers cache favicons hard. Close the tab, reload with the cache cleared, or open the site in a private window. It can still take a day to change in search results.',
      },
      {
        q: 'Can I use a logo with a transparent background?',
        a: 'Yes. The shape is filled with the background colour you pick, and the picture is drawn on top of it, so transparent parts show that colour.',
      },
      {
        q: 'Is my picture uploaded?',
        a: 'No. It is drawn on a canvas in your browser and never sent anywhere.',
      },
    ],
    cta: {
      title: 'A brand that looks right everywhere',
      text: 'From the logo to the favicon to the social cards, we make identities that stay sharp at every size.',
      button: 'See our design work',
    },
  },

  cssunits: {
    h1: 'CSS unit converter and fluid type',
    subtitle: 'Convert pixels to rem, build a type scale, and write a clamp() size that grows smoothly between two screen widths.',
    convert: {
      title: 'Convert',
      value: 'Value',
      invalid: 'Enter a number.',
      from: 'Convert from',
      base: 'Root font size (px)',
      baseHint: 'Browsers use 16 unless the site changes it.',
      copy: 'Copy the rem value',
    },
    table: {
      title: 'Common sizes',
      text: 'The usual pixel sizes in rem, with a root size of {base}px. Choose one to convert it.',
    },
    scale: {
      title: 'Type scale',
      text: 'Each step is the one before it multiplied by a ratio. Pick a base size and a ratio.',
      base: 'Base size (px)',
      ratio: 'Ratio',
      ratios: { minorThird: 'Minor third', majorThird: 'Major third', perfectFourth: 'Perfect fourth', goldenRatio: 'Golden' },
      sample: 'The quick brown fox',
    },
    fluid: {
      title: 'Fluid size with clamp()',
      text: 'Choose the smallest and largest size and the screen widths between which the size grows. Move the slider to see it.',
      minSize: 'Smallest size (px)',
      maxSize: 'Largest size (px)',
      minWidth: 'From screen width (px)',
      maxWidth: 'To screen width (px)',
      output: 'CSS',
      copy: 'Copy the CSS',
      try: 'Try a screen width',
      sample: 'A heading that grows',
      invalid: 'Enter a number above zero in each of the four boxes.',
    },
    notice:
      'rem follows the root font size, so a visitor who raises the text size in their browser gets larger text. Using vw alone can stop that, which is why the middle value of clamp() adds a rem part. Check zoom and large text settings on real devices.',
    steps: [
      'Enter a value and choose px or rem to convert, with your root font size if it is not 16.',
      'Pick a base size and a ratio to see a type scale in px and rem.',
      'Enter the smallest and largest size and the screen widths, then copy the clamp() line.',
    ],
    faq: [
      {
        q: 'Why use rem instead of px?',
        a: 'rem is relative to the root font size, so text and spacing grow when a visitor makes the text larger in their browser. Pixels do not follow that setting.',
      },
      {
        q: 'What is the difference between rem and em?',
        a: 'rem is always relative to the root font size. em is relative to the font size of the element it is on, so it can compound when elements are nested. The numbers here are the same only when the element has the root size.',
      },
      {
        q: 'How does clamp() make a size fluid?',
        a: 'clamp(min, preferred, max) uses the preferred value but never goes below the minimum or above the maximum. The preferred value here is a straight line between your two sizes, so it grows smoothly from one to the other.',
      },
      {
        q: 'Why does the middle value have a rem part and a vw part?',
        a: 'A line is a starting offset plus a slope. The slope is the vw part and the offset is the rem part. Keeping the offset in rem lets the size still respond when the visitor changes their text size.',
      },
      {
        q: 'Is anything I enter sent anywhere?',
        a: 'No. The numbers are worked out in your browser.',
      },
    ],
    cta: {
      title: 'Typography that fits every screen',
      text: 'We build design systems and responsive sites where type, spacing and layout scale cleanly from a phone to a wide monitor.',
      button: 'Explore digital solutions',
    },
  },
};

const ar = {
  hub: {
    json: {
      title: 'منسّق JSON ومدقّقه',
      text: 'افحص JSON، واعرف سطر الخطأ بدقة، ثم نسّقه أو ضغطه أو رتّب مفاتيحه.',
    },
    favicon: {
      title: 'مولّد أيقونة الموقع Favicon',
      text: 'اصنع أيقونة الموقع من حروف أو إيموجي أو صورة، بكل الأحجام وملف favicon.ico والكود الجاهز للصق.',
    },
    cssunits: {
      title: 'محوّل وحدات CSS والخط المتجاوب',
      text: 'حوّل بين px وrem، وابنِ سلّم خطوط، واكتب حجماً بـ clamp() يكبر بسلاسة مع الشاشة.',
    },
  },

  json: {
    h1: 'منسّق JSON ومدقّقه',
    subtitle: 'الصق JSON لتفحصه. يظهر الخطأ برقم سطره وعموده، ويمكن تنسيق الصحيح منه أو ضغطه أو ترتيب مفاتيحه. ولا يغادر شيء متصفحك.',
    inputLabel: 'نص JSON',
    placeholder: '{"name": "value"}',
    example: 'املأ بمثال',
    clear: 'امسح',
    modeLabel: 'ماذا تريد',
    modes: { format: 'تنسيق', minify: 'ضغط' },
    indentLabel: 'المسافة البادئة',
    indents: { 2: 'مسافتان', 4: '٤ مسافات', tab: 'Tab' },
    sortKeys: 'رتّب المفاتيح أبجدياً',
    valid: 'JSON صحيح.',
    invalid: 'هذا ليس JSON صحيحاً.',
    invalidAt: 'ليس JSON صحيحاً: المشكلة في السطر {line}، العمود {column}.',
    hints: {
      notJson: 'يبدأ JSON بـ { أو [. هل قبله شيء مثل اسم متغير أو بادئة سجل؟',
      trailingComma: 'هناك فاصلة قبل } أو ] الختامية. لا يسمح JSON بفاصلة زائدة في الآخر.',
      singleQuotes: 'النصوص والمفاتيح تحتاج علامات اقتباس مزدوجة (")، لا مفردة (\').',
      comments: 'لا يسمح JSON بالتعليقات. احذف الأجزاء التي تبدأ بـ // أو /* … */.',
      unquotedKey: 'يجب أن تكون المفاتيح بين علامتي اقتباس مزدوجتين، مثل "name": 1 لا name: 1.',
      badValue: 'القيم undefined وNaN وInfinity ليست من JSON. استخدم null أو رقماً أو نصاً.',
    },
    empty: 'الصق JSON في الجهة الأخرى وتظهر النتيجة هنا.',
    output: 'JSON منسّق',
    cut: 'يظهر أول {n} من {total} سطر. النسخ والتنزيل يشملان كل النص.',
    copy: 'انسخ',
    download: 'نزّل .json',
    stats: { keys: 'المفاتيح', depth: 'العمق', bytes: 'البايتات', saved: 'أصغر بنسبة', added: 'تغيّر الحجم' },
    types: { object: 'كائنات', array: 'مصفوفات', string: 'نصوص', number: 'أرقام', boolean: 'منطقية', null: 'null' },
    unsafeNumber: 'في هذا JSON رقم صحيح أكبر من أن يُحفظ بدقة، وقد تقرّبه النتيجة. إن كان معرّفاً فاحفظه نصاً.',
    notice:
      'يقرأ متصفحك الـ JSON. المفتاح المكرر يحتفظ بآخر قيمة، وقد تُقرَّب الأرقام الكبيرة جداً كما في JavaScript. والسطر المعروض للخطأ هو الموضع الذي يتوقف عنده النص عن الصحة أول مرة، وقد يكون بعد السبب الحقيقي بقليل.',
    steps: [
      'الصق الـ JSON في الصندوق.',
      'إن وُجد خطأ فاذهب إلى السطر والعمود المعروضين واقرأ التلميح تحته.',
      'اختر «تنسيق» أو «ضغط»، ثم انسخ النتيجة أو نزّلها ملفاً.',
    ],
    faq: [
      {
        q: 'ما الفرق بين التنسيق والضغط؟',
        a: 'التنسيق يضيف أسطراً ومسافات ليقرأ الناس البيانات. والضغط يحذف كل المسافات الزائدة ليصغر الملف قدر الإمكان. والبيانات واحدة في الحالتين.',
      },
      {
        q: 'لماذا تقول إن JSON غير صحيح وهو يعمل في كودي؟',
        a: 'كائنات JavaScript تسمح بأشياء لا يسمح بها JSON: علامات الاقتباس المفردة، والمفاتيح بلا اقتباس، والتعليقات، والفاصلة الزائدة. أصلحها يمرّ النص.',
      },
      {
        q: 'هل ترتيب المفاتيح يغيّر بياناتي؟',
        a: 'يغيّر ترتيب المفاتيح داخل الكائنات فقط، ولا معنى له في JSON. أما ترتيب العناصر داخل المصفوفة فيبقى كما هو.',
      },
      {
        q: 'لماذا تغيّر رقم طويل؟',
        a: 'تقرأ المتصفحات أرقام JSON كأعداد عشرية عائمة، ولا تكون دقيقة إلا حتى 9,007,199,254,740,991. والرقم الصحيح الأطول، مثل معرّف طويل، يُقرَّب. وتنبّهك الصفحة حين ترى واحداً.',
      },
      {
        q: 'هل يُخزَّن الـ JSON أو يُرسَل؟',
        a: 'لا. يُفحص وينسّق في متصفحك ولا يُرسل إلى أي مكان.',
      },
    ],
    cta: {
      title: 'بيانات تنتقل بين أنظمتك',
      text: 'نبني التكاملات والواجهات البرمجية التي تربط متجرك وأنظمة عملائك وأدواتك، ببيانات نظيفة من الجهتين.',
      button: 'تعرّف على الحلول الرقمية',
    },
  },

  favicon: {
    h1: 'مولّد أيقونة الموقع Favicon',
    subtitle: 'اصنع الأيقونة الصغيرة لتبويبات المتصفح والشاشة الرئيسية للهاتف من حروف أو إيموجي أو صورة. تحصل على كل الأحجام، وملف favicon.ico، والكود الجاهز للصق.',
    textLabel: 'حروف أو إيموجي',
    textHint: 'حرف أو حرفان أفضل.',
    shapeLabel: 'الشكل',
    shapes: { square: 'مربع', rounded: 'مدوّر', circle: 'دائرة' },
    background: 'الخلفية',
    letters: 'الحروف',
    lowContrast: 'لون الحروف قريب من لون الخلفية (التباين {ratio}:1). عند ١٦ بكسل قد يصعب قراءة الأيقونة. اختر لونين أبعد عن بعضهما.',
    pictureLabel: 'أو استخدم صورة',
    choosePicture: 'اختر صورة',
    removePicture: 'أزل الصورة',
    pictureHint: 'PNG أو JPG أو WebP أو SVG. وتُقصّ مربعةً من الوسط.',
    errors: {
      type: 'اختر ملف PNG أو JPG أو WebP أو SVG.',
      size: 'حجم الملف أكبر من ٨ ميغابايت.',
      read: 'تعذّر فتح هذه الصورة.',
    },
    siteName: 'اسم الموقع',
    tabNote: 'هكذا تظهر الأيقونة في تبويب المتصفح.',
    iconLabel: 'الأيقونة بحجم {size} بكسل',
    saveOne: 'نزّل صورة PNG بحجم {size} بكسل',
    saveAll: 'نزّل كل شيء',
    head: {
      title: 'كود وسم <head>',
      text: 'ضع الملفات في جذر موقعك، ثم الصق هذا داخل وسم head في كل الصفحات.',
    },
    manifest: {
      title: 'ملف site.webmanifest',
      text: 'يجعل الهواتف تستخدم الأيقونتين الأكبر عند إضافة الموقع إلى الشاشة الرئيسية.',
    },
    copy: 'انسخ',
    notice:
      'تُرسم الأيقونات في متصفحك مما اخترته. وتستخدم الحروف الخطوط الموجودة في جهازك، فتأكد من الشكل عند ١٦ بكسل قبل النشر. وتحتفظ المتصفحات بالأيقونات مدة طويلة، فقد تتأخر الأيقونة الجديدة في الظهور.',
    steps: [
      'اكتب حرفاً أو حرفين أو إيموجي، أو اختر صورة، ثم اختر الشكل والألوان.',
      'انظر إلى الأحجام الصغيرة في معاينة التبويب، وأصلح التباين إن حذّرتك الصفحة.',
      'نزّل كل شيء، وارفع الملفات إلى جذر موقعك، والصق الكود في الـ head.',
    ],
    faq: [
      {
        q: 'ما الملفات التي أحتاجها؟',
        a: 'ملف favicon.ico للمتصفحات والأدوات القديمة، وصورتا PNG بحجم ١٦ و٣٢ للتبويبات، وأيقونة apple-touch-icon بحجم ١٨٠ للآيفون، وأيقونتا ١٩٢ و٥١٢ للأندرويد عبر ملف manifest. والتنزيل يشملها كلها.',
      },
      {
        q: 'أين أضع الملفات؟',
        a: 'في جذر الموقع، لتفتح على /favicon.ico و/apple-touch-icon.png. ثم الصق الكود المعروض في head صفحاتك. وفي منشئ المواقع غالباً مكان لرفع الأيقونة بدلاً من ذلك.',
      },
      {
        q: 'لماذا لا تظهر أيقونتي الجديدة؟',
        a: 'تخزّن المتصفحات الأيقونات بشدة. أغلق التبويب، وأعد التحميل مع مسح الذاكرة المؤقتة، أو افتح الموقع في نافذة خاصة. وقد تحتاج يوماً لتتغير في نتائج البحث.',
      },
      {
        q: 'هل أستطيع استخدام شعار بخلفية شفافة؟',
        a: 'نعم. يُملأ الشكل بلون الخلفية الذي تختاره وتُرسم الصورة فوقه، فتظهر الأجزاء الشفافة بذلك اللون.',
      },
      {
        q: 'هل تُرفع صورتي؟',
        a: 'لا. تُرسم على لوحة في متصفحك ولا تُرسل إلى أي مكان.',
      },
    ],
    cta: {
      title: 'هوية تبدو سليمة في كل مكان',
      text: 'من الشعار إلى أيقونة الموقع إلى بطاقات التواصل، نصنع هويات تبقى واضحة في كل حجم.',
      button: 'شاهد أعمال التصميم',
    },
  },

  cssunits: {
    h1: 'محوّل وحدات CSS والخط المتجاوب',
    subtitle: 'حوّل البكسل إلى rem، وابنِ سلّم خطوط، واكتب حجماً بـ clamp() يكبر بسلاسة بين عرضين للشاشة.',
    convert: {
      title: 'حوّل',
      value: 'القيمة',
      invalid: 'اكتب رقماً.',
      from: 'حوّل من',
      base: 'حجم الخط الجذري (px)',
      baseHint: 'تستخدم المتصفحات ١٦ ما لم يغيّره الموقع.',
      copy: 'انسخ قيمة rem',
    },
    table: {
      title: 'أحجام شائعة',
      text: 'الأحجام المعتادة بالبكسل مقابل rem، بحجم جذري {base}px. اختر واحداً لتحوّله.',
    },
    scale: {
      title: 'سلّم الخطوط',
      text: 'كل درجة هي التي قبلها مضروبة في نسبة. اختر حجماً أساسياً ونسبة.',
      base: 'الحجم الأساسي (px)',
      ratio: 'النسبة',
      ratios: { minorThird: 'الثالثة الصغرى', majorThird: 'الثالثة الكبرى', perfectFourth: 'الرابعة التامة', goldenRatio: 'الذهبية' },
      sample: 'نص تجريبي للحجم',
    },
    fluid: {
      title: 'حجم متجاوب بـ clamp()',
      text: 'اختر أصغر حجم وأكبره وعرضي الشاشة اللذين يكبر بينهما الحجم. حرّك المنزلق لتراه.',
      minSize: 'أصغر حجم (px)',
      maxSize: 'أكبر حجم (px)',
      minWidth: 'من عرض الشاشة (px)',
      maxWidth: 'إلى عرض الشاشة (px)',
      output: 'CSS',
      copy: 'انسخ الـ CSS',
      try: 'جرّب عرض شاشة',
      sample: 'عنوان يكبر مع الشاشة',
      invalid: 'اكتب رقماً أكبر من صفر في كل من الصناديق الأربعة.',
    },
    notice:
      'تتبع وحدة rem حجم الخط الجذري، فمن يكبّر الخط في متصفحه يحصل على نص أكبر. واستخدام vw وحدها قد يمنع ذلك، ولهذا تضيف القيمة الوسطى في clamp() جزءاً بوحدة rem. جرّب التكبير وإعدادات الخط الكبير على أجهزة حقيقية.',
    steps: [
      'اكتب قيمة واختر px أو rem للتحويل، مع حجمك الجذري إن لم يكن ١٦.',
      'اختر حجماً أساسياً ونسبة لترى سلّم خطوط بالبكسل وrem.',
      'اكتب أصغر حجم وأكبره وعرضي الشاشة، ثم انسخ سطر clamp().',
    ],
    faq: [
      {
        q: 'لماذا أستخدم rem بدل px؟',
        a: 'تتناسب rem مع حجم الخط الجذري، فيكبر النص والمسافات حين يكبّر الزائر الخط في متصفحه. أما البكسل فلا يتبع هذا الإعداد.',
      },
      {
        q: 'ما الفرق بين rem وem؟',
        a: 'rem تتناسب دائماً مع حجم الخط الجذري. أما em فتتناسب مع حجم خط العنصر نفسه، فقد تتراكم حين تتداخل العناصر. وتتطابق الأرقام هنا فقط حين يكون للعنصر الحجم الجذري.',
      },
      {
        q: 'كيف تجعل clamp() الحجم متجاوباً؟',
        a: 'تستخدم clamp(الأدنى، المفضّل، الأقصى) القيمة المفضلة ولا تنزل عن الأدنى ولا تتجاوز الأقصى. والقيمة المفضلة هنا خط مستقيم بين حجميك، فتكبر بسلاسة من الأول إلى الثاني.',
      },
      {
        q: 'لماذا في القيمة الوسطى جزء rem وجزء vw؟',
        a: 'الخط المستقيم إزاحة بداية مع ميل. الميل هو جزء vw، والإزاحة هي جزء rem. وبقاء الإزاحة بوحدة rem يجعل الحجم يستجيب أيضاً حين يغيّر الزائر حجم النص.',
      },
      {
        q: 'هل يُرسل ما أكتبه إلى أي مكان؟',
        a: 'لا. تُحسب الأرقام في متصفحك.',
      },
    ],
    cta: {
      title: 'خطوط تناسب كل شاشة',
      text: 'نبني أنظمة تصميم ومواقع متجاوبة تتدرج فيها الخطوط والمسافات والتخطيط بنظافة من الهاتف إلى الشاشة العريضة.',
      button: 'تعرّف على الحلول الرقمية',
    },
  },
};

export const batch6Content = { en, ar };
