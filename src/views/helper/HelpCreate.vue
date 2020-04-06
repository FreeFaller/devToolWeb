<template>
  <Row :gutter="15" style="height:100%">
    <Col span="4" style="height:100%;">
      <!-- 左侧组件拖拽列表 -->
      <ComponentList />
    </Col>
    <Col span="20" style="height:100%">
      <!-- 文件合成区域 -->
      <FileArea />
    </Col>
  </Row>
</template>

<script>
import ComponentList from './component/ComponentList/index'
import FileArea from './component/FileArea/index'

export default {
  name: "helper",
  components:{
    ComponentList,
    FileArea
  }
};
</script>
