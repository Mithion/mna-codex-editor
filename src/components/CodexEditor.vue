<template>
  <div class="row">
    <nav class="col-2 pt-4" role="navigation">
      <span>
        <h3>Actions</h3>
      </span>
      <ul class="main pb-5">
        <li>
          <imagebutton :onClick="addEntry" text="New Entry" icon="plus"></imagebutton>
        </li>
        <li>
          <imagebutton :onClick="saveJSON" text="Save" icon="download"></imagebutton>
        </li>
        <li>
          <imagebutton :onClick="showInputModal" text="Load" icon="upload"></imagebutton>
        </li>        
        <li class="pt-5">
          <label>Default Namespace:</label>
          <select class="form-control" v-model="defaultNamespace">
            <option value="minecraft">Minecraft</option>
            <option value="mna">Mana and Artifice</option>        
            <option value="">Other</option>
          </select>
        </li>
        <li class="pt-5">
          <label>Codex Version:</label>
          <input type="text" v-model="version"/>
          </li>
      </ul>
    </nav>

    <div class="col-10" role="main" v-if="compendium_entries.length > 0">
      <div class="row mt-3">
        <div class="panel col-2 pb-4">
          <h2 class="text-center">Toolbox</h2>
          <ul class="border-bottom border-dark pb-3">
            <li>
              <imagebutton :onClick="addTitleEditor" text="Title" icon="pencil"></imagebutton>
            </li>
            <li>
              <imagebutton :onClick="addTextEditor" text="Text" icon="font"></imagebutton>
            </li>
            <li>
              <imagebutton :onClick="addImageEditor" text="Image" icon="picture-o"></imagebutton>
            </li>
            <li>
              <imagebutton :onClick="addItemEditor" text="Item" icon="wrench"></imagebutton>
            </li>
            <li>
              <imagebutton :onClick="addRecipeEditor" text="Inline Recipe" icon="th"></imagebutton>
            </li>
            <li>
              <imagebutton :onClick="addMultiblockEditor" text="Multiblock" icon="cube"></imagebutton>
            </li>
            <li>
              <imagebutton :onClick="addEntityEditor" text="Entity" icon="male"></imagebutton>
            </li>
            <li>
              <hr />
            </li>
            <li>
              <imagebutton :onClick="addRelatedRecipe" text="Related Recipe" icon="th"></imagebutton>
            </li>
          </ul>
          <h2 class="text-center pt-2">Entries</h2>
          <ul id="facetList">
            <li class="nav-item" v-for="cat in entryCategories" :key="cat.id">
              <button v-bind:id="'button'+cat.id" class="toggle btn btn-secondary" @click="showList(cat.id)">
                {{cat.category}}<span v-bind:id="'toggle'+cat.id">(+)</span></button>
              <ul v-bind:id="cat.id" class="inner">
            <li class="nav-item" v-for="entry in compendium_entries.filter(ent => ent.category == cat.category)" :key="entry.name">
              <a
                class="nav-link"
                href="#"
                @click="changeActiveEntry(entry)"
              >{{entry.name == "" ? "Unnamed" : entry.name}}</a>
            </li>
          </ul>
          
              </li>
          </ul>  
          
        </div>
        <div
          v-if="compendium_entries.length > 0"
          class="panel col-10 pt-2 row border-left-0 border-dark pb-4"
        >
          <div class="container border-left border-dark pl-2">
            <div class="row">
              <h2>Editing:</h2>
            </div>
            <div class="row">
              <div class="col-5">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Entry Name"
                  v-model="compendium_entries[selectedIndex].name"
                />
              </div>
              <div class="col-1 text-center mt-2">
                <span>in</span>
              </div>
              <div class="col-4">
                <categoryselect v-bind:category.sync="compendium_entries[selectedIndex].category"></categoryselect>
              </div>
              <div class="col-2">
                <div class="text-right">
                  <button
                    class="btn btn-outline-danger"
                    style="width:100px;"
                    @click="deleteCurrentEntry()"
                  >
                    <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-5">
                <input
                type="number"
                class="form-control"
                placeholder="0"
                v-model="compendium_entries[selectedIndex].index"
                min=0
                />
                </div>
                <div class="col-2 mt-2 ml-3">
                <span>Entry Index</span>
              </div>
              </div>
              
            <div class="row m-0 pt-5">
              <div class="panel col-12">
                <compendiumentry
                  v-if="compendium_entries.length > 0"
                  v-bind:compendiumObject="compendium_entries[selectedIndex]"
                ></compendiumentry>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="inputModal" class="modal">
      <div class="modal-content">
        <div class="row">
          <div class="col-11"></div>
          <div class="col-1">
            <span class="close" @click="hideInputModal">&times;</span>
          </div>
        </div>
        <filepicker v-on:load="loadJSON"></filepicker>
      </div>
    </div>
  </div>
