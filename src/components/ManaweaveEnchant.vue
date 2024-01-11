<template>
    <div class="container">
        <div class="row">                        
            <div class="col-4">
                <label>Type:</label>                
            </div>
            <div class="col-8">
                <label>{{type}}</label>
            </div>
        </div>
        <div class="row">                        
            <div class="col-4">
                <label>Output:</label>                
            </div>
            <div class="col-8">
                <runepicker :value="output" @input="output = $event.target.value"></runepicker>
            </div>
        </div>
        <div class="row">                        
            <div class="col-4">
                <label>Enchant:</label>                
            </div>
            <div class="col-8">
                <enchantpicker :value="enchant" @input="enchant = $event.target.value"></enchantpicker>
            </div>
        </div>
        <div class="row">                        
            <div class="col-4">
                <label>Magnitude:</label>                
            </div>
            <div class="col-8">
                <input class="form-control" type="text" v-model.number="magnitude" />
            </div>
        </div>
        <div class="row" v-for="(item,i) in items" :key="'item'+i"> 
            <div class="col-4">
                <label>Item {{i+1}}:</label>                
            </div>
            <div class="col-8">
                <namespacededitor :value="item" @input="$set(items, i, $event.target.value)"></namespacededitor>
            </div>
        </div>
        <div class="row" v-for="(pattern, i) in patterns" :key="'pattern'+i">                        
            <div class="col-4">
                <label>Pattern {{i+1}}:</label>                
            </div>
            <div class="col-8">
                <patternpicker :value="pattern" @input="$set(patterns, i, $event.target.value)"></patternpicker>
            </div>
        </div>
        <div class="row">                        
            <div class="col-12">
                <pre>
                    {{toJSON}}
                </pre>
            </div>
        </div>
    </div>
</template>

<script>
import namespacededitor from "@/components/controls/NamespacedValueEditor"
import runepicker from "@/components/controls/RunePicker"
import enchantpicker from "@/components/controls/EnchantPicker"
import patternpicker from "@/components/controls/PatternPicker"

export default {
    components:{
        namespacededitor,
        runepicker,
        enchantpicker,
        patternpicker
    },
    data: function(){
        return {
            recipe_name: "",
            type: "mna:manaweaving-recipe",
            output: "mna:",
            enchant: "minecraft:",
            magnitude: 1,
            items: ["","",""],
            patterns: ["mna:","mna:","mna:","mna:","mna:","mna:"]
        }
    },
    computed:{
        toJSON(){
            var obj = {
                type: this.type,
                output: this.output,
                enchant: this.enchant,
                magnitude : this.magnitude,
                items:[],
                patterns:[]
            }

            let i = 0;

            for (i = 0; i < this.items.length; ++i){
                if (this.items[i] === "" || this.items[i].indexOf(':') === -1 || this.items[i].indexOf(':') === this.items[i].length-1)
                    continue;
                
                obj.items.push(this.items[i]);
            }

            for (i = 0; i < this.patterns.length; ++i){
                if (this.patterns[i] === "" || this.patterns[i].indexOf(':') === -1 || this.patterns[i].indexOf(':') === this.patterns[i].length-1)
                    continue;
                
                obj.patterns.push(this.patterns[i]);
            }

            return JSON.stringify(obj, null, 2);
        }
    }
}
</script>