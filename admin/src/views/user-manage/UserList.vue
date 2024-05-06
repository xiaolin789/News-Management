<template>
  <div>
    <el-card>
      <el-page-header icon="" title="用户管理">
        <template #content>
          <span class="text-large font-600 mr-3">用户列表</span>
        </template>
      </el-page-header>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="avatar" label="头像">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar
                :size="50"
                :src="'http://localhost:3000' + scope.row.avatar"
              ></el-avatar>
            </div>

            <div v-else>
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <!-- {{scope.row.role === 1 ? '管理员' : '编辑'}} -->

            <el-tag v-if="scope.row.role === 1" class="ml-2" type="success"
              >管理员</el-tag
            >

            <el-tag v-else class="ml-2" type="danger">编辑</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >

            <el-popconfirm
              title="你确定要删除吗"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">
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
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm()">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();

const dialogVisible = ref(false);
const tableData = ref([]);
const userFormRef = ref();
let userForm = reactive({
  username: "",
  password: "",
  gender: 0,
  role: 1,
  introduction: "",
});

const userFormrules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入个人介绍", trigger: "blur" },
  ],
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

onMounted(() => {
  getTableData();
  
});

const getTableData = async () => {
  const res = await axios.get("/adminapi/user/list");
  console.log(res.data);
  tableData.value = res.data.data;
  // store.commit("changeInfo", res.data.data);
};

// 编辑回调
const handleEdit = async (data) => {
  const res = await axios.get(`/adminapi/user/listId/${data.id}`);
  console.log(res.data.data);
  Object.assign(userForm, res.data.data[0]);
  dialogVisible.value = true;
};

// 编辑确认回调
const handleEditConfirm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      // 1.更新后端
       await axios.put(`/adminapi/user/listPut/${userForm.id}`, userForm).then(data=>{

         console.log(store.state.userInfo);
         console.log(userForm.id);
         if(data.data.ActionType == "OK" && store.state.userInfo.id == userForm.id) {
           console.log(123);
           console.log(' console.log(userForm);',userForm);
           store.commit("changeInfo", userForm);
         }
       })

      // 2.dialogVisible的隐藏
      dialogVisible.value = false;

      // 3.获取table数据
      getTableData();
    }
  });
};

const handleDelete = async (data) => {
  // console.log(data);
  await axios.delete(`/adminapi/user/list/${data.id}`);

  getTableData();
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>