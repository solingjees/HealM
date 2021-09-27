<template>
  <div class="tags-container">
    <Tag
      v-for="(tagItem,index) in list"
      :key="'tag-'+index"
      :color="tagItem.color"
      size="large"
    >
      {{ tagItem.title }}
    </Tag>
  </div>
</template>

<script>
export default {
  name: 'PrescriptionDetailTags',
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="less" scoped>
.tags-container{
    margin-top: .5rem;
    line-height: 2.2rem;
}
</style>
