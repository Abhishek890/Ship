import { useState } from 'react';
import type { ShippingData } from '../types/shipping';
import { generatePDF } from '../utils/pdfGenerator';
import { DEFAULT_SENDER } from '../config/defaultSender';

export function useShippingData() {
  const [data, setData] = useState<ShippingData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSetData = (formData: ShippingData) => {
    setData({
      ...formData,
      from: DEFAULT_SENDER
    });
  };

  const handleGeneratePDF = async () => {
    if (!data) return;
    
    setIsGenerating(true);
    try {
      await generatePDF('shipping-label', `shipping-label-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    data,
    setData: handleSetData,
    generatePDF: handleGeneratePDF,
    isGenerating
  };
}