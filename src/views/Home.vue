<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <span>首页</span>
      </div>
      <div>
        <el-button type="primary" @click="quit">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          default-active="activeIndex"
          router
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/home/users">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 返回登录页
  methods: {
    quit() {
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
<style scoped="scoped">
.el-header {
  background: #333744;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 22px;
  padding: 11px;
}
.el-aside {
  background: #333744;
  height: 100%;
  box-sizing: border-box;
}
.el-main {
  background: #ececec;
}
.home_container {
  height: 100%;
}
</style>
