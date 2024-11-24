<template>
  <div class="login-body">
    <div class="login-panel">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: '请输入账号！' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: '请输入密码！' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const formState = reactive({
  username: "",
  password: "",
  remember: true,
});

const router = useRouter();

const onFinish = async () => {
  const myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  const urlencoded = new URLSearchParams();
  urlencoded.append("username", formState.username);
  urlencoded.append("password", formState.password);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "http://127.0.0.1:3000/user/login",
      requestOptions
    );
    if (response.ok) {
      const result = await response.json(); // 假设服务器返回 JSON 格式的数据
      console.log(result);

      // 存储 token
      localStorage.setItem("token", result.token);

      // 路由跳转到 Home.vue
      router.push("/home");
    }
  } catch (error) {
    console.log("error", error);
    // 处理错误
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>

<style lang="scss">
.login-body {
  background-image: url(../assets/login-back.webp);
  width: 100%;
  height: calc(100vh);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-panel {
  width: 350px;
  height: 400px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
}
.login-panel form {
  flex-direction: column;
}
</style>