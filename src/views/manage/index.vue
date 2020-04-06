<template>
  <Row :gutter="10" style="height:100%">
    <div style="text-align:right">
      仓库地址：<Input v-model="storePath" style="width:400px" />
      <Button @click="editStroePath" type="primary">设置</Button>
      <Button @click="addProject" type="primary">新增项目</Button>
    </div>
    <Br />
    <Table :columns="columns1" :data="projectsData"></Table>

    <Modal
      v-model="show1"
      title="编辑/新增"
      @on-ok="okEdit"
      :mask-closable="false">
      <div>
        <Form :model="formData" :label-width="80">
        <FormItem label="项目名称">
            <Input v-model="formData.name" placeholder="项目名称"></Input>
        </FormItem>
        <FormItem label="项目类型">
            <Select v-model="formData.type" style="width:200px">
                <Option v-for="item in types" :value="item">{{item}}</Option>
            </Select>
        </FormItem>
        <FormItem label="项目地址">
            <Input v-model="formData.projectPath" placeholder="项目地址"></Input>
        </FormItem>
        <FormItem label="feHelper" v-if="formData.type!='feHelper'">
            <Input v-model="formData.projectStore" placeholder="feHelper目录"></Input>
        </FormItem>        
      </Form>
      </div>
    </Modal>


    <Modal
      v-model="show3"
      title="删除项目"
      @on-ok="okDel"
      :mask-closable="false">
      <div>        
        确认删除项目{{cItem.name}}?
      </div>
    </Modal>


  </Row>
</template>

<script>
import request from '@/utils/request'
export default {
  name: "manage",
  data(){
    return{
      storePath: '',
      optype: 'add',
      formData: {
        type: 'feHelper'
      },
      types: ['feHelper', 'old'],
      show1: false,
      show2: false,
      show3: false,
      cIndex: 0,
      cItem: {},
      projectsData: [],
      columns1: [
            {
                title: '项目名称',
                key: 'name'
            },
            {
                title: '项目类型',
                key: 'type'
            },
            {
                title: '项目地址',
                key: 'projectPath'
            },
            {
                title: 'feHelper目录',
                key: 'projectStore'
            },
            {
                title: '命令',
                key: '',
                render: (h, params) => {
                    return <div>
                              <a href="javascript:;" onClick={this.run.bind(null, params.row.name)}>启动</a>&nbsp;&nbsp;
                              <a href="javascript:;" onClick={this.editPage.bind(null, params)}>打包</a>
                            </div>
                }
            },
            {
                title: '操作',
                key: '',
                render: (h, params) => {
                    return <div>
                              <a href="javascript:;" onClick={this.edit.bind(null, params)}>编辑</a>&nbsp;&nbsp;
                              <a href="javascript:;" onClick={this.goPageEdit.bind(null , params)}>页面编辑</a>&nbsp;&nbsp;
                              <a href="javascript:;" onClick={this.delProject.bind(null, params.row)}>删除</a>
                            </div>
                }
            }
        ],
    }
  },
  //
  components:{
    
  },
  methods: {
    goPageEdit({row}){
      if (row.name) {
        this.$router.push({ path: '/index/index' ,query: { project: row._index }})
      }
    },
    editStroePath(){
       request.post('api/editStorePath', {storePath: this.storePath}).then((data)=>{
          this.$Message.success('操作成功')
        })  
    },

    getProject(){
      request.get('api/vue/projectInfo').then((data)=>{
        this.projectsData = data.project
        this.storePath = data.storePath
      })
    },

    addProject(){
      this.optype = 'add'
      this.show1 = true
      this.formData = {
        type: 'feHelper'
      }
    },

    edit(row){
      this.optype = 'edit'
      this.show1 = true
      this.formData = Object.assign({}, row.row)
      this.cIndex = row.index
      this.cItem = row.row
    },

    okEdit(){

      let {name, projectPath, projectStore, type} = this.formData
      let sendData = {name, projectPath, projectStore, type}
      if(this.optype === 'add'){
        request.post('api/addProject', sendData).then((data)=>{
          this.$Message.success('添加成功')
          this.getProject()
        })  
      }

      if(this.optype === 'edit'){
        let editData = {
          index: this.cIndex,
          project: sendData
        }
        request.post('api/editProject', editData).then((data)=>{
          this.$Message.success('编辑成功')
          this.getProject()
        })  
      }
          
    },

    editPage(row){
      this.show2 = true
      this.treeData = row.row.pages
    },

    delProject(row){
      this.show3 = true
      this.cItem = row
    },

    okDel(){
      let sendData = {
        name: this.cItem.name
      }
      request.post('api/delProject', sendData).then((data)=>{
        this.$Message.success('删除成功')
        this.getProject()
      })
      
    },

    run(name){
      request.get('api/runProject', {name}).then((data)=>{
        this.$Message.success('启动成功')
      })
    }


  },
  mounted(e) {
    this.getProject()
  }
};
</script>
