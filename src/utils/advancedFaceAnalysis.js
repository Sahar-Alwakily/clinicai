// وظائف التحليل المتقدم للوجه

/**
 * تحليل الجلد المتقدم
 */
export const analyzeAdvancedSkin = (imageElement, landmarks, ctx) => {
  if (!landmarks || !landmarks.positions) {
    return {
      type: 'غير محدد',
      hydration: 'غير محدد',
      sebum: 'غير محدد',
      pores: 'غير محدد',
      texture: 'غير محدد'
    };
  }

  const positions = landmarks.positions;
  const canvas = document.createElement('canvas');
  const canvasCtx = canvas.getContext('2d');
  canvas.width = imageElement.width || imageElement.videoWidth || imageElement.naturalWidth;
  canvas.height = imageElement.height || imageElement.videoHeight || imageElement.naturalHeight;
  canvasCtx.drawImage(imageElement, 0, 0);

  // تحليل منطقة T-zone (الجبهة، الأنف، الذقن)
  const tzonePoints = [
    ...positions.slice(27, 36), // الأنف
    positions[8], // الذقن
    ...positions.slice(17, 27) // الجبهة (من خلال الحواجب)
  ];

  // تحليل منطقة الخدود
  const cheekRegion = positions.slice(1, 15);

  // تحليل النسيج والمسام
  const textureAnalysis = analyzeTexture(canvasCtx, cheekRegion, canvas.width, canvas.height);
  const poreAnalysis = analyzePores(canvasCtx, tzonePoints, canvas.width, canvas.height);
  const sebumAnalysis = analyzeSebum(canvasCtx, tzonePoints, canvas.width, canvas.height);
  const hydrationAnalysis = analyzeHydration(canvasCtx, cheekRegion, canvas.width, canvas.height);

  // تحديد نوع البشرة - منطق محسّن يعطي الأولوية للزهم في T-zone
  let skinType = 'مختلطة';
  const sebumScore = sebumAnalysis.score || 0;
  const hydrationScore = hydrationAnalysis.score || 0;
  const poreScore = poreAnalysis.score || 0;
  
  // المعايير المحسّنة:
  // 1. البشرة الدهنية: زهم عالي في T-zone + مسام كبيرة
  if (sebumScore > 65 || (sebumScore > 55 && poreScore > 50)) {
    skinType = 'دهنية';
  } 
  // 2. البشرة الجافة: زهم منخفض جداً + ترطيب منخفض + نسيج خشن
  else if (sebumScore < 35 && hydrationScore < 40 && textureAnalysis.score < 50) {
    skinType = 'جافة';
  }
  // 3. البشرة الحساسة: حساسية عالية
  else if (textureAnalysis.sensitivity > 70) {
    skinType = 'حساسة';
  }
  // 4. البشرة المختلطة: زهم متوسط في T-zone وترطيب متوسط في الخدود
  else if ((sebumScore > 45 && sebumScore < 65) && (hydrationScore > 40 && hydrationScore < 70)) {
    skinType = 'مختلطة';
  }
  // 5. البشرة العادية: توازن جيد
  else if (sebumScore > 40 && sebumScore < 60 && hydrationScore > 50 && hydrationScore < 75) {
    skinType = 'عادية';
  }

  // تقييم حالة البشرة العامة
  const isDry = hydrationScore < 40 && sebumScore < 35;
  const isOily = sebumScore > 65 || (sebumScore > 55 && poreScore > 50);
  const isUnevenTexture = textureAnalysis.score < 50 || textureAnalysis.sensitivity > 60;
  
  // تقييم شامل لحالة البشرة
  let overallCondition = 'متوازنة';
  if (isDry) overallCondition = 'جافة';
  else if (isOily) overallCondition = 'دهنية';
  else if (isUnevenTexture) overallCondition = 'ملمس غير متساوي';
  
  return {
    type: skinType,
    hydration: hydrationAnalysis.level,
    hydrationScore: hydrationAnalysis.score,
    sebum: sebumAnalysis.level,
    sebumScore: sebumAnalysis.score,
    pores: poreAnalysis.size,
    poresScore: poreAnalysis.score,
    texture: textureAnalysis.quality,
    textureScore: textureAnalysis.score,
    sensitivity: textureAnalysis.sensitivity,
    // حالة البشرة العامة
    overallCondition: overallCondition,
    isDry: isDry,
    isOily: isOily,
    isUnevenTexture: isUnevenTexture,
    dryness: isDry ? 'جافة' : hydrationScore < 50 ? 'قليلة الترطيب' : 'مترطبة',
    oiliness: isOily ? 'دهنية' : sebumScore < 40 ? 'قليلة الزهم' : 'متوازنة',
    textureEvenness: isUnevenTexture ? 'غير متساوي' : 'متساوي'
  };
}

/**
 * تحليل المشاكل الجلدية
 */
export const analyzeSkinProblems = (imageElement, landmarks, age) => {
  if (!landmarks || !landmarks.positions) {
  return {
    acne: { active: false, scars: false, types: [], severity: 'لا يوجد', location: {} },
    pigmentation: { level: 'لا يوجد', types: [] },
    darkCircles: { present: false, severity: 'لا يوجد' },
    wrinkles: { total: 0, details: {} },
    scars: { present: false, count: 0 }
  };
  }

  const positions = landmarks.positions;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imageElement.width || imageElement.videoWidth || imageElement.naturalWidth;
  canvas.height = imageElement.height || imageElement.videoHeight || imageElement.naturalHeight;
  ctx.drawImage(imageElement, 0, 0);

  // تحليل حب الشباب
  const acneAnalysis = analyzeAcne(ctx, positions, canvas.width, canvas.height);

  // تحليل التصبغات
  const pigmentationAnalysis = analyzePigmentation(ctx, positions, canvas.width, canvas.height);

  // تحليل الهالات السوداء
  const darkCirclesAnalysis = analyzeDarkCircles(ctx, positions, canvas.width, canvas.height);

  // تحليل التجاعيد (مفصل)
  const wrinklesAnalysis = analyzeDetailedWrinkles(positions, age);

  // تحليل الندوب
  const scarsAnalysis = analyzeScars(ctx, positions, canvas.width, canvas.height);
  
  // تحليل الترهل (Skin Sagging) - تقييم المرونة والترهل
  const saggingAnalysis = analyzeSagging(ctx, positions, canvas.width, canvas.height, age);

  return {
    acne: acneAnalysis,
    pigmentation: pigmentationAnalysis,
    darkCircles: darkCirclesAnalysis,
    wrinkles: wrinklesAnalysis,
    scars: scarsAnalysis,
    sagging: saggingAnalysis,
    medicalAcne: analyzeMedicalAcneTypes(ctx, positions, canvas.width, canvas.height, acneAnalysis)
  };
};

/**
 * تحليل نسب الوجه
 */
export const analyzeFacialProportions = (landmarks) => {
  if (!landmarks || !landmarks.positions) {
    return {
      symmetry: 0,
      goldenRatio: 0,
      faceShape: 'غير محدد',
      jawAngle: 0,
      recommendations: []
    };
  }

  const positions = landmarks.positions;

  // حساب التناسق (Symmetry)
  const symmetry = calculateSymmetry(positions);

  // حساب النسب الذهبية
  const goldenRatio = calculateGoldenRatio(positions);

  // تحديد شكل الوجه
  const faceShape = determineFaceShape(positions);

  // حساب زوايا الفك
  const jawAngle = calculateJawAngle(positions);

  // التوصيات
  const recommendations = generateProportionRecommendations(symmetry, goldenRatio, faceShape);

  // تحليل الشخصية بناءً على شكل الوجه والقياسات
  const personalityAnalysis = analyzePersonality(positions, faceShape, symmetry, goldenRatio);

  return {
    symmetry: Math.round(symmetry),
    goldenRatio: Math.round(goldenRatio),
    faceShape,
    jawAngle: Math.round(jawAngle),
    recommendations,
    personalityAnalysis
  };
};

/**
 * تحليل المناطق المحددة
 */
