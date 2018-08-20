
function getLeft(i) {
    return 20+120*i;
}//计算left
function getTop(j) {
    return 20+120*j

}//计算top

function initCell() {
$(".numcell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            // border[i][j] =0;
            // $(".numcell").text("");
            hasConflicted[i][j] = false;
            $("#container").append('<div class="numcell" id="num-'+i+'-'+j+'"></div>')
            var numcell = $("#num-"+i+"-"+j+"");
           if(border[i][j] ==0){
               numcell.css({
                   width:0,
                   height:0,
                   top:getTop(i)+50,
                   left:getLeft(j)+50
               })
           }else{
               numcell.css({
                   width:"100px",
                   height:"100px",
                   top:getTop(i),
                   left:getLeft(j),
                   background:getBackgroundcolor(border[i][j]),
                   color:getColor(border[i][j])
               });
               numcell.text(border[i][j]);
           }
        }
    }
}//初始化格子
function randomPosition() {//生成随机位置
    var x = Math.floor(Math.random() * 4);
    var y = Math.floor(Math.random() * 4);
    //生成随机数字
    var num = Math.random() < 0.5 ? 2 : 4;

    // console.log(x,y,num);
    var times = 0;
    while(times<50){
        if (border[x][y] ==0) {
            break;
        } else {
            var x = Math.floor(Math.random() * 4);
            var y = Math.floor(Math.random() * 4);
        }
        times++;
    }
    if(times == 50){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(border[i][j]==0){
                    x =i;
                    y =j;
                }
            }
        }
    }
        border[x][y] = num;
        showChess(x, y, num);
}//随机生成位置
function  showChess(x,y,value) {
    var numcell = $("#num-"+x+"-"+y+"");
    // border[x][y] = value;
    // console.log(border);
    numcell.css({
        backgroundColor:getBackgroundcolor(value),
        color:getColor(value),
    })
        .text(value)
        .animate({
            width:'100px',
            height:'100px',
            top:getTop(x),
            left:getLeft(y)
        },50);
}//在棋盘上展示出来

function nospace(border) {//判断还有没有位置可以生成，原理是如果二维数组里没有一个值是0的话，就表示没位置了
    for(var i =0;i<4;i++){
        for(var j=0;j<4;j++){
            if(border[i][j] ==0){
                return false;
            }else{
                return true;
            }
        }
    }

}//判断是否有剩余空间

function getBackgroundcolor(s) {
    switch (s){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
}//判断背景颜色

function getColor(s) {
    if(s<=4){
        return "#CACAD9"
    }else{
        return "white";
    }

}//判断数字颜色
function canMoveLeft(border) {
    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++)
            if(border[i][j]!=0)
                if(border[i][j-1]==0||border[i][j-1]==border[i][j])
                    return true;
    return false;

}//判断是否能左移
function canMoveUp(border) {
    for(var i=1;i<4;i++)
        for(var j=0;j<4;j++)
            if(border[i][j]!=0)
                if(border[i-1][j]==0||border[i-1][j]==border[i][j])
                    return true;
    return false;

}//判断是否能上移
function canMoveRight(border) {
    for(var i=0;i<4;i++)
        for(var j=0;j<3;j++)
            if(border[i][j]!=0)
                if(border[i][j+1]==0||border[i][j+1]==border[i][j])
                    return true;
    return false;

}//判断是否能右移
function canMoveDown(border) {
    for(var i=0;i<3;i++)
        for(var j=0;j<4;j++)
            if(border[i][j]!=0)
                if(border[i+1][j]==0||border[i+1][j]==border[i][j])
                    return true;
    return false;

}//判断是否能下移
function noBlockHinder(row,col1,col2,border) {
    for(var i =col1+1;i<col2;i++){
        if(border[row][i] !=0)
            return false;
    }
    return true;
}//判断中间格是否为0行
function noBlockHinderRight(row,col1,col2,border) {
    for(var i =col1-1;i>col2;i--){
        if(border[row][i] !=0)
            return false;
    }
    return true;
}//判断中间格是否为0行
function noBlockHinderUp(col,row1,row2,border) {
    for(var i =row1+1;i<row2;i++){
        if(border[i][col] !=0)
            return false;
    }
    return true;
}//判断中间格是否为0行
function noBlockHinderDown(col,row1,row2,border) {
    for(var i =row1-1;i>row2;i--){
        if(border[i][col] !=0)
            return false;
    }
    return true;
}//判断中间格是否为0行
function showMoveAnimation(fromX,fromY,toX,toY) {
    // console.log(fromX,fromY,toX,toY)
    var numcell = $('#num-'+fromX+'-'+fromY+'');
    // console.log(numcell);
    numcell.animate({
        top:getTop(toX),
        left:getLeft(toY)
    },200);
}
function nomove(border) {
    if(canMoveLeft(border)||canMoveRight(border)||canMoveDown(border)||canMoveUp(border)){
        return false;
    }
    return true;
} //判断是否还能移动
function gameover() {
    alert("gameover");
}
function showScore(score) {
    $(".score span").text(score);
}