// Professional Face Analysis - Structured JSON Output
// This module provides detailed, step-by-step face analysis focusing only on problems/conditions

import { 
  analyzeAdvancedSkin, 
  analyzeSkinProblems, 
  analyzeFacialProportions,
  analyzeSpecificRegions
} from './advancedFaceAnalysis';

/**
 * Convert Arabic severity to English format
 */
const convertSeverity = (arabicSeverity) => {
  const severityMap = {
    'لا يوجد': 'none',
    'خفيف': 'mild',
    'متوسط': 'moderate',
    'واضح': 'moderate',
    'عالي': 'severe',
    'شديد': 'severe'
  };
  return severityMap[arabicSeverity] || 'none';
};

/**
 * Convert Arabic skin type to English
 */
const convertSkinType = (arabicType) => {
  const typeMap = {
    'دهنية': 'oily',
    'جافة': 'dry',
    'مختلطة': 'combination',
    'حساسة': 'sensitive',
    'عادية': 'normal'
  };
  return typeMap[arabicType] || 'combination';
};

/**
 * Analyze forehead region specifically
 */
const analyzeForeheadRegion = (ctx, positions, width, height, wrinkles, pigmentation) => {
  const foreheadPoints = positions.slice(17, 27); // Eyebrow area
  
  let textureIssues = 0;
  let pigmentationCount = 0;
  
  foreheadPoints.forEach(point => {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const imgData = ctx.getImageData(x, y, 1, 1);
      const brightness = (imgData.data[0] + imgData.data[1] + imgData.data[2]) / 3;
      
      // Texture irregularities
      if (brightness < 100 || brightness > 200) {
        textureIssues++;
      }
      
      // Pigmentation
      if (brightness < 120) {
        pigmentationCount++;
      }
    }
  });
  
  const foreheadWrinkles = wrinkles?.forehead || 0;
  const wrinkleSeverity = foreheadWrinkles > 5 ? 'severe' : 
                          foreheadWrinkles > 2 ? 'moderate' : 
                          foreheadWrinkles > 0 ? 'mild' : 'none';
  
  const linesSeverity = wrinkleSeverity; // Fine lines same as wrinkles for forehead
  
  return {
    wrinkles: wrinkleSeverity,
    lines: linesSeverity,
    pigmentation: pigmentationCount > 2,
    textureIrregularities: textureIssues > 5
  };
};

/**
 * Analyze nose region specifically
 */
const analyzeNoseRegion = (ctx, positions, width, height, acne) => {
  const nosePoints = positions.slice(27, 36);
  
  let blackheadCount = 0;
  let rednessCount = 0;
  let poreIssues = 0;
  
  nosePoints.forEach(point => {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const imgData = ctx.getImageData(x, y, 1, 1);
      const r = imgData.data[0];
      const g = imgData.data[1];
      const b = imgData.data[2];
      const brightness = (r + g + b) / 3;
      
      // Blackheads (dark spots)
      if (brightness < 90) {
        blackheadCount++;
      }
      
      // Redness
      if (r > g + 20 && r > b + 20 && brightness < 150) {
        rednessCount++;
      }
      
      // Pore issues (texture irregularities)
      if (brightness < 100 || brightness > 200) {
        poreIssues++;
      }
    }
  });
  
  const noseAcne = acne?.location?.nose || 0;
  const hasBlackheads = blackheadCount > 2 || noseAcne > 0;
  const hasRedness = rednessCount > 2;
  const poresEnlarged = poreIssues > 3;
  
  return {
    pores: poresEnlarged ? 'enlarged' : 'normal',
    blackheads: hasBlackheads,
    redness: hasRedness
  };
};

/**
 * Analyze mouth area specifically
 */
const analyzeMouthArea = (ctx, positions, width, height, wrinkles, specificRegions) => {
  const mouthPoints = positions.slice(48, 68);
  
  let lipDryness = 0;
  let textureIssues = 0;
  
  mouthPoints.forEach(point => {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const imgData = ctx.getImageData(x, y, 1, 1);
      const brightness = (imgData.data[0] + imgData.data[1] + imgData.data[2]) / 3;
      
      // Lip dryness (darker areas)
      if (brightness < 100) {
        lipDryness++;
      }
      
      // Texture issues
      if (brightness < 100 || brightness > 200) {
        textureIssues++;
      }
    }
  });
  
  const smileLines = wrinkles?.nasolabial || 0;
  const fineLines = wrinkles?.marionette || 0;
  const sagging = specificRegions?.lips?.sagging || 'none';
  
  const smileLinesSeverity = smileLines > 5 ? 'severe' : 
                            smileLines > 2 ? 'moderate' : 
                            smileLines > 0 ? 'mild' : 'none';
  
  const saggingSeverity = sagging === 'موجود' ? 'moderate' : 'none';
  
  let lipsCondition = 'normal';
  if (lipDryness > 3) {
    lipsCondition = 'dry';
  } else if (textureIssues < 2) {
    lipsCondition = 'plump';
  }
  
  return {
    smileLines: smileLinesSeverity,
    lipsCondition: lipsCondition,
    sagging: saggingSeverity,
    fineLines: fineLines > 0 ? 'mild' : 'none'
  };
};

