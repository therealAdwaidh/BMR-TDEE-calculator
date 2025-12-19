import { useState } from 'react';
import { CalculatorForm } from './features/calculator/CalculatorForm';
import { ResultsView } from './features/calculator/ResultsView';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { calculateNutrition, type UserInput, type MacroResult } from './utils/nutrition';
import { Dumbbell, RefreshCw } from 'lucide-react';
import { Button } from './components/ui/Button';

function App() {
  const [results, setResults] = useState<MacroResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (data: UserInput) => {
    const calculated = calculateNutrition(data);
    setResults(calculated);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setShowResults(false);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <Dumbbell className="h-5 w-5" />
            </div>
            <span>ProteinRichKitchen</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form Section */}
            <div className={`transition-all duration-500 ${showResults ? 'lg:col-span-5' : 'lg:col-span-8 lg:col-start-3'}`}>
              <div className="space-y-6">
                 {/* Intro Text */}
                {!showResults && (
                  <div className="text-center space-y-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                      Master Your Nutrition
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Calculate your BMR, TDEE, and optimal macro split based on your body and goals.
                    </p>
                  </div>
                )}

                <CalculatorForm onSubmit={handleCalculate} />
              </div>
            </div>

            {/* Results Section */}
            {showResults && results && (
              <div className="lg:col-span-7 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold tracking-tight">Your Results</h2>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset
                  </Button>
                </div>
                <ResultsView results={results} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ProteinRichKitchen. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