export const analyzeSpecificRegions = (imageElement, landmarks) => {
  if (!landmarks || !landmarks.positions) {
    return {};
  }

  const positions = landmarks.positions;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imageElement.width || imageElement.videoWidth || imageElement.naturalWidth;
  canvas.height = imageElement.height || imageElement.videoHeight || imageElement.naturalHeight;
  ctx.drawImage(imageElement, 0, 0);

  return {
    tzone: analyzeTZone(ctx, positions, canvas.width, canvas.height),
    underEyes: analyzeUnderEyes(ctx, positions, canvas.width, canvas.height),
    cheeks: analyzeCheeks(ctx, positions, canvas.width, canvas.height),
    lips: analyzeLips(positions),
    neck: analyzeNeck(positions)
  };
};

// ===== الوظائف المساعدة =====

function analyzeTexture(ctx, region, width, height) {
  // تحليل نعومة/خشونة البشرة
  let variance = 0;
  let count = 0;
  const sampleSize = Math.min(20, region.length);

  for (let i = 0; i < sampleSize; i++) {
    const point = region[i];
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    
    if (x >= 2 && x < width - 2 && y >= 2 && y < height - 2) {
      const imgData = ctx.getImageData(x - 1, y - 1, 3, 3);
      const brightness = calculateBrightness(imgData);
      variance += brightness;
      count++;
    }
  }

  const avgBrightness = count > 0 ? variance / count : 128;
  const quality = avgBrightness > 150 ? 'ناعمة' : avgBrightness > 120 ? 'متوسطة' : 'خشنة';
  const score = Math.round((avgBrightness / 255) * 100);
  const sensitivity = avgBrightness < 100 ? 80 : avgBrightness < 130 ? 50 : 20;

  return { quality, score, sensitivity };
}

function analyzePores(ctx, region, width, height) {
  // تحليل حجم المسام (تقريبي)
  let poreCount = 0;
  let totalVariation = 0;
  const sampleSize = Math.min(15, region.length);

  for (let i = 0; i < sampleSize; i++) {
    const point = region[i];
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    
    if (x >= 1 && x < width - 1 && y >= 1 && y < height - 1) {
      const imgData = ctx.getImageData(x - 1, y - 1, 3, 3);
      const variation = calculateVariation(imgData);
      totalVariation += variation;
      if (variation > 30) poreCount++;
    }
  }

  const avgVariation = sampleSize > 0 ? totalVariation / sampleSize : 0;
  const size = avgVariation > 40 ? 'كبيرة' : avgVariation > 25 ? 'متوسطة' : 'صغيرة';
  const score = Math.min(100, Math.round((avgVariation / 50) * 100));

  return { size, score, count: poreCount };
}

function analyzeSebum(ctx, region, width, height) {
  // تحليل إفراز الزهم (الدهون) - محسّن
  let totalBrightness = 0;
  let totalSaturation = 0;
  let totalVariation = 0;
  let count = 0;
  const sampleSize = Math.min(20, region.length);
  const sampleRadius = 3; // عينة أكبر للمنطقة المحيطة

  for (let i = 0; i < sampleSize; i++) {
    const point = region[i];
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    
    if (x >= sampleRadius && x < width - sampleRadius && y >= sampleRadius && y < height - sampleRadius) {
      // أخذ عينة أكبر (3x3) لتحليل أفضل
      const imgData = ctx.getImageData(x - sampleRadius, y - sampleRadius, sampleRadius * 2 + 1, sampleRadius * 2 + 1);
      const data = imgData.data;
      
      let regionBrightness = 0;
      let regionSaturation = 0;
      let maxB = 0, minB = 255;
      
      for (let j = 0; j < data.length; j += 4) {
        const r = data[j];
        const g = data[j + 1];
        const b = data[j + 2];
        const brightness = (r + g + b) / 3;
        
        regionBrightness += brightness;
        maxB = Math.max(maxB, brightness);
        minB = Math.min(minB, brightness);
        
        // حساب التشبع (saturation) - البشرة الدهنية لها لمعان أعلى
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const saturation = max === 0 ? 0 : (max - min) / max;
        regionSaturation += saturation;
      }
      
      const pixelCount = (sampleRadius * 2 + 1) * (sampleRadius * 2 + 1);
      const avgBrightness = regionBrightness / pixelCount;
      const avgSaturation = regionSaturation / pixelCount;
      const variation = (maxB - minB); // التباين في اللمعان
      
      totalBrightness += avgBrightness;
      totalSaturation += avgSaturation;
      totalVariation += variation;
      count++;
    }
  }

  if (count === 0) {
    return { level: 'متوسط', score: 50 };
  }

  const avgBrightness = totalBrightness / count;
  const avgSaturation = totalSaturation / count;
  const avgVariation = totalVariation / count;
  
  // حساب معقد للزهم: 
  // البشرة الدهنية = سطوع عالي + تشبع منخفض (لمعان) + تباين منخفض (سطح أملس لامع)
  // معاملات مرجحة
  const brightnessFactor = (avgBrightness / 255) * 40; // حتى 40 نقطة
  const saturationFactor = (1 - avgSaturation) * 30; // حتى 30 نقطة (التشبع المنخفض = لمعان أعلى)
  const variationFactor = Math.max(0, 30 - (avgVariation / 255) * 30); // حتى 30 نقطة (التباين المنخفض = سطح أملس)
  
  const sebumScore = Math.min(100, Math.round(brightnessFactor + saturationFactor + variationFactor));
  
  // تحديد المستوى بناءً على النتيجة المحسوبة
  let level = 'متوسط';
  if (sebumScore > 65) {
    level = 'عالي';
  } else if (sebumScore > 45) {
    level = 'متوسط';
  } else {
    level = 'منخفض';
  }

  return { level, score: sebumScore };
}

function analyzeHydration(ctx, region, width, height) {
  // تحليل الترطيب - محسّن بناءً على السطوع والنسيج
  let totalBrightness = 0;
  let totalSmoothness = 0;
  let count = 0;
  const sampleSize = Math.min(20, region.length);
  const sampleRadius = 2;

  for (let i = 0; i < sampleSize; i++) {
    const point = region[i];
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    
    if (x >= sampleRadius && x < width - sampleRadius && y >= sampleRadius && y < height - sampleRadius) {
      const imgData = ctx.getImageData(x - sampleRadius, y - sampleRadius, sampleRadius * 2 + 1, sampleRadius * 2 + 1);
      const data = imgData.data;
      
      let regionBrightness = 0;
      let maxB = 0, minB = 255;
      
      for (let j = 0; j < data.length; j += 4) {
        const r = data[j];
        const g = data[j + 1];
        const b = data[j + 2];
        const brightness = (r + g + b) / 3;
        
        regionBrightness += brightness;
        maxB = Math.max(maxB, brightness);
        minB = Math.min(minB, brightness);
      }
      
      const pixelCount = (sampleRadius * 2 + 1) * (sampleRadius * 2 + 1);
      const avgBrightness = regionBrightness / pixelCount;
      const smoothness = 255 - (maxB - minB); // النعومة (التناسق في السطوع)
      
      totalBrightness += avgBrightness;
      totalSmoothness += smoothness;
      count++;
    }
  }

  if (count === 0) {
    return { level: 'طبيعي', score: 50 };
  }

  const avgBrightness = totalBrightness / count;
  const avgSmoothness = totalSmoothness / count;
  
  // البشرة الرطبة = سطوع جيد + نعومة عالية (سطح أملس)
  // البشرة الجافة = سطوع منخفض + خشونة (سطح خشن)
  const brightnessFactor = (avgBrightness / 255) * 50;
  const smoothnessFactor = (avgSmoothness / 255) * 50;
  
  const hydrationScore = Math.min(100, Math.round((brightnessFactor + smoothnessFactor) / 2));
  
  let level = 'طبيعي';
  if (hydrationScore > 70) {
    level = 'رطب';
  } else if (hydrationScore > 40) {
    level = 'طبيعي';
  } else {
    level = 'جاف';
  }

  return { level, score: hydrationScore };
}

