<template>
  <div>
    项目地址：<Input v-model="url" placeholder="请输入项目地址" style="width: 300px" clearable />
    <Button @click="selectUrl">确认</Button>
    <div class="fileList">
      <ul class="fileListUl" v-if="list.length">
        <li v-for="item in list" :key="item" @click="selectFile(item)">
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
    <div>
      当前编辑文件：
      <span class="file-name" v-if="address">{{address}}</span>
      <span class="file-name" v-if="!address">暂无</span>
      <Button @click="clearFile" v-if="address">清除</Button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapState, mapActions } from 'vuex'

export default {
  name: "fileList",
  data() {
    return {
      url: '/Users/sxc/Desktop/work/net/netManage/src',
      list: [],
      selectedFile: ''
    };
  },
  computed:{
    address:{
      get(){
        return this.$store.state.components.address
      },
      set(value) {
        this.$store.dispatch('components/editAddress', value)
      }
    },
  },
  
  methods: {
    getVueFile(){
      //let url = `/Users/sxc/Desktop/work/net/netManage/src`
      request.post('api/vue/getVueFile', {url: this.url}).then((data)=>{
        this.list = data
      });
    },

    selectUrl(){
      if(!this.url){
        this.$Message.error('请填写项目地址')
        return
      }
      this.getVueFile()
    },

    selectFile(file){
      this.address = `${this.url}${file}`
    },

    clearFile(){
      this.address = ''
    }
  },

  mounted() {
    
  }
};
</script>
<style lang="less" scoped>

</style>
