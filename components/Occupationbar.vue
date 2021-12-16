<template>
  <div class="wrapp-occupation">
    <div class="occupation-bar">
      <div class="occupation-item active"></div>
      <div class="occupation-item" :class="{ 'active' : occupation2}"></div>
      <div class="occupation-item" :class="{ 'active' : occupation3}"></div>
    </div>
    <div class="occupation-num">{{ completed }} / {{ total }}</div>
  </div>
</template>

<script>
export default {
  props: ['completed', 'total'],
  data() {
    return {}
  },
  computed: {
    occupation2: function () {
      if (this.completed / this.total > 0.33) {
        return true
      }
    },
    occupation3: function () {
      if (this.completed / this.total > 0.66) {
        return true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapp-occupation {
  display: flex;
  align-items: center;
}

.occupation-bar {
  display: flex;
  margin-right: 8px;
  align-content: center;

  .occupation-item {
    width: 22px;
    height: 10px;
    margin-right: 4px;
    background: #7A91A9;
    opacity: 0.1;
    border-radius: 2px;
  }

  .occupation-item:last-child {
    margin-right: 0;
  }

  .occupation-item.active {
    background: #F4D150;
    opacity: 1;
  }
}

.occupation-num {
  font-weight: 600;
  font-size: 14px;
}
</style>
