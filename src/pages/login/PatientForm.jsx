import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { PatientFormContainer, SectionCard, SectionHeader, FormInput, FormTextarea, YesNoGroup, CheckboxGroup, SubmitButton, SkipButton, GenderSelector, SignatureCanvasWrapper } from "./PatientFormStyled";

// مكون بسيط للتوقيع
class SignatureCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.isDrawing = false;
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = this.props.backgroundColor || '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  clear = () => {
    const canvas = this.canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = this.props.backgroundColor || '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (this.props.onEnd) this.props.onEnd();
    }
  };

  isEmpty = () => {
    const canvas = this.canvasRef.current;
    if (!canvas) return true;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return imageData.data.every((channel, index) => {
      // تجاهل قناة alpha
      if ((index + 1) % 4 === 0) return true;
      return channel === 248 || channel === 252; // لون الخلفية
    });
  };

  toDataURL = () => {
    return this.canvasRef.current ? this.canvasRef.current.toDataURL() : '';
  };

  handleMouseDown = (e) => {
    this.isDrawing = true;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  handleMouseMove = (e) => {
    if (!this.isDrawing) return;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = this.props.penColor || '#7c3aed';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  handleMouseUp = () => {
    this.isDrawing = false;
    if (this.props.onEnd) this.props.onEnd();
  };

  handleTouchStart = (e) => {
    e.preventDefault();
    this.isDrawing = true;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  handleTouchMove = (e) => {
    if (!this.isDrawing) return;
    e.preventDefault();
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.strokeStyle = this.props.penColor || '#7c3aed';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  handleTouchEnd = () => {
    this.isDrawing = false;
    if (this.props.onEnd) this.props.onEnd();
  };

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        width={400}
        height={200}
        className="sig-canvas"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseUp}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      />
    );
  }
}

@withRouter
class PatientForm extends Component {
  constructor(props) {
    super(props);
    this.clientSigRef = React.createRef();
  }

  state = {
    // البيانات الأساسية
    gender: null, // "male" or "female"
    fullName: "",
    idNumber: "",
    phone: "",
    birthDate: "",
    
    // الوضع الصحي العام
    healthStatus: "",
    exercise: null,
    pregnancy: null, // للإناث فقط
    breastfeeding: null, // للإناث فقط
    menstrualCycle: null, // للإناث فقط
    
    // الحساسية
    allergiesText: "",
    allergyBread: false,
    allergyMilk: false,
    
    // المكملات والأدوية
    supplements: null,
    supplementsType: "",
    dailyMedications: { medications: null, type: "" },
    energyDrinks: null,
    smoking: null,
    
    // الأمراض الجلدية
    skinDiseases: null,
    skinDetails: "",
    
    // الأمراض المزمنة
    chronicConditions: {
      "shortBreath": null,
      "heartDisease": null,
      "bloodClot": null,
      "hormoneDisorder": null,
      "thyroid": null,
      "immuneDisease": null,
      "headache": null,
      "epilepsy": null,
      "anemia": null,
      "bloodPressure": null,
      "kidney": null,
      "diabetes": null,
      "pcod": null,
      "cancer": null,
    },
    
    // مستحضرات التجميل
    cosmetics: {
      "soap": null,
      "moisturizer": null,
      "sunscreen": null,
      "exfoliation": null,
      "serum": null,
      "otherMedications": "",
    },
    
    // أدوية يومية إضافية
    dailyMedicationsExtra: {
      "contraceptive": null,
      "antidepressant": null,
      "sedative": null,
      "sleepingPill": null,
      "biotica": null,
      "roaccutane": null,
      "other": "",
    },
    
    // العلاجات السابقة
    previousTreatments: "",
    
    // التوقيع
    date: "",
    clientSignatureData: "",
    
    // حالة الأسئلة الطبية
    showMedicalQuestions: null, // null = لم يقرر بعد، true = يريد الإجابة، false = يريد التخطي
    medicalQuestionsAnswered: false,
  };

  // خرائط للعرض بالعربية
  chronicConditionsMap = {
    "shortBreath": "ضيق نفس",
    "heartDisease": "أمراض قلب",
    "bloodClot": "تخثر الدم",
    "hormoneDisorder": "اضطرابات هرمونية",
    "thyroid": "غدة درقية",
    "immuneDisease": "أمراض جهاز المناعة",
    "headache": "صداع / أوجاع رأس",
    "epilepsy": "صرع",
    "anemia": "فقر دم",
    "bloodPressure": "ضغط دم",
    "kidney": "الكلى",
    "diabetes": "سكري",
    "pcod": "تكيس مبايض",
    "cancer": "سرطان"
  };

