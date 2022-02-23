import { User } from '../user/user';

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

export interface HeroMisc {
  class:string;
  level:number;
  background:string;
  playername:string;
  race:string;
  alignment:string;
  experiencepoints:number;
}

export interface HeroCombatStats {
  armorclass:number;
  initiative:string;
  speed:number;
  hpmax:number;
  hpcurrent:number;
  hptemporary:number;
  hitdicetotal:DiceTypeCount;
  hitdiceremaining:DiceTypeCount;
  deathsuccess1:boolean;
  deathsuccess2:boolean;
  deathsuccess3:boolean;
  deathfail1:boolean;
  deathfail2:boolean;
  deathfail3:boolean;
}

export interface HeroAttack {
  atkname:string;
  atkbonus:string;
  atkdamage:string;
}

export interface HeroEquipment {
  cp:number;
  sp:number;
  ep:number;
  gp:number;
  pp:number;
  list:string;
}

export type BaseStat = 'Strength'|'Dexterity'|'Constitution'|'Wisdom'|'Intelligence'|'Charisma';
export type skillsCodes = 'Acrobatics'|'Animal Handling'|'Arcana'|'Athletics'|'Deception'|'History'|'Insight'|'Intimidation'
  |'Investigation'|'Medicine'|'Nature'|'Perception'|'Performance'|'Persuasion'|'Religion'|'Sleight of Hand'|'Stealth'|'Survival';
export type DiceType = 'd4'|'d6'|'d8'|'d10'|'d12'|'d20';
export type DiceTypeCount = ''|'1d4'|'1d6'|'1d8'|'1d10'|'1d12'|'1d20'|'2d4'|'2d6'|'2d8'|'2d10'|'2d12'|'2d20';
export type damageType = 'Режущий'|'Колющий'|'Дробящий';
export type HeroScores = { [code in BaseStat]: number; };
export type HeroScoresSaves = { [code in BaseStat]: string; };
export type HeroScoresMods = { [code in BaseStat]: string; };
export type HeroScoresSelected = { [code in BaseStat]: boolean; };
export type HeroSkills = { [code in skillsCodes]: string; };
export type HeroSkillsSelected = { [code in skillsCodes]: boolean; };


export class Hero {
  constructor(input?:Partial<Hero>) {
    if (input) { Object.assign(this,input); }
  }
  Id:number = 0;
  Name:string = '';
  IdUser:number = 0;

  misc: HeroMisc = {
    class:'',
    level:1,
    background:'',
    playername:'',
    race:'',
    alignment:'',
    experiencepoints:0
  };
  scores:HeroScores = {
    Strength:0,
    Dexterity:0,
    Constitution:0,
    Wisdom:0,
    Intelligence:0,
    Charisma:0
  };
  scoresMod:HeroScoresMods = {
    Strength:'',
    Dexterity:'',
    Constitution:'',
    Wisdom:'',
    Intelligence:'',
    Charisma:''
  };
  inspiration:string = '';
  proficiencybonus:number = 0;
  saves:HeroScoresSaves = {
    Strength:'',
    Dexterity:'',
    Constitution:'',
    Wisdom:'',
    Intelligence:'',
    Charisma:''
  };
  savesSelected:HeroScoresSelected = {
    Strength:false,
    Dexterity:false,
    Constitution:false,
    Wisdom:false,
    Intelligence:false,
    Charisma:false
  };
  skills:HeroSkills = {
    'Acrobatics':'',
    'Animal Handling':'',
    'Arcana':'',
    'Athletics':'',
    'Deception':'',
    'History':'',
    'Insight':'',
    'Intimidation':'',
    'Investigation':'',
    'Medicine':'',
    'Nature':'',
    'Perception':'',
    'Performance':'',
    'Persuasion':'',
    'Religion':'',
    'Sleight of Hand':'',
    'Stealth':'',
    'Survival':'',
  };
  skillsSelected:HeroSkillsSelected = {
    'Acrobatics':false,
    'Animal Handling':false,
    'Arcana':false,
    'Athletics':false,
    'Deception':false,
    'History':false,
    'Insight':false,
    'Intimidation':false,
    'Investigation':false,
    'Medicine':false,
    'Nature':false,
    'Perception':false,
    'Performance':false,
    'Persuasion':false,
    'Religion':false,
    'Sleight of Hand':false,
    'Stealth':false,
    'Survival':false,
  };
  passiveperception:number = 0;
  otherprofs:string = '';
  combat: HeroCombatStats = {
    armorclass:0,
    initiative:'',
    speed:0,
    hpmax:0,
    hpcurrent:0,
    hptemporary:0,
    hitdicetotal:'',
    hitdiceremaining:'',
    deathsuccess1:false,
    deathsuccess2:false,
    deathsuccess3:false,
    deathfail1:false,
    deathfail2:false,
    deathfail3:false,
  }
  attacks:HeroAttack[] = [
    {atkname:'',atkbonus:'',atkdamage:''},
    {atkname:'',atkbonus:'',atkdamage:''},
    {atkname:'',atkbonus:'',atkdamage:''},
  ];
  attacksOther:string = '';

  equipment:HeroEquipment = {
    cp:0,
    sp:0,
    ep:0,
    gp:0,
    pp:0,
    list:''
  };
  personality:string = '';
  ideals:string = '';
  bonds:string = '';
  flaws:string = '';
  features:string = '';
}


export interface PlayerHero {
  player:Partial<User>;
  hero:Hero;
  playerIsOnline?:boolean;
}
