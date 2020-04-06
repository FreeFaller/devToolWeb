<template>
  <draggable
    v-model="componentList"
    class="dragArea"
    group="people"
    @change="log"
    @start="drag = true"
    @end="drag = false"
  >
    <transition-group class="trans-group" type="transition" :name="!drag ? 'flip-list' : null">
      <div
        class="component-cell"
        v-for="element in componentList"
        :key="element.uuid"
      >
        <span>{{ element.cName }}</span>
        <Icon type="md-close" class="del-icon" @click="delComponent(element.uuid)"/>
      </div>
    </transition-group>
  </draggable>
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
        return this.$store.state.components.componentList
      },
      set(value) {
        this.$store.dispatch('components/setComponent', value)
      }
    },
    ...mapState({
      uuid: state => state.components.uuid,
    })
  },
  methods: {
    log(evt) {
      window.console.log(evt);
    },
    delComponent(uuid){
      let newList = this.componentList.filter(ele => ele.uuid !== uuid)
      this.$store.dispatch('components/setComponent', newList)
    }
  }
};
</script>
<style lang="less">

.dragArea{
  background-color: #fff;
  height: 100px;
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(42,49,60,.1);
  .trans-group{
    width: 100%;
    height: 100%;
    display: block;
    min-height: 200px;
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
</style>
