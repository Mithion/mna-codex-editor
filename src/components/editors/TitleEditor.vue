<template>
  <div class="container-flex">
    <div class="row">
      <div class="col-1 pt-1">
        <i class="fa fa-align-justify handle"></i>
      </div>
      <div class="col-2 pt-1">
        <label>Title</label>
      </div>
      <div class="col-9">
        <input class="form-control" type="text" :value="value" @input="$emit('update:value', $event.target.value)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  }
};
</script>