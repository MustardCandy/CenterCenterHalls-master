class BlindAI extends SimpleAI{
  static _chase(start, dungeon){
    var xChange = dungeon.hero.location.x - start.x;
    var yChange = dungeon.hero.location.y - start.y;
    var check = Utils.coordinateMorphs("all");
    console.log(check);
    if (this._update(start, dungeon) == false) {
      if (dungeon.map.cell[check.y][check.x].open == true) {
        var munstor = Math.min(Math.sqrt(Math.pow(check, 2) + Math.pow(check, 2)));
        var monstur = dungeon.map.cell[start.y][start.x].monster;
        monstur = dungeon.map.cell[start.y][start.x].remove(monstur);
        monstur = dungeon.map.cell[munstor.y][munstor.x].add(monstur);
      }
      //use the a^2 + b^2 = c^2 method
      return Math.sqrt(Math.pow(xChange, 2) + Math.pow(yChange, 2));
    // } else {
    //   //use the a^2 + b^2 = c^2 method but take lowest value
    //   return Math.sqrt(Math.pow(xChange, 2) + Math.pow(yChange, 2));
    }
  }
}
