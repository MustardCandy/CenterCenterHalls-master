class simpleAi {
  //need hypotinuse
  //connot always go diagonal
  //always go diagonal first
  //only return the next step
  static _makePath(cordsA, cordsB){
    var herocords = cordsB;
    var monstercords = cordsA;
    var loco = undefined;
    var bestValue = 1000000;
    var nums = Utils.coordinateMorphs();
     for (var i = 1; i < nums.length; i++) {
       var tst = {x:nums[i].x + monstercords.x, y:nums[i].y + monstercords.y}
       var distx = Math.abs(tst.x - monstercords.x);
       var disty = Math.abs(tst.y - monstercords.y);
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
   return dungeon.map.cell[cords.x][cords.y].open;
  }

//calls the other two functions
  static update(cordsA, cordsB, cords, dungeon){
    if(this._getMove(cordsA) == true){
      dungeon.map.cell[cordsA][cordsA].remove(Monster);
    }
    if (this._getMove(cordsB) == true){
      var newcords = _makePath(cordsA, cordsB);
      dungeon.map.cell[newcords][newcords].add(Monster);
      //kade is a big dumnb and a big chungus 
    }
    _makePath(cordsA, cordsB);
    _getMove(cords, path, dungeon);
  }
}
