import { type ChangeEvent, type FormEvent, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Label } from '../../components/ui/Label';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { type UserInput } from '../../utils/nutrition';
import { Calculator, ArrowRight } from 'lucide-react';

interface CalculatorFormProps {
  onSubmit: (data: UserInput) => void;
}

export function CalculatorForm({ onSubmit }: CalculatorFormProps) {
  const [formData, setFormData] = useState<UserInput>({
    gender: 'male',
    age: 25,
    height: 175,
    weight: 75,
    activityLevel: 'moderate',
    goal: 'maintenance',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'height' || name === 'weight' 
        ? Number(value) 
        : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
              <Select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input 
                id="age" 
                name="age" 
                type="number" 
                min={15} 
                max={100} 
                value={formData.age} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input 
                id="height" 
                name="height" 
                type="number" 
                min={100} 
                max={250} 
                value={formData.height} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input 
                id="weight" 
                name="weight" 
                type="number" 
                min={30} 
                max={200} 
                value={formData.weight} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activityLevel">Activity Level</Label>
            <Select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
              <option value="sedentary">Sedentary (Little or no exercise)</option>
              <option value="light">Light (Exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (Exercise 3-5 days/week)</option>
              <option value="heavy">Heavy (Exercise 6-7 days/week)</option>
              <option value="athlete">Athlete (Physical job or 2x training)</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Select id="goal" name="goal" value={formData.goal} onChange={handleChange}>
              <option value="loss">Weight Loss (-500 kcal)</option>
              <option value="maintenance">Maintenance (0 kcal)</option>
              <option value="gain">Muscle Gain (+500 kcal)</option>
            </Select>
          </div>

          <Button type="submit" className="w-full text-lg h-12 mt-4" size="lg">
            Calculate Results <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
