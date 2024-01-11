<template>
  <div class="row">
    <div class="col-6">
      <select
        :value="value.split(':')[0]"
        class="form-control"
        @input="concatAndUpdate($event.target.value, null)"
      >
        <option value="mna">Mana and Artifice</option>
      </select>
    </div>
    <div class="col-6">
      <select
        class="form-control"
        :value="value.split(':')[1]"
        @input="concatAndUpdate(null, $event.target.value)"
      >
        <option value="rune_air">Air Rune</option>
        <option value="rune_aura">Aura Rune</option>
        <option value="rune_arcane">Arcane Rune</option>
        <option value="rune_defense">Defense Rune</option>
        <option value="rune_earth">Earth Rune</option>
        <option value="rune_ender">Ender Rune</option>
        <option value="rune_fire">Fire Rune</option>
        <option value="rune_ritual_metal">Metal Ritual Rune</option>
        <option value="rune_water">Water Rune</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  methods: {
    concatAndUpdate(namespace, location) {
      var curSplit = this.value.split(":");
      if (namespace != null) curSplit[0] = namespace;
      if (location != null) curSplit[1] = location;

      //simulate the input event's structure so that it's consistent with other similar calls
      //this allows for $event.target.value retrieval of the changed value
      this.$emit("input", {
        target: {
          value: curSplit.join(":")
        }
      });
    }
  }
};
</script>