import React, { useRef } from 'react';
import {
  Printer,
  FileText,
  Download,
  Upload,
  Edit3,
  Eye,
  Camera,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';
import { ColorTheme, TemplateStyle } from '../types/cv';
import { THEMES } from '../utils/themeConfig';

interface HeaderNavProps {
  currentTemplate: TemplateStyle;
  onSelectTemplate: (t: TemplateStyle) => void;
  currentColor: ColorTheme;
  onSelectColor: (c: ColorTheme) => void;
  isEditing: boolean;
  onToggleEditing: () => void;
  onPrintPdf: () => void;
  onExportWord: () => void;
  onExportJson: () => void;
  onImportJson: (file: File) => void;
  onOpenPhotoModal: () => void;
  onOpenStyleModal: () => void;
  onOpenDrawer: () => void;
  onReset: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentTemplate,
  onSelectTemplate,
  currentColor,
  onSelectColor,
  isEditing,
  onToggleEditing,
  onPrintPdf,
  onExportWord,
  onExportJson,
  onImportJson,
  onOpenPhotoModal,
  onOpenStyleModal,
  onOpenDrawer,
  onReset,
}) => {
  const jsonFileInputRef = useRef<HTMLInputElement>(null);

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImportJson(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* Hidden file input for JSON import */}
      <input
        ref={jsonFileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleJsonUpload}
        className="hidden"
      />

      {/* Row 1: Top Bar Contract (Brand — Nav links — Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Single Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
            CV
          </div>
          <div className="leading-tight">
            <span className="font-bold text-slate-900 text-base tracking-tight block">
              Kreator CV
            </span>
            <span className="text-2xs font-medium text-slate-500 uppercase tracking-wider block">
              Curriculum Vitae
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links & Fast Modals */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-600">
          <button
            onClick={onOpenStyleModal}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Poprawki stylistyczne</span>
          </button>
          <button
            onClick={onOpenPhotoModal}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            <Camera className="w-3.5 h-3.5 text-blue-500" />
            <span>Zmień zdjęcie</span>
          </button>
          <button
            onClick={onOpenDrawer}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
            <span>Formularz edycji</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action (Drukuj / PDF) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onToggleEditing}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
              isEditing
                ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-2xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Kliknij, aby przełączyć tryb edycji bezpośrednio na kartce CV"
          >
            {isEditing ? (
              <>
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Podgląd wydruku</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Edytuj na żywo</span>
              </>
            )}
          </button>

          <button
            onClick={onPrintPdf}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
            title="Wydrukuj lub zapisz jako plik PDF (format A4)"
          >
            <Printer className="w-4 h-4" />
            <span>Drukuj / PDF</span>
          </button>
        </div>
      </div>

      {/* Row 2: Secondary Toolstrip (Export, JSON, Templates, Palette) */}
      <div className="border-t border-slate-100 bg-slate-50/75 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Group 1: Templates & Theme Palette */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            {/* Template selector */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
              <button
                onClick={() => onSelectTemplate('executive')}
                className={`px-2.5 py-1 rounded-md font-medium text-xs transition-colors ${
                  currentTemplate === 'executive'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Executive
              </button>
              <button
                onClick={() => onSelectTemplate('classic')}
                className={`px-2.5 py-1 rounded-md font-medium text-xs transition-colors ${
                  currentTemplate === 'classic'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Klasyczny
              </button>
              <button
                onClick={() => onSelectTemplate('modern')}
                className={`px-2.5 py-1 rounded-md font-medium text-xs transition-colors ${
                  currentTemplate === 'modern'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Minimalny
              </button>
            </div>

            {/* Theme colors */}
            <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-200">
              {(Object.keys(THEMES) as ColorTheme[]).map((themeKey) => {
                const cfg = THEMES[themeKey];
                const isSelected = currentColor === themeKey;
                return (
                  <button
                    key={themeKey}
                    onClick={() => onSelectColor(themeKey)}
                    title={cfg.name}
                    className={`w-5 h-5 rounded-full transition-transform ${
                      isSelected ? 'ring-2 ring-offset-2 ring-slate-800 scale-110' : 'hover:scale-105 opacity-80'
                    }`}
                    style={{ backgroundColor: cfg.primary }}
                  />
                );
              })}
            </div>
          </div>

          {/* Group 2: Export & File Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onExportWord}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg shadow-2xs transition-colors"
              title="Pobierz dokument w formacie programu Word (.doc / .docx)"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Word (.doc)</span>
            </button>

            <button
              onClick={onExportJson}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg shadow-2xs transition-colors"
              title="Zapisz bieżący stan formularza i CV jako plik JSON"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zapisz JSON</span>
            </button>

            <button
              onClick={() => jsonFileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg shadow-2xs transition-colors"
              title="Wczytaj wcześniej zapisany plik JSON"
            >
              <Upload className="w-3.5 h-3.5 text-amber-600" />
              <span>Otwórz JSON</span>
            </button>

            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-2 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg shadow-2xs transition-colors"
              title="Przywróć pierwotne zweryfikowane dane ze skanu"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
