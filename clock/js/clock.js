var deg=0;	//旋转角度
var bigdeg=0;	//旋转角度
var hourdeg=0;	//旋转角度
var minutedeg=0;	//旋转角度
var seconddeg=0;	//旋转角度
var value=9;	//表盘刻度值
$(function() {
	
	for (var i = 0; i <24; i++) {
		if (!(i%4)) {
			deg+=6;
		};
		$('.littlercd:eq('+i+')').css({'transform':'rotate('+deg+'deg)'});
		$('.littlercd:eq(0)').clone().insertAfter('.littlercd:eq('+i+')');
		deg+=6;
	};

	for (var i = 0; i <6; i++) {
		$('.bigrcd:eq('+i+')').css({'transform':'rotate('+bigdeg+'deg)'});
		$('.bigrcd:eq(0)').clone().insertAfter('.bigrcd:eq('+i+')');
		bigdeg+=30;
	};

	bigdeg=0;
	for (var i = 0; i <12; i++) {
		$('.number:eq('+i+')').css({'transform':'rotate('+bigdeg+'deg)'}).find('span').css({'transform':'rotate('+(360-bigdeg)+'deg)'});
		$('.number:eq(0)').clone().insertAfter('.number:eq('+i+')').find('span').html(++value);
		value%=12;
		bigdeg+=30;
	};
	
	xuanZhuan();
	var secondTimer=setInterval(xuanZhuan,1000);

	function xuanZhuan() {
		var date=new Date();
		var time=date.toLocaleTimeString().slice(2).split(':');
		console.log(time);
		hourdeg=90+30*parseInt(time[0])+parseInt(time[1])/2+parseInt(time[2])/120;
		minutedeg=90+6*parseInt(time[1])+parseInt(time[2])/10;
		seconddeg=90+6*parseInt(time[2]);
		$('.hour:eq(0)').css({'transform':'rotate('+hourdeg+'deg)'});
		$('.minute:eq(0)').css({'transform':'rotate('+minutedeg+'deg)'});
		$('.second:eq(0)').css({'transform':'rotate('+seconddeg+'deg)'});
	}
	// $('.bigrcd').css('background','red');

});