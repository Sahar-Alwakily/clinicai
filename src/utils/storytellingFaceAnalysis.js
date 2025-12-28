// Storytelling Face Analysis - Interactive Narrative Style
// This module generates engaging, story-like analysis that convinces clients

import { performProfessionalFaceAnalysis } from './professionalFaceAnalysis';

/**
 * Convert English severity to Arabic narrative
 */
const getSeverityNarrative = (severity) => {
  const narratives = {
    'none': 'لا توجد',
    'mild': 'خفيفة',
    'moderate': 'متوسطة',
    'severe': 'واضحة'
  };
  return narratives[severity] || 'خفيفة';
};

/**
 * Convert skin type to Arabic
 */
const getSkinTypeArabic = (skinType) => {
  const types = {
    'oily': 'دهنية',
    'dry': 'جافة',
    'combination': 'مختلطة',
    'sensitive': 'حساسة',
    'normal': 'عادية'
  };
  return types[skinType] || 'مختلطة';
};

/**
 * Get face shape description in narrative style
 */
const getFaceShapeNarrative = (faceShape) => {
  const narratives = {
    'ماس': 'ماسي (Diamond)، خدود بارزة وذقن محدد. هذه الملامح تمنحك حضورًا فخمًا وحاد الملامح، وتبرز جمالك الطبيعي بطريقة ملفتة.',
    'قلب': 'قلبي (Heart)، جبهة عريضة وذقن مدبب. هذه الملامح تمنحك أنوثة جذابة وتوازنًا رائعًا بين القوة والرقة.',
    'مثلث': 'مثلثي (Triangle)، فك عريض وجبهة ضيقة. هذه الملامح تمنحك قوة في المظهر وتميزًا واضحًا.',
    'مربع': 'مربع (Square)، خطوط واضحة ومتناسقة. هذه الملامح تمنحك قوة وثقة في المظهر.',
    'دائري': 'دائري (Round)، ملامح ناعمة ومتناسقة. هذه الملامح تمنحك دفئًا وجاذبية طبيعية.',
    'مستطيل': 'مستطيل (Oblong)، وجه طويل ومتناسق. هذه الملامح تمنحك أناقة وتميزًا واضحًا.',
    'بيضاوي': 'بيضاوي (Oval)، ملامح متناسقة ومتوازنة. هذه الملامح تمنحك جمالًا كلاسيكيًا وأناقة طبيعية.'
  };
  return narratives[faceShape] || 'ملامح متناسقة وجذابة.';
};

/**
 * Generate personality impression narrative
 */
const generatePersonalityNarrative = (personalityAnalysis) => {
  if (!personalityAnalysis) {
    return 'ملامحك تعكس شخصية قوية وواثقة، مع جاذبية طبيعية تلفت الانتباه.';
  }
  
  let narrative = 'ملامحك تعكس ';
  
  if (personalityAnalysis.intelligence && personalityAnalysis.intelligence.includes('ذكية')) {
    narrative += 'ذكاءً واضحًا و';
  }
  if (personalityAnalysis.distance && personalityAnalysis.distance.includes('باردة')) {
    narrative += 'شخصية قوية وثقة عالية، مع ';
  } else {
    narrative += 'شخصية جذابة و';
  }
  
  narrative += 'انضباطًا وتوازنًا بين الأناقة والقوة. النظرة الأولى تكشف عن اهتمامك بالتفاصيل وجاذبيتك الطبيعية.';
  
  return narrative;
};

/**
 * Generate age appearance narrative
 */
const generateAgeAppearanceNarrative = (ageAppearance, professionalAnalysis) => {
  if (!ageAppearance) {
    return 'البشرة في حالة جيدة بشكل عام.';
  }
  
  let narrative = 'البشرة في حالة ';
  
  if (ageAppearance.isOlder) {
    narrative += `جيدة، لكن بعض العلامات تظهر مبكرًا:\n\n`;
    
    const issues = [];
    
    if (professionalAnalysis?.eyes?.darkCircles !== 'none') {
      issues.push(`الهالات تحت العين ${getSeverityNarrative(professionalAnalysis.eyes.darkCircles)}`);
    }
    
    if (professionalAnalysis?.mouthArea?.smileLines !== 'none') {
      issues.push(`خطوط الابتسامة حول الفم ${getSeverityNarrative(professionalAnalysis.mouthArea.smileLines)}`);
    }
    
    if (professionalAnalysis?.forehead?.wrinkles !== 'none') {
      issues.push(`التجاعيد البسيطة على الجبهة`);
    }
    
    if (professionalAnalysis?.cheeks?.pigmentation) {
      issues.push(`بعض التصبغات والكلف الخفيف على الخدين والجبهة`);
    }
    
    if (issues.length > 0) {
      narrative += issues.map((issue, index) => `${index + 1}. ${issue}`).join('\n');
      narrative += '\n\nهذه المؤشرات تحدد المناطق التي تحتاج رعاية للحفاظ على إشراقة وجهك.';
    } else {
      narrative += 'جيدة بشكل عام.';
    }
  } else if (ageAppearance.isYounger) {
    narrative += 'ممتازة، وتبدو أصغر من عمرك الحقيقي.';
  } else {
    narrative += 'جيدة ومتوازنة.';
  }
  
  return narrative;
};

