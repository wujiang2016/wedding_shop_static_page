var arr=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var brr=[
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
];
var crr=[
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
];
var $=function(obj){
	return document.getElementById(obj);
};
for (var i = 0; i < arr.length; i++) {
	for (var j = 0; j < arr[i].length; j++) {
		var vesselCellId="vessel-cell-"+i+"-"+j;
		var nodeVesselCell=$(vesselCellId);
		nodeVesselCell.style.top=20+120*i+"px";
		nodeVesselCell.style.left=20+120*j+"px";
	}
};
initial();

// for (key in window) {
// 	console.log(key);
// };
//方向键按下事件触发
window.onkeydown=function(e){
	switch(e.keyCode){
		case 37:
			toLeftMove();
			
			break;
		case 38:
			toUpMove();
			break;
		case 39:
			toRightMove();
			break;
		case 40:
			toDownMove();
			break;
		default:
			break;
	}
	calculatePoint(arr);
};

//判断是否Game Over
function isGameOver(arr){
	if (hasEmpty(arr)) {
		return false;
	};
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			if ((i!=arr.length-1)&&(arr[i][j]==arr[i+1][j])) {
				return false;			
			};
			if ((j!=arr[i].length-1)&&(arr[i][j]==arr[i][j+1])) {
				return false;
			};
		}
	};
	return true;
}
//给数组赋值，记录二维数组的初始值
function giveValueToArray(arr,crr){
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			crr[i][j]=arr[i][j];			
		}
	};
};
//判断二维数组相等
function arrayIsEqual(arr,crr){
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			if(crr[i][j]!=arr[i][j])
				return false;			
		}
	};
	return true;
}
//计算总分数
function calculatePoint(arr){
	var point=0;
	var len=arr.length;
	for (var i = 0; i < len; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			point+=arr[i][j];			
		}
	};
	$("score").innerHTML=point;
}
//向左移动
function toLeftMove(){
	giveValueToArray(arr,crr);
	zeroToBehind(arr);
	sumToLeft(arr);
	zeroToBehind(arr);
	if (!arrayIsEqual(arr,crr)) {
		generateNumber();
	};
	
	giveValueToVesselCell();
	if (isGameOver(arr)) {
		if(window.confirm("游戏结束,是否重玩？")){
			initial();
		};
	};

}
//向右移动
function toRightMove(){
	giveValueToArray(arr,crr);
	zeroToFront(arr);
	sumToRight(arr);
	zeroToFront(arr);
	if (!arrayIsEqual(arr,crr)) {
		generateNumber();
	};
	
	giveValueToVesselCell();
	if (isGameOver(arr)) {
		if(window.confirm("游戏结束,是否重玩？")){
			initial();
		};
	};

}
//向上移动
function toUpMove(){
	giveValueToArray(arr,crr);
	arrayClockwiseRotate(arr,brr)
	zeroToFront(brr);
	sumToRight(brr);
	zeroToFront(brr);
	arrayAntiClockwiseRotate(brr,arr);
	if (!arrayIsEqual(arr,crr)) {
		generateNumber();
	};
	
	giveValueToVesselCell();
	if (isGameOver(arr)) {
		if(window.confirm("游戏结束,是否重玩？")){
			initial();
		};
	};

}
//向下移动
function toDownMove(){
	giveValueToArray(arr,crr);
	arrayClockwiseRotate(arr,brr)
	zeroToBehind(brr);
	sumToLeft(brr);
	zeroToBehind(brr);
	arrayAntiClockwiseRotate(brr,arr);
	if (!arrayIsEqual(arr,crr)) {
		generateNumber();
	};
	
	giveValueToVesselCell();
	if (isGameOver(arr)) {
		if(window.confirm("游戏结束,是否重玩？")){
			initial();
		};
	};

}
// zeroToBehind(arr);
// console.log(arr[0]);
//二维数组顺时针旋转90°
function arrayClockwiseRotate(arr,brr){
	var len=arr.length;
	for (var i = 0; i < len; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			brr[j][len-1-i]=arr[i][j];			
		}
	};
	return brr;
}
//二维数组逆时针旋转90°
function arrayAntiClockwiseRotate(brr,arr){
	var len=brr.length;
	for (var i = 0; i < len; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			arr[len-1-j][i]=brr[i][j];			
		}
	};
	return arr;
}
//相邻往左加,arr二维数组
function sumToLeft(arr){
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length-1; j++) {
			if (arr[i][j]==0) {
				break;
			}else if (arr[i][j]==arr[i][j+1]) {
				arr[i][j]+=arr[i][j+1];
				arr[i][j+1]=0;
				j++;
			};
			
		}
	};
	return arr;
}
//相邻往右加,arr二维数组
function sumToRight(arr){
	for (var i = 0; i < arr.length; i++) {
		for (var j = arr[i].length-1; j >0 ; j--) {
			console.log(arr);
			if (arr[i][j]==0) {
				break;
			}else if (arr[i][j]==arr[i][j-1]) {
				arr[i][j]+=arr[i][j-1];
				arr[i][j-1]=0;
				j--;
			};
			
		}
	};
	return arr;
}
// 把零放在数组最上面，arr二维数组
function zeroToUp(arr){
	for (var i = 0; i < arr.length; i++) {
		var len=arr[i].length;
		arr[i]=removeZero(arr[i]);
		while(len>arr[i].length){
			arr[i].push(0);
		}
	};
		console.log(arr);
	return arr;
}
// 把零放在数组最后，arr二维数组
function zeroToBehind(arr){
	for (var i = 0; i < arr.length; i++) {
		var len=arr[i].length;
		arr[i]=removeZero(arr[i]);
		while(len>arr[i].length){
			arr[i].push(0);
		}
	};
		console.log(arr);
	return arr;
}
// 把零放在数组最前，arr二维数组
function zeroToFront(arr){
	for (var i = 0; i < arr.length; i++) {
		var len=arr[i].length;
		arr[i]=removeZero(arr[i]);
		while(len>arr[i].length){
			arr[i].unshift(0);
		}
	};
	
	return arr;
}
//去掉数组中的零，arr一维数组
function removeZero(arr){
	for (var i = 0; i < arr.length; i++) {
		if(arr[i]==0){
			arr.splice(i,1);
			i--;
		}
	};
	return arr;
}
// 初始化赋值
function initial(){
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			arr[i][j]=0;
		}
	};
	generateNumber();
	generateNumber();
	giveValueToVesselCell();
	calculatePoint(arr);
}

