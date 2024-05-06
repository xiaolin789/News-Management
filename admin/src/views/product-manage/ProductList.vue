<template>
  <div>
    <el-card>
      <el-page-header icon="" title="产品管理">
        <template #content>
          <span class="text-large font-600 mr-3">产品列表</span>
        </template>
      </el-page-header>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="产品名称" width="180" />

       <el-table-column prop="introduction" label="产品介绍" width="180" />


        <el-table-column label="更新时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>

       

        <el-table-column label="操作">
          <template #default="scope">

            <el-button size="small" :icon="Edit" @click="handleEdit(scope.row)"></el-button>

            <el-popconfirm
              title="你确定要删除吗"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button
                  size="small"
                  :icon="Delete"
                  type="danger"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import {useRouter} from 'vue-router'
import formatTime from "@/utils/formatTime";
import { Edit, Delete } from "@element-plus/icons-vue";


const router = useRouter()
const tableData = ref([]);


onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  const res = await axios.get("/adminapi/product/list");
  // console.log(res.data);
  tableData.value = res.data.data;
};


// 删除回调
const handleDelete = async (item) => {
  await axios.delete(`/adminapi/product/list/${item.id}`)
  await getTableData()
}

// 编辑新闻
const handleEdit = (item) => {
  // 跳转到/news-manage/editnews/:id


  router.push(`/product-manage/editproduct/${item.id}`)
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}

::v-deep .htmlcontent {
  img {
    width: 100%;
  }
}
</style>