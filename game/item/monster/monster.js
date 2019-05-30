class Monster extends Item {
/*
constructor(image, name, health, damage, behavior)
it should check the new items (health damage behavior) as int, obj, and string
it should set the index by default to 100
it should have an inventory which is a blank array.
it should have getters and setters for all these things.
it should also have an .attack getter that returns a number from min to max from this.damage
*/
  constructor(image, name, health, damage, behavior){
    super(image, name, "monster", 100);
    this._health = Utils.typeCheck(health, "int", "Monster constructor: value");
    this._damage = Utils.typeCheck(damage, "obj", "Monster constructor: damage");
    this._behavior = Utils.typeCheck(behavior, "str", "Monster constructor: behavior");
    this._inventory = [];
  }

  add(object){ Utils.typeCheck(object, "object", "Monster.add"); }
  
  remove(name){
    for (var i = 0; i < this.inventory.length; i++) {
      if(this.inventory[i].name == name){ this.inventory.splice(i, 1); }
    }
  }

  get damage(){ return this._damage; }
  set damage(object){ this._damage = Utils.typeCheck(object, "obj", "Monster.damage"); }

  get health(){ return this._health; }
  set health(integer){ this._health = Utils.typeCheck(integer, "int", "Monster.health"); }

  get attack(){ return Utils.randomNumber(this.damage.min, this.damage.max); }

  get behavior(){ return this._behavior; }
  set behavior(behavior){ this._behavior = Utils.typeCheck(behavior, "str", "Monster.behavior"); }

  get inventory(){ return this._inventory; }
  set inventory(array) {this._inventory = Utils.typeCheck(array, "array", "Monster.inventory"); }



}
