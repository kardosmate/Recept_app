export interface Recipe {
    id: string; // Egyedi azonosító
    name: string; // Recept neve
    ingredients: string[]; // Összetevők listája
    time: string; // Elkészítési idő
    description: string; // Recept leírása
    category: string; // Kategória (pl. „Főételek”, „Desszertek”)
    isFavorite: boolean; // Kedvencek közé van-e mentve
  }
  