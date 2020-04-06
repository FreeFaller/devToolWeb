<template>
  <div>
    <div v-if="type=='form'">
      表单类型：
      <RadioGroup v-model="formData.formType">
        <Radio label="form">普通表单</Radio>
        <Radio label="search">搜索</Radio>
      </RadioGroup>
    </div>
    
    <div v-if="type=='form'">model变量名：
    <Input placeholder="如不输自动生成" v-model="formData.dataName" />
    </div>
    <Divider />
    <div v-for="(item, index) in formData.formItem" class="dynamic-module-item">
      type：
      <Select
        clearable
        v-model="item.type"
        @on-change="changeFormItemType($event, index, formData.formItem)"
      >
        <Option v-for="type in formTypes" :value="type" :key="type">{{ type }}</Option>
      </Select>
      <template v-if="item.type">
        label：
        <Input v-model="item.label" placeholder="label" />key：
        <Input v-model="item.key" style="width:80px" placeholder="key" />
        <template v-if="hasParm(item.type, 'placeholder')">
          placeholder:
          <Input v-model="item.placeholder" placeholder="placeholder" />
        </template>
        <template v-if="hasParm(item.type, 'dataName')">
          数据名称：
          <Input placeholder="如不输自动生成" v-model="item.dataName" />
        </template>
        <CheckboxGroup v-model="item.options">
          <Checkbox v-if="hasParm(item.type, 'clearable')" key="clearable" label="clearable">可清空</Checkbox>
          <Checkbox key="labelGroup" label="labelGroup">label组</Checkbox>
          <Checkbox v-if="hasParm(item.type, 'multiple')" key="multiple" label="multiple">多选</Checkbox>
          <Checkbox v-if="hasParm(item.type, 'filterable')" key="filterable" label="filterable">可搜索</Checkbox>
          <Checkbox v-if="hasParm(item.type, 'compass')" key="compass" label="compass">组合</Checkbox>
        </CheckboxGroup>
      </template>
      <Button type="error" ghost @click="delItem(formData.formItem, index)">del</Button>&nbsp;&nbsp;
      <Button
        type="primary"
        v-if="index === formData.formItem.length-1"
        @click="addFormItem(formData.formItem)"
      >add</Button>

      <div v-if="formData.formType==='form'">
        <br />验证相关：
        <Checkbox v-model="item.validate.required">required</Checkbox>验证类型：
        <Select clearable v-model="item.validate.type">
          <Option v-for="type in validateTypes" :value="type" :key="type">{{ type }}</Option>
        </Select>错误提示：
        <Input v-model="item.validate.message" placeholder="错误提示" />
      </div>
      <Divider />
    </div>
  </div>
</template>
<script>
export default {
  name: "DFORM",
  props:{
    type: ''
  },
  data() {
    return {
      optionCase: {
        placeholder: [
          "input",
          "select",
          "date",
          "daterange",
          "time",
          "timerange",
          "year",
          "month",
          "inputNumber",
          "password",
          "textarea"
        ],
        clearable: [
          "input",
          "select",
          "date",
          "daterange",
          "time",
          "timerange",
          "year",
          "month",
          "password",
          "textarea"
        ],
        multiple: ["select"],
        filterable: ["select"],
        compass: ["radio", "checkbox"],
        dataName: ["select"]
      },
      validateTypes: [
        "string",
        "number",
        "array",
        "object",
        "boolean",
        "email",
        "url",
        "date"
      ],

      formTypes: [
        "input",
        "select",
        "radio",
        "checkbox",
        "textarea",
        "switch",
        "date",
        "daterange",
        "year",
        "month",
        "time",
        "timerange",
        "inputNumber",
        "password"
      ],

      formData: {
        name: "表单",
        type: "form",
        formType: "form",
        dataName: "",
        formItem: [
          {
            type: "",
            label: "",
            key: "",
            placeholder: "",
            dataName: "",
            options: ["clearable"],
            validate: {
              required: true,
              type: "",
              message: "",
              trigger: ""
            }
          }
        ]
      }
    };
  },

  methods: {
    getData() {
      return this.formData;
    },
    addFormItem(o) {
      o.push({
        type: "",
        label: "",
        key: "",
        placeholder: "",
        options: [],
        validate: {
          required: true,
          type: "",
          message: "",
          trigger: ""
        }
      });
    },


    delItem(o, index) {
      o.splice(index, 1);
    },

    hasParm(type, key) {
      let arr = this.optionCase[key];
      if (arr.indexOf(type) !== -1) {
        return true;
      }
      return false;
    },

    changeFormItemType(type, index, items) {
      let basePrm = {
        type: type,
        label: "",
        key: "",
        placeholder: "",
        dataName: "",
        options: [],
        validate: {
          required: true,
          type: "",
          message: "",
          trigger: ""
        }
      };
      if (this.hasParm(type, "clearable")) {
        basePrm.options.push("clearable");
      }
      if (this.hasParm(type, "compass")) {
        basePrm.options.push("compass");
      }
      this.$set(items, index, basePrm);
    }
  },
  mounted(){
    console.log(this.type)
    if(this.type === 'search'){
      this.formData.formType = 'search'
    }
  }
};
</script>
