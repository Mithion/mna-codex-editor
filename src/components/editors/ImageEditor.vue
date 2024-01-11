<template>
  <div class="container-flex">
    <div class="row">
      <div class="col-1 pt-1">
        <i class="fa fa-align-justify handle"></i>
      </div>
      <div class="col-2">
        <label>Image</label>
      </div>
      <div class="col-7">
        <!--<img src="http://i3.ytimg.com/vi/HxTVY2vL4PA/hqdefault.jpg" height="128" width="128" />-->
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <label>Location</label>
      </div>
      <div class="col-2">
        <label>Width</label>
      </div>
      <div class="col-2">
        <label>Height</label>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <namespacededitor :value="location" @input="$emit('update:location', $event.target.value)"></namespacededitor>
      </div>
      <div class="col-2">
        <input class="form-control" type="text" :value="width" @input="$emit('update:width', Number($event.target.value))" />
      </div>
      <div class="col-2">
        <input class="form-control" type="text" :value="height" @input="$emit('update:height', Number($event.target.value))" />
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
    width: Number,
    height: Number
  }
};
</script>