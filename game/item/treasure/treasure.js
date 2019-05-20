class Treasure extends Item {

  constructor(image, value){
    super(image, "coin", "treasure", 1);
    this._value = Utils.typeCheck(value, "int", "Treasure constructor: value");
  }

  get value(){ return this._value; }
  set value(integer){ this._value = Utils.typeCheck(integer, "int", "Treasure.value"); }

  get name(){
    if(this.value == 1){ return "1 coin.";}
    return this.value + " coins.";
  }
  set name(dont){ Utils.protectionError("name", "Treasue.name (coin)"); }

}
