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
import styled, { keyframes, css } from "styled-components";
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
  padding: 20px;
  box-sizing: border-box;
  gap: 20px;
`;

const CameraView = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 500px;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  margin: 0 auto;
  
  @media (max-width: 768px) {
    height: 400px;
    max-width: 350px;
  }
  
  @media (max-width: 480px) {
    height: 350px;
    max-width: 300px;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'SF Pro Display', -apple-system, sans-serif;
  letter-spacing: 0.5px;
  min-width: 180px;
  
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
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.95);
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  z-index: 8;
  pointer-events: none;
  letter-spacing: 0.5px;
  font-family: 'SF Pro Display', -apple-system, sans-serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0.3);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  white-space: nowrap;
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
  font-size: 18px;
  z-index: 1000;
  gap: 12px;
  font-family: 'SF Pro Display', -apple-system, sans-serif;
  border-radius: 16px;
`;

const Instructions = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  text-align: center;
  max-width: 400px;
  margin-top: 10px;
  font-family: 'SF Pro Display', -apple-system, sans-serif;
  line-height: 1.5;
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
  z-index: 3;
  pointer-events: none;
`;

const AnalysisImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scaleX(-1);
  max-width: 90%;
  max-height: 70%;
  z-index: 2;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  object-fit: contain;
  
  @media (max-width: 768px) {
    max-height: 60%;
  }
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
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.95);
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  z-index: 10;
  pointer-events: none;
  letter-spacing: 1px;
  font-family: 'SF Pro Display', -apple-system, sans-serif;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  animation: ${glowPulse} 2s ease-in-out infinite;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 20px;
    bottom: 100px;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 400px;
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

const PercentageText = styled.div`
  position: absolute;
  top: -25px;
  left: 0;
  color: white;
  font-size: 14px;
  font-weight: 600;
  font-family: 'SF Pro Display', -apple-system, sans-serif;
`;

// ============================================
// PAGE 3: RESULTS
// ============================================

const ResultsPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
  padding-bottom: 80px;
  overflow-y: auto;
  box-sizing: border-box;
`;

const ResultsHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px 20px;
  color: white;
  margin: -20px -20px 30px -20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  
  h1 {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 10px 0;
    font-family: 'SF Pro Display', -apple-system, sans-serif;
    letter-spacing: -0.5px;
    text-align: center;
  }
  
  p {
    font-size: 16px;
    margin: 0;
    opacity: 0.9;
    font-family: 'SF Pro Display', -apple-system, sans-serif;
    text-align: center;
  }
`;

const OverallScore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 15px 0;
`;

const ScoreCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => {
    if (props.score >= 80) return 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
    if (props.score >= 60) return 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)';
    return 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 700;
  font-family: 'SF Pro Display', -apple-system, sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const ScoreLabel = styled.div`
  display: flex;
  flex-direction: column;
  
  .score-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  
  .score-description {
    font-size: 14px;
    opacity: 0.8;
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ResultCard = styled.div`
  background: white;
  border-radius: 12px;
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
  height: 200px;
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
  padding: 20px;
  
  h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 10px 0;
    color: #2d3748;
    font-family: 'SF Pro Display', -apple-system, sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  p {
    font-size: 14px;
    color: #718096;
    margin: 0;
    line-height: 1.5;
    font-family: 'SF Pro Display', -apple-system, sans-serif;
  }
`;

const ScoreBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  background: ${props => {
    if (props.score >= 80) return 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
    if (props.score >= 60) return 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)';
    return 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)';
  }};
  color: white;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  transition: all 0.3s ease;
  z-index: 100;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const AnalysisSteps = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 30px 0;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  
  .step-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e2e8f0'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.active ? 'white' : '#94a3b8'};
    font-size: 20px;
    font-weight: bold;
  }
  
  .step-text {
    font-size: 14px;
    color: ${props => props.active ? '#2d3748' : '#94a3b8'};
    font-weight: ${props => props.active ? '600' : '400'};
    text-align: center;
    font-family: 'SF Pro Display', -apple-system, sans-serif;
  }
`;

// ============================================
// MAIN COMPONENT (استمرار بدون تغيير في منطق الكود)
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

  // ... [جميع الدوال المنطقية تبقى كما هي بدون تغيير]
  // loadModels, startCamera, stopCamera, startRealTimeDetection, etc.
  
  /**
   * Render Page 1: Camera Capture
   */
  renderCameraPage = () => {
    const { isStreaming, modelsLoading, error, currentLandmarks } = this.state;
    
    return (
      <PageWrapper active={this.state.currentPage === 'camera'} enter={this.state.pageEnter}>
        <CameraPageContainer>
          <AnalysisSteps>
            <Step active={true}>
              <div className="step-icon">1</div>
              <div className="step-text">Capture Face</div>
            </Step>
            <Step active={false}>
              <div className="step-icon">2</div>
              <div className="step-text">Analysis</div>
            </Step>
            <Step active={false}>
              <div className="step-icon">3</div>
              <div className="step-text">Results</div>
            </Step>
          </AnalysisSteps>
          
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
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Please wait</div>
              </LoadingOverlay>
            )}
          </CameraView>
          
          {error && (
            <div style={{ 
              background: '#ffebee', 
              color: '#c62828', 
              padding: '12px 20px', 
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '10px',
              maxWidth: '90%',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          {!isStreaming && (
            <>
              <StartButton 
                onClick={this.startCamera}
                disabled={modelsLoading || !this.modelsLoaded}
              >
                {modelsLoading ? 'Loading...' : 'Start Camera'}
              </StartButton>
              <Instructions>
                Make sure your face is well-lit and centered in the frame
              </Instructions>
            </>
          )}
          
          {isStreaming && (
            <>
              <StartButton 
                onClick={this.handleStartAnalysis}
                disabled={!currentLandmarks}
              >
                Start Analysis
              </StartButton>
              <Instructions>
                Hold still and press the button when your face is properly aligned
              </Instructions>
            </>
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
          <AnalysisSteps>
            <Step active={false}>
              <div className="step-icon">1</div>
              <div className="step-text">Capture Face</div>
            </Step>
            <Step active={true}>
              <div className="step-icon">2</div>
              <div className="step-text">Analysis</div>
            </Step>
            <Step active={false}>
              <div className="step-icon">3</div>
              <div className="step-text">Results</div>
            </Step>
          </AnalysisSteps>
          
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
            <PercentageText>{Math.round(analysisProgress)}%</PercentageText>
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
            <BackButton onClick={this.handleBack}>←</BackButton>
            <h1>Analysis Results</h1>
            <OverallScore>
              <ScoreCircle score={analysisResults.overall.score}>
                {analysisResults.overall.score}
              </ScoreCircle>
              <ScoreLabel>
                <div className="score-title">Overall Score</div>
                <div className="score-description">{analysisResults.overall.description}</div>
                {analysisResults.overall.age && (
                  <div className="score-description">
                    Age: {analysisResults.overall.age}
                    {analysisResults.overall.gender && ` • ${analysisResults.overall.gender}`}
                  </div>
                )}
              </ScoreLabel>
            </OverallScore>
          </ResultsHeader>
          
          <AnalysisSteps>
            <Step active={false}>
              <div className="step-icon">1</div>
              <div className="step-text">Capture Face</div>
            </Step>
            <Step active={false}>
              <div className="step-icon">2</div>
              <div className="step-text">Analysis</div>
            </Step>
            <Step active={true}>
              <div className="step-icon">3</div>
              <div className="step-text">Results</div>
            </Step>
          </AnalysisSteps>
          
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