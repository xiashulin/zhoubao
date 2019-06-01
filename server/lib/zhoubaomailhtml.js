function generateHtml(data) {

    let content=''

    for(let item of data){
        content += `<tr><td>${item.project}</td><td>${item.lwsubType}</td><td>${item.lwContent}</td><td>${item.lwScale}%</td><td>${item.cwsubType}</td><td>${item.cwContent}</td><td>${item.cwScale}%</td></tr>`
    }

    if(!content) {
        content = '<tr><td colspan="7" class="nodata">没有任何数据。</td></tr>'
    }

    let template=`
        <style type="text/css">
            table.gridtable {
                font-family: verdana, arial, sans-serif;
                font-size: 11px;
                color: #333333;
                border-width: 1px;
                border-color: #666666;
                border-collapse: collapse;
            }

            table.gridtable th {
                border-width: 1px;
                padding: 8px;
                border-style: solid;
                border-color: #666666;
                background-color: #dedede;
            }

            table.gridtable td {
                border-width: 1px;
                padding: 8px;
                border-style: solid;
                border-color: #666666;
                background-color: #ffffff;
                max-width: 480px;
            }

            h3 span {
                font-size: 14px;
            }

            .header {
                font-size: 14px;
                font-weight: bold;
            }

            .nodata {
                text-align: center;
            }
        </style>
        <table class="gridtable">
            <thead>
                <tr>
                    <th colspan="7" class="header">
                        2019年第22周工作周报（2019-05-30）
                    </th>
                </tr>
                <tr>
                    <th rowspan="2">项目</th>
                    <th colspan="3">上周</th>
                    <th colspan="3">本周</th>
                </tr>
                <tr>
                    <th>子类别</th>
                    <th>工作内容</th>
                    <th>实投(%)</th>
                    <th>子类别</th>
                    <th>工作内容</th>
                    <th>预投(%)</th>
                </tr>
            </thead>
            <tbody>${content}</tbody>
        </table>`

    return template
}

module.exports.generateHtml = generateHtml;