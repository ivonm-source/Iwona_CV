import { CVData } from '../types/cv';

export function exportToJson(data: CVData, fileName = 'cv_dane.json'): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

export function importFromJson(file: File): Promise<CVData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text) as CVData;
        if (!parsed.personalInfo || !parsed.experience || !parsed.education) {
          throw new Error('Niepoprawny format pliku CV JSON: brak kluczowych sekcji.');
        }
        resolve(parsed);
      } catch (err) {
        reject(err instanceof Error ? err : new Error('Błąd odczytu pliku JSON'));
      }
    };
    reader.onerror = () => reject(new Error('Nie udało się wczytać pliku'));
    reader.readAsText(file);
  });
}
