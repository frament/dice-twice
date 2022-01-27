import { User } from '../user/user';

export interface SecondaryStat {
  Name:string;
  Value:number;
  Checked:boolean;
  MainStatCode:MainStatCode;
}
export interface SpasTest {
  Name:string;
  Value:number;
  Checked:boolean;
}
export interface MainStat {
  Name:string;
  Value:number;
  Up:number;
}

export interface Weapon {
  Name:string;
  AttackBonus:number;
  Dice:DiceType;
  DiceCount:number;
  DamageType:damageType;
}

export interface Spell {
  Name:string;
  Description:string;
  Damage:string;
  MaxCount:number;
  Left:number;
}

export interface Equipment {
  Name:string;
  Count:number;
  Description:string;
}

export interface Property {
  Name:string;
  Description:string;
}

export type MainStatCode = 'Strength'|'Agility'|'Stamina'|'Intelligence'|'Wisdom'|'Charisma';
export type DiceType = 'd4'|'d6'|'d8'|'d10'|'d12'|'d20';
export type damageType = 'Режущий'|'Колющий'|'Дробящий';

export class Hero {
  constructor(input?:Partial<Hero>) {
    if (input) { Object.assign(this,input); }
  }
  Id:number = 0;
  Name:string = '';
  IdUser:number = 0;
  Class:string = '';
  Race:string = '';
  Level:number = 1;
  BonusStat:number = 0;
  Inspiration:number = 0;
  passiveAttention:number = 0;
  personality:string = '';
  ideals:string = '';
  ties:string = '';
  defects:string = '';
  bodyStats = {
    age:0,
    height:0,
    weight:0,
    eyes:'',
    skin:'',
    hair:''
  };
  mainStats:{[code:string]:MainStat} = {
    Strength: { Name:'Сила', Value:0, Up:0 },
    Agility:{ Name:'Ловвкость', Value:0, Up:0 },
    Stamina:{ Name:'Выносливость', Value:0, Up:0 },
    Intelligence:{ Name:'Интеллект', Value:0, Up:0 },
    Wisdom:{ Name:'Мудрость', Value:0, Up:0 },
    Charisma:{ Name:'Харизма', Value:0, Up:0 },
  };
  spasTests:{[code:string]:SpasTest} = {
    Strength: { Name:'Сила', Value:0, Checked:false },
    Agility:{ Name:'Ловвкость', Value:0, Checked:false },
    Stamina:{ Name:'Выносливость', Value:0, Checked:false },
    Intelligence:{ Name:'Интеллект', Value:0, Checked:false },
    Wisdom:{ Name:'Мудрость', Value:0, Checked:false },
    Charisma:{ Name:'Харизма', Value:0, Checked:false },
  }
  secStats:{[code:string]:SecondaryStat} = {
    Acrobatics: { Name:'Акробатика', Value:0, Checked:false, MainStatCode:'Agility' },
    Athletics: { Name:'Атлетика', Value:0, Checked:false, MainStatCode:'Strength' },
    Attention: { Name:'Внимание', Value:0, Checked:false, MainStatCode:'Wisdom' },
    Survival: { Name:'Выживание', Value:0, Checked:false, MainStatCode:'Wisdom' },
    Training: { Name:'Дрессировка', Value:0, Checked:false, MainStatCode:'Wisdom' },
    Intimidation: { Name:'Запугивание', Value:0, Checked:false, MainStatCode:'Charisma' },
    Performance: { Name:'Исполнение', Value:0, Checked:false, MainStatCode:'Charisma' },
    History: { Name:'История', Value:0, Checked:false, MainStatCode:'Intelligence' },
    Prestidigitation: { Name:'Ловкость рук', Value:0, Checked:false, MainStatCode:'Agility' },
    Magic: { Name:'Магия', Value:0, Checked:false, MainStatCode:'Intelligence' },
    Medicine: { Name:'Медицина', Value:0, Checked:false, MainStatCode:'Wisdom' },
    Lie: { Name:'Обман', Value:0, Checked:false, MainStatCode:'Charisma' },
    Nature: { Name:'Природа', Value:0, Checked:false, MainStatCode:'Intelligence' },
    Insight: { Name:'Проницательность', Value:0, Checked:false, MainStatCode:'Wisdom' },
    Investigation: { Name:'Расследование', Value:0, Checked:false, MainStatCode:'Intelligence' },
    Religion: { Name:'Религия', Value:0, Checked:false, MainStatCode:'Intelligence' },
    Stealth: { Name:'Скрытность', Value:0, Checked:false, MainStatCode:'Agility' },
    Belief: { Name:'Убеждение', Value:0, Checked:false, MainStatCode:'Charisma' },
  }
  healthStats = {
    Armor:0,
    Initiative:0,
    Speed:0,
    MaxHealth:0,
    CurrentHealth:0,
    TempHealth:0,
  }
  healthDice:DiceType = 'd8';
  healthDiceCount:number = 1;
  deathTestSuccess:number = 0;
  deathTestFail:number = 0;
  weapons:Weapon[] = [];
  money = {
    Gold:0,
  }
  Equipment: Equipment[] = [];
  Properties: Property[] = [];
  Spells: Spell[] = [];
  SpellCharacteristic: MainStatCode = 'Charisma';
  SpellTestStrength: number = 0;
  SpellBonus: number = 0;
  HeroHistory: string = '';
  HeroLook: string = '';
  OtherProperties: Property[] = [];
  Treasures: Property[] = [];
  Alias: Property[] = [];
}


export interface PlayerHero {
  player:Partial<User>;
  hero:Hero;
  playerIsOnline?:boolean;
}