function analyzeAcne(ctx, positions, width, height) {
  // تحليل محسّن لحب الشباب - يشمل جميع المناطق والأنواع
  
  // تحليل منطقة T-zone (الجبهة، الأنف، الذقن)
  const tzonePoints = [
    ...positions.slice(27, 36), // الأنف
    positions[8], // الذقن
    ...positions.slice(17, 27) // الجبهة (من خلال الحواجب)
  ];
  
  // تحليل منطقة الخدود (أهم منطقة لحب الشباب)
  const cheekRegion = positions.slice(1, 15);
  
  // تحليل مناطق مختلفة
  const tzoneAnalysis = analyzeAcneInRegion(ctx, tzonePoints, width, height);
  const cheekAnalysis = analyzeAcneInRegion(ctx, cheekRegion, width, height);
  
  // حساب الإجمالي
  const totalActiveSpots = tzoneAnalysis.activeSpots + cheekAnalysis.activeSpots;
  const totalScarSpots = tzoneAnalysis.scarSpots + cheekAnalysis.scarSpots;
  const avgVariation = (tzoneAnalysis.variation + cheekAnalysis.variation) / 2;
  
  // تحديد النشاط - معايير أكثر حساسية
  const active = totalActiveSpots > 0 || avgVariation > 20; // خفضت العتبة من 30 إلى 20
  const scars = totalScarSpots > 0 || (avgVariation > 15 && avgVariation <= 25);
  
  // تحديد الشدة - معايير محسّنة
  let severity = 'لا يوجد';
  let severityLevel = 0;
  if (totalActiveSpots > 8 || avgVariation > 40) {
    severity = 'شديد';
    severityLevel = 3;
  } else if (totalActiveSpots > 3 || avgVariation > 28) {
    severity = 'متوسط';
    severityLevel = 2;
  } else if (totalActiveSpots > 0 || avgVariation > 20) {
    severity = 'خفيف';
    severityLevel = 1;
  }
  
  // تحديد أنواع حب الشباب المكتشفة
  const types = [];
  if (active) {
    // حب الشباب الالتهابي (بثور حمراء ملتهبة)
    if (avgVariation > 35 && totalActiveSpots > 2) {
      types.push('التهابي');
    }
    // حب الشباب الكوميدوني (رؤوس سوداء وبيضاء)
    if (avgVariation > 25 && avgVariation <= 40) {
      types.push('كوميدوني');
    }
    // حب الشباب الكيسي (كيسات كبيرة)
    if (avgVariation > 50 && totalActiveSpots > 3) {
      types.push('كيسي');
    }
  }
  
  // إذا لم يتم اكتشاف أي نوع ولكن هناك تباين عالي، أضف "عام"
  if (active && types.length === 0) {
    types.push('عام');
  }
  
  // تحديد المواقع
  const location = {
    tzone: {
      present: tzoneAnalysis.activeSpots > 0,
      count: tzoneAnalysis.activeSpots,
      severity: tzoneAnalysis.variation > 35 ? 'متوسط' : tzoneAnalysis.variation > 25 ? 'خفيف' : 'لا يوجد'
    },
    cheeks: {
      present: cheekAnalysis.activeSpots > 0,
      count: cheekAnalysis.activeSpots,
      severity: cheekAnalysis.variation > 35 ? 'متوسط' : cheekAnalysis.variation > 25 ? 'خفيف' : 'لا يوجد'
    }
  };
  
  return { 
    active, 
    scars, 
    severity,
    severityLevel,
    types,
    location,
    totalSpots: totalActiveSpots,
    totalScars: totalScarSpots
  };
}

function analyzeAcneInRegion(ctx, region, width, height) {
  let variationSum = 0;
  let activeSpots = 0;
  let scarSpots = 0;
  let count = 0;
  const sampleRadius = 3; // زيادة حجم العينة لتحليل أدق
  const scanDensity = 0.7; // تقليل الكثافة لتحليل أسرع ولكن أكثر شمولية
  
  // تحليل أكثر شمولية - أخذ عينات من جميع أنحاء المنطقة
  for (let i = 0; i < region.length; i += Math.max(1, Math.floor(1 / scanDensity))) {
    const point = region[i];
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    
    if (x >= sampleRadius && x < width - sampleRadius && y >= sampleRadius && y < height - sampleRadius) {
      // أخذ عينة أكبر (7x7) لتحليل أدق
      const imgData = ctx.getImageData(x - sampleRadius, y - sampleRadius, sampleRadius * 2 + 1, sampleRadius * 2 + 1);
      const variation = calculateVariation(imgData);
      
      variationSum += variation;
      count++;
      
      // تحليل البيانات
      const data = imgData.data;
      let darkPixels = 0;
      let redPixels = 0; // للبثور الملتهبة (حمراء)
      let maxB = 0, minB = 255;
      
      for (let j = 0; j < data.length; j += 4) {
        const r = data[j];
        const g = data[j + 1];
        const b = data[j + 2];
        const brightness = (r + g + b) / 3;
        
        maxB = Math.max(maxB, brightness);
        minB = Math.min(minB, brightness);
        
        // كشف البقع الداكنة (رؤوس سوداء)
        if (brightness < 90) {
          darkPixels++;
        }
        
        // كشف البقع الحمراء (بثور ملتهبة) - الأحمر أعلى من الأخضر والأزرق
        if (r > g + 20 && r > b + 20 && brightness < 150) {
          redPixels++;
        }
      }
      
      const pixelCount = data.length / 4;
      const darkRatio = darkPixels / pixelCount;
      const redRatio = redPixels / pixelCount;
      const contrast = maxB - minB; // التباين
      
      // كشف البقع النشطة - معايير أكثر حساسية
      // 1. تباين عالي = بثور ملتهبة
      if (variation > 25 || contrast > 60) {
        activeSpots++;
      }
      // 2. بقع حمراء = التهاب
      else if (redRatio > 0.08) {
        activeSpots++;
      }
      // 3. بقع داكنة مع تباين متوسط = رؤوس سوداء
      else if (darkRatio > 0.08 && variation > 18) {
        activeSpots++;
      }
      // 4. تباين متوسط = آثار
      else if (variation > 18 && variation <= 25) {
        scarSpots++;
      }
    }
  }
  
  // إضافة تحليل إضافي - مسح المنطقة بالكامل
  if (region.length > 0) {
    const minX = Math.max(sampleRadius, Math.min(...region.map(p => Math.floor(p.x))));
    const maxX = Math.min(width - sampleRadius, Math.max(...region.map(p => Math.floor(p.x))));
    const minY = Math.max(sampleRadius, Math.min(...region.map(p => Math.floor(p.y))));
    const maxY = Math.min(height - sampleRadius, Math.max(...region.map(p => Math.floor(p.y))));
    
    // مسح شبكي للمنطقة
    const step = 5; // خطوة المسح
    for (let x = minX; x < maxX; x += step) {
      for (let y = minY; y < maxY; y += step) {
        if (x >= sampleRadius && x < width - sampleRadius && y >= sampleRadius && y < height - sampleRadius) {
          const imgData = ctx.getImageData(x - sampleRadius, y - sampleRadius, sampleRadius * 2 + 1, sampleRadius * 2 + 1);
          const variation = calculateVariation(imgData);
          const data = imgData.data;
          
          let redCount = 0;
          for (let j = 0; j < data.length; j += 4) {
            const r = data[j];
            const g = data[j + 1];
            const b = data[j + 2];
            if (r > g + 25 && r > b + 25) redCount++;
          }
          
          if (variation > 22 || (redCount / (data.length / 4)) > 0.1) {
            activeSpots++;
          }
        }
      }
    }
  }
  
  const avgVariation = count > 0 ? variationSum / count : 0;
  
  return {
    variation: avgVariation,
    activeSpots,
    scarSpots,
    count
  };
}

