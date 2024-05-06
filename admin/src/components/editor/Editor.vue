<template>
    <div id="myeditor">

    </div>
</template>

<script setup>
import { onMounted, defineEmits, defineProps } from 'vue'
import E from "wangeditor"

const prop = defineProps({
    content: String
})
const emit = defineEmits(['editorevent'])

onMounted(() => {
    const editor = new E("#myeditor");
    editor.create()

    // 设置初始值
    prop.content && editor.txt.html(prop.content)

    editor.config.onchange = function(newHtml) {
        

        // 子传父
        emit('editorevent', newHtml)
    }
})


</script>

<style lang="scss" scoped>

</style>