import type { FormData } from '../../types/shipping';

export interface PDFGeneratorOptions {
  toPDF: (element: HTMLElement) => Promise<void>;
}

export interface PDFContainerStyles {
  position: 'fixed';
  top: string;
  left: string;
  width: string;
  backgroundColor: string;
  padding: string;
}

export interface PDFRenderOptions {
  data: FormData;
  container: HTMLElement;
}