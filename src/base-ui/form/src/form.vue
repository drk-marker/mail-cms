<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              class="form-item"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :show-password="item.type === 'password'"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.title"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    // 不推荐直接把父组件传来的formData绑定并修改，会改变单项数据流，也就是修改父组件传过来的值
    // formData: {
    //   type: Object,
    //   require: true
    // },
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      // PropType后面跟泛型，表示formItems这个数组里面放的都是IFormItem类型
      type: Array as PropType<IFormItem[]>,
      //   默认值如果是对象或数组要写成函数，特别是vue3和ts的结合，要写成箭头函数
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: '10px 20px'
      })
    },
    // 为了响应式显示一行有多少input
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, //>1920 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 保证单项数据流的情况下，进行重置
    // 方法一：对每个组件使用v-model=formData[`${item.field}`]的时候的方法
    // 浅拷贝{ ...props.modelValue }这样就是新的对象了，就不是直接修改父组件传过来的prop了
    // 但是其实page-search中formdata发生改变的时候modelValue会改变，但此处的formData是没有影响的
    // const formData = ref({ ...props.modelValue })
    // 此处其实是监听modelValue，如果变化发出事件对formData进行修改
    // watch(formData, (newValue) => emit('update:modelValue', newValue), {
    //   deep: true
    // })

    // 方法二：不用v-model方法，采用：modol-value和@update:modelValue,参数value是最新的值
    // 思想是点击page-search中重置按钮之后，传过来的formData的值就改了，此处的modelValue就改了，通过:model-value就直接绑定了修改的值
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return {
      // formData

      handleValueChange
    }
  }
})
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
