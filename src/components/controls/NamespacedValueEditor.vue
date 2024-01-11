<template>
  <div class="row">
    <div class="col-6">
      <select
        :value="value.split(':')[0]"
        class="form-control"
        @input="concatAndUpdate($event.target.value, null)"
      >
        <option value="minecraft">Minecraft</option>
        <option value="mna">Mana and Artifice</option>        
        <option value="">Other</option>
      </select>
    </div>
    <div class="col-6">
      <input
        class="form-control"
        type="text"
        :value="value.split(':')[1]"
        @input="concatAndUpdate(null, $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
    props:{
        value: String
    },
    methods:{
        concatAndUpdate(namespace, location){

            var curSplit = this.value.split(':');
            if (namespace != null)
                curSplit[0] = namespace;
            if (location != null)
                curSplit[1] = location;

            //simulate the input event's structure so that it's consistent with other similar calls
            //this allows for $event.target.value retrieval of the changed value 
            this.$emit('input', 
            {
                target: {
                    value:curSplit.join(":")
                }
            });
        }
    }
}
</script>