import React from 'react';
import { Mail, Phone, MapPin, Calendar, Car, Camera, Heart } from 'lucide-react';
import { CVData, ThemeConfig } from '../../types/cv';
import { InlineEditable } from '../InlineEditable';

interface ModernMinimalTemplateProps {
  data: CVData;
  isEditing: boolean;
  theme: ThemeConfig;
  onUpdate: (updater: (prev: CVData) => CVData) => void;
  onOpenPhotoModal: () => void;
}

export const ModernMinimalTemplate: React.FC<ModernMinimalTemplateProps> = ({
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
        {/* Modern minimal header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-1.5 flex-1">
            <span
              className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase pb-1 border-b-2 font-serif inline-block"
              style={{ color: theme.primaryDark, borderColor: theme.primary }}
            >
              C U R R I C U L U M &nbsp; V I T A E
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
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
            <p className="text-sm sm:text-base font-medium text-slate-600">
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
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                {data.personalInfo.phone}
              </span>
              <span>/</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {data.personalInfo.email}
              </span>
              <span>/</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {data.personalInfo.location}
              </span>
              {data.personalInfo.showBirthDate && (
                <>
                  <span>/</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {data.personalInfo.birthDate}
                  </span>
                </>
              )}
              {data.personalInfo.drivingLicense && (
                <>
                  <span>/</span>
                  <span className="flex items-center gap-1">
                    <Car className="w-3.5 h-3.5" />
                    Prawo jazdy {data.personalInfo.drivingLicense}
                  </span>
                </>
              )}
              {data.personalInfo.showMaritalStatus && data.personalInfo.maritalStatus && (
                <>
                  <span>/</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    {data.personalInfo.maritalStatus}
                  </span>
                </>
              )}
            </div>
          </div>

          {data.personalInfo.showPhoto && (
            <div
              onClick={onOpenPhotoModal}
              className="relative w-28 h-28 rounded-2xl overflow-hidden border border-slate-200 shadow-xs cursor-pointer group shrink-0"
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

        {/* Summary */}
        {data.summary && (
          <div className="mt-6">
            <h2 className="text-2xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              01. Podsumowanie zawodowe
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify pl-3 border-l-2 border-slate-200">
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

        {/* Experience */}
        <div className="mt-6">
          <h2 className="text-2xs font-bold uppercase tracking-widest text-slate-400 mb-3">
            02. Doświadczenie zawodowe
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="page-break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    <InlineEditable
                      value={exp.position}
                      isEditing={isEditing}
                      onChange={(val) => {
                        const copy = [...data.experience];
                        copy[idx].position = val;
                        onUpdate((prev) => ({ ...prev, experience: copy }));
                      }}
                    />
                  </h3>
                  <span className="text-xs font-medium text-slate-500 tabular-nums">
                    {exp.startDate} – {exp.current ? 'obecnie' : exp.endDate}
                  </span>
                </div>

                <div className="text-xs font-medium text-slate-500">
                  {exp.company} · {exp.location}
                </div>

                <ul className="mt-2 space-y-1 text-xs text-slate-700">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-slate-400 select-none">–</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-6">
          <h2 className="text-2xs font-bold uppercase tracking-widest text-slate-400 mb-3">
            03. Edukacja
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, idx) => (
              <div key={edu.id || idx} className="page-break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    {edu.school}
                  </div>
                  <span className="text-xs font-medium text-slate-500 tabular-nums">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  <strong className="text-slate-800">{edu.degree}</strong> · {edu.fieldOfStudy}
                  {edu.specialization && <span> · Specjalizacja: {edu.specialization}</span>}
                  {edu.thesisTitle && (
                    <span className="block text-slate-500 italic mt-0.5">
                      Praca magisterska: „{edu.thesisTitle}”
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Other */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h2 className="text-2xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              04. Umiejętności & Narzędzia
            </h2>
            <div className="space-y-1.5 text-xs text-slate-700">
              {data.skills.management.map((skill, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="text-slate-400 select-none">•</span>
                  <span>{skill}</span>
                </div>
              ))}
              {data.skills.technical.map((t, idx) => (
                <div key={`t-${idx}`} className="flex items-start gap-1.5">
                  <span className="text-slate-400 select-none">•</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              05. Cechy & Zainteresowania
            </h2>
            <div className="space-y-2 text-xs text-slate-700">
              <div>
                <span className="font-semibold text-slate-900">Język angielski: </span>
                {data.languages.map((l) => `${l.level} (${l.description})`).join(', ')}
              </div>
              <div className="space-y-1">
                {data.softSkills.map((trait, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-slate-400 select-none">•</span>
                    <span>{trait}</span>
                  </div>
                ))}
              </div>
              <div className="pt-1 text-slate-600">
                <span className="font-semibold text-slate-900">Pasje: </span>
                {data.interests.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RODO clause */}
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
