export interface CharacterTypeTS {
    // String values
    name: string;
    race: string;
    subrace: string;
    class: string;
    speed: string;
    alignment: string;
    age: string;
    size: string;
    size_description: string;
    language_desc: string;
    spellcasting_ability: string | null;
    avatar: Boolean | null;
    
    // Number values
    as_bonus: number;
    level: number;
    proficiency_bonus: number;
    spellcasting_level: number;
    hit_die: number;
  
    // Arrays
    proficiencies: string[];
    languages: string[];
    traits: string[];
    features: string[];
    saving_throws: string[];
    equipment: object[];
    
    // Objects
    ability_scores: Record<string, any>;
    spells: Record<string, any> | null; 
    as_bonus_mod: Record<string, any>;
  }


export const currency: string[] = ['cp', 'sp', 'gp', 'pp']

export interface Equipment {
  name: string,
  index: string,
  count: number,
  weight: number,
  cost: {
    quantity: number,
    unit: 'cp' | 'sp' | 'gp' | 'pp'
  }
}

export interface equipted {
  objects: equipment[],
  weight: number,
  characterId: string
}