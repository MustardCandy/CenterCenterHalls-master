class Armor extends Item {

  constructor(image, name, armor, value){
    super(image, name, "armor", 20);
    this._armor = Utils.typeCheck(armor, "int", "Armor constructor: armor");
    this._value = Utils.typeCheck(value, "int", "Armor constructor: value");
  }

  get armor(){ return this._armor; }
  set armor(integer){ this._armor = Utils.typeCheck(integer, "int", "Armor.armor"); }

  get value(){ return this._value; }
  set value(integer){ this._value = Utils.typeCheck(integer, "int", "Armor.value"); }

}