/**
 * Generate skin characteristics narrative
 */
const generateSkinCharacteristicsNarrative = (advancedSkin, professionalAnalysis) => {
  if (!advancedSkin && !professionalAnalysis) {
    return '';
  }
  
  let narrative = '✨ سمات البشرة العامة:\n\n';
  
  const skinType = professionalAnalysis?.skinType || (advancedSkin?.type ? getSkinTypeArabic(advancedSkin.type) : 'مختلطة');
  const texture = professionalAnalysis?.overallSkin?.texture || 'متساوي';
  const tone = professionalAnalysis?.overallSkin?.tone || 'متساوي';
  
  narrative += `نوع البشرة: ${skinType}`;
  
  if (skinType === 'مختلطة') {
    narrative += ' (دهنية على الأنف والخدود، وجافة قليلًا على الجبهة والذقن)';
  }
  
  narrative += '\n\n';
  
  if (texture === 'uneven' || texture === 'rough') {
    narrative += `ملمس الجلد: غير متساوٍ قليلًا، مع مسامات واضحة وبقع وتصّبغات طفيفة\n\n`;
  } else {
    narrative += `ملمس الجلد: ${texture === 'smooth' ? 'ناعم ومتناسق' : 'متساوي'}\n\n`;
  }
  
  if (tone === 'uneven') {
    narrative += `اللون: متجانس جزئيًا مع اختلافات طفيفة تظهر الكلف والتصبغات، ما يضيف طابعًا طبيعيًا للبشرة`;
  } else {
    narrative += `اللون: ${tone === 'even' ? 'متجانس ومتناسق' : 'متساوي'}`;
  }
  
  return narrative;
};

/**
 * Generate eyes analysis narrative
 */
const generateEyesNarrative = (professionalAnalysis) => {
  if (!professionalAnalysis?.eyes) {
    return '';
  }
  
  const eyes = professionalAnalysis.eyes;
  const darkCircles = getSeverityNarrative(eyes.darkCircles);
  const puffiness = getSeverityNarrative(eyes.puffiness);
  const crowFeet = getSeverityNarrative(eyes.crowFeet);
  const sagging = getSeverityNarrative(eyes.sagging);
  
  let narrative = '👀 العيون والهالات:\n"';
  
  if (eyes.darkCircles !== 'none') {
    narrative += `الهالات السوداء تحت العين ${darkCircles}`;
    
    if (eyes.puffiness !== 'none') {
      narrative += `، مع انتفاخ ${puffiness}`;
    }
    
    narrative += ' وتجاويف واضحة.';
  } else if (eyes.puffiness !== 'none') {
    narrative += `انتفاخ ${puffiness} تحت العينين.`;
  } else {
    narrative += 'منطقة العين في حالة جيدة.';
  }
  
  if (eyes.sagging !== 'none') {
    narrative += ' الجلد رقيق ويفقد بعض المرونة.';
  }
  
  if (eyes.crowFeet !== 'none') {
    narrative += ` Crow's feet ${crowFeet} حول زوايا العين.`;
  }
  
  if (eyes.darkCircles !== 'none' || eyes.sagging !== 'none') {
    narrative += ' هذه المنطقة تحتاج فيلر خفيف أو علاج مخصص للهالات لإعادة الإشراقة."';
  } else {
    narrative += ' المنطقة في حالة ممتازة."';
  }
  
  return narrative;
};

/**
 * Generate forehead analysis narrative
 */
