import React from 'react';
import { Mail, Phone, MapPin, Calendar, Car, Camera, Heart } from 'lucide-react';
import { CVData, ThemeConfig } from '../../types/cv';
import { InlineEditable } from '../InlineEditable';

interface ClassicTemplateProps {
  data: CVData;
  isEditing: boolean;
  theme: ThemeConfig;
  onUpdate: (updater: (prev: CVData) => CVData) => void;
  onOpenPhotoModal: () => void;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({
  data,
  isEditing,
  theme,
  onUpdate,
  onOpenPhotoModal,
}) => {
  return (
    <div
      className="cv-document w-full bg-white text-slate-800 shadow-xl rounded-none md:rounded-xl p-8 sm:p-12 overflow-hidden print:shadow-none print:rounded-none print:p-0 flex flex-col justify-between"
      style={{ minHeight: '297mm' }}
    >
      <div>
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b-2" style={{ borderColor: theme.primary }}>
          <div className="text-center sm:text-left flex-1 space-y-1">
            <div className="flex items-center justify-center sm:justify-start">
              <span
                className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase pb-1 border-b-2 font-serif inline-block"
                style={{ color: theme.primaryDark, borderColor: theme.primary }}
              >
                C U R R I C U L U M &nbsp; V I T A E
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif pt-1">
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
            <div
              className="text-base sm:text-lg font-medium mt-1 uppercase tracking-wider"
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

            {/* Quick Contact line */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                {data.personalInfo.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                {data.personalInfo.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                {data.personalInfo.location}
              </span>
              {data.personalInfo.showBirthDate && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                    {data.personalInfo.birthDate}
                  </span>
                </>
              )}
              {data.personalInfo.drivingLicense && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Car className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                    Prawo jazdy {data.personalInfo.drivingLicense}
                  </span>
                </>
              )}
              {data.personalInfo.showMaritalStatus && data.personalInfo.maritalStatus && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                    {data.personalInfo.maritalStatus}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Photo */}
          {data.personalInfo.showPhoto && (
            <div
              onClick={onOpenPhotoModal}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 shadow-sm cursor-pointer group shrink-0"
              style={{ borderColor: theme.border }}
              title="Kliknij, aby zmienić zdjęcie"
            >
              {data.personalInfo.photoUrl ? (
                <img
                  src={data.personalInfo.photoUrl}
                  alt={data.personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Camera className="w-6 h-6" />
                </div>
              )}
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium no-print">
                Zmień
              </div>
            </div>
          )}
        </div>

        {/* Profile Summary */}
        {data.summary && (
          <div className="mt-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
              style={{ color: theme.primary, borderColor: theme.border }}
            >
              Podsumowanie Zawodowe
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
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
        <div className="mt-6">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-4 border-b"
            style={{ color: theme.primary, borderColor: theme.border }}
          >
            Doświadczenie Zawodowe
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="page-break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="font-bold text-sm text-slate-900">
                    <InlineEditable
                      value={exp.position}
                      isEditing={isEditing}
                      onChange={(val) => {
                        const copy = [...data.experience];
                        copy[idx].position = val;
                        onUpdate((prev) => ({ ...prev, experience: copy }));
                      }}
                    />
                    <span className="font-normal text-slate-600 ml-1.5">
                      — {exp.company} ({exp.location})
                    </span>
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-slate-500 shrink-0">
                    {exp.startDate} – {exp.current ? 'obecnie' : exp.endDate}
                  </span>
                </div>

                <ul className="mt-2 space-y-1 text-xs text-slate-700 pl-4 list-disc marker:text-slate-400">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="leading-relaxed">
                      <InlineEditable
                        value={resp}
                        isEditing={isEditing}
                        multiline
                        onChange={(val) => {
                          const copy = [...data.experience];
                          copy[idx].responsibilities[rIdx] = val;
                          onUpdate((prev) => ({ ...prev, experience: copy }));
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-6">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b"
            style={{ color: theme.primary, borderColor: theme.border }}
          >
            Wykształcenie
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, idx) => (
              <div key={edu.id || idx} className="page-break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    {edu.school}
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-slate-500 shrink-0">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div className="text-xs text-slate-700 mt-0.5">
                  <span className="font-medium">{edu.degree}</span> · Kierunek: {edu.fieldOfStudy}
                  {edu.specialization && <span> | Specjalizacja: {edu.specialization}</span>}
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

        {/* Skills & Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
              style={{ color: theme.primary, borderColor: theme.border }}
            >
              Kompetencje & Umiejętności
            </h2>
            <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc marker:text-slate-400">
              {data.skills.management.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
              {data.skills.technical.map((tool, idx) => (
                <li key={`tool-${idx}`}>{tool}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
              style={{ color: theme.primary, borderColor: theme.border }}
            >
              Kompetencje miękkie & Języki
            </h2>
            <div className="space-y-2 text-xs text-slate-700">
              <div>
                <strong>Języki obce: </strong>
                {data.languages.map((l) => `${l.language} (${l.level})`).join(', ')}
              </div>
              <ul className="space-y-1 pl-4 list-disc marker:text-slate-400">
                {data.softSkills.map((trait, idx) => (
                  <li key={idx}>{trait}</li>
                ))}
              </ul>
              <div className="pt-1">
                <strong>Zainteresowania: </strong>
                {data.interests.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RODO / GDPR Clause */}
      <div className="mt-8 pt-4 border-t border-slate-200 text-2xs text-slate-400 leading-normal text-justify page-break-inside-avoid">
        {data.gdprClause}
        {data.includeFutureRecruitment && (
          <span className="block mt-1">
            Wyrażam również zgodę na przetwarzanie moich danych osobowych na potrzeby przyszłych procesów rekrutacyjnych.
          </span>
        )}
      </div>
    </div>
  );
};
