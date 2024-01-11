<template>
  <div>
    <h3>Entry Sections</h3>
    <draggable
      :list="compendiumObject.sections"
      :disabled="false"
      class="list-group"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
      handle=".handle"
    >
      <div
        class="list-group-item container"
        v-for="(element) in compendiumObject.sections"
        :key="element.key"
      >
        <div class="row">
          <div class="col-10">
            <!-- Render Title Editor -->
            <div v-if="element.type == 'title'">
              <titleeditor v-bind:value.sync="element.value"></titleeditor>
            </div>

            <!-- Render Text Editor -->
            <div v-if="element.type == 'text'">
              <texteditor v-bind:value.sync="element.value" v-bind:json.sync="element.json" :quillId="element.key"></texteditor>
            </div>

            <!-- Render Image Editor -->
            <div v-if="element.type == 'image'">
              <imageeditor
                v-bind:location.sync="element.location"
                v-bind:width.sync="element.width"
                v-bind:height.sync="element.height"
              ></imageeditor>
            </div>

            <!-- Render Item Editor -->
            <div v-if="element.type == 'item'">
              <itemeditor v-bind:location.sync="element.location" v-bind:scale.sync="element.scale"></itemeditor>
            </div>

            <!-- Render Entity Editor -->
            <div v-if="element.type == 'recipe' && element.recipeType == 'entity'">
              <entity-editor v-bind:location.sync="element.location"></entity-editor>
            </div>
            <!-- Render Recipe Editor -->
            <div v-else-if="element.type == 'recipe'">
              <recipe-editor v-bind:recipeType.sync="element.recipeType" v-bind:location.sync="element.location"></recipe-editor>
            </div>

            <!-- Render Multiblock Editor -->
            <div v-if="element.type == 'multiblock'">
              <multiblock-editor v-bind:location.sync="element.location"></multiblock-editor>
            </div>

             
          </div>

          <!-- Remove Button -->
          <div class="col-2">
            <button class="btn btn-outline-danger" @click="remove(element.key)">
              <i class="fa fa-minus fa-lg" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </draggable>

    <relatedrecipes v-bind:related_recipes="compendiumObject.related_recipes"></relatedrecipes>
  </div>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

input {
  width: 100%;
}
</style>

<script>
import draggable from "vuedraggable";
import texteditor from "@/components/editors/TextEditor";
import titleeditor from "@/components/editors/TitleEditor";
import imageeditor from "@/components/editors/ImageEditor";
import itemeditor from "@/components/editors/ItemEditor";
import relatedrecipes from "@/components/model/RelatedRecipes";
import RecipeEditor from '../editors/RecipeEditor.vue';
import MultiblockEditor from '../editors/MultiblockEditor.vue';
import EntityEditor from '../editors/EntityEditor.vue';

export default {
  components: {
    draggable,
    texteditor,
    titleeditor,
    imageeditor,
    itemeditor,
    relatedrecipes,
    RecipeEditor,
    MultiblockEditor,
    EntityEditor
  },
  props: {
    compendiumObject: Object
  },
  methods: {
    remove(identifier) {
      var sections = this.compendiumObject.sections;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].key === identifier) {
          sections.splice(i, 1);
          return;
        }
      }
    }
  }
};
</script>