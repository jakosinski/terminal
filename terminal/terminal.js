console.log("%cSTOP", "color: red; font-size: 30px");
console.log("%cDont use this console for better your experience", "color: red; font-size: 25px");


var currentChar = 0,
	terminalInside = document.getElementById("inside"),
	consoleCode,
	currentString,
	currentLine = 0,
	prefix = "/ ",
	currentUser,
	inNano = false,
	inLoginPassword = false, //coś ta zmienna sypie terminal, widocznie gdzieś jej nadużyłeś
	currentNanoLine,
	currentNanoChar,
	currentNanoLines,
	currentNanoFile,
	complete = false,
	startDir,
	DEFAULT_PER = "744",
	currentDir,
	currentUserHomeDir,
	nextCommand = "",
	nextCommandVar = "",
	psswdInput = false;

var discDir = new Directory(""), 
	rootGroup = new Group("root"),
	usersGroup = new Group("Users"),
	rootUser = new User("root", "root"),
	currentUser = rootUser,
	
	homeDir = new Directory("home", discDir, false),
	startDir = discDir;

	discDir.ownerUsr = rootUser,
	discDir.ownerGrp = rootGroup;

	var defaultUser = new User("Guest", "");
	currentUser = defaultUser;
	currentUserHomeDir = currentUser.homeDir;
	currentDir = currentUser.homeDir;

$.getScript("terminal/Utils/stringUtils.js");
$.getScript("terminal/Events/keyboardEvents.js");
$.getScript("terminal/Events/keyboardNanoEvents.js");


$.getScript("terminal/Commands/ls.js");
$.getScript("terminal/Commands/echo.js");
$.getScript("terminal/Commands/mkdir.js");
$.getScript("terminal/Commands/cd.js");
$.getScript("terminal/Commands/su.js");
$.getScript("terminal/Commands/pwd.js");
$.getScript("terminal/Commands/whoami.js");
$.getScript("terminal/Commands/groups.js");
$.getScript("terminal/Commands/touch.js");
$.getScript("terminal/Commands/nano.js");
$.getScript("terminal/Commands/clear.js");


var terminalStart = function() {
	newLine();
}

terminalStart();

function newLine(pr, color) {
	currentLine++;
	var line = document.createElement("div");
	line.setAttribute("id", "line-" + currentLine);
	line.setAttribute("class", "line"); //eeeee
	var pref = document.createElement("span");
	pref.setAttribute("class", "prefix");
	pref.setAttribute("id", "prefix-" + currentLine);
	pref.innerHTML = currentUser.name + " " + getDirPath(currentDir) + " ";
	if(pr != null) {
		pref.innerHTML = pr;
	}
	if(color != null) {
		pref.style.color = color;
	}
	var code = document.createElement("span");
	if(psswdInput){
		code.style.color = "black";
	}
	code.setAttribute("id", "code-" + currentLine);
	line.appendChild(pref);
	line.appendChild(code);

	$(".current").remove();

	var cursor = document.createElement("div");
	cursor.setAttribute("class", "current");
	if(!psswdInput){line.appendChild(cursor);}
	terminalInside.appendChild(line);
	consoleCode = document.getElementById("code-" + currentLine);
	currentString = consoleCode.innerHTML;
	currentChar = 0,
	currentNanoFile;
}

function sendCommand() {
	var command = "";
	var x = 0;
	while(currentString.charAt(x) != " ") {
		if(currentString.charAt(x) == "") {break;}
		command += currentString.charAt(x);
		x++;

	}

	if (typeof window[command] == "function") {
		var cmd = window[command];
		cmd();
	}
	else {
		if(command == "") {
			newLine();
		}
		else {
			newLine(currentUser.name + ": " + command + ": command not found");
			newLine();
		}
	}
}









