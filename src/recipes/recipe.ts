export interface Recipe 
  { 
    id: number; 
    title: string; 
    minutes: number; 
    servings: number;
    rating: string;
    price: number
    ingredients?: Ingredient[];
  };

  export interface Ingredient {
     name: string; 
     amount: string
  }
