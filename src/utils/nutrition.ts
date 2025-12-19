// Mifflin-St Jeor Formula
// Male: (10 × weight) + (6.25 × height) − (5 × age) + 5
// Female: (10 × weight) + (6.25 × height) − (5 × age) − 161

export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'heavy' | 'athlete';
export type Goal = 'loss' | 'maintenance' | 'gain';

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    heavy: 1.725,
    athlete: 1.9,
};

export const GOAL_ADJUSTMENTS: Record<Goal, number> = {
    loss: -500,
    maintenance: 0,
    gain: 500,
};

export interface UserInput {
    gender: Gender;
    age: number;
    height: number; // cm
    weight: number; // kg
    activityLevel: ActivityLevel;
    goal: Goal;
}

export interface MacroResult {
    bmr: number;
    tdee: number;
    targetCalories: number;
    protein: number; // grams
    fat: number; // grams
    carbs: number; // grams
}

export function calculateNutrition(input: UserInput): MacroResult {
    const { gender, age, height, weight, activityLevel, goal } = input;

    // 1. BMR Calculation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (gender === 'male') {
        bmr += 5;
    } else {
        bmr -= 161;
    }

    // 2. TDEE Calculation
    const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel];

    // 3. Target Calories
    const targetCalories = tdee + GOAL_ADJUSTMENTS[goal];

    // 4. Macros
    // Protein: 2g/kg
    const protein = 2 * weight;

    // Fat: 0.8g/kg
    const fat = 0.8 * weight;

    // Carbs: Remaining calories
    // Protein = 4 kcal/g, Fat = 9 kcal/g, Carbs = 4 kcal/g
    const proteinCals = protein * 4;
    const fatCals = fat * 9;
    const remainingCals = targetCalories - proteinCals - fatCals;
    const carbs = Math.max(0, remainingCals / 4);

    return {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        targetCalories: Math.round(targetCalories),
        protein: Math.round(protein),
        fat: Math.round(fat),
        carbs: Math.round(carbs),
    };
}
