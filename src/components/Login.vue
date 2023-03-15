<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="login_form"
        >
          <el-form-item label="名字：" prop="name">
            <el-input
              type="username"
              v-model="ruleForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm: {
        name: "",
        pass: "",
      },
      rules: {
        name: [
          { validator: validateName, trigger: "blur" },
          { min: 3, max: 15, message: "长度需在3到15之间" },
        ],
        pass: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 30, message: "长度需在6到30之间" },
        ],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          this.$router.push({ path: "./home" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.container {
  position: relative;
  width: 100%;
  background-color: #508994;
  min-height: 100vh;
  overflow: hidden;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin {
  width: 450px;
  height: 300px;
  position: absolute;
  top: 38%;
  left: 38%;
  display: flex;
  align-items: center;
}

.btns {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
