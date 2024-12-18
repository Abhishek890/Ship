import React from 'react';
import { Download } from 'lucide-react';
import type { ShippingData } from '../../types/shipping';
import { LabelPreview } from './components/LabelPreview';

interface ShippingPreviewProps {
  data: ShippingData | null;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function ShippingPreview({ data, onGenerate, isGenerating }: ShippingPreviewProps) {
  if (!data) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          <p>Fill out the form to generate a shipping label</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <LabelPreview data={data} />

      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className={`mt-6 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-medium transition-colors ${
          isGenerating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <Download className="w-5 h-5" />
        {isGenerating ? 'Generating PDF...' : 'Download PDF'}
      </button>
    </div>
  );
}