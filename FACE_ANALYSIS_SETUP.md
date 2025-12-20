# تعليمات إعداد تحليل الوجه بالذكاء الاصطناعي

## خطوات إعداد النماذج (Models)

تحتاج مكتبة face-api.js إلى ملفات النماذج لتشغيل التحليل. لديك خياران:

### الخيار 1: استخدام CDN (للتطوير)

الكود الحالي يستخدم CDN من jsdelivr. إذا كنت في بيئة تطوير ولديك اتصال بالإنترنت، ستعمل النماذج تلقائياً.

### الخيار 2: استخدام نماذج محلية (للإنتاج - موصى به)

للحصول على أداء أفضل واستقرار أكثر في الإنتاج:

1. قم بتحميل ملفات النماذج من:
   - https://github.com/vladmandic/face-api/tree/master/model
   - أو من: https://github.com/justadudewhohacks/face-api.js/tree/master/weights

2. أنشئ مجلد `public/models/` في المشروع

3. انسخ الملفات التالية إلى `public/models/`:
   - `tiny_face_detector_model-weights_manifest.json`
   - `tiny_face_detector_model-shard1`
   - `face_landmark_68_model-weights_manifest.json`
   - `face_landmark_68_model-shard1`
   - `face_recognition_model-weights_manifest.json`
   - `face_recognition_model-shard1`
   - `face_recognition_model-shard2`
   - `face_expression_model-weights_manifest.json`
   - `face_expression_model-shard1`
   - `age_gender_model-weights_manifest.json`
   - `age_gender_model-shard1`

4. بعد نسخ الملفات، سيتم استخدامها تلقائياً في بيئة الإنتاج

### ملاحظات مهمة

- حجم الملفات الإجمالي: حوالي 3-4 MB
- التأكد من أن جميع الملفات موجودة في المجلد
- الكود سيحاول استخدام النماذج المحلية أولاً، وإذا فشل سيستخدم CDN

