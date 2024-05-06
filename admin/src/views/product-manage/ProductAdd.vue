<template>
  <div>
    <el-page-header icon="" title="产品管理">
      <template #content>
        <span class="text-large font-600 mr-3">添加产品</span>
      </template>
    </el-page-header>

    <el-form
      ref="productFormRef"
      :model="productForm"
      :rules="productFormrules"
      label-width="80px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="productForm.title" />
      </el-form-item>

     <el-form-item label="产品简介" prop="introduction">
        <el-input v-model="productForm.introduction" type="textarea" />
      </el-form-item>
      <el-form-item label="产品详情" prop="detail">
        <el-input v-model="productForm.detail" type="textarea" />
      </el-form-item>
      <el-form-item label="产品图片" prop="cover">
        <Upload :avatar="productForm.cover" @linchange="handleChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加产品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Upload from "@/components/upload/Upload";
import upload from "@/utils/upload";
import { useRouter } from 'vue-router'
const productFormRef = ref();
const productForm = reactive({
  title: "",
  introduction: "",
  detail: "",
  cover: "", 
  file: null,
});

const productFormrules = reactive({
  title: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入产品介绍", trigger: "blur" }],
  detail: [{ required: true, message: "请输入产品详情", trigger: "blur" }],
  cover: [{ required: true, message: "请上传产品图片", trigger: "blur" }],
});


// 每次选择完图片之后的回调
const handleChange = (file) => {
  productForm.cover = URL.createObjectURL(file);
  productForm.file = file;
};

const router = useRouter()

const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if(valid) {
      await upload("/adminapi/product/add", productForm)

      router.push('/product-manage/productlist')
    }
  })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>