function analyzePigmentation(ctx, positions, width, height) {
  // تحليل شامل للتصبغات: البقع، فرط التصبغ، الكلف، النمش
  const cheekRegion = positions.slice(1, 15);
  const foreheadRegion = positions.slice(17, 27); // منطقة الجبهة
  const noseRegion = positions.slice(27, 36); // منطقة الأنف
  
  let darkSpots = 0;
  let hyperpigmentationAreas = 0;
  let melasmaAreas = 0;
  const allRegions = [...cheekRegion, ...foreheadRegion, ...noseRegion];

  allRegions.forEach(point => {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const imgData = ctx.getImageData(x, y, 1, 1);
      const brightness = (imgData.data[0] + imgData.data[1] + imgData.data[2]) / 3;
      const r = imgData.data[0];
      const g = imgData.data[1];
      const b = imgData.data[2];
      
      // البقع الداكنة العامة
      if (brightness < 100) {
        darkSpots++;
      }
      
      // فرط التصبغ - مناطق بنية/داكنة
      if (brightness < 120 && r < 130 && g < 130 && b < 130) {
        hyperpigmentationAreas++;
      }
      
      // الكلف - بقع بنية كبيرة في منطقة الخدود والجبهة
      if (brightness < 110 && (cheekRegion.includes(point) || foreheadRegion.includes(point))) {
        melasmaAreas++;
      }
    }
  });

  const totalSpots = darkSpots + hyperpigmentationAreas;
  const level = totalSpots > 8 ? 'عالي' : totalSpots > 4 ? 'متوسط' : totalSpots > 1 ? 'منخفض' : 'لا يوجد';
  
  const types = [];
  if (melasmaAreas > 2) types.push('كلف');
  if (hyperpigmentationAreas > 3) types.push('فرط التصبغ');
  if (darkSpots > 2) types.push('بقع داكنة');
  if (darkSpots > 0 && darkSpots <= 2) types.push('نمش');

  return { 
    level, 
    types, 
    count: totalSpots,
    darkSpots,
    hyperpigmentation: hyperpigmentationAreas > 3 ? 'موجود' : 'غير موجود',
    melasma: melasmaAreas > 2 ? 'موجود' : 'غير موجود',
    melasmaCount: melasmaAreas,
    hyperpigmentationCount: hyperpigmentationAreas
  };
}

function analyzeDarkCircles(ctx, positions, width, height) {
  // تحليل شامل للعيون: الهالات السوداء، الانتفاخ، علامات التعب
  const leftEye = positions.slice(36, 42);
  const rightEye = positions.slice(42, 48);
  
  // منطقة تحت العينين (أوسع)
  const underEyePoints = [];
  leftEye.forEach((p, i) => {
    underEyePoints.push({ x: p.x, y: p.y + 15 });
    underEyePoints.push({ x: p.x, y: p.y + 25 });
  });
  rightEye.forEach((p, i) => {
    underEyePoints.push({ x: p.x, y: p.y + 15 });
    underEyePoints.push({ x: p.x, y: p.y + 25 });
  });

  let totalBrightness = 0;
  let count = 0;
  let variance = 0;
  const brightnessValues = [];

  underEyePoints.forEach(point => {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const imgData = ctx.getImageData(x, y, 1, 1);
      const brightness = (imgData.data[0] + imgData.data[1] + imgData.data[2]) / 3;
      totalBrightness += brightness;
      brightnessValues.push(brightness);
      count++;
    }
  });

  const avgBrightness = count > 0 ? totalBrightness / count : 200;
  
  // حساب التباين للكشف عن الانتفاخ (المناطق الفاتحة والداكنة)
  if (brightnessValues.length > 0) {
    const mean = avgBrightness;
    variance = brightnessValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / brightnessValues.length;
  }

  // تحليل الهالات السوداء
  const present = avgBrightness < 140;
  const severity = avgBrightness < 100 ? 'واضح' : avgBrightness < 130 ? 'متوسط' : 'خفيف';
  
  // تحليل الانتفاخ (puffiness) - يظهر كمناطق فاتحة ومنتفخة
  const puffiness = variance > 800 && avgBrightness > 150 ? 'موجود' : 'غير موجود';
  const puffinessSeverity = variance > 1200 ? 'واضح' : variance > 800 ? 'متوسط' : 'خفيف';
  
  // تحليل علامات التعب - مزيج من الهالات الداكنة والانتفاخ
  const fatigueSigns = (present && avgBrightness < 120) || (puffiness === 'موجود' && variance > 1000);
  const fatigueLevel = avgBrightness < 100 && variance > 1000 ? 'عالي' : 
                       (present || puffiness === 'موجود') ? 'متوسط' : 'منخفض';

  return { 
    present, 
    severity,
    puffiness,
    puffinessSeverity,
    fatigueSigns,
    fatigueLevel,
    avgBrightness: Math.round(avgBrightness),
    variance: Math.round(variance)
  };
}

function analyzeMedicalAcneTypes(ctx, positions, width, height, acneAnalysis) {
  // تحليل طبي لأنواع حب الشباب
  const medicalTypes = [];
  
  if (!acneAnalysis.active) {
    return {
      types: [],
      recommendations: ['لا يوجد حب شباب نشط'],
      severity: 'لا يوجد'
    };
  }
  
  // Acne Vulgaris (حب الشباب الشائع)
  if (acneAnalysis.types.includes('التهابي') || acneAnalysis.types.includes('كوميدوني')) {
    medicalTypes.push({
      name: 'Acne Vulgaris',
      arabicName: 'حب الشباب الشائع',
      description: 'نوع شائع من حب الشباب يظهر على شكل بثور ورؤوس سوداء وبيضاء',
      severity: acneAnalysis.severity
    });
  }
  
  // Acne Cystic (حب الشباب الكيسي)
  if (acneAnalysis.types.includes('كيسي')) {
    medicalTypes.push({
      name: 'Acne Cystic',
      arabicName: 'حب الشباب الكيسي',
      description: 'نوع شديد من حب الشباب يظهر على شكل كيسات كبيرة وملتهبة تحت الجلد',
      severity: 'شديد'
    });
  }
  
  // تحديد التوصيات الطبية
  const recommendations = [];
  if (acneAnalysis.severityLevel >= 2) {
    recommendations.push('مراجعة طبيب جلدية للعلاج الطبي');
    recommendations.push('استخدام مضادات حيوية موضعية');
    recommendations.push('تجنب العبث بالبثور');
  } else if (acneAnalysis.severityLevel === 1) {
    recommendations.push('استخدام منتجات تنظيف لطيفة');
    recommendations.push('استخدام مرطبات خالية من الزيوت');
    recommendations.push('استخدام واقي شمس خالي من الزيوت');
  }
  
  if (acneAnalysis.location && acneAnalysis.location.cheeks && acneAnalysis.location.cheeks.present) {
    recommendations.push('تنظيف الهاتف والوسادة بانتظام (خاصة عند الخدود)');
    recommendations.push('تجنب لمس الوجه باليدين');
  }
  
  return {
    types: medicalTypes,
    recommendations,
    severity: acneAnalysis.severity,
    totalSpots: acneAnalysis.totalSpots || 0
  };
}

function analyzeDetailedWrinkles(positions, age) {
  // تحليل شامل للتجاعيد: خطوط الجبهة، crow's feet، خطوط الابتسامة، الخطوط حول الفم
  const foreheadPoints = positions.slice(17, 27); // منطقة الجبهة (الحواجب)
  const leftEye = positions.slice(36, 42);
  const rightEye = positions.slice(42, 48);
  const mouth = positions.slice(48, 68);
  
  // Crow's feet - الزوايا الخارجية للعيون
  const leftEyeOuter = [positions[36], positions[39], positions[40]];
  const rightEyeOuter = [positions[42], positions[45], positions[46]];
  
  // خطوط الابتسامة (nasolabial lines) - من الأنف إلى زوايا الفم
  const nasolabialLeft = [positions[31], positions[48]]; // من الأنف إلى زاوية الفم اليسرى
  const nasolabialRight = [positions[35], positions[54]]; // من الأنف إلى زاوية الفم اليمنى
  
  // الخطوط حول الفم (marionette lines) - من زوايا الفم إلى الذقن
  const marionetteLeft = [positions[48], positions[8]]; // من زاوية الفم اليسرى إلى الذقن
  const marionetteRight = [positions[54], positions[8]]; // من زاوية الفم اليمنى إلى الذقن

  const foreheadWrinkles = estimateWrinkles(foreheadPoints);
  const eyeWrinkles = estimateWrinkles(leftEye) + estimateWrinkles(rightEye);
  const crowFeetWrinkles = estimateWrinkles(leftEyeOuter) + estimateWrinkles(rightEyeOuter);
  const nasolabialWrinkles = estimateWrinkles(nasolabialLeft) + estimateWrinkles(nasolabialRight);
  const marionetteWrinkles = estimateWrinkles(marionetteLeft) + estimateWrinkles(marionetteRight);
  const mouthWrinkles = estimateWrinkles(mouth);

  const ageFactor = Math.max(1, age / 30);

  return {
    total: Math.round((foreheadWrinkles + eyeWrinkles + crowFeetWrinkles + nasolabialWrinkles + marionetteWrinkles + mouthWrinkles) * ageFactor),
    forehead: Math.round(foreheadWrinkles * ageFactor),
    eyes: Math.round(eyeWrinkles * ageFactor),
    crowFeet: Math.round(crowFeetWrinkles * ageFactor), // Crow's feet
    nasolabial: Math.round(nasolabialWrinkles * ageFactor), // خطوط الابتسامة
    marionette: Math.round(marionetteWrinkles * ageFactor), // خطوط ماريونيت
    mouth: Math.round(mouthWrinkles * ageFactor),
    smileLines: Math.round(nasolabialWrinkles * ageFactor), // خطوط الابتسامة
    fineLinesAroundMouth: Math.round((marionetteWrinkles + mouthWrinkles) * ageFactor) // الخطوط الدقيقة حول الفم
  };
}

