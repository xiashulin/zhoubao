export function exportOneWeek (title, data, nowdate) {
  let content = ''
  for (let item of data) {
    content += `<tr><td>${item.project}</td><td>${item.lwsubType}</td><td>${item.lwContent}</td><td>${item.lwScale || 0}%</td><td>${item.cwsubType}</td><td>${item.cwContent}</td><td>${item.cwScale || 0}%</td></tr>`
  }

  if (!content) {
    content = '<tr><td colspan="7" class="nodata">没有任何数据。</td></tr>'
  }

  let template = `
      <style type="text/css">
        table.gridtable {
          font-family: verdana, arial, sans-serif;
          font-size: 18px;
          color: #333333;
          border-width: 1px;
          border-color: black;
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
        }

        h3 span {
          font-size: 20px;
        }

        .header {
          font-size: 20px;
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
                ${title}（${nowdate}）
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

  // Worksheet名
  let worksheet = 'Sheet1'
  let uri = 'data:application/vnd.ms-excel;base64,'

  // 真正要导出（下载）的HTML模板
  // <table syle="table-layout: fixed;word-wrap: break-word; word-break: break-all;">${tableStr}</table>
  let exportTemplate = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset='UTF-8'>
          <!--[if gte mso 9]>
          <xml>
            <x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
            <x:Name>${worksheet}</x:Name>
            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
            </x:ExcelWorksheets></x:ExcelWorkbook>
          </xml>
          <![endif]-->
        </head>
        <body>
          ${template}
        </body>
      </html>`

  // 下载模板
  window.location.href = uri + window.btoa(unescape(encodeURIComponent(exportTemplate)))
}
