import React from 'react';

const AvatarModel = ({ modelId, gender = "female" }) => {
  const getModelEmoji = () => {
    const femaleModels = {
      'model1': '👩‍🦰',
      'model2': '👩‍🦱',
      'model3': '👩',
      'model4': '👩‍🦳'
    };
    
    const maleModels = {
      'model1': '👨‍🦰',
      'model2': '👨‍🦱',
      'model3': '👨',
      'model4': '👨‍🦳'
    };
    
    const models = gender === "male" ? maleModels : femaleModels;
    return models[modelId] || (gender === "male" ? '👨' : '👩');
  };

  const getModelDescription = () => {
    if (gender === "male") {
      switch(modelId) {
        case 'model1': return 'نموذج ذكري مع شعر طويل أحمر';
        case 'model2': return 'نموذج ذكري مع شعر مجعد بني';
        case 'model3': return 'نموذج ذكري مع شعر قصير';
        case 'model4': return 'نموذج ذكري مع شعر رمادي أنيق';
        default: return 'نموذج ثلاثي الأبعاد ذكري';
      }
    } else {
      switch(modelId) {
        case 'model1': return 'نموذج أنثوي مع شعر طويل أحمر';
        case 'model2': return 'نموذج أنثوي مع شعر مجعد بني';
        case 'model3': return 'نموذج أنثوي مع شعر أشقر ناعم';
        case 'model4': return 'نموذج أنثوي مع شعر رمادي أنيق';
        default: return 'نموذج ثلاثي الأبعاد أنثوي';
      }
    }
  };

  return (
    <div className="avatar-preview-container">
      <div className="preview-header">
        <h4>🎨 معاينة النموذج</h4>
        <p className="preview-description">يمكنك تدويره وتكبير/تصغيره</p>
      </div>
      
      <div className="model-display">
        <div className="model-3d">
          {getModelEmoji()}
        </div>
        <div className="model-controls">
          <button className="control-btn">🔄 تدوير</button>
          <button className="control-btn">➕ تكبير</button>
          <button className="control-btn">➖ تصغير</button>
        </div>
      </div>
      
      <p className="model-info">{getModelDescription()}</p>
    </div>
  );
};

export default AvatarModel;