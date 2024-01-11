<template>
  <div class="mt-5">
    <h3>Related Recipes</h3>
    <draggable
      :list="related_recipes"
      :disabled="false"
      class="list-group"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
      handle=".handle"
    >
      <div class="list-group-item container" v-for="element in related_recipes" :key="element.key">
        <relatedrecipe v-bind:location.sync="element.location" v-bind:type.sync="element.type" @remove="remove(element)"></relatedrecipe>
      </div>
    </draggable>
  </div>
</template>

<style scoped>
</style>

<script>
import draggable from "vuedraggable";
import relatedrecipe from "@/components/editors/RelatedRecipe"
export default {
  components: {
    draggable,
    relatedrecipe
  },
  props: {
    related_recipes: Array
  },
  methods: {
    remove(element) {
      var idx = this.related_recipes.indexOf(element);
      if (idx > -1) {
        this.related_recipes.splice(idx, 1);
      }
    }
  }
};
</script>