function analyzeScars(ctx, positions, width, height) {
  // تحليل بسيط للندوب
  const faceRegion = positions.slice(0, 27);
  let scarCount = 0;

  faceRegion.forEach(point => {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    if (x >= 2 && x < width - 2 && y >= 2 && y < height - 2) {
      const imgData = ctx.getImageData(x - 1, y - 1, 3, 3);
      const variation = calculateVariation(imgData);
      if (variation > 40) scarCount++;
    }
  });

  return {
    present: scarCount > 2,
    count: Math.min(scarCount, 10)
  };
}

function analyzeSagging(ctx, positions, width, height, age) {
  // تحليل الترهل: تقييم المناطق ذات الجلد المترهل أو قلة المرونة
  // المناطق المعرضة للترهل: الخدود، خط الفك، الرقبة، تحت العينين
  
  const cheekRegion = positions.slice(1, 15);
  const jawlineRegion = positions.slice(0, 17);
  const underEyeRegion = [
    ...positions.slice(36, 42).map(p => ({ x: p.x, y: p.y + 15 })),
    ...positions.slice(42, 48).map(p => ({ x: p.x, y: p.y + 15 }))
  ];
  
  let totalSaggingScore = 0;
  let count = 0;
  
  // تحليل الخدود - الترهل يظهر كمناطق أقل كثافة
  cheekRegion.forEach(point => {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    if (x >= 1 && x < width - 1 && y >= 1 && y < height - 1) {
      const imgData = ctx.getImageData(x, y, 1, 1);
      const brightness = (imgData.data[0] + imgData.data[1] + imgData.data[2]) / 3;
      // البشرة المترهلة تميل إلى أن تكون أقل كثافة (أفتح)
      if (brightness > 180) totalSaggingScore += 1;
      count++;
    }
  });
  
  // تحليل خط الفك - الترهل يظهر كفقدان التعريف
  const jawDefinition = calculateJawDefinition(jawlineRegion);
  
  // تحليل تحت العينين
  let underEyeSagging = 0;
  underEyeRegion.forEach(point => {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const imgData = ctx.getImageData(x, y, 1, 1);
      const brightness = (imgData.data[0] + imgData.data[1] + imgData.data[2]) / 3;
      // الانتفاخ أو الترهل تحت العين
      if (brightness > 170) underEyeSagging++;
    }
  });
  
  const avgSaggingScore = count > 0 ? (totalSaggingScore / count) * 100 : 0;
  const ageFactor = Math.max(1, (age - 25) / 10); // يزداد الترهل مع العمر
  const finalScore = Math.min(100, avgSaggingScore * ageFactor + (underEyeSagging / underEyeRegion.length) * 30);
  
  const severity = finalScore > 70 ? 'عالي' : finalScore > 50 ? 'متوسط' : finalScore > 30 ? 'خفيف' : 'منخفض';
  const hasLooseSkin = finalScore > 50;
  const reducedElasticity = finalScore > 40;
  
  return {
    severity: severity,
    score: Math.round(finalScore),
    hasLooseSkin: hasLooseSkin,
    reducedElasticity: reducedElasticity,
    jawDefinition: jawDefinition < 0.7 ? 'ضعيف' : jawDefinition < 0.85 ? 'متوسط' : 'واضح',
    underEyeSagging: underEyeSagging > underEyeRegion.length * 0.3 ? 'موجود' : 'غير موجود',
    areas: {
      cheeks: avgSaggingScore > 60 ? 'مترهل' : 'طبيعي',
      jawline: jawDefinition < 0.7 ? 'مترهل' : 'طبيعي',
      underEyes: underEyeSagging > underEyeRegion.length * 0.3 ? 'مترهل' : 'طبيعي'
    }
  };
}

function calculateJawDefinition(jawlineRegion) {
  // حساب وضوح خط الفك - كلما كان أكثر وضوحاً، كان أفضل
  if (!jawlineRegion || jawlineRegion.length < 3) return 0.8;
  
  let totalAngle = 0;
  for (let i = 1; i < jawlineRegion.length - 1; i++) {
    const prev = jawlineRegion[i - 1];
    const curr = jawlineRegion[i];
    const next = jawlineRegion[i + 1];
    
    const angle1 = Math.atan2(curr.y - prev.y, curr.x - prev.x);
    const angle2 = Math.atan2(next.y - curr.y, next.x - curr.x);
    const angleDiff = Math.abs(angle1 - angle2);
    totalAngle += angleDiff;
  }
  
  const avgAngle = totalAngle / (jawlineRegion.length - 2);
  // زاوية أكبر = خط فك أكثر وضوحاً
  return Math.min(1, avgAngle / Math.PI);
}

function calculateSymmetry(positions) {
  // حساب التناسق بين الجانبين
  const leftSide = positions.slice(0, 9);
  const rightSide = positions.slice(9, 17).reverse();
  
  let totalDiff = 0;
  let count = 0;

  for (let i = 0; i < Math.min(leftSide.length, rightSide.length); i++) {
    const diff = Math.abs(leftSide[i].y - rightSide[i].y);
    totalDiff += diff;
    count++;
  }

  const avgDiff = count > 0 ? totalDiff / count : 0;
  const maxDiff = 50; // قيمة عشوائية للمقارنة
  const symmetry = Math.max(0, 100 - (avgDiff / maxDiff) * 100);

  return symmetry;
}

function calculateGoldenRatio(positions) {
  // حساب النسب الذهبية (1.618)
  const faceWidth = Math.abs(positions[16].x - positions[0].x);
  const faceHeight = Math.abs(positions[8].y - positions[27].y);
  const idealRatio = 1.618;
  const actualRatio = faceHeight / faceWidth;
  const ratioScore = Math.min(100, (1 - Math.abs(actualRatio - idealRatio) / idealRatio) * 100);

  return ratioScore;
}

