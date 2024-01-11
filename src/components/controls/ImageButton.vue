<template>
    <button class="btn imgbtn btn-secondary" @click="onClick">
        <i v-bind:class="classObject" aria-hidden="true"></i>
        <span class="text-center">{{text}}</span>
    </button>
</template>

<style scoped>
.imgbtn i {
  width: 25%;
  border-right: 1px solid darkgray;
  padding: 10px;
}

.imgbtn span {
  width: 75%;
  text-align: center;
  display: inline-block;
}
</style>

<script>
export default {
    props: {
        onClick: {
            type: Function,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    },

    computed: {
        classObject: function(){
            return "fa fa-" + this.icon + " fa-lg";
        }
    },

    data: function(){
        return {

        };
    }
}
</script>