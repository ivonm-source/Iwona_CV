import React, { useRef, useState } from 'react';
import { Camera, Upload, Trash2, RotateCcw, X, Check, Eye, EyeOff } from 'lucide-react';
import { INITIAL_CV_DATA } from '../data/initialCV';

interface PhotoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl: string;
  showPhoto: boolean;
  onUpdatePhoto: (url: string) => void;
  onToggleShowPhoto: (show: boolean) => void;
}

export const PhotoUploaderModal: React.FC<PhotoUploaderModalProps> = ({
  isOpen,
  onClose,
  photoUrl,
  showPhoto,
  onUpdatePhoto,
  onToggleShowPhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [tempUrl, setTempUrl] = useState(photoUrl);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Proszę wybrać poprawny plik graficzny (JPG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setTempUrl(result);
      onUpdatePhoto(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRestoreDefault = () => {
    setTempUrl(INITIAL_CV_DATA.personalInfo.photoUrl);
    onUpdatePhoto(INITIAL_CV_DATA.personalInfo.photoUrl);
    onToggleShowPhoto(true);
  };

  const handleRemove = () => {
    setTempUrl('');
    onUpdatePhoto('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-lg">
            <Camera className="w-5 h-5 text-blue-600" />
            <span>Zarządzaj zdjęciem w CV</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Preview circle */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-slate-100 flex items-center justify-center group">
              {tempUrl ? (
                <img
                  src={tempUrl}
                  alt="Podgląd zdjęcia"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-3 text-slate-400">
                  <Camera className="w-10 h-10 mx-auto mb-1 opacity-50" />
                  <span className="text-xs">Brak zdjęcia</span>
                </div>
              )}
            </div>

            {/* Visibility Toggle */}
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleShowPhoto(!showPhoto)}
                className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                  showPhoto
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {showPhoto ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Zdjęcie jest widoczne w CV</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Zdjęcie jest ukryte w CV</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Drag & Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50/50'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2 opacity-80" />
            <p className="text-sm font-medium text-slate-700">
              Przeciągnij i upuść nowe zdjęcie tutaj
            </p>
            <p className="text-xs text-slate-400 mt-1">
              lub kliknij, aby wybrać plik z dysku (JPG, PNG)
            </p>
          </div>

          {/* Quick action buttons */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleRemove}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Usuń / wyczyść zdjęcie</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Gotowe</span>
          </button>
        </div>
      </div>
    </div>
  );
};
