function H5Logo(contex){
	var version = '';
	try{
		version = contex ? 'v'+contex.pkg.version : '';
	}
	catch(e){}
	var logo = 
	'\n'+
	red(   '__      __   _________\n')+
	red(   '\\ \\     \\ \\  \\  ______\\\n')+
	yellow(' \\ \\     \\ \\  \\ \\\n')+
	green( '  \\ \\_____\\ \\  \\ \\_______\n')+
	green( '   \\ \\_____\\ \\  \\_______ \\\n')+
	purple('    \\ \\     \\ \\         \\ \\\n')+
	blue(  '     \\ \\     \\ \\   ______\\ \\\n')+
	blue(  '      \\_\\     \\_\\  \\________\\\n') + ' ' + version + '\n\n';

	logo += ('need help?') + purple(' ===> ') + green('yo h5:h') + '\n';
	
	if(contex && contex.generatorName){
		logo += '\nh5: '+green(contex.generatorName.toUpperCase())+'\n';
	}

	return logo;

};

exports.H5Logo = H5Logo;

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

console.log(H5Logo());

