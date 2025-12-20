// دالة للحصول على التذكيرات بناءً على نوع العلاج
export const getRemindersForTreatment = (treatmentName) => {
  const treatment = treatmentName.toLowerCase();
  
  if (treatment.includes("ليزر إزالة الشعر") || treatment.includes("ليزر ازالة الشعر")) {
    return [
      {
        id: 1,
        text: "لا تستخدمي كريم خلال 24 ساعة",
        duration: 24, // ساعات
        type: "restriction"
      },
      {
        id: 2,
        text: "لا استحمام ساخن خلال 24 ساعة",
        duration: 24,
        type: "restriction"
      },
      {
        id: 3,
        text: "لا تقشير خلال 3 أيام",
        duration: 72, // ساعات (3 أيام)
        type: "restriction"
      }
    ];
  }
  
  if (treatment.includes("ليزر فراكشنال") || treatment.includes("فراكشنال")) {
    return [
      {
        id: 1,
        text: "استخدمي واقي الشمس SPF 50+",
        duration: 168, // 7 أيام
        type: "care"
      },
      {
        id: 2,
        text: "تجنبي التعرض المباشر للشمس",
        duration: 168,
        type: "restriction"
      },
      {
        id: 3,
        text: "لا تقشير أو استخدام منتجات حامضية",
        duration: 120, // 5 أيام
        type: "restriction"
      },
      {
        id: 4,
        text: "استخدمي مرطب خفيف فقط",
        duration: 72, // 3 أيام
        type: "care"
      }
    ];
  }
  
  if (treatment.includes("بوتوكس") || treatment.includes("بوتكس")) {
    return [
      {
        id: 1,
        text: "لا تلمسي المنطقة المحقونة",
        duration: 4, // ساعات
        type: "restriction"
      },
      {
        id: 2,
        text: "لا تميلي رأسك للأسفل",
        duration: 4,
        type: "restriction"
      },
      {
        id: 3,
        text: "تجنبي التمارين الرياضية",
        duration: 24,
        type: "restriction"
      }
    ];
  }
  
  if (treatment.includes("فيلر")) {
    return [
      {
        id: 1,
        text: "لا تلمسي المنطقة المحقونة",
        duration: 6, // ساعات
        type: "restriction"
      },
      {
        id: 2,
        text: "تجنبي وضع المكياج",
        duration: 12,
        type: "restriction"
      },
      {
        id: 3,
        text: "تجنبي التعرض للشمس",
        duration: 48,
        type: "restriction"
      }
    ];
  }
  
  // تذكيرات افتراضية للعلاجات الأخرى
  return [
    {
      id: 1,
      text: "اتبعي تعليمات الطبيب",
      duration: 24,
      type: "care"
    }
  ];
};

// دالة لتحويل التاريخ النصي إلى Date object
export const parseArabicDate = (dateString, timeString) => {
  // إذا كان التاريخ يحتوي على "بكرا" أو "غداً"
  if (dateString.includes("بكرا") || dateString.includes("غداً") || dateString.includes("غدا")) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // استخراج الوقت من timeString
    let hours = 10; // افتراضي
    let minutes = 0;
    
    if (timeString) {
      const timeMatch = timeString.match(/(\d+):(\d+)/);
      if (timeMatch) {
        hours = parseInt(timeMatch[1]);
        minutes = parseInt(timeMatch[2]);
        
        // إذا كان الوقت مساءً (بعد 12)
        if (timeString.includes("مساءً") || timeString.includes("مساء")) {
          if (hours < 12) hours += 12;
        }
      }
    }
    
    tomorrow.setHours(hours, minutes, 0, 0);
    return tomorrow;
  }
  
  // محاولة تحليل التاريخ العربي
  const months = {
    "يناير": 0, "فبراير": 1, "مارس": 2, "أبريل": 3, "مايو": 4, "يونيو": 5,
    "يوليو": 6, "أغسطس": 7, "سبتمبر": 8, "أكتوبر": 9, "نوفمبر": 10, "ديسمبر": 11
  };
  
  // البحث عن اليوم والشهر والسنة
  const dayMatch = dateString.match(/(\d+)/);
  const monthMatch = dateString.match(/(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/);
  const yearMatch = dateString.match(/(\d{4})/);
  
  if (dayMatch && monthMatch && yearMatch) {
    const day = parseInt(dayMatch[1]);
    const month = months[monthMatch[1]];
    const year = parseInt(yearMatch[1]);
    
    // استخراج الوقت
    let hours = 10;
    let minutes = 0;
    
    if (timeString) {
      const timeMatch = timeString.match(/(\d+):(\d+)/);
      if (timeMatch) {
        hours = parseInt(timeMatch[1]);
        minutes = parseInt(timeMatch[2]);
        
        if (timeString.includes("مساءً") || timeString.includes("مساء")) {
          if (hours < 12) hours += 12;
        }
      }
    }
    
    return new Date(year, month, day, hours, minutes, 0, 0);
  }
  
  // إذا فشل التحليل، استخدم تاريخ افتراضي (غداً)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

// دالة للحصول على أيقونة العلاج
export const getTreatmentIcon = (treatmentName) => {
  const treatment = treatmentName.toLowerCase();
  
  if (treatment.includes("ليزر إزالة الشعر") || treatment.includes("ليزر ازالة الشعر")) {
    return "💫";
  }
  if (treatment.includes("ليزر فراكشنال") || treatment.includes("فراكشنال")) {
    return "✨";
  }
  if (treatment.includes("بوتوكس") || treatment.includes("بوتكس")) {
    return "💉";
  }
  if (treatment.includes("فيلر")) {
    return "💉";
  }
  if (treatment.includes("تنظيف")) {
    return "✨";
  }
  
  return "🔬";
};

