<template>
  <div class="signup">
    <header class="header">
      <div class="logo">
        <img class="img" src="@/assets/img/logo-executor.svg" alt="">
      </div>
    </header>
    <main>
      <tabs></tabs>
    </main>
  </div>
</template>

<script>
import tabs from "@/components/pages/executor/tabs/Tabs";

export default {
  layout: "empty",
  components: {
    tabs,
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.header {
  height: 96px;
  background: #006EDF;
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
