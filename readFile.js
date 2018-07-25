/**
 * Created by zhouli on 2018/7/23.
 */
var fs = require('fs');

//-----------------------------------------
// 1、readFile方法是将要读取的文件内容完整读入缓存区，再从该缓存区中读取文件内容，具体操作如下：
//读取文件
//同步
var data = fs.readFileSync('package.json','utf8');
// console.log(data);

//异步
fs.readFile('package.json', 'utf8', function(err, data){
    // console.log(data);
});
// 2、writeFile方法是将要写入的文件内容完整的读入缓存区，然后一次性的将缓存区中的内容写入都文件中，其同步和异步具体操作如下：
//异步方法
fs.writeFile('message1.txt', '这是第一行',function(err){
    if(err) {
        console.log('写文件操作失败')
    }else {
        console.log('写文件操作成功');
    }
});

//同步方法
fs.writeFileSync('message2.txt','这是第一行');
// 以上的读写操作，Node.js将文件内容视为一个整体，为其分配缓存区并且一次性将文件内容读取到缓存区中，
// 在这个期间，Node.js将不能执行任何其他处理。所以当读写大文件的时候，有可能造成缓存区“爆仓”。
//-----------------------------------------
// 三、createReadStream和createWriteStream
// 1、createReadStream方法创建一个将文件内容读取为流数据的ReadStream对象，方法如下所示：
// var readStream = fs.createReadStream('test1.txt',{start:3,end:12});
// readStream.on('open',function(fd){
//     console.log('开始读取文件');
// });
// readStream.on('data',function(data){
//     console.log('读取到数据：');
//     console.log(data);
// });
// readStream.on('end',function(){
//     console.log('文件已全部读取完毕');
// });
// readStream.on('close',function(){
//     console.log('文件被关闭');
// });
// readStream.on('error',function(err){
//     console.log('读取文件失败');
// });
//
// var file = fs.createReadStream('test1.txt');
// var out = fs.createWriteStream('test3.txt');
// file.on('data',function(data){
//     out.write(data);
// });
// out.on('open',function(fd){
//     console.log('需要被写入的文件已打开');
// });
// file.on('end',function(){
//     //将操作系统缓存区中的数据全部写入文件
//     out.end('再见',function(){
//         console.log('文件全部写入完毕');
//         console.log('共写入 '+out.bytesWritten+' 数据');
//     });
// });
//-----------------------------------------
//监听writeStream对象的drain事件
var out = fs.createWriteStream('test1.txt');
for(var i=0;i<3600;i++){
    //返回true或false true代表缓存区已满
    var flag = out.write(i.toString()+"\n");
    console.log(flag+" "+i);
}
out.on('drain',function(){
    //缓存区不满不会走这个函数，上面循环为1000，就不会满
    //本电脑测试，循环大于3497就满了
    console.log('操作系统缓存区中的数据已全部输出');
    var out = fs.createWriteStream('test2.txt');
    for(var i=0;i<10;i++){
        var flag = out.write(i.toString());
        console.log(flag);
    }
    out.on('drain',function(){
        console.log('操作系统缓存区中的数据已全部输出');
    });
});