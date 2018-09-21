
//Black Panther Character Array, Points, Attack
var charName = ['blackp','Killmonger','Klaw','Okoye'];
var charHP = [200, 170, 150, 180];
var charImg = ['blackp.jpg','Killmonger.jpg','Klaw.jpg','Okoye.jpg'];
var charHit = [20, 70, 80, 40];


var userHP; var userAttack; var opponentHP; var opponentAttack; 
opponents = 1; 
var opponentAttackArray = ['attack', 'block']; 

//Start Game - Header Button
$(".startButton").on("click", function(){
	$(this).off('click');
	newGame();
});

//Play Again - Header Button
$(".restartButton").on("click", function(){

	//removes characters off the board once they've been played.
	if(startPressed = true){
	for(var i = 0; i< charName.length; i++){
		$('#'+charName[i]).remove();		
	}
	opponents = 1;
	newGame();
	}
});

// Character button values. 
function newGame(){

for(var i = 0; i < charName.length; i++){

	var character = $('<button>');
	var characterPic = $('<img>'); 
	characterPic.attr('src', '../unit-4-game/assets/images/' + charImg[i]);
	characterPic.addClass('picStyle');
	character.addClass('startStyle');
	character.attr('id', charName[i]);
	character.attr({'data-name': charName[i]});
	character.attr({'data-hp': charHP[i]});
	character.attr({'data-hit': charHit[i]});

	var hpSpan = $('<span>').addClass('characterHP').html(character.data('hp'));
	character.append(charName[i], characterPic, hpSpan);
	$('.startBtn').append(character);
}

$(document).on('click','.startStyle', function(){
	userHP = $(this).data('hp');
	$(this).removeClass('charImg startStyle').addClass('userStyle');
	$('.userChar').append($(this));

	for(var i = 0; i < charName.length; i++){
		if(charName[i] != $(this).data('name')){			
			$('#'+charName[i]).removeClass('charImg startStyle').addClass('opponentStyle');
			$('#'+charName[i]+ ' span').removeClass('characterHP');
			$('.opponentChar').append($('#'+charName[i]));
		}
	}
	chooseOpponent();
});
}

function chooseOpponent(){

//Show opponent options. 
	$(document).on('click', '.opponentStyle', function(){
		opponentHP = $(this).data('hp');
		$(this).removeClass('opponentSyle opponentChar').addClass('currentOpponent');
		$(this).children('span').attr('class','enemigoHP');
		$('.chosenOpponent').append($(this));

		opponentAttack = $(this).data('hit');
		for(var i = 0; i < charName.length; i++){
			if(charName[i] != $(this).data('name')){
				$(document).off('click','.opponentStyle');
			}
		}
		battleMode();
	});
}

//Random Attack
function generateOpponentAttack(){
	var randomAttack = opponentAttackArray[Math.floor(Math.random() * 2)];

	// if(randomAttack == 'attack'){
		// 	opponentAttack = $(this).data('hit');
		// }
}

//Calculate attacks
function displayHP(){
		$('.currentOpponent').data('hp', opponentHP);
		$('.currentOpponent span').html(opponentHP);
		$('.userStyle').data('hp', userHP);
		$('.characterHP').html(userHP);
	}

function battleMode(){
	$('.hit').on('click', function(){
		generateOpponentAttack();
		var randomAttack = opponentAttackArray[Math.floor(Math.random() * 2)];

		userAttack = $('.userStyle').data('hit');
		if(randomAttack == 'attack'){
			opponentHP = parseInt(opponentHP - userAttack)
			userHP = parseInt(userHP - opponentAttack);
			displayHP();
		}
		else{
			opponentHP = parseInt(opponentHP - userAttack);
			// userHP = parseInt(userHP - opponentAttack);
			displayHP();
		}
		console.log(randomAttack);
		console.log(opponentHP);
		console.log(userHP);
		winOrLose()
	});

	$('.spAttack').on('click', function(){
		generateOpponentAttack();
		userAttack = $('.userStyle').data('special');
		if(opponentAttack == 'block'){
			userHP = parseInt(userHP - userAttack);
			displayHP();
		}
		else{
			opponentHP = parseInt(opponentHP - userAttack);
			userHP = parseInt(userHP - opponentAttack);
			displayHP();
		}
		console.log(userHP +" "+ opponentHP);
		winOrLose()
	});

	}


//Alert if player wins or lose. 
//Note...Review timing of alerts after battles. 
function winOrLose(){	
	if (opponentHP <= 0 && (opponents != 0)){
		var enemy = $('.currentOpponent').data('name');
		$('#' + enemy).remove();
		chooseOpponent();
		opponents--;
		console.log(opponents);
	}
	if ((opponentHP <= 0) && (opponents == 0)){
		alert("Wakanda Forever! You've defeated your rival!");
		
			for(var i = 0; i< charName.length; i++){
				$('#'+charName[i]).remove();		
			}
			opponents = 1;
			newGame();
			
	}
	if (userHP <= 0){
		alert("Dwynn needs you to save Wakanda, play again");
		for(var i = 0; i< charName.length; i++){
			$('#'+charName[i]).remove();		
		}
		opponents = 1;
		newGame();
	}	
}


	




