<template>
  <div>
    <Checkbox v-model="tableData.pages">翻页</Checkbox>
    <Checkbox v-model="tableData.search">搜索</Checkbox>
    <Checkbox v-model="tableData.del">删除</Checkbox>
    <Checkbox v-model="tableData.edit">编辑</Checkbox>
    <Checkbox v-model="tableData.oprateBtn">功能按钮</Checkbox>
    <br /><br />
    <div class="dynamic-search" v-if="tableData.search">
      搜索内容设置：
      <dyForm type="search" ref="searchForm" />
     
    </div>
     <br />
    <div class="dynamic-search" v-if="tableData.edit">
      编辑内容设置：
      <dyForm type="edit" ref="editForm" />
    </div>
    <BR/>data变量名：
    <Input placeholder="如不输自动生成" v-model="tableData.dataName" />columns变量名:
    <Input placeholder="如不输自动生成" v-model="tableData.columnsDataName" />
    <br />
    <br />columns批量生成：
    <Input v-model="columnsArr" placeholder="title,key|title,key" style="width:800px;" />
    <Button @click="addColumns(tableData.columns)">批量生成columns</Button>
    <Divider />
    <div v-for="(column, index) in tableData.columns" class="dynamic-module-item">
      title:
      <Input placeholder="title" v-model="column.title" />key:
      <Input placeholder="key" v-model="column.key" />type:
      <Select clearable v-model="column.type" style="width:80px">
        <Option v-for="type in tableTypes" :value="type" :key="type">{{ type }}</Option>
      </Select>
      width:<Input placeholder="width" v-model="column.width" style="width:80px" />
      fixed:<Select clearable v-model="column.fixed" style="width:80px">
        <Option value="left" key="left">left</Option>
        <Option value="right" key="right">right</Option>
      </Select>
      align:<Select clearable v-model="column.align" style="width:80px">
        <Option value="left" key="left">left</Option>
        <Option value="right" key="right">right</Option>
        <Option value="center" key="center">center</Option>
      </Select>
      <CheckboxGroup v-model="column.options">
        <Checkbox label="render">
          <span>render</span>
        </Checkbox>
        <Checkbox label="filter">
          <span>过滤</span>
        </Checkbox>
        <Checkbox label="sort">
          <span>排序</span>
        </Checkbox>
        <Checkbox label="oprate">
          <span>操作</span>
        </Checkbox>
      </CheckboxGroup>
      <Button type="error" ghost @click="delItem(tableData.columns, index)">del</Button>&nbsp;&nbsp;
      <Button
        type="primary"
        v-if="index === tableData.columns.length-1"
        @click="addTableItem(tableData.columns)"
      >add</Button>
    </div>
  </div>
</template>
<script>
import dyForm from "./form";
export default {
  name: "DFORM",
  components: {dyForm},
  data() {
    return {
      columnsArr: "",

      tableData: {
        name: "表格",
        type: "table",
        pages: true,
        tableType: "",
        search: false,
        searchData: null,
        editFormData: null,
        dataName: "",
        columnsDataName: "",
        columns: [
          {
            type: "",
            key: "",
            title: "",
            options: []
          }
        ]
      },

      tableTypes: ["index", "selection", "expand", "html"]
    };
  },

  methods: {
    getData(){
      if(this.tableData.search){
        this.tableData.searchData = this.$refs.searchForm.getData()
      }
      if(this.tableData.edit){
        this.tableData.editFormData = this.$refs.editForm.getData()
        this.tableData.editFormData.edit = true
      }
      return this.tableData
    },

    addColumns(columns) {
      let arr = this.columnsArr;
      arr = arr.trim();
      arr = arr.split(",");
      let newClumns = [];
      arr.forEach(item => {
        let p = item.split("|");
        columns.push({
          type: "",
          title: p[0],
          key: p[1],
          options: []
        });
      });
    },

    delItem(o, index) {
      o.splice(index, 1);
    },
    addTableItem(o) {
      o.push({
        key: "",
        title: ""
      });
    }
  }
};
</script>
