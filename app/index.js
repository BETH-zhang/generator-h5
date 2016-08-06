'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var H5Logo = require('./logo').H5Logo;
var zklogo = require('console-utils').logo;
var cc = require('../util/color').cc;

var H5Generator = module.exports = function H5Generator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function() {
        var cb = this.async();

        this.prompt([{
            name: 'npm_install',
            message: 'Install node_modules for gulp now?',
            default: 'Y/n',
            warning: ''
        }], function(props, err) {
            if (err) {
                return this.emit('error', err);
            }

            this.npm_install = (/^y/i).test(props.npm_install);

            if (this.npm_install) {
                this.npmInstall('', {}, function(err, index) {
                    if (err) {
                        return console.log('\n' + cc.yellow('please run "sudo npm install"\n'));
                    }

                    console.log(cc.green('\n\nnpm was installed successful. \n\n'));
                });
            } else {
                console.log(cc.yellow('\n\nplease run "npm install" before grunt\n'));
                console.log(cc.green('\ndone!\n'));
            }
        }.bind(this));

    }.bind(this));

    // this.option('format', {
    // 	desc: 'Select one of `css`, `sass` for the h5 format.',
    // 	type: String
    // });

    // this.format = options.format;
}

util.inherits(H5Generator, yeoman.generators.Base);

H5Generator.prototype.askFor = function askFor(argument) {
    var cb = this.async();

    // welcome message
    console.log(H5Logo(this));

    var h5JSON = {};
    h5JSON['author'] = {
        name: 'beth',
        email: 'gemeiwangji789@qq.com'
    }

    var folderName = path.basename(process.cwd());

    // your-mojo-name => YourMojoName
    function parseMojoName(name) {
        return name.replace(/\b(\w)|(-\w)/g, function(m) {
            return m.toUpperCase().replace('-', '');
        });
    }

    var prompts = [{
        name: 'projectName',
        message: 'Name of Project?',
        default: folderName,
        warning: ''
    }, {
        name: 'description',
        message: 'description of Project?',
        default: 'a h5 project',
        warning: ''
    }, {
        name: 'srcDir',
        message: 'create "src" directory?',
        default: 'Y/n',
        warning: ''
    }, {
        name: 'author',
        message: 'Author Name:',
        default: h5JSON.author.name,
        warning: ''
    }, {
        name: 'email',
        message: 'Author Email:',
        default: h5JSON.author.email,
        warning: ''
    }, {
        name: 'groupName',
        message: 'Group Name:',
        default: 'SmartUED',
        warning: ''
    }, {
        name: 'port',
        message: 'HTTP Serve Port:',
        default: '3030',
        warning: ''
    }, {
        name: 'version',
        message: 'Version:',
        default: '0.0.1',
        warning: ''
    }, ];

    /**
     * projectName: 驼峰名称，比如ProjectName
     * packageName：原目录名称，比如project－name
     */

    this.prompt(prompts, function(props, err) {
        if (err) {
            return this.emit('error', err);
        }

        this.packageName = props.projectName;
        this.projectName = parseMojoName(this.packageName);
        this.description = props.description;
        this.author = props.author;
        this.email = props.email;
        this.port = props.port;
        this.version = props.port;
        this.version = props.version;
        this.groupName = props.groupName;
        this.config = 'http://ued.qiuge.me/' + this.groupName + '/' + this.packageName + '/' + this.version + '/config.js';
        this.srcDir = (/^y/i).test(props.srcDir);
        this.srcPath = '../';
        this.currentBranch = 'master';

        if (this.srcDir) {
            this.prompt([{
                name: 'modsPagesWidgets',
                message: 'Create "src/mods[widgets|pages]"?',
                default: 'N/y',
                warning: ''
            }], function(props, err) {
                if (err) {
                    return this.emit('error', err);
                }

                this.modsPagesWidgets = (/^y/i).test(props.modsPagesWidgets);
                if (this.modsPagesWidgets) {
                    this.srcPath = '../../';
                }
                cb();
            }.bind(this));
        } else {
            cb();
        }

    }.bind(this));

    // if(this.format){
    // 	return;
    // }

    // var cb = this.async();
    // var formats = ['css', 'sass'];
    // var prompts = [{
    // 	type: 'list',
    // 	name: 'format',
    // 	message: 'In what format would you like the h5 stylesheets?',
    // 	choices: formats
    // }];

    // this.prompt(prompts, function(props){
    // 	this.format = props.format;
    // 	cb();
    // }.bind(this));
}

H5Generator.prototype.gulpfile = function gulpfile() {
    if (this.srcDir) {
        this.copy('gulpfile_src.js', 'gulpfile.js');
    } else {
        this.copy('gulpfile.js');
    }
};

H5Generator.prototype.packageJSON = function packageJSON() {
    this.template('_package.json', 'package.json');
};

H5Generator.prototype.git = function git() {
    this.copy('_gitignore', '.gitignore');
};

H5Generator.prototype.app = function app() {
    if (this.srcDir) {
        this.mkdir('src');
        if (this.modsPagesWidgets) {
            this.mkdir('src/pages');
            this.mkdir('src/mods');
            this.mkdir('src/widgets');
        }
        this.template('config.js', 'src/config.js');
    } else {
        this.template('config.js');
    }
    this.copy('README.md', 'README.md');
    this.mkdir('doc');
    this.mkdir('build');
    this.template('h5.json');
}