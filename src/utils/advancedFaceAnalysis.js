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
      acne: { active: false, scars: false },
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
    scars: scarsAnalysis
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
  // تحليل بسيط لحب الشباب (بناءً على التباين)
  const tzone = [...positions.slice(27, 36), positions[8]];
  let variationSum = 0;
  let count = 0;

  tzone.forEach(point => {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    if (x >= 2 && x < width - 2 && y >= 2 && y < height - 2) {
      const imgData = ctx.getImageData(x - 1, y - 1, 3, 3);
      const variation = calculateVariation(imgData);
      variationSum += variation;
      count++;
    }
  });

  const avgVariation = count > 0 ? variationSum / count : 0;
  const active = avgVariation > 35;
  const scars = avgVariation > 25 && avgVariation < 35;

  return { active, scars, severity: active ? 'متوسط' : scars ? 'خفيف' : 'لا يوجد' };
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
  const jawline = positions.slice(0, 17);
  const foreheadWidth = Math.abs(positions[16].x - positions[0].x);
  const jawWidth = Math.abs(jawline[8].x - jawline[8].x);
  const faceLength = Math.abs(positions[8].y - positions[27].y);

  const jawlineWidth = Math.abs(jawline[Math.floor(jawline.length / 4)].x - jawline[Math.floor(jawline.length * 3 / 4)].x);
  
  if (foreheadWidth > jawlineWidth * 1.2) {
    return 'قلب';
  } else if (jawlineWidth > foreheadWidth * 1.1) {
    return 'مربع';
  } else if (faceLength / foreheadWidth > 1.5) {
    return 'بيضاوي';
  } else {
    return 'دائري';
  }
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