</template>

<script>
import imagebutton from "@/components/controls/ImageButton";
import categoryselect from "@/components/controls/CategorySelect";
import filepicker from "@/components/controls/FilePicker";
import compendiumentry from "@/components/model/CompendiumEntry";

export default {
  components: {
    compendiumentry,

    imagebutton,    
    categoryselect,
    filepicker
  },
  data: function() {
    var output = {
      compendium_entries: [], //holds all entry data
      selectedIndex: 0, //current selected index
      id: 0, //id for new controls so they're always unique
      defaultNamespace: "mna", //default namespace, when initializing a namespaced field
      version: "1.0.0a" // arbitrary default value

    };
    return output;
  },
  computed: {
    valueJson() {
      //takes all entry data and converts it to JSON
      var output = {};

      for (var i = 0; i < this.compendium_entries.length; ++i) {
        var entry = {
          index: this.compendium_entries[i].index,
          category: this.compendium_entries[i].category,
          sections: this.compendium_entries[i].sections,
          related_recipes: this.compendium_entries[i].related_recipes
        };

        output[this.compendium_entries[i].name] = entry;
      }
      output["version"] = this.version;

      return JSON.stringify(output, this.JsonReplacer, 2);
    },
    entryCategories(){
      var categoryList = [];
      var output = [];
      for(var i = 0; i <this.compendium_entries.length; i++)
      {
        if (categoryList[this.compendium_entries[i].category]) continue;
        categoryList[this.compendium_entries[i].category] = true;
        output.push({id: "category" + i, category: this.compendium_entries[i].category});
      }
      return output;
    }
  },
  methods: {
    showList: function(idName){
      this.$('#'+ idName).toggle(350);
      this.$('#toggle' + idName)[0].innerText = this.$('#toggle' + idName)[0].innerText == "(+)" ? "(-)" : "(+)"; 
    },
    JsonReplacer: function(key, value) {
      //strip out keys with the key of "key" when exporting to JSON
      if (key == "key") return undefined;
      return value;
    },
    changeActiveEntry: function(entry) {
      //updates the selected index
      this.selectedIndex = this.compendium_entries.indexOf(entry);
    },
    deleteCurrentEntry: function() {
      //removes the current index
      this.compendium_entries.splice(this.selectedIndex, 1);

      if (this.selectedIndex >= this.compendium_entries.length)
        this.selectedIndex = this.compendium_entries.length - 1;

      //ensure we don't go down to -1
      if (this.selectedIndex < 0)
        this.selectedIndex = 0;
    },
    addEntry: function() {
      //adds a new index
      var newEntry = {
        index: 0,
        name: "Entry_" + this.compendium_entries.length,
        category: "mechanic.mna:basics",
        sections: [],
        related_recipes: []
      };

      this.compendium_entries.push(newEntry);

      this.selectedIndex = this.compendium_entries.length - 1;
    },

    addRelatedRecipe(){
      this.compendium_entries[this.selectedIndex].related_recipes.push({
        type: "crafting",
        location: this.defaultNamespace + ":",
        key: "related_recipe" + this.id++
      });
    },

    addTitleEditor: function() {
      this.compendium_entries[this.selectedIndex].sections.push({
        type: "title",
        key: "title" + this.id++,
        value: ""
      });
    },

    addTextEditor: function() {
      this.compendium_entries[this.selectedIndex].sections.push({
        type: "text",
        key: "text" + this.id++,
        value: ""
      });
    },

    addImageEditor: function() {
      this.compendium_entries[this.selectedIndex].sections.push({
        type: "image",
        key: "image" + this.id++,
        location: "",
        width: 128,
        height: 128
      });
    },

    addItemEditor: function() {
      this.compendium_entries[this.selectedIndex].sections.push({
        type: "item",
        key: "item" + this.id++,
        location: "",
        scale: 1
      });
    },

    addRecipeEditor: function() {
      this.compendium_entries[this.selectedIndex].sections.push({
        type: "recipe",
        key: "recipe" + this.id++,
        location: this.defaultNamespace + ":",
        recipeType: "crafting"
      });
    },

    addMultiblockEditor: function() {
      this.compendium_entries[this.selectedIndex].sections.push({
        type: "multiblock",
        key: "multiblock" + this.id++,
        location: this.defaultNamespace + ":"
      });
    },

    addEntityEditor: function() {
      this.compendium_entries[this.selectedIndex].sections.push({
        type: "recipe",
        key: "entity" + this.id++,
        location: this.defaultNamespace + ":",
        recipeType: "entity"
      });
    },

    showInputModal: function() {
      document.getElementById("inputModal").style.display = "block";
    },

    hideInputModal: function() {
      document.getElementById("inputModal").style.display = "none";
    },

    saveJSON: function() {
      //get the data to save
      var data = this.valueJson;
      //create a blob
      var blob = new Blob([data], { type: "text/plain" });
      //create an anchor and fake a click on it to cause a download
      var e = document.createEvent("MouseEvents");
      var a = document.createElement("a");
      a.download = "guidebook.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },

    loadJSON: function(fileText) {
      var json = JSON.parse(fileText);
      var self = this; // setup a self variable to be used in the forEach function.
      //reset the compendium entries array
      this.compendium_entries = [];
      // reset the version number.
      this.version = "1.0.0a";
      //get references that the iterator can see (hidden due to "this" transformation)
      var ce = this.compendium_entries;
      var id = 0;

      //iterate through the JSON properties and convert them back to the format the editor expects
      Object.keys(json).forEach(function(key) {
        if (key == 'version') // for version only
        {
          self.version = json[key];
        }
        else
        {
          var entry = json[key];
          entry.name = key;
          //re-establish keys so that delete works
          for (var i = 0; i < entry.sections.length; ++i) {
            entry.sections[i].key = entry.sections[i].type + id++;
          }
          ce.push(entry);
        }
      });

      

      //restore properties
      this.id = id;
      this.compendium_entries = ce;
      //finally, hide the modal
      this.hideInputModal();
    }
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav[role="navigation"] {
  background: #2a3542;
  color: #ddd;
  /* icons */
}
nav[role="navigation"] li {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-decoration: none;
  display: block;
  font-family: "Josefin Sans";
}

nav[role="navigation"] h3 {
  text-align: center;
  font-family: "Josefin Sans";
}
/* lists */
ul,
li {
  list-style-type: none;
  margin: 0;
  padding: 0;
  padding-top: 5px;
  text-align: center;
}

ul .inner{
  display: none;
  overflow: hidden;
}


.btn {
  width: 100%;
}

.row {
  margin: 0px;
}
/* panels */
.panel {
  background-color: white;
  color: darkslategray;
}

@media screen and (min-width: 600px) {
  html,
  body {
    height: 100%;
    position: absolute;
  }

  .textbox {
    width: 100%;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "Open Sans", arial, sans-serif !important;
  }
  footer[role="contentinfo"] {
    clear: both;
    margin-left: 200px;
  }
}
@media screen and (min-width: 900px) {
  footer[role="contentinfo"] {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0px;
    margin: 0;
  }
}

.DeleteBtn {
  line-height: 12px;
  width: 10px;
  position: absolute;
  top: 0;
  right: 0;
  font-family: tahoma;
}

.nav a {
  color: darkslategray;
  font-weight: bold;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>