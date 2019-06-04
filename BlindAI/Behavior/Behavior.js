class BlindAI extends SimpleAI{
  static _chase(start, dungeon){
    var xChange = dungeon.hero.location.x - start.x;
    var yChange = dungeon.hero.location.y - start.y;
    if (this._update(start, dungeon) == false) {
      //use the a^2 + b^2 = c^2 method
      return Math.sqrt(Math.pow(xChange, 2) + Math.pow(yChange, 2));
    // } else {
    //   //use the a^2 + b^2 = c^2 method but take lowest value
    //   return Math.sqrt(Math.pow(start, 2) + Math.pow(dungeon, 2));
    }
  }
}
