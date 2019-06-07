//class that uses SimpleAI but then finds shortest distance to hero
class BlindAI extends SimpleAI{

  //finds hypotenuse of the triangle made by hero and monster
  static _hypo(start, hero){
    var xChange = hero.x - start.x;
    var yChange = hero.y - start.y;
    //uses the a^2 + b^2 = c^2 method to get hypotenuse
    return Math.sqrt(Math.pow(xChange, 2) + Math.pow(yChange, 2));
  }

  //finds all of the areas that are open around the monster
  static _area(start, dungeon){
    var check = Utils.coordinateMorphs();
    var retArr = [];
    for (var i = 0; i < check.length; i++) {
      var tst = {x: start.x + check[i].x, y: start.y + check[i].y};
      if (dungeon.map.cell[tst.y][tst.x].open) {
        retArr.push(tst);
      }
    }
    return retArr;
  }

  //uses _hypo on all open location and finds the nearest hypotenuse
  static _getNear(start, dungeon){
    var open = this._area(start, dungeon);
    var hero = dungeon.hero.location;
    var best = Infinity;
    var index = -1;
    for (var i = 0; i < open.length; i++) {
      var hypo = this._hypo(open[i], hero);
      if (hypo < best) {
        best = hypo;
        index = i;
      }
    }
    return open[index];
  }

  //puts all functions together and moves the monster
  static _chase(start, dungeon){
    var newCords = this._getNear(start, dungeon);
    if (this._update(start, dungeon) == false) {
      var monster = dungeon.map.cell[start.y][start.x].monster;
      monster = dungeon.map.cell[start.y][start.x].remove(monster);
      monster = dungeon.map.cell[newCords.y][newCords.x].add(monster);
    }
  }
}
