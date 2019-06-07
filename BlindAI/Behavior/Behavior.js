class BlindAI extends SimpleAI{

  static _hypo(start, hero){
    var xChange = hero.x - start.x;
    var yChange = hero.y - start.y;

    //use the a^2 + b^2 = c^2 method
    return Math.sqrt(Math.pow(xChange, 2) + Math.pow(yChange, 2));
  }
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

  static _getNear(start, dungeon){
    var open = this._area(start, dungeon);
    var hero = dungeon.hero.location;
    var best = Infinity;
    var index = -1;
    for (var i = 0; i < open.length; i++) {
      var hypo = this._hypo(open[i], hero)
      if (hypo < best) {
        best = hypo;
        index = i;
      }
    }
    return open[index];
  }

  static _chase(start, dungeon){
    var newCords = this._getNear(start, dungeon);
    if (this._update(start, dungeon) == false) {
      var monster = dungeon.map.cell[start.y][start.x].monster;
      monster = dungeon.map.cell[start.y][start.x].remove(monster);
      monster = dungeon.map.cell[newCords.y][newCords.x].add(monster);
    }
  }

//-----------------------------gross code------------------------------------//
//   static _chase(start, dungeon){
//
//     var check = Utils.coordinateMorphs();
//     if (this._update(start, dungeon) == false) {
//       if (dungeon.map.cell[check.y][check.x].open == true) {
//       }
//     } else {
//       //use the a^2 + b^2 = c^2 method but take lowest value
//       return Math.sqrt(Math.pow(xChange, 2) + Math.pow(yChange, 2));
//     }
//   }
}