//给vesselCell赋值
function giveValueToVesselCell(){
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			var vesselCellId="vessel-cell-"+i+"-"+j;
			var nodeVesselCell=$(vesselCellId);
			if (arr[i][j]>0) {
				nodeVesselCell.innerHTML=arr[i][j];
		// 		if (arr[i][j]==2) {
		// // 			nodeVesselCell.setAttribute("style","background: #EEE4DA;
		// // 				top=20+120*i+"px";
		// // nodeVesselCell.style.left=20+120*j+"px";
		// // 				");
		// 			nodeVesselCell.style.top=20+120*i+"px";
		// 			nodeVesselCell.style.left=20+120*j+"px";
		// 			nodeVesselCell.style.backgroundColor="#EEE4DA";

		// 		};
				switch(arr[i][j]){
					case 2:
						nodeVesselCell.style.top=20+120*i+"px";
						nodeVesselCell.style.left=20+120*j+"px";
						nodeVesselCell.style.backgroundColor="#EEE4DA";
						nodeVesselCell.style.color="black";
						break;
					case 4:
						nodeVesselCell.style.top=20+120*i+"px";
						nodeVesselCell.style.left=20+120*j+"px";
						nodeVesselCell.style.backgroundColor="#ECE0C8";
						nodeVesselCell.style.color="black";
						break;
					case 8:
						nodeVesselCell.style.top=20+120*i+"px";
						nodeVesselCell.style.left=20+120*j+"px";
						nodeVesselCell.style.backgroundColor="#F2B179";
						nodeVesselCell.style.color="white";
						break;
					case 16:
						nodeVesselCell.style.top=20+120*i+"px";
						nodeVesselCell.style.left=20+120*j+"px";
						nodeVesselCell.style.backgroundColor="#F59563";
						nodeVesselCell.style.color="white";
						break;
					case 32:
						nodeVesselCell.style.top=20+120*i+"px";
						nodeVesselCell.style.left=20+120*j+"px";
						nodeVesselCell.style.backgroundColor="#F57C5F";
						nodeVesselCell.style.color="white";
						break;
					case 64:
						nodeVesselCell.style.top=20+120*i+"px";
						nodeVesselCell.style.left=20+120*j+"px";
						nodeVesselCell.style.backgroundColor="#F65D3B";
						nodeVesselCell.style.color="white";
						break;
					case 128:
						nodeVesselCell.style.top=20+120*i+"px";
						nodeVesselCell.style.left=20+120*j+"px";
						nodeVesselCell.style.backgroundColor="#EDCE71";
						nodeVesselCell.style.color="white";
						break;
					case 256:
						nodeVesselCell.style.top=20+120*i+"px";
						nodeVesselCell.style.left=20+120*j+"px";
						nodeVesselCell.style.backgroundColor="maroon";
						nodeVesselCell.style.color="white";
						break;
					case 512:
						nodeVesselCell.style.top=20+120*i+"px";
						nodeVesselCell.style.left=20+120*j+"px";
						nodeVesselCell.style.backgroundColor="blue";
						nodeVesselCell.style.color="white";
						break;
					case 1024:
						nodeVesselCell.style.top=20+120*i+"px";
						nodeVesselCell.style.left=20+120*j+"px";
						nodeVesselCell.style.backgroundColor="green";
						nodeVesselCell.style.color="white";
						break;
					case 2048:
						nodeVesselCell.style.top=20+120*i+"px";
						nodeVesselCell.style.left=20+120*j+"px";
						nodeVesselCell.style.backgroundColor="black";
						nodeVesselCell.style.color="white";
						alert("恭喜！你通关了！");
						break;
					default:
						break;
					// nodeVesselCell.style.backgroundColor=#CCC0B2;
				}
			}else{
				nodeVesselCell.innerHTML="";
				nodeVesselCell.style.backgroundColor="#CCC0B2";
			}
		}
	};
}

// 生成数字
function generateNumber(){
	if (!hasEmpty(arr)) {

		return false;
	};
	while(true){
		var x=Math.floor(Math.random()*4);
		var y=Math.floor(Math.random()*4);
		if (arr[x][y]==0) {
			if (Math.floor(Math.random()*10)>6) {
				arr[x][y]=4;
				break;
			}else{
				arr[x][y]=2;
				break;
			}
		};
	}
}
//判断数组是否还有空值
function hasEmpty(arr){
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			if(arr[i][j]==0) return true;
		};
	};
	return false;
}