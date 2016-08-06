// var cc = require('../util/color').cc;
var cc = require('console-utils').color;

function H5Logo(contex){
	var version = '';
	try{
		version = contex ? 'v'+contex.pkg.version : '';
	}
	catch(e){}
	var logo = 
	'\n'+
	cc.red(   '__      __   _________\n')+
	cc.red(   '\\ \\     \\ \\  \\  ______\\\n')+
	cc.yellow(' \\ \\     \\ \\  \\ \\\n')+
	cc.green( '  \\ \\_____\\ \\  \\ \\_______\n')+
	cc.green( '   \\ \\_____\\ \\  \\_______ \\\n')+
	cc.purple('    \\ \\     \\ \\         \\ \\\n')+
	cc.blue(  '     \\ \\     \\ \\   ______\\ \\\n')+
	cc.blue(  '      \\_\\     \\_\\  \\________\\\n') + ' ' + version + '\n\n';

	logo += ('need help?') + cc.purple(' ===> ') + cc.green('yo h5:h') + '\n';
	
	if(contex && contex.generatorName){
		logo += '\nh5: '+cc.green(contex.generatorName.toUpperCase())+'\n';
	}

	return logo;

};

exports.H5Logo = H5Logo;