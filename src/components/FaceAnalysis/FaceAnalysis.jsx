import React, { Component } from "react";
import styled from "styled-components";
import * as faceapi from "face-api.js";
import { 
  analyzeAdvancedSkin, 
  analyzeSkinProblems, 
  analyzeFacialProportions,
  analyzeSpecificRegions 
} from "../../utils/advancedFaceAnalysis";

const Container = styled.div`
  width: 100%;
  direction: rtl;
`;

const CameraContainer = styled.div`
  position: relative;
  width: 100%;
  background: #000;
  border-radius: 0.15rem;
  overflow: hidden;
  margin-bottom: 0.2rem;
`;

const Video = styled.video`
  width: 100%;
  display: ${props => props.show ? 'block' : 'none'};
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${props => props.show ? 'block' : 'none'};
`;

const OverlayCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${props => props.show ? 'block' : 'none'};
  pointer-events: none;
  z-index: 5;
`;

const CapturedImage = styled.img`
  width: 100%;
  display: ${props => props.show ? 'block' : 'none'};
  border-radius: 0.15rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 0.15rem;
  justify-content: center;
  margin: 0.2rem 0;
`;

const Button = styled.button`
  padding: 0.12rem 0.24rem;
  border: none;
  border-radius: 0.1rem;
  font-size: 0.18rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.08rem;
  
  ${props => props.primary && `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    
    &:hover {
      opacity: 0.9;
      transform: translateY(-0.02rem);
    }
  `}
  
  ${props => props.secondary && `
    background: #f0f0f0;
    color: #333;
    
    &:hover {
      background: #e0e0e0;
    }
  `}
  
  ${props => props.danger && `
    background: #ff6b6b;
    color: white;
    
    &:hover {
      background: #ff5252;
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.18rem;
  border-radius: 0.15rem;
  z-index: 10;
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 0.15rem;
  border-radius: 0.1rem;
  margin: 0.15rem 0;
  font-size: 0.16rem;
  text-align: center;
`;

class FaceAnalysis extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
    this.overlayCanvasRef = React.createRef();
    this.modelsLoaded = false;
  }

  state = {
    isStreaming: false,
    capturedImage: null,
    isAnalyzing: false,
    error: null,
    modelsLoading: false,
    showOverlay: false
  };

  componentDidMount() {
    this.loadModels();
  }

  componentWillUnmount() {
    this.stopCamera();
  }

  loadModels = async () => {
    try {
      this.setState({ modelsLoading: true, error: null });
      
      // المكتبة محملة بالفعل من الاستيراد
      
      // محاولة تحميل النماذج المحلية أولاً (إن وجدت)
      // ثم CDN كبديل
      const MODEL_URL = '/models/';
      const CDN_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';
      
      try {
        // محاولة تحميل من المجلد المحلي
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
        ]);
        console.log('Models loaded from local directory');
      } catch (localError) {
        console.log('Local models not found, trying CDN...', localError);
        // إذا فشل التحميل المحلي، استخدم CDN
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(CDN_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(CDN_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(CDN_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(CDN_URL),
          faceapi.nets.ageGenderNet.loadFromUri(CDN_URL)
        ]);
        console.log('Models loaded from CDN');
      }
      
      this.modelsLoaded = true;
      this.setState({ modelsLoading: false });
      
      if (this.props.onModelsLoaded) {
        this.props.onModelsLoaded();
      }
    } catch (error) {
      console.error('Error loading models:', error);
      this.setState({ 
        modelsLoading: false, 
        error: 'فشل تحميل نماذج الذكاء الاصطناعي. يرجى التأكد من وجود ملفات النماذج في مجلد /public/models/ أو التحقق من الاتصال بالإنترنت. راجع ملف FACE_ANALYSIS_SETUP.md للتعليمات.' 
      });
    }
  };

  startCamera = async () => {
    try {
      this.setState({ error: null });
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      
      if (this.videoRef.current) {
        this.videoRef.current.srcObject = stream;
        this.videoRef.current.play();
        this.setState({ isStreaming: true, capturedImage: null });
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      this.setState({ 
        error: 'لا يمكن الوصول إلى الكاميرا. يرجى التحقق من الصلاحيات.' 
      });
    }
  };

  stopCamera = () => {
    if (this.videoRef.current && this.videoRef.current.srcObject) {
      const tracks = this.videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      this.videoRef.current.srcObject = null;
      this.setState({ isStreaming: false });
    }
  };

  captureImage = () => {
    if (!this.videoRef.current || !this.canvasRef.current) return;

    const video = this.videoRef.current;
    const canvas = this.canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg');
    this.setState({ capturedImage: imageData });
    this.stopCamera();
  };

  drawFaceOverlay = (landmarks, canvas, image) => {
    if (!canvas || !landmarks || !image) return;
    
    const ctx = canvas.getContext('2d');
    
    // الحصول على أبعاد الصورة المعروضة
    const rect = image.getBoundingClientRect();
    const displayWidth = rect.width;
    const displayHeight = rect.height;
    
    // ضبط حجم canvas ليطابق حجم الصورة المعروضة
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    
    // landmarks تم تعديلها بالفعل باستخدام faceapi.resizeResults
    // لذا scaleX و scaleY = 1
    const scaleX = 1;
    const scaleY = 1;
    
    // مسح Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // رسم الشبكة على الوجه
    this.drawFaceGrid(ctx, landmarks, scaleX, scaleY);
    
    // رسم الحواجب
    this.drawEyebrows(ctx, landmarks, scaleX, scaleY);
    
    // رسم الفم
    this.drawMouth(ctx, landmarks, scaleX, scaleY);
    
    // رسم نقاط الوجه الرئيسية
    this.drawFacePoints(ctx, landmarks, scaleX, scaleY);
  };

  drawFaceGrid = (ctx, landmarks, scaleX, scaleY) => {
    if (!landmarks || !landmarks.positions) return;
    
    const positions = landmarks.positions;
    if (positions.length < 68) return;
    
    // الحصول على حدود الوجه
    const jawline = positions.slice(0, 17);
    const foreheadTop = positions[27]; // أعلى الأنف
    const leftCheek = positions[1];
    const rightCheek = positions[15];
    
    const minX = Math.min(...jawline.map(p => p.x * scaleX));
    const maxX = Math.max(...jawline.map(p => p.x * scaleX));
    const minY = foreheadTop.y * scaleY - 50;
    const maxY = Math.max(...jawline.map(p => p.y * scaleY));
    
    // رسم شبكة زرقاء شفافة
    ctx.strokeStyle = 'rgba(66, 153, 225, 0.3)';
    ctx.lineWidth = 1;
    
    // خطوط عمودية
    const verticalLines = 8;
    for (let i = 0; i <= verticalLines; i++) {
      const x = minX + (maxX - minX) * (i / verticalLines);
      ctx.beginPath();
      ctx.moveTo(x, minY);
      ctx.lineTo(x, maxY);
      ctx.stroke();
    }
    
    // خطوط أفقية
    const horizontalLines = 10;
    for (let i = 0; i <= horizontalLines; i++) {
      const y = minY + (maxY - minY) * (i / horizontalLines);
      ctx.beginPath();
      ctx.moveTo(minX, y);
      ctx.lineTo(maxX, y);
      ctx.stroke();
    }
  };

  drawEyebrows = (ctx, landmarks, scaleX, scaleY) => {
    if (!landmarks || !landmarks.positions) return;
    
    const positions = landmarks.positions;
    
    // الحواجب: نقاط 17-21 (اليسار) و 22-26 (اليمين)
    const leftEyebrow = positions.slice(17, 22);
    const rightEyebrow = positions.slice(22, 27);
    
    // رسم الحواجب
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    // الحاجب الأيسر
    if (leftEyebrow.length > 0) {
      ctx.beginPath();
      ctx.moveTo(leftEyebrow[0].x * scaleX, leftEyebrow[0].y * scaleY);
      for (let i = 1; i < leftEyebrow.length; i++) {
        ctx.lineTo(leftEyebrow[i].x * scaleX, leftEyebrow[i].y * scaleY);
      }
      ctx.stroke();
    }
    
    // الحاجب الأيمن
    if (rightEyebrow.length > 0) {
      ctx.beginPath();
      ctx.moveTo(rightEyebrow[0].x * scaleX, rightEyebrow[0].y * scaleY);
      for (let i = 1; i < rightEyebrow.length; i++) {
        ctx.lineTo(rightEyebrow[i].x * scaleX, rightEyebrow[i].y * scaleY);
      }
      ctx.stroke();
    }
  };

  drawMouth = (ctx, landmarks, scaleX, scaleY) => {
    if (!landmarks || !landmarks.positions) return;
    
    const positions = landmarks.positions;
    
    // الفم: نقاط 48-67
    const mouth = positions.slice(48, 68);
    
    if (mouth.length === 0) return;
    
    // رسم الفم
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.8)';
    ctx.fillStyle = 'rgba(236, 72, 153, 0.2)';
    ctx.lineWidth = 2;
    
    // رسم الشفة العلوية
    const upperLip = mouth.slice(0, 6);
    ctx.beginPath();
    ctx.moveTo(upperLip[0].x * scaleX, upperLip[0].y * scaleY);
    for (let i = 1; i < upperLip.length; i++) {
      ctx.lineTo(upperLip[i].x * scaleX, upperLip[i].y * scaleY);
    }
    ctx.stroke();
    
    // رسم الشفة السفلية
    const lowerLip = mouth.slice(6, 12);
    ctx.beginPath();
    ctx.moveTo(lowerLip[0].x * scaleX, lowerLip[0].y * scaleY);
    for (let i = 1; i < lowerLip.length; i++) {
      ctx.lineTo(lowerLip[i].x * scaleX, lowerLip[i].y * scaleY);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  drawFacePoints = (ctx, landmarks, scaleX, scaleY) => {
    if (!landmarks || !landmarks.positions) return;
    
    const positions = landmarks.positions;
    
    // رسم نقاط صغيرة على الوجه الرئيسية
    ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
    
    // رسم النقاط الرئيسية
    const keyPoints = [
      27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 62, 66 // نقاط رئيسية
    ];
    
    keyPoints.forEach(index => {
      if (positions[index]) {
        ctx.beginPath();
        ctx.arc(positions[index].x * scaleX, positions[index].y * scaleY, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  };

  analyzeFace = async () => {
    if (!this.modelsLoaded) {
      this.setState({ error: 'الرجاء الانتظار حتى يتم تحميل النماذج' });
      return;
    }

    // المكتبة محملة بالفعل من الاستيراد

    const image = this.imageRef.current || this.videoRef.current;
    const overlayCanvas = this.overlayCanvasRef.current;
    if (!image) return;

    try {
      this.setState({ isAnalyzing: true, error: null });

      // التحقق من وجود وجه في الصورة
      const detections = await faceapi
        .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      if (detections.length === 0) {
        this.setState({ 
          isAnalyzing: false, 
          error: 'لم يتم العثور على وجه في الصورة. يرجى المحاولة مرة أخرى.' 
        });
        return;
      }

      const detection = detections[0]; // استخدام أول وجه مكتشف
      
      // رسم الشبكة والخطوط على الوجه
      if (overlayCanvas && detection.landmarks) {
        // استخدام requestAnimationFrame للتأكد من تحميل الصورة
        requestAnimationFrame(() => {
          // الحصول على أبعاد الصورة المعروضة
          const rect = image.getBoundingClientRect();
          const displaySize = { width: rect.width, height: rect.height };
          
          // الحصول على أبعاد الصورة الأصلية
          let sourceSize;
          if (image.naturalWidth && image.naturalHeight && image.naturalWidth > 0 && image.naturalHeight > 0) {
            sourceSize = { width: image.naturalWidth, height: image.naturalHeight };
          } else if (image.videoWidth && image.videoHeight && image.videoWidth > 0 && image.videoHeight > 0) {
            sourceSize = { width: image.videoWidth, height: image.videoHeight };
          } else {
            sourceSize = displaySize;
          }
          
          // تعديل أبعاد landmarks لتطابق حجم العرض
          const resizedLandmarks = faceapi.resizeResults(detection.landmarks, displaySize);
          
          this.drawFaceOverlay(resizedLandmarks, overlayCanvas, image);
          this.setState({ showOverlay: true });
        });
      }
      
      // تحليل الوجه
      const analysis = this.performAnalysis(detection, image);
      
      if (this.props.onAnalysisComplete) {
        this.props.onAnalysisComplete(analysis);
      }

      this.setState({ isAnalyzing: false });
    } catch (error) {
      console.error('Error analyzing face:', error);
      this.setState({ 
        isAnalyzing: false, 
        error: 'حدث خطأ أثناء تحليل الوجه. يرجى المحاولة مرة أخرى.' 
      });
    }
  };

  performAnalysis = (detection, imageElement) => {
    const { age, gender, expressions, landmarks } = detection;
    
    // إنشاء canvas للتحليل
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageElement.width || imageElement.videoWidth || imageElement.naturalWidth || imageElement.clientWidth;
    canvas.height = imageElement.height || imageElement.videoHeight || imageElement.naturalHeight || imageElement.clientHeight;
    ctx.drawImage(imageElement, 0, 0);
    
    // === التحليلات الأساسية ===
    const basicSkinType = this.analyzeSkinType(imageElement, landmarks);
    const wrinkles = this.analyzeWrinkles(landmarks, expressions);
    const sagging = this.analyzeSagging(landmarks);
    const facialLines = this.analyzeFacialLines(landmarks, age);
    const eyebrows = this.analyzeEyebrows(landmarks);
    const mouth = this.analyzeMouth(landmarks);
    
    // === التحليلات المتقدمة ===
    let advancedSkin, skinProblems, facialProportions, specificRegions;
    try {
      advancedSkin = analyzeAdvancedSkin(imageElement, landmarks, ctx);
      skinProblems = analyzeSkinProblems(imageElement, landmarks, age);
      facialProportions = analyzeFacialProportions(landmarks);
      specificRegions = analyzeSpecificRegions(imageElement, landmarks);
    } catch (error) {
      console.error('Error in advanced analysis:', error);
      // استخدام قيم افتراضية في حالة الخطأ
      advancedSkin = { type: 'مختلطة', hydration: 'طبيعي', sebum: 'متوسط', pores: 'متوسطة', texture: 'متوسطة' };
      skinProblems = { acne: { active: false }, pigmentation: { level: 'لا يوجد' }, darkCircles: { present: false } };
      facialProportions = { symmetry: 100, goldenRatio: 100, faceShape: 'بيضاوي' };
      specificRegions = {};
    }
    
    // === توليد التوصيات والعلاجات ===
    const treatments = this.generateTreatments(advancedSkin, skinProblems, facialProportions, wrinkles, mouth, eyebrows);
    
    return {
      age: Math.round(age),
      gender: gender === 'male' ? 'ذكر' : 'أنثى',
      
      // التحليلات الأساسية
      skinType: advancedSkin, // استخدام التحليل المتقدم
      wrinkles,
      sagging,
      facialLines,
      eyebrows,
      mouth,
      
      // التحليلات المتقدمة
      advancedSkin,
      skinProblems,
      facialProportions,
      specificRegions,
      
      // التوصيات
      treatments,
      
      expressions: {
        happy: Math.round(expressions.happy * 100),
        sad: Math.round(expressions.sad * 100),
        angry: Math.round(expressions.angry * 100),
        fearful: Math.round(expressions.fearful * 100),
        surprised: Math.round(expressions.surprised * 100),
        disgusted: Math.round(expressions.disgusted * 100),
        neutral: Math.round(expressions.neutral * 100)
      }
    };
  };

  generateTreatments = (advancedSkin, skinProblems, facialProportions, wrinkles, mouth, eyebrows) => {
    const treatments = [];
    
    // علاجات بناءً على نوع البشرة
    if (advancedSkin.type === 'دهنية') {
      treatments.push({
        name: 'تنظيف عميق',
        description: 'تنظيف عميق لإزالة الدهون الزائدة',
        priority: 'متوسط'
      });
    }
    
    if (advancedSkin.poresScore > 60) {
      treatments.push({
        name: 'تقشير كيميائي',
        description: 'لتقليل حجم المسام',
        priority: 'عالٍ'
      });
    }
    
    // علاجات بناءً على المشاكل الجلدية
    if (skinProblems.acne.active) {
      treatments.push({
        name: 'علاج حب الشباب',
        description: 'علاج طبي لحب الشباب النشط',
        priority: 'عالٍ'
      });
    }
    
    if (skinProblems.pigmentation.level !== 'لا يوجد') {
      treatments.push({
        name: 'تقشير كيميائي',
        description: 'لعلاج التصبغات والبقع',
        priority: 'عالٍ'
      });
    }
    
    if (skinProblems.darkCircles.present) {
      treatments.push({
        name: 'فيلر تحت العين',
        description: 'لإزالة الهالات السوداء والفراغات',
        priority: 'متوسط'
      });
    }
    
    // علاجات بناءً على التجاعيد
    if (wrinkles.severity === 'عالي') {
      treatments.push({
        name: 'بوتوكس الجبهة',
        description: 'لتقليل التجاعيد في الجبهة',
        priority: 'عالٍ'
      });
    }
    
    if (facialLines.severity === 'واضح') {
      treatments.push({
        name: 'فيلر خطوط الأنف-الشفاه',
        description: 'لتعبئة خطوط الأنف-الشفاه',
        priority: 'عالٍ'
      });
    }
    
    // علاجات بناءً على الفم
    if (mouth.needsFiller) {
      treatments.push({
        name: 'فيلر الشفاه',
        description: mouth.recommendation || 'زيادة حجم الشفاه',
        priority: 'متوسط'
      });
    }
    
    // علاجات بناءً على الحواجب
    if (eyebrows.needsCorrection) {
      treatments.push({
        name: 'تصحيح الحواجب',
        description: 'لتحسين تناسق الحواجب',
        priority: 'منخفض'
      });
    }
    
    return treatments;
  };

  analyzeSkinType = (imageElement, landmarks) => {
    // تحليل بسيط لنوع البشرة بناءً على المناطق الوجهية
    // هذا تحليل مبسط - يمكن تحسينه باستخدام خوارزميات أكثر تعقيداً
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = imageElement.width || imageElement.videoWidth;
      canvas.height = imageElement.height || imageElement.videoHeight;
      ctx.drawImage(imageElement, 0, 0);
      
      // تحليل منطقة الخد (منطقة أقل تعرضاً للمكياج عادة)
      const cheekRegion = landmarks.positions.slice(1, 15);
      const avgBrightness = this.getRegionBrightness(ctx, cheekRegion, canvas.width, canvas.height);
      
      // تحليل بسيط - يمكن تحسينه
      if (avgBrightness > 180) {
        return { type: 'بشرة فاتحة', confidence: 75 };
      } else if (avgBrightness < 120) {
        return { type: 'بشرة داكنة', confidence: 75 };
      } else {
        return { type: 'بشرة متوسطة', confidence: 70 };
      }
    } catch (error) {
      return { type: 'غير محدد', confidence: 0 };
    }
  };

  getRegionBrightness = (ctx, region, width, height) => {
    if (!region || region.length === 0) return 128;
    
    let totalBrightness = 0;
    let count = 0;
    const sampleSize = Math.min(10, region.length);
    
    for (let i = 0; i < sampleSize; i++) {
      const point = region[i];
      const x = Math.floor(point.x);
      const y = Math.floor(point.y);
      
      if (x >= 0 && x < width && y >= 0 && y < height) {
        const imageData = ctx.getImageData(x, y, 1, 1);
        const r = imageData.data[0];
        const g = imageData.data[1];
        const b = imageData.data[2];
        const brightness = (r + g + b) / 3;
        totalBrightness += brightness;
        count++;
      }
    }
    
    return count > 0 ? totalBrightness / count : 128;
  };

  analyzeWrinkles = (landmarks, expressions) => {
    // تحليل التجاعيد بناءً على تعابير الوجه وخطوط الوجه
    const foreheadLines = this.calculateForeheadLines(landmarks);
    const eyeLines = this.calculateEyeLines(landmarks);
    const mouthLines = this.calculateMouthLines(landmarks, expressions);
    
    const totalLines = foreheadLines + eyeLines + mouthLines;
    let severity = 'منخفض';
    let score = 0;
    
    if (totalLines > 15) {
      severity = 'عالي';
      score = 85;
    } else if (totalLines > 8) {
      severity = 'متوسط';
      score = 60;
    } else {
      severity = 'منخفض';
      score = 30;
    }
    
    return {
      severity,
      score,
      forehead: foreheadLines,
      eyes: eyeLines,
      mouth: mouthLines
    };
  };

  calculateForeheadLines = (landmarks) => {
    // حساب تقريبي للتجاعيد في الجبهة
    const foreheadPoints = landmarks.positions.slice(27, 36);
    return this.estimateLinesFromPoints(foreheadPoints);
  };

  calculateEyeLines = (landmarks) => {
    // حساب التجاعيد حول العينين
    const leftEye = landmarks.positions.slice(36, 42);
    const rightEye = landmarks.positions.slice(42, 48);
    return this.estimateLinesFromPoints(leftEye) + this.estimateLinesFromPoints(rightEye);
  };

  calculateMouthLines = (landmarks, expressions) => {
    // حساب خطوط حول الفم
    const mouth = landmarks.positions.slice(48, 68);
    const baseLines = this.estimateLinesFromPoints(mouth);
    
    // إضافة خطوط إضافية بناءً على التعبير
    const expressionLines = expressions.happy > 0.5 ? 3 : 0;
    return baseLines + expressionLines;
  };

  estimateLinesFromPoints = (points) => {
    if (!points || points.length < 2) return 0;
    
    // حساب تقريبي لعدد الخطوط بناءً على التباين في المواضع
    let variance = 0;
    const avgY = points.reduce((sum, p) => sum + p.y, 0) / points.length;
    
    points.forEach(point => {
      variance += Math.abs(point.y - avgY);
    });
    
    variance = variance / points.length;
    return Math.round(variance / 5); // معامل تحويل تقريبي
  };

  analyzeSagging = (landmarks) => {
    // تحليل الترهل بناءً على نقاط الوجه
    const jawline = landmarks.positions.slice(0, 17);
    const cheekPoints = landmarks.positions.slice(1, 15);
    
    // حساب ميل خط الفك
    const jawlineAngle = this.calculateJawlineAngle(jawline);
    const cheekDroop = this.calculateCheekDroop(cheekPoints);
    
    let severity = 'منخفض';
    let score = 0;
    
    if (jawlineAngle < 0.8 || cheekDroop > 0.15) {
      severity = 'عالي';
      score = 80;
    } else if (jawlineAngle < 0.9 || cheekDroop > 0.1) {
      severity = 'متوسط';
      score = 55;
    } else {
      severity = 'منخفض';
      score = 25;
    }
    
    return {
      severity,
      score,
      jawlineAngle,
      cheekDroop
    };
  };

  calculateJawlineAngle = (jawline) => {
    if (!jawline || jawline.length < 3) return 1.0;
    
    const firstPoint = jawline[0];
    const middlePoint = jawline[Math.floor(jawline.length / 2)];
    const lastPoint = jawline[jawline.length - 1];
    
    const angle1 = Math.atan2(middlePoint.y - firstPoint.y, middlePoint.x - firstPoint.x);
    const angle2 = Math.atan2(lastPoint.y - middlePoint.y, lastPoint.x - middlePoint.x);
    
    const angleDiff = Math.abs(angle1 - angle2);
    return Math.cos(angleDiff); // قيمة بين 0 و 1
  };

  calculateCheekDroop = (cheekPoints) => {
    if (!cheekPoints || cheekPoints.length < 2) return 0;
    
    const topY = Math.min(...cheekPoints.map(p => p.y));
    const bottomY = Math.max(...cheekPoints.map(p => p.y));
    const height = bottomY - topY;
    
    const avgY = cheekPoints.reduce((sum, p) => sum + p.y, 0) / cheekPoints.length;
    const centerY = (topY + bottomY) / 2;
    
    return Math.abs(avgY - centerY) / height;
  };

  analyzeFacialLines = (landmarks, age) => {
    // تحليل خطوط الوجه بناءً على العمر ونقاط الوجه
    const nasolabialFolds = this.calculateNasolabialFolds(landmarks);
    const marionetteLines = this.calculateMarionetteLines(landmarks);
    const foreheadLines = this.calculateForeheadLines(landmarks);
    
    // العمر يؤثر على خطوط الوجه
    const ageFactor = Math.min(age / 50, 1.5);
    const totalLines = (nasolabialFolds + marionetteLines + foreheadLines) * ageFactor;
    
    let severity = 'خفيف';
    if (totalLines > 20) {
      severity = 'واضح';
    } else if (totalLines > 10) {
      severity = 'متوسط';
    }
    
    return {
      severity,
      nasolabial: nasolabialFolds,
      marionette: marionetteLines,
      forehead: foreheadLines,
      total: Math.round(totalLines)
    };
  };

  calculateNasolabialFolds = (landmarks) => {
    // خطوط الأنف-الشفاه
    const nosePoints = landmarks.positions.slice(27, 36);
    const mouthPoints = landmarks.positions.slice(48, 55);
    
    if (!nosePoints.length || !mouthPoints.length) return 0;
    
    const noseBottom = nosePoints[nosePoints.length - 1];
    const mouthTop = mouthPoints[0];
    
    const distance = Math.sqrt(
      Math.pow(noseBottom.x - mouthTop.x, 2) + 
      Math.pow(noseBottom.y - mouthTop.y, 2)
    );
    
    return Math.round(distance / 10); // تحويل تقريبي
  };

  calculateMarionetteLines = (landmarks) => {
    // خطوط ماريونيت (من زوايا الفم)
    const mouthCorners = [
      landmarks.positions[48],
      landmarks.positions[54]
    ];
    
    const jawBottom = landmarks.positions[8];
    
    if (!mouthCorners[0] || !jawBottom) return 0;
    
    const avgCornerY = (mouthCorners[0].y + mouthCorners[1].y) / 2;
    const distance = Math.abs(avgCornerY - jawBottom.y);
    
    return Math.round(distance / 15); // تحويل تقريبي
  };

  analyzeEyebrows = (landmarks) => {
    // تحليل تناسق الحواجب
    if (!landmarks || !landmarks.positions) {
      return { symmetry: 'غير محدد', needsCorrection: false };
    }
    
    const positions = landmarks.positions;
    
    // الحواجب: نقاط 17-21 (اليسار) و 22-26 (اليمين)
    const leftEyebrow = positions.slice(17, 22);
    const rightEyebrow = positions.slice(22, 27);
    
    if (leftEyebrow.length === 0 || rightEyebrow.length === 0) {
      return { symmetry: 'غير محدد', needsCorrection: false };
    }
    
    // حساب متوسط ارتفاع كل حاجب
    const leftAvgY = leftEyebrow.reduce((sum, p) => sum + p.y, 0) / leftEyebrow.length;
    const rightAvgY = rightEyebrow.reduce((sum, p) => sum + p.y, 0) / rightEyebrow.length;
    
    // حساب الفرق في الارتفاع
    const heightDiff = Math.abs(leftAvgY - rightAvgY);
    const avgHeight = (leftAvgY + rightAvgY) / 2;
    const heightDiffPercent = (heightDiff / avgHeight) * 100;
    
    // حساب الانحناء (curvature)
    const leftCurve = this.calculateEyebrowCurve(leftEyebrow);
    const rightCurve = this.calculateEyebrowCurve(rightEyebrow);
    const curveDiff = Math.abs(leftCurve - rightCurve);
    
    let symmetry = 'متناسقة';
    let needsCorrection = false;
    let score = 100;
    
    if (heightDiffPercent > 5 || curveDiff > 0.3) {
      symmetry = 'غير متناسقة';
      needsCorrection = true;
      score = 60;
    } else if (heightDiffPercent > 3 || curveDiff > 0.15) {
      symmetry = 'شبه متناسقة';
      score = 80;
    }
    
    return {
      symmetry,
      needsCorrection,
      score,
      heightDifference: heightDiffPercent.toFixed(1),
      leftHeight: leftAvgY.toFixed(1),
      rightHeight: rightAvgY.toFixed(1)
    };
  };

  calculateEyebrowCurve = (eyebrowPoints) => {
    if (eyebrowPoints.length < 3) return 0;
    
    // حساب الانحناء بناءً على الفرق بين النقاط
    const firstPoint = eyebrowPoints[0];
    const middlePoint = eyebrowPoints[Math.floor(eyebrowPoints.length / 2)];
    const lastPoint = eyebrowPoints[eyebrowPoints.length - 1];
    
    // حساب المسافة العمودية من النقطة الوسطى إلى الخط الواصل بين الأول والأخير
    const lineSlope = (lastPoint.y - firstPoint.y) / (lastPoint.x - firstPoint.x);
    const lineY = firstPoint.y + lineSlope * (middlePoint.x - firstPoint.x);
    const curve = Math.abs(middlePoint.y - lineY);
    
    return curve;
  };

  analyzeMouth = (landmarks) => {
    // تحليل حجم الفم (إذا يحتاج فيلر)
    if (!landmarks || !landmarks.positions) {
      return { size: 'غير محدد', needsFiller: false };
    }
    
    const positions = landmarks.positions;
    
    // الفم: نقاط 48-67
    const mouth = positions.slice(48, 68);
    
    if (mouth.length < 20) {
      return { size: 'غير محدد', needsFiller: false };
    }
    
    // حساب عرض الفم
    const mouthLeft = positions[48];
    const mouthRight = positions[54];
    const mouthWidth = Math.sqrt(
      Math.pow(mouthRight.x - mouthLeft.x, 2) + 
      Math.pow(mouthRight.y - mouthLeft.y, 2)
    );
    
    // حساب ارتفاع الفم
    const mouthTop = positions[51];
    const mouthBottom = positions[57];
    const mouthHeight = Math.sqrt(
      Math.pow(mouthBottom.x - mouthTop.x, 2) + 
      Math.pow(mouthBottom.y - mouthTop.y, 2)
    );
    
    // حساب نسبة العرض إلى الارتفاع
    const aspectRatio = mouthWidth / mouthHeight;
    
    // حساب سماكة الشفاه
    const upperLipThickness = Math.sqrt(
      Math.pow(positions[51].x - positions[62].x, 2) + 
      Math.pow(positions[51].y - positions[62].y, 2)
    );
    const lowerLipThickness = Math.sqrt(
      Math.pow(positions[57].x - positions[66].x, 2) + 
      Math.pow(positions[57].y - positions[66].y, 2)
    );
    const avgLipThickness = (upperLipThickness + lowerLipThickness) / 2;
    
    // معايير التحليل (قيم تقريبية)
    let size = 'متوسط';
    let needsFiller = false;
    let recommendation = '';
    
    if (aspectRatio < 2.5) {
      size = 'صغير';
      if (avgLipThickness < 8) {
        needsFiller = true;
        recommendation = 'يُنصح باستخدام فيلر لزيادة حجم الشفاه';
      }
    } else if (aspectRatio > 3.5) {
      size = 'كبير';
    }
    
    if (avgLipThickness < 6 && !needsFiller) {
      needsFiller = true;
      recommendation = 'يُنصح باستخدام فيلر لزيادة سماكة الشفاه';
    }
    
    return {
      size,
      needsFiller,
      recommendation,
      width: mouthWidth.toFixed(1),
      height: mouthHeight.toFixed(1),
      thickness: avgLipThickness.toFixed(1),
      aspectRatio: aspectRatio.toFixed(2)
    };
  };

  handleRetake = () => {
    this.setState({ capturedImage: null, showOverlay: false });
    if (this.overlayCanvasRef.current) {
      const ctx = this.overlayCanvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, this.overlayCanvasRef.current.width, this.overlayCanvasRef.current.height);
    }
    this.startCamera();
  };

  render() {
    const { isStreaming, capturedImage, isAnalyzing, error, modelsLoading } = this.state;
    const showVideo = isStreaming && !capturedImage;
    const showImage = capturedImage && !isStreaming;

    return (
      <Container>
        <CameraContainer>
          <Video 
            ref={this.videoRef}
            autoPlay
            playsInline
            muted
            show={showVideo}
          />
          <Canvas ref={this.canvasRef} show={false} />
          <CapturedImage 
            ref={this.imageRef}
            src={capturedImage}
            alt="Captured face"
            show={showImage}
          />
          <OverlayCanvas 
            ref={this.overlayCanvasRef}
            show={showImage && (isAnalyzing || this.state.showOverlay)}
          />
          {(isAnalyzing || modelsLoading) && (
            <LoadingOverlay>
              {modelsLoading ? 'جاري تحميل النماذج...' : 'جاري تحليل الوجه...'}
            </LoadingOverlay>
          )}
        </CameraContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Controls>
          {!isStreaming && !capturedImage && (
            <Button 
              primary 
              onClick={this.startCamera}
              disabled={modelsLoading || !this.modelsLoaded}
            >
              📷 فتح الكاميرا
            </Button>
          )}
          
          {isStreaming && (
            <>
              <Button primary onClick={this.captureImage}>
                📸 التقاط صورة
              </Button>
              <Button secondary onClick={this.stopCamera}>
                ❌ إلغاء
              </Button>
            </>
          )}
          
          {capturedImage && (
            <>
              <Button 
                primary 
                onClick={this.analyzeFace}
                disabled={isAnalyzing || !this.modelsLoaded}
              >
                🔬 تحليل الوجه
              </Button>
              <Button secondary onClick={this.handleRetake}>
                🔄 إعادة التقاط
              </Button>
            </>
          )}
        </Controls>
      </Container>
    );
  }
}

export default FaceAnalysis;

