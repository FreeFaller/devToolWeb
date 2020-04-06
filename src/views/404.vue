<template>

<div>
<Table :columns="columns" :data="data"></Table>
<Form :model="dadaf">
<FormItem label="1" prop="va">
  <Input type="textarea" v-model="dadaf.va" placeholder="1" clearable  />
</FormItem>
<FormItem label="3" prop="a">
  <Select v-model="dadaf.a" placeholder="2" clearable   >
  <Option v-for="item in fae" :value="item.value" :key="item.value">{{ item.label }}</Option>
</Select>
</FormItem>
<FormItem label="4" prop="b">
  <CheckboxGroup v-model="dadaf.b">
  <Checkbox label="">Checkbox1</Checkbox>
</CheckboxGroup>
</FormItem>
</Form>
</div>

</template>
<script>
export default {
  data() {
    return {
      columns: [{
        title: "名称",
        key: "name",
        filterMethod(row, p) {}
      }, {
        title: "描述",
        key: "desc",
        sortable: true
      }, {
        title: "运行速度",
        key: "speed"
      }, {
        title: "开始时间",
        key: "startTime"
      }, {
        title: "结束时间",
        key: "endTime",
        render(h, params) {}
      }, {
        title: "操作",
        key: "oprate"
      }],
      data: [],
      dadaf: {
        va: "",
        a: "",
        b: []
      },
      fae: []
    };
  },

  methods: {}
};
</script>