<template>
  <div class="oprate">
    <h4 id="fileNameId" class="file-name">
      <span>当前文件：</span>
      <span>{{project.fileName}}&nbsp;&nbsp;</span>
      <a href="javascript:;" @click="clearFile">新文件</a>
    </h4>
    <!-- 组件区域 -->
    <ComponentArea />
    <!-- 操作区域 -->
    <ActionArea />
  </div>
</template>

<script>
import request from '@/utils/request'
import ActionArea from "./actionArea";
import ComponentArea from "./componentArea";
import { mapState, mapActions } from 'vuex'

export default {
  components:{
    ActionArea,
    ComponentArea
  },
  computed:mapState({
    project:state => state.index.project
  }),
  data(){
    return{
      list: [],
      cSendData: {}
    }
  },
  methods: {
    clearFile(){
      this.$store.dispatch('index/setProject', {
        ...this.project,
        fileName:''
      })
    },
  },
  mounted() {
    
  }
};
</script>

<style lang="less" scoped>
.file-name{
  word-break: break-all;
}
</style>
