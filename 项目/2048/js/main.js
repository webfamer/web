
var border = new Array();
var hasConflicted = new Array();
    $(function () {
        newgame();
    $(".newgame").click(function () {
        newgame();
    });//建立新游戏

var score = 0;
    function newgame() {
        // 初始化
        init();
        //随机生成2个数
        creatNum();
        creatNum();
    }
    function init() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                $("#square-" + i + "-" + j + "").css({"top": getTop(j) + "px", "left": getLeft(i) + "px"});
            }
        }

        for (var i = 0; i < 4; i++) {
            border[i] = new Array();
            hasConflicted[i] = new Array();
            for (var j = 0; j < 4; j++) {
                border[i][j] = 0;
                hasConflicted[i][j] = false;
            }
        }
        initCell();
        score = 0;//分数清零
    }
    function creatNum() {
        //生成随机位置并在棋盘上展示出来
        randomPosition();
    }

    /*游戏逻辑部分*/
  $(document).keydown(function (event) {
      event.preventDefault();
      // console.log(hasConflicted);
      // console.log("keycode" +event.keyCode);
      switch (event.keyCode){
          /*left*/case 37:
              // console.log("choosed 37");
              if(moveLeft()){
                  setTimeout(function () {
                      creatNum()
                  },200);
                  setTimeout(function () {
                      isGameover();
                  },300);
            }
            break;
          /*up*/case 38:
          if(moveUp()){
              setTimeout(function () {
                  creatNum()
              },200);
              setTimeout(function () {
                  isGameover();
              },300);
          }
          break;
          /*right*/case  39:
          if(moveRight()){
              setTimeout(function () {
                  creatNum()
              },200);
              setTimeout(function () {
                  isGameover();
              },300);
          }
          break;
          /*down*/case  40:
          if(moveDown()){
              setTimeout(function () {
                  creatNum()
              },200);
              setTimeout(function () {
                  isGameover();
              },300);
          }
          break;
          default:
              break;
      }
  })
        function isGameover() {
            if(nospace(border)&&nomove(border)){
                gameover();
            }
        }
        function moveLeft() {
                // console.log("used moveleft")
            if(!canMoveLeft){
                return false;
            }
        for(var i=0;i<4;i++){
                for(var j=1;j<4;j++){
                    if(border[i][j]!=0){//先保证有数字
                        for(var k=0;k<j;k++){
                            if(border[i][k] ==0&&noBlockHinder(i,k,j,border)){//可以移动
                                // console.log("nohinder");
                                showMoveAnimation(i,j,i,k);
                                border[i][k] = border[i][j];
                                border[i][j]=0;
                                continue;
                            }
                             else if(border[i][k]==border[i][j]&&noBlockHinder(i,k,j,border)&&!hasConflicted[i][k]){
                                showMoveAnimation(i,j,i,k);
                                border[i][k] +=border[i][j];
                                score += border[i][k]
                                showScore(score);
                                border[i][j] =0;
                                hasConflicted[i][k] = true;
                                continue;
                            }
                        }
                    }
                }

            }

            setTimeout(function(){
                initCell();
            },200);
            return true;
        }
        function moveRight() {
            // console.log("used moveleft")
            if(!canMoveRight){
                return false;
            }
            for(var i=0;i<4;i++){
                for(var j=2;j>=0;j--){
                    if(border[i][j]!=0){//先保证有数字
                        for(var k=3;k>j;k--){
                            if(border[i][k] ==0&&noBlockHinderRight(i,k,j,border)){//可以移动
                                // console.log("nohinder");
                                showMoveAnimation(i,j,i,k);
                                border[i][k] = border[i][j];
                                border[i][j]=0;
                                continue;
                            }
                            else if(border[i][k]==border[i][j]&&noBlockHinderRight(i,k,j,border)&&!hasConflicted[i][k]){
                                showMoveAnimation(i,j,i,k);
                                border[i][k] +=border[i][j];
                                score += border[i][k]
                                showScore(score);
                                border[i][j] =0;
                                hasConflicted[i][k] = true;
                                continue;
                            }
                        }
                    }
                }

            }

            setTimeout(function(){
                initCell();
            },200);
            return true;
        }
        function moveUp() {
            if(!canMoveUp){
                return false;
            }
            for(var i=1;i<4;i++){
                for(var j=0;j<4;j++){
                    if(border[i][j]!=0){//先保证有数字
                        for(var k=0;k<i;k++){
                            if(border[k][j] ==0&&noBlockHinderUp(j,k,i,border)){//可以移动
                                // console.log("nohinder");
                                showMoveAnimation(i,j,k,j);
                                border[k][j] = border[i][j];
                                border[i][j]=0;
                                continue;
                            }
                            else if(border[k][j]==border[i][j]&&noBlockHinderUp(j,k,i,border)&&!hasConflicted[k][j]){
                                showMoveAnimation(i,j,k,j);
                                border[k][j] +=border[i][j];
                                score += border[i][k]
                                showScore(score);
                                border[i][j] =0;
                                hasConflicted[k][j] = true;
                                continue;
                            }
                        }
                    }
                }

            }

            setTimeout(function(){
                initCell();
            },200);
            return true;
        }
        function moveDown() {
            if(!canMoveDown){
                return false;
            }
            for(var i=0;i<3;i++){
                for(var j=0;j<4;j++){
                    if(border[i][j]!=0){//先保证有数字
                        for(var k=3;k>i;k--){
                            if(border[k][j] ==0&&noBlockHinderDown(j,k,i,border)){//可以移动
                                // console.log("nohinder");
                                showMoveAnimation(i,j,k,j);
                                border[k][j] = border[i][j];
                                border[i][j]=0;
                                continue;
                            }
                            else if(border[k][j]==border[i][j]&&noBlockHinderDown(j,k,i,border)&&!hasConflicted[k][j]){
                                showMoveAnimation(i,j,k,j);
                                border[k][j] +=border[i][j];
                                score += border[i][k]
                                showScore(score);
                                border[i][j] =0;
                                hasConflicted[k][j] = true;
                                continue;
                            }
                        }
                    }
                }

            }

            setTimeout(function(){
                initCell();
            },200);
            return true;
        }

    })
