import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { CloseIcon, WandIcon } from './icons';

interface ControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedLayout, setGeneratedLayout] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a description for the theme you want to generate.');
      return;
    }
    setIsLoading(true);
    setError('');
    setGeneratedLayout('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate a new theme and layout concept for a futuristic coder/gamer dashboard based on this idea: "${prompt}". Describe the color palette, typography, widget placement, and overall aesthetic. Be creative and detailed. Format the output as clean text.`,
        config: {
          systemInstruction: 'You are a creative UI/UX designer specializing in futuristic and cyberpunk aesthetics.'
        }
      });
      setGeneratedLayout(response.text);
    } catch (e) {
      console.error(e);
      setError('Failed to generate layout. Please check your connection or API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const panelClasses = isOpen 
    ? 'translate-x-0' 
    : 'translate-x-full';
  
  const backdropClasses = isOpen 
    ? 'opacity-100' 
    : 'opacity-0 pointer-events-none';

  return (
    <>
       <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${backdropClasses}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-700 shadow-2xl shadow-cyan-500/20 z-50 transform transition-transform duration-300 ease-in-out ${panelClasses}`}>
        <div className="flex flex-col h-full">
            <header className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-xl font-orbitron text-cyan-400">Control Panel</h2>
                <button onClick={onClose} className="p-1 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white">
                    <CloseIcon />
                </button>
            </header>
            
            <div className="flex-grow p-6 overflow-y-auto space-y-8">
                <section>
                    <h3 className="text-lg font-bold text-cyan-300 mb-2">AI Layout Generator</h3>
                    <p className="text-sm text-gray-400 mb-4">
                        Describe a theme or style, and the AI will generate a new layout concept for your dashboard. Try "retro arcade" or "minimalist solarized".
                    </p>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., A dark, space-themed layout with glowing blue highlights..."
                        className="w-full bg-gray-800 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white h-24 resize-none"
                    />
                     <button 
                        onClick={handleGenerate} 
                        disabled={isLoading}
                        className="mt-4 w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : <WandIcon className="mr-2" />}
                        {isLoading ? 'Generating...' : 'Generate Layout'}
                    </button>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </section>

                {generatedLayout && (
                    <section className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <h4 className="text-md font-bold text-cyan-300 mb-2">Generated Concept</h4>
                        <p className="text-sm text-gray-300 whitespace-pre-wrap">{generatedLayout}</p>
                    </section>
                )}
            </div>
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
