<template>
  <div class="row">
    <div class="col-1">
      <i class="fa fa-align-justify handle"></i>
    </div>
    <div class="col-2 pt-1">
        <label>Recipe</label>
      </div>
    <div class="col-2">      
      <select :value="recipeType" class="form-control" @input="$emit('update:recipeType', $event.target.value)" >        
        <option value="none">None</option>
        <option value="crafting">Crafting</option>
        <option value="eldrin_altar">Eldrin Altar</option>
        <option value="manaweaving_pattern">Manaweave Pattern</option>
        <option value="manaweaving_altar">Manaweaving Altar</option>        
        <option value="multiblock">Multiblock</option>
        <option value="ritual">Ritual</option>
        <option value="runesmith_enchant">Runic Anvil Enchantment</option>
        <option value="runesmithing">Runic Anvil</option>
        <option value="runescribing">Runescribing</option>
        <option value="arcane_furnace">Runeforge</option>
        <option value="spell_part">Spell Part</option>                
      </select>
    </div>
    <div class="col-7">
        <enchantpicker v-if="recipeType==='runesmith_enchant'" :value="location" @input="$emit('update:location', $event.target.value)" />
        <namespacededitor v-else :value="location" @input="$emit('update:location', $event.target.value)"></namespacededitor>
    </div>
  </div>
</template>

<script>
import namespacededitor from "@/components/controls/NamespacedValueEditor"
import enchantpicker from "@/components/controls/EnchantPicker"
export default {
  components:{
      namespacededitor,
      enchantpicker
  },
  props: {
    location: String,
    recipeType: String
  }
};
</script>