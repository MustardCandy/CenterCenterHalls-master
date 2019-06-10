// requies utils.js (Utils), dungeon.js, map.js, hero.js, cell.js, monster.js

class SimpleAI {
  /*  A simple AI function that walks into walls and tries to make the monst
      direct path from it to the player
  */

  /* _getMonster(dungeon, coordinates)
    gets a monster from the coordinates
  */
  static _getMonster(dungeon, coordinates){
    var cell = dungeon.map.cell[coordinates.y][coordinates.x];
    for (var i = 0; i < cell.inventory.length; i++) { // this should never not return
      if (cell.inventory[i].type == "monster") {
        return cell.remove(cell.inventory[i].name); }
    }
  }

  /* _update(dungeon, start, max=8.5)
    an internal update function so it can be wrapped for different behavior
  */
  static _update(dungeon, start, max=8.5){ // 8.5 is about 6 by 6
    var coordinate = this.makePath(start, dungeon.hero.location);
    var distance = Utils.coordinateHypo(start, dungeon.hero.location);
    if(this.getMove(dungeon, coordinate) && distance < max){
      dungeon.map.cell[coordinate.y][coordinate.x].add(this._getMonster(dungeon, start));
      return true;
    }
    else { return false; }
  }

  /*  makePath(start, end)
   makes the first step in a quickest path on the grid
  */
  static makePath(start, end){
    var step = {x: Utils.shift(end.x - start.x), y: Utils.shift(end.y - start.y)};
    return {x: start.x + step.x, y: start.y + step.y}
  }

  /* getMove(dungeon, coordinates)
    returns a true or false if the move can happen
  */
  static getMove(dungeon, coordinates){
    return dungeon.map.cell[coordinates.y][coordinates.x].open;
  }


  static update(dungeon, start){
    this._update(dungeon, start);
  }
}
