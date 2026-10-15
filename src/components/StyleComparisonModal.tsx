import React from 'react';
import { CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';
import { STYLE_CORRECTIONS_LOG } from '../data/initialCV';

interface StyleComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StyleComparisonModal: React.FC<StyleComparisonModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-linear-to-r from-blue-50/60 to-indigo-50/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Wprowadzone poprawki stylistyczne i językowe
              </h2>
              <p className="text-xs text-slate-500">
                Zestawienie zmian wprowadzonych w stosunku do pierwotnego pliku
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of changes */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm divide-y divide-slate-100">
          {STYLE_CORRECTIONS_LOG.map((item, idx) => (
            <div key={idx} className={idx > 0 ? 'pt-4' : ''}>
              <div className="font-semibold text-slate-800 text-xs uppercase tracking-wider mb-2 text-blue-700">
                {item.category}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                {/* Original */}
                <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-rose-700 mb-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>W przesłanym dokumencie:</span>
                  </div>
                  <div className="text-xs text-slate-700 line-through decoration-rose-400">
                    {item.original}
                  </div>
                </div>

                {/* Improved */}
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-800 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Poprawiono profesjonalnie:</span>
                  </div>
                  <div className="text-xs font-medium text-slate-900">
                    {item.improved}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 italic pl-1">
                Dlaczego: {item.explanation}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Wszystkie dane zachowują 100% autentyczności Twojego życiorysu.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};
