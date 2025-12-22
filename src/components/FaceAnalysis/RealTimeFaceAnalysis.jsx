/**
 * Real-Time Face Analysis Component
 * 
 * High-end face analysis interface similar to SoYoung app
 * Features:
 * - Live camera feed with real-time face detection
 * - Glowing animated facial landmarks
 * - Animated connecting lines between landmarks
 * - Scanning animation effect (light line moving top to bottom)
 * - Cursor/focus indicator moving along analyzed facial points
 * - Real-time updating results panel
 * - Clean, clinical color palette (white, soft blue, light gray)
 * - Smooth transitions and animations
 * - Optimized for mobile and desktop
 */

import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import * as faceapi from "face-api.js";
import { 
  analyzeAdvancedSkin, 
  analyzeSkinProblems, 
  analyzeFacialProportions,
  analyzeSpecificRegions 
} from "../../utils/advancedFaceAnalysis";

// ============================================
// ANIMATIONS
// ============================================

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
    transform: scale(1.1);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ============================================
// STYLED COMPONENTS
// ============================================

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
  direction: rtl;
  position: relative;
  overflow: hidden;
`;

const CameraView = styled.div`
  position: relative;
  width: 100%;
  background: #000;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Video = styled.video`
  width: 100%;
  max-width: 100%;
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

const ScanningLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    to bottom,
    rgba(102, 126, 234, 0) 0%,
    rgba(102, 126, 234, 0.8) 50%,
    rgba(102, 126, 234, 0) 100%
  );
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.6);
  z-index: 6;
  animation: ${scanAnimation} 2s ease-in-out infinite;
  pointer-events: none;
`;

const CursorIndicator = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.9) 0%, rgba(102, 126, 234, 0.3) 70%, transparent 100%);
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(102, 126, 234, 0.8);
  z-index: 7;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out;
  animation: ${glowPulse} 1.5s ease-in-out infinite;
`;

const ResultsPanel = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 20px 20px 0 0;
  padding: 0.4rem;
  box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: 40vh;
  overflow-y: auto;
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ResultsTitle = styled.h2`
  font-size: 0.24rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.2rem 0;
  font-family: 'SF Pro Display', -apple-system, sans-serif;
  letter-spacing: -0.01rem;
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.15rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.3s ease-out;
`;

const MetricLabel = styled.span`
  font-size: 0.18rem;
  color: #718096;
  font-weight: 400;
  font-family: 'SF Pro Display', -apple-system, sans-serif;
`;

const MetricValue = styled.span`
  font-size: 0.2rem;
  color: #2d3748;
  font-weight: 600;
  font-family: 'SF Pro Display', -apple-system, sans-serif;
`;

const ScoreBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.05rem;
`;

const ScoreFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
  width: ${props => props.score || 0}%;
  transition: width 0.5s ease-out;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.2rem;
  padding: 0.3rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
`;

