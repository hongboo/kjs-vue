<template>
  <div>
    <!-- <div style="margin-top: 10px;display: flex;justify-content: center">
            <el-input v-model="keywords" placeholder="通过用户名搜索用户..." prefix-icon="el-icon-search"
                      style="width: 400px;margin-right: 10px" @keydown.enter.native="doSearch"></el-input>
            <el-button icon="el-icon-search" type="primary" @click="doSearch">搜索</el-button>
    </div>-->
    <div class="hr-container" v-for="(item, idx) in mockData" :key="idx">
      <div class="hr-bank">
        <el-tag type="danger">{{item.bankName}}</el-tag>
      </div>
      <el-card class="hr-card" v-for="(hr,index) in item.info" :key="index">
        <!-- <div slot="header" class="clearfix">
                    <span>{{hr.name}}</span>
                    <el-button style="float: right; padding: 3px 0;color: #e30007;" type="text"
                               icon="el-icon-delete" @click="deleteHr(hr)"></el-button>
        </div>-->
        <div>
          <div class="img-container">
            <img src="../../assets/icbc.jpeg" alt="hr.name" :title="hr.name" class="userface-img" />
            <!-- <img :src="item.iconUrl" :alt="item.iconUrl" title="hr.name" class="userface-img" /> -->
          </div>
          <div class="userinfo-container">
            <div>账号：{{hr.accountNo}}</div>
            <div>账户名称：{{hr.accountName}}</div>
            <div>币种：{{hr.currCode}}</div>
            <div>余额：{{hr.balance}}</div>
            <div>可用余额 ：{{hr.avlBal}}</div>
            <div>冻结余额：{{hr.frzBal}}</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "SysLog",
  data() {
    return {
      mockData: [],
      keywords: "",
      hrs: [],
      selectedRoles: [],
      allroles: []
    };
  },
  created() {
    this.getRequest("/kjsHome/getData", {}).then(resp => {
      this.mockData = resp;
      console.log("+++++++", this.mockData);
    });
  },
  mounted() {
    this.initHrs();
  },
  methods: {
    deleteHr(hr) {
      this.$confirm("此操作将永久删除【" + hr.name + "】, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest("/system/hr/" + hr.id).then(resp => {
            if (resp) {
              this.initHrs();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    doSearch() {
      this.initHrs();
    },
    hidePop(hr) {
      let roles = [];
      Object.assign(roles, hr.roles);
      let flag = false;
      if (roles.length != this.selectedRoles.length) {
        flag = true;
      } else {
        for (let i = 0; i < roles.length; i++) {
          let role = roles[i];
          for (let j = 0; j < this.selectedRoles.length; j++) {
            let sr = this.selectedRoles[j];
            if (role.id == sr) {
              roles.splice(i, 1);
              i--;
              break;
            }
          }
        }
        if (roles.length != 0) {
          flag = true;
        }
      }
      if (flag) {
        let url = "/system/hr/role?hrid=" + hr.id;
        this.selectedRoles.forEach(sr => {
          url += "&rids=" + sr;
        });
        this.putRequest(url).then(resp => {
          if (resp) {
            this.initHrs();
          }
        });
      }
    },
    showPop(hr) {
      this.initAllRoles();
      let roles = hr.roles;
      this.selectedRoles = [];
      roles.forEach(r => {
        this.selectedRoles.push(r.id);
      });
    },
    enabledChange(hr) {
      delete hr.roles;
      this.putRequest("/system/hr/", hr).then(resp => {
        if (resp) {
          this.initHrs();
        }
      });
    },
    initAllRoles() {
      this.getRequest("/system/hr/roles").then(resp => {
        if (resp) {
          this.allroles = resp;
        }
      });
    },
    initHrs() {
      this.getRequest("/system/hr/?keywords=" + this.keywords).then(resp => {
        if (resp) {
          this.hrs = resp;
          console.log("aadafasfsfdsafd---", this.hrs);
        }
      });
    }
  }
};
</script>

<style>
.userinfo-container div {
  font-size: 12px;
  color: #409eff;
}

.userinfo-container {
  margin-top: 20px;
}

.img-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.userface-img {
  width: 72px;
  height: 72px;
  border-radius: 72px;
}

.hr-container {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.hr-card {
  width: 350px;
  margin-bottom: 20px;
}

.hr-bank {
  width: 100%;
  margin: 15px 10px;
}
</style>