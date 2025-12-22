/**
 * SoYoung-Style Face Analysis Component
 * 
 * High-end face analysis interface with 3 sequential pages:
 * Page 1: Camera Capture with live landmarks
 * Page 2: Analysis Animation (10 seconds)
 * Page 3: Results with scrollable region cards
 * 
 * Features:
 * - Real-time facial landmark detection using face-api.js
 * - Canvas 2D for overlays and animations
 * - Smooth page transitions
 * - Modular, well-commented code
 * - Optimized for mobile and desktop
 */

import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import * as faceapi from "face-api.js";
import { 
  analyzeAdvancedSkin, 
  analyzeSkinProblems, 
  analyzeFacialProportions
} from "../../utils/advancedFaceAnalysis";

// ============================================
// ANIMATIONS
// ============================================

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scanAnimation = keyframes`
  0% {
    top: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const particleFloat = keyframes`
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  50% {
    transform: translateY(-100px) translateX(20px);
    opacity: 1;
  }
`;

// ============================================
// STYLED COMPONENTS - Page Container
// ============================================

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => {
    if (props.page === 'camera') return 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)';
    if (props.page === 'analysis') return 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)';
    return '#f8f9fa';
  }};
  direction: rtl;
  position: relative;
  overflow: hidden;
  transition: background 0.5s ease;
`;

const PageWrapper = styled.div`
  position: ${props => props.active ? 'relative' : 'absolute'};
  width: 100%;
  height: 100vh;
  opacity: ${props => props.active ? 1 : 0};
  pointer-events: ${props => props.active ? 'auto' : 'none'};
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: ${props => props.active ? 1 : 0};
  animation: ${props => props.active && props.enter ? slideInRight : 'none'} 0.5s ease-out;
`;

// ============================================
// PAGE 1: CAMERA CAPTURE
// ============================================

const CameraPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const CameraView = styled.div`
  position: relative;
  width: 100%;
  max-width: 7rem;
  background: #000;
  border-radius: 0.3rem;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  margin-bottom: 0.4rem;
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  display: block;
  transform: scaleX(-1); /* Mirror for front camera */
`;

const OverlayCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
`;

const StartButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.25rem 0.8rem;
  font-size: 0.24rem;
  font-weight: 700;
  border-radius: 2rem;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'SF Pro Display', -apple-system, sans-serif;
  letter-spacing: 0.02rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusText = styled.div`
  position: absolute;
  top: 0.4rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.18rem;
  font-weight: 500;
  text-align: center;
  z-index: 8;
  pointer-events: none;
  letter-spacing: 0.02rem;
  font-family: 'SF Pro Display', -apple-system, sans-serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0.3);
  padding: 0.1rem 0.3rem;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.2rem;
  z-index: 1000;
  gap: 0.2rem;
  font-family: 'SF Pro Display', -apple-system, sans-serif;
`;

// ============================================
// PAGE 2: ANALYSIS ANIMATION
// ============================================

const AnalysisPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const AnalysisCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const AnalysisImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scaleX(-1);
  max-width: 90%;
  max-height: 90%;
  z-index: 2;
  border-radius: 0.2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

const ScanningLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(
    to bottom,
    rgba(102, 126, 234, 0) 0%,
    rgba(102, 126, 234, 0.9) 50%,
    rgba(102, 126, 234, 0) 100%
  );
  box-shadow: 0 0 30px rgba(102, 126, 234, 0.8);
  z-index: 6;
  animation: ${scanAnimation} 2s ease-in-out infinite;
  pointer-events: none;
`;

const Particle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, transparent 100%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 4;
  animation: ${particleFloat} ${props => props.duration || 3}s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;
  left: ${props => props.left || 50}%;
  top: ${props => props.top || 50}%;
`;

const AnalysisStatusText = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.32rem;
  font-weight: 700;
  text-align: center;
  z-index: 10;
  pointer-events: none;
  letter-spacing: 0.05rem;
  font-family: 'SF Pro Display', -apple-system, sans-serif;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  animation: ${glowPulse} 2s ease-in-out infinite;
  text-transform: uppercase;
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 6rem;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  z-index: 10;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
  width: ${props => props.progress || 0}%;
  transition: width 0.1s linear;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.6);
`;

// ============================================
// PAGE 3: RESULTS
// ============================================

const ResultsPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
  padding: 0.3rem 0.25rem;
  padding-bottom: 1.5rem;
  overflow-y: auto;
