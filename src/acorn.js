let acorn = require("acorn");
const fs = require("fs");
const path = require("path");
const code = fs.readFileSync(
  path.join(__dirname, "../dist/static/js/app.fd9b8cf7ccbf189a3719.js"),
  "utf-8"
);

const sourceMap = require("source-map");

const sourcemapFilePath = path.join(
  __dirname,
  "../dist/static/js/app.fd9b8cf7ccbf189a3719.js.map"
);
let sourceMapContent = fs.readFileSync(sourcemapFilePath, "utf-8");

try {
  acorn.parse(code, { ecmaVersion: 5 });
} catch (error) {
  (async () => {
    const { line, column } = error.loc;
    let usefulMessage = "";
    const sourceListByline = code.split("\n");
    usefulMessage = sourceListByline[+line - 1].slice(
      +column - 15 < 0 ? 0 : +column - 15,
      +column + 40
    );
    console.log("\x1B[31m%s\x1B[0m", `代码位置:  第${line}行${column}列`);
    console.log("\x1B[31m%s\x1B[0m", `可疑代码:  ${usefulMessage}`);
    const consumer = await new sourceMap.SourceMapConsumer(sourceMapContent);
    var sm = consumer.originalPositionFor({
      line: line, // 压缩后的行数
      column: column, // 压缩后的列数
    });

    console.log("源代码信息:\n ", JSON.stringify(sm));
    if (!sm.source) return;
    var sources = consumer.sources;
    // 根据查到的source，到源文件列表中查找索引位置
    var smIndex = sources.indexOf(sm.source);
    // 到源码列表中查到源代码
    var smContent = consumer.sourcesContent[smIndex];
    // 将源代码串按"行结束标记"拆分为数组形式
    const rawLines = smContent.split(/\r?\n/g);
    // 输出源码行，因为数组索引从0开始，故行数需要-1
    var consoleCode = "";
    for (var i = sm.line - 3; i < sm.line + 3; i++) {
      if (i >= 0 && rawLines[i]) {
        consoleCode += rawLines[i] + "\n";
      }
    }
    console.log("具体代码:\n ", consoleCode);

    // console.log({result});
  })();
}
