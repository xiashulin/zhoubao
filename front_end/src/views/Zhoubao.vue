<template>
  <el-container>
    <el-header class="divcenter header">
       <div>
          <el-col :span="12">
            <div class="grid-content bg-purple">
             <h2 class="title">周报（{{ week }}）</h2>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <div>
                 <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <span class="clock"><i class="el-icon-time"></i> {{ date }}&nbsp;&nbsp;</span>
                  </div>
                 </el-col>
                 <el-col :span="8">
                  <div class="grid-content bg-purple-light">
                    <email></email>
                  </div>
                 </el-col>
                 <el-col :span="8">
                  <div class="grid-content bg-purple-light">
                    <user></user>
                  </div>
                 </el-col>
                 <el-col :span="2">
                  <div class="grid-content bg-purple-light about">
                    <span @click="aboutDialogVisible=true">About</span>
                  </div>
                 </el-col>
              </div>
            </div>
          </el-col>
      </div>
    </el-header>

    <el-main class="main">
      <el-table :data="tableData" style="width: 100%;" :cell-class-name="rowClass" :header-cell-style="headerClass">
        <el-table-column prop="project" label="项目" width="228">
          <template slot-scope="{row}">
            <input type="text" class="edit-cell" v-show="row.isEdit" v-model="row.project">
            <span v-show="!row.isEdit">{{ row.project }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上周" style="width: 40%">
          <el-table-column prop="lwsubType" label="子类别" width="150">
            <template slot-scope="{row}">
              <select v-show="row.isEdit" class="edit-cell" v-model="row.lwsubType">
                <option value="0" disabled>请选择</option>
                <option
                  v-for="item in subTypes"
                  :key="item"
                  :value="item"
                  :selected="item===row.lwsubType"
                >{{item}}</option>
              </select>
              <span v-show="!row.isEdit">{{ row.lwsubType }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lwContent" label="工作内容" width="auto">
            <template slot-scope="{row}">
              <input type="text" class="edit-cell" v-show="row.isEdit" v-model="row.lwContent">
              <span v-show="!row.isEdit">{{ row.lwContent }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lwScale" label="实投(%)" width="80">
            <template slot-scope="{row}">
              <input type="number" class="edit-cell" v-show="row.isEdit" v-model="row.lwScale">
              <span v-show="!row.isEdit">{{ row.lwScale }}%</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="本周" style="width: 40%">
          <el-table-column prop="cwsubType" label="子类别" width="150">
            <template slot-scope="{row}">
              <select v-show="row.isEdit" class="edit-cell" v-model="row.cwsubType">
                <option value="0" disabled>请选择</option>
                <option
                  v-for="item in subTypes"
                  :key="item"
                  :value="item"
                  :selected="item===row.cwsubType"
                >{{item}}</option>
              </select>
              <span v-show="!row.isEdit">{{ row.cwsubType }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cwContent" label="工作内容" width="auto">
            <template slot-scope="{row}">
              <input type="text" class="edit-cell" v-show="row.isEdit" v-model="row.cwContent">
              <span v-show="!row.isEdit">{{ row.cwContent }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cwScale" label="预投(%)" width="80">
            <template slot-scope="{row}">
              <input type="number" class="edit-cell" v-show="row.isEdit" v-model="row.cwScale">
              <span v-show="!row.isEdit">{{ row.cwScale }}%</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" width='246'>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row, $event)">{{ scope.row.isSave ? '保存' : '修改' }}</el-button>
            <el-button type="warning" size="mini" @click="handleDelete(scope.$index, scope.row, $event)">{{ scope.row.isSave ? '取消' : '删除' }}</el-button>
            <el-button size="mini" v-show="!scope.row.isSave" @click="moveUp(scope.$index)">↑</el-button>
            <el-button size="mini" v-show="!scope.row.isSave" @click="moveDown(scope.$index)">↓</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="control-panel">
        <el-button type="primary" @click="addNewItem">添加新项<i class="el-icon-circle-plus el-icon--right"></i></el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="success" @click="sendingEmail">发送邮件<i class="el-icon-upload el-icon--right"></i></el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="info" @click="exportExcel">导出EXCEL<i class="el-icon-download el-icon--right"></i></el-button>
      </div>

      <el-dialog title="关于" :visible.sync="aboutDialogVisible" width="40%">
        <h3>程序猿（媛）的周报小工具（PC在线版）</h3>
        <h3>当首次填写当前周报时，系统自动初始化内容，内容来自上一周的周报数据。</h3>
        <h4>实投：实际投入；预投：预计投入。</h4>
        <h4>每周(周一至周五)工作投入按百分比计算，上周投入请按实际投入情况填写，本周投入请按预估的情况填写；
个人每周投入比例不超过100%，如若周末加班可超出100%，按半天10%，一天20%来计算。</h4>
        <h3><span style="color:#F56C6C">发送邮件</span>前，请先做好<span style="color:#F56C6C">邮件设置</span></h3>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
import { getCurrentWeek, getLastWeek, weekNumToChinse } from '../utils/index'
import { exportOneWeek } from '../utils/excel'
import email from '../components/Email.vue'
import user from '../components/User.vue'
import moment from 'moment'
import { getCurrentWeekZhoubao, addZhoubao, updateZhoubao, sendEmail } from '../api/api'

export default {
  name: 'Zhoubao',
  data () {
    return {
      // 关于对话框
      aboutDialogVisible: false,
      // 是否需要调用add，没有本周数据，则第一次调用addZhoubao
      isNeedAdd: false,
      timer: '',
      date: moment().format('YYYY-MM-DD') + ' (周' + weekNumToChinse(moment().format('d')) + ') ' + moment().format('HH:mm:ss'),
      subTypes: [
        '【项目管理】',
        '【需求开发】',
        '【软件设计】',
        '【编码与自测】',
        '【软件测试】',
        '【上线实施】',
        '【项目验收】',
        '【支持】',
        '【其他】'
      ],
      editData: {},
      tableData: [],
      emailInfo: []
    }
  },
  methods: {
    clock () {
      this.date = moment().format('YYYY-MM-DD') + ' (周' + weekNumToChinse(moment().format('d')) + ') ' + moment().format('HH:mm:ss')
    },
    // 修改/保存修改
    handleEdit (index, row, event) {
      if (event.target.innerText.trim().includes('修改')) {
        this.tableData[index].isEdit = true
        this.tableData[index].isSave = true

        this.editData[index] = {
          project: this.tableData[index].project,
          lwsubType: this.tableData[index].lwsubType,
          lwContent: this.tableData[index].lwContent,
          lwScale: this.tableData[index].lwScale,
          cwsubType: this.tableData[index].cwsubType,
          cwContent: this.tableData[index].cwContent,
          cwScale: this.tableData[index].cwScale,
          isSave: false,
          isEdit: false
        }
      } else if (event.target.innerText.trim().includes('保存')) {
        this.tableData[index].isEdit = false
        this.tableData[index].isSave = false

        this.saveZhoubao()
      }
    },
    // 删除/取消修改
    handleDelete (index, row, event) {
      if (event.target.innerText.trim().includes('取消')) {
        for (let item in this.editData[index]) {
          this.tableData[index][item] = this.editData[index][item]
        }

        this.tableData[index].isEdit = false
        this.tableData[index].isSave = false
      } else {
        this.tableData.splice(index, 1)

        this.saveZhoubao()
      }
    },
    // 上移
    moveUp (index) {
      if (index === 0) return
      this.tableData[index] = this.tableData.splice(index - 1, 1, this.tableData[index])[0]
      this.saveZhoubao()
    },
    // 下移
    moveDown (index) {
      if (index === this.tableData.length - 1) return
      this.tableData[index] = this.tableData.splice(index + 1, 1, this.tableData[index])[0]
      this.saveZhoubao()
    },
    // 添加一行
    addNewItem () {
      let item = {
        project: '',
        lwsubType: '',
        lwContent: '',
        lwScale: 0,
        cwsubType: '',
        cwContent: '',
        cwScale: 0,
        isSave: true,
        isEdit: true
      }
      this.tableData.push(item)
    },
    rowClass ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'project'
      } else if (columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
        return 'lastWeeK'
      } else if (columnIndex === 4 || columnIndex === 5 || columnIndex === 6) {
        return 'currentWeek'
      } else if (columnIndex === 7) {
        return 'operate'
      }
    },
    headerClass ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 && rowIndex === 0) {
        return { background: 'rgb(226, 226, 226)', 'font-size': '16px', 'color': 'black', 'text-align': 'left' }
      } else if (columnIndex === 1 || (rowIndex === 1 && columnIndex === 2) || (rowIndex === 1 && columnIndex === 0)) {
        return { background: 'whitesmoke', 'font-size': '16px', 'color': 'black', 'text-align': 'left' }
      } else if (columnIndex === 3 && rowIndex === 0) {
        return { background: '#daa5902e', 'font-size': '16px', 'color': 'black', 'text-align': 'left' }
      } else if ((columnIndex === 2 && rowIndex === 0) || (rowIndex === 1 && columnIndex === 3) || (rowIndex === 1 && columnIndex === 4) || (rowIndex === 1 && columnIndex === 5)) {
        return { background: 'white', 'font-size': '16px', 'color': 'black', 'text-align': 'left' }
      }
    },
    async saveZhoubao () {
      let saveApiMethod = this.isNeedAdd ? addZhoubao : updateZhoubao
      try {
        await saveApiMethod({ title: this.week, contentinfo: JSON.stringify(this.tableData) })
        this.isNeedAdd = false
      } catch (ex) {
        console.log('saveZhoubao_exception', ex.message)
      }
    },
    async sendingEmail () {
      if (window.confirm(this.emailInfo.length ? '已经发送过，确定还要发送邮件吗' : '确定要发送邮件吗')) {
        try {
          let response = await sendEmail({ title: this.week })
          if (response.code === 200) {
            console.log('sendEmail_succ', response)
            this.$message({
              message: '邮件发送成功',
              type: 'success'
            })
            setTimeout(function () {
              window.location.reload()
            }, 1000)
          } else if (response.code === -1) {
            console.log('sendEmail_fail', response)
            this.$message({
              message: '邮件信息还没有设置，请先设置邮箱',
              type: 'error'
            })
          } else if (response.code === -2) {
            console.log('sendEmail_fail', response)
            this.$message({
              message: '周报数据为空，请先填写周报',
              type: 'error'
            })
          } else {
            this.$message({
              message: '发送失败，请检查邮箱或网络',
              type: 'error'
            })
          }
        } catch (ex) {
          console.log('sendEmail_exception', ex.message)
        }
      }
    },
    exportExcel () {
      exportOneWeek(getCurrentWeek(), this.tableData, moment().format('YYYY-MM-DD'))
    }
  },
  computed: {
    week () {
      return getCurrentWeek()
    }
  },
  async mounted () {
    this.timer = setInterval(this.clock, 1000)
    console.log('前一周是：', getLastWeek())
    try {
      let currentZhoubao = await getCurrentWeekZhoubao()
      console.log('currentZhoubao', currentZhoubao)
      if (currentZhoubao.success && currentZhoubao.data) {
        this.tableData = JSON.parse(currentZhoubao.data.contentinfo)
        if (!this.tableData.length) {
          let lastZhoubao = await getCurrentWeekZhoubao({ title: getLastWeek() })
          console.log('lastZhoubao', lastZhoubao)

          let lastZhoubaoContent = JSON.parse(lastZhoubao.data.contentinfo)

          for (let item of lastZhoubaoContent) {
            this.tableData.push({
              project: item.project,
              lwsubType: item.cwsubType,
              lwContent: item.cwContent,
              lwScale: item.cwScale,
              cwsubType: '',
              cwContent: '',
              cwScale: '',
              isSave: true,
              isEdit: true
            })
          }
        }
        this.emailInfo = JSON.parse(currentZhoubao.data.emailinfo)
        this.isNeedAdd = false
      } else {
        this.tableData = []
        this.isNeedAdd = true
      }
    } catch (ex) {
      console.log('getCurrentZhoubao_exception', ex.message)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  components: {
    'email': email,
    'user': user
  }
}
</script>
<style scoped>
@import '../assets/zhoubao.css';
</style>
<style>
.project {
  background: rgb(226, 226, 226);
}

.lastWeeK {
  background: whitesmoke;
}
.currentWeek {
  background: white;
}
.operate {
  background: #daa5902e
}
</style>
