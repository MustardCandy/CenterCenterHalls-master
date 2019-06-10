class BlindAi extends SimpleAi{

  static _findcords(location, dungeon){
        var nums = Utils.coordinateMorphs();
        var arr = [];
        for (var i = 0; i < nums.length; i++) {
          var tst = {x:location.x + nums[i].x, y:location.y + nums[i].y};
          if(dungeon.map.cell[tst.y][tst.x].open){
            arr.push(tst);
        }
      }
      return arr;
    }

    static _Path(location, dungeon){
      var herocords = dungeon.hero.location;
      var monstercords = location;
      var loco = undefined;
      var bestValue = 1000000;
      var nums = this._findcords(location, dungeon);
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



  static _move(cords, dungeon){
    this._getmove(cords, dungeon);
  }

  static _date(location, dungeon){
    var path = this._Path(location, dungeon);
    if(this._update(location, dungeon) !== true) {
      var monster = dungeon.map.cell[location.y][location.x].monster;
      monster = dungeon.map.cell[location.y][location.x].remove(monster);
      dungeon.map.cell[path.y][path.x].add(monster);
    }
  }

}
