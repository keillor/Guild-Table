export interface Spell {
    _id?: mongoose.Types.ObjectId;
    area_of_effect?: AreaOfEffect;
    attack_type?: string;
    casting_time: string;
    classes: APIReference[];
    components: string[];
    concentration: boolean;
    damage?: Damage;
    dc?: DC;
    desc: string[];
    duration: string;
    heal_at_slot_level?: Record<number, string>;
    higher_level?: string;
    index: string;
    level: number;
    material?: string;
    name: string;
    range: string;
    ritual: boolean;
    school: APIReference;
    url: string;
    updated_at: string;
  }