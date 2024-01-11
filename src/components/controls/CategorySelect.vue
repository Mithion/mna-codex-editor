<template>
  <select :value="category" class="form-control" @input="$emit('update:category', $event.target.value)">
    <option value="artifice">Artifice</option>
    <option value="basics">Basics</option>
    <option value="constructs">Constructs</option>
    <option value="enchantments">Enchantments</option>
    <option value="eldrin_altar">Eldrin Altar</option>
    <option value="manaweaving">Manaweaving</option>  
    <option value="rituals">Rituals</option>
    <option value="runesmithing">Runesmithing</option>
    <option value="sorcery">Sorcery</option>              
  </select>
</template>

<script>
export default {
    props: {
      category: String
    }
}
</script>