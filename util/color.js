
function consoleColor(str,num){
	if (!num) {
		num = '32';
	}
	return "\033[" + num +"m" + str + "\033[0m"
}

function green(str){
	return consoleColor(str,32);
}

function yellow(str){
	return consoleColor(str,33);
}

function red(str){
	return consoleColor(str,31);
}

function blue(str){
	return consoleColor(str,34);
}

function purple(str){
	return consoleColor(str,36);
}


exports.cc = {
	green: green,
	yellow: yellow,
	red: red,
	blue: blue,
	purple: purple
};

