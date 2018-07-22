var xlsx = require('node-xlsx').default;
var fs = require('fs');
var data = [
    {
        name: 'sheet1',
        data: [
            [
                'ID',
                'Name',
                'Score'
            ],
            [
                '1',
                'Michael',
                '99'

            ],
            [
                '2',
                'Jordan',
                '98'
            ]
        ]
    },
    {
        name: 'sheet2',
        data: [
            [
                'AA',
                'BB'
            ],
            [
                '23',
                '24'
            ]
        ]
    }
]
// 写xlsx
var buffer = xlsx.build(data);

// fs.writeFile('./resut.xls', buffer, function (err) {
//         if (err){
//             throw err;
//         }else {
//             console.log('Write to xls has finished');
//         }
//         // 读xlsx
//         var obj = xlsx.parse("./" + "resut.xls");
//         console.log(JSON.stringify(obj));
//     }
// );


//读取一个表格
var obj = xlsx.parse("./" + "source822.xlsx");
// console.log(obj);
// console.log(JSON.stringify(obj));
var data = obj[0].data;
//把这个数据生成50个文件
for (var i = 0; i < data.length; i++) {
    console.log(data[i][4]);
    // creatFile("file"+i, data[i])
}


function creatFile(name, data) {
    var data = [
        {
            name: 'sheet1',
            data: [data]
        },
    ]
    var buffer = xlsx.build(data);

    fs.writeFile('./file/' + name + '.xlsx', buffer, function (err) {
            if (err) {
                throw err;
            } else {
                console.log(name + ' finished');
            }
        }
    );
}