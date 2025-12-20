import React, { Component } from "react";
import styled from "styled-components";
import * as faceapi from "face-api.js";

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
    this.modelsLoaded = false;
  }

  state = {
    isStreaming: false,
    capturedImage: null,
    isAnalyzing: false,
    error: null,
    modelsLoading: false
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

  analyzeFace = async () => {
    if (!this.modelsLoaded) {
      this.setState({ error: 'الرجاء الانتظار حتى يتم تحميل النماذج' });
      return;
    }

    // المكتبة محملة بالفعل من الاستيراد

    const image = this.imageRef.current || this.videoRef.current;
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
    
    // تحليل نوع البشرة بناءً على نسيج الجلد
    const skinType = this.analyzeSkinType(imageElement, landmarks);
    
    // تحليل التجاعيد
    const wrinkles = this.analyzeWrinkles(landmarks, expressions);
    
    // تحليل الترهل
    const sagging = this.analyzeSagging(landmarks);
    
    // تحليل خطوط الوجه
    const facialLines = this.analyzeFacialLines(landmarks, age);
    
    return {
      age: Math.round(age),
      gender: gender === 'male' ? 'ذكر' : 'أنثى',
      skinType,
      wrinkles,
      sagging,
      facialLines,
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

  handleRetake = () => {
    this.setState({ capturedImage: null });
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

