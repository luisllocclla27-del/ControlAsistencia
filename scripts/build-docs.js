import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { mdToPdf } from 'md-to-pdf';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');
const outputDir = path.join(rootDir, 'entregables');

async function buildDocs() {
  console.log('Iniciando compilacion de documentos...');
  
  // 1. Crear carpeta entregables si no existe
  await fs.mkdir(outputDir, { recursive: true });

  // 2. Leer y ordenar archivos markdown (excepto ppt, y anexos al final)
  const files = await fs.readdir(docsDir);
  const mdFiles = files
    .filter(f => f.endsWith('.md') && !f.includes('ppt-guion') && !f.includes('anexos'))
    .sort((a, b) => {
      const numA = parseInt(a.split('-')[0]) || 99;
      const numB = parseInt(b.split('-')[0]) || 99;
      return numA - numB;
    });
  
  // Añadir anexos al final si existe
  if (files.includes('anexos.md')) mdFiles.push('anexos.md');

  // 3. Concatenar contenido
  let combinedContent = '# INFORME FINAL - PROYECTO CALIDAD DE SOFTWARE\n\n';
  for (const file of mdFiles) {
    const content = await fs.readFile(path.join(docsDir, file), 'utf-8');
    combinedContent += `\n\n<!-- Page Break -->\n<div style="page-break-before: always;"></div>\n\n${content}`;
  }

  const finalMdPath = path.join(outputDir, 'informe_final.md');
  await fs.writeFile(finalMdPath, combinedContent, 'utf-8');
  console.log('✅ Generado: informe_final.md');

  // 4. Generar HTML (para que pueda abrirse/pegarse en Microsoft Word preservando formatos y tablas)
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Informe Final</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 40px; }
        h1, h2, h3 { color: #333; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
        img { max-width: 100%; }
        .page-break { page-break-before: always; }
      </style>
    </head>
    <body>
      ${await marked(combinedContent)}
    </body>
    </html>
  `;
  await fs.writeFile(path.join(outputDir, 'informe_final.html'), htmlContent, 'utf-8');
  console.log('✅ Generado: informe_final.html (Puedes abrir esto en Microsoft Word para guardarlo como .docx)');

  // 5. Generar PDF
  try {
    const pdf = await mdToPdf(
      { content: combinedContent },
      { 
        dest: path.join(outputDir, 'informe_final.pdf'),
        css: `
          body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
          h1, h2 { border-bottom: 1px solid #ddd; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; }
          th { background: #f5f5f5; }
        `,
        pdf_options: {
          format: 'A4',
          margin: '20mm'
        }
      }
    );
    if (pdf) console.log('✅ Generado: informe_final.pdf');
  } catch (error) {
    console.error('❌ Error generando PDF:', error.message);
    console.log('Asegurate de que md-to-pdf / puppeteer esté instalado correctamente.');
  }
}

buildDocs().catch(console.error);
