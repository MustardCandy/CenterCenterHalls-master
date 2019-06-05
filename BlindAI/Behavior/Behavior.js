class BlindAI extends SimpleAI{
  static _chase(start, dungeon, cords){
    if (this._update(start, dungeon) == false) {
      //use the a^2 + b^2 = c^2 method
      return Math.sqrt(Math.pow(start, 2) + Math.pow(dungeon, 2));
    } else {
      //use the a^2 + b^2 = c^2 method but take lowest value

    }
  }
}
