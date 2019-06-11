// requies utils.js (Utils), dungeon.js, map.js, hero.js, cell.js, monster.js, simpleAI.js
class BlindAI extends SimpleAI {

  /* _getOpen(dungeon, start)
  returns a list of open cells around the start
  */
  static _getOpen(dungeon, start){
    var morphs = Utils.coordinateMorphs(); // an array of morphs
    var openSpaces = [];

    for (var i = 0; i < morphs.length; i++) {
      var test = {x: start.x + morphs[i].x, y: start.y + morphs[i].y};
      if(dungeon.map.cell[test.y][test.x].open){
        if(test.y > -1 && test.x > -1){ openSpaces.push(test); } // chance of errors
      }
    }
    return openSpaces;
  }

  /* _getClosest(dungeon, openSpaces)
  gets the closest move to the hero from the array in openSpaces
  */
  static _getClosest(dungeon, openSpaces){
    var bestValue = Infinity;
    var bestIndex = -1;
    for (var i = 0; i < openSpaces.length; i++) {
      var test = Utils.coordinateHypo(openSpaces[i], dungeon.hero.location);
      if (test < bestValue){
        bestValue = test;
        bestIndex = i;
      }
    }
    return openSpaces[bestIndex];
  }

  static update(dungeon, start, max=11.4){
    var worked = this._update(dungeon, start);
    if(!worked){
      var coordinate = this._getClosest(dungeon, this._getOpen(dungeon, start));
      dungeon.map.cell[coordinate.y][coordinate.x].add(this._getMonster(dungeon, start));
    }
  }
}