const generateForeheadNarrative = (professionalAnalysis) => {
  if (!professionalAnalysis?.forehead) {
    return '';
  }
  
  const forehead = professionalAnalysis.forehead;
  const wrinkles = getSeverityNarrative(forehead.wrinkles);
  const lines = getSeverityNarrative(forehead.lines);
  
  let narrative = '🟢 الجبهة:\n"';
  
  if (forehead.wrinkles !== 'none' || forehead.lines !== 'none') {
    narrative += `خطوط وتجاعيد ${wrinkles !== 'لا توجد' ? wrinkles : lines}`;
    
    if (forehead.pigmentation) {
      narrative += ' مع بعض الكلف والتصبغات.';
    } else {
      narrative += '.';
    }
    
    narrative += ' نقص مرونة الجلد واضح في هذه المنطقة، ويجعلها حساسة لأي تدخل تجميلي مثل البوتوكس أو جلسات شد خفيفة."';
  } else {
    narrative += 'منطقة الجبهة في حالة ممتازة، بدون تجاعيد أو تصبغات واضحة."';
  }
  
  return narrative;
};

/**
 * Generate mouth area analysis narrative
 */
const generateMouthNarrative = (professionalAnalysis) => {
  if (!professionalAnalysis?.mouthArea) {
    return '';
  }
  
  const mouth = professionalAnalysis.mouthArea;
  const smileLines = getSeverityNarrative(mouth.smileLines);
  const lipsCondition = mouth.lipsCondition === 'dry' ? 'جافة' : 
                       mouth.lipsCondition === 'plump' ? 'ممتلئة' : 'طبيعية';
  const sagging = getSeverityNarrative(mouth.sagging);
  
  let narrative = '👄 الفم والمنطقة المحيطة:\n"';
  
  const issues = [];
  
  if (mouth.smileLines !== 'none') {
    issues.push(`خطوط الابتسامة ${smileLines}`);
  }
  
  if (mouth.lipsCondition === 'dry') {
    issues.push('الشفاه جافة قليلًا');
  }
  
  if (mouth.sagging !== 'none') {
    issues.push(`ترهّل ${sagging} حول الزوايا`);
  }
  
  if (issues.length > 0) {
    narrative += issues.join('، ') + '.';
    narrative += ' المنطقة قد تستفيد من ملء التجاعيد الخفيفة والفيلر لتحسين الإطلالة الطبيعية."';
  } else {
    narrative += 'منطقة الفم في حالة ممتازة، بدون مشاكل واضحة."';
  }
  
  return narrative;
};

/**
 * Generate cheeks and jawline narrative
 */
const generateCheeksNarrative = (professionalAnalysis) => {
  if (!professionalAnalysis?.cheeks && !professionalAnalysis?.jawline && !professionalAnalysis?.chin) {
    return '';
  }
  
  let narrative = '🟢 الخدود والفك والذقن:\n"';
  
  const issues = [];
  
  if (professionalAnalysis.cheeks) {
    const acne = getSeverityNarrative(professionalAnalysis.cheeks.acne);
    const sagging = getSeverityNarrative(professionalAnalysis.cheeks.sagging);
    
    if (professionalAnalysis.cheeks.acne !== 'none') {
      issues.push(`حب الشباب ${acne} على الخدود`);
    }
    
    if (professionalAnalysis.cheeks.pigmentation) {
      issues.push('بعض التصبغات والكلف مرئية');
    }
    
    if (professionalAnalysis.cheeks.sagging !== 'none') {
      issues.push(`ترهّل ${sagging} في الفك والذقن`);
    }
  }
  
  if (issues.length > 0) {
    narrative += issues.join('، ') + '.';
    narrative += ' البروز الطبيعي للوجنتين ممتاز، لكن الجلد يحتاج تعزيز الامتلاء والمرونة لإبراز الملامح بشكل جذاب."';
  } else {
    narrative += 'الخدود والفك في حالة ممتازة، بدون مشاكل واضحة."';
  }
  
  return narrative;
};

/**
 * Generate professional summary narrative
 */