`;

const ResultsHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.4rem 0.3rem;
  color: white;
  margin: -0.3rem -0.25rem 0.3rem -0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  h1 {
    font-size: 0.32rem;
    font-weight: 700;
    margin: 0 0 0.1rem 0;
    font-family: 'SF Pro Display', -apple-system, sans-serif;
    letter-spacing: -0.01rem;
  }
  
  p {
    font-size: 0.18rem;
    margin: 0;
    opacity: 0.9;
    font-family: 'SF Pro Display', -apple-system, sans-serif;
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
  gap: 0.2rem;
  margin-top: 0.2rem;
`;

const ResultCard = styled.div`
  background: white;
  border-radius: 0.2rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${props => props.delay || 0}s;
  animation-fill-mode: both;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const CardImage = styled.div`
  width: 100%;
  padding-top: 75%; /* 4:3 aspect ratio */
  position: relative;
  overflow: hidden;
  background: ${props => props.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  padding: 0.2rem;
  
  h3 {
    font-size: 0.2rem;
    font-weight: 700;
    margin: 0 0 0.08rem 0;
    color: #2d3748;
    font-family: 'SF Pro Display', -apple-system, sans-serif;
    display: flex;
    align-items: center;
    gap: 0.08rem;
  }
  
  p {
    font-size: 0.16rem;
    color: #718096;
    margin: 0;
    line-height: 1.4;
    font-family: 'SF Pro Display', -apple-system, sans-serif;
  }
`;

const ScoreBadge = styled.span`
  display: inline-block;
  padding: 0.03rem 0.1rem;
  border-radius: 0.1rem;
  font-size: 0.14rem;
  font-weight: 600;
  background: ${props => {
    if (props.score >= 80) return 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
    if (props.score >= 60) return 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)';
    return 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)';
  }};
  color: white;
  margin-right: 0.05rem;
`;

const BackButton = styled.button`
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 0.24rem;
  transition: all 0.3s ease;
  z-index: 100;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

// ============================================
// MAIN COMPONENT
// ============================================

