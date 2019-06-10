class SimpleAi {
  //need hypotinuse
  //connot always go diagonal
  //always go diagonal first
  //only return the next step
  static _makePath(location, dungeon){
    var herocords = dungeon.hero.location;
    var monstercords = location;
    var loco = undefined;
    var bestValue = 1000000;
    var nums = Utils.coordinateMorphs();
     for (var i = 1; i < nums.length; i++) {
       var tst = {x:nums[i].x + monstercords.x, y:nums[i].y + monstercords.y};
       var distx = Math.abs(tst.x - herocords.x);
       var disty = Math.abs(tst.y - herocords.y);
       var newValue = distx + disty;
       if(newValue < bestValue){
         bestValue = newValue;
         loco = nums[i];
       }
     }

    return {x:monstercords.x + loco.x, y:monstercords.y + loco.y};
  }

// only has to check if its open
  static _getMove(cords, dungeon){
    var cell = dungeon.map.cell[cords.y][cords.x];
   return cell.open;
  }

//calls the other two functions and
  static _update(location, dungeon){
    var newcords = this._makePath(location, dungeon);
    if (this._getMove(newcords, dungeon) == true){
      var monster = dungeon.map.cell[location.y][location.x].monster;
      monster = dungeon.map.cell[location.y][location.x].remove(monster);
      dungeon.map.cell[newcords.y][newcords.x].add(monster);
      //kade is a big dumb and a big chungus
      return true
    }
    else {
      return false;
    }
  }

  static update(location, dungeon){
    this._update(location, dungeon);
  }

}
