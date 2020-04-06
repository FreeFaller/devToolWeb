<template>
  <div>
    <div class="select-project">
      <Select @on-change="changeProject" v-model="projectId" placeholder="请选择项目">
        <Option 
          v-for="(item,index) in projects" 
          :value="index"
        >
          {{item.name}}
        </Option>
      </Select>
    </div>
    
    <div class="file-list" v-if="fileList.length">
      <div class="fileListUl">
        <Select v-model="file" filterable clearable @on-change="chooseFile">
          <Option v-for="item in fileList" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <Tree :data="filterFileTree" @on-select-change="selectVueFile"></Tree>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapState, mapActions } from 'vuex'

export default {
  computed:mapState({
    project:state => state.index.project
  }),
  data(){
    return{
      projectId: undefined,
      file:'',
      fileList: [],//项目文件列表
      filterFileTree:[],
      projects: [],
      searchword:''
    }
  },
  methods: {
    getProject(){
      request.get('api/vue/projectInfo').then((data)=>{
        this.projects = data.project
        let curProject = this.$route.query.project
        if (curProject || curProject === 0) {
          this.projectId = curProject
          this.changeProject(curProject)
        }
      })
    },
    getVueFile(url){
      if(!url){
        return
      }
      request.post('api/vue/getVueFile', {url}).then((data)=>{
        let list = this.pathToTree(data.map(item=>item.slice(1)))
        this.fileList = data
        this.filterFileTree = list
      });
    },
    //左侧树选中文件
    selectVueFile(file){
      let project = this.projects[this.projectId]
      if (file && file.length > 0) {
        if (file[0].children.length > 0) {
          file[0].selected = false
          file[0].expand = !file[0].expand
          return
        }
        let fileName = '/' + file[0].key
        this.$store.dispatch('index/setProject', {
          ...project,
          fileName
         })
        // document.getElementById('fileNameId').scrollIntoView()
      }else{
        this.$store.dispatch('index/setProject', {
          ...project,
          fileName:''
        })
      }
    },
    //下拉框选中文件
    chooseFile(fileName){
      let project = this.projects[this.projectId]
      this.$store.dispatch('index/setProject', {
        ...project,
        fileName
      })
    },
    changeProject(index){
      if (this.projects[index]) {
        this.searchword = ''
        let project = this.projects[index]
        let v = project.projectPath
        // if(project.type === 'feHelper'){
        //   v = `${v}/src`
        // }
        this.getVueFile(v)
        this.projects[index].fileName = ''
        this.$store.dispatch('index/setProject', this.projects[index])
      }
    },
    pathToTree(list){
      let output = [];
      list.forEach(item =>{
        let chain = item.split("/");
        let currentNode = output;
        for (let j = 0; j < chain.length; j++) {
          let wantedNode = chain[j];
          let lastNode = currentNode;
          for (var k = 0; k < currentNode.length; k++) {
            if (currentNode[k].title == wantedNode) {
              currentNode = currentNode[k].children;
              break;
            }
          }
          if (lastNode == currentNode) {
            let newNode = currentNode[k] = { key: item, title: wantedNode, children: [] };
            currentNode = newNode.children;
          } else {
            delete currentNode.children
          }
        }
      })
      return output;
    }
  },
  mounted(e) {
    this.getProject()
  }
};
</script>

<style lang="less" scoped>
.select-project{
  margin-bottom: 15px;
}
.file-list{
  border:1px solid #ddd;
  padding:15px;
  background: #fff;
  .fileListUl{
    width: 100%;
    line-height:24px;
    max-height: 500px;
    overflow: auto;
    li{
      cursor: pointer;
    }
    li:hover{
      color: #30a1f2;
    }
  }
}

</style>