const generateProfessionalSummary = (professionalAnalysis) => {
  if (!professionalAnalysis) {
    return '';
  }
  
  let narrative = '📌 الخلاصة الاحترافية:\n"';
  narrative += 'أبرز المناطق التي تظهر علامات تقدم البشرة بشكل واضح:\n\n';
  
  const areas = [];
  
  if (professionalAnalysis.eyes && 
      (professionalAnalysis.eyes.darkCircles !== 'none' || 
       professionalAnalysis.eyes.puffiness !== 'none' || 
       professionalAnalysis.eyes.sagging !== 'none')) {
    const eyeIssues = [];
    if (professionalAnalysis.eyes.darkCircles !== 'none') eyeIssues.push('الهالات');
    if (professionalAnalysis.eyes.puffiness !== 'none') eyeIssues.push('التجاويف');
    if (professionalAnalysis.eyes.puffiness !== 'none') eyeIssues.push('الانتفاخ');
    areas.push(`العيون (${eyeIssues.join('، ')})`);
  }
  
  if (professionalAnalysis.forehead && 
      (professionalAnalysis.forehead.wrinkles !== 'none' || 
       professionalAnalysis.forehead.pigmentation)) {
    const foreheadIssues = [];
    if (professionalAnalysis.forehead.wrinkles !== 'none') foreheadIssues.push('التجاعيد');
    if (professionalAnalysis.forehead.pigmentation) {
      foreheadIssues.push('الكلف');
      foreheadIssues.push('التصبغات');
    }
    areas.push(`الجبهة (${foreheadIssues.join('، ')})`);
  }
  
  if (professionalAnalysis.mouthArea && 
      (professionalAnalysis.mouthArea.smileLines !== 'none' || 
       professionalAnalysis.mouthArea.sagging !== 'none')) {
    const mouthIssues = [];
    if (professionalAnalysis.mouthArea.smileLines !== 'none') mouthIssues.push('خطوط الابتسامة');
    if (professionalAnalysis.mouthArea.sagging !== 'none') mouthIssues.push('ترهّل الجلد');
    areas.push(`الفم (${mouthIssues.join('، ')})`);
  }
  
  if (professionalAnalysis.cheeks && 
      (professionalAnalysis.cheeks.acne !== 'none' || 
       professionalAnalysis.cheeks.pigmentation || 
       professionalAnalysis.cheeks.sagging !== 'none')) {
    const cheekIssues = [];
    if (professionalAnalysis.cheeks.acne !== 'none') cheekIssues.push('حب الشباب');
    if (professionalAnalysis.cheeks.pigmentation) {
      cheekIssues.push('الكلف');
    }
    if (professionalAnalysis.cheeks.sagging !== 'none') cheekIssues.push('الترهل');
    areas.push(`الخدود والفك (${cheekIssues.join('، ')})`);
  }
  
  if (areas.length > 0) {
    narrative += areas.map((area, index) => `${index + 1}. ${area}`).join('\n');
    narrative += '\n\nالتحليل يوضح بدقة كل منطقة تحتاج انتباهًا خاصًا، ويجعل أي تدخل تجميلي يبدو طبيعيًا وفخمًا للغاية، كما لو كنتِ في عيادة تجميل عالمية."';
  } else {
    narrative += 'جميع المناطق في حالة ممتازة، بدون مشاكل واضحة تحتاج إلى انتباه خاص."';
  }
  
  return narrative;
};

/**
 * Main function to generate storytelling analysis
 */
export const generateStorytellingAnalysis = (fullAnalysis, professionalAnalysis, ageAppearance) => {
  if (!fullAnalysis && !professionalAnalysis) {
    return {
      faceShape: '',
      personality: '',
      ageAppearance: '',
      skinCharacteristics: '',
      eyes: '',
      forehead: '',
      mouth: '',
      cheeks: '',
      summary: ''
    };
  }

  // Get face shape narrative
  const faceShape = fullAnalysis?.facialProportions?.faceShape || 'بيضاوي';
  const faceShapeNarrative = getFaceShapeNarrative(faceShape);
  
  // Get personality narrative
  const personalityNarrative = generatePersonalityNarrative(
    fullAnalysis?.facialProportions?.personalityAnalysis
  );
  
  // Get age appearance narrative
  const ageAppearanceNarrative = generateAgeAppearanceNarrative(
    ageAppearance,
    professionalAnalysis
  );
  
  // Get skin characteristics
  const skinCharacteristicsNarrative = generateSkinCharacteristicsNarrative(
    fullAnalysis?.advancedSkin,
    professionalAnalysis
  );
  
  // Get regional analyses
  const eyesNarrative = generateEyesNarrative(professionalAnalysis);
  const foreheadNarrative = generateForeheadNarrative(professionalAnalysis);
  const mouthNarrative = generateMouthNarrative(professionalAnalysis);
  const cheeksNarrative = generateCheeksNarrative(professionalAnalysis);
  const summaryNarrative = generateProfessionalSummary(professionalAnalysis);
  
  return {
    faceShape: `🔷 شكل الوجه:\n"وجهك ${faceShapeNarrative} دعينا نغوص في كل منطقة من وجهك لتكتشفي أسراره."`,
    personality: `💎 الانطباع والشخصية:\n"${personalityNarrative}"`,
    ageAppearance: `⏳ العمر المتوقع للبشرة وحالتها:\n"${ageAppearanceNarrative}"`,
    skinCharacteristics: skinCharacteristicsNarrative,
    eyes: eyesNarrative,
    forehead: foreheadNarrative,
    mouth: mouthNarrative,
    cheeks: cheeksNarrative,
    summary: summaryNarrative
  };
};

