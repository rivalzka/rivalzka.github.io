window.ondragstart = function() { return false; } 

var meyveler=new Array("elma.png","karpuz.png","hiyar.png","armut.png",
			"nar.png","mandalina.png","portakal.png","muz.png");
var closePic="close.png";
var winPic="youwin.png";
var losePic="youlose.png";
var tableID;
var tablePic;

var first=true;
var fi,fj;
var puan=30;
var gameOver=false;
var findPic=0;

var butonClickSound=new Audio();
butonClickSound.src="ses1.mp3";
var loseSound=new Audio();
loseSound.src="ses2.mp3";
var winSound=new Audio();
winSound.src="ses3.mp3";
var closeSound;

var skorboard=new Array();
var skorboardLen=-1;

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
	var i,j;
	allPicChange(closePic);
	for(i=0;i<8;i++){
		for( j=0;j<2;j++){
			while(true){
				var randomx= Math.floor(Math.random() * 4);
				var randomy= Math.floor(Math.random() * 4);
				if(tablePic[randomx][randomy]==null){
					tablePic[randomx][randomy]	= meyveler[i];
					break;
				}
			}
		}
	}
	puan=30;
	document.getElementById("puan").innerHTML="PUAN: "+puan;
	first=true;
	findPic=0;
	if(gameOver){
		closeSound.pause();
		closeSound.currentTime = 0;
		backgroundGifChange('url(myGif.gif)');
	}
	gameOver=false;
}
function clickt(i,j){
	if(!gameOver){
		if(first){
			fi=i;
			fj=j;
			first=false;
		}else{	
			if(fi==i && fj==j) {
				setClosePic(i,j);
				puan-=3;
			}else if(tablePic[i][j]==tablePic[fi][fj]){
				document.getElementById(tableID[i][j]).src = tablePic[i][j].replace('100x100','100x100');
				findPic++;
				puan+=6;
			}else{
				setClosePic(i,j);
				setClosePic(fi,fj);
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
				var person = prompt("Please enter your name", "Harry Potter");
				var obje=new Object();
				obje.person=person;
				obje.puan=puan;
				skorboard[++skorboardLen]=obje;
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
	for(var i=0;i<skorboardLen;i++){
		for(var j=0;j<skorboardLen;j++){
			if(skorboard[j].puan>skorboard[j+1].puan){
				var tmp=skorboard[j];
				skorboard[j]=skorboard[j+1];
				skorboard[j+1]=tmp;
			}
		}
	}
	var table = document.getElementById("skors");
	while(table.hasChildNodes()){
		table.removeChild(table.firstChild);
	}
	for(var i=0;i<=skorboardLen;i++){
				var row = table.insertRow(0);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				cell1.innerHTML = skorboard[i].person;
				cell2.innerHTML = skorboard[i].puan;
	}
}
var table = document.getElementById("skors");

// Create an empty <thead> element and add it to the table:
var header = table.createTHead();

// Create an empty <tr> element and add it to the first position of <thead>:
var row = header.insertRow(0);     

// Insert a new cell (<td>) at the first position of the "new" <tr> element:
var cell = row.insertCell(0);

// Add some bold text in the new cell:
cell.innerHTML = "<b>This is a table header</b>";
