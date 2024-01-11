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
        <option value>Other</option>
      </select>
    </div>
    <div class="col-6">
      <select
        class="form-control"
        :value="value.split(':')[1]"
        @input="concatAndUpdate(null, $event.target.value)"
      >
        <option value="manaweave_patterns/circle">Circle</option>
        <option value="manaweave_patterns/diamond">Diamond</option>
        <option value="manaweave_patterns/hourglass">Hourglass</option>
        <option value="manaweave_patterns/infinity">Infinity</option>
        <option value="manaweave_patterns/inverted_triangle">Inverted Triangle</option>
        <option value="manaweave_patterns/knot">Knot</option>
        <option value="manaweave_patterns/knot2">Knot 2</option>
        <option value="manaweave_patterns/knot3">Knot 3</option>
        <option value="manaweave_patterns/knot4">Knot 4</option>
        <option value="manaweave_patterns/split_triangle">Split Triangle</option>
        <option value="manaweave_patterns/square">Square</option>
        <option value="manaweave_patterns/triangle">Triangle</option>
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