<template>
  <div class="component-list">
    <TypeList
      v-for="item in components"
      :key="item.type"
      :name="item.name" 
      :componentNames="item.componentNames" 
      :storePath="storePath"
      />
  </div>
</template>

<script>
import request from '@/utils/request'
import TypeList from './TypeList'
import draggable from 'vuedraggable'
export default {
  name: "componentList",
  components:{
    TypeList ,
    draggable
  },
  data(){
    return{
      components:[],
      storePath: ''
    }
  },
  methods: {
    getComponetsByType(type, data){
      let arr = []
      data.forEach((item) => {
        if(item.type === type){
          arr.push(item)
        }
      })
      return arr
    }
  },
  mounted() {
    request.get('api/vue/getComponets').then((data)=>{
        this.storePath = data.storePath
        let types = [],
            arr = []
        data.infos.forEach((item) => {
          if(types.indexOf(item.type) === -1){
            types.push(item.type)
          }
        })

        types.forEach((item) => {
          let obj = {
            type: item,
            name: item
          }
          obj.componentNames = this.getComponetsByType(item, data.infos)
          arr.push(obj)
        })
        this.components = arr
      });
  }
};
</script>

<style scoped lang="less">
.component-list{
  height: 100%;
  overflow: auto;
  padding-bottom: 20px;
}
</style>
