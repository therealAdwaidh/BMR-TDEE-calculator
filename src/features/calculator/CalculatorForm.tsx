import { type ChangeEvent, type FormEvent, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Label } from '../../components/ui/Label';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { type UserInput } from '../../utils/nutrition';
import { Calculator, ArrowRight, Plus, Minus } from 'lucide-react';

interface CalculatorFormProps {
  onSubmit: (data: UserInput) => void;
}

// Local interface allowing strings for better input handling
interface FormState {
  gender: string;
  age: string;
  height: string;
  weight: string;
  activityLevel: string;
  goal: string;
}

export function CalculatorForm({ onSubmit }: CalculatorFormProps) {
  const [formData, setFormData] = useState<FormState>({
    gender: 'male',
    age: '25',
    height: '175',
    weight: '75',
    activityLevel: 'moderate',
    goal: 'maintenance',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Convert strings to numbers and cast types
    // Note: In a real app we'd validate the enum values more strictly
    onSubmit({
      gender: formData.gender as any,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      activityLevel: formData.activityLevel as any,
      goal: formData.goal as any,
    });
  };

  const adjustValue = (field: keyof FormState, amount: number, min: number, max: number) => {
    setFormData(prev => {
      const currentValue = Number(prev[field]) || 0;
      const newValue = Math.min(Math.max(currentValue + amount, min), max);
      return {
        ...prev,
        [field]: String(newValue)
      };
    });
  };

  return (
    <Card className="w-full h-full shadow-lg border-primary/20">
      <CardHeader className="bg-primary/5 pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Calculator className="h-6 w-6" />
          Nutrition Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input 
                id="gender" 
                name="gender" 
                list="gender-options"
                value={formData.gender} 
                onChange={handleChange}
                placeholder="Select or type gender"
              />
              <datalist id="gender-options">
                <option value="male" />
                <option value="female" />
              </datalist>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <div className="flex items-center gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="h-10 w-10 p-0 shrink-0"
                  onClick={() => adjustValue('age', -1, 15, 100)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="relative w-full">
                  <Input 
                    id="age" 
                    name="age" 
                    type="number" 
                    min={15} 
                    max={100} 
                    value={formData.age} 
                    onChange={handleChange} 
                    className="text-center"
                    required 
                  />
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="h-10 w-10 p-0 shrink-0"
                  onClick={() => adjustValue('age', 1, 15, 100)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <div className="flex items-center gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="h-10 w-10 p-0 shrink-0"
                  onClick={() => adjustValue('height', -1, 100, 250)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="relative w-full">
                  <Input 
                    id="height" 
                    name="height" 
                    type="number" 
                    min={100} 
                    max={250} 
                    value={formData.height} 
                    onChange={handleChange} 
                    className="text-center"
                    required 
                  />
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="h-10 w-10 p-0 shrink-0"
                  onClick={() => adjustValue('height', 1, 100, 250)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <div className="flex items-center gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="h-10 w-10 p-0 shrink-0"
                  onClick={() => adjustValue('weight', -1, 30, 200)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="relative w-full">
                  <Input 
                    id="weight" 
                    name="weight" 
                    type="number" 
                    min={30} 
                    max={200} 
                    value={formData.weight} 
                    onChange={handleChange} 
                    className="text-center"
                    required 
                  />
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="h-10 w-10 p-0 shrink-0"
                  onClick={() => adjustValue('weight', 1, 30, 200)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activityLevel">Activity Level</Label>
            <Input 
              id="activityLevel" 
              name="activityLevel" 
              list="activity-options"
              value={formData.activityLevel} 
              onChange={handleChange}
              placeholder="Select activity level"
            />
            <datalist id="activity-options">
              <option value="sedentary">Little or no exercise</option>
              <option value="light">Exercise 1-3 days/week</option>
              <option value="moderate">Exercise 3-5 days/week</option>
              <option value="heavy">Exercise 6-7 days/week</option>
              <option value="athlete">Physical job or 2x training</option>
            </datalist>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Input 
              id="goal" 
              name="goal" 
              list="goal-options"
              value={formData.goal} 
              onChange={handleChange}
              placeholder="Select goal"
            />
            <datalist id="goal-options">
              <option value="loss">Weight Loss (-500 kcal)</option>
              <option value="maintenance">Maintenance (0 kcal)</option>
              <option value="gain">Muscle Gain (+500 kcal)</option>
            </datalist>
          </div>

          <Button type="submit" className="w-full text-lg h-12 mt-4" size="lg">
            Calculate Results <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
