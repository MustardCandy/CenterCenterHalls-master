/* requires utils.js (Utils) */

class Hero{
  constructor(image, name, health, damage){
    this._image = Utils.typeCheck(image, "str", "Hero constructor: image");
    this._name = Utils.typeCheck(name, "str", "Hero constructor: name");
    this._health =  Utils.typeCheck(health, "obj", "Hero constructor: health");
    this._location = undefined;
    this._damage = Utils.typeCheck(damage, "obj", "Hero constructor: damage");
    this._inventory = [];
    this._weapon = null;
    this._armor = null;
  }

  /* _purge()
  Clears the _inventory array and the weapon & armor
  @return none;
  */
  _purge(){
    this._inventory = [];
    this._weapon = null;
    this._armor = null;
  }

  /* take(item)
  @param item: {object} an item to be added to the _inventory array
  @return none;
  */
  take(item){this._inventory.push(Utils.typeCheck(item, "obj", "Hero.take")); }

  /* drop(item)
  @param item: {string} the name field of an object to be removed from the _inventory array
  @return {object} the item removed from the _inventory
  */
  drop(item){ // breaks seperation by design
    item = Utils.typeCheck(item, "str", "Hero.drop");
    for (var i = 0; i < this._inventory.length; i++) {
      if(this._inventory[i].name === item){ return this._inventory.splice(i)[0]; }
    }
  }

  /* unequip(type)
  @param type: {string} weapon or Armor
  @return {none} function moves items from the slot to the inventory
  */
  unequip(type){
    type = Utils.whitelist(type, ["weapon", "armor"], "Hero.unequip");
    if(type == "weapon" && this.weapon !== null) {
      var item = this.weapon;
      this._weapon = null;
      this.take(item);
    }
    if(type == "armor" && this.armor !== null) {
      var item = this.armor;
      this._armor = null;
      this.take(item);
    }
  }

  /* finds item in inventory with name of name, equips it, unequips something if
  there is something in the slot already.
  @param name: {string} the .name of the item in the inventory
  */
  equip(name){
    var item = this.drop(name);
    if(["weapon", "armor"].indexOf(item.type) == -1) { this.take(item); }
    else {
      if(this[item.type] !== null) { this.unequip(item.type); }
      this[item.type] = item;
    }
  }


  // custom "getters and setters" so we can use dot notation without ()
  get attack(){
    if(this.weapon !== null){ return this.weapon.attack; }
    return Utils.randomNumber(this.damage.min, this.damage.max);
  } 

  set struck(damage){ // for player taking damage
    if(this.armor !== null){ damage -= this.armor.armor; }
    this.health.current -= damage;
  }

  get image(){ return this._image; }
  set image(string){ this._image = Utils.typeCheck(string, "str", "Hero.image"); }

  get name(){ return this._name; }
  set name(string){ this._image = Utils.typeCheck(string, "str", "Hero.name"); }

  get health(){ return this._health; }
  set health(obj){
    obj = Utils.typeCheck(obj, "obj", "Hero.health");
    if(obj.max == undefined){ obj.max = this.health.max;}
    if(obj.current > obj.max){ obj.current = obj.max;}
    this._health = obj;
  }

  get armor(){ return this._armor; }
  set armor(armor){
    armor = Utils.typeCheck(armor, "obj", "Hero.armor");
    if(armor.type == "armor"){ this._armor = armor; }
  }

  get weapon(){ return this._weapon; }
  set weapon(weapon){
    weapon = Utils.typeCheck(weapon, "obj", "Hero.weapon");
    if(weapon.type == "weapon"){ this._weapon = weapon; }
  }

  get location(){ return Utils.undefinedCheck(this._location, "Hero.location"); }
  set location(obj){ this._location = Utils.typeCheck(obj, "obj", "Hero.location"); }

  get damage(){ return this._damage; }
  set damage(int){ Utils.protectionError("Hero", "damage"); }

  get inventory() { return this._inventory; }
  set inventory(array) { Utils.protectionError("Hero", "inventory"); }

  toString(){ return this.image; }

}
