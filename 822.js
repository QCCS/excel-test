/**
 * Created by zhouli on 18/7/22
 * 1.读取文件
 * 2.人员分组
 * 3.根据人员分组创建文件
 */
var xlsx = require('node-xlsx').default;
var fs = require('fs');
//读取文件
var obj = xlsx.parse("./" + "source822.xlsx");
//表格里面的数据
divideName(obj[0].data);
//人员分组
function divideName(data) {
    //把这个数据生成50个文件
    var dataArr = data;
    for (var i = 0; i < dataArr.length; i++) {
        var arr = [];
        //必须有值才继续找，因为涉及到找过的行
        if(dataArr[i]){
            arr.push(dataArr[i]);
            var d = getLineByName(i+1,dataArr[i][4],dataArr);
            if(d){
                arr = arr.concat(d);
            }
            // console.log(arr.length);
            //文件名字，我以姓名与人的个数来命名
            var fileName = dataArr[i][4]+arr.length;
            creatFile(fileName,arr)
        }
    }
    //把名字相同的找出来，从传入名字的下一个开始找，找到一行，就把行设置为空
    function getLineByName(from,name) {
        var arr = [];
        for (var i = from; i < dataArr.length; i++) {
            //必须有值才继续找，因为涉及到找过的行
            if(dataArr[i] && name === dataArr[i][4]){
                var d = dataArr[i];
                dataArr[i] = null;
                arr.push(d);
            }
        }
        return arr;
    }
}
//创建文件
function creatFile(name, dataArr) {
    var data = [
        {name: 'sheet', data: dataArr}
    ]
    var buffer = xlsx.build(data);
    fs.writeFile('./file/' + name + '.xlsx', buffer, function (err) {
            if (err) {
                throw err;
            } else {
                console.log(name + ' 创建完成');
            }
        }
    );
}