/**
 * Analyze cheeks region specifically
 */
const analyzeCheeksRegion = (ctx, positions, width, height, acne, pigmentation, sagging) => {
  const cheekPoints = positions.slice(1, 15);
  
  let acneCount = 0;
  let pigmentationCount = 0;
  let textureIssues = 0;
  
  cheekPoints.forEach(point => {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const imgData = ctx.getImageData(x, y, 1, 1);
      const brightness = (imgData.data[0] + imgData.data[1] + imgData.data[2]) / 3;
      const r = imgData.data[0];
      
      // Acne detection (red spots)
      if (r > 150 && brightness < 140) {
        acneCount++;
      }
      
      // Pigmentation
      if (brightness < 120) {
        pigmentationCount++;
      }
      
      // Texture issues
      if (brightness < 100 || brightness > 200) {
        textureIssues++;
      }
    }
  });
  
  const cheekAcne = acne?.location?.cheeks || 0;
  const totalAcne = acneCount + cheekAcne;
  const acneSeverity = totalAcne > 8 ? 'severe' : 
                       totalAcne > 3 ? 'moderate' : 
                       totalAcne > 0 ? 'mild' : 'none';
  
  const hasPigmentation = pigmentationCount > 3 || (pigmentation?.level && pigmentation.level !== 'لا يوجد');
  
  const saggingSeverity = sagging?.cheeks === 'مترهل' ? 'moderate' : 
                          sagging?.severity === 'عالي' ? 'severe' :
                          sagging?.severity === 'متوسط' ? 'moderate' : 'none';
  
  return {
    acne: acneSeverity,
    pigmentation: hasPigmentation,
    sagging: saggingSeverity,
    textureIssues: textureIssues > 5
  };
};

/**
 * Analyze jawline specifically
 */
const analyzeJawlineRegion = (sagging) => {
  const jawlineSagging = sagging?.jawline === 'مترهل' ? 'moderate' : 
                         sagging?.severity === 'عالي' ? 'severe' :
                         sagging?.severity === 'متوسط' ? 'moderate' : 'none';
  
  return {
    sagging: jawlineSagging
  };
};

/**
 * Analyze chin specifically
 */
const analyzeChinRegion = (ctx, positions, width, height, acne) => {
  const chinPoint = positions[8];
  
  let textureIssues = 0;
  let blemishCount = 0;
  
  // Sample area around chin
  for (let i = -10; i <= 10; i += 2) {
    for (let j = -10; j <= 10; j += 2) {
      const x = Math.floor(chinPoint.x + i);
      const y = Math.floor(chinPoint.y + j);
      if (x >= 0 && x < width && y >= 0 && y < height) {
        const imgData = ctx.getImageData(x, y, 1, 1);
        const brightness = (imgData.data[0] + imgData.data[1] + imgData.data[2]) / 3;
        
        // Texture issues
        if (brightness < 100 || brightness > 200) {
          textureIssues++;
        }
        
        // Blemishes (dark spots)
        if (brightness < 90) {
          blemishCount++;
        }
      }
    }
  }
  
  const chinAcne = acne?.location?.chin || 0;
  const hasBlemishes = blemishCount > 2 || chinAcne > 0;
  
  let texture = 'smooth';
  if (textureIssues > 10) {
    texture = 'rough';
  } else if (textureIssues > 5) {
    texture = 'uneven';
  }
  
  return {
    texture: texture,
    blemishes: hasBlemishes
  };
};

/**
 * Main professional face analysis function
 * Returns structured JSON with all detected problems
 */
