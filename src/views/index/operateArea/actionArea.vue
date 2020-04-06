<template>
  <div class="area btn-box">
    <Button type="primary" @click="confirm">确认</Button>
    <Button @click="preview">预览</Button>
    <Button @click="checkCode">查看源码</Button>
    <Button @click="copyCode">copy源码</Button>
    <!-- 用于承载异步加载copy数据的隐藏button -->
    <Button data-clipboard-text="" id="hideCopyBtn" style="display:none">copy源码</Button>
    <Button @click="clear">清空组件</Button>

    <Modal
      v-model="codeModal"
      title="查看源码"
      width="850"
      :mask-closable="false">
      <pre v-highlight :key="key"><code>{{code}}</code></pre>
      <div slot="footer"></div>
    </Modal>

    <Modal
      v-model="confirmModal"
      title="确认"
      @on-ok="okEdit"
      :mask-closable="false">
      <div>
        确认将组件插入到下面的文件吗？
        <div class="fileName-confirm">{{project.fileName}}</div>
      </div>
    </Modal>

    <Modal
      v-model="previewModal"
      title="组件预览"
      width="1000px"
      :mask-closable="false">
      <div class="overview-box">
        <iframe id="previewIframe" src="" class="overview"></iframe> 
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import Vue from "vue"
import Clipboard from 'clipboard'
import request from '@/utils/request'
import { mapState, mapActions } from 'vuex'
import highlight from "@/directive/highlight"

export default {
  name: "actions",
  data() {
    return {
      previewFile: '',
      previewUrl: '',
      drag: false,
      key:1, //用于重新初始化highlight计算
      previewModal: false,
      codeModal: false,
      confirmModal: false,
      clipboard:null,
    };
  },
  computed: {
    ...mapState({
      componentList:state => state.index.componentList,
      project:state => state.index.project,
      code:state => state.index.code.replace(/↵/g,'\n') ,
    })
  },
  directives: {
    highlight
  },
  methods: {
    //点击确认
    confirm(){
      if(!this.project.projectPath){
        this.$Message.error('请先选择项目')
        return
      }
      if(!this.project.projectStore){
        this.$Message.error('项目组件仓库没有配置')
        return
      }
      if(!this.componentList.length){
        this.$Message.error('请选择组件')
        return
      }

      let components = this.componentList.map(ele => ele.name)
      let {fileName, projectPath, projectStore} = this.project
      const postData = {
        components,
        fileName: fileName ? `${projectPath}${fileName}` : '',
        projectPath,
        projectStore
      }
      this.cSendData = postData
      
      if(!fileName){
        this.confirmEdit(1)
      }else{
        this.confirmModal = true
      }      
    },
    confirmEdit(t){
      let txt = t === 1 ? '组件代码生存成功' : '组件代码成功插入页面'
      request.post('api/vue/getCode', this.cSendData).then((data)=>{
        this.key++
        this.$store.dispatch('index/setCode', data)
        this.clear()
        this.$Message.success(txt)
      });
    },
    //清空组件选择框
    clear(){
      this.$store.dispatch('index/setComponent', [])
    },
    okEdit(){
      this.confirmEdit()
    },
    //查看源码
    checkCode(){
      let components = this.componentList.map(ele => ele.name)
      if(!components.length){
        this.$Message.error('请选择组件后查看源码')
        return
      }
      let sendData = {
        components
      }
      request.post('api/vue/checkCode', sendData).then((data)=>{
        this.key++
        this.$store.dispatch('index/setCode', data)
        this.codeModal = true
      });
    },
    //copy源码
    copyCode(e){
      let components = this.componentList.map(ele => ele.name)
      let str = ''
      if(!components.length){
        this.$Message.error('请选择组件后copy源码')
        e.stopPropagation()
        return
      }
      let sendData = {
        components
      }      
      request.post('api/vue/checkCode', sendData).then((data)=>{
        const colCopyBtn = document.getElementById('hideCopyBtn');
        str = data
        if (colCopyBtn) {
          if (str === '') {
            this.$Message.error('当前暂无数据');
          } else {
            colCopyBtn.setAttribute('data-clipboard-text',str);
            colCopyBtn.click()
          }
        }
      });
    },
    //预览
    preview(){
      let components = this.componentList.map(ele => ele.name)
      if(!components.length){
        this.$Message.error('请选择组件')
        return
      }
      let sendData = {
        components
      }
      document.getElementById('previewIframe').src = 'about:blank'
      request.post('api/vue/preview', sendData).then((data)=>{
        this.key++
        this.$store.dispatch('index/setCode', data)
        this.$Message.success('预览加载中，请稍候...')
        setTimeout(()=>{
          this.previewModal = true
          document.getElementById('previewIframe').src = `http://localhost:8010/#/preview`
        },1000)
      });
    },
  },
  mounted(){
    this.clipboard = new Clipboard('#hideCopyBtn');
    this.clipboard.on('success', (e)=> {
      this.$Message.success('源码已copy到剪贴板，请直接粘贴使用');
      e.clearSelection();
    });
    this.clipboard.on('error', (e)=> {
      this.$Message.error('copy失败');
    });
  },
  beforeDestroy(){
    this.clipboard.destroy();
  },
};
</script>
<style lang="less" scoped>
.area{
  padding:15px;
  background: #fff;
  margin:15px 0;
  border: 1px solid #ddd;
}
.btn-box{
  text-align:center;
  .ivu-btn{
    margin: 0 5px;
  }
}
.fileName-confirm{
  color: #ff0000;
}
.overview-box{
  height:400px;
}
.overview{
  border: none;
  width:100%;
  height:100%;
}
</style>