function determineFaceShape(positions) {
  if (!positions || positions.length < 68) {
    return 'بيضاوي'; // Default
  }

  // النقاط الرئيسية
  const chin = positions[8];              // الذقن (النقطة 8)
  const noseTop = positions[27];         // أعلى الأنف
  
  // للجبهة: استخدام نقاط الحواجب (17 و 26) فقط - هذه تمثل عرض الجبهة
  const eyebrowLeft = positions[17];     // الحاجب الأيسر الخارجي
  const eyebrowRight = positions[26];    // الحاجب الأيمن الخارجي
  
  // للخدود: استخدام عدة نقاط لإيجاد أوسع جزء من الخدود
  // النقاط 1-5 للخد الأيسر، 11-15 للخد الأيمن
  // نبحث عن أوسع مسافة في منطقة الخدود (منتصف الوجه)
  let maxCheekWidth = 0;
  let cheekLeftPoint = positions[3];
  let cheekRightPoint = positions[13];
  
  // البحث عن أوسع مسافة في منطقة الخدود
  // نبحث في منطقة أعلى قليلاً (النقاط 2-4 و 12-14) لأنها تمثل أوسع جزء من الخدود
  for (let i = 2; i <= 4; i++) {
    for (let j = 12; j <= 14; j++) {
      const width = Math.abs(positions[j].x - positions[i].x);
      if (width > maxCheekWidth) {
        maxCheekWidth = width;
        cheekLeftPoint = positions[i];
        cheekRightPoint = positions[j];
      }
    }
  }
  
  // للفك: استخدام نقاط في أسفل الفك (2 و 14 أو 4 و 12)
  // نستخدم النقاط في أسفل الفك
  const jawLeft = positions[4] || positions[2];          // الفك الأيسر السفلي
  const jawRight = positions[12] || positions[14];    // الفك الأيمن السفلي

  // حساب القياسات
  const eyebrowWidth = Math.abs(eyebrowRight.x - eyebrowLeft.x);
  const cheekWidth = Math.abs(cheekRightPoint.x - cheekLeftPoint.x);
  const jawWidth = Math.abs(jawRight.x - jawLeft.x);
  const faceLength = Math.abs(chin.y - noseTop.y);
  
  // للجبهة: نستخدم فقط عرض الحواجب (17 و 26) لأنها تمثل الجبهة
  const topWidth = eyebrowWidth;
  const faceWidth = Math.max(topWidth, cheekWidth, jawWidth);

  // حساب النسب - تحسين الدقة
  const foreheadToJawRatio = topWidth / (jawWidth || 1); // Avoid division by zero
  const cheekToForeheadRatio = cheekWidth / (topWidth || 1);
  const cheekToJawRatio = cheekWidth / (jawWidth || 1);
  const lengthToWidthRatio = faceLength / (faceWidth || 1);
  
  // حساب الفروقات المطلقة (بالبكسل)
  const cheekForeheadDiff = cheekWidth - topWidth;
  const cheekJawDiff = cheekWidth - jawWidth;
  const foreheadJawDiff = topWidth - jawWidth;
  
  // Debug logging (يمكن إزالته لاحقاً)
  console.log('Face Shape Analysis:', {
    eyebrowWidth: topWidth.toFixed(1),
    cheekWidth: cheekWidth.toFixed(1),
    jawWidth: jawWidth.toFixed(1),
    faceLength: faceLength.toFixed(1),
    faceWidth: faceWidth.toFixed(1),
    ratios: {
      foreheadToJaw: foreheadToJawRatio.toFixed(2),
      cheekToForehead: cheekToForeheadRatio.toFixed(2),
      cheekToJaw: cheekToJawRatio.toFixed(2),
      lengthToWidth: lengthToWidthRatio.toFixed(2)
    },
    differences: {
      cheekMinusForehead: cheekForeheadDiff.toFixed(1),
      cheekMinusJaw: cheekJawDiff.toFixed(1),
      foreheadMinusJaw: foreheadJawDiff.toFixed(1)
    }
  });
  
  // تحديد أوسع جزء في الوجه
  const widestPart = cheekWidth > topWidth && cheekWidth > jawWidth ? 'cheeks' :
                     topWidth > cheekWidth && topWidth > jawWidth ? 'forehead' :
                     jawWidth > cheekWidth && jawWidth > topWidth ? 'jaw' : 'equal';
  
  // حساب الفروقات النسبية
  const cheekWiderThanForehead = cheekWidth > topWidth * 1.01; // الخدود أوسع من الجبهة بنسبة 1% على الأقل
  const cheekWiderThanJaw = cheekWidth > jawWidth * 1.01;      // الخدود أوسع من الفك بنسبة 1% على الأقل
  const foreheadWiderThanJaw = topWidth > jawWidth * 1.03;      // الجبهة أوسع من الفك بنسبة 3% على الأقل
  const jawWiderThanForehead = jawWidth > topWidth * 1.03;       // الفك أوسع من الجبهة بنسبة 3% على الأقل
  const foreheadWiderThanCheek = topWidth > cheekWidth * 1.03;   // الجبهة أوسع من الخدود بنسبة 3% على الأقل
  const jawWiderThanCheek = jawWidth > cheekWidth * 1.03;        // الفك أوسع من الخدود بنسبة 3% على الأقل

  // تحديد شكل الوجه بناءً على النسب - التحقق من الأشكال الأكثر تحديداً أولاً
  
  // ماس (Diamond): الخدود أوسع من الجبهة والفك بشكل واضح
  // هذا هو الشكل الأكثر تحديداً، لذا نتحقق منه أولاً
  if (widestPart === 'cheeks' && cheekWiderThanForehead && cheekWiderThanJaw) {
    console.log('Detected: ماس (Diamond) - Cheeks are widest');
    return 'ماس';
  }
  
  // قلب (Heart): الجبهة أوسع بكثير من الفك، والخدود أضيق من الجبهة
  if (widestPart === 'forehead' && foreheadWiderThanJaw && foreheadWiderThanCheek && 
      cheekToForeheadRatio < 0.97) {
    console.log('Detected: قلب (Heart) - Forehead is widest');
    return 'قلب';
  }
  
  // مثلث (Triangle): الفك أوسع من الجبهة بشكل واضح
  if (widestPart === 'jaw' && jawWiderThanForehead && jawWiderThanCheek && 
      foreheadToJawRatio < 0.95) {
    console.log('Detected: مثلث (Triangle) - Jaw is widest');
    return 'مثلث';
  }
  
  // مربع (Square): الجبهة والفك متساويان تقريباً (±8%)، والوجه قصير نسبياً
  if (Math.abs(foreheadToJawRatio - 1) <= 0.08 && lengthToWidthRatio < 1.4) {
    console.log('Detected: مربع (Square) - Equal width, short face');
    return 'مربع';
  }
  
  // دائري (Round): الجبهة والفك متساويان تقريباً (±8%)، والوجه متوسط الطول
  if (Math.abs(foreheadToJawRatio - 1) <= 0.08 && lengthToWidthRatio >= 1.4 && lengthToWidthRatio < 1.6) {
    console.log('Detected: دائري (Round) - Equal width, medium length');
    return 'دائري';
  }
  
  // مستطيل (Rectangle/Oblong): الجبهة والفك متساويان تقريباً، والوجه طويل جداً
  if (Math.abs(foreheadToJawRatio - 1) <= 0.08 && lengthToWidthRatio >= 1.6) {
    console.log('Detected: مستطيل (Rectangle) - Equal width, long face');
    return 'مستطيل';
  }
  
  // بيضاوي (Oval): حالة افتراضية - الجبهة والفك متقاربان نسبياً، والوجه طويل نسبياً
  // أو أي حالة أخرى لا تنطبق عليها الشروط أعلاه
  console.log('Detected: بيضاوي (Oval) - default/fallback');
  return 'بيضاوي';
}

function calculateJawAngle(positions) {
  const jawline = positions.slice(0, 17);
  const leftPoint = jawline[0];
  const middlePoint = jawline[Math.floor(jawline.length / 2)];
  const rightPoint = jawline[jawline.length - 1];

  const angle1 = Math.atan2(middlePoint.y - leftPoint.y, middlePoint.x - leftPoint.x) * 180 / Math.PI;
  const angle2 = Math.atan2(rightPoint.y - middlePoint.y, rightPoint.x - middlePoint.x) * 180 / Math.PI;

  return Math.abs(angle2 - angle1);
}

function generateProportionRecommendations(symmetry, goldenRatio, faceShape) {
  const recommendations = [];
  
  if (symmetry < 85) {
    recommendations.push('يُنصح بتحسين التناسق الوجهي');
  }
  
  if (goldenRatio < 70) {
    recommendations.push('يمكن تحسين النسب الذهبية للوجه');
  }
  
  if (faceShape === 'مربع') {
    recommendations.push('يمكن استخدام تقنيات لتليين زوايا الوجه');
  }
  
  return recommendations;
}

/**
 * تحليل الشخصية بناءً على شكل الوجه والقياسات
 */
function analyzePersonality(positions, faceShape, symmetry, goldenRatio) {
  if (!positions || positions.length < 68) {
    return {
      faceShapeDescription: '',
      ageAppearance: '',
      intelligence: '',
      distance: '',
      fullAnalysis: ''
    };
  }

  // تحليل الميزات
  const noseAnalysis = analyzeNoseFeatures(positions);
  const eyeAnalysis = analyzeEyeFeatures(positions);
  const mouthAnalysis = analyzeMouthFeatures(positions);
  const chinAnalysis = analyzeChinFeatures(positions);
  const cheekAnalysis = analyzeCheekFeatures(positions);
  const faceLengthAnalysis = analyzeFaceLength(positions);

  // وصف شكل الوجه
  const faceShapeDescription = getFaceShapeDescription(faceShape);

  // مظهر العمر
  const ageAppearance = getAgeAppearance(noseAnalysis, faceLengthAnalysis, cheekAnalysis, chinAnalysis);

  // الذكاء
  const intelligence = getIntelligenceAnalysis(eyeAnalysis, mouthAnalysis, chinAnalysis);

  // المسافة/الانطباع
  const distance = getDistanceAnalysis(noseAnalysis, mouthAnalysis, symmetry);

  // التحليل الكامل
  const fullAnalysis = `${faceShapeDescription}\n\n${ageAppearance}\n\n${intelligence}\n\n${distance}`;

  return {
    faceShapeDescription,
    ageAppearance,
    intelligence,
    distance,
    fullAnalysis
  };
}

