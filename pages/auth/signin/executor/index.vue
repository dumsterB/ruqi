<template>
  <div class="signup">
    <header class="header">
      <div class="logo">
        <img class="img" src="@/assets/img/logo-executor.svg" alt="" />
      </div>
    </header>
    <main>
      <auth></auth>
    </main>
  </div>
</template>

<script>
import auth from "@/components/pages/executor/auth/Auth";
export default {
  layout: "empty",
  components: {
    auth,
  },
};
</script>

<style scoped>
.header {
  height: 96px;
  background: #006edf;
}
.logo {
  display: flex;
  justify-content: center;
}
.img {
  height: 50px;
  margin-top: 20px;
}
</style>
