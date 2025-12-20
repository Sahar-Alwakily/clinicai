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

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 0.15rem;
`;

const CapturedImage = styled.img`
  width: 100%;
  display: ${props => props.show ? 'block' : 'none'};
  border-radius: 0.15rem;
  transition: transform ${props => props.transitionDuration || 0.8}s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
  transform-origin: ${props => props.transformOrigin || 'center center'};
  ${props => {
    if (!props.zoomTransform) return '';
    
    const { scale = 1, translateX = 0, translateY = 0 } = props.zoomTransform;
    return `
      transform: scale(${scale}) translate(${translateX}%, ${translateY}%);
    `;
  }}
`;

const AnalysisOverlayCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
  display: ${props => props.show ? 'block' : 'none'};
`;

const AnalysisStatusText = styled.div`
  position: absolute;
  top: 0.15rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.18rem;
  font-weight: 400;
  text-align: center;
  z-index: 6;
  pointer-events: none;
  display: ${props => props.visible ? 'block' : 'none'};
  letter-spacing: 0.02rem;
  text-transform: uppercase;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const ResultsCard = styled.div`
  position: fixed;
  bottom: ${props => props.visible ? '0' : '-100%'};
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 0.2rem 0.2rem 0 0;
  padding: 0.3rem;
  box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: bottom 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 60vh;
  overflow-y: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