/**
 * تحليل ميزات الأنف
 */
function analyzeNoseFeatures(positions) {
  const noseTop = positions[27];
  const noseTip = positions[33];
  const noseLeft = positions[31];
  const noseRight = positions[35];
  const noseBridge = positions[28];
  
  const noseLength = Math.abs(noseTip.y - noseTop.y);
  const noseWidth = Math.abs(noseRight.x - noseLeft.x);
  const noseBridgeHeight = Math.abs(noseBridge.y - noseTop.y);
  
  // حساب زاوية طرف الأنف
  const noseAngle = Math.atan2(noseTip.y - noseBridge.y, Math.abs(noseTip.x - noseBridge.x)) * 180 / Math.PI;
  
  return {
    length: noseLength,
    width: noseWidth,
    bridgeHeight: noseBridgeHeight,
    angle: noseAngle,
    hasProminentFolds: noseBridgeHeight > noseLength * 0.3, // طيات الأنف بارزة
    isStraight: Math.abs(noseBridge.x - noseTip.x) < noseWidth * 0.1, // مستقيم
    isHooked: noseAngle < 85 // يشبه منقار النسر
  };
}

/**
 * تحليل ميزات العيون
 */
function analyzeEyeFeatures(positions) {
  const leftEyeTop = positions[37];
  const leftEyeBottom = positions[41];
  const rightEyeTop = positions[43];
  const rightEyeBottom = positions[47];
  
  const leftEyeHeight = Math.abs(leftEyeBottom.y - leftEyeTop.y);
  const rightEyeHeight = Math.abs(rightEyeBottom.y - rightEyeTop.y);
  const avgEyeHeight = (leftEyeHeight + rightEyeHeight) / 2;
  
  // جفون مزدوجة (عيون لامعة)
  const hasDoubleEyelids = avgEyeHeight > 8; // تقريباً
  
  return {
    height: avgEyeHeight,
    hasDoubleEyelids,
    isBright: hasDoubleEyelids
  };
}

/**
 * تحليل ميزات الفم
 */
function analyzeMouthFeatures(positions) {
  const mouthTop = positions[51];
  const mouthBottom = positions[57];
  const mouthLeft = positions[48];
  const mouthRight = positions[54];
  const mouthCorners = [positions[48], positions[54]];
  
  const mouthWidth = Math.abs(mouthRight.x - mouthLeft.x);
  const mouthHeight = Math.abs(mouthBottom.y - mouthTop.y);
  const lowerLipThickness = Math.abs(positions[57].y - positions[51].y) * 0.6; // سماكة الشفة السفلى
  
  // زوايا الفم (متدلية أو مرتفعة)
  const mouthAngle = Math.atan2(mouthCorners[1].y - mouthCorners[0].y, mouthCorners[1].x - mouthCorners[0].x) * 180 / Math.PI;
  const isDrooping = mouthAngle < -5; // متدلية
  
  return {
    width: mouthWidth,
    height: mouthHeight,
    lowerLipThickness,
    isDrooping,
    isThickLowerLip: lowerLipThickness > mouthHeight * 0.4
  };
}

/**
 * تحليل ميزات الذقن
 */
function analyzeChinFeatures(positions) {
  const chin = positions[8];
  const jawLeft = positions[4];
  const jawRight = positions[12];
  const mouthBottom = positions[57];
  
  const chinLength = Math.abs(chin.y - mouthBottom.y);
  const jawWidth = Math.abs(jawRight.x - jawLeft.x);
  
  // الذقن مستدير أو حاد
  const chinRoundness = Math.abs(chin.x - (jawLeft.x + jawRight.x) / 2) / jawWidth;
  const isRound = chinRoundness < 0.1;
  const isLong = chinLength > 15; // نسبياً
  
  return {
    length: chinLength,
    isLong,
    isRound,
    isProminent: chinLength > 12
  };
}

/**
 * تحليل ميزات الخدود
 */
function analyzeCheekFeatures(positions) {
  const cheekLeft = positions[3];
  const cheekRight = positions[13];
  const eyeLeft = positions[36];
  const eyeRight = positions[45];
  
  const cheekWidth = Math.abs(cheekRight.x - cheekLeft.x);
  const eyeWidth = Math.abs(eyeRight.x - eyeLeft.x);
  
  // عظام وجنتين بارزة أو غائرة
  const cheekProminence = cheekWidth / eyeWidth;
  const isProminent = cheekProminence > 1.8;
  const isHollow = cheekProminence < 1.5;
  
  return {
    width: cheekWidth,
    isProminent,
    isHollow
  };
}

/**
 * تحليل طول الوجه
 */
function analyzeFaceLength(positions) {
  const chin = positions[8];
  const noseTop = positions[27];
  const foreheadTop = positions[27]; // تقريباً
  
  const faceLength = Math.abs(chin.y - noseTop.y);
  const faceWidth = Math.abs(positions[16].x - positions[0].x);
  const lengthRatio = faceLength / faceWidth;
  
  return {
    length: faceLength,
    ratio: lengthRatio,
    isLong: lengthRatio > 1.5,
    lowerFaceLong: Math.abs(chin.y - positions[51].y) > faceLength * 0.4 // جزء وجه سفلي طويل
  };
}

/**
 * وصف شكل الوجه
 */
function getFaceShapeDescription(faceShape) {
  const descriptions = {
    'ماس': 'لديكِ وجه ماسي الشكل، وهو شكل وجه يضفي عليكِ جاذبية قوية وأنثوية. هذا النوع من الوجوه يجعلكِ تبدين ذكية وتتمتعين بشخصية حازمة إلى حد ما. باختصار، هو مزيج من الأنوثة والرقي ولمسة من الغرور.',
    'قلب': 'لديكِ وجه قلبي الشكل، وهو شكل وجه رومانسي وجذاب. هذا النوع من الوجوه يجعلكِ تبدين لطيفة ومحبة، مع شخصية دافئة ومشجعة. باختصار، هو مزيج من الأنوثة والرقة والجاذبية الطبيعية.',
    'مثلث': 'لديكِ وجه مثلثي الشكل، وهو شكل وجه قوي وواثق. هذا النوع من الوجوه يجعلكِ تبدين حازمة وواضحة في قراراتك، مع شخصية قيادية. باختصار، هو مزيج من القوة والثقة والوضوح.',
    'مربع': 'لديكِ وجه مربع الشكل، وهو شكل وجه قوي ومتوازن. هذا النوع من الوجوه يجعلكِ تبدين موثوقة وعملية، مع شخصية مستقرة. باختصار، هو مزيج من القوة والاستقرار والموثوقية.',
    'دائري': 'لديكِ وجه دائري الشكل، وهو شكل وجه ودود ومريح. هذا النوع من الوجوه يجعلكِ تبدين لطيفة ومقربة، مع شخصية اجتماعية. باختصار، هو مزيج من الدفء والود والجاذبية الطبيعية.',
    'مستطيل': 'لديكِ وجه مستطيل الشكل، وهو شكل وجه أنيق وممدود. هذا النوع من الوجوه يجعلكِ تبدين راقية ومهذبة، مع شخصية متوازنة. باختصار، هو مزيج من الأناقة والرقي والاتزان.',
    'بيضاوي': 'لديكِ وجه بيضاوي الشكل، وهو شكل وجه متوازن ومتناسق. هذا النوع من الوجوه يجعلكِ تبدين جميلة ومتناسقة، مع شخصية متوازنة. باختصار، هو مزيج من الجمال الطبيعي والتناسق والأناقة.'
  };
  
  return descriptions[faceShape] || descriptions['بيضاوي'];
}

/**
 * تحليل مظهر العمر
 */