  cosmeticsMap = {
    "soap": "صابون",
    "moisturizer": "كريم ترطيب",
    "sunscreen": "واقي شمس",
    "exfoliation": "تقشير",
    "serum": "سيروم",
    "otherMedications": "أدوية أخرى"
  };

  dailyMedicationsExtraMap = {
    "contraceptive": "منع حمل (حبوب أو غيرها)",
    "antidepressant": "حبوب اكتئاب",
    "sedative": "حبوب تهدئة",
    "sleepingPill": "حبوب نوم",
    "biotica": "انتبيّوتيكا (العشر أيام الأخيرة)",
    "roaccutane": "روكوتان (آخر ثلاثة أشهر)",
    "other": "أخرى"
  };

  // دالة لأزرار نعم/لا
  renderYesNo = (label, value, setValue, isSmall = false) => (
    <YesNoGroup isSmall={isSmall}>
      <label className="label">{label}:</label>
      <div className="options">
        <label className="option">
          <input
            type="radio"
            name={`${label}-yesno`}
            checked={value === true}
            onChange={() => setValue(true)}
          />
          <span>نعم</span>
        </label>
        <label className="option">
          <input
            type="radio"
            name={`${label}-yesno`}
            checked={value === false}
            onChange={() => setValue(false)}
          />
          <span>لا</span>
        </label>
      </div>
    </YesNoGroup>
  );

  // دالة للـ checkboxes
  renderCheckbox = (label, checked, setChecked) => (
    <CheckboxGroup>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span>{label}</span>
      </label>
    </CheckboxGroup>
  );

  // دالة لمسح التوقيع
  clearClientSignature = () => {
    if (this.clientSigRef.current && this.clientSigRef.current.clear) {
      this.clientSigRef.current.clear();
      this.setState({ clientSignatureData: "" });
    }
  };

  // دالة لحفظ التوقيع
  handleClientSignatureEnd = () => {
    if (this.clientSigRef.current && this.clientSigRef.current.toDataURL) {
      const isEmpty = this.clientSigRef.current.isEmpty ? this.clientSigRef.current.isEmpty() : false;
      if (!isEmpty) {
        this.setState({
          clientSignatureData: this.clientSigRef.current.toDataURL()
        });
      } else {
        this.setState({ clientSignatureData: "" });
      }
    }
  };

