<template>
  <Row :gutter="10" style="height:100%">
    <Col span="5" style="height:100%;">
      <FileList />
    </Col>
    <Col span="10" style="height:100%">
      <OperateArea />
    </Col>
    <Col span="9" style="height:100%">
      <ModuleList />
    </Col>
  </Row>
</template>

<script>
import FileList from './fileList/fileList'
import OperateArea from './operateArea/index'
import ModuleList from './moduleList/moduleList'

export default {
  name: "index",
  components:{
    FileList,
    OperateArea,
    ModuleList
  },
  methods: {

  }
};
</script>
