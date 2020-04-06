<template>
  <div class="component-list">
    <ul>
      <li></li>
    </ul>
    <FileList />
    <!--<FileInfo />-->
    <DragArea />
    <ActionArea />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import DragArea from './DragArea'
import ActionArea from './ActionArea'
import FileInfo from './FileInfo'
import FileList from './FileList'

export default {
  name: "componentList",
  components: {
    draggable,
    DragArea,
    ActionArea,
    FileInfo,
    FileList
  },
  data() {
    return {
      drag: false,
    }
  },
  methods: {

  }
};
</script>
<style lang="less">
.component-list{
  height: 100%;
  overflow: auto;
  background-color: #f1f2f2;
  padding: 20px;
}
</style>
