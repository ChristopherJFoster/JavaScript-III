/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

function GameObject(atts) {
  this.createdAt = atts.createdAt;
  this.dimensions = atts.dimensions;
}

GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
};

/*
  === CharacterStats ===
  * healthPoints
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(atts) {
  GameObject.call(this, atts);
  this.healthPoints = atts.healthPoints;
  this.name = atts.name;
}

CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage.`;
};

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(atts) {
  CharacterStats.call(this, atts);
  this.team = atts.team;
  this.weapons = atts.weapons;
  this.languages = atts.languages;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${
    this.languages[
      Math.floor(Math.random() * Math.floor(this.languages.length))
    ] // Added multiple languages to some characters - this code chooses randomly among the greeting character's known languages.
  }.`;
};

/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

// Test you work by un-commenting these 3 objects and the list of console logs below:

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  healthPoints: 5,
  name: "Bruce",
  team: "Mage Guild",
  weapons: ["Staff of Shamalama"],
  languages: ["Common Tongue", "Scarred Tongue", "Rudimentary Telepathy"]
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 15,
  name: "Sir Mustachio",
  team: "The Round Table",
  weapons: ["Giant Sword", "Shield"],
  languages: ["Common Tongue"]
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: "Lilith",
  team: "Forest Kingdom",
  weapons: ["Bow", "Dagger"],
  languages: ["Elvish", "Common Tongue"]
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.languages); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

console.log("\n"); // Breaks up output so it's easier to read.

// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.

function Villain(atts) {
  Humanoid.call(this, atts);
  this.taunt = atts.taunt;
  this.secretWeapon = atts.secretWeapon;
}

Villain.prototype = Object.create(Humanoid.prototype);
Villain.prototype.speakTaunt = function() {
  console.log(`${this.name}: ${this.taunt}`);
};

function Hero(atts) {
  Humanoid.call(this, atts);
  this.battleCry = atts.battleCry;
  this.superWeapon = atts.superWeapon;
}

Hero.prototype = Object.create(Humanoid.prototype);
Hero.prototype.speakBattleCry = function() {
  console.log(`${this.name}: ${this.battleCry}`);
};

const argoroth = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 3,
    height: 7
  },
  healthPoints: 40,
  name: "Argoroth",
  team: "Hell's Middlemen",
  weapons: ["Charred Bone Katana", "Bloody Morning Star"],
  languages: ["Common Tongue", "Scarred Tongue", "Old Elvish", "Telepathy"],
  taunt: "You likely will not live to regret your decision.",
  secretWeapon: "Poisoned Ceremonial Dagger"
});

const glasowyn = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 1,
    height: 8
  },
  healthPoints: 30,
  name: "Glasowyn",
  team: "Deldien",
  weapons: ["Bow", "Dagger"],
  languages: ["Elvish", "Common Tongue", "Old Elvish", "Dwarvish"],
  battleCry: "Friends - draw your weapons and FIGHT for Deldien!",
  superWeapon: "Sword Before Time"
});

console.log(argoroth.greet());
argoroth.speakTaunt();
console.log(glasowyn.greet());
glasowyn.speakBattleCry();

console.log("\n");

// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
Villain.prototype.normalAttack = function(target) {
  let damage = Math.floor(Math.random() * Math.floor(this.healthPoints / 4)); // I set the max damage to the Villain's hp / 4 - the less healthy the attacker, the less damage they can inflict.
  let plural = "points";
  if (damage === 1) {
    plural = "point"; // It's nice to see "1 health point" and not "1 health points".
  }
  target.healthPoints -= damage;
  console.log(
    `${this.name} hits ${target.name} with a ${
      this.weapons[
        Math.floor(Math.random() * Math.floor(this.weapons.length)) // This code chooses randomly from among the attacking character's weapons.
      ]
    } for ${damage} health ${plural}!`
  );
  if (target.healthPoints <= 0) {
    console.log(`${target.name} has sustained mortal damage!`);
    console.log(target.destroy());
  } else {
    console.log(`${target.name} lives to fight on!`);
  }
};

Villain.prototype.specialAttack = function(target) {
  let damage = Math.floor(Math.random() * Math.floor(this.healthPoints / 3)); // The special attack is more powerful.
  let plural = "points";
  if (damage === 1) {
    plural = "point";
  }
  target.healthPoints -= damage;
  console.log(
    `${this.name} hits ${target.name} with a ${
      this.secretWeapon
    } for ${damage} health ${plural}!`
  );
  if (target.healthPoints <= 0) {
    console.log(`${target.name} has sustained mortal damage!`);
    console.log(target.destroy());
  } else {
    console.log(`${target.name} lives to fight on!`);
  }
};

// Outside of this exercise, I might have created a "BossHumanoid" constructor, and collapsed Villain and Hero into that. Since they're two different constructors, however, I repeat myself:
Hero.prototype.normalAttack = function(target) {
  let damage = Math.floor(Math.random() * Math.floor(this.healthPoints / 2)); // The Hero's max damage is hp / 2 (instead of the Villain's hp / 4). The gods smile upon the Hero!
  let plural = "points";
  if (damage === 1) {
    plural = "point";
  }
  target.healthPoints -= damage;
  console.log(
    `${this.name} hits ${target.name} with a ${
      this.weapons[Math.floor(Math.random() * Math.floor(this.weapons.length))]
    } for ${damage} health ${plural}!`
  );
  if (target.healthPoints <= 0) {
    console.log(`${target.name} has sustained mortal damage!`);
    console.log(target.destroy());
  } else {
    console.log(`${target.name} lives to fight on!`);
  }
};

Hero.prototype.specialAttack = function(target) {
  let damage = Math.floor(Math.random() * Math.floor(this.healthPoints / 1.5));
  let plural = "points";
  if (damage === 1) {
    plural = "point";
  }
  target.healthPoints -= damage;
  console.log(
    `${this.name} hits ${target.name} with a ${
      this.superWeapon
    } for ${damage} health ${plural}!`
  );
  if (target.healthPoints <= 0) {
    console.log(`${target.name} has sustained mortal damage!`);
    console.log(target.destroy());
  } else {
    console.log(`${target.name} lives to fight on!`);
  }
};

glasowyn.normalAttack(argoroth);
argoroth.specialAttack(mage);

console.log("\n");

// * Create two new objects, one a villain and one a hero and fight it out with methods!
