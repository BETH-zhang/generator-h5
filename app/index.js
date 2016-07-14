'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var H5Logo = require('./logo').H5Logo;


var H5Generator = module.exports = function H5Generator(args, options){
	yeoman.generators.Base.apply(this, arguments);

	this.option('format', {
		desc: 'Select one of `css`, `sass` for the h5 format.',
		type: String
	});

	this.format = options.format;
}

util.inherits(H5Generator, yeoman.generators.Base);

H5Generator.prototype.askFor = function askFor(argument){
	console.log(H5Logo(this));

	if(this.format){
		return;
	}

	var cb = this.async();
	var formats = ['css', 'sass'];
	var prompts = [{
		type: 'list',
		name: 'format',
		message: 'In what format would you like the h5 stylesheets?',
		choices: formats
	}];

	this.prompt(prompts, function(props){
		this.format = props.format;
		cb();
	}.bind(this));
}

H5Generator.prototype.h5Files = function h5Files() {
  // map format -> package name
  var packages = {
    css: 'h5',
    sass: 'h5-sass'
  };

  if(this.format === 'css'){
  	console.log('css');
  }else if(this.format === 'sass'){
  	console.log('sass');
  }

  // this.bowerInstall(packages[this.format], { save: true });
};
