//CODE FOR HANDLING NAV BUTTONS AND FUNCTION BUTTONS

function FocusAButton(){
	if (document.getElementById('CheckButton1') != null){
		document.getElementById('CheckButton1').focus();
	}
	else{
		if (document.getElementById('CheckButton2') != null){
			document.getElementById('CheckButton2').focus();
		}
		else{
			document.getElementsByTagName('button')[0].focus();
		}
	}
}




//CODE FOR HANDLING DISPLAY OF POPUP FEEDBACK BOX

var topZ = 1000;

function ShowMessage(Feedback){
	var Output = Feedback + '<br /><br />';
	document.getElementById('FeedbackContent').innerHTML = Output;
	var FDiv = document.getElementById('FeedbackDiv');
	topZ++;
	FDiv.style.zIndex = topZ;
	FDiv.style.top = TopSettingWithScrollOffset(30) + 'px';

	FDiv.style.display = 'block';

	ShowElements(false, 'input');
	ShowElements(false, 'select');
	ShowElements(false, 'object');
	ShowElements(true, 'object', 'FeedbackContent');

//Focus the OK button
	setTimeout("document.getElementById('FeedbackOKButton').focus()", 50);
	
//
}

function ShowElements(Show, TagName, ContainerToReverse){
// added third argument to allow objects in the feedback box to appear
//IE bug -- hide all the form elements that will show through the popup
//FF on Mac bug : doesn't redisplay objects whose visibility is set to visible
//unless the object's display property is changed

	//get container object (by Id passed in, or use document otherwise)
	TopNode = document.getElementById(ContainerToReverse);
	var Els;
	if (TopNode != null) {
		Els = TopNode.getElementsByTagName(TagName);
	} else {
		Els = document.getElementsByTagName(TagName);
	}

	for (var i=0; i<Els.length; i++){
		if (TagName == "object") {
			//manipulate object elements in all browsers
			if (Show == true){
				Els[i].style.visibility = 'visible';
			}
			else{
				Els[i].style.visibility = 'hidden';
			}
		} 
	}
}



function HideFeedback(){
	document.getElementById('FeedbackDiv').style.display = 'none';
	ShowElements(true, 'input');
	ShowElements(true, 'select');
	ShowElements(true, 'object');
}


//GENERAL UTILITY FUNCTIONS AND VARIABLES

//PAGE DIMENSION FUNCTIONS
function PageDim(){
//Get the page width and height
	this.W = 600;
	this.H = 400;
	this.W = document.getElementsByTagName('body')[0].offsetWidth;
	this.H = document.getElementsByTagName('body')[0].offsetHeight;
}

var pg = null;

function GetPageXY(El) {
	var XY = {x: 0, y: 0};
	while(El){
		XY.x += El.offsetLeft;
		XY.y += El.offsetTop;
		El = El.offsetParent;
	}
	return XY;
}

function GetScrollTop(){
	if (typeof(window.pageYOffset) == 'number'){
		return window.pageYOffset;
	}
	else{
		if ((document.body)&&(document.body.scrollTop)){
			return document.body.scrollTop;
		}
		else{
			if ((document.documentElement)&&(document.documentElement.scrollTop)){
				return document.documentElement.scrollTop;
			}
			else{
				return 0;
			}
		}
	}
}

function GetViewportHeight(){
	if (typeof window.innerHeight != 'undefined'){
		return window.innerHeight;
	}
	else{
		if (((typeof document.documentElement != 'undefined')&&(typeof document.documentElement.clientHeight !=
     'undefined'))&&(document.documentElement.clientHeight != 0)){
			return document.documentElement.clientHeight;
		}
		else{
			return document.getElementsByTagName('body')[0].clientHeight;
		}
	}
}

function TopSettingWithScrollOffset(TopPercent){
	var T = Math.floor(GetViewportHeight() * (TopPercent/100));
	return GetScrollTop() + T; 
}

//CODE FOR AVOIDING LOSS OF DATA WHEN BACKSPACE KEY INVOKES history.back()
var InTextBox = false;

