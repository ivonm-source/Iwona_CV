import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Briefcase,
  GraduationCap,
  User,
  Wrench,
  Globe,
  Heart,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { CVData, ExperienceItem, EducationItem } from '../types/cv';
import { INITIAL_CV_DATA } from '../data/initialCV';

interface EditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CVData;
  onUpdate: (updater: (prev: CVData) => CVData) => void;
  onResetToDefault: () => void;
}

type TabKey = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'languages' | 'other' | 'rodo';

export const EditorDrawer: React.FC<EditorDrawerProps> = ({
  isOpen,
  onClose,
  cvData,
  onUpdate,
  onResetToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('personal');

  if (!isOpen) return null;

  // Personal Info update handler
  const handlePersonalChange = (field: keyof CVData['personalInfo'], val: unknown) => {
    onUpdate((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: val,
      },
    }));
  };

  // Experience handlers
  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      position: 'Nowe stanowisko',
      company: 'Nazwa firmy',
      location: 'Miejscowość',
      startDate: '2020',
      endDate: 'obecnie',
      current: true,
      responsibilities: ['Zakres odpowiedzialności i kluczowe zadania'],
    };
    onUpdate((prev) => ({
      ...prev,
      experience: [newExp, ...prev.experience],
    }));
  };

  const handleUpdateExperience = (id: string, field: keyof ExperienceItem, val: unknown) => {
    onUpdate((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: val } : exp
      ),
    }));
  };

  const handleDeleteExperience = (id: string) => {
    onUpdate((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const handleAddResponsibility = (expId: string) => {
    onUpdate((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === expId
          ? { ...exp, responsibilities: [...exp.responsibilities, 'Nowy punkt odpowiedzialności'] }
          : exp
      ),
    }));
  };

  const handleUpdateResponsibility = (expId: string, index: number, text: string) => {
    onUpdate((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => {
        if (exp.id !== expId) return exp;
        const copy = [...exp.responsibilities];
        copy[index] = text;
        return { ...exp, responsibilities: copy };
      }),
    }));
  };

  const handleDeleteResponsibility = (expId: string, index: number) => {
    onUpdate((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => {
        if (exp.id !== expId) return exp;
        const copy = exp.responsibilities.filter((_, i) => i !== index);
        return { ...exp, responsibilities: copy };
      }),
    }));
  };

  // Education handlers
  const handleAddEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      school: 'Nazwa Uczelni / Szkoły',
      degree: 'Tytuł zawodowy',
      fieldOfStudy: 'Kierunek',
      startDate: '2000',
      endDate: '2005',
    };
    onUpdate((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const handleUpdateEducation = (id: string, field: keyof EducationItem, val: unknown) => {
    onUpdate((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: val } : edu
      ),
    }));
  };

  const handleDeleteEducation = (id: string) => {
    onUpdate((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Skills handlers
  const handleUpdateSkillsList = (
    type: 'management' | 'technical',
    index: number,
    val: string
  ) => {
    onUpdate((prev) => {
      const copy = [...prev.skills[type]];
      copy[index] = val;
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [type]: copy,
        },
      };
    });
  };

  const handleAddSkill = (type: 'management' | 'technical') => {
    onUpdate((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: [...prev.skills[type], 'Nowa umiejętność'],
      },
    }));
  };

  const handleDeleteSkill = (type: 'management' | 'technical', index: number) => {
    onUpdate((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: prev.skills[type].filter((_, i) => i !== index),
      },
    }));
  };

  // Soft skills handlers
  const handleAddSoftSkill = () => {
    onUpdate((prev) => ({
      ...prev,
      softSkills: [...prev.softSkills, 'Nowa cecha lub kompetencja'],
    }));
  };

  const handleUpdateSoftSkill = (index: number, val: string) => {
    onUpdate((prev) => {
      const copy = [...prev.softSkills];
      copy[index] = val;
      return { ...prev, softSkills: copy };
    });
  };

  const handleDeleteSoftSkill = (index: number) => {
    onUpdate((prev) => ({
      ...prev,
      softSkills: prev.softSkills.filter((_, i) => i !== index),
    }));
  };

  // Interests handlers
  const handleAddInterest = () => {
    onUpdate((prev) => ({
      ...prev,
      interests: [...prev.interests, 'Nowe zainteresowanie'],
    }));
  };

  const handleUpdateInterest = (index: number, val: string) => {
    onUpdate((prev) => {
      const copy = [...prev.interests];
      copy[index] = val;
      return { ...prev, interests: copy };
    });
  };

  const handleDeleteInterest = (index: number) => {
    onUpdate((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-250 no-print">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Panel Edycji CV
          </h2>
          <p className="text-xs text-slate-500">
            Wprowadzaj i modyfikuj dowolne pola dokumentu
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onResetToDefault}
            title="Przywróć pierwotne zweryfikowane dane"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex overflow-x-auto border-b border-slate-200 px-4 py-2 gap-1 bg-slate-100/60 scrollbar-none text-xs">
        <button
          onClick={() => setActiveTab('personal')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeTab === 'personal'
              ? 'bg-white text-blue-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Dane</span>
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeTab === 'summary'
              ? 'bg-white text-blue-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Profil</span>
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeTab === 'experience'
              ? 'bg-white text-blue-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Doświadczenie</span>
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeTab === 'education'
              ? 'bg-white text-blue-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Edukacja</span>
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeTab === 'skills'
              ? 'bg-white text-blue-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Umiejętności</span>
        </button>
        <button
          onClick={() => setActiveTab('languages')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeTab === 'languages'
              ? 'bg-white text-blue-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Języki</span>
        </button>
        <button
          onClick={() => setActiveTab('other')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeTab === 'other'
              ? 'bg-white text-blue-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Cechy & Pasje</span>
        </button>
        <button
          onClick={() => setActiveTab('rodo')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeTab === 'rodo'
              ? 'bg-white text-blue-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>RODO</span>
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-700">
        {/* TAB: Personal Info */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Imię i Nazwisko
              </label>
              <input
                type="text"
                value={cvData.personalInfo.fullName}
                onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Tytuł zawodowy / Stanowisko docelowe
              </label>
              <input
                type="text"
                value={cvData.personalInfo.title}
                onChange={(e) => handlePersonalChange('title', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Telefon
                </label>
                <input
                  type="text"
                  value={cvData.personalInfo.phone}
                  onChange={(e) => handlePersonalChange('phone', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Adres e-mail
                </label>
                <input
                  type="email"
                  value={cvData.personalInfo.email}
                  onChange={(e) => handlePersonalChange('email', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Adres zamieszkania
              </label>
              <input
                type="text"
                value={cvData.personalInfo.location}
                onChange={(e) => handlePersonalChange('location', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Data urodzenia
                </label>
                <input
                  type="text"
                  value={cvData.personalInfo.birthDate}
                  onChange={(e) => handlePersonalChange('birthDate', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <label className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cvData.personalInfo.showBirthDate}
                    onChange={(e) => handlePersonalChange('showBirthDate', e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Pokazuj datę urodzenia w CV</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Prawo jazdy
                </label>
                <input
                  type="text"
                  value={cvData.personalInfo.drivingLicense}
                  onChange={(e) => handlePersonalChange('drivingLicense', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Stan cywilny (opcjonalny)
              </label>
              <input
                type="text"
                value={cvData.personalInfo.maritalStatus}
                onChange={(e) => handlePersonalChange('maritalStatus', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <label className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cvData.personalInfo.showMaritalStatus}
                  onChange={(e) => handlePersonalChange('showMaritalStatus', e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Pokazuj stan cywilny w CV</span>
              </label>
            </div>
          </div>
        )}

        {/* TAB: Summary */}
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Podsumowanie Zawodowe (Profil)
              </label>
              <p className="text-xs text-slate-500 mb-2">
                Zwięzły, profesjonalny opis Twojego profilu menedżerskiego, kluczowych atutów i doświadczenia.
              </p>
              <textarea
                rows={6}
                value={cvData.summary}
                onChange={(e) => onUpdate((prev) => ({ ...prev, summary: e.target.value }))}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* TAB: Experience */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Doświadczenie zawodowe ({cvData.experience.length})
              </span>
              <button
                onClick={handleAddExperience}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Dodaj stanowisko</span>
              </button>
            </div>

            <div className="space-y-5">
              {cvData.experience.map((exp, idx) => (
                <div
                  key={exp.id}
                  className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-blue-600">
                      Stanowisko #{idx + 1}
                    </span>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="Usuń to stanowisko"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Stanowisko</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => handleUpdateExperience(exp.id, 'position', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Firma / Obiekt</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Miejscowość</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleUpdateExperience(exp.id, 'location', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Data początkowa</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Data końcowa</label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-slate-600">
                        Zakres obowiązków i osiągnięcia:
                      </label>
                      <button
                        onClick={() => handleAddResponsibility(exp.id)}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        + Dodaj punkt
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <div key={rIdx} className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={resp}
                            onChange={(e) =>
                              handleUpdateResponsibility(exp.id, rIdx, e.target.value)
                            }
                            className="flex-1 px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-md"
                          />
                          <button
                            onClick={() => handleDeleteResponsibility(exp.id, rIdx)}
                            className="text-slate-400 hover:text-rose-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Education */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Wykształcenie ({cvData.education.length})
              </span>
              <button
                onClick={handleAddEducation}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Dodaj szkołę</span>
              </button>
            </div>

            <div className="space-y-4">
              {cvData.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-blue-600">Wpis edukacyjny</span>
                    <button
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Szkoła / Uczelnia</label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => handleUpdateEducation(edu.id, 'school', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Uzyskany tytuł</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Kierunek</label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) =>
                          handleUpdateEducation(edu.id, 'fieldOfStudy', e.target.value)
                        }
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      Specjalizacja (opcjonalnie)
                    </label>
                    <input
                      type="text"
                      value={edu.specialization || ''}
                      onChange={(e) =>
                        handleUpdateEducation(edu.id, 'specialization', e.target.value)
                      }
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      Temat pracy (opcjonalnie)
                    </label>
                    <input
                      type="text"
                      value={edu.thesisTitle || ''}
                      onChange={(e) =>
                        handleUpdateEducation(edu.id, 'thesisTitle', e.target.value)
                      }
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Rok rozpoczęcia</label>
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => handleUpdateEducation(edu.id, 'startDate', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Rok ukończenia</label>
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) => handleUpdateEducation(edu.id, 'endDate', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            {/* Management skills */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Umiejętności zarządcze i operacyjne
                </span>
                <button
                  onClick={() => handleAddSkill('management')}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Dodaj umiejętność
                </button>
              </div>

              <div className="space-y-2">
                {cvData.skills.management.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleUpdateSkillsList('management', idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <button
                      onClick={() => handleDeleteSkill('management', idx)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical skills */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Narzędzia i systemy techniczne
                </span>
                <button
                  onClick={() => handleAddSkill('technical')}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Dodaj narzędzie
                </button>
              </div>

              <div className="space-y-2">
                {cvData.skills.technical.map((tool, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tool}
                      onChange={(e) => handleUpdateSkillsList('technical', idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <button
                      onClick={() => handleDeleteSkill('technical', idx)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: Languages */}
        {activeTab === 'languages' && (
          <div className="space-y-4">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Języki obce
            </span>

            {cvData.languages.map((lang, idx) => (
              <div key={lang.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Język</label>
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) => {
                      const copy = [...cvData.languages];
                      copy[idx].language = e.target.value;
                      onUpdate((prev) => ({ ...prev, languages: copy }));
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Poziom zaawansowania</label>
                  <input
                    type="text"
                    value={lang.level}
                    onChange={(e) => {
                      const copy = [...cvData.languages];
                      copy[idx].level = e.target.value;
                      onUpdate((prev) => ({ ...prev, languages: copy }));
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: Soft skills & Interests */}
        {activeTab === 'other' && (
          <div className="space-y-6">
            {/* Soft skills */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Kompetencje miękkie & Profil
                </span>
                <button
                  onClick={handleAddSoftSkill}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Dodaj cechę
                </button>
              </div>

              <div className="space-y-2">
                {cvData.softSkills.map((trait, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={trait}
                      onChange={(e) => handleUpdateSoftSkill(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <button
                      onClick={() => handleDeleteSoftSkill(idx)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Zainteresowania & Pasje
                </span>
                <button
                  onClick={handleAddInterest}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Dodaj pasję
                </button>
              </div>

              <div className="space-y-2">
                {cvData.interests.map((interest, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={interest}
                      onChange={(e) => handleUpdateInterest(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <button
                      onClick={() => handleDeleteInterest(idx)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: RODO */}
        {activeTab === 'rodo' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Treść klauzuli zgody RODO (2024–2026)
              </label>
              <textarea
                rows={5}
                value={cvData.gdprClause}
                onChange={(e) => onUpdate((prev) => ({ ...prev, gdprClause: e.target.value }))}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs leading-relaxed"
              />
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cvData.includeFutureRecruitment}
                  onChange={(e) =>
                    onUpdate((prev) => ({
                      ...prev,
                      includeFutureRecruitment: e.target.checked,
                    }))
                  }
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-xs font-medium text-slate-900 block">
                    Dołącz zgodę na przyszłe procesy rekrutacyjne
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    Dodaje formułę: „Wyrażam również zgodę na przetwarzanie moich danych osobowych na potrzeby przyszłych procesów rekrutacyjnych prowadzonych przez Państwa firmę.”
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Drawer Footer */}
      <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Wszystkie zmiany zapisywane są na żywo w przeglądarce.
        </span>
        <button
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
        >
          Gotowe
        </button>
      </div>
    </div>
  );
};
