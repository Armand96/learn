// var somestr = "some string";

// console.log(somestr.split(' ').join('_'));

// // ======================== ERROR LOGGING
// var fs = require('fs');
// var util = require('util');
// var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
// var log_stdout = process.stdout;

// console.log = function(d) { //
//   log_file.write(util.format(d) + '\n');
//   log_stdout.write(util.format(d) + '\n');
// };

var passwordHash = require('password-hash');
const password = "test";
var dbuserpassword = "sha1$6c483d86$1$b96246233c3b8df5bec50fc52e7b21533b1ed504";
console.log(passwordHash.verify(password, dbuserpassword));