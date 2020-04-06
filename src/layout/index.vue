<template>
  <div class="layout">
    <Layout :style="{ height: '100%' }">
      <Header>
        <div class="layout-logo">FEhelper
          <div class="layout-menu">
            <a href="#/manage/manage">项目管理</a>
            <a href="#/">组件开发</a>
            <a href="#/dynamic/dynamic">动态组件</a>
          </div>
        </div>
      </Header>
      <Layout :style="{ height: '100%' }">
        <Sider hide-trigger :style="{ overflow: 'auto' }">
          <Sidebar />
        </Sider>
        <Layout :style="{ padding: '20px', height: '100%' }">
          <router-view></router-view>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Sidebar from "./components/Sidebar";
export default {
  name: "mainLayout",
  components: {
    Sidebar
  }
};
</script>
<style lang="less" scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  height: 100%;
}
.layout-logo {
  position: relative;
  color: #f5f7f9;
  font-size: 36px;
  overflow: hidden;
  padding: 0 20px;
  .layout-menu{
    position: absolute;
    top: 0;
    left: 200px;
    a{
      font-size:16px;
    }
  }
}

.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.ivu-layout-header{
  padding: 0;
  background-color: #2a313c;
}
.ivu-layout-sider{display: none}
</style>
