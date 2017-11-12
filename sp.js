var readline = require('readline');
var fs = require('fs');
var os = require('os');


//var fReadName = './1.log';
var arguments = process.argv.splice(2);
if(arguments.length !=2 ){
    console.log("usage: node sp.js \<input file name\> \<output file name\>");
    return;
}
var fReadName = arguments[0];
//var fWriteName = './1.readline.log';
var fWriteName = arguments[1];
var fRead = fs.createReadStream(fReadName);
var fWrite = fs.createWriteStream(fWriteName);

var enableWriteIndex = true;
fRead.on('end', ()=>{
    var i=0;
    for(i=0;i<linesbuffer.length;i++){ //write the buffered lines
    fWrite.write(linesbuffer[i]+ '\n');
    //console.log("bufferwrite:"+i+":"+linesbuffer[i]);
    }
    console.log('end');
enableWriteIndex = false;
});

var objReadline = readline.createInterface({
    input: fRead,
    //output: fWrite,
    terminal: true
});


var index = 0;
var lineindex = 1;
var linesbuffer = []; //buffer array for read in lines
objReadline.on('line', (line)=>{
   var i=0;
   if(line.indexOf('-->')>0) { //lines contains '-->' means one script
       if (enableWriteIndex) {
           for(i=0;i<linesbuffer.length-1;i++){ //write the buffered lines, without the last
               fWrite.write(linesbuffer[i]+ '\n');
               //console.log("bufferwrite:"+i+":"+linesbuffer[i]);
           }
           //console.log(linesbuffer[i].trim());
           //console.log(linesbuffer[i].trim().value);
           if(isNaN((linesbuffer[i].trim()))){ //not number,write out.
               fWrite.write(linesbuffer[i]+ '\n');
               //console.log("lastwrite:"+i+":"+linesbuffer[i]);
           }

           index++;
           //console.log("linesbuffer length:"+linesbuffer.length);
           //console.log(linesbuffer);
           while(linesbuffer.length) linesbuffer.pop(); //flush buffer
           //console.log(linesbuffer);
          // console.log("indexwrite:"+index.toString() + '\n');
           fWrite.write(index.toString() + '\n');
           //console.log("timewrite:"+line);
           fWrite.write(line+ '\n');
       }
   }else{
       linesbuffer.push(line);
   }
});



objReadline.on('close', ()=>{
    console.log('readline close...');
    console.log(index + " subtitles processed!")
});