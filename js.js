window.ondragstart = function() { return false; } 

var fruits=new Array("elma.png","karpuz.png","hiyar.png","armut.png",
			"nar.png","mandalina.png","portakal.png","muz.png");
var closePic="close.png";
var winPic="youwin.png";
var losePic="youlose.png";
var tableID;
var tablePic;

var first=true;
var relasetBool=false;
var fi,fj;
var si,sj;
var puan=30;
var gameOver=false;
var findPic=0;
var openPicCount=0;

var butonClickSound=new Audio();
butonClickSound.src="ses1.mp3";
var loseSound=new Audio();
loseSound.src="ses2.mp3";
var winSound=new Audio();
winSound.src="ses3.mp3";
var closeSound;

var scoreBoard=new Array();
var scoreBoardLen=-1;
var person="";
function init(){
	tableID=new Array(
		new Array("a1","a2","a3","a4"),
		new Array("b1","b2","b3","b4"),
		new Array("c1","c2","c3","c4"),
		new Array("d1","d2","d3","d4"),
	);
	tablePic=new Array(
		new Array(),
		new Array(),
		new Array(),
		new Array()
	);
	allPicChange(closePic);
	var i,j;
	for(i=0;i<8;i++){
		for( j=0;j<2;j++){
			while(true){
				var randomx= Math.floor(Math.random() * 4);
				var randomy= Math.floor(Math.random() * 4);
				if(tablePic[randomx][randomy]==null){
					tablePic[randomx][randomy]	= fruits[i];
					break;
				}
			}
		}
	}

	puan=30;
	document.getElementById("puan").innerHTML="PUAN: "+puan;

	person = prompt("Please enter your name", "Harry Potter");
	if(person === null){
		person="undefined"; 
	}

	first=true;
	findPic=0;

	if(gameOver){
		closeSound.pause();
		closeSound.currentTime = 0;
		backgroundGifChange('url(myGif.gif)');
	}

	gameOver=false;
}
function relaset(){
	if(!gameOver){
		if(relasetBool){
			relasetBool=false;
			setClosePic(si,sj);
			setClosePic(fi,fj);
		}
	}
}
function clickt(i,j){
	setOpenPic(i,j);
	if(!gameOver){
		if(first){
			fi=i;
			fj=j;
			first=false;
		}else{	
			if(fi==i && fj==j) {
				setClosePic(i,j);
				puan-=3;
			}else if(si==i && sj==j && relasetBool){
				relaset();
				puan-=3;
			}else if(tablePic[i][j]==tablePic[fi][fj]){
				document.getElementById(tableID[i][j]).src = tablePic[i][j].replace('100x100','100x100');
				findPic++;
				puan+=6;
			}else{
				si=i;
				sj=j;
				relasetBool=true;
				puan-=5;
			}

			if(puan<=0){
				loseTheGame();
			}
			if(findPic==8){
				winTheGame();
			}
			first=true;
			document.getElementById("puan").innerHTML="PUAN: "+puan;
			if(gameOver){
				
				var obje=new Object();
				obje.person=person;
				obje.puan=puan;
				scoreBoard[++scoreBoardLen]=obje;
				sortAndShowNewTable();
			}
		}
	}
}

function allPicChange(pic){
	for( i=0;i<4;i++){
		for( j=0;j<4;j++){
			document.getElementById(tableID[i][j]).src = pic.replace('100x100', '100x100');
		}
	}
}
function setOpenPic(i,j){
	document.getElementById(tableID[i][j]).src = tablePic[i][j].replace('100x100','100x100');
	butonClickSound.play();
}
function setClosePic(i,j){
	document.getElementById(tableID[i][j]).src = closePic.replace('100x100','100x100');
}
function loseTheGame(){
	allPicChange(losePic);
	gameOver=true;
	loseSound.play();
	closeSound=loseSound;
	backgroundGifChange('url(loseGif.gif)');
}
function winTheGame(){
	allPicChange(winPic);
	gameOver=true;
	winSound.play();
	closeSound=winSound;
	backgroundGifChange('url(winGif.gif)');
}
function backgroundGifChange(back){
	var body = document.getElementsByTagName('center')[0];
	body.style.backgroundImage = back;
}
function sortAndShowNewTable(){
	for(var i=0;i<scoreBoardLen;i++){
		for(var j=0;j<scoreBoardLen;j++){
			if(scoreBoard[j].puan>scoreBoard[j+1].puan){
				var tmp=scoreBoard[j];
				scoreBoard[j]=scoreBoard[j+1];
				scoreBoard[j+1]=tmp;
			}
		}
	}
	var table = document.getElementById("skors");
	while(table.hasChildNodes()){
		table.removeChild(table.firstChild);
	}
	for(var i=0;i<=scoreBoardLen;i++){
				var row = table.insertRow(0);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				cell1.innerHTML = scoreBoard[i].person;
				cell2.innerHTML = scoreBoard[i].puan;
	}
}