  // معالجة الإرسال
  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.state.fullName || !this.state.phone) {
      alert("الرجاء تعبئة الحقول الإلزامية (الاسم الكامل ورقم الهاتف)");
      return;
    }

    if (!this.state.gender) {
      alert("الرجاء تحديد الجنس");
      return;
    }

    // الحصول على بيانات التوقيع
    let finalClientSignature = "";
    if (this.clientSigRef.current && this.clientSigRef.current.toDataURL) {
      const isEmpty = this.clientSigRef.current.isEmpty ? this.clientSigRef.current.isEmpty() : true;
      if (!isEmpty) {
        finalClientSignature = this.clientSigRef.current.toDataURL();
      }
    }

    const patientId = this.state.idNumber || `patient-${Date.now()}`;

    // البيانات
    const formData = {
      gender: this.state.gender,
      fullName: this.state.fullName,
      idNumber: this.state.idNumber,
      phone: this.state.phone,
      birthDate: this.state.birthDate,
      healthStatus: this.state.healthStatus,
      exercise: this.state.exercise,
      pregnancy: this.state.pregnancy,
      breastfeeding: this.state.breastfeeding,
      menstrualCycle: this.state.menstrualCycle,
      allergiesText: this.state.allergiesText,
      allergyBread: this.state.allergyBread,
      allergyMilk: this.state.allergyMilk,
      supplements: this.state.supplements,
      supplementsType: this.state.supplementsType,
      dailyMedications: this.state.dailyMedications,
      energyDrinks: this.state.energyDrinks,
      smoking: this.state.smoking,
      skinDiseases: this.state.skinDiseases,
      skinDetails: this.state.skinDetails,
      chronicConditions: this.state.chronicConditions,
      cosmetics: this.state.cosmetics,
      dailyMedicationsExtra: this.state.dailyMedicationsExtra,
      previousTreatments: this.state.previousTreatments,
      clientSignature: finalClientSignature,
      date: this.state.date,
      showMedicalQuestions: this.state.showMedicalQuestions,
      medicalQuestionsAnswered: this.state.medicalQuestionsAnswered,
      createdAt: new Date().toISOString(),
    };

    try {
      // حفظ في localStorage (يمكن استبداله بـ Firebase لاحقاً)
      const patients = JSON.parse(localStorage.getItem("patients") || "{}");
      patients[patientId] = formData;
      localStorage.setItem("patients", JSON.stringify(patients));

      alert("تم حفظ بيانات العميلة بنجاح!");
      this.props.history.push("/home");
    } catch (err) {
      console.error("Error:", err);
      alert("حدث خطأ أثناء حفظ البيانات: " + err.message);
    }
  };

  // اختيار الإجابة على الأسئلة الطبية أو التخطي
  handleMedicalQuestionsChoice = (choice) => {
    this.setState({
      showMedicalQuestions: choice,
      medicalQuestionsAnswered: choice === true
    }, () => {
      // التمرير إلى الأسئلة الطبية إذا اختار الإجابة
      if (choice === true) {
        setTimeout(() => {
          const medicalSection = document.querySelector('.medical-questions-section');
          if (medicalSection) {
            medicalSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  };

  render() {
    const { gender, showMedicalQuestions } = this.state;
    const isFemale = gender === "female";

    return (
      <PatientFormContainer>
        <div className="container">
          {/* Header */}


          <form onSubmit={this.handleSubmit}>

            {/* الأسئلة الطبية */}
            {showMedicalQuestions === true && (
              <div className="medical-questions-section">
                {/* الوضع الصحي العام */}
                <SectionCard>
                  <SectionHeader>
                    <div className="icon">💊</div>
                    <h3>الوضع الصحي العام</h3>
                  </SectionHeader>
                  <div className="form-grid">
                    <div>
                      <label>الحالة الصحية الحالية</label>
                      <FormInput
                        type="text"
                        placeholder="وصف الحالة الصحية..."
                        value={this.state.healthStatus}
                        onChange={(e) => this.setState({ healthStatus: e.target.value })}
                      />
                    </div>
                    <div>
                      {this.renderYesNo("ممارسة الرياضة", this.state.exercise, (val) => this.setState({ exercise: val }))}
                      {isFemale && this.renderYesNo("الحمل", this.state.pregnancy, (val) => this.setState({ pregnancy: val }))}
                      {isFemale && this.renderYesNo("الرضاعة", this.state.breastfeeding, (val) => this.setState({ breastfeeding: val }))}
                      {isFemale && this.renderYesNo("انتظام الدورة الشهرية", this.state.menstrualCycle, (val) => this.setState({ menstrualCycle: val }))}
                    </div>
                  </div>
                </SectionCard>

                {/* الحساسية */}
                <SectionCard>
                  <SectionHeader>
                    <div className="icon">⚠️</div>
                    <h3>الحساسية</h3>
                  </SectionHeader>
                  <div className="form-grid">
                    <div>
                      <label>أنواع الحساسية</label>
                      <FormInput
                        type="text"
                        placeholder="اذكر أنواع الحساسية..."
                        value={this.state.allergiesText}
                        onChange={(e) => this.setState({ allergiesText: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>حساسيات شائعة</label>
                      {this.renderCheckbox("حساسية الخبز", this.state.allergyBread, (val) => this.setState({ allergyBread: val }))}
                      {this.renderCheckbox("حساسية الحليب", this.state.allergyMilk, (val) => this.setState({ allergyMilk: val }))}
                    </div>
                  </div>
                </SectionCard>

                {/* المكملات الغذائية والأدوية */}
                <SectionCard>
                  <SectionHeader>
                    <div className="icon">💊</div>
                    <h3>المكملات الغذائية والأدوية</h3>
                  </SectionHeader>
                  <div className="form-grid">
                    <div>
                      {this.renderYesNo("مكملات غذائية", this.state.supplements, (val) => this.setState({ supplements: val }))}
                      {this.state.supplements && (
                        <div style={{ marginTop: "0.2rem" }}>
                          <label>نوع المكملات</label>
                          <FormInput
                            type="text"
                            placeholder="نوع المكملات..."
                            value={this.state.supplementsType}
                            onChange={(e) => this.setState({ supplementsType: e.target.value })}
                          />
                        </div>
                      )}
                      {this.renderYesNo("أدوية يومية", this.state.dailyMedications.medications, (val) => 
                        this.setState({ dailyMedications: { ...this.state.dailyMedications, medications: val } })
                      )}
                      {this.state.dailyMedications.medications && (
                        <div style={{ marginTop: "0.2rem" }}>
                          <label>نوع الأدوية</label>
                          <FormInput
                            type="text"
                            placeholder="نوع الأدوية..."
                            value={this.state.dailyMedications.type}
                            onChange={(e) => this.setState({ dailyMedications: { ...this.state.dailyMedications, type: e.target.value } })}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      {this.renderYesNo("مشروبات الطاقة", this.state.energyDrinks, (val) => this.setState({ energyDrinks: val }))}
                      {this.renderYesNo("تدخين", this.state.smoking, (val) => this.setState({ smoking: val }))}
                    </div>
                  </div>
                </SectionCard>

                {/* الأمراض الجلدية */}
                <SectionCard>
                  <SectionHeader>
                    <div className="icon">🔬</div>
                    <h3>الأمراض الجلدية</h3>
                  </SectionHeader>
                  <div className="form-grid">
                    <div>
                      {this.renderYesNo("هل تعاني من أمراض جلدية؟", this.state.skinDiseases, (val) => this.setState({ skinDiseases: val }))}
                    </div>
                    {this.state.skinDiseases && (
                      <div>
                        <label>تفاصيل الأمراض الجلدية</label>
                        <FormInput
                          type="text"
                          placeholder="وصف الأمراض الجلدية..."
                          value={this.state.skinDetails}
                          onChange={(e) => this.setState({ skinDetails: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                </SectionCard>

                {/* الأمراض المزمنة */}
                <SectionCard>
                  <SectionHeader>
                    <div className="icon">❤️</div>
                    <h3>الأمراض المزمنة والحالات الطبية</h3>
                  </SectionHeader>
                  <div className="chronic-grid">
                    {Object.keys(this.state.chronicConditions).map((key) => (
                      <div key={key} className="chronic-item">
                        {this.renderYesNo(this.chronicConditionsMap[key], this.state.chronicConditions[key], (val) =>
                          this.setState({
                            chronicConditions: { ...this.state.chronicConditions, [key]: val }
                          }),
                          true
                        )}
                      </div>
                    ))}
                  </div>
                </SectionCard>

                {/* مستحضرات التجميل */}
                <SectionCard>
                  <SectionHeader>
                    <div className="icon">💄</div>
                    <h3>مستحضرات التجميل والعناية</h3>
                  </SectionHeader>
                  <div className="cosmetics-grid">
                    {Object.keys(this.state.cosmetics).map((key) => key === "otherMedications" ? (
                      <div key={key} className="full-width">
                        <label>أدوية أخرى</label>
                        <FormInput
                          type="text"
                          placeholder="أدوية أخرى..."
                          value={this.state.cosmetics["otherMedications"]}
                          onChange={(e) => this.setState({ cosmetics: { ...this.state.cosmetics, "otherMedications": e.target.value } })}
                        />
                      </div>
                    ) : (
                      <div key={key} className="cosmetic-item">
                        {this.renderYesNo(this.cosmeticsMap[key], this.state.cosmetics[key], (val) =>
                          this.setState({ cosmetics: { ...this.state.cosmetics, [key]: val } }),
                          true
                        )}
                      </div>
                    ))}
                  </div>
                </SectionCard>

                {/* أدوية يومية إضافية */}
                <SectionCard>
                  <SectionHeader>
                    <div className="icon">🩺</div>
                    <h3>أدوية يومية إضافية</h3>
                  </SectionHeader>
                  <div className="medications-grid">
                    {Object.keys(this.state.dailyMedicationsExtra).map((key) => key === "other" ? (
                      <div key={key} className="full-width">
                        <label>أخرى</label>
                        <FormInput
                          type="text"
                          placeholder="أدوية أخرى..."
                          value={this.state.dailyMedicationsExtra["other"]}
                          onChange={(e) => this.setState({ dailyMedicationsExtra: { ...this.state.dailyMedicationsExtra, "other": e.target.value } })}
                        />
                      </div>
                    ) : (
                      <div key={key} className="medication-item">
                        {this.renderYesNo(this.dailyMedicationsExtraMap[key], this.state.dailyMedicationsExtra[key], (val) =>
                          this.setState({ dailyMedicationsExtra: { ...this.state.dailyMedicationsExtra, [key]: val } }),
                          true
                        )}
                      </div>
                    ))}
                  </div>
                </SectionCard>

                {/* العلاجات السابقة */}
                <SectionCard>
                  <SectionHeader>
                    <div className="icon">🏥</div>
                    <h3>العلاجات والعمليات السابقة</h3>
                  </SectionHeader>
                  <div>
                    <label>وصف العمليات أو العلاجات السابقة</label>
                    <FormTextarea
                      placeholder="وصف العمليات أو العلاجات السابقة..."
                      value={this.state.previousTreatments}
                      onChange={(e) => this.setState({ previousTreatments: e.target.value })}
                      rows="3"
                    />
                  </div>
                </SectionCard>
              </div>
            )}
          </form>
        </div>
      </PatientFormContainer>
    );
  }
}

export default PatientForm;

