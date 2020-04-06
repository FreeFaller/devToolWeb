<template>
  <div class="action-area">
    <Button type="primary" @click="confirm">确认</Button>
    <Button>copy源码</Button>
    <Button @click="checkCode">查看源码</Button>
    <Modal
      v-model="codeModal"
      title="查看源码"
      width="850"
      :mask-closable="false">
      <pre v-highlight :key="key"><code>{{code}}</code></pre>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapState, mapActions } from 'vuex'
import highlight from "@/directive/highlight";

export default {
  name: "actions",
  data() {
    return {
      drag: false,
      codeModal:false,
      key:1, //用于重新初始化highlight计算
    };
  },
  computed: {
    componentList:{
      get(){
        return this.$store.state.components.componentList
      },
      set(value) {
        this.$store.dispatch('components/setComponent', value)
      }
    },
    ...mapState({
      address:state => state.components.address,
      code:state => state.components.code.replace(/↵/g,'\n') ,
    })
  },
  directives: {
    highlight
  },
  methods: {
    //点击确认
    confirm(){
      const components = this.componentList.map(ele => ele.name)
      if(!components.length){
        this.$Message.error('请选择组件')
        return
      }
      const postData = {
        components,
        address:this.address
      }
      request.post('api/vue/getCode', postData).then((data)=>{
        this.$store.dispatch('components/setCode', data)
        this.$store.dispatch('components/setComponent', [])
        this.key++
        this.$Message.success('代码生存成功')
      });
    },
    //查看源码
    checkCode(){
      this.codeModal = true
    },
  }
};
</script>
<style lang="less" scoped>
.action-area{
  margin: 20px 0 30px 0;
  padding: 10px;
  text-align: center;
  .ivu-btn{
    margin-right: 30px;
    width: 100px;
  }
}
</style>
