class SimpleAI {
  // Make Path should: make the path, diagonal first, return the first step only
  static _makePath(start, end){
    var move = {
      x: Utils.shift(dungeon.hero.location.x - start.x),
      y: Utils.shift(dungeon.hero.location.y - start.y)
    }
    return {x: start.x + move.x, y: start.y + move.x}
  }
  // Get Move should: return true or false if open
  static _getMove(cords, dungeon){
    return dungeon.map.cell[cords.y][cords.x].open;
  }
  // Update should: move the monster from one cell to another or not
  static update(start, end, cords, dungeon){
    dungeon.map.cell.remove(Monster);
    dungeon.map.cell.add(Monster);
    this._makePath(start, dungeon.hero.location);
    this._getMove(cords, dungeon);
  }
  // Other code changes that will be needed - monster will need a moved property
}
