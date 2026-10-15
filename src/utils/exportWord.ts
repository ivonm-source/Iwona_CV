import { CVData } from '../types/cv';

export function exportToWord(data: CVData, fileName = 'CV_Szablon.doc'): void {
  const sanitize = (text: string) => {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  const experienceHtml = data.experience
    .map(
      (exp) => `
      <div style="margin-bottom: 16px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 4px;">
          <tr>
            <td style="font-size: 13pt; font-weight: bold; color: #1e3a8a;">${sanitize(exp.position)}</td>
            <td style="font-size: 10pt; font-weight: bold; color: #475569; text-align: right; white-space: nowrap;">
              ${sanitize(exp.startDate)} – ${exp.current ? 'obecnie' : sanitize(exp.endDate)}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="font-size: 10.5pt; color: #334155; font-style: italic;">
              ${sanitize(exp.company)} · ${sanitize(exp.location)}
            </td>
          </tr>
        </table>
        <ul style="margin-top: 4px; margin-bottom: 8px; padding-left: 20px; font-size: 10pt; color: #1e293b; line-height: 1.45;">
          ${exp.responsibilities.map((r) => `<li style="margin-bottom: 3px;">${sanitize(r)}</li>`).join('')}
        </ul>
      </div>
    `
    )
    .join('');

  const educationHtml = data.education
    .map(
      (edu) => `
      <div style="margin-bottom: 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="font-size: 11pt; font-weight: bold; color: #1e293b;">${sanitize(edu.school)}</td>
            <td style="font-size: 10pt; font-weight: bold; color: #475569; text-align: right; white-space: nowrap;">
              ${sanitize(edu.startDate)} – ${sanitize(edu.endDate)}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="font-size: 10pt; color: #334155;">
              <strong>Kierunek:</strong> ${sanitize(edu.fieldOfStudy)} | <strong>Tytuł:</strong> ${sanitize(edu.degree)}
              ${edu.specialization ? `<br /><strong>Specjalizacja:</strong> ${sanitize(edu.specialization)}` : ''}
              ${edu.thesisTitle ? `<br /><strong>Temat pracy:</strong> „${sanitize(edu.thesisTitle)}”` : ''}
            </td>
          </tr>
        </table>
      </div>
    `
    )
    .join('');

  const managementSkillsHtml = data.skills.management
    .map((s) => `<li style="margin-bottom: 3px;">${sanitize(s)}</li>`)
    .join('');

  const technicalSkillsHtml = data.skills.technical
    .map((s) => `<li style="margin-bottom: 3px;">${sanitize(s)}</li>`)
    .join('');

  const softSkillsHtml = data.softSkills
    .map((s) => `<li style="margin-bottom: 3px;">${sanitize(s)}</li>`)
    .join('');

  const languagesHtml = data.languages
    .map((l) => `<li style="margin-bottom: 3px;"><strong>${sanitize(l.language)}:</strong> ${sanitize(l.level)}${l.description ? ` (${sanitize(l.description)})` : ''}</li>`)
    .join('');

  const interestsHtml = data.interests
    .map((i) => `<span style="display: inline-block; margin-right: 12px; margin-bottom: 4px;">• ${sanitize(i)}</span>`)
    .join(' ');

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>CV - ${sanitize(data.personalInfo.fullName)}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page {
          size: 21cm 29.7cm;
          margin: 1.8cm 1.8cm 1.8cm 1.8cm;
          mso-page-orientation: portrait;
        }
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          color: #1e293b;
          font-size: 10.5pt;
          line-height: 1.4;
          background-color: #ffffff;
        }
        h1 {
          font-size: 24pt;
          font-weight: bold;
          color: #0f172a;
          margin: 0 0 4px 0;
          letter-spacing: -0.5px;
        }
        .subtitle {
          font-size: 13pt;
          font-weight: 600;
          color: #1e3a8a;
          margin: 0 0 12px 0;
        }
        .section-header {
          font-size: 12pt;
          font-weight: bold;
          color: #1e3a8a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1.5pt solid #1e3a8a;
          padding-bottom: 4px;
          margin-top: 18px;
          margin-bottom: 10px;
        }
        .contact-info {
          font-size: 9.5pt;
          color: #475569;
          margin-bottom: 16px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 12px;
        }
        .rodo-clause {
          font-size: 8pt;
          color: #64748b;
          margin-top: 28px;
          padding-top: 8px;
          border-top: 0.5pt solid #cbd5e1;
          line-height: 1.35;
          text-align: justify;
        }
      </style>
    </head>
    <body>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
        <tr>
          <td style="vertical-align: top;">
            <div style="font-size: 11pt; font-weight: bold; letter-spacing: 3px; color: #1e3a8a; text-transform: uppercase; margin-bottom: 6px; border-bottom: 2px solid #1e3a8a; display: inline-block; padding-bottom: 2px;">
              C U R R I C U L U M &nbsp; V I T A E
            </div>
            <h1>${sanitize(data.personalInfo.fullName)}</h1>
            <div class="subtitle">${sanitize(data.personalInfo.title)}</div>
            <div class="contact-info">
              <strong>Telefon:</strong> ${sanitize(data.personalInfo.phone)} &nbsp;|&nbsp;
              <strong>Email:</strong> ${sanitize(data.personalInfo.email)} &nbsp;|&nbsp;
              <strong>Adres:</strong> ${sanitize(data.personalInfo.location)}
              ${data.personalInfo.showBirthDate && data.personalInfo.birthDate ? `<br /><strong>Data urodzenia:</strong> ${sanitize(data.personalInfo.birthDate)}` : ''}
              ${data.personalInfo.drivingLicense ? ` &nbsp;|&nbsp; <strong>Prawo jazdy:</strong> ${sanitize(data.personalInfo.drivingLicense)}` : ''}
              ${data.personalInfo.showMaritalStatus && data.personalInfo.maritalStatus ? ` &nbsp;|&nbsp; <strong>Stan cywilny:</strong> ${sanitize(data.personalInfo.maritalStatus)}` : ''}
            </div>
          </td>
        </tr>
      </table>

      ${
        data.summary
          ? `
        <div class="section-header">Podsumowanie Zawodowe</div>
        <p style="font-size: 10pt; line-height: 1.5; color: #334155; margin: 0 0 14px 0; text-align: justify;">
          ${sanitize(data.summary)}
        </p>
      `
          : ''
      }

      <div class="section-header">Doświadczenie Zawodowe</div>
      ${experienceHtml}

      <div class="section-header">Wykształcenie</div>
      ${educationHtml}

      <table style="width: 100%; border-collapse: collapse; margin-top: 6px;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding-right: 15px;">
            <div class="section-header">Umiejętności Zarządcze & Operacyjne</div>
            <ul style="padding-left: 18px; margin-top: 4px; font-size: 9.5pt; line-height: 1.4;">
              ${managementSkillsHtml}
            </ul>

            <div class="section-header" style="margin-top: 14px;">Języki Obce</div>
            <ul style="padding-left: 18px; margin-top: 4px; font-size: 9.5pt; line-height: 1.4;">
              ${languagesHtml}
            </ul>
          </td>
          <td style="width: 50%; vertical-align: top; padding-left: 15px;">
            <div class="section-header">Narzędzia & Systemy</div>
            <ul style="padding-left: 18px; margin-top: 4px; font-size: 9.5pt; line-height: 1.4;">
              ${technicalSkillsHtml}
            </ul>

            <div class="section-header" style="margin-top: 14px;">Kompetencje Miękkie</div>
            <ul style="padding-left: 18px; margin-top: 4px; font-size: 9.5pt; line-height: 1.4;">
              ${softSkillsHtml}
            </ul>
          </td>
        </tr>
      </table>

      <div class="section-header">Zainteresowania</div>
      <div style="font-size: 9.5pt; color: #334155; margin-bottom: 12px;">
        ${interestsHtml}
      </div>

      <div class="rodo-clause">
        ${sanitize(data.gdprClause)}
        ${
          data.includeFutureRecruitment
            ? '<br />Wyrażam również zgodę na przetwarzanie moich danych osobowych na potrzeby przyszłych procesów rekrutacyjnych.'
            : ''
        }
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8',
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
