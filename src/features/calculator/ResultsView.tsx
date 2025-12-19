import { type MacroResult } from '../../utils/nutrition';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Flame, Droplet, Wheat, Target, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ResultsViewProps {
  results: MacroResult;
}

export function ResultsView({ results }: ResultsViewProps) {
  const chartData = [
    { name: 'Protein', value: results.protein * 4, grams: results.protein, color: '#10b981' }, // Primary
    { name: 'Fats', value: results.fat * 9, grams: results.fat, color: '#eab308' }, // Yellow-500
    { name: 'Carbs', value: results.carbs * 4, grams: results.carbs, color: '#3b82f6' }, // Blue-500
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-primary/10 rounded-full mb-2">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">BMR / TDEE</p>
            <div className="text-2xl font-bold">{results.bmr} / {results.tdee}</div>
            <p className="text-xs text-muted-foreground mt-1">kcal/day</p>
          </CardContent>
        </Card>
        
        <Card className="bg-primary text-primary-foreground border-primary shadow-lg">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-white/20 rounded-full mb-2">
              <Target className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-primary-foreground/90">Daily Target</p>
            <div className="text-4xl font-bold">{results.targetCalories}</div>
            <p className="text-xs text-primary-foreground/80 mt-1">kcal/day</p>
          </CardContent>
        </Card>
      </div>

      {/* Macros Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Macro Chart */}
        <Card className="col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Macro Split</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`${value} kcal`, 'Calories']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Macro Cards */}
        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-emerald-600 flex items-center gap-2">
                  <Flame className="h-4 w-4" /> Protein
                </span>
               
              </div>
              <div className="text-3xl font-bold">{results.protein}g</div>
              <p className="text-sm text-muted-foreground mt-1">{results.protein * 4} kcal</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-yellow-600 flex items-center gap-2">
                  <Droplet className="h-4 w-4" /> Fat
                </span>
             
              </div>
              <div className="text-3xl font-bold">{results.fat}g</div>
              <p className="text-sm text-muted-foreground mt-1">{results.fat * 9} kcal</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-blue-600 flex items-center gap-2">
                  <Wheat className="h-4 w-4" /> Carbs
                </span>
              
             
              </div>
              <div className="text-3xl font-bold">{results.carbs}g</div>
              <p className="text-sm text-muted-foreground mt-1">{results.carbs * 4} kcal</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
