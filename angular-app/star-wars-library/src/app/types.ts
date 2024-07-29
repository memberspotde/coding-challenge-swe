export type Character = CharacterSwapiData & {
  primaryColor: string;
  imageUrl: string;
};

export type CharacterSwapiData = {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworldData: string;
};

export type ColorEnhanedData = CharacterSwapiData & {
  primaryColor: string;
};
export type ImageEnhancedData = CharacterSwapiData & {
  imageUrl: string;
};

export type CharacterColorData = {
  id: number;
  name: string;
  primaryColor: string;
};

export type CharacterImageData = {
  id: number;
  name: string;
  imageUrl: string;
};
