<template>
  <div>
    <el-page-header icon="" title="用户管理">
      <template #content>
        <span class="text-large font-600 mr-3">添加用户</span>
      </template>
    </el-page-header>

    <el-form
      ref="userFormRef"
      :model="userForm"
      :rules="userFormrules"
      label-width="80px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="userForm.password" />
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-select
          v-model="userForm.gender"
          class="m-2"
          placeholder="Select"
          style="width: 100%"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="角色" prop="role">
        <el-select
          v-model="userForm.role"
          class="m-2"
          placeholder="Select"
          style="width: 100%"
        >
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="个人介绍" prop="introduction">
        <el-input v-model="userForm.introduction" type="textarea" />
      </el-form-item>

      <el-form-item label="上传图片" prop="avatar">
        <Upload :avatar="userForm.avatar" @linchange="handleChange"></Upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Upload from "@/components/upload/Upload";
import upload from "@/utils/upload";
import { useRouter } from 'vue-router'
const userFormRef = ref();
const userForm = reactive({
  username: "",
  password: "",
  gender: 0,
  role: 1, // 1是管理员，2是编辑
  introduction: "",
  avatar: "",
  file: null,
});

const userFormrules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入个人介绍", trigger: "blur" },
  ],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});

// 性别选择
const options = [
  {
    label: "保密",
    value: 0,
  },
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];

// 角色选择
const roles = [
  {
    label: "管理员",
    value: 1,
  },
  {
    label: "编辑",
    value: 2,
  },
];

// 每次选择完图片之后的回调
const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};

const router = useRouter()

const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if(valid) {
      await upload("/adminapi/user/add", userForm)

      router.push('/user-manage/userlist')
    }
  })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>