function SuppressBackspace(e){ 
	if (InTextBox == true){return;}
	thisKey = e.keyCode;

	var Suppress = false;

	if (thisKey == 8) {
		Suppress = true;
		e.preventDefault();
	}
}

window.addEventListener('keypress',SuppressBackspace,false);

function ReduceItems(InArray, ReduceToSize){
	var ItemToDump=0;
	var j=0;
	while (InArray.length > ReduceToSize){
		ItemToDump = Math.floor(InArray.length*Math.random());
		InArray.splice(ItemToDump, 1);
	}
}

function Shuffle(InArray){
	var Num;
	var Temp = new Array();
	var Len = InArray.length;

	var j = Len;

	for (var i=0; i<Len; i++){
		Temp[i] = InArray[i];
	}

	for (i=0; i<Len; i++){
		Num = Math.floor(j  *  Math.random());
		InArray[i] = Temp[Num];

		for (var k=Num; k < (j-1); k++) {
			Temp[k] = Temp[k+1];
		}
		j--;
	}
	return InArray;
}

function WriteToInstructions(Feedback) {
	document.getElementById('InstructionsDiv').innerHTML = Feedback;

}




function EscapeDoubleQuotes(InString){
	return InString.replace(/"/g, '&quot;')
}

function TrimString(InString){
        var x = 0;

        if (InString.length != 0) {
                while ((InString.charAt(InString.length - 1) == '\u0020') || (InString.charAt(InString.length - 1) == '\u000A') || (InString.charAt(InString.length - 1) == '\u000D')){
                        InString = InString.substring(0, InString.length - 1)
                }

                while ((InString.charAt(0) == '\u0020') || (InString.charAt(0) == '\u000A') || (InString.charAt(0) == '\u000D')){
                        InString = InString.substring(1, InString.length)
                }

                while (InString.indexOf('  ') != -1) {
                        x = InString.indexOf('  ')
                        InString = InString.substring(0, x) + InString.substring(x+1, InString.length)
                 }

                return InString;
        }

        else {
                return '';
        }
}

function FindLongest(InArray){
	if (InArray.length < 1){return -1;}

	var Longest = 0;
	for (var i=1; i<InArray.length; i++){
		if (InArray[i].length > InArray[Longest].length){
			Longest = i;
		}
	}
	return Longest;
}

//SELECTION OBJECT FOR TYPING WITH KEYPAD
var selObj = null;
            
SelObj = function(box){
	this.box = box;
	this.selStart = this.box.selectionStart;
	this.selEnd = this.box.selectionEnd;
	this.selText = this.box.value.substring(this.selStart, this.selEnd);
	return this;
}

function setSelText(newText){
	var caretPos = this.selStart + newText.length;
	var newValue = this.box.value.substring(0, this.selStart);
	newValue += newText;
	newValue += this.box.value.substring(this.selEnd, this.box.value.length);
	this.box.value = newValue;
	this.box.setSelectionRange(caretPos, caretPos);
	this.box.focus();
}
SelObj.prototype.setSelText = setSelText;

function setSelSelectionRange(start, end){
	this.box.setSelectionRange(start, end);
}
SelObj.prototype.setSelSelectionRange = setSelSelectionRange;

//UNICODE CHARACTER FUNCTIONS
function IsCombiningDiacritic(CharNum){
	var Result = (((CharNum >= 0x0300)&&(CharNum <= 0x370))||((CharNum >= 0x20d0)&&(CharNum <= 0x20ff)));
	Result = Result || (((CharNum >= 0x3099)&&(CharNum <= 0x309a))||((CharNum >= 0xfe20)&&(CharNum <= 0xfe23)));
	return Result;
}

function IsCJK(CharNum){
	return ((CharNum >= 0x3000)&&(CharNum < 0xd800));
}

//SETUP FUNCTIONS
//BROWSER WILL REFILL TEXT BOXES FROM CACHE IF NOT PREVENTED
function ClearTextBoxes(){
	var NList = document.getElementsByTagName('input');
	for (var i=0; i<NList.length; i++){
		if ((NList[i].id.indexOf('Guess') > -1)||(NList[i].id.indexOf('Gap') > -1)){
			NList[i].value = '';
		}
		if (NList[i].id.indexOf('Chk') > -1){
			NList[i].checked = '';
		}
	}
}






//JCROSS CORE JAVASCRIPT CODE

var InGap = false;
var CurrentBox = null;
var Feedback = '';
var AcrossCaption = '';
var DownCaption = '';
var Correct = 'Correct! Well done.';
var Incorrect = 'Some of your answers are incorrect. Incorrect squares have been blanked out.'; 
var GiveHint = 'A correct letter has been added.';
var YourScoreIs = 'Your score is ';
var BuiltGrid = '';
var BuiltExercise = '';
var Penalties = 0;
var Score = 0;
var InTextBox = false;
var Locked = false;
var TimeOver = false;
var CaseSensitive = false; 

var InputStuff = '<form method="post" action="" onsubmit="return false;"><span class="ClueNum">[strClueNum]: </span>';
InputStuff += '[strClue] <input autocomplete="off" onfocus="CurrentBox=this;InTextBox=true;" onblur="InTextBox=false;" id="[strBoxId]" type="edit" size="[strEditSize]" maxlength="[strMaxLength]"></input>';
InputStuff += '<button class="FuncButton" onclick="EnterGuess([strParams])">Enter</button>';
InputStuff += '<button class="FuncButton" onclick="ShowHint([strParams])">Hint</button>';
InputStuff += '</form>';

var CurrBoxElement = null;
var Finished = false;

function StartUp(){
//Show a keypad if there is one	(added bugfix for 6.0.4.12)
	if (document.getElementById('CharacterKeypad') != null){
		document.getElementById('CharacterKeypad').style.display = 'block';
	}

	
	AcrossCaption = document.getElementById('CluesAcrossLabel').innerHTML;
	DownCaption = document.getElementById('CluesDownLabel').innerHTML;






}

function GetAnswerLength(Across,x,y){
	Result = 0;
	if (Across == false){
		while ((x<L.length)&&(L[x][y].length > 0)){
			Result += L[x][y].length;
			x++;
		} 
		return Result;
	}
	else{
		while ((y<L[x].length)&&(L[x][y].length > 0)){
			Result += L[x][y].length;
			y++;
		} 	
		return Result;
	}
}

function GetEditSize(Across,x,y){
	var Len = GetAnswerLength(Across,x,y);
	if (IsCJK(L[x][y].charCodeAt(0))){
		Len *= 2;
	}
	return Len;
}

function ShowClue(ClueNum,x,y){
	var Result = '';
	var Temp;
	var strParams;
	var Clue = document.getElementById('Clue_A_' + ClueNum);
	if (Clue != null){
		Temp = InputStuff.replace(/\[ClueNum\]/g, ClueNum);
		Temp = Temp.replace(/\[strClueNum\]/g, AcrossCaption + ' ' + ClueNum);
		strParams = 'true,' + ClueNum + ',' + x + ',' + y + ',\'[strBoxId]\'';
		Temp = Temp.replace(/\[strParams\]/g, strParams);
		Temp = Temp.replace(/\[strBoxId\]/g, 'GA_' + ClueNum + '_' + x + '_' + y);
		Temp = Temp.replace(/\[strEditSize\]/g, GetEditSize(true,x,y));
		Temp = Temp.replace(/\[strMaxLength\]/g, GetAnswerLength(true,x,y));
		Temp = Temp.replace(/\[strClue\]/g, Clue.innerHTML, Temp);
		Result += Temp;
	}
	Clue = document.getElementById('Clue_D_' + ClueNum);
	if (Clue != null){
		Temp = InputStuff.replace(/\[ClueNum\]/g, ClueNum);
		Temp = Temp.replace(/\[strClueNum\]/g, DownCaption + ' ' + ClueNum);
		strParams = 'false,' + ClueNum + ',' + x + ',' + y + ',\'[strBoxId]\'';
		Temp = Temp.replace(/\[strParams\]/g, strParams);
		Temp = Temp.replace(/\[strBoxId\]/g, 'GD_' + ClueNum + '_' + x + '_' + y);
		Temp = Temp.replace(/\[strEditSize\]/g, GetAnswerLength(false,x,y));
		Temp = Temp.replace(/\[strClue\]/g, Clue.innerHTML, Temp);
		Result += Temp;
	}
	document.getElementById('ClueEntry').innerHTML = Result;
}

function EnterGuess(Across,ClueNum,x,y,BoxId){
	if (document.getElementById(BoxId) != null){
		var Guess = document.getElementById(BoxId).value;
		var AnsLength = GetAnswerLength(Across,x,y);
		EnterAnswer(Guess,Across,AnsLength,x,y);
	}
}

function SplitStringToPerceivedChars(InString, PC){
	var Temp = InString.charAt(0);
	if (InString.length > 1){
		for (var i=1; i<InString.length; i++){
			if (IsCombiningDiacritic(InString.charCodeAt(i)) == true){
				Temp += InString.charAt(i);
			}
			else{
				PC.push(Temp);
				Temp = InString.charAt(i);
			}
		}
	}
	PC.push(Temp);
}

function EnterAnswer(Guess,Across,AnsLength,x,y){
	var PC = new Array();
	SplitStringToPerceivedChars(Guess, PC);
	
	var i=x;
	var j=y;
	var Letter = 0;
	while (Letter < AnsLength){
		if (Letter < PC.length){
			G[i][j] = PC[Letter];
			if (document.getElementById('L_' + i + '_' + j) != null){
				document.getElementById('L_' + i + '_' + j).innerHTML = PC[Letter];
			}
		}
		if (Across == true){
			j++;
		}
		else{
			i++;
		}
		Letter++;
	}
}

function SetGridSquareValue(x,y,Val){
	var GridId = 'L_' + x + '_' + y;
	if (document.getElementById(GridId) != null){
		document.getElementById(GridId).innerHTML = Val;
	}
}

function ShowHint(Across,ClueNum,x,y,BoxId){
	var i=x;
	var j=y;
	var LetterFromGuess = '';
	var LetterFromKey = '';
	var OutString = '';
	if (Across==true){
		while (j<L[i].length){
			if (L[i][j] != ''){
				OutString += L[i][j];
				if (CaseSensitive == true){
					LetterFromKey = L[i][j];
					LetterFromGuess = G[i][j];
				}
				else {
					LetterFromKey = L[i][j].toUpperCase();
					LetterFromGuess = G[i][j].toUpperCase();
				}
				if (LetterFromGuess != LetterFromKey){
//				if (G[i][j] != L[i][j]){
					G[i][j] = L[i][j];
					Penalties++;
					break;
				}
			}
			else{
				break;
			}
		j++;
		}
	}
	else{
		while (i<L.length){
			if (L[i][j] != ''){
				OutString += L[i][j];
				if (CaseSensitive == true){
					LetterFromKey = L[i][j];
					LetterFromGuess = G[i][j];
				}
				else {
					LetterFromKey = L[i][j].toUpperCase();
					LetterFromGuess = G[i][j].toUpperCase();
				}
				if (LetterFromGuess != LetterFromKey){
//				if (G[i][j] != L[i][j]){
					G[i][j] = L[i][j];
					Penalties++;
					break;
				}
			}
			else{
				break;
			}
		i++;
		}
	}
	if (document.getElementById(BoxId) != null){
		document.getElementById(BoxId).value = OutString;
	}
}

L = new Array();
L[0] = new Array('','','','','','','','','','','','','','','','J','','');
L[1] = new Array('','','','','L','','J','','','K','','S','U','M','B','A','R','');
L[2] = new Array('J','O','G','Y','A','K','A','R','T','A','','U','','','','T','','');
L[3] = new Array('','','','','M','','M','','','L','','M','','','','I','','');
L[4] = new Array('','','','','P','','B','','','T','','S','','','','M','','');
L[5] = new Array('','B','','','U','','I','','','I','','E','','','','','','');
L[6] = new Array('J','A','T','E','N','G','','','','M','A','L','U','K','U','','','');
L[7] = new Array('','N','','','G','','','','','','C','','','','','','S','');
L[8] = new Array('','T','','','','','','','','B','E','N','G','K','U','L','U','');
L[9] = new Array('','E','','','','','','','','','H','','','','','','L','');
L[10] = new Array('','N','','','','','','','','','','','','','J','','S','');
L[11] = new Array('','','','','','','','','','','','','','','A','','E','');
L[12] = new Array('','','','','','','','','','','','','','','B','A','L','I');
L[13] = new Array('','','','','','','','','','','','','','','A','','','');
L[14] = new Array('','','','','','','','','','','','','','','R','','','');


CL = new Array();
CL[0] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0);
CL[1] = new Array(0,0,0,0,2,0,3,0,0,4,0,5,0,0,0,0,0,0);
CL[2] = new Array(6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
CL[3] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
CL[4] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
CL[5] = new Array(0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
CL[6] = new Array(8,0,0,0,0,0,0,0,0,9,10,0,0,0,0,0,0,0);
CL[7] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0);
CL[8] = new Array(0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0);
CL[9] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
CL[10] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0);
CL[11] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
CL[12] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0);
CL[13] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
CL[14] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);


