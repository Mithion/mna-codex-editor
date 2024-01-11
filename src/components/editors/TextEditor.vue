<template>
  <div class="container-flex">
    <div class="row">
      <div class="col-1 pt-1">
        <i class="fa fa-align-justify handle"></i>
      </div>
      <div class="col-2 pt-1">
        <label>Text</label>
      </div>
      <div v-if="editor" class="col-9">
        <div class="border border-bottom-0 border-dark rounded-top d-inline-flex">
            <button class="btn pr-2" :class="{ 'btn-dark': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
              <span class="fa fa-bold fa-lg" aria-hidden="true"></span>
            </button>                
            <button class="btn pr-2" :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
              <span class="fa fa-italic fa-lg" aria-hidden="true"></span>
            </button>
            <button class="btn pr-2" :class="{ 'is-active': editor.isActive('underline') }" @click="editor.chain().focus().toggleUnderline().run()">
              <span class="fa fa-underline fa-lg" aria-hidden="true"></span>
            </button>
            <div class="pr-2 border-left border-dark">
              <span>&nbsp;</span>
            </div>            
            <b-dropdown :id="'dropdown' + quillId" text="Dropdown Button" variant="outline-none" class="m-md-2">
              <template #button-content>
                <span class="fa fa-tint fa-lg" aria-hidden="true"></span> <b class="caret"></b>
              </template>
              <b-dropdown-item v-for="color in colorMap.allColors()" :key="color" :style="'background-color:' + color" @click="(evt) => setColor(color)">
                <span>&nbsp;</span>
              </b-dropdown-item>
            </b-dropdown>
        </div>
        <editor-content :editor="editor" class="border border-dark rounded-bottom shadow-none p-2" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>

import { Editor, EditorContent } from '@tiptap/vue-2'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Bold } from '@tiptap/extension-bold'
import { Italic } from '@tiptap/extension-italic'
import { Underline } from '@tiptap/extension-underline'

import ColorMap from '../../models/colormap';

export default {
  components: {
    EditorContent
  },
  props: {
    quillId: String,
    value: {
      type: String,
      default: ""
    },
    json: {
      type: Array,
      default: null
    }
  },
  methods: {
    setColor(color){
      this.editor.chain().focus().setColor(color).run();
    },
    formatIncomingValue(){
      if (this.json){
        var output = "<p>";
        this.json.forEach(elem => {    
          
          if (!elem)
            return;          

          let splitText = elem.text.split('\n');

          splitText.forEach((string, idx) => {
            if (string){
              if (idx > 0){
                output += "</p><p>";
              }
              output += this.createStyledSpan(string, elem);                    
            }else{
              output += "</p><p>";
            }
          });
        });
        output += "</p>"

        return output;
      }else if (this.value){
        return this.value;
      }
    },
    createStyledSpan(text, styleObj){
      let style = "";
      let cm = new ColorMap();
      //open tags      
      style += "<span style=\"" + cm.lookupByName(styleObj.color) + "\">";

      if (styleObj.bold){
        style += "<strong style=\"" + cm.lookupByName(styleObj.color) + "\">";
      }
      if (styleObj.italic){
        style += "<em style=\"" + cm.lookupByName(styleObj.color) + "\">";
      }
      if (styleObj.underlined){
        style += "<u style=\"" + cm.lookupByName(styleObj.color) + "\">";
      }      
      //value
      style += text;
      //close tags      
      if (styleObj.underlined){
        style += "</u>"
      }
      if (styleObj.italic){
        style += "</em>"
      }
      if (styleObj.bold){
        style += "</strong>"
      }
      style += "</span>"

      return style;
    },
    formatEditorJSONToMC(){
      let editorValue = this.editor.getJSON();
      this.$emit('update:json', this.formatEditorJSON(editorValue));
    },
    formatEditorJSON(node){
      let outputArray = [];
      node.content.forEach(element => {
        let outputObject = {
          text: element.text            
        };
        let recurse = true;
        if (element.type === "text"){          
          if (element.marks){
            if (element.marks.find(e => e.type === 'italic')){
              outputObject.italic = true;
            }
            if (element.marks.find(e => e.type === 'bold')){
              outputObject.bold = true;
            }
            if (element.marks.find(e => e.type === 'underline')){
              outputObject.underlined = true;
            }
            let style = element.marks.find(e => e.type === 'textStyle');
            if (style && style.attrs && style.attrs.color){
              outputObject.color = this.pullColorFromStyle(style.attrs.color);
            }
          }          
        }else if (element.type === "paragraph"){
          if (outputArray.length > 0){
            if (!element.content || element.content.length == 0 || (element.content.length == 1 && element.content[0].type === "br")){
              recurse = false;
              outputObject.text = "\n";
            }else{
              if (outputObject.text)
                outputObject.text += "\n";
              else
                outputObject.text = "\n";
            }
          }else{
            outputObject = null
          }
        }

        if (outputObject)
          outputArray.push(outputObject);

        if (element.content && recurse){
          outputArray = outputArray.concat(this.formatEditorJSON(element));
        }
      });

      outputArray = this.simplifyArray(outputArray);

      return outputArray;
    },
    //simplify the output array into merged nodes
    simplifyArray(array){
      let simplified = [];
      let activeObj = array[0];
      for (let i = 1; i < array.length; ++i){
        let curElem = array[i];
        if (activeObj.italic == curElem.italic && activeObj.underlined == curElem.underlined && activeObj.bold == curElem.bold && activeObj.color == curElem.color){
          //consider the styling the same
          activeObj.text += curElem.text;
        }else{
          //they're different, push the active object to the output array and reset to the current element for further elements.
          simplified.push(activeObj);
          activeObj = curElem;
        }
      }
      //push the final state
      simplified.push(activeObj);
      return simplified;
    },
    //pulls the color from a style and uses it to map to a Minecraft color
    pullColorFromStyle(tag){
      const regex_rgb = /(rgb\(\d+, \d+, \d+\))([;]*)/
      const regex_hex = /#[0-9a-f]{3,6}/
      const found_rgb = tag.match(regex_rgb);
      const found_hex = tag.match(regex_hex);
      return found_hex ? this.colorMap.lookupByStyle(found_hex[0]) : found_rgb ? this.colorMap.lookupByStyle(found_rgb[0]) : 'reset';
    },  
  }, 
  mounted(){
    this.formattedValue = this.formatIncomingValue();   
    this.editor = new Editor({
      content: this.formattedValue,
      extensions: [
        Document,
        Paragraph,
        Text,
        TextStyle,
        Color,
        Bold,
        Italic,
        Underline
      ],
      onUpdate: (event) => {
        let value = event.editor.getHTML();

        this.formattedValue = value;
        this.formatEditorJSONToMC();
      },
      onBlur: (event) => {
        let value = event.editor.getHTML();

        this.formattedValue = value;
        this.formatEditorJSONToMC();
      },
    }) 
  },

  data: function() {
    return {
      formattedValue: "a",
      colorMap: new ColorMap(),
      editor: null
    }
  },

  beforeDestroy() {
    this.editor.destroy()
  }
};
</script>

<style scoped>
  button {
    border-radius: 0 !important;
  }

  .dropdown-item:hover{
    background-color: inherit !important;
  }
</style>