// Provide files to mocha that are loaded via CDN
import 'jsdom-global/register';

global.CodeMirror = require('codemirror');
global.R = require('ramda');
global.ramdaFantasy = require('ramda-fantasy');
global.sanctuary = require('sanctuary');

