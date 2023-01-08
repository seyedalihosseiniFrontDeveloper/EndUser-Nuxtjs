console.log('run build.js')
const pk=require('./package.json');
const old = pk.version
let arr=pk.version.split('.')
arr[arr.length-1]=(parseInt(arr[arr.length-1])+1).toString()
pk.version=arr.join('.')
const fs=require('fs');
console.log(`Upgrade version from ${old} to ${pk.version}`)
fs.writeFileSync('./package.json',JSON.stringify(pk,null, "  "))