const Button = styled.button`
  padding: 0.2rem 0.5rem;
  border: none;
  border-radius: 1rem;
  font-size: 0.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'SF Pro Display', -apple-system, sans-serif;
  
  ${props => props.primary && `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
  `}
  
  ${props => props.secondary && `
    background: #f0f0f0;
    color: #333;
    
    &:hover {
      background: #e0e0e0;
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StatusText = styled.div`
  position: absolute;
  top: 0.3rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.16rem;
  font-weight: 500;
  text-align: center;
  z-index: 8;
  pointer-events: none;
  letter-spacing: 0.02rem;
  text-transform: uppercase;
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
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.2rem;
  z-index: 1000;
  flex-direction: column;
  gap: 0.2rem;
`;

// ============================================
// MAIN COMPONENT
// ============================================

class RealTimeFaceAnalysis extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.modelsLoaded = false;
    this.detectionInterval = null;
    this.animationFrameId = null;
    
    // Animation state
    this.scanProgress = 0;
    this.cursorPosition = { x: 0, y: 0 };
    this.currentFocusPoint = 0;
    this.landmarkAlpha = {}; // For gradual appearance
    this.lineProgress = {}; // For animated line drawing
    this.animationUpdateInterval = null;
  }

  state = {
    isStreaming: false,
    isAnalyzing: false,
    error: null,
    modelsLoading: false,
    
    // Real-time analysis results
    currentDetection: null,
    currentLandmarks: null,
    currentAge: null,
    currentGender: null,
    currentExpressions: null,
    currentSkinType: null,
    beautyScore: null,
    
    // UI state
    showResults: false,
    statusText: '',
    cursorVisible: false
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
        
        // Start real-time detection after video starts playing
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
    
    this.setState({ isAnalyzing: true, statusText: 'DETECTING FACE...' });
    
    // Detection loop - runs every ~100ms for smooth real-time detection
    this.detectionInterval = setInterval(async () => {
      if (!this.videoRef.current || !this.modelsLoaded) return;
      
      try {
        const detections = await faceapi
          .detectAllFaces(this.videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender();
        
        if (detections.length > 0) {
          const detection = detections[0];
          this.setState({
            currentDetection: detection,
            currentLandmarks: detection.landmarks,
            currentAge: Math.round(detection.age),
            currentGender: detection.gender,
            currentExpressions: detection.expressions,
            statusText: 'ANALYZING...',
            cursorVisible: true
          });
          
          // Calculate beauty score and skin type
          this.calculateMetrics(detection);
          
          // Draw overlay
          this.drawRealTimeOverlay(detection.landmarks);
          
          // Update cursor position to follow key facial points
          this.updateCursorPosition(detection.landmarks);
        } else {
          this.setState({
            currentDetection: null,
            currentLandmarks: null,
            statusText: 'POSITION FACE IN FRAME',
            cursorVisible: false
          });
          this.clearOverlay();
        }
      } catch (error) {
        console.error('Detection error:', error);
      }
    }, 100); // 10 FPS detection for performance
    
    // Start animation loop
    this.startAnimationLoop();
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
    this.setState({ isAnalyzing: false, statusText: '', cursorVisible: false });
    this.clearOverlay();
  };

  /**
   * Animation loop for smooth animations
   */
  startAnimationLoop = () => {
    const animate = () => {
      // Update scan progress for canvas drawing
      this.scanProgress = (this.scanProgress + 0.02) % 1;
      
      // Update cursor position if we have landmarks
      if (this.state.currentLandmarks) {
        this.updateCursorPosition(this.state.currentLandmarks);
        // Force re-render to update cursor position
        this.forceUpdate();
      }
      
      // Redraw if we have landmarks
      if (this.state.currentLandmarks && this.canvasRef.current) {
        this.drawRealTimeOverlay(this.state.currentLandmarks);
      }
      
      this.animationFrameId = requestAnimationFrame(animate);
    };
    animate();
  };

  /**
   * Draw real-time overlay with glowing landmarks and animated lines
   */
  drawRealTimeOverlay = (landmarks) => {
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
    
    // Calculate scaling (video is mirrored, so adjust X)
    const videoWidth = video.videoWidth || video.clientWidth;
    const videoHeight = video.videoHeight || video.clientHeight;
    const scaleX = canvas.width / videoWidth;
    const scaleY = canvas.height / videoHeight;
    
    const positions = landmarks.positions;
    if (!positions || positions.length < 68) return;
    
    // Draw scanning line effect
    this.drawScanningLine(ctx, canvas.width, canvas.height);
    
    // Draw connecting lines between landmarks (animated)
    this.drawAnimatedConnections(ctx, positions, scaleX, scaleY);
    
    // Draw glowing landmark points
    this.drawGlowingLandmarks(ctx, positions, scaleX, scaleY);
    
    // Draw facial region highlights
    this.drawRegionHighlights(ctx, positions, scaleX, scaleY);
  };

  /**
   * Draw scanning line effect (top to bottom)
   */
  drawScanningLine = (ctx, width, height) => {
    const scanY = this.scanProgress * height;
    
    // Main scanning line
    const gradient = ctx.createLinearGradient(0, scanY - 10, 0, scanY + 10);
    gradient.addColorStop(0, 'rgba(102, 126, 234, 0)');
    gradient.addColorStop(0.5, 'rgba(102, 126, 234, 0.8)');
    gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(102, 126, 234, 0.8)';
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(width, scanY);
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
  };

  /**
   * Draw animated connecting lines between facial landmarks
   */
  drawAnimatedConnections = (ctx, positions, scaleX, scaleY) => {
    // Define facial feature connections
    const connections = [
      // Jawline (0-16)
      { points: Array.from({ length: 17 }, (_, i) => i), color: 'rgba(102, 126, 234, 0.4)' },
      // Right eyebrow (17-21)
      { points: [17, 18, 19, 20, 21], color: 'rgba(102, 126, 234, 0.5)' },
      // Left eyebrow (22-26)
      { points: [22, 23, 24, 25, 26], color: 'rgba(102, 126, 234, 0.5)' },
      // Nose bridge (27-30)
      { points: [27, 28, 29, 30], color: 'rgba(102, 126, 234, 0.6)' },
      // Nose base (31-35)
      { points: [31, 32, 33, 34, 35], color: 'rgba(102, 126, 234, 0.5)' },
      // Right eye (36-41)
      { points: [36, 37, 38, 39, 40, 41, 36], color: 'rgba(135, 206, 250, 0.6)' },
      // Left eye (42-47)
      { points: [42, 43, 44, 45, 46, 47, 42], color: 'rgba(135, 206, 250, 0.6)' },
      // Mouth outer (48-59)
      { points: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 48], color: 'rgba(236, 72, 153, 0.5)' },
      // Mouth inner (60-67)
      { points: [60, 61, 62, 63, 64, 65, 66, 67, 60], color: 'rgba(236, 72, 153, 0.4)' }
    ];
    
    connections.forEach((connection, connIdx) => {
      ctx.strokeStyle = connection.color;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.setLineDash([]);
      
      ctx.beginPath();
      const canvas = this.canvasRef.current;
      if (!canvas) return;
      
      connection.points.forEach((pointIdx, idx) => {
        if (positions[pointIdx]) {
          const x = (canvas.width - positions[pointIdx].x * scaleX); // Mirror for front camera
          const y = positions[pointIdx].y * scaleY;
          
          if (idx === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
      });
      ctx.stroke();
    });
    
    // Draw cross-connections for mesh effect
    this.drawMeshConnections(ctx, positions, scaleX, scaleY);
  };

  /**
   * Draw mesh-like connections between key points
   */
  drawMeshConnections = (ctx, positions, scaleX, scaleY) => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    
    ctx.strokeStyle = 'rgba(102, 126, 234, 0.2)';
    ctx.lineWidth = 0.5;
    
    // Connect nose tip to eye centers
    if (positions[30] && positions[36] && positions[45]) {
      const noseTipX = canvas.width - positions[30].x * scaleX;
      const noseTipY = positions[30].y * scaleY;
      const rightEyeX = canvas.width - positions[36].x * scaleX;
      const rightEyeY = positions[36].y * scaleY;
      const leftEyeX = canvas.width - positions[45].x * scaleX;
      const leftEyeY = positions[45].y * scaleY;
      
      ctx.beginPath();
      ctx.moveTo(noseTipX, noseTipY);
      ctx.lineTo(rightEyeX, rightEyeY);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(noseTipX, noseTipY);
      ctx.lineTo(leftEyeX, leftEyeY);
      ctx.stroke();
    }
    
    // Connect eyebrow centers to nose
    if (positions[19] && positions[24] && positions[27]) {
      const rightBrowX = canvas.width - positions[19].x * scaleX;
      const rightBrowY = positions[19].y * scaleY;
      const leftBrowX = canvas.width - positions[24].x * scaleX;
      const leftBrowY = positions[24].y * scaleY;
      const noseTopX = canvas.width - positions[27].x * scaleX;
      const noseTopY = positions[27].y * scaleY;
      
      ctx.beginPath();
      ctx.moveTo(rightBrowX, rightBrowY);
      ctx.lineTo(noseTopX, noseTopY);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(leftBrowX, leftBrowY);
      ctx.lineTo(noseTopX, noseTopY);
      ctx.stroke();
    }
  };

  /**
   * Draw glowing landmark points
   */
  drawGlowingLandmarks = (ctx, positions, scaleX, scaleY) => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    
    // Key facial points with different colors
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
        if (positions[pointIdx]) {
          const x = canvas.width - positions[pointIdx].x * scaleX; // Mirror
          const y = positions[pointIdx].y * scaleY;
          
          // Initialize alpha if needed
          const key = `point_${pointIdx}`;
          if (!this.landmarkAlpha[key]) {
            this.landmarkAlpha[key] = 0;
          }
          // Gradually increase alpha
          this.landmarkAlpha[key] = Math.min(1, this.landmarkAlpha[key] + 0.1);
          
          // Draw outer glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, pointGroup.size * 4);
          gradient.addColorStop(0, pointGroup.color);
          gradient.addColorStop(0.5, pointGroup.color.replace('0.9', '0.4').replace('0.8', '0.3').replace('0.7', '0.2').replace('0.6', '0.1'));
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, pointGroup.size * 4, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw inner point
          ctx.fillStyle = pointGroup.color;
          ctx.beginPath();
          ctx.arc(x, y, pointGroup.size, 0, Math.PI * 2);
          ctx.fill();
          
          // White center for brightness
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(x, y, pointGroup.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    });
  };

  /**
   * Draw region highlights (subtle colored overlays)
   */
  drawRegionHighlights = (ctx, positions, scaleX, scaleY) => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    
    // Eye region highlights
    if (positions[36] && positions[41] && positions[42] && positions[47]) {
      const leftEyeX = canvas.width - positions[36].x * scaleX;
      const leftEyeY = positions[36].y * scaleY;
      const leftEyeWidth = Math.abs((canvas.width - positions[39].x * scaleX) - leftEyeX);
      const leftEyeHeight = Math.abs(positions[41].y * scaleY - leftEyeY);
      
      ctx.fillStyle = 'rgba(135, 206, 250, 0.05)';
      ctx.beginPath();
      ctx.ellipse(leftEyeX + leftEyeWidth/2, leftEyeY + leftEyeHeight/2, leftEyeWidth * 0.8, leftEyeHeight * 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      const rightEyeX = canvas.width - positions[42].x * scaleX;
      const rightEyeY = positions[42].y * scaleY;
      const rightEyeWidth = Math.abs((canvas.width - positions[45].x * scaleX) - rightEyeX);
      const rightEyeHeight = Math.abs(positions[47].y * scaleY - rightEyeY);
      
      ctx.beginPath();
      ctx.ellipse(rightEyeX + rightEyeWidth/2, rightEyeY + rightEyeHeight/2, rightEyeWidth * 0.8, rightEyeHeight * 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  /**
   * Update cursor position to follow key facial points
   */
  updateCursorPosition = (landmarks) => {
    const positions = landmarks.positions;
    if (!positions || positions.length < 68) return;
    
    // Cycle through key points: nose tip, left eye, right eye, mouth center
    const keyPoints = [
      { idx: 30, name: 'nose' },      // Nose tip
      { idx: 36, name: 'leftEye' },   // Left eye center
      { idx: 45, name: 'rightEye' },  // Right eye center
      { idx: 51, name: 'mouth' }      // Mouth top center
    ];
    
    // Update focus point every 2 seconds
    const focusIdx = Math.floor(Date.now() / 2000) % keyPoints.length;
    const focusPoint = keyPoints[focusIdx];
    
    if (positions[focusPoint.idx]) {
      const video = this.videoRef.current;
      const rect = video.getBoundingClientRect();
      const scaleX = rect.width / (video.videoWidth || video.clientWidth);
      const scaleY = rect.height / (video.videoHeight || video.clientHeight);
      
      this.cursorPosition = {
        x: rect.left + (rect.width - positions[focusPoint.idx].x * scaleX),
        y: rect.top + positions[focusPoint.idx].y * scaleY
      };
      
      this.currentFocusPoint = focusPoint.idx;
    }
  };

  /**
   * Calculate beauty metrics
   */
  calculateMetrics = async (detection) => {
    try {
      const { age, gender, expressions, landmarks } = detection;
      
      // Calculate beauty score (0-100) based on symmetry and proportions
      const symmetry = this.calculateSymmetry(landmarks);
      const proportions = this.calculateProportions(landmarks);
      const beautyScore = Math.round((symmetry + proportions) / 2);
      
      // Estimate skin type (simplified - would need image analysis for real implementation)
      const skinTypes = ['Normal', 'Oily', 'Dry', 'Combination'];
      const skinType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
      
      this.setState({
        beautyScore,
        currentSkinType: skinType,
        showResults: true
      });
    } catch (error) {
      console.error('Error calculating metrics:', error);
    }
  };

  /**
   * Calculate facial symmetry score
   */
  calculateSymmetry = (landmarks) => {
    const positions = landmarks.positions;
    if (!positions || positions.length < 68) return 75;
    
    // Compare left and right facial features
    const leftEyeCenter = {
      x: (positions[36].x + positions[39].x) / 2,
      y: (positions[36].y + positions[39].y) / 2
    };
    const rightEyeCenter = {
      x: (positions[42].x + positions[45].x) / 2,
      y: (positions[42].y + positions[45].y) / 2
    };
    
    const noseCenter = positions[30];
    const faceCenterX = (positions[0].x + positions[16].x) / 2;
    
    // Calculate symmetry based on eye alignment and nose position
    const eyeSymmetry = 100 - Math.abs(leftEyeCenter.y - rightEyeCenter.y) * 10;
    const noseSymmetry = 100 - Math.abs(noseCenter.x - faceCenterX) * 5;
    
    return Math.max(0, Math.min(100, (eyeSymmetry + noseSymmetry) / 2));
  };

  /**
   * Calculate facial proportions score
   */
  calculateProportions = (landmarks) => {
    const positions = landmarks.positions;
    if (!positions || positions.length < 68) return 75;
    
    // Calculate golden ratio approximations
    // This is simplified - real implementation would use more complex calculations
    return 70 + Math.random() * 20; // Placeholder
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

  render() {
    const { 
      isStreaming, 
      isAnalyzing, 
      error, 
      modelsLoading,
      currentAge,
      currentGender,
      currentExpressions,
      currentSkinType,
      beautyScore,
      statusText,
      cursorVisible,
      showResults
    } = this.state;

    return (
      <Container>
        {/* Camera View Layer */}
        <CameraView>
          <Video 
            ref={this.videoRef}
            autoPlay
            playsInline
            muted
            style={{ display: isStreaming ? 'block' : 'none' }}
          />
          
          {/* Overlay Canvas Layer */}
          <OverlayCanvas 
            ref={this.canvasRef}
            style={{ display: isStreaming ? 'block' : 'none' }}
          />
          
          {/* Scanning Line Effect - CSS Animation */}
          {isAnalyzing && <ScanningLine />}
          
          {/* Cursor Indicator */}
          {cursorVisible && this.state.currentLandmarks && (
            <CursorIndicator
              style={{
                left: `${this.cursorPosition.x}px`,
                top: `${this.cursorPosition.y}px`
              }}
            />
          )}
          
          {/* Status Text */}
          {statusText && <StatusText>{statusText}</StatusText>}
          
          {/* Loading Overlay */}
          {modelsLoading && (
            <LoadingOverlay>
              <div>Loading AI Models...</div>
              <div style={{ fontSize: '0.16rem', opacity: 0.8 }}>Please wait</div>
            </LoadingOverlay>
          )}
        </CameraView>

        {/* Error Message */}
        {error && (
          <div style={{ 
            background: '#ffebee', 
            color: '#c62828', 
            padding: '0.2rem', 
            textAlign: 'center',
            fontSize: '0.18rem'
          }}>
            {error}
          </div>
        )}

        {/* Real-Time Results Panel */}
        <ResultsPanel visible={showResults && isAnalyzing}>
          <ResultsTitle>Real-Time Analysis</ResultsTitle>
          
          {currentAge && (
            <MetricRow>
              <MetricLabel>Age</MetricLabel>
              <MetricValue>{currentAge} years</MetricValue>
            </MetricRow>
          )}
          
          {currentGender && (
            <MetricRow>
              <MetricLabel>Gender</MetricLabel>
              <MetricValue>{currentGender === 'male' ? 'Male' : 'Female'}</MetricValue>
            </MetricRow>
          )}
          
          {currentSkinType && (
            <MetricRow>
              <MetricLabel>Skin Type</MetricLabel>
              <MetricValue>{currentSkinType}</MetricValue>
            </MetricRow>
          )}
          
          {beautyScore !== null && (
            <div style={{ marginTop: '0.15rem' }}>
              <MetricRow>
                <MetricLabel>Beauty Score</MetricLabel>
                <MetricValue>{beautyScore}/100</MetricValue>
              </MetricRow>
              <ScoreBar>
                <ScoreFill score={beautyScore} />
              </ScoreBar>
            </div>
          )}
          
          {currentExpressions && (
            <div style={{ marginTop: '0.15rem' }}>
              <MetricLabel style={{ display: 'block', marginBottom: '0.1rem' }}>Expressions</MetricLabel>
              {Object.entries(currentExpressions)
                .filter(([_, value]) => value > 0.1)
                .sort(([_, a], [__, b]) => b - a)
                .slice(0, 3)
                .map(([emotion, confidence]) => (
                  <MetricRow key={emotion}>
                    <MetricLabel style={{ textTransform: 'capitalize' }}>{emotion}</MetricLabel>
                    <MetricValue>{Math.round(confidence * 100)}%</MetricValue>
                  </MetricRow>
                ))}
            </div>
          )}
        </ResultsPanel>

        {/* Controls */}
        <Controls>
          {!isStreaming && (
            <Button 
              primary 
              onClick={this.startCamera}
              disabled={modelsLoading || !this.modelsLoaded}
            >
              Start Analysis
            </Button>
          )}
          
          {isStreaming && (
            <Button secondary onClick={this.stopCamera}>
              Stop Camera
            </Button>
          )}
        </Controls>
      </Container>
    );
  }
}

export default RealTimeFaceAnalysis;

