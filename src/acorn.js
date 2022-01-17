const {Parser} = require("acorn")
fs =require("fs");
path =require("path");
const myParser = Parser.extend(
    require("acorn-jsx")(),
  )
var source = fs.readFileSync(path.resolve(__dirname,'../dist/static/js/app.fd9b8cf7ccbf189a3719.js') ,"utf8");

try {
    // acorn.parse(file2, {ecmaVersion: 5})
    // console.log(acorn.parse(source, {ecmaVersion: 5}))
    console.log(myParser.parse(source,{ecmaVersion: 5}));;
} catch (e) {
    // console.log(e)
    // console.log(Object.keys(e))
    console.log({pos:e.pos});
    console.log({loc:e.loc});
    console.log({at:e.raisedAt});
    const {line,column} =e.loc;
    let usefulMessage = "";
    const sourceListByline = source.split('\n');
    const errorInfoList = e && e.message.match(/(?<=Unexpected token \()(.+?)(?=\))/);
    // if (errorInfoList && errorInfoList.length && errorInfoList[0].includes(":")) {
    //     const [line, column] = errorInfoList[0].split(":");
    //     usefulMessage = sourceListByline[+line-1].slice(+column - 20 < 0 ? 0 : +column - 20, +column + 20);
    //     console.log('\x1B[31m%s\x1B[0m', `代码位置:  第${line}行${column}列`);
    //     console.log('\x1B[31m%s\x1B[0m', `可疑代码:  ${usefulMessage}`);
    // }
    usefulMessage = sourceListByline[+line-1].slice(+column - 15 < 0 ? 0 : +column - 15, +column + 40);
    console.log('\x1B[31m%s\x1B[0m', `代码位置:  第${line}行${column}列`);
    console.log('\x1B[31m%s\x1B[0m', `可疑代码:  ${usefulMessage}`);
    // console.log(e.description,e.index,e.lineNumber,Object.keys(e));
    // const {lineNumber,index} =e;
    // let line=lineNumber;
    // column=index;
    // usefulMessage = sourceListByline[+line-1].slice(+column - 20 < 0 ? 0 : +column - 20, +column + 20);
    // console.error(`代码位置:  第${line}行${column}列`);
    // console.error(`可疑代码:  ${usefulMessage}`);
}
