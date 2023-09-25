export const game={player:[{name:"🧝 Elf Knight",health:30,maxHealth:30,pointsId:"player",healthbarId:"player",hardAttackDamage:4,hardAttackDice:8,weakAttackDamage:2,weakAttackDice:3,attacks:[["🛡️ Shield Bash",2,3,"🛡️ You are trying to bash the opponent away with your shield ...","💫 The enemy dodges your attack ..."],["🔨 Mace Attack",6,6,"🔨 You are trying hit the enemy with a huge mace ...","💫 The enemy dodges your attack ..."],["🌀 Magic Attack",1,4,"🌀 You are trying to cast a spell on your opponent ...","💫 The enemy dodges your attack ..."]]},{name:"🤖 Jones Verr",health:30,maxHealth:30,pointsId:"player",healthbarId:"player",hardAttackDamage:4,hardAttackDice:8,weakAttackDamage:2,weakAttackDice:3,attacks:[["Shield Bash",2,3,"🛡️ You are trying to bash the opponent away with your shield ...","💫 The enemy dodges your attack ..."],["Mace Attack",6,6,"🔨 You are trying hit the enemy with a huge mace ...","💫 The enemy dodges your attack ..."],["Magic Attack",1,4,"🌀 You are trying to cast a spell on your opponent ...","💫 The enemy dodges your attack ..."]]}],enemy:[{name:"👾 Goblin Warrior",health:12,maxHealth:12,pointsId:"enemy",healthbarId:"enemy",hardAttackDamage:6,hardAttackDice:8,weakAttackDamage:3,weakAttackDice:4},{name:"👽 Cuuwing",health:12,maxHealth:12,pointsId:"enemy",healthbarId:"enemy",hardAttackDamage:4,hardAttackDice:8,weakAttackDamage:2,weakAttackDice:3},{name:"🥷 Wispfree Jones ",health:12,maxHealth:12,pointsId:"enemy",healthbarId:"enemy",hardAttackDamage:4,hardAttackDice:8,weakAttackDamage:2,weakAttackDice:3},{name:"🧛 Break Gett",health:15,maxHealth:16,pointsId:"enemy",healthbarId:"enemy",hardAttackDamage:4,hardAttackDice:8,weakAttackDamage:4,weakAttackDice:4}]};
export class CharacterLib {
    constructor(players = [], enemys = []) {
        this.players = players;
        this.enemys = enemys;
        this.player = {};
        this.enemy = {};
        this.p_id = null;
        this.e_id = null;
    }

    selPlayer(num) {
        if (typeof num === 'number' && this.players[num]) {
            this.p_id = num;
            this.player = this.players[num];
        } else {
            this.p_id = null;
            this.player = {};
        }
    }

    selEnemy(num) {
        if (typeof num === 'number' && this.enemys[num]) {
            this.e_id = num;
            this.enemy = this.enemys[num];
        } else {
            this.e_id = null;
            this.enemy = {};
        }
    }

    getPlayer() {
        if (Object.keys(this.player).length > 0) {
            return this.player;
        } else {
            return false;
        }
    }

    getEnemy() {
        if (Object.keys(this.enemy).length > 0) {
            return this.enemy
        } else {
            return false;
        }
    }


    battle() {
        let arr = []
        if (this.getPlayer()) arr.push(this.getPlayer())
        if (this.getEnemy()) arr.push(this.getEnemy())
        if (arr.length == 2) {
            return arr;
        } else {
            return null;
        }
    }

    list() {
        let obj = {};
        obj.player = this.players;
        obj.enemy = this.enemys;
        return obj
    }
}

export function throwDice(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

export function fighter(obj) {
    this.name = obj.name
    this.health = obj.health
    this.maxHealth = obj.maxHealth
    this.pointsId = obj.pointsId
    this.healthbarId = obj.healthbarId
    this.hardAttackDamage = obj.hardAttackDamage
    this.hardAttackDice = obj.hardAttackDice
    this.weakAttackDamage = obj.weakAttackDamage
    this.weakAttackDice = obj.weakAttackDice
    this.attacks = obj.attacks
}



// let battle = new CharacterLib(game.player, game.enemy);
// battle.selPlayer(2);
// battle.selEnemy(1);
// let obj1 = battle.getPlayer();
// let obj2 = battle.getEnemy();
// let obj3 = battle.battle();

// console.log(`Player: ${obj1 && obj1.name ? obj1.name : 'Not Select'}`);
// console.log(`Enemy: ${obj2 && obj2.name ? obj2.name : 'Not Select'}`);
// console.log(obj3);