var tokens_original = ["00","01","02","03","04","05","06","11","12","13","14","15","16","22","23","24","25","26","33","34","35","36","44","45","46","55","56","66"];
var tokens = ["66","55","44","33","22","11","00"];
var tokens_right =  [[]];
var tokens_left = [[]];
var movements=0;
var tokens_filled; 
var player1 = new Array(6);
var player2 = new Array(6); 
var cont=0; 
var ficha;
var flag_1;
var flag_2;
var array_to_fill = "";
function distribute(){  
    duplicate_array(); 
	delivering_tokens(player1);
    delivering_tokens(player2);
    publish_array(player1,"1");
    publish_array(player2,"2");
	var player = first_player();
	send_to_android();
	console.log(tokens_filled);
	start_game(player); 
}
function delivering_tokens(to_deliver){
	for(var i = 0; i < to_deliver.length; i++){ 
	 var number1 = random(0,tokens_filled.length);
	 //console.log("Length of tokens_filled after delete :"+tokens_filled.length);
	 var token_selected = tokens_filled[number1];
	 tokens_filled.splice(number1,1); 
     to_deliver[cont] = token_selected;
	 cont++;
	 //console.log("Position  = " + number1 +", Token =" + token_selected);
	}
	cont=0;
	console.log("Final tokens_filled Length = "+ tokens_filled.length);
}
function duplicate_array(){
   tokens_filled = tokens_original;
   console.log("Length of duplicated array  = " + tokens_filled.length);
} 
function publish_array(to_display,name){ 
   var c;
   if(name == "1"){
	   c=1;
   }
   if(name == "2"){
	   c=7;
   }
   for(var i = 0; i < to_display.length; i++){  
   		var word = to_display[i] ;
   		console.log(word);   
		if(word != undefined ){
		//}
		//else{
   		document.getElementById(c).innerHTML = name +" :  "+ word; 
		c++; 
		}
   }
   console.log("-------------------------------");
}
function first_player(){	 
	for(var x = 0; x < tokens.length; x++){
		var high_token = tokens[x]; 
		for(var i = 0 ; i < 6; i++){
			var posible_token = player1[i];
			var posible_token2 = player2[i]; 
			//console.log("Posible mula1 :" + posible_token);
			//console.log("Posible mula2 :" + posible_token2);
			if(posible_token == high_token){
			console.log("Start player1 with: "+ posible_token);
			return "player1";
			} 
	  	    if(posible_token2 == high_token){
			console.log("Start player2 with: "+ posible_token2);
			 return "player2";
			}   
		} 
	} 
}
function send_to_android(){
	
}
function start_game(who_start){   
	if(who_start == "player1"){
		// GIVE READY EVENT TO ANDROID
		// RECEIVE TOKEN AND PLACE ON CANVAS 
		// USE DRAW FUNCTION TO PLACE IT
		flag_1= true;
		console.log("PLAYER 1 MOVE");		 
	}
	if (who_start == "player2"){ 
		flag_2= true;
		console.log("PLAYER 2 MOVE"); 
	}  
} 
function launch(which_array){ 
		var dir = document.getElementById('direction').value;
		var received = document.getElementById('txt_mula').value;
		var p; 
		console.log("BEFORE TO DELETE :"+which_array ); 
		if(which_array == "1"){
	    console.log(player1);
		p = get_position(player1,received); 
		if(p !== -1){ 
		player1.splice(p,1); 
		console.log("AFTER DELETE");
		console.log(player1); 
		//publish_array(player1,"1");
		console.log("PLAYER 2 TURN");
			}
		}
		if(which_array == "2"){
		 console.log(player2);
		 p = get_position(player2,received); 
		if(p !== -1){ 
			player2.splice(p,1);
		 console.log("AFTER DELETE");
		console.log(player2);
		//publish_array(player2,"2");
		console.log("PLAYER 1 TURN");
		} 
	}
	place_token(received,dir);
	movements++;
} 
function get_position(to_find_position,variable){
	var pos = to_find_position.indexOf(variable);
	 return pos;
}
function random(low, high) { 
   return Math.floor(Math.random() * (high - low) + low);
}
function place_token(x,direction){
	if(movements === 0){
	var canv = document.getElementById('canvas1');
 	var w = canv.width/2-25;
	var h = canv.height/2-25;  
	draw(w,h,null);
	tokens_right[tokens_right.length + 1] = [w,h];
	tokens_left[tokens_left.length +1 ] = [w,h];
	}
	else{
 	   if(direction === "right"){
		var last  = tokens_right[tokens_right.length-1];
    	var cont_right_hor  = last[0]; 
    	var cont_right_ver  = last[1];
		draw(cont_right_hor + 50 ,cont_right_ver);
		tokens_right[tokens_right.length + 1] = [w,h];
	      }
	   if(direction === "left"){
	   var last  = tokens_left[tokens_left.length-1];
    	var cont_left_hor  = last[0]; 
    	var cont_left_ver  = last[1];
		draw(cont_left_hor -50  ,cont_left_ver);
		tokens_left[tokens_left.length +1 ] = [w,h];
	    }
	}
} 
function draw(xx,yy){	
	alert(xx);
	alert(yy);	
	var canvas = document.getElementById('canvas1');
	var img = document.getElementById("seis");
	var ctx = canvas.getContext('2d'); 
	 ctx.save();
	//ctx.clearRect(0,0,550,400);
	ctx.clearRect(xx,yy,950,400);
	ctx.fillStyle = "rgba(0,200,0,1)";
	ctx.shadowColor = '#999';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
	ctx.drawImage(img,xx,yy,50,50);	
}
/*
function place_left(){	
	var canvas = document.getElementById('canvas1');
	var img = document.getElementById("seis");
	var ctx = canvas.getContext('2d'); 
	var last = tokens_left[tokens_left.length-1]; 
	cont_izq_hor = last[0];
	cont_izq_ver = last[1]; 
	alert(cont_izq_hor);
	alert(cont_izq_ver); 
	//ctx.save();
	//ctx.clearRect(0,0,550,400);
	ctx.clearRect(cont_izq_hor,cont_izq_ver,950,400);
	ctx.fillStyle = "rgba(0,200,0,1)";
	ctx.shadowColor = '#999';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
	ctx.drawImage(img,cont_izq_hor,cont_izq_ver,50,50);	
}
function draw(x,y){ 
    var canvas = document.getElementById('canvas1');
	var img = document.getElementById("seis");
	var ctx = canvas.getContext('2d'); 

	//ctx.save();
	//ctx.clearRect(0,0,550,400);
	ctx.clearRect(x,y,950,400);
	ctx.fillStyle = "rgba(0,200,0,1)";
	ctx.shadowColor = '#999';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
	ctx.drawImage(img,x,y,50,50);		
	//ctx.fillRect (x,20,50,50);
	//ctx.restore(); 	
	/*x+= 1; 
	if(x = 250)
	{ 
	ctx.fillStyle = "rgba(0,200,0,1)";
	ctx.shadowColor = '#999';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
	ctx.drawImage(img,x,50,50,50); 
	}*/
	 //var looptimer = setTimeout('draw('+x+','+y+')',50); 
	
