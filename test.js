const fs = require('fs');
let array = [];

//str = fs.readFileSync('with 2020 full/alert 2.txt').toString().replace(/\r\n/g,'\n').split("\n");
str = fs.readFileSync('03.10.2021/btc_ready.txt').toString().replace(/\r\n/g,'\n').split("\n");
str = str.toString();

var result = [];
str.replace(/(Word[\s\d]+)(?=\sWord)/g, '$1,')
.split(',')
.forEach(function(el) { 
result.push(el.split(' '));
});

console.log(result);
//console.log(result[1][2]);

// let result = [];
// 
// console.log(str);

// var addMoreProduct = function(string) {
//   let arr = string.split(',');
//   let subarr = [];
//   for (let i = 0; i <= arr.length; i++) {
//     if (arr[i] == '[' && subarr.length > 0 || (i == arr.length && subarr.length > 0)) {
//       result.push(subarr);
//       subarr = [];
//     }
//     subarr.push(arr[i]);
//   }
//   return (result)
// }

// console.log(addMoreProduct(str));