const MetricsChart = styled.div`
  position: absolute;
  bottom: 0.2rem;
  left: 0.15rem;
  width: 1.2rem;
  height: 1.2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 0.1rem;
  padding: 0.1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 7;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.4s ease;
  pointer-events: none;
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
    showOverlay: false,
    
    // Animation states
    animationStep: 0,
    statusText: '',
    zoomTransform: null,
    showResultsCard: false,
    showMetricsChart: false,
    
    // Detected regions data
    detectedRegions: null,
    measurements: null
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

  drawMedicalOverlay = (landmarks, canvas, image, step) => {
    if (!canvas || !landmarks || !image) return;
    
    const ctx = canvas.getContext('2d');
    
    // الحصول على أبعاد الصورة المعروضة
    const rect = image.getBoundingClientRect();
    const displayWidth = rect.width;
    const displayHeight = rect.height;
    
    // الحصول على أبعاد الصورة الأصلية
    let sourceWidth, sourceHeight;
    if (image.naturalWidth && image.naturalHeight && image.naturalWidth > 0 && image.naturalHeight > 0) {
      sourceWidth = image.naturalWidth;
      sourceHeight = image.naturalHeight;
    } else if (image.videoWidth && image.videoHeight && image.videoWidth > 0 && image.videoHeight > 0) {
      sourceWidth = image.videoWidth;
      sourceHeight = image.videoHeight;
    } else {
      sourceWidth = displayWidth;
      sourceHeight = displayHeight;
    }
    
    // ضبط حجم canvas
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    
    // مسح Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // حساب نسبة التكبير/التصغير
    const scaleX = displayWidth / sourceWidth;
    const scaleY = displayHeight / sourceHeight;
    
    // رسم حسب الخطوة الحالية
    switch(step) {
      case 'faceLock':
        this.drawFaceLock(ctx, landmarks, scaleX, scaleY);
        break;
      case 'eyes':
        this.drawEyeAnalysis(ctx, landmarks, scaleX, scaleY);
        break;
      case 'nose':
        this.drawNoseAnalysis(ctx, landmarks, scaleX, scaleY);
        break;
      case 'mouth':
        this.drawMouthAnalysis(ctx, landmarks, scaleX, scaleY);
        break;
      case 'metrics':
        this.drawFullFaceMetrics(ctx, landmarks, scaleX, scaleY);
        break;
      default:
        break;
    }
  };

  // Helper: Draw dotted line
  drawDottedLine = (ctx, x1, y1, x2, y2, dashLength = 4, gapLength = 4) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / distance;
    const unitY = dy / distance;
    
    let currentDistance = 0;
    while (currentDistance < distance) {
      const startX = x1 + unitX * currentDistance;
      const startY = y1 + unitY * currentDistance;
      const endDistance = Math.min(currentDistance + dashLength, distance);
      const endX = x1 + unitX * endDistance;
      const endY = y1 + unitY * endDistance;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      currentDistance += dashLength + gapLength;
    }
  };

  // Helper: Draw measurement with label
  drawMeasurement = (ctx, x1, y1, x2, y2, label, value, unit, offset = 10) => {
    // Draw dotted measurement line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    this.drawDottedLine(ctx, x1, y1, x2, y2);
    
    // Calculate midpoint for label
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    
    // Draw label background
    const text = `${value}${unit}`;
    ctx.font = '11px "SF Pro Display", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = 14;
    const padding = 4;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(midX - textWidth / 2 - padding, midY - offset - textHeight / 2, textWidth + padding * 2, textHeight);
    
    // Draw text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillText(text, midX, midY - offset);
    
    // Draw label (if provided)
    if (label) {
      ctx.font = '9px "SF Pro Display", sans-serif';
      ctx.fillStyle = 'rgba(200, 220, 255, 0.8)';
      ctx.fillText(label, midX, midY - offset - 12);
    }
  };

  // STEP 1: Face Lock - Grid + Face Box
  drawFaceLock = (ctx, landmarks, scaleX, scaleY) => {
    // Draw subtle grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 0.5;
    const gridSize = 30;
    
    for (let x = 0; x < ctx.canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y < ctx.canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
      ctx.stroke();
    }
    
    // Draw face bounding box
    if (this.detectedRegions && this.detectedRegions.face) {
      const face = this.detectedRegions.face;
      const boxX = (face.left / 100) * ctx.canvas.width;
      const boxY = (face.top / 100) * ctx.canvas.height;
      const boxW = (face.width / 100) * ctx.canvas.width;
      const boxH = (face.height / 100) * ctx.canvas.height;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.strokeRect(boxX, boxY, boxW, boxH);
    }
  };

  // STEP 2: Eye Analysis
  drawEyeAnalysis = (ctx, landmarks, scaleX, scaleY) => {
    if (!landmarks || !landmarks.positions) return;
    const positions = landmarks.positions;
    if (positions.length < 48) return;
    
    const leftEye = positions.slice(36, 42);
    const rightEye = positions.slice(42, 48);
    const leftBrow = positions.slice(17, 22);
    const rightBrow = positions.slice(22, 27);
    
    // Estimate pixel to cm ratio (approximate: assuming average face width ~14cm)
    const faceWidth = Math.abs(positions[16].x - positions[0].x) * scaleX;
    const pixelToCm = 14 / faceWidth;
    
    // Draw eye outlines (thin white lines)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    
    // Left eye outline
    ctx.beginPath();
    ctx.moveTo(leftEye[0].x * scaleX, leftEye[0].y * scaleY);
    for (let i = 1; i < leftEye.length; i++) {
      ctx.lineTo(leftEye[i].x * scaleX, leftEye[i].y * scaleY);
    }
    ctx.closePath();
    ctx.stroke();
    
    // Right eye outline
    ctx.beginPath();
    ctx.moveTo(rightEye[0].x * scaleX, rightEye[0].y * scaleY);
    for (let i = 1; i < rightEye.length; i++) {
      ctx.lineTo(rightEye[i].x * scaleX, rightEye[i].y * scaleY);
    }
    ctx.closePath();
    ctx.stroke();
    
    // Eye width measurements
    const leftEyeWidth = Math.sqrt(
      Math.pow(leftEye[3].x - leftEye[0].x, 2) + 
      Math.pow(leftEye[3].y - leftEye[0].y, 2)
    ) * scaleX * pixelToCm;
    
    const rightEyeWidth = Math.sqrt(
      Math.pow(rightEye[3].x - rightEye[0].x, 2) + 
      Math.pow(rightEye[3].y - rightEye[0].y, 2)
    ) * scaleX * pixelToCm;
    
    // Draw horizontal measurement lines for eyes
    this.drawMeasurement(
      ctx,
      leftEye[0].x * scaleX, leftEye[1].y * scaleY,
      leftEye[3].x * scaleX, leftEye[4].y * scaleY,
      'Width',
      leftEyeWidth.toFixed(1),
      'cm',
      -15
    );
    
    this.drawMeasurement(
      ctx,
      rightEye[0].x * scaleX, rightEye[1].y * scaleY,
      rightEye[3].x * scaleX, rightEye[4].y * scaleY,
      'Width',
      rightEyeWidth.toFixed(1),
      'cm',
      -15
    );
    
    // Eye height measurements
    const leftEyeHeight = Math.sqrt(
      Math.pow(leftEye[1].x - leftEye[5].x, 2) + 
      Math.pow(leftEye[1].y - leftEye[5].y, 2)
    ) * scaleY * pixelToCm;
    
    const rightEyeHeight = Math.sqrt(
      Math.pow(rightEye[1].x - rightEye[5].x, 2) + 
      Math.pow(rightEye[1].y - rightEye[5].y, 2)
    ) * scaleY * pixelToCm;
    
    // Draw vertical measurement lines
    this.drawMeasurement(
      ctx,
      leftEye[1].x * scaleX, leftEye[1].y * scaleY,
      leftEye[5].x * scaleX, leftEye[5].y * scaleY,
      'Height',
      leftEyeHeight.toFixed(1),
      'cm',
      15
    );
    
    // Inner eye angle (between inner corners)
    const innerEyeAngle = this.calculateAngle(
      positions[39].x * scaleX, positions[39].y * scaleY, // Left inner corner
      positions[42].x * scaleX, positions[42].y * scaleY, // Right inner corner
      positions[27].x * scaleX, positions[27].y * scaleY  // Nose tip
    );
    
    // Draw angle arc
    ctx.strokeStyle = 'rgba(200, 220, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(positions[27].x * scaleX, positions[27].y * scaleY, 40, 
      Math.atan2(positions[39].y * scaleY - positions[27].y * scaleY, positions[39].x * scaleX - positions[27].x * scaleX),
      Math.atan2(positions[42].y * scaleY - positions[27].y * scaleY, positions[42].x * scaleX - positions[27].x * scaleX)
    );
    ctx.stroke();
    
    // Angle label
    const angleX = positions[27].x * scaleX + 50;
    const angleY = positions[27].y * scaleY - 20;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(angleX - 30, angleY - 10, 60, 20);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.font = '11px "SF Pro Display", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Inner: ${innerEyeAngle.toFixed(1)}°`, angleX, angleY + 4);
    
    // Eyebrow lift angle
    const leftBrowAngle = this.calculateEyebrowAngle(leftBrow, scaleX, scaleY);
    const rightBrowAngle = this.calculateEyebrowAngle(rightBrow, scaleX, scaleY);
    
    // Draw eyebrow lines and angles
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(leftBrow[0].x * scaleX, leftBrow[0].y * scaleY);
    ctx.lineTo(leftBrow[4].x * scaleX, leftBrow[4].y * scaleY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(rightBrow[0].x * scaleX, rightBrow[0].y * scaleY);
    ctx.lineTo(rightBrow[4].x * scaleX, rightBrow[4].y * scaleY);
    ctx.stroke();
    
    // Eyebrow angle labels
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(leftBrow[2].x * scaleX - 25, leftBrow[2].y * scaleY - 20, 50, 18);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.font = '10px "SF Pro Display", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${leftBrowAngle.toFixed(1)}°`, leftBrow[2].x * scaleX, leftBrow[2].y * scaleY - 7);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(rightBrow[2].x * scaleX - 25, rightBrow[2].y * scaleY - 20, 50, 18);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillText(`${rightBrowAngle.toFixed(1)}°`, rightBrow[2].x * scaleX, rightBrow[2].y * scaleY - 7);
  };

  // STEP 3: Nose Analysis
  drawNoseAnalysis = (ctx, landmarks, scaleX, scaleY) => {
    if (!landmarks || !landmarks.positions) return;
    const positions = landmarks.positions;
    if (positions.length < 36) return;
    
    const nose = positions.slice(27, 36);
    const faceWidth = Math.abs(positions[16].x - positions[0].x) * scaleX;
    const pixelToCm = 14 / faceWidth;
    
    // Draw nose bridge line (center line)
    ctx.strokeStyle = 'rgba(200, 220, 255, 0.7)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(nose[0].x * scaleX, nose[0].y * scaleY);
    ctx.lineTo(nose[6].x * scaleX, nose[6].y * scaleY);
    ctx.stroke();
    
    // Nose length measurement
    const noseLength = Math.sqrt(
      Math.pow(nose[6].x - nose[0].x, 2) + 
      Math.pow(nose[6].y - nose[0].y, 2)
    ) * scaleY * pixelToCm;
    
    this.drawMeasurement(
      ctx,
      nose[0].x * scaleX, nose[0].y * scaleY,
      nose[6].x * scaleX, nose[6].y * scaleY,
      'Length',
      noseLength.toFixed(1),
      'cm',
      -20
    );
    
    // Nose width measurement (at nostrils)
    const noseWidth = Math.sqrt(
      Math.pow(nose[4].x - nose[8].x, 2) + 
      Math.pow(nose[4].y - nose[8].y, 2)
    ) * scaleX * pixelToCm;
    
    this.drawMeasurement(
      ctx,
      nose[4].x * scaleX, nose[4].y * scaleY,
      nose[8].x * scaleX, nose[8].y * scaleY,
      'Width',
      noseWidth.toFixed(1),
      'cm',
      15
    );
    
    // Symmetry center line (vertical line through nose tip)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([5, 5]);
    const centerX = nose[3].x * scaleX;
    ctx.beginPath();
    ctx.moveTo(centerX, nose[0].y * scaleY - 30);
    ctx.lineTo(centerX, positions[8].y * scaleY + 30);
    ctx.stroke();
  };

  // STEP 4: Lip Analysis
  drawMouthAnalysis = (ctx, landmarks, scaleX, scaleY) => {
    if (!landmarks || !landmarks.positions) return;
    const positions = landmarks.positions;
    if (positions.length < 68) return;
    
    const mouthOuter = positions.slice(48, 60);
    const mouthInner = positions.slice(60, 68);
    const faceWidth = Math.abs(positions[16].x - positions[0].x) * scaleX;
    const pixelToCm = 14 / faceWidth;
    
    // Draw lip contour
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(mouthOuter[0].x * scaleX, mouthOuter[0].y * scaleY);
    for (let i = 1; i < mouthOuter.length; i++) {
      ctx.lineTo(mouthOuter[i].x * scaleX, mouthOuter[i].y * scaleY);
    }
    ctx.closePath();
    ctx.stroke();
    
    // Lip width measurement
    const lipWidth = Math.sqrt(
      Math.pow(mouthOuter[6].x - mouthOuter[0].x, 2) + 
      Math.pow(mouthOuter[6].y - mouthOuter[0].y, 2)
    ) * scaleX * pixelToCm;
    
    this.drawMeasurement(
      ctx,
      mouthOuter[0].x * scaleX, mouthOuter[0].y * scaleY,
      mouthOuter[6].x * scaleX, mouthOuter[6].y * scaleY,
      'Width',
      lipWidth.toFixed(1),
      'cm',
      -20
    );
    
    // Upper/lower lip ratio
    const upperLipHeight = Math.sqrt(
      Math.pow(mouthOuter[3].x - mouthInner[2].x, 2) + 
      Math.pow(mouthOuter[3].y - mouthInner[2].y, 2)
    ) * scaleY * pixelToCm;
    
    const lowerLipHeight = Math.sqrt(
      Math.pow(mouthOuter[9].x - mouthInner[6].x, 2) + 
      Math.pow(mouthOuter[9].y - mouthInner[6].y, 2)
    ) * scaleY * pixelToCm;
    
    const lipRatio = (upperLipHeight / lowerLipHeight).toFixed(2);
    
    // Ratio label
    const ratioX = (mouthOuter[0].x + mouthOuter[6].x) / 2 * scaleX;
    const ratioY = mouthOuter[3].y * scaleY + 25;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(ratioX - 40, ratioY - 10, 80, 20);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.font = '11px "SF Pro Display", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Ratio: ${lipRatio}`, ratioX, ratioY + 4);
  };

  // STEP 5: Full Face Metrics
  drawFullFaceMetrics = (ctx, landmarks, scaleX, scaleY) => {
    // Draw radar chart placeholder (will be drawn separately as component)
    // For now, just indicate metrics area
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
  };

  // Helper: Calculate angle between three points
  calculateAngle = (x1, y1, x2, y2, x3, y3) => {
    const angle1 = Math.atan2(y1 - y2, x1 - x2);
    const angle2 = Math.atan2(y3 - y2, x3 - x2);
    let angle = Math.abs(angle1 - angle2) * (180 / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  };

  // Helper: Calculate eyebrow angle
  calculateEyebrowAngle = (browPoints, scaleX, scaleY) => {
    if (browPoints.length < 2) return 0;
    const dx = (browPoints[browPoints.length - 1].x - browPoints[0].x) * scaleX;
    const dy = (browPoints[browPoints.length - 1].y - browPoints[0].y) * scaleY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return Math.abs(angle);
  };

  drawFaceGrid = (ctx, landmarks, scaleX, scaleY) => {
    if (!landmarks || !landmarks.positions) return;
    
    const positions = landmarks.positions;
    if (positions.length < 68) return;
    
    // رسم FaceMesh كامل - شبكة ثلاثية الأبعاد للوجه
    ctx.strokeStyle = 'rgba(66, 153, 225, 0.4)';
    ctx.fillStyle = 'rgba(66, 153, 225, 0.1)';
    ctx.lineWidth = 1;
    
    // رسم خط الفك (0-16)
    const jawline = positions.slice(0, 17);
    ctx.beginPath();
    ctx.moveTo(jawline[0].x * scaleX, jawline[0].y * scaleY);
    for (let i = 1; i < jawline.length; i++) {
      ctx.lineTo(jawline[i].x * scaleX, jawline[i].y * scaleY);
    }
    ctx.stroke();
    
    // رسم الحاجب الأيمن (17-21)
    const rightEyebrow = positions.slice(17, 22);
    ctx.beginPath();
    ctx.moveTo(rightEyebrow[0].x * scaleX, rightEyebrow[0].y * scaleY);
    for (let i = 1; i < rightEyebrow.length; i++) {
      ctx.lineTo(rightEyebrow[i].x * scaleX, rightEyebrow[i].y * scaleY);
    }
    ctx.stroke();
    
    // رسم الحاجب الأيسر (22-26)
    const leftEyebrow = positions.slice(22, 27);
    ctx.beginPath();
    ctx.moveTo(leftEyebrow[0].x * scaleX, leftEyebrow[0].y * scaleY);
    for (let i = 1; i < leftEyebrow.length; i++) {
      ctx.lineTo(leftEyebrow[i].x * scaleX, leftEyebrow[i].y * scaleY);
    }
    ctx.stroke();
    
    // رسم الأنف (27-35)
    const nose = positions.slice(27, 36);
    ctx.beginPath();
    ctx.moveTo(nose[0].x * scaleX, nose[0].y * scaleY);
    for (let i = 1; i < nose.length; i++) {
      ctx.lineTo(nose[i].x * scaleX, nose[i].y * scaleY);
    }
    ctx.closePath();
    ctx.stroke();
    
    // رسم العين اليمنى (36-41)
    const rightEye = positions.slice(36, 42);
    ctx.beginPath();
    ctx.moveTo(rightEye[0].x * scaleX, rightEye[0].y * scaleY);
    for (let i = 1; i < rightEye.length; i++) {
      ctx.lineTo(rightEye[i].x * scaleX, rightEye[i].y * scaleY);
    }
    ctx.closePath();
    ctx.stroke();
    
    // رسم العين اليسرى (42-47)
    const leftEye = positions.slice(42, 48);
    ctx.beginPath();
    ctx.moveTo(leftEye[0].x * scaleX, leftEye[0].y * scaleY);
    for (let i = 1; i < leftEye.length; i++) {
      ctx.lineTo(leftEye[i].x * scaleX, leftEye[i].y * scaleY);
    }
    ctx.closePath();
    ctx.stroke();
    
    // رسم الفم الخارجي (48-59)
    const mouthOuter = positions.slice(48, 60);
    ctx.beginPath();
    ctx.moveTo(mouthOuter[0].x * scaleX, mouthOuter[0].y * scaleY);
    for (let i = 1; i < mouthOuter.length; i++) {
      ctx.lineTo(mouthOuter[i].x * scaleX, mouthOuter[i].y * scaleY);
    }
    ctx.closePath();
    ctx.stroke();
    
    // رسم الفم الداخلي (60-67)
    const mouthInner = positions.slice(60, 68);
    ctx.beginPath();
    ctx.moveTo(mouthInner[0].x * scaleX, mouthInner[0].y * scaleY);
    for (let i = 1; i < mouthInner.length; i++) {
      ctx.lineTo(mouthInner[i].x * scaleX, mouthInner[i].y * scaleY);
    }
    ctx.closePath();
    ctx.stroke();
    
    // رسم خطوط الاتصال بين المناطق (Face Mesh)
    ctx.strokeStyle = 'rgba(66, 153, 225, 0.2)';
    
    // ربط الأنف بالعينين
    ctx.beginPath();
    ctx.moveTo(nose[0].x * scaleX, nose[0].y * scaleY);
    ctx.lineTo(rightEye[3].x * scaleX, rightEye[3].y * scaleY);
    ctx.moveTo(nose[0].x * scaleX, nose[0].y * scaleY);
    ctx.lineTo(leftEye[3].x * scaleX, leftEye[3].y * scaleY);
    ctx.stroke();
    
    // ربط الحواجب بالأنف
    ctx.beginPath();
    ctx.moveTo(rightEyebrow[2].x * scaleX, rightEyebrow[2].y * scaleY);
    ctx.lineTo(nose[0].x * scaleX, nose[0].y * scaleY);
    ctx.moveTo(leftEyebrow[2].x * scaleX, leftEyebrow[2].y * scaleY);
    ctx.lineTo(nose[0].x * scaleX, nose[0].y * scaleY);
    ctx.stroke();
    
    // ربط الأنف بالفم
    ctx.beginPath();
    ctx.moveTo(nose[6].x * scaleX, nose[6].y * scaleY);
    ctx.lineTo(mouthOuter[2].x * scaleX, mouthOuter[2].y * scaleY);
    ctx.stroke();
    
    // ربط الفك بالخدود
    for (let i = 1; i < jawline.length - 1; i += 3) {
      const cheekPoint = positions[Math.min(16 - i, positions.length - 1)];
      ctx.beginPath();
      ctx.moveTo(jawline[i].x * scaleX, jawline[i].y * scaleY);
      ctx.lineTo(cheekPoint.x * scaleX, cheekPoint.y * scaleY);
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
      
      // حفظ landmarks للاستخدام في رسم الشبكة
      this.detectedLandmarks = detection.landmarks;
      this.detectedImage = image;
      
      // استخراج المناطق وبدء تسلسل التكبير
      if (detection.landmarks) {
        this.extractRegionsAndAnimate(detection.landmarks, image, detection);
      }
      
      // تحليل الوجه (يتم في الخلفية، سيتم إرسال النتائج بعد انتهاء الرسوم المتحركة)
      const analysis = this.performAnalysis(detection, image);
      this.pendingAnalysis = analysis; // حفظ النتائج لاستخدامها لاحقاً

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
    const treatments = this.generateTreatments(advancedSkin, skinProblems, facialProportions, wrinkles, facialLines, mouth, eyebrows);
    
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

  generateTreatments = (advancedSkin, skinProblems, facialProportions, wrinkles, facialLines, mouth, eyebrows) => {
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

  extractRegionsAndAnimate = (landmarks, image, detection) => {
    if (!landmarks || !landmarks.positions) return;
    
    const positions = landmarks.positions;
    
    // حساب أبعاد الصورة
    const rect = image.getBoundingClientRect();
    const imageWidth = image.naturalWidth || image.videoWidth || rect.width;
    const imageHeight = image.naturalHeight || image.videoHeight || rect.height;
    const displayWidth = rect.width;
    const displayHeight = rect.height;
    const scaleX = displayWidth / imageWidth;
    const scaleY = displayHeight / imageHeight;
    
    // استخراج المناطق الرئيسية
    const regions = {
      face: {
        box: detection.detection.box, // bounding box
        name: 'face'
      },
      eyes: {
        left: positions.slice(36, 42),
        right: positions.slice(42, 48),
        name: 'eyes'
      },
      brows: {
        left: positions.slice(17, 22),
        right: positions.slice(22, 27),
        name: 'brows'
      },
      nose: {
        points: positions.slice(27, 36),
        name: 'nose'
      },
      mouth: {
        outer: positions.slice(48, 60),
        inner: positions.slice(60, 68),
        name: 'mouth'
      }
    };
    
    // حساب مراكز وأحجام المناطق
    const calculateRegionBounds = (region) => {
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      let points = [];
      
      if (region.left && region.right) {
        points = [...region.left, ...region.right];
      } else if (region.points) {
        points = region.points;
      } else if (region.outer && region.inner) {
        points = [...region.outer, ...region.inner];
      }
      
      points.forEach(p => {
        minX = Math.min(minX, p.x);
        minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x);
        maxY = Math.max(maxY, p.y);
      });
      
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;
      const width = maxX - minX;
      const height = maxY - minY;
      
      return {
        centerX: (centerX / imageWidth) * 100,
        centerY: (centerY / imageHeight) * 100,
        width: (width / imageWidth) * 100,
        height: (height / imageHeight) * 100,
        left: (minX / imageWidth) * 100,
        top: (minY / imageHeight) * 100,
        points
      };
    };
    
    const faceBox = detection.detection.box;
    const detectedRegions = {
      face: {
        left: (faceBox.x / imageWidth) * 100,
        top: (faceBox.y / imageHeight) * 100,
        width: (faceBox.width / imageWidth) * 100,
        height: (faceBox.height / imageHeight) * 100
      },
      eyes: calculateRegionBounds(regions.eyes),
      brows: {
        left: calculateRegionBounds({ points: regions.brows.left }),
        right: calculateRegionBounds({ points: regions.brows.right })
      },
      nose: calculateRegionBounds(regions.nose),
      mouth: calculateRegionBounds(regions.mouth)
    };
    
    // Calculate measurements
    const measurements = this.calculateMeasurements(regions, imageWidth, imageHeight);
    
    this.setState({ detectedRegions, measurements }, () => {
      this.startAnimationSequence();
    });
  };

  calculateMeasurements = (regions, imageWidth, imageHeight) => {
    // Estimate pixel to cm ratio (average face width ~14cm)
    const faceWidthPx = Math.abs(regions.face.box.x + regions.face.box.width - regions.face.box.x);
    const pixelToCm = 14 / faceWidthPx;
    
    // Calculate various metrics
    const youthIndex = 70 + Math.random() * 20; // Placeholder calculation
    const balance = 75 + Math.random() * 20; // Placeholder calculation
    const proportion = 72 + Math.random() * 20; // Placeholder calculation
    
    return {
      pixelToCm,
      youthIndex: Math.round(youthIndex),
      balance: Math.round(balance),
      proportion: Math.round(proportion)
    };
  };

  startAnimationSequence = () => {
    // STEP 1: Global Face Lock (1000ms)
    this.setState({
      statusText: 'FACIAL STRUCTURE ANALYSIS',
      animationStep: 'faceLock'
    });
    
    // Draw face lock overlay
    if (this.overlayCanvasRef.current && this.detectedLandmarks && this.detectedImage) {
      requestAnimationFrame(() => {
        this.drawMedicalOverlay(this.detectedLandmarks, this.overlayCanvasRef.current, this.detectedImage, 'faceLock');
        this.setState({ showOverlay: true });
      });
    }
    
    setTimeout(() => {
      // STEP 2: Eye Analysis (1500ms) - slight zoom
      this.analyzeEyes();
    }, 1000);
  };

  analyzeEyes = () => {
    const { detectedRegions } = this.state;
    const eyes = detectedRegions.eyes;
    
    // Slight zoom (1.3x) instead of full zoom
    const scale = 1.3;
    const translateX = (50 - eyes.centerX) / scale;
    const translateY = (50 - eyes.centerY) / scale;
    
    this.setState({
      zoomTransform: { scale, translateX, translateY, transitionDuration: 0.8 },
      statusText: 'EYE ANALYSIS',
      animationStep: 'eyes'
    });
    
    // Draw eye analysis overlay
    if (this.overlayCanvasRef.current && this.detectedLandmarks && this.detectedImage) {
      requestAnimationFrame(() => {
        this.drawMedicalOverlay(this.detectedLandmarks, this.overlayCanvasRef.current, this.detectedImage, 'eyes');
      });
    }
    
    setTimeout(() => {
      // STEP 3: Nose Analysis (1200ms)
      this.analyzeNose();
    }, 1500);
  };

  analyzeNose = () => {
    const { detectedRegions } = this.state;
    const nose = detectedRegions.nose;
    
    // Slight zoom (1.4x)
    const scale = 1.4;
    const translateX = (50 - nose.centerX) / scale;
    const translateY = (50 - nose.centerY) / scale;
    
    this.setState({
      zoomTransform: { scale, translateX, translateY, transitionDuration: 0.7 },
      statusText: 'NOSE ANALYSIS',
      animationStep: 'nose'
    });
    
    // Draw nose analysis overlay
    if (this.overlayCanvasRef.current && this.detectedLandmarks && this.detectedImage) {
      requestAnimationFrame(() => {
        this.drawMedicalOverlay(this.detectedLandmarks, this.overlayCanvasRef.current, this.detectedImage, 'nose');
      });
    }
    
    setTimeout(() => {
      // STEP 4: Lip Analysis (1200ms)
      this.analyzeMouth();
    }, 1200);
  };

  analyzeMouth = () => {
    const { detectedRegions } = this.state;
    const mouth = detectedRegions.mouth;
    
    // Slight zoom (1.4x)
    const scale = 1.4;
    const translateX = (50 - mouth.centerX) / scale;
    const translateY = (50 - mouth.centerY) / scale;
    
    this.setState({
      zoomTransform: { scale, translateX, translateY, transitionDuration: 0.7 },
      statusText: 'LIP ANALYSIS',
      animationStep: 'mouth'
    });
    
    // Draw mouth analysis overlay
    if (this.overlayCanvasRef.current && this.detectedLandmarks && this.detectedImage) {
      requestAnimationFrame(() => {
        this.drawMedicalOverlay(this.detectedLandmarks, this.overlayCanvasRef.current, this.detectedImage, 'mouth');
      });
    }
    
    setTimeout(() => {
      // STEP 5: Full Face Metrics (1500ms)
      this.showFullFaceMetrics();
    }, 1200);
  };

  showFullFaceMetrics = () => {
    this.setState({
      zoomTransform: { scale: 1, translateX: 0, translateY: 0, transitionDuration: 1.0 },
      statusText: 'FACIAL PROPORTIONS',
      animationStep: 'metrics',
      showMetricsChart: true
    });
    
    // Draw full face metrics overlay
    if (this.overlayCanvasRef.current && this.detectedLandmarks && this.detectedImage) {
      requestAnimationFrame(() => {
        this.drawMedicalOverlay(this.detectedLandmarks, this.overlayCanvasRef.current, this.detectedImage, 'metrics');
      });
    }
    
    setTimeout(() => {
      // Show results card
      this.setState({
        showResultsCard: true,
        statusText: ''
      });
      
      // Send analysis results
      if (this.props.onAnalysisComplete && this.pendingAnalysis) {
        this.props.onAnalysisComplete(this.pendingAnalysis);
      }
    }, 1500);
  };

  handleRetake = () => {
    this.setState({ 
      capturedImage: null, 
      showOverlay: false,
      zoomTransform: null,
      animationStep: 0,
      statusText: '',
      showResultsCard: false,
      showMetricsChart: false,
      detectedRegions: null,
      measurements: null
    });
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
          <ImageWrapper>
            <CapturedImage 
              ref={this.imageRef}
              src={capturedImage}
              alt="Captured face"
              show={showImage}
              zoomTransform={this.state.zoomTransform}
              transitionDuration={this.state.zoomTransform?.transitionDuration || 0.8}
              transformOrigin="center center"
            />
            <AnalysisOverlayCanvas
              ref={this.overlayCanvasRef}
              show={showImage && (isAnalyzing || this.state.showOverlay)}
            />
            <AnalysisStatusText 
              visible={!!this.state.statusText}
            >
              {this.state.statusText}
            </AnalysisStatusText>
            {this.state.showMetricsChart && (
              <MetricsChart visible={this.state.showMetricsChart}>
                <canvas ref={el => { if (el) this.metricsChartCanvas = el; }} width={120} height={120} />
              </MetricsChart>
            )}
          </ImageWrapper>
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
        
        <ResultsCard visible={this.state.showResultsCard}>
          <div style={{ textAlign: 'center', padding: '0.2rem' }}>
            <h2 style={{ margin: '0 0 0.1rem 0', color: '#333', fontFamily: '"SF Pro Display", sans-serif', fontWeight: 400, fontSize: '0.22rem', letterSpacing: '0.02rem' }}>
              ANALYSIS COMPLETE
            </h2>
            <p style={{ margin: 0, color: '#666', fontSize: '0.14rem', fontFamily: '"SF Pro Display", sans-serif' }}>
              Facial structure analysis completed
            </p>
          </div>
        </ResultsCard>
      </Container>
    );
  }
}

export default FaceAnalysis;

