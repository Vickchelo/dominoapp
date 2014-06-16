var tokens_original = ["00","01","02","03","04","05","06","11","12","13","14","15","16","22","23","24","25","26","33","34","35","36","44","45","46","55","56","66"];
var tokens_filled; 
var player1 = new Array(6);
var player2 = new Array(6); 
var cont=0; 
var ficha;
var array_to_fill = ""; 
function distribute(){ 
    duplicate_array(); 
	delivering_tokens(player1);
    delivering_tokens(player2);
    publish_array(player1);
    publish_array(player2);
   var first_player = evaluate_mula(66); 
	send_to_android();
	console.log("Tokens rests :" + tokens_filled);
	start_game(first_player);
}
function delivering_tokens(to_deliver){
	for(var i = 0; i < 6; i++){ 
	 var number1 = random(0,tokens_filled.length);
	 console.log("Length of tokens_filled after delete :"+tokens_filled.length);
	 var token_selected = tokens_filled[number1];
	 tokens_filled.splice(number1,1); 
     to_deliver[cont] = token_selected;
	 cont++;
	 console.log("Position  = " + number1 +", Token =" + token_selected);
	}
	cont=0;
	console.log("Final tokens_filled Length = "+ tokens_filled.length);
}
function duplicate_array(){
   tokens_filled = tokens_original;
   console.log("Length of duplicated array  = " + tokens_filled.length);
} 
function publish_array(to_display){ 
   for(var i = 0; i < 6; i++){  
   var word = to_display[i] ;
   // CREATE TOKENS WITH IMAGES AND SEND TO PLAYERS
   console.log(word);
   if(word == "undefined"){
 	console.log(to_display + "- Position = " + i + ", Value = " + to_display[i]);
   	} 
   }
   console.log("-------------------------------");
}
function evaluate_mula(to_find){	 
	for(var j = 0; j <= 6; j++){
		var mula = player1[j];
		var mula2 = player2[j];
		console.log("Posible mula 1: "+ mula)
		console.log("Posible mula 2: "+ mula2)
		if(mula == to_find ){
			console.log("Start player1 with :" + mula);
			return "player1"; 
		}	
		else if(mula2 == to_find){
			console.log("Start player2 with: "+ mula2);
			return "player2";	 
		}
	}
	evaluate_mula(to_find-11)
	console.log("Mula to find : " + to_find);
}
function send_to_android(){
	
}
function start_game(who_start){ 
	 alert(who_start); 
	if(who_start == "player1"){
		// GIVE READY EVENT TO ANDROID
		// RECEIVE TOKEN AND PLACE ON CANVAS 
		// USE DRAW FUNCTION TO PLACE IT
		console.log("TYPE YOUR PLAYER");
		var player1 = console.read;
		var oldf = console.read; 
	}
	if (who_start == "player2"){
		console.log("TYPE YOUR PLAYER 2");
		var player1 = console.read;
		var oldf = console.read; 
		alert(player1);
	}
	
}
function random(low, high) { 
   return Math.floor(Math.random() * (high - low) + low);
}
function draw(x,y){ 
var canvas = document.getElementById('canvas1');
	 var img = document.getElementById("seis");
	var ctx = canvas.getContext('2d'); 

	ctx.save();
	//ctx.clearRect(0,0,550,400);
	 ctx.clearRect(0,0,950,400);
	ctx.fillStyle = "rgba(0,200,0,1)";
	ctx.shadowColor = '#999';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
	   ctx.drawImage(img,x,0,50,50);		
	//ctx.fillRect (x,20,50,50);
	ctx.restore(); 	
	x+= 1; 
	if(x = 250)
	{ 
	ctx.fillStyle = "rgba(0,200,0,1)";
	ctx.shadowColor = '#999';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
	ctx.drawImage(img,x,50,50,50); 
	}
	var looptimer = setTimeout('draw('+x+','+y+')',50); 

}
function place_token(x){
 
}
