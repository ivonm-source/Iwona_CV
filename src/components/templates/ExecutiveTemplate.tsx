import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Car,
  Camera,
  Briefcase,
  GraduationCap,
  Sparkles,
  Heart,
} from 'lucide-react';
import { CVData, ThemeConfig } from '../../types/cv';
import { InlineEditable } from '../InlineEditable';

interface ExecutiveTemplateProps {
  data: CVData;
  isEditing: boolean;
  theme: ThemeConfig;
  onUpdate: (updater: (prev: CVData) => CVData) => void;
  onOpenPhotoModal: () => void;
}

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({
  data,
  isEditing,
  theme,
  onUpdate,
  onOpenPhotoModal,
}) => {
  return (
    <div
      className="cv-document w-full bg-white text-slate-800 shadow-xl rounded-none md:rounded-xl p-6 sm:p-10 overflow-hidden print:shadow-none print:rounded-none print:p-0 flex flex-col justify-between"
      style={{ minHeight: '297mm' }}
    >
      <div>
        {/* TOP HEADER: Prominent C U R R I C U L U M   V I T A E + Candidate Info on Left, Photo on Right */}
        <div className="flex items-start justify-between gap-6 pb-6 border-b-2" style={{ borderColor: theme.primary }}>
          {/* Left / Center-Left Information */}
          <div className="flex-1 space-y-2">
            {/* Elegant Header requested by user: C U R R I C U L U M   V I T A E */}
            <div className="flex items-center gap-3">
              <span
                className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase pb-1 border-b-2 font-serif inline-block"
                style={{ color: theme.primaryDark, borderColor: theme.primary }}
              >
                C U R R I C U L U M &nbsp; V I T A E
              </span>
            </div>

            {/* Candidate Name */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              <InlineEditable
                value={data.personalInfo.fullName}
                isEditing={isEditing}
                onChange={(val) =>
                  onUpdate((prev) => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, fullName: val },
                  }))
                }
              />
            </h1>

            {/* Target Role / Subtitle */}
            <div
              className="text-sm sm:text-base font-semibold tracking-wide"
              style={{ color: theme.primary }}
            >
              <InlineEditable
                value={data.personalInfo.title}
                isEditing={isEditing}
                onChange={(val) =>
                  onUpdate((prev) => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, title: val },
                  }))
                }
              />
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
                <span className="font-medium text-slate-400 text-2xs uppercase">Tel:</span>
                <InlineEditable
                  value={data.personalInfo.phone}
                  isEditing={isEditing}
                  onChange={(val) =>
                    onUpdate((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, phone: val },
                    }))
                  }
                  className="font-medium text-slate-800"
                />
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
                <span className="font-medium text-slate-400 text-2xs uppercase">Email:</span>
                <InlineEditable
                  value={data.personalInfo.email}
                  isEditing={isEditing}
                  onChange={(val) =>
                    onUpdate((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, email: val },
                    }))
                  }
                  className="font-medium text-slate-800 break-all"
                />
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
                <span className="font-medium text-slate-400 text-2xs uppercase">Adres:</span>
                <InlineEditable
                  value={data.personalInfo.location}
                  isEditing={isEditing}
                  onChange={(val) =>
                    onUpdate((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, location: val },
                    }))
                  }
                  className="font-medium text-slate-800"
                />
              </div>

              {data.personalInfo.showBirthDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
                  <span className="font-medium text-slate-400 text-2xs uppercase">Urodzenie:</span>
                  <InlineEditable
                    value={data.personalInfo.birthDate}
                    isEditing={isEditing}
                    onChange={(val) =>
                      onUpdate((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, birthDate: val },
                      }))
                    }
                    className="font-medium text-slate-800"
                  />
                </div>
              )}

              {data.personalInfo.drivingLicense && (
                <div className="flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
                  <span className="font-medium text-slate-400 text-2xs uppercase">Prawo jazdy:</span>
                  <InlineEditable
                    value={data.personalInfo.drivingLicense}
                    isEditing={isEditing}
                    onChange={(val) =>
                      onUpdate((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, drivingLicense: val },
                      }))
                    }
                    className="font-medium text-slate-800"
                  />
                </div>
              )}

              {data.personalInfo.showMaritalStatus && data.personalInfo.maritalStatus && (
                <div className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
                  <span className="font-medium text-slate-400 text-2xs uppercase">Stan cywilny:</span>
                  <InlineEditable
                    value={data.personalInfo.maritalStatus}
                    isEditing={isEditing}
                    onChange={(val) =>
                      onUpdate((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, maritalStatus: val },
                      }))
                    }
                    className="font-medium text-slate-800"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Photo Slot — Positioned strictly on the RIGHT side */}
          {data.personalInfo.showPhoto && (
            <div className="shrink-0 flex flex-col items-center">
              <div
                onClick={onOpenPhotoModal}
                className="relative w-32 h-40 sm:w-36 sm:h-44 rounded-xl overflow-hidden border-2 shadow-md cursor-pointer group transition-transform hover:scale-102"
                style={{ borderColor: theme.primary }}
                title="Kliknij, aby zmienić lub dostosować zdjęcie"
              >
                {data.personalInfo.photoUrl ? (
                  <img
                    src={data.personalInfo.photoUrl}
                    alt={data.personalInfo.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                    <Camera className="w-8 h-8 opacity-60" />
                    <span className="text-2xs mt-1">Dodaj zdjęcie</span>
                  </div>
                )}
                {/* Overlay hover */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-medium no-print">
                  <Camera className="w-5 h-5 mb-1" />
                  <span>Zmień zdjęcie</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <div className="mt-5 space-y-1.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: theme.primary }} />
              <h2
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: theme.primaryDark }}
              >
                Profil Zawodowy
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              <InlineEditable
                value={data.summary}
                isEditing={isEditing}
                multiline
                onChange={(val) =>
                  onUpdate((prev) => ({ ...prev, summary: val }))
                }
              />
            </p>
          </div>
        )}

        {/* Work Experience */}
        <div className="mt-6 space-y-3.5">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
            <Briefcase className="w-4 h-4" style={{ color: theme.primary }} />
            <h2
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: theme.primaryDark }}
            >
              Doświadczenie Zawodowe
            </h2>
          </div>

          <div className="space-y-4">
            {data.experience.map((exp, eIdx) => (
              <div key={exp.id || eIdx} className="page-break-inside-avoid space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    <InlineEditable
                      value={exp.position}
                      isEditing={isEditing}
                      onChange={(val) => {
                        const copy = [...data.experience];
                        copy[eIdx].position = val;
                        onUpdate((prev) => ({ ...prev, experience: copy }));
                      }}
                    />
                  </h3>
                  <span className="text-xs font-semibold tabular-nums text-slate-500 shrink-0">
                    <InlineEditable
                      value={exp.startDate}
                      isEditing={isEditing}
                      onChange={(val) => {
                        const copy = [...data.experience];
                        copy[eIdx].startDate = val;
                        onUpdate((prev) => ({ ...prev, experience: copy }));
                      }}
                    />
                    {' – '}
                    <InlineEditable
                      value={exp.endDate}
                      isEditing={isEditing}
                      onChange={(val) => {
                        const copy = [...data.experience];
                        copy[eIdx].endDate = val;
                        onUpdate((prev) => ({ ...prev, experience: copy }));
                      }}
                    />
                  </span>
                </div>

                <div className="text-xs font-medium text-slate-600 italic">
                  <InlineEditable
                    value={exp.company}
                    isEditing={isEditing}
                    onChange={(val) => {
                      const copy = [...data.experience];
                      copy[eIdx].company = val;
                      onUpdate((prev) => ({ ...prev, experience: copy }));
                    }}
                  />
                  {exp.location && ' · '}
                  <InlineEditable
                    value={exp.location}
                    isEditing={isEditing}
                    onChange={(val) => {
                      const copy = [...data.experience];
                      copy[eIdx].location = val;
                      onUpdate((prev) => ({ ...prev, experience: copy }));
                    }}
                  />
                </div>

                <ul className="mt-1 space-y-1 text-xs text-slate-700">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2 leading-relaxed">
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <InlineEditable
                        value={resp}
                        isEditing={isEditing}
                        multiline
                        onChange={(val) => {
                          const copy = [...data.experience];
                          copy[eIdx].responsibilities[rIdx] = val;
                          onUpdate((prev) => ({ ...prev, experience: copy }));
                        }}
                        className="flex-1"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
            <GraduationCap className="w-4 h-4" style={{ color: theme.primary }} />
            <h2
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: theme.primaryDark }}
            >
              Wykształcenie
            </h2>
          </div>

          <div className="space-y-3">
            {data.education.map((edu, edIdx) => (
              <div key={edu.id || edIdx} className="page-break-inside-avoid space-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    <InlineEditable
                      value={edu.school}
                      isEditing={isEditing}
                      onChange={(val) => {
                        const copy = [...data.education];
                        copy[edIdx].school = val;
                        onUpdate((prev) => ({ ...prev, education: copy }));
                      }}
                    />
                  </h3>
                  <span className="text-xs font-semibold tabular-nums text-slate-500 shrink-0">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>

                <div className="text-xs text-slate-700">
                  <span className="font-medium text-slate-900">
                    {edu.degree} · Kierunek: {edu.fieldOfStudy}
                  </span>
                  {edu.specialization && (
                    <span className="block text-slate-600 mt-0.5">
                      Specjalizacja: {edu.specialization}
                    </span>
                  )}
                  {edu.thesisTitle && (
                    <span className="block text-slate-500 italic mt-0.5">
                      Temat pracy: „{edu.thesisTitle}”
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Other sections (2-column grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 page-break-inside-avoid">
          {/* Left subcolumn: Skills */}
          <div className="space-y-3">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
              style={{ color: theme.primaryDark, borderColor: theme.border }}
            >
              Kompetencje & Umiejętności
            </h2>
            <ul className="space-y-1 text-xs text-slate-700">
              {data.skills.management.map((skill, sIdx) => (
                <li key={sIdx} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-slate-400 select-none">•</span>
                  <span>{skill}</span>
                </li>
              ))}
              {data.skills.technical.map((tool, tIdx) => (
                <li key={`tool-${tIdx}`} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-slate-400 select-none">•</span>
                  <span>{tool}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right subcolumn: Languages, Soft Skills, Interests */}
          <div className="space-y-3">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
              style={{ color: theme.primaryDark, borderColor: theme.border }}
            >
              Języki, Cechy & Zainteresowania
            </h2>

            <div className="space-y-2 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900">Języki obce: </strong>
                {data.languages.map((l) => `${l.language} – ${l.level}`).join(', ')}
              </div>

              <div>
                <strong className="text-slate-900 block mb-1">Kompetencje miękkie:</strong>
                <ul className="space-y-1 pl-3">
                  {data.softSkills.map((trait, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-slate-400 select-none">•</span>
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-1">
                <strong className="text-slate-900">Zainteresowania: </strong>
                <span>{data.interests.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RODO / GDPR Clause at bottom */}
      <div className="mt-8 pt-3 border-t border-slate-200 text-2xs text-slate-400 leading-normal text-justify page-break-inside-avoid">
        <InlineEditable
          value={data.gdprClause}
          isEditing={isEditing}
          multiline
          onChange={(val) =>
            onUpdate((prev) => ({ ...prev, gdprClause: val }))
          }
        />
        {data.includeFutureRecruitment && (
          <span className="block mt-1">
            Wyrażam również zgodę na przetwarzanie moich danych osobowych na potrzeby przyszłych procesów rekrutacyjnych prowadzonych przez Państwa firmę.
          </span>
        )}
      </div>
    </div>
  );
};
