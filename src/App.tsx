import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Camera,
  CheckCircle2,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { CVData, TemplateStyle, ColorTheme } from './types/cv';
import { INITIAL_CV_DATA } from './data/initialCV';
import { THEMES } from './utils/themeConfig';
import { exportToWord } from './utils/exportWord';
import { exportToJson, importFromJson } from './utils/exportJson';
import { HeaderNav } from './components/HeaderNav';
import { ExecutiveTemplate } from './components/templates/ExecutiveTemplate';
import { ClassicTemplate } from './components/templates/ClassicTemplate';
import { ModernMinimalTemplate } from './components/templates/ModernMinimalTemplate';
import { PhotoUploaderModal } from './components/PhotoUploaderModal';
import { StyleComparisonModal } from './components/StyleComparisonModal';
import { EditorDrawer } from './components/EditorDrawer';
import { PrintGuideModal } from './components/PrintGuideModal';

export default function App() {
  const [cvData, setCvData] = useState<CVData>(() => {
    // Try restoring from localStorage if available
    const saved = localStorage.getItem('cv_template_clean_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CV_DATA;
      }
    }
    return INITIAL_CV_DATA;
  });

  const [currentTemplate, setCurrentTemplate] = useState<TemplateStyle>('executive');
  const [currentColor, setCurrentColor] = useState<ColorTheme>('navy');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);
  const [isStyleModalOpen, setIsStyleModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isPrintGuideOpen, setIsPrintGuideOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [showWelcomeTip, setShowWelcomeTip] = useState<boolean>(true);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('cv_template_clean_v1', JSON.stringify(cvData));
  }, [cvData]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3800);
  };

  const executePrint = () => {
    // Before printing, turn off inline edit highlights
    setIsEditing(false);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handlePrintClick = () => {
    setIsPrintGuideOpen(true);
  };

  const handleExportWord = () => {
    const filename = `CV_${cvData.personalInfo.fullName.replace(/\s+/g, '_')}.doc`;
    exportToWord(cvData, filename);
    showToast('Dokument Microsoft Word (.doc) został wygenerowany i pobrany!');
  };

  const handleExportJson = () => {
    const filename = `cv_${cvData.personalInfo.fullName.toLowerCase().replace(/\s+/g, '_')}.json`;
    exportToJson(cvData, filename);
    showToast('Plik konfiguracyjny JSON został pobrany!');
  };

  const handleImportJson = async (file: File) => {
    try {
      const imported = await importFromJson(file);
      setCvData(imported);
      showToast('Pomyślnie zaimportowano i wczytano dane CV z pliku JSON!');
    } catch (err) {
      alert(`Błąd podczas wczytywania pliku JSON: ${err instanceof Error ? err.message : 'Nieznany błąd'}`);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Czy na pewno chcesz przywrócić pierwotne dane z przesłanego dokumentu (ze wszystkimi poprawkami językowymi)?')) {
      setCvData(INITIAL_CV_DATA);
      showToast('Przywrócono zweryfikowane dane początkowe!');
    }
  };

  const activeThemeConfig = THEMES[currentColor] || THEMES.navy;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-blue-100">
      {/* Top Navigation */}
      <HeaderNav
        currentTemplate={currentTemplate}
        onSelectTemplate={setCurrentTemplate}
        currentColor={currentColor}
        onSelectColor={setCurrentColor}
        isEditing={isEditing}
        onToggleEditing={() => setIsEditing(!isEditing)}
        onPrintPdf={handlePrintClick}
        onExportWord={handleExportWord}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
        onOpenStyleModal={() => setIsStyleModalOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onReset={handleResetToDefault}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-2 sm:px-4 md:px-6 py-6 flex flex-col items-center">
        {/* Top welcome & feature callout */}
        {showWelcomeTip && (
          <div className="no-print w-full max-w-4xl mb-6 bg-white border border-slate-200 rounded-xl p-4 shadow-xs animate-in fade-in duration-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Interaktywny szablon CV z możliwością edycji i eksportu
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Szablon zawiera przykładowe dane demonstracyjne. Kliknij <strong>„Edytuj na żywo”</strong> lub otwórz <strong>„Formularz edycji”</strong>, aby wprowadzić własne dane, załadować zdjęcie oraz pobrać gotowy dokument jako PDF lub Word.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2.5">
                    <button
                      onClick={() => setIsStyleModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Zestawienie poprawek stylistycznych</span>
                    </button>
                    <button
                      onClick={() => setIsPhotoModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5 text-slate-500" />
                      <span>Zmień zdjęcie po prawej</span>
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowWelcomeTip(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
                title="Ukryj tę wskazówkę"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Live editing banner notification when editing is enabled */}
        {isEditing && (
          <div className="no-print w-full max-w-4xl mb-4 py-2 px-4 bg-amber-50 border border-amber-200 rounded-lg text-xs font-medium text-amber-800 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>
                <strong>Tryb edycji na żywo aktywny:</strong> Kliknij dowolny tekst na kartce poniżej, aby go bezpośrednio zmienić.
              </span>
            </div>
            <button
              onClick={() => setIsEditing(false)}
              className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 rounded font-semibold text-amber-900 transition-colors"
            >
              Zakończ edycję
            </button>
          </div>
        )}

        {/* The CV Document container */}
        <div className="cv-sheet-container w-full max-w-[210mm] transition-all">
          {currentTemplate === 'executive' && (
            <ExecutiveTemplate
              data={cvData}
              isEditing={isEditing}
              theme={activeThemeConfig}
              onUpdate={setCvData}
              onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
            />
          )}

          {currentTemplate === 'classic' && (
            <ClassicTemplate
              data={cvData}
              isEditing={isEditing}
              theme={activeThemeConfig}
              onUpdate={setCvData}
              onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
            />
          )}

          {currentTemplate === 'modern' && (
            <ModernMinimalTemplate
              data={cvData}
              isEditing={isEditing}
              theme={activeThemeConfig}
              onUpdate={setCvData}
              onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
            />
          )}
        </div>

        {/* Floating Quick Drawer trigger for ease of access */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="no-print fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all text-xs font-semibold group"
          title="Otwórz pełny formularz edycji pól CV"
        >
          <SlidersHorizontal className="w-4 h-4 text-blue-400 group-hover:rotate-45 transition-transform" />
          <span>Edytuj formularz</span>
        </button>
      </main>

      {/* Toast Notification */}
      {notification && (
        <div className="no-print fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Modals & Drawer */}
      <PrintGuideModal
        isOpen={isPrintGuideOpen}
        onClose={() => setIsPrintGuideOpen(false)}
        onConfirmPrint={executePrint}
      />

      <PhotoUploaderModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        photoUrl={cvData.personalInfo.photoUrl}
        showPhoto={cvData.personalInfo.showPhoto}
        onUpdatePhoto={(url) => {
          setCvData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              photoUrl: url,
              showPhoto: true,
            },
          }));
        }}
        onToggleShowPhoto={(show) => {
          setCvData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              showPhoto: show,
            },
          }));
        }}
      />

      <StyleComparisonModal
        isOpen={isStyleModalOpen}
        onClose={() => setIsStyleModalOpen(false)}
      />

      <EditorDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        cvData={cvData}
        onUpdate={setCvData}
        onResetToDefault={handleResetToDefault}
      />
    </div>
  );
}