function getAgeAppearance(noseAnalysis, faceLengthAnalysis, cheekAnalysis, chinAnalysis) {
  const factors = [];
  
  if (noseAnalysis.hasProminentFolds) {
    factors.push('طيات الأنف لديك بارزة');
  }
  
  if (faceLengthAnalysis.lowerFaceLong) {
    factors.push('جزء وجهك السفلي طويل');
  }
  
  if (cheekAnalysis.isHollow) {
    factors.push('عظام وجنتيك غائرة');
  } else if (cheekAnalysis.isProminent) {
    factors.push('عظام وجنتيك بارزة');
  }
  
  if (chinAnalysis.isLong) {
    factors.push('ذقنك طويل نسبياً');
  }
  
  if (factors.length > 0) {
    return `مظهر العمر: ${factors.join('، ')}، مما يجعلك تبدو${chinAnalysis.isProminent ? ' أكبر' : ' متعباً'}. ${chinAnalysis.isLong && chinAnalysis.isProminent ? 'ذقنك طويل نسبياً وعظام وجنتيك بارزة، لذا تبدو أكبر من عمرك الحقيقي.' : ''}`;
  }
  
  return 'مظهر العمر: ملامحك متوازنة وتناسب عمرك الحقيقي.';
}

/**
 * تحليل الذكاء
 */
function getIntelligenceAnalysis(eyeAnalysis, mouthAnalysis, chinAnalysis) {
  const factors = [];
  
  if (eyeAnalysis.hasDoubleEyelids) {
    factors.push('جفناك المزدوجان يجعلان عينيك تبدوان لامعتين وذكيتين');
  }
  
  if (mouthAnalysis.isThickLowerLip) {
    factors.push('شفتك السفلى سميكة نسبيًا');
  }
  
  if (chinAnalysis.isRound) {
    factors.push('ذقنك مستدير');
  }
  
  if (factors.length > 0) {
    return `الذكاء: ${factors.join('، ')}. لذلك، لا تبدو شديد الدهاء ولا ساذجًا بشكل مفرط من حيث الذكاء.`;
  }
  
  return 'الذكاء: ملامحك تعكس ذكاءً متوازناً ووضوحاً في التفكير.';
}

/**
 * تحليل المسافة/الانطباع
 */
function getDistanceAnalysis(noseAnalysis, mouthAnalysis, symmetry) {
  const factors = [];
  
  if (noseAnalysis.isStraight && noseAnalysis.bridgeHeight > 0) {
    factors.push('جسر أنفك مرتفع ومستقيم');
  }
  
  if (noseAnalysis.isHooked) {
    factors.push('طرف أنفك يشبه طرف أنف النسر');
  }
  
  if (mouthAnalysis.isDrooping) {
    factors.push('زوايا فمك متدلية');
  }
  
  if (factors.length > 0) {
    const impression = noseAnalysis.isHooked ? 'ماكرًا ومنعزلًا' : 'باردًا';
    const message = mouthAnalysis.isDrooping ? '، مما يوحي للآخرين بأن الغرباء لا ينبغي لهم الاقتراب منك' : '';
    return `المسافة: ${factors.join('، ')}، مما يجعلك تبدو ${impression}${message}. من حيث المسافة، تبدو وكأنك تتمتع بهالة باردة.`;
  }
  
  return 'المسافة: ملامحك تعطي انطباعاً متوازناً بين الدفء والاحتراف.';
}

function analyzeTZone(ctx, positions, width, height) {
  const tzonePoints = [...positions.slice(27, 36), positions[8]];
  const sebum = analyzeSebum(ctx, tzonePoints, width, height);
  const pores = analyzePores(ctx, tzonePoints, width, height);

  return {
    sebum: sebum.level,
    pores: pores.size,
    condition: sebum.level === 'عالي' ? 'دهنية' : 'طبيعية'
  };
}

function analyzeUnderEyes(ctx, positions, width, height) {
  const darkCircles = analyzeDarkCircles(ctx, positions, width, height);
  const leftEye = positions.slice(36, 42);
  const rightEye = positions.slice(42, 48);

  return {
    darkCircles: darkCircles.severity,
    wrinkles: estimateWrinkles(leftEye) + estimateWrinkles(rightEye),
    hydration: 'طبيعي' // يمكن تحسينه
  };
}

function analyzeCheeks(ctx, positions, width, height) {
  const cheekRegion = positions.slice(1, 15);
  const texture = analyzeTexture(ctx, cheekRegion, width, height);
  const hydration = analyzeHydration(ctx, cheekRegion, width, height);

  return {
    texture: texture.quality,
    hydration: hydration.level,
    condition: 'صحي'
  };
}

function analyzeLips(positions) {
  // تحليل شامل للفم: الشفاه، خطوط الابتسامة، الخطوط الدقيقة حول الفم
  const mouth = positions.slice(48, 68);
  const width = Math.sqrt(
    Math.pow(positions[54].x - positions[48].x, 2) + 
    Math.pow(positions[54].y - positions[48].y, 2)
  );
  const height = Math.sqrt(
    Math.pow(positions[57].x - positions[51].x, 2) + 
    Math.pow(positions[57].y - positions[51].y, 2)
  );

  // تحليل خطوط الابتسامة (nasolabial lines)
  const nasolabialLeftLength = Math.sqrt(
    Math.pow(positions[48].x - positions[31].x, 2) + 
    Math.pow(positions[48].y - positions[31].y, 2)
  );
  const nasolabialRightLength = Math.sqrt(
    Math.pow(positions[54].x - positions[35].x, 2) + 
    Math.pow(positions[54].y - positions[35].y, 2)
  );
  const avgNasolabialLength = (nasolabialLeftLength + nasolabialRightLength) / 2;
  
  // تحليل الخطوط الدقيقة حول الفم (marionette lines)
  const marionetteLeftLength = Math.sqrt(
    Math.pow(positions[8].x - positions[48].x, 2) + 
    Math.pow(positions[8].y - positions[48].y, 2)
  );
  const marionetteRightLength = Math.sqrt(
    Math.pow(positions[8].x - positions[54].x, 2) + 
    Math.pow(positions[8].y - positions[54].y, 2)
  );
  const avgMarionetteLength = (marionetteLeftLength + marionetteRightLength) / 2;

  // تقييم خطوط الابتسامة (كلما كانت أطول، كانت أعمق)
  const smileLinesSeverity = avgNasolabialLength > 80 ? 'واضح' : 
                              avgNasolabialLength > 60 ? 'متوسط' : 'خفيف';
  const hasSmileLines = avgNasolabialLength > 60;

  // تقييم الخطوط الدقيقة حول الفم
  const fineLinesSeverity = avgMarionetteLength > 70 ? 'واضح' : 
                            avgMarionetteLength > 50 ? 'متوسط' : 'خفيف';
  const hasFineLines = avgMarionetteLength > 50;

  return {
    size: width / height > 3 ? 'كبير' : width / height < 2.5 ? 'صغير' : 'متوسط',
    condition: 'صحي',
    smileLines: {
      present: hasSmileLines,
      severity: smileLinesSeverity,
      length: Math.round(avgNasolabialLength)
    },
    fineLinesAroundMouth: {
      present: hasFineLines,
      severity: fineLinesSeverity,
      length: Math.round(avgMarionetteLength)
    }
  };
}

function analyzeNeck(positions) {
  // تحليل بسيط للرقبة (بناءً على الفك)
  const jawline = positions.slice(0, 17);
  const angle = calculateJawAngle(positions);

  return {
    definition: angle > 120 ? 'واضح' : 'عادي',
    condition: 'صحي'
  };
}

// ===== الوظائف المساعدة الأساسية =====

function calculateBrightness(imageData) {
  let total = 0;
  let count = 0;
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    total += brightness;
    count++;
  }

  return count > 0 ? total / count : 0;
}

function calculateVariation(imageData) {
  const data = imageData.data;
  const brightnesses = [];

  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    brightnesses.push(brightness);
  }

  const avg = brightnesses.reduce((a, b) => a + b, 0) / brightnesses.length;
  const variance = brightnesses.reduce((sum, b) => sum + Math.pow(b - avg, 2), 0) / brightnesses.length;

  return Math.sqrt(variance);
}

function estimateWrinkles(points) {
  if (!points || points.length < 2) return 0;

  let variance = 0;
  const avgY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

  points.forEach(point => {
    variance += Math.abs(point.y - avgY);
  });

  return Math.round(variance / points.length / 5);
}

