class BlindAI extends SimpleAI{
  static _chase(start, dungeon, cords){
    if (this._update(start, dungeon) == false) {
      return Math.sqrt(Math.pow(start, 2) + Math.pow(dungeon, 2));
    } else {

    }
  }
}
