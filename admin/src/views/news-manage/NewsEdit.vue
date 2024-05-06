<template>
  <div>
    <el-page-header @back="handleBack()" title="新闻管理">
      <template #content>
        <span class="text-large font-600 mr-3">编辑新闻</span>
      </template>
    </el-page-header>

    <el-form
      ref="newsFormRef"
      :model="newsForm"
      :rules="newsFormrules"
      label-width="80px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <Editor @editorevent="editorHandleChange" :content="newsForm.content" v-if="showEditor"></Editor>
      </el-form-item>

      <el-form-item label="类别" prop="category">
        <el-select
          v-model="newsForm.category"
          class="m-2"
          placeholder="Select"
          style="width: 100%"
        >
          <el-option
            v-for="item in categorys"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="封面" prop="cover">
        <Upload :avatar="newsForm.cover" @linchange="handleChange"></Upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">更新新闻</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import Editor from "@/components/editor/Editor.vue";
import Upload from "@/components/upload/Upload";
import upload from "@/utils/upload";
import axios from "axios";
// import axios from "axios";

const route = useRoute();
const router = useRouter();
const newsFormRef = ref();
const showEditor = ref(false)
const newsForm = reactive({
  title: "",
  content: "",
  category: 1, // 1.最新动态，2.典型案例，3.通知公告
  cover: "",
  file: null,
  isPublish: 0, // 0 未发布，1 已发布
});

const newsFormrules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  category: [{ required: true, message: "请选择分类", trigger: "blur" }],
  cover: [{ required: true, message: "请长传图片", trigger: "blur" }],
});

// 每次editor内容改变的回调函数
const editorHandleChange = (data) => {
  // console.log(data);
  newsForm.content = data;
};

// 新闻类别选择
const categorys = [
  {
    label: "最新动态",
    value: 1,
  },
  {
    label: "典型案例",
    value: 2,
  },
  {
    label: "通知公告",
    value: 3,
  },
];

const handleChange = (file) => {
  newsForm.cover = URL.createObjectURL(file);
  newsForm.file = file;
};

const submitForm = () => {
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      // 后端通信
      await upload("/adminapi/news/listUpdate", newsForm);
      router.back()
    }
  });
};

// 返回
const handleBack = () => {
  router.back();
};

// 获取当前编辑页面的数据
onMounted(async () => {
  console.log(route.params.id);
  const res = await axios.get(`/adminapi/news/listId/${route.params.id}`);
  console.log(res.data.data);
  if(res.data.data.length > 0) {
    Object.assign(newsForm, res.data.data[0]);
  }

  showEditor.value = true
});
</script>

<style lang="scss" scoped>
.el-form {
  margin-top: 50px;
}
</style>