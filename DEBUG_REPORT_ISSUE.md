# Debug Report Issue - تعقب مشكلة جلب التقرير

## المشكلة
عند البحث عن التقرير باستخدام البيانات التالية:
- **رقم التقرير**: `RPT202509050047906`
- **رقم الهيكل (VIN)**: `12345678123456789`
- **البريد الإلكتروني**: `zxsofazx@gmail.com`
- **رقم الهاتف**: `0591351435`

يتم إرجاع: `{"message":"Report not found","data":null,"success":false,"errors":null}`

## الحلول المطبقة

### 1. تحسين منطق البحث في ReportsController
تم تحديث دالة `searchReports()` لتجرب عدة طرق للبحث:

1. **البحث بالمستخدم المباشر**: البحث بـ `user_id`
2. **البحث عبر VehicleContact**: البحث عبر البريد الإلكتروني ورقم الهاتف
3. **البحث المباشر**: البحث بدون قيود المستخدم

### 2. إضافة Debug Logging
تم إضافة logging مفصل لتتبع:
- بيانات المستخدم
- معاملات البحث
- نتائج كل طريقة بحث
- عدد التقارير الموجودة

### 3. إضافة Debug Endpoint
تم إضافة endpoint جديد للتحقق من البيانات:
```
GET /api/users/inspection/reports/debug?vin_number={vin}&report_number={report}
```

## كيفية الاختبار

### 1. اختبار البحث العادي
```bash
curl -X GET "https://demo.syarahplus.sa/backend/api/users/inspection/reports/search?vin_number=12345678123456789&report_number=RPT202509050047906" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. اختبار Debug Endpoint
```bash
curl -X GET "https://demo.syarahplus.sa/backend/api/users/inspection/reports/debug?vin_number=12345678123456789&report_number=RPT202509050047906" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. فحص Logs
تحقق من ملف `storage/logs/laravel.log` للبحث عن:
- `Search Reports Request`
- `No reports found`
- `Reports found`

## التحقق من البيانات

### 1. التحقق من وجود التقرير في قاعدة البيانات
```sql
SELECT * FROM inspection_reports WHERE report_number LIKE '%RPT202509050047906%';
```

### 2. التحقق من وجود المركبة
```sql
SELECT * FROM vehicles WHERE vin_number LIKE '%12345678123456789%';
```

### 3. التحقق من VehicleContact
```sql
SELECT * FROM vehicle_contacts WHERE applicant_email = 'zxsofazx@gmail.com' OR owner_phone_number = '0591351435';
```

## المشاكل المحتملة

### 1. مشكلة في العلاقات
- قد تكون العلاقة بين `InspectionReport` و `VehicleContact` غير صحيحة
- قد تكون العلاقة بين `InspectionReport` و `Vehicle` غير صحيحة

### 2. مشكلة في البيانات
- قد تكون البيانات في قاعدة البيانات مختلفة عن المتوقع
- قد تكون أسماء الأعمدة مختلفة

### 3. مشكلة في الصلاحيات
- قد يكون المستخدم لا يملك صلاحية الوصول للتقرير
- قد تكون البيانات مرتبطة بمستخدم آخر

## الخطوات التالية

1. **تشغيل Debug Endpoint** للحصول على معلومات مفصلة
2. **فحص Logs** لمعرفة ما يحدث بالضبط
3. **التحقق من قاعدة البيانات** مباشرة
4. **اختبار البيانات** مع بيانات مختلفة

## ملاحظات مهمة

- تأكد من أن المستخدم مسجل الدخول
- تأكد من صحة Bearer Token
- تأكد من أن البيانات موجودة في قاعدة البيانات
- تأكد من أن العلاقات بين الجداول صحيحة
