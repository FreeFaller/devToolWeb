<template>
  <div class="type-list">
    <p class="name">{{ name }}</p>
    <ul class="name-list">
      <draggable
        :list="myComponents"
        :sort="false"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone=handlClone
      >
          <li 
            v-for="element in myComponents" 
            v-if="!element.hidden"
            :key="element.name" 
            class="no-cell component-cell"
            :title="getTitle(element)"
            @click="showReadMe(element)"
          >{{element.cName}}
        </li>
      </draggable>
    </ul>
    <Modal
      v-model="readModal"
      title="readMe"
      width="850"
      :mask-closable="false">
      {{readTxt}}
      <div v-if="cComponents.name"><img :src="`/fe-helper-store/${cComponents.name}/view.png`" /></div>
      <div slot="footer"></div>
    </Modal>

  </div>
</template>

<script>
import request from '@/utils/request'
import draggable from 'vuedraggable'
import { mapState, mapActions } from 'vuex'

export default {
  name: "typeList",
  components: {
    draggable,
  },
  props:{
    storePath:{
      type:String,
      default:''
    },
    name:{
      type:String,
      default:''
    },
    componentNames:{
      type:Array,
      default:[]
    }
  },
  data(){
    return{
      cComponents: {},
      readModal: false,
      key:1, //用于重新初始化highlight计算
      readTxt: '',
      myComponents:[...this.componentNames] || []
    }
  },
  computed:mapState({
    uuid:state => state.components.uuid
  }),
 
  methods:{
    // 拷贝拖拽前新增uuid
    handlClone(original){
      const newOriginal = {...original,uuid : this.uuid }
      this.$store.dispatch('components/uuidAdd')
      return newOriginal
    },

    getTitle(item){
      return `依赖：${item.base}\n作者：${item.author}`
    },

    showReadMe(item){
      this.readModal = true
      this.cComponents = item
      request.get('api/vue/getReadMe', {name: item.name}).then((data)=>{
        this.readTxt = data
      })
    }
  }
};
</script>

<style scoped lang="less">
.type-list{
  .name{
    width: 100%;
    text-align: center;
    line-height: 35px;
    background-color: #2a313c;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    min-width: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .name-list{
    li{
      min-width: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 5px 10px;
      cursor: move;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      &:hover{
        background-color: #dff2fe
      }
    }
    .no-cell{
      display: block;
      border: 0;
      background-color: #fff;
      margin:0;
      line-height: 25px;
      box-shadow: none;
    }
    .sortable-chosen{
      color: #1f85c0;
      font-weight: bold;
    }
  }
}
</style>