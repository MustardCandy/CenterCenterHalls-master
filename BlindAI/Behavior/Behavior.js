class BlindAI extends SimpleAI{
  static _chase(start, dungeon, cords){
    this._update(start, dungeon);
    if (this._update(start, dungeon) == false && this._getMove(cords, dungeon) == true) {
      //use the a^2 + b^2 = c^2 method
    } else {
      //use the a^2 + b^2 = c^2 method but take lowest value
    }
  }
}
