import React from 'react';
import { Header } from './components/layout/Header';
import ShippingForm from './components/shipping/ShippingForm';
import ShippingPreview from './components/shipping/ShippingPreview';
import { DebugPanel } from './components/debug/DebugPanel';
import { useShippingData } from './hooks/useShippingData';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const { data, setData, generatePDF, isGenerating } = useShippingData();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="space-y-8">
            <ShippingForm onSubmit={setData} isGenerating={isGenerating} />
            
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
              <ShippingPreview 
                data={data} 
                onGenerate={generatePDF}
                isGenerating={isGenerating}
              />
            </div>
          </div>
        </main>

        {process.env.NODE_ENV === 'development' && (
          <DebugPanel data={data} isGenerating={isGenerating} />
        )}
      </div>
    </ErrorBoundary>
  );
}