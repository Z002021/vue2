<template slot-scope="scope">
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="1">
          <span>ID</span>
        </el-col>
        <el-col :span="4">
          <el-input size="medium" placeholder="ID" v-model="input_id">
          </el-input>
        </el-col>
        <el-col :span="1.2">
          <span>名字</span>
        </el-col>
        <el-col :span="4">
          <el-input size="medium" placeholder="名字" v-model="input_name">
          </el-input>
        </el-col>
        <el-col :span="1.5">
          <el-button size="mini" type="primary">查询</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button size="mini" type="primary">导入</el-button>
        </el-col>
        <el-col :span="9">
          <el-button size="mini" type="primary">导出</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="text" size="small" @click="addDialog"
            >新增</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" prop="date" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="name" label="名字" width="180">
        </el-table-column>
        <el-table-column prop="address" label="密码"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small" @click="editUserlist(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </el-card>

    <el-dialog
      align="left"
      title="提示"
      :visible.sync="addUserVisible"
      width="50%"
      @close="closeAdduserDialog"
    >
      <!--主体部分 -->
      <el-form
        :model="addUserForm"
        status-icon
        :rules="addUserFormRul"
        ref="addUserFormRel"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="id" prop="id">
          <el-input v-model="addUserForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="addUserForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="addUserForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserList">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      align="left"
      title="修改用户"
      :visible.sync="editUserVisible"
      width="50%"
    >
      <!--主体部分 -->
      <el-form
        :model="editUserForm"
        status-icon
        ref="editUserFormRel"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="addUserForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="addUserForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
      //添加用户dialog,控制显示隐藏
      addUserVisible: false,
      //添加用户信息
      addUserForm: {
        id: "",
        username: "",
        password: "",
      },
      //添加用户规则
      addUserFormRul: {
        id: [
          {
            required: true,
            message: "请输入id",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "长度为6到15个字符",
            trigger: "blur",
          },
        ],
      },
      //修改用户参数
      editUserForm: {
        id: "",
        username: "",
        password: "",
      },
      //修改用户dialog,控制显示隐藏
      editUserVisible: false,
    };
  },

  methods: {
    //点击添加新用户
    addDialog() {
      this.addUserVisible = !this.addUserVisible;
    },
    //关闭添加用户对话框，重置表单
    closeAdduserDialog() {
      this.$refs.addUserFormRel.resetFields();
    },
    //修改用户信息事件
    editUserlist(item) {
      this.editUserVisible = !this.editUserVisible;
      this.editUserForm = {
        username: item.username,
        email: item.email,
        mobile: item.mobile,
        id: item.id,
      };
    },
    //点击确定发送请求修改用户信息
    editUser() {
      this.$http
        .put(`users/${this.editUserForm.id}`, {
          email: this.editUserForm.email,
          mobile: this.editUserForm.mobile,
        })
        .then((res) => {
          //console.log(res);
          if (res.data.meta.status !== 200)
            return this.$message.error("修改用户信息失败！");
          this.$message.success("修改用户信息成功！");
          this.getUserList();
          this.editUserVisible = !this.editUserVisible;
        });
    },
  },
};
</script>

<style></style>
