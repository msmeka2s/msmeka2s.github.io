<template>
  <div class="custom-menu" :class="direction">
    <ul>
      <li v-for="item in menuItems" :key="item.id">
        <button :class="item.active ? 'active' : ''" @click="navigate(item)">{{ item.name }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CustomMenu',
  data() {
    return {

    }
  },
  props: {
    menuItems: Array,
    direction: String
  },
  methods: {
    navigate(activeItem) {
      for (const menuItem of this.menuItems) {
        menuItem.active = false;
      }
      activeItem.active = true;
      this.$emit('navigate', activeItem);
    }
  },
  watch: {

  }
}
</script>

<style scoped>
.custom-menu.horizontal ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
}
.custom-menu.horizontal ul li {
  margin-right: 10px;
  margin-top: 10px;
}
ul {
  list-style: none;
  padding: 0;
}
.vertical button {
  display: block;
  margin-top: 15px;
  width: 100%;
}
button {
  background: #6A709F;
  color: black;
  border-radius: 20px;
  text-decoration: none;
  padding: 4px 20px;
  margin: 0 5px;
  font-weight: bold;
  font-family: Arial;
  border: 2px outset #F9FBFC;
  font-size: 14px;
  cursor: pointer;
}
button:hover,
button.active {
  background: #fff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
}
</style>