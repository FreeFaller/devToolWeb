<template>
  <div>
    <div class="dragArea" v-show="!componentList.length" style="text-align:center">请从右侧选择组件</div>
    <draggable
      v-model="componentList"
      v-show="componentList.length"
      class="dragArea"
      group="people"
      @change="log"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group
        class="trans-group" 
        type="transition" 
        :name="!drag ? 'flip-list' : null">
        <div 
          v-for="item in componentList"
          :key="item.uuid"
          class="component-cell"
        >
          <div>
            <span>{{item.cName}}</span>
            <Icon type="md-close" class="del-icon" @click="delComponent(item.uuid)"/>
          </div>
        </div>
      </transition-group>
    </draggable>
    <div class="img-area" v-show="viewImgSrc">
      <img :src="viewImgSrc"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: "componentList",
  components: {
    draggable
  },
  data() {
    return {
      drag: false
    };
  },
  computed: {
    componentList:{
      get(){
        return this.$store.state.index.componentList
      },
      set(value) {
        this.$store.dispatch('index/setComponent', value)
      }
    },
    viewImgSrc(){
      return this.$store.state.index.viewImgSrc
    }
  },
  methods: {
    log(evt) {
      window.console.log(evt);
    },
    delComponent(uuid){
      let newList = this.componentList.filter(ele => ele.uuid !== uuid)
      this.$store.dispatch('index/setComponent', newList)
    }
  }
};
</script>
<style lang="less">

.dragArea{
  background-color: #fff;
  min-height: 200px;
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(42,49,60,.1);
  .trans-group{
    width: 100%;
    height: 100%;
    display: block;
    min-height: 160px;
  }
  .component-cell{
    display: inline-block;
    border: solid 2px transparent;
    background-color: #fff;
    padding: 10px 15px;
    margin:0 20px 20px 0;
    line-height: 20px;
    box-shadow: 0 2px 4px 0 rgba(140, 156, 184, 0.3);
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: move;
    .del-icon{
      color: #e77272;
      cursor: pointer;
      font-weight: bold;
      &:hover{
        color: #d93030;
      }
    }
  }
  .sortable-chosen{
    border: dotted 2px #1f85c0;
    color: #1f85c0;
    font-weight: bold;
  }
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.img-area{
  width: 100%;
  min-height: 10px;
  position: absolute;
  top: 150px;
  right: -70px;
  img{
    width: 450px;
    height: 300px;
    border: solid 5px #ddd; 
  }
}
</style>
