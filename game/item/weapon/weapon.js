class Weapon extends Item {

  constructor(image, name, damage, value){
    super(image, name, "weapon", 30);
    this._damage = Utils.typeCheck(damage, "obj", "Weapon constructor: damage");;
    this._value = Utils.typeCheck(value, "int", "Weapon constructor: value");
  }

  get damage(){ return this._damage; }
  set damage(object){ this._damage = Utils.typeCheck(object, "obj", "Weapon.damage"); }

  get value(){ return this._value; }
  set value(integer){ this._value = Utils.typeCheck(integer, "int", "Weapon.value"); }

  get attack(){ return Utils.randomNumber(this.damage.min, this.damage.max); }

}
