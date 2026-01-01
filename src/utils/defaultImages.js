// Default placeholder images as data URIs
// These are used instead of external img2.soyoung.com images

// Placeholder images for treatments (different colors for variety)
export const getTreatmentImage = (index = 0) => {
  const colors = [
    '#667eea', // Purple
    '#f093fb', // Pink
    '#4facfe', // Blue
    '#43e97b', // Green
    '#fa709a', // Rose
    '#fee140', // Yellow
    '#30cfd0', // Cyan
    '#a8edea'  // Light cyan
  ];
  
  const color = colors[index % colors.length];
  const svg = `<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="120" fill="${color}" opacity="0.1"/>
    <rect x="0" y="0" width="120" height="120" fill="url(#gradient)"/>
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:0.2" />
        <stop offset="100%" style="stop-color:${color};stop-opacity:0.05" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="40" r="15" fill="${color}" opacity="0.3"/>
    <circle cx="60" cy="80" r="20" fill="${color}" opacity="0.2"/>
    <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">صورة</text>
  </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

// Placeholder avatars for doctors/users
export const getAvatarImage = (index = 0) => {
  const colors = [
    '#667eea', // Purple
    '#f093fb', // Pink
    '#4facfe', // Blue
    '#43e97b', // Green
  ];
  
  const color = colors[index % colors.length];
  const initials = ['د', 'س', 'م', 'ف'][index % 4];
  
  const svg = `<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="60" fill="${color}"/>
    <text x="50%" y="50%" font-family="Arial" font-size="50" font-weight="bold" fill="white" text-anchor="middle" dy=".35em">${initials}</text>
  </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

// Placeholder banner images
export const getBannerImage = (index = 0) => {
  const gradients = [
    ['#667eea', '#764ba2'], // Purple gradient
    ['#f093fb', '#f5576c'], // Pink gradient
    ['#4facfe', '#00f2fe'], // Blue gradient
    ['#43e97b', '#38f9d7'], // Green gradient
  ];
  
  const [color1, color2] = gradients[index % gradients.length];
  
  const svg = `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bannerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="800" height="400" fill="url(#bannerGrad)"/>
    <circle cx="200" cy="100" r="50" fill="white" opacity="0.2"/>
    <circle cx="600" cy="300" r="80" fill="white" opacity="0.15"/>
    <text x="50%" y="50%" font-family="Arial" font-size="32" font-weight="bold" fill="white" text-anchor="middle" dy=".3em">عرض خاص</text>
  </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

// Simple placeholder (gray)
export const getSimplePlaceholder = () => {
  const svg = `<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="120" fill="#f8f9fa"/>
    <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">صورة</text>
  </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

// Simple avatar placeholder
export const getSimpleAvatar = () => {
  const svg = `<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="60" fill="#e9ecef"/>
    <text x="50%" y="50%" font-family="Arial" font-size="40" fill="#9ca3af" text-anchor="middle" dy=".35em">👤</text>
  </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

