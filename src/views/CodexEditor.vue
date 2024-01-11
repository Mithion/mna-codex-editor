<template>
  <div class="editor"> 
    <CodexEditor />
  </div>
</template>

<script>
// @ is an alias to /src
import CodexEditor from '@/components/CodexEditor.vue'

export default {
  name: 'Editor',
  components: {
    CodexEditor
  }
}
</script>
