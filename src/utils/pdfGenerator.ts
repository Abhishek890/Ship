import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const CONTENT_PADDING_MM = 20;

export async function generatePDF(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found');

  try {
    // Calculate dimensions
    const contentWidth = A4_WIDTH_MM - (2 * CONTENT_PADDING_MM);
    const contentHeight = A4_HEIGHT_MM - (2 * CONTENT_PADDING_MM);

    // Temporarily style element for capture
    element.style.width = `${contentWidth}mm`;
    element.style.padding = '0';
    element.style.background = 'white';

    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: element.offsetWidth,
      height: element.offsetHeight
    });

    // Create PDF with proper dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Calculate scaling to fit content properly
    const imgWidth = A4_WIDTH_MM - (2 * CONTENT_PADDING_MM);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image centered on page
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      CONTENT_PADDING_MM,
      CONTENT_PADDING_MM,
      imgWidth,
      imgHeight
    );

    pdf.save(filename);
  } finally {
    // Reset element styles
    element.style.width = '';
    element.style.padding = '';
    element.style.background = '';
  }
}