export const performProfessionalFaceAnalysis = (imageElement, landmarks, age) => {
  if (!landmarks || !landmarks.positions || !imageElement) {
    return {
      error: "Missing required data for analysis"
    };
  }

  const positions = landmarks.positions;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imageElement.width || imageElement.videoWidth || imageElement.naturalWidth;
  canvas.height = imageElement.height || imageElement.videoHeight || imageElement.naturalHeight;
  ctx.drawImage(imageElement, 0, 0);

  // Step 1: Skin Type & Overall Condition
  const advancedSkin = analyzeAdvancedSkin(imageElement, landmarks, ctx);
  const skinProblems = analyzeSkinProblems(imageElement, landmarks, age);
  const specificRegions = analyzeSpecificRegions(imageElement, landmarks);

  const skinType = convertSkinType(advancedSkin.type);
  const texture = advancedSkin.textureScore > 70 ? 'smooth' : 
                  advancedSkin.textureScore > 50 ? 'rough' : 'uneven';
  const tone = advancedSkin.textureEvenness === 'متساوي' ? 'even' : 'uneven';
  const imperfections = skinProblems.acne?.active || 
                       (skinProblems.pigmentation?.level && skinProblems.pigmentation.level !== 'لا يوجد') ||
                       skinProblems.darkCircles?.present;

  // Step 2: Forehead
  const forehead = analyzeForeheadRegion(
    ctx, positions, canvas.width, canvas.height, 
    skinProblems.wrinkles, 
    skinProblems.pigmentation
  );

  // Step 3: Eyes & Surrounding Area
  const darkCircles = skinProblems.darkCircles;
  const darkCirclesSeverity = convertSeverity(darkCircles?.severity || 'لا يوجد');
  const puffinessSeverity = darkCircles?.puffiness === 'موجود' ? 
                           convertSeverity(darkCircles.puffinessSeverity || 'خفيف') : 'none';
  const crowFeet = skinProblems.wrinkles?.crowFeet || 0;
  const crowFeetSeverity = crowFeet > 5 ? 'severe' : 
                           crowFeet > 2 ? 'moderate' : 
                           crowFeet > 0 ? 'mild' : 'none';
  const eyeSagging = specificRegions?.underEyes?.sagging === 'موجود' ? 'moderate' : 'none';

  // Step 4: Nose
  const nose = analyzeNoseRegion(
    ctx, positions, canvas.width, canvas.height, 
    skinProblems.acne
  );

  // Step 5: Mouth & Surrounding Area
  const mouthArea = analyzeMouthArea(
    ctx, positions, canvas.width, canvas.height, 
    skinProblems.wrinkles, 
    specificRegions
  );

  // Step 6: Cheeks
  const cheeks = analyzeCheeksRegion(
    ctx, positions, canvas.width, canvas.height, 
    skinProblems.acne, 
    skinProblems.pigmentation, 
    skinProblems.sagging
  );

  // Step 7: Jawline
  const jawline = analyzeJawlineRegion(skinProblems.sagging);

  // Step 8: Chin
  const chin = analyzeChinRegion(
    ctx, positions, canvas.width, canvas.height, 
    skinProblems.acne
  );

  // Generate summary
  const summaryParts = [];
  
  if (skinType !== 'normal') {
    summaryParts.push(`${skinType} skin type detected`);
  }
  if (imperfections) {
    summaryParts.push('visible imperfections present');
  }
  if (forehead.wrinkles !== 'none') {
    summaryParts.push(`forehead wrinkles: ${forehead.wrinkles}`);
  }
  if (darkCirclesSeverity !== 'none') {
    summaryParts.push(`dark circles: ${darkCirclesSeverity}`);
  }
  if (nose.blackheads) {
    summaryParts.push('nose blackheads detected');
  }
  if (mouthArea.smileLines !== 'none') {
    summaryParts.push(`smile lines: ${mouthArea.smileLines}`);
  }
  if (cheeks.acne !== 'none') {
    summaryParts.push(`cheek acne: ${cheeks.acne}`);
  }
  if (jawline.sagging !== 'none') {
    summaryParts.push(`jawline sagging: ${jawline.sagging}`);
  }

  const summary = summaryParts.length > 0 
    ? summaryParts.join('; ') + '.'
    : 'No significant issues detected.';

  // Return structured JSON
  return {
    skinType: skinType,
    overallSkin: {
      texture: texture,
      tone: tone,
      imperfections: imperfections
    },
    forehead: {
      wrinkles: forehead.wrinkles,
      lines: forehead.lines,
      pigmentation: forehead.pigmentation
    },
    eyes: {
      darkCircles: darkCirclesSeverity,
      puffiness: puffinessSeverity,
      crowFeet: crowFeetSeverity,
      sagging: eyeSagging
    },
    nose: {
      pores: nose.pores,
      blackheads: nose.blackheads,
      redness: nose.redness
    },
    mouthArea: {
      smileLines: mouthArea.smileLines,
      lipsCondition: mouthArea.lipsCondition,
      sagging: mouthArea.sagging
    },
    cheeks: {
      acne: cheeks.acne,
      pigmentation: cheeks.pigmentation,
      sagging: cheeks.sagging
    },
    jawline: {
      sagging: jawline.sagging
    },
    chin: {
      texture: chin.texture,
      blemishes: chin.blemishes
    },
    summary: summary
  };
};