G = new Array();
G[0] = new Array('','','','','','','','','','','','','','','','','','');
G[1] = new Array('','','','','','','','','','','','','','','','','','');
G[2] = new Array('','','','','','','','','','','','','','','','','','');
G[3] = new Array('','','','','','','','','','','','','','','','','','');
G[4] = new Array('','','','','','','','','','','','','','','','','','');
G[5] = new Array('','','','','','','','','','','','','','','','','','');
G[6] = new Array('','','','','','','','','','','','','','','','','','');
G[7] = new Array('','','','','','','','','','','','','','','','','','');
G[8] = new Array('','','','','','','','','','','','','','','','','','');
G[9] = new Array('','','','','','','','','','','','','','','','','','');
G[10] = new Array('','','','','','','','','','','','','','','','','','');
G[11] = new Array('','','','','','','','','','','','','','','','','','');
G[12] = new Array('','','','','','','','','','','','','','','','','','');
G[13] = new Array('','','','','','','','','','','','','','','','','','');
G[14] = new Array('','','','','','','','','','','','','','','','','','');


function CheckAnswers(){
	if (Locked == true){return;}

	var AllCorrect = true;
	var TotLetters = 0;
	var CorrectLetters = 0;
	var LetterFromKey = ''; 
	var LetterFromGuess = '';
	
//Check each letter
	for (var i=0; i<L.length; i++){
		for (var j=0; j<L[i].length; j++){
			if (L[i][j] != ''){
				TotLetters++;
				if (CaseSensitive == true) {
					LetterFromKey = L[i][j];
					LetterFromGuess = G[i][j];
				}
				else {
					LetterFromKey = L[i][j].toUpperCase();
					LetterFromGuess = G[i][j].toUpperCase();
				}
				if (LetterFromGuess != LetterFromKey){ 
					G[i][j] = '';
//Blank that square in the grid
					SetGridSquareValue(i,j,'');
					AllCorrect = false;
				}
				else{
					CorrectLetters++;
				}
			}
		}
	}

	Score = Math.floor(((CorrectLetters-Penalties) * 100)/TotLetters);
	if (Score < 0){Score = 0;}

//Compile the output
	var Output = '';

	if (AllCorrect == true){
		Output = Correct + '<br />';
	}

	Output += YourScoreIs + ' ' + Score + '%.<br />';
	if (AllCorrect == false){
		Output += Incorrect;
		Penalties++;
	}

	ShowMessage(Output);
	WriteToInstructions(Output);
	
	if ((AllCorrect == true)||(TimeOver == true)){


		TimeOver = true;
		Locked = true;
		Finished = true;
	}

}

function TypeChars(Chars){
	if (CurrentBox != null){
		CurrentBox.value += Chars;
	}
}