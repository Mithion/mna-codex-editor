<template>
  <div class="row">
    <div class="col-1">
      <i class="fa fa-align-justify handle"></i>
    </div>
    <div class="col-2 pt-1">
        <label>Entity</label>
    </div>
    <div class="col-9">        
        <namespacededitor :value="location" @input="$emit('update:location', $event.target.value)"></namespacededitor>
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
    location: String
  }
};
</script>