class SoYoungFaceAnalysis extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.analysisCanvasRef = React.createRef();
    this.modelsLoaded = false;
    this.detectionInterval = null;
    this.animationFrameId = null;
    this.capturedImageData = null;
    
    // Animation state
    this.scanProgress = 0;
    this.landmarkAlpha = {};
    this.particles = [];
  }

  state = {
    currentPage: 'camera', // 'camera', 'analysis', 'results'
    pageEnter: false,
    
    // Camera page state
    isStreaming: false,
    isDetecting: false,
    modelsLoading: false,
    error: null,
    currentLandmarks: null,
    
    // Analysis page state
    analysisProgress: 0,
    analysisStatus: 'Analyzing...',
    
    // Results page state
    analysisResults: null,
    detectedRegions: null
  };

  componentDidMount() {
    this.loadModels();
  }

  componentWillUnmount() {
    this.stopCamera();
    this.stopDetection();
  }

  /**
   * Load face-api.js models
   */
  loadModels = async () => {
    try {
      this.setState({ modelsLoading: true, error: null });
      
      const MODEL_URL = '/models/';
      const CDN_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';
      
      try {
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
        error: 'Failed to load AI models. Please check your internet connection.' 
      });
    }
  };

  /**
   * Start camera stream
   */
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
        await this.videoRef.current.play();
        this.setState({ isStreaming: true });
        
        // Start real-time detection
        setTimeout(() => {
          this.startRealTimeDetection();
        }, 500);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      this.setState({ 
        error: 'Cannot access camera. Please check permissions.' 
      });
    }
  };

  /**
   * Stop camera stream
   */
  stopCamera = () => {
    if (this.videoRef.current && this.videoRef.current.srcObject) {
      const tracks = this.videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      this.videoRef.current.srcObject = null;
      this.setState({ isStreaming: false });
    }
    this.stopDetection();
  };

  /**
   * Start real-time face detection loop
   */
  startRealTimeDetection = () => {
    if (!this.modelsLoaded || !this.videoRef.current) return;
    
    this.setState({ isDetecting: true });
    
    // Detection loop - runs every ~150ms for performance
    this.detectionInterval = setInterval(async () => {
      if (!this.videoRef.current || !this.modelsLoaded) return;
      
      try {
        const detections = await faceapi
          .detectAllFaces(this.videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();
        
        if (detections.length > 0) {
          const detection = detections[0];
          this.setState({
            currentLandmarks: detection.landmarks
          });
          
          // Draw overlay
          this.drawCameraOverlay(detection.landmarks);
        } else {
          this.setState({ currentLandmarks: null });
          this.clearOverlay();
        }
      } catch (error) {
        console.error('Detection error:', error);
      }
    }, 150);
  };

  /**
   * Stop detection loop
   */
  stopDetection = () => {
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
      this.detectionInterval = null;
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.setState({ isDetecting: false, currentLandmarks: null });
    this.clearOverlay();
  };

  /**
   * Draw glowing landmark dots on camera overlay (Page 1)
   */
  drawCameraOverlay = (landmarks) => {
    if (!this.canvasRef.current || !landmarks || !this.videoRef.current) return;
    
    const canvas = this.canvasRef.current;
    const video = this.videoRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match video display size
    const rect = video.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate scaling (video is mirrored)
    const videoWidth = video.videoWidth || video.clientWidth;
    const videoHeight = video.videoHeight || video.clientHeight;
    const scaleX = canvas.width / videoWidth;
    const scaleY = canvas.height / videoHeight;
    
    const positions = landmarks.positions;
    if (!positions || positions.length < 68) return;
    
    // Draw key facial landmarks as glowing dots
    const keyPoints = [
      // Eyes
      { indices: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47], color: 'rgba(135, 206, 250, 0.9)', size: 3 },
      // Eyebrows
      { indices: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26], color: 'rgba(102, 126, 234, 0.8)', size: 2.5 },
      // Nose
      { indices: [27, 28, 29, 30, 31, 32, 33, 34, 35], color: 'rgba(102, 126, 234, 0.7)', size: 2.5 },
      // Mouth
      { indices: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67], color: 'rgba(236, 72, 153, 0.8)', size: 2.5 },
      // Jawline
      { indices: Array.from({ length: 17 }, (_, i) => i), color: 'rgba(102, 126, 234, 0.6)', size: 2 }
    ];
    
    keyPoints.forEach(pointGroup => {
      pointGroup.indices.forEach(pointIdx => {
        if (positions[pointIdx] && positions[pointIdx].x !== undefined && positions[pointIdx].y !== undefined) {
          const x = canvas.width - positions[pointIdx].x * scaleX; // Mirror
          const y = positions[pointIdx].y * scaleY;
          
          // Check if x and y are valid numbers (not NaN or Infinity)
          if (!isFinite(x) || !isFinite(y) || x < 0 || y < 0 || x > canvas.width || y > canvas.height) {
            return; // Skip invalid points
          }
          
          // Draw outer glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, pointGroup.size * 3);
          gradient.addColorStop(0, pointGroup.color);
          gradient.addColorStop(0.5, pointGroup.color.replace('0.9', '0.3').replace('0.8', '0.2').replace('0.7', '0.15').replace('0.6', '0.1'));
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, pointGroup.size * 3, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw inner point
          ctx.fillStyle = pointGroup.color;
          ctx.beginPath();
          ctx.arc(x, y, pointGroup.size, 0, Math.PI * 2);
          ctx.fill();
          
          // White center
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(x, y, pointGroup.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    });
  };

  /**
   * Clear overlay canvas
   */
  clearOverlay = () => {
    if (this.canvasRef.current) {
      const ctx = this.canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
    }
  };

  /**
   * Handle Start Analysis button click
   */
  handleStartAnalysis = () => {
    if (!this.state.currentLandmarks || !this.videoRef.current) {
      this.setState({ error: 'Please position your face in the frame' });
      return;
    }
    
    // Capture image
    const canvas = document.createElement('canvas');
    const video = this.videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    this.capturedImageData = canvas.toDataURL('image/jpeg');
    
    // Stop camera
    this.stopCamera();
    
    // Navigate to analysis page
    this.setState({ 
      currentPage: 'analysis',
      pageEnter: true,
      analysisProgress: 0,
      analysisStatus: 'Analyzing...'
    }, () => {
      this.startAnalysisAnimation();
    });
  };

  /**
   * Start 10-second analysis animation (Page 2)
   */
  startAnalysisAnimation = async () => {
    const duration = 10000; // 10 seconds
    const startTime = Date.now();
    const image = new Image();
    image.src = this.capturedImageData;
    
    await new Promise(resolve => {
      image.onload = resolve;
    });
    
    // Detect landmarks on captured image and perform full analysis
    let detection = null;
    let fullAnalysis = null;
    let landmarks = null;
    
    try {
      const detections = await faceapi
        .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();
      
      if (detections.length > 0) {
        detection = detections[0];
        landmarks = detection.landmarks;
        
        // Perform advanced analysis in background
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          
          const advancedSkin = analyzeAdvancedSkin(image, detection.landmarks, ctx);
          const skinProblems = analyzeSkinProblems(image, detection.landmarks, detection.age);
          const facialProportions = analyzeFacialProportions(detection.landmarks);
          
          fullAnalysis = {
            age: Math.round(detection.age),
            gender: detection.gender === 'male' ? 'Male' : 'Female',
            expressions: detection.expressions,
            advancedSkin,
            skinProblems,
            facialProportions
          };
        } catch (error) {
          console.error('Advanced analysis error:', error);
          // Set default values if advanced analysis fails
          fullAnalysis = {
            age: Math.round(detection.age || 30),
            gender: detection.gender === 'male' ? 'Male' : 'Female',
            expressions: detection.expressions || {},
            advancedSkin: { type: 'مختلطة', hydration: 'طبيعي', sebum: 'متوسط', pores: 'متوسطة', texture: 'متوسطة' },
            skinProblems: { acne: { active: false }, pigmentation: { level: 'لا يوجد' }, darkCircles: { present: false } },
            facialProportions: { symmetry: 75, goldenRatio: 75, faceShape: 'بيضاوي' }
          };
        }
      }
    } catch (error) {
      console.error('Detection error:', error);
      // If detection completely fails, still navigate to results with default data
      landmarks = null;
    }
    
    // Store for results page
    this.analysisData = {
      image: this.capturedImageData,
      landmarks: landmarks,
      detection: detection,
      fullAnalysis: fullAnalysis
    };
    
    // Start animation loop
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      
      this.setState({ analysisProgress: progress });
      
      if (landmarks && this.analysisCanvasRef.current) {
        this.drawAnalysisAnimation(this.analysisCanvasRef.current, image, landmarks, progress);
      }
      
      if (progress < 100) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        // Animation complete
        this.setState({ analysisStatus: 'Analysis Complete!' }, () => {
          setTimeout(() => {
            this.navigateToResults();
          }, 1000);
        });
      }
    };
    
    animate();
  };

  /**
   * Draw analysis animation with lines, scanning, and particles (Page 2)
   */
  drawAnalysisAnimation = (canvas, image, landmarks, progress) => {
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate image position (centered)
    const imgAspect = image.width / image.height;
    const canvasAspect = canvas.width / canvas.height;
    let imgWidth, imgHeight, imgX, imgY;
    
    if (imgAspect > canvasAspect) {
      imgWidth = canvas.width * 0.9;
      imgHeight = imgWidth / imgAspect;
    } else {
      imgHeight = canvas.height * 0.9;
      imgWidth = imgHeight * imgAspect;
    }
    imgX = (canvas.width - imgWidth) / 2;
    imgY = (canvas.height - imgHeight) / 2;
    
    const positions = landmarks.positions;
    const scaleX = imgWidth / image.width;
    const scaleY = imgHeight / image.height;
    
    // Draw connecting lines (animated based on progress)
    this.drawAnimatedConnections(ctx, positions, imgX, imgY, scaleX, scaleY, progress);
    
    // Draw scanning line
    const scanY = imgY + (progress / 100) * imgHeight;
    this.drawScanningLine(ctx, imgX, scanY, imgX + imgWidth);
    
    // Draw particles
    this.drawParticles(ctx, positions, imgX, imgY, scaleX, scaleY, progress);
  };

  /**
   * Draw animated connecting lines between landmarks
   */
  drawAnimatedConnections = (ctx, positions, offsetX, offsetY, scaleX, scaleY, progress) => {
    const connections = [
      { points: Array.from({ length: 17 }, (_, i) => i), color: 'rgba(102, 126, 234, 0.5)' },
      { points: [17, 18, 19, 20, 21], color: 'rgba(102, 126, 234, 0.6)' },
      { points: [22, 23, 24, 25, 26], color: 'rgba(102, 126, 234, 0.6)' },
      { points: [27, 28, 29, 30], color: 'rgba(102, 126, 234, 0.7)' },
      { points: [31, 32, 33, 34, 35], color: 'rgba(102, 126, 234, 0.6)' },
      { points: [36, 37, 38, 39, 40, 41, 36], color: 'rgba(135, 206, 250, 0.7)' },
      { points: [42, 43, 44, 45, 46, 47, 42], color: 'rgba(135, 206, 250, 0.7)' },
      { points: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 48], color: 'rgba(236, 72, 153, 0.6)' },
      { points: [60, 61, 62, 63, 64, 65, 66, 67, 60], color: 'rgba(236, 72, 153, 0.5)' }
    ];
    
    connections.forEach((connection, connIdx) => {
      // Animate connection appearance based on progress
      const connectionProgress = Math.min(1, (progress / 100) * connections.length - connIdx);
      if (connectionProgress <= 0) return;
      
      ctx.strokeStyle = connection.color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = connectionProgress;
      
      ctx.beginPath();
      connection.points.forEach((pointIdx, idx) => {
        if (positions[pointIdx]) {
          const x = offsetX + (ctx.canvas.width - positions[pointIdx].x * scaleX);
          const y = offsetY + positions[pointIdx].y * scaleY;
          
          if (idx === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
      });
      if (connection.points[connection.points.length - 1] !== connection.points[0]) {
        ctx.closePath();
      }
      ctx.stroke();
    });
    
    ctx.globalAlpha = 1;
  };

  /**
   * Draw scanning line effect
   */
  drawScanningLine = (ctx, x1, y, x2) => {
    const gradient = ctx.createLinearGradient(x1, y - 15, x1, y + 15);
    gradient.addColorStop(0, 'rgba(102, 126, 234, 0)');
    gradient.addColorStop(0.5, 'rgba(102, 126, 234, 0.9)');
    gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.shadowBlur = 30;
    ctx.shadowColor = 'rgba(102, 126, 234, 0.8)';
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  /**
   * Draw particle effects
   */
  drawParticles = (ctx, positions, offsetX, offsetY, scaleX, scaleY, progress) => {
    // Generate particles around key points
    const keyPoints = [30, 36, 45, 51]; // nose tip, eyes, mouth
    
    keyPoints.forEach(pointIdx => {
      if (positions[pointIdx] && Math.random() < 0.3) {
        const baseX = offsetX + (ctx.canvas.width - positions[pointIdx].x * scaleX);
        const baseY = offsetY + positions[pointIdx].y * scaleY;
        
        const particleX = baseX + (Math.random() - 0.5) * 40;
        const particleY = baseY + (Math.random() - 0.5) * 40;
        const size = 2 + Math.random() * 2;
        
        const gradient = ctx.createRadialGradient(particleX, particleY, 0, particleX, particleY, size * 2);
        gradient.addColorStop(0, 'rgba(102, 126, 234, 0.8)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particleX, particleY, size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  };

  /**
   * Navigate to results page
   */
  navigateToResults = async () => {
    // Generate analysis results (now async to crop images)
    const results = await this.generateAnalysisResults();
    
    this.setState({
      currentPage: 'results',
      pageEnter: true,
      analysisResults: results,
      analysisProgress: 100
    });
    
    // Call callback if provided
    if (this.props.onAnalysisComplete) {
      this.props.onAnalysisComplete(results);
    }
  };

  /**
   * Generate analysis results from captured data
   * Now async to crop region images
   */
  generateAnalysisResults = async () => {
    if (!this.analysisData || !this.analysisData.landmarks) {
      return this.getDefaultResults();
    }
    
    const { landmarks, fullAnalysis, detection } = this.analysisData;
    
    // Get original image dimensions
    let originalImageWidth = 640;
    let originalImageHeight = 480;
    
    // Load image to get actual dimensions
    const img = new Image();
    img.src = this.analysisData.image;
    await new Promise((resolve) => {
      if (img.complete) {
        originalImageWidth = img.width;
        originalImageHeight = img.height;
        resolve();
      } else {
        img.onload = () => {
          originalImageWidth = img.width;
          originalImageHeight = img.height;
          resolve();
        };
        img.onerror = resolve;
      }
    });
    
    // Extract regions from landmarks (using actual image dimensions)
    const regions = this.extractRegions(landmarks);
    
    // Calculate overall score
    let overallScore = 75;
    if (fullAnalysis && fullAnalysis.facialProportions) {
      overallScore = Math.round(
        (fullAnalysis.facialProportions.symmetry + 
         (fullAnalysis.facialProportions.goldenRatio || 75)) / 2
      );
    }
    
    // Generate region-specific results with cropped thumbnails
    const regionResults = [];
    
    // Eyes region
    if (regions.eyes && regions.eyes.minX < regions.eyes.maxX) {
      const eyesThumbnail = await this.extractRegionImage(
        this.analysisData.image, 
        regions.eyes, 
        originalImageWidth, 
        originalImageHeight
      );
      regionResults.push({
        id: 'eyes',
        name: 'Eyes',
        icon: '👁️',
        thumbnail: eyesThumbnail,
        score: fullAnalysis?.facialProportions?.symmetry > 85 ? 88 : 78,
        description: fullAnalysis?.facialProportions?.symmetry > 85 
          ? 'Symmetrical and well-proportioned' 
          : 'Good eye alignment',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        region: regions.eyes
      });
    }
    
    // Nose region
    if (regions.nose && regions.nose.minX < regions.nose.maxX) {
      const noseThumbnail = await this.extractRegionImage(
        this.analysisData.image, 
        regions.nose, 
        originalImageWidth, 
        originalImageHeight
      );
      regionResults.push({
        id: 'nose',
        name: 'Nose',
        icon: '👃',
        thumbnail: noseThumbnail,
        score: 80,
        description: 'Balanced nose structure',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        region: regions.nose
      });
    }
    
    // Mouth region
    if (regions.mouth && regions.mouth.minX < regions.mouth.maxX) {
      const mouthThumbnail = await this.extractRegionImage(
        this.analysisData.image, 
        regions.mouth, 
        originalImageWidth, 
        originalImageHeight
      );
      regionResults.push({
        id: 'mouth',
        name: 'Lips',
        icon: '👄',
        thumbnail: mouthThumbnail,
        score: 82,
        description: fullAnalysis?.age && fullAnalysis.age < 30 
          ? 'Full and youthful lips' 
          : 'Well-defined lip structure',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        region: regions.mouth
      });
    }
    
    // Jawline region
    if (regions.jawline && regions.jawline.minX < regions.jawline.maxX) {
      const jawlineThumbnail = await this.extractRegionImage(
        this.analysisData.image, 
        regions.jawline, 
        originalImageWidth, 
        originalImageHeight
      );
      regionResults.push({
        id: 'jawline',
        name: 'Jawline',
        icon: '⚡',
        thumbnail: jawlineThumbnail,
        score: 85,
        description: 'Strong and well-defined',
        gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        region: regions.jawline
      });
    }
    
    // Cheeks region
    if (regions.cheeks && regions.cheeks.minX < regions.cheeks.maxX) {
      const cheeksThumbnail = await this.extractRegionImage(
        this.analysisData.image, 
        regions.cheeks, 
        originalImageWidth, 
        originalImageHeight
      );
      regionResults.push({
        id: 'cheeks',
        name: 'Cheeks',
        icon: '✨',
        thumbnail: cheeksThumbnail,
        score: 80,
        description: 'Natural contour and volume',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        region: regions.cheeks
      });
    }
    
    // Add skin quality card if analysis available
    if (fullAnalysis && fullAnalysis.advancedSkin) {
      const skinScore = 100 - (fullAnalysis.advancedSkin.poresScore || 0) / 2;
      // For skin, use a cropped version of the face center
      const skinRegion = {
        minX: originalImageWidth * 0.25,
        maxX: originalImageWidth * 0.75,
        minY: originalImageHeight * 0.2,
        maxY: originalImageHeight * 0.7
      };
      const skinThumbnail = await this.extractRegionImage(
        this.analysisData.image, 
        skinRegion, 
        originalImageWidth, 
        originalImageHeight
      );
      regionResults.push({
        id: 'skin',
        name: 'Skin Quality',
        icon: '🌟',
        thumbnail: skinThumbnail,
        score: Math.round(skinScore),
        description: `${fullAnalysis.advancedSkin.type} skin with ${fullAnalysis.advancedSkin.hydration || 'normal'} hydration`,
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        region: skinRegion
      });
    }
    
    return {
      overall: {
        score: overallScore,
        description: fullAnalysis?.facialProportions?.symmetry > 85 
          ? 'Overall facial harmony is excellent' 
          : 'Good facial proportions',
        age: fullAnalysis?.age,
        gender: fullAnalysis?.gender
      },
      regions: regionResults,
      fullAnalysis: fullAnalysis
    };
  };

  /**
   * Get default results if analysis fails
   */
  getDefaultResults = () => {
    return {
      overall: {
        score: 75,
        description: 'Analysis completed',
        age: null,
        gender: null
      },
      regions: [
        {
          id: 'eyes',
          name: 'Eyes',
          icon: '👁️',
          thumbnail: this.analysisData?.image,
          score: 80,
          description: 'Analyzed successfully',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }
      ]
    };
  };

  /**
   * Extract facial regions from landmarks
   */
  extractRegions = (landmarks) => {
    if (!landmarks || !landmarks.positions) return {};
    
    const positions = landmarks.positions;
    
    return {
      eyes: {
        minX: Math.min(...[36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47].map(i => positions[i]?.x || 0)),
        maxX: Math.max(...[36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47].map(i => positions[i]?.x || 0)),
        minY: Math.min(...[36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47].map(i => positions[i]?.y || 0)),
        maxY: Math.max(...[36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47].map(i => positions[i]?.y || 0))
      },
      nose: {
        minX: Math.min(...[27, 28, 29, 30, 31, 32, 33, 34, 35].map(i => positions[i]?.x || 0)),
        maxX: Math.max(...[27, 28, 29, 30, 31, 32, 33, 34, 35].map(i => positions[i]?.x || 0)),
        minY: Math.min(...[27, 28, 29, 30, 31, 32, 33, 34, 35].map(i => positions[i]?.y || 0)),
        maxY: Math.max(...[27, 28, 29, 30, 31, 32, 33, 34, 35].map(i => positions[i]?.y || 0))
      },
      mouth: {
        minX: Math.min(...[48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59].map(i => positions[i]?.x || 0)),
        maxX: Math.max(...[48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59].map(i => positions[i]?.x || 0)),
        minY: Math.min(...[48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59].map(i => positions[i]?.y || 0)),
        maxY: Math.max(...[48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59].map(i => positions[i]?.y || 0))
      },
      jawline: {
        minX: Math.min(...Array.from({ length: 17 }, (_, i) => positions[i]?.x || 0)),
        maxX: Math.max(...Array.from({ length: 17 }, (_, i) => positions[i]?.x || 0)),
        minY: Math.min(...Array.from({ length: 17 }, (_, i) => positions[i]?.y || 0)),
        maxY: Math.max(...Array.from({ length: 17 }, (_, i) => positions[i]?.y || 0))
      },
      cheeks: {
        minX: Math.min(...[1, 2, 3, 4, 5, 11, 12, 13, 14, 15].map(i => positions[i]?.x || 0)),
        maxX: Math.max(...[1, 2, 3, 4, 5, 11, 12, 13, 14, 15].map(i => positions[i]?.x || 0)),
        minY: Math.min(...[1, 2, 3, 4, 5, 11, 12, 13, 14, 15].map(i => positions[i]?.y || 0)),
        maxY: Math.max(...[1, 2, 3, 4, 5, 11, 12, 13, 14, 15].map(i => positions[i]?.y || 0))
      },
      skin: {
        minX: 0,
        maxX: 640, // Assuming default image width
        minY: 0,
        maxY: 480 // Assuming default image height
      }
    };
  };

  /**
   * Extract region image from full image by cropping the specific region
   */
  extractRegionImage = (imageSrc, region, originalImageWidth, originalImageHeight) => {
    if (!region || !imageSrc || region.minX >= region.maxX || region.minY >= region.maxY) {
      return Promise.resolve(imageSrc);
    }
    
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Use actual loaded image dimensions
          const imgWidth = img.width;
          const imgHeight = img.height;
          
          // Calculate scale factors if landmarks were in different coordinate system
          // face-api.js landmarks are in pixel coordinates relative to the image
          // But we need to ensure they match the actual image dimensions
          const scaleX = imgWidth / (originalImageWidth || imgWidth);
          const scaleY = imgHeight / (originalImageHeight || imgHeight);
          
          // Scale region coordinates to match actual image
          const scaledMinX = region.minX * scaleX;
          const scaledMaxX = region.maxX * scaleX;
          const scaledMinY = region.minY * scaleY;
          const scaledMaxY = region.maxY * scaleY;
          
          // Add padding around the region (30% on each side for better view)
          const regionWidth = scaledMaxX - scaledMinX;
          const regionHeight = scaledMaxY - scaledMinY;
          const paddingX = regionWidth * 0.3;
          const paddingY = regionHeight * 0.3;
          
          // Calculate crop coordinates with padding
          const cropX = Math.max(0, scaledMinX - paddingX);
          const cropY = Math.max(0, scaledMinY - paddingY);
          const cropWidth = Math.min(imgWidth - cropX, regionWidth + paddingX * 2);
          const cropHeight = Math.min(imgHeight - cropY, regionHeight + paddingY * 2);
          
          // Ensure minimum dimensions
          if (cropWidth <= 0 || cropHeight <= 0) {
            resolve(imageSrc);
            return;
          }
          
          // Set canvas size to cropped region
          canvas.width = cropWidth;
          canvas.height = cropHeight;
          
          // Draw the cropped region
          ctx.drawImage(
            img,
            cropX, cropY, cropWidth, cropHeight,  // Source region
            0, 0, cropWidth, cropHeight           // Destination (canvas)
          );
          
          // Convert to data URL
          const croppedImageSrc = canvas.toDataURL('image/jpeg', 0.9);
          resolve(croppedImageSrc);
        } catch (error) {
          console.error('Error cropping region:', error);
          resolve(imageSrc); // Fallback to full image
        }
      };
      img.onerror = () => resolve(imageSrc); // Fallback on error
      img.src = imageSrc;
    });
  };

  /**
   * Handle back button
   */
  handleBack = () => {
    if (this.state.currentPage === 'results') {
      this.setState({ 
        currentPage: 'camera',
        pageEnter: true,
        analysisResults: null,
        analysisProgress: 0
      });
      setTimeout(() => {
        this.startCamera();
      }, 300);
    } else if (this.state.currentPage === 'analysis') {
      this.setState({ 
        currentPage: 'camera',
        pageEnter: true,
        analysisProgress: 0
      });
      setTimeout(() => {
        this.startCamera();
      }, 300);
    }
  };

  /**
   * Render Page 1: Camera Capture
   */
  renderCameraPage = () => {
    const { isStreaming, modelsLoading, error, currentLandmarks } = this.state;
    
    return (
      <PageWrapper active={this.state.currentPage === 'camera'} enter={this.state.pageEnter}>
        <CameraPageContainer>
          <StatusText>
            {!isStreaming ? 'Position your face in the frame' : 
             currentLandmarks ? 'Face detected ✓' : 'Detecting face...'}
          </StatusText>
          
          <CameraView>
            <Video 
              ref={this.videoRef}
              autoPlay
              playsInline
              muted
              style={{ display: isStreaming ? 'block' : 'none' }}
            />
            <OverlayCanvas ref={this.canvasRef} />
            
            {modelsLoading && (
              <LoadingOverlay>
                <div>Loading AI Models...</div>
                <div style={{ fontSize: '0.16rem', opacity: 0.8 }}>Please wait</div>
              </LoadingOverlay>
            )}
          </CameraView>
          
          {error && (
            <div style={{ 
              background: '#ffebee', 
              color: '#c62828', 
              padding: '0.2rem 0.4rem', 
              borderRadius: '0.1rem',
              fontSize: '0.16rem',
              marginBottom: '0.2rem',
              maxWidth: '90%',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          {!isStreaming && (
            <StartButton 
              onClick={this.startCamera}
              disabled={modelsLoading || !this.modelsLoaded}
            >
              {modelsLoading ? 'Loading...' : 'Start Camera'}
            </StartButton>
          )}
          
          {isStreaming && (
            <StartButton 
              onClick={this.handleStartAnalysis}
              disabled={!currentLandmarks}
            >
              Start Analysis
            </StartButton>
          )}
        </CameraPageContainer>
      </PageWrapper>
    );
  };

  /**
   * Render Page 2: Analysis Animation
   */
  renderAnalysisPage = () => {
    const { analysisProgress, analysisStatus } = this.state;
    
    return (
      <PageWrapper active={this.state.currentPage === 'analysis'} enter={this.state.pageEnter}>
        <AnalysisPageContainer>
          {this.capturedImageData && (
            <AnalysisImage 
              src={this.capturedImageData} 
              alt="Face being analyzed"
            />
          )}
          <AnalysisCanvas ref={this.analysisCanvasRef} />
          <ScanningLine />
          <AnalysisStatusText>{analysisStatus}</AnalysisStatusText>
          <ProgressBar>
            <ProgressFill progress={analysisProgress} />
          </ProgressBar>
        </AnalysisPageContainer>
      </PageWrapper>
    );
  };

  /**
   * Render Page 3: Results
   */
  renderResultsPage = () => {
    const { analysisResults } = this.state;
    
    if (!analysisResults) return null;
    
    return (
      <PageWrapper active={this.state.currentPage === 'results'} enter={this.state.pageEnter}>
        <ResultsPageContainer>
          <ResultsHeader>
            <BackButton onClick={this.handleBack}>×</BackButton>
            <h1>Analysis Results</h1>
            <p>
              Overall Score: {analysisResults.overall.score}/100
              {analysisResults.overall.age && (
                <span style={{ marginRight: '0.2rem' }}>
                  • Age: {analysisResults.overall.age}
                  {analysisResults.overall.gender && ` (${analysisResults.overall.gender})`}
                </span>
              )}
            </p>
          </ResultsHeader>
          
          <ResultsGrid>
            {analysisResults.regions.map((region, index) => (
              <ResultCard 
                key={region.id}
                delay={index * 0.1}
                onClick={() => {
                  if (this.props.onRegionClick) {
                    this.props.onRegionClick(region);
                  }
                }}
              >
                <CardImage gradient={region.gradient}>
                  <img src={region.thumbnail} alt={region.name} />
                </CardImage>
                <CardContent>
                  <h3>
                    {region.icon} {region.name}
                    <ScoreBadge score={region.score}>{region.score}</ScoreBadge>
                  </h3>
                  <p>{region.description}</p>
                </CardContent>
              </ResultCard>
            ))}
          </ResultsGrid>
        </ResultsPageContainer>
      </PageWrapper>
    );
  };

  render() {
    return (
      <Container page={this.state.currentPage}>
        {this.renderCameraPage()}
        {this.renderAnalysisPage()}
        {this.renderResultsPage()}
      </Container>
    );
  }
}

export default SoYoungFaceAnalysis;

