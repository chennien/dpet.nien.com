"use strict";

$.ajaxSetup({scriptCharset: "utf-8", cache: true});
$.wait = function(ms){
	var d = $.Deferred();
	setTimeout(function(){
		d.resolve();
	}, ms);
	return d;
};

function msg(txt, btn, callback){
	txt = (txt || "").toString();
	btn = btn || "好的";
	callback = callback || function(){};

	if($(".alertify-cover:visible").length>0){
		$.wait(1500).then(function(){
			msg(txt, btn, callback);
		});
	}
	else{
		alertify.set({labels:{ok: btn}});
		alertify.alert('<i class="far fa-info-circle"></i> '+(txt || "這個功能還沒寫 😅"), callback);
	}
}

function loading(on){
	var $b = $("body");
	if(on)
		$b.addClass("loading").delay(3500).queue(function(){
			$(this).removeClass("loading").dequeue();
		});
	else
		$b.removeClass("loading");
}

function share(){
	if("share" in navigator)
		navigator.share({
			title: document.title, 
			url: "https://go.nien.co/3i7NcpU"
		}).catch(function(e){});
}

function comments(on){
	var $c = $(".comments");
	if(on) $c.slideDown();
	else $c.slideUp();
}


$(function(){
// feed
	if(!!$(".screen .feed").length){
		// 點愛心
		$(".kits .heart").on("click", function(){
			$(this).toggleClass("is-active");
		});
			$(".feed video").on("dblclick", function(){
				$(".kits .heart").toggleClass("is-active");
			});

		// 已上傳
		if(location.href.indexOf("uploaded")>0){
			$(".feed .cat").show();
			setTimeout(function(){
				$(".feed").scrollTop(0);
			}, 100);
			msg("你的影片已發布囉~", "灑花");
		}
	}

// camera
	// davidwalsh.name/demo/camera.php
	var camera = $(".screen .camera");
	if(!!camera.length){
		if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({video: true}).then(function(stream){
				camera = camera.get(0);
				camera.srcObject = stream;
				camera.play();
			});
		}
	}

});
