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
    sensitivity: textureAnalysis.sensitivity
  };
};

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

  return {
    acne: acneAnalysis,
    pigmentation: pigmentationAnalysis,
    darkCircles: darkCirclesAnalysis,
    wrinkles: wrinklesAnalysis,
    scars: scarsAnalysis,
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

  return {
    symmetry: Math.round(symmetry),
    goldenRatio: Math.round(goldenRatio),
    faceShape,
    jawAngle: Math.round(jawAngle),
    recommendations
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
  // تحليل التصبغات
  const cheekRegion = positions.slice(1, 15);
  let darkSpots = 0;

  cheekRegion.forEach(point => {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const imgData = ctx.getImageData(x, y, 1, 1);
      const brightness = (imgData.data[0] + imgData.data[1] + imgData.data[2]) / 3;
      if (brightness < 100) darkSpots++;
    }
  });

  const level = darkSpots > 5 ? 'عالي' : darkSpots > 2 ? 'متوسط' : 'منخفض';
  const types = darkSpots > 3 ? ['كلف', 'نمش'] : darkSpots > 1 ? ['نمش'] : [];

  return { level, types, count: darkSpots };
}

function analyzeDarkCircles(ctx, positions, width, height) {
  // تحليل الهالات السوداء
  const leftEye = positions.slice(36, 42);
  const rightEye = positions.slice(42, 48);
  const underEyePoints = [
    ...leftEye.map(p => ({ x: p.x, y: p.y + 10 })),
    ...rightEye.map(p => ({ x: p.x, y: p.y + 10 }))
  ];

  let totalBrightness = 0;
  let count = 0;

  underEyePoints.forEach(point => {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const imgData = ctx.getImageData(x, y, 1, 1);
      const brightness = (imgData.data[0] + imgData.data[1] + imgData.data[2]) / 3;
      totalBrightness += brightness;
      count++;
    }
  });

  const avgBrightness = count > 0 ? totalBrightness / count : 200;
  const present = avgBrightness < 140;
  const severity = avgBrightness < 100 ? 'واضح' : avgBrightness < 130 ? 'متوسط' : 'خفيف';

  return { present, severity };
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
  // تحليل مفصل للتجاعيد
  const foreheadPoints = positions.slice(27, 36);
  const leftEye = positions.slice(36, 42);
  const rightEye = positions.slice(42, 48);
  const mouth = positions.slice(48, 68);

  const foreheadWrinkles = estimateWrinkles(foreheadPoints);
  const eyeWrinkles = estimateWrinkles(leftEye) + estimateWrinkles(rightEye);
  const mouthWrinkles = estimateWrinkles(mouth);

  const ageFactor = Math.max(1, age / 30);

  return {
    total: Math.round((foreheadWrinkles + eyeWrinkles + mouthWrinkles) * ageFactor),
    forehead: Math.round(foreheadWrinkles * ageFactor),
    eyes: Math.round(eyeWrinkles * ageFactor),
    mouth: Math.round(mouthWrinkles * ageFactor)
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

  // النقاط الرئيسية - استخدام نقاط أكثر دقة
  const chin = positions[8];              // الذقن (النقطة 8)
  const foreheadLeft = positions[0];      // الجانب الأيسر من الجبهة/الفك
  const foreheadRight = positions[16];   // الجانب الأيمن من الجبهة/الفك
  
  // للخدود: استخدام نقاط في منتصف الخدود (أوسع جزء)
  // النقاط 3 و 13 هي في منتصف الخدود تقريباً
  const cheekLeft = positions[3] || positions[4];   // الخد الأيسر (أوسع جزء)
  const cheekRight = positions[13] || positions[12]; // الخد الأيمن (أوسع جزء)
  
  // للفك: استخدام نقاط في أسفل الفك
  const jawLeft = positions[2];          // الفك الأيسر السفلي
  const jawRight = positions[14];       // الفك الأيمن السفلي
  
  // للجبهة: استخدام نقاط الحواجب (17 و 26) أو أعلى النقاط
  const eyebrowLeft = positions[17];     // الحاجب الأيسر الخارجي
  const eyebrowRight = positions[26];    // الحاجب الأيمن الخارجي
  const noseTop = positions[27];         // أعلى الأنف

  // حساب القياسات - استخدام أفضل النقاط
  const foreheadWidth = Math.abs(foreheadRight.x - foreheadLeft.x);
  const eyebrowWidth = Math.abs(eyebrowRight.x - eyebrowLeft.x);
  const cheekWidth = Math.abs(cheekRight.x - cheekLeft.x);
  const jawWidth = Math.abs(jawRight.x - jawLeft.x);
  const faceLength = Math.abs(chin.y - noseTop.y);
  
  // استخدام أوسع عرض للجبهة (بين الجبهة والحواجب)
  const topWidth = Math.max(foreheadWidth, eyebrowWidth);
  const faceWidth = Math.max(topWidth, cheekWidth, jawWidth);

  // حساب النسب - تحسين الدقة
  const foreheadToJawRatio = topWidth / jawWidth;
  const cheekToForeheadRatio = cheekWidth / topWidth;
  const cheekToJawRatio = cheekWidth / jawWidth;
  const lengthToWidthRatio = faceLength / faceWidth;
  
  // حساب الفرق المطلق (أكثر دقة)
  const cheekWiderThanForehead = cheekWidth > topWidth * 1.05; // الخدود أوسع من الجبهة بنسبة 5% على الأقل
  const cheekWiderThanJaw = cheekWidth > jawWidth * 1.05;      // الخدود أوسع من الفك بنسبة 5% على الأقل
  const foreheadWiderThanJaw = topWidth > jawWidth * 1.1;      // الجبهة أوسع من الفك بنسبة 10% على الأقل
  const jawWiderThanForehead = jawWidth > topWidth * 1.1;       // الفك أوسع من الجبهة بنسبة 10% على الأقل

  // تحديد شكل الوجه بناءً على النسب - التحقق من الماس أولاً (الأكثر تحديداً)
  
  // ماس (Diamond): الخدود أوسع من الجبهة والفك بشكل واضح
  // هذا هو الشكل الأكثر تحديداً، لذا نتحقق منه أولاً
  if (cheekWiderThanForehead && cheekWiderThanJaw && cheekToForeheadRatio > 1.05 && cheekToJawRatio > 1.05) {
    return 'ماس';
  }
  
  // قلب (Heart): الجبهة أوسع بكثير من الفك، والخدود أضيق من الجبهة
  if (foreheadWiderThanJaw && cheekToForeheadRatio < 0.98) {
    return 'قلب';
  }
  
  // مثلث (Triangle): الفك أوسع من الجبهة بشكل واضح
  if (jawWiderThanForehead && foreheadToJawRatio < 0.9) {
    return 'مثلث';
  }
  
  // مربع (Square): الجبهة والفك متساويان تقريباً، والوجه قصير نسبياً
  if (foreheadToJawRatio >= 0.92 && foreheadToJawRatio <= 1.08 && lengthToWidthRatio < 1.35) {
    return 'مربع';
  }
  
  // دائري (Round): الجبهة والفك متساويان، والوجه متوسط الطول
  if (foreheadToJawRatio >= 0.92 && foreheadToJawRatio <= 1.08 && lengthToWidthRatio >= 1.35 && lengthToWidthRatio < 1.55) {
    return 'دائري';
  }
  
  // مستطيل (Rectangle/Oblong): الجبهة والفك متساويان، والوجه طويل جداً
  if (foreheadToJawRatio >= 0.92 && foreheadToJawRatio <= 1.08 && lengthToWidthRatio > 1.55) {
    return 'مستطيل';
  }
  
  // بيضاوي (Oval): الجبهة والفك متساويان تقريباً، والوجه طويل نسبياً (الأكثر شيوعاً)
  // أو أي حالة أخرى لا تنطبق عليها الشروط أعلاه
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
  const mouth = positions.slice(48, 68);
  const width = Math.sqrt(
    Math.pow(positions[54].x - positions[48].x, 2) + 
    Math.pow(positions[54].y - positions[48].y, 2)
  );
  const height = Math.sqrt(
    Math.pow(positions[57].x - positions[51].x, 2) + 
    Math.pow(positions[57].y - positions[51].y, 2)
  );

  return {
    size: width / height > 3 ? 'كبير' : width / height < 2.5 ? 'صغير' : 'متوسط',
    condition: 'صحي'
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

