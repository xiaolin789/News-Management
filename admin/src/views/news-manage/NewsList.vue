<template>
  <div>
    <el-card>
      <el-page-header icon="" title="新闻管理">
        <template #content>
          <span class="text-large font-600 mr-3">新闻列表</span>
        </template>
      </el-page-header>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" width="180" />

        <el-table-column label="分类">
          <template #default="scope">
            {{ categoryFormat(scope.row.category) }}
          </template>
        </el-table-column>

        <el-table-column label="更新时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>

        <el-table-column label="是否发布">
          <template #default="scope">
            <el-switch
              v-model="scope.row.isPublish"
              :active-value="1"
              :inactive-value="0"
              @change="handleSwitchChange(scope.row)"
              class="ml-2"
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              "
            />
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              :icon="View"
              type="success"
              @click="handlePreview(scope.row)"
            ></el-button>

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

    <el-dialog v-model="dialogVisible" title="预览新闻" width="50%">
      <div>
        <h2>{{ previewData.title }}</h2>
        <div style="font-size: 12px; color: gray">
          {{ formatTime.getTime(previewData.editTime) }}
        </div>

        <el-divider
          ><el-icon><star-filled /></el-icon
        ></el-divider>

        <div v-dompurify-html="previewData.content" class="htmlcontent"></div>
        <!-- 用v-html容易被xss跨站脚本攻击 -->
        <!-- <div v-html="previewData.content" class="htmlcontent"></div> -->
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import {useRouter} from 'vue-router'
import formatTime from "@/utils/formatTime";
import { View, Edit, Delete, StarFilled } from "@element-plus/icons-vue";

const router = useRouter()
const tableData = ref([]);
const previewData = ref({});
const dialogVisible = ref(false);

onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  const res = await axios.get("/adminapi/news/list");
  // console.log(res.data);
  tableData.value = res.data.data;
};

// 格式化分类信息
const categoryFormat = (category) => {
  const arr = ["最新动态", "典型案例", "通知公告"];
  return arr[category - 1];
};

// 发布开关回调
const handleSwitchChange = async (item) => {
  // console.log(item);

  await axios.put("/adminapi/news/publish", {
    id: item.id,
    isPublish: item.isPublish,
  });

  await getTableData();
};

// 新闻预览
const handlePreview = (data) => {
  previewData.value = data;
  dialogVisible.value = true;
};

// 删除回调
const handleDelete = async (item) => {
  await axios.delete(`/adminapi/news/list/${item.id}`)
  await getTableData()
}

// 编辑新闻
const handleEdit = (item) => {
  // 跳转到/news-manage/editnews/:id


  router.push(`/news-manage/editnews/${item.id}`)
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