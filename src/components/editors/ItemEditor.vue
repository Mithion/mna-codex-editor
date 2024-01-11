<template>
  <div class="container-flex">
    <div class="row pl-0">
      <div class="col-1 pt-1">
        <i class="fa fa-align-justify handle"></i>
      </div>
      <div class="col-11">
        <label>Item</label>
      </div>
    </div>
    <div class="row pt-4">
      <div class="col-8">
        <label>Location</label>
      </div>
      <div class="col-4">
        <label>Scale</label>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <namespacededitor :value="location" @input="$emit('update:location', $event.target.value)"></namespacededitor>
      </div>
      <div class="col-4">
        <input class="form-control" type="text" :value="scale" @input="$emit('update:scale', Number($event.target.value))" />
      </div>
    </div>
  </div>
</template>

<script>
import namespacededitor from "@/components/controls/NamespacedValueEditor"
export default {
  components:{
      namespacededitor
  },
  props: {
    location: String,
    scale: Number
  }
};
</script>