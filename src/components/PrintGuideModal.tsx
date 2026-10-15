import React from 'react';
import { Printer, CheckCircle2, AlertTriangle, X } from 'lucide-react';

interface PrintGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPrint: () => void;
}

export const PrintGuideModal: React.FC<PrintGuideModalProps> = ({
  isOpen,
  onClose,
  onConfirmPrint,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-blue-50/50">
          <div className="flex items-center gap-2.5 text-slate-900 font-semibold text-base">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
              <Printer className="w-4 h-4" />
            </div>
            <span>Drukuj / Zapisz jako PDF</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-xs text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Jak usunąć dopiski z adresem GitHuba i godziną:</span>
            </div>
            <p className="text-2xs text-amber-800/90 pl-5">
              W oknie drukowania przeglądarki (po kliknięciu „Drukuj teraz”):
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block text-xs">
                  1. Odznacz: „Nagłówki i stopki” (Headers and footers)
                </strong>
                <span className="text-slate-500 block text-2xs mt-0.5">
                  Dzięki temu z marginesów dokumentu zniknie adres strony www (GitHub) oraz data i godzina.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block text-xs">
                  2. Zaznacz: „Grafika w tle” (Background graphics)
                </strong>
                <span className="text-slate-500 block text-2xs mt-0.5">
                  Pozwoli to zachować kolory nagłówków, subtelne tła i linie ozdobne.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block text-xs">
                  3. Marginesy: Wybierz „Brak” lub „Domyślne”
                </strong>
                <span className="text-slate-500 block text-2xs mt-0.5">
                  Dokument ma już wbudowane perfekcyjne marginesy 12 mm na arkusz A4.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            Anuluj
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onConfirmPrint();
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Otwórz okno drukowania</span>
          </button>
        </div>
      </div>
    </div>
  );
};
