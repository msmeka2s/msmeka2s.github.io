<template>
  <div class="www-navigator gridContainer">
    <div class="header">
      <h2>Header</h2>
      <custom-menu direction="horizontal"
                   type="main"
                   :menuItems="mainMenu"
                   @navigate="updateSubnav"
      ></custom-menu>
    </div>
    <div class="leftSide">
      <custom-menu direction="vertical"
                   type="sub"
                   :menuItems="activeSubMenuItems"
                   @navigate="updateContent"
      ></custom-menu>
    </div>
    <div class="mainContent">
      {{ mainContent }}
    </div>
    <div class="rightSide">
      <a v-for="reference in references" :key="reference" :href="reference">{{ reference }}</a>
    </div>
    <div class="footer">
      <h2>Footer:
        <span>
          <a href="#">Sitemap</a>
          <a href="#">Home</a>
          <a href="#">News</a>
          <a href="#">Contact</a>
          <a href="#">About</a>
        </span>
      </h2>
    </div>
  </div>
</template>

<script>
import customMenu from './CustomMenu.vue';
import jsonMainMenu from '../assets/nav_horizontal_main.json';
import jsonSubMenu from '../assets/nav_vertical_sub.json';

export default {
  name: 'www-navigator',
  components: {
    customMenu
  },
  data() {
    return {
      mainContent: "",
      references: [],
      mainMenu: jsonMainMenu,
      subMenu: jsonSubMenu,
      activeSubMenuItems: []
    }
  },
  methods: {
    updateSubnav(item) {
      const activeLinkname = item.name;
      for (const subItem of this.subMenu) {
        if (subItem.name == activeLinkname) {
          this.activeSubMenuItems = subItem.items;
        }
      }
      this.mainContent = "";
      this.references = [];
    },
    updateContent(item) {
      this.mainContent = item.content;
      this.references = item.references;
    }
  },
}
</script>

<style scoped>
h2 {
  font-weight: normal;
  margin:  0;
}
.gridContainer {
  display: grid;
  grid-template: auto 1fr auto / auto 1fr auto;
  margin: 10px;
  border-radius: 10px;
  color:  white;
  text-align: center;
}
.header {
  background: #c04f50;
  border-radius: 10px 10px 0 0;
  padding: 0 5px 15px;
}
.header, .footer {
  grid-column: 1 / 4;
}
.leftSide, .rightSide {
  padding: 10px 2rem;
  background: #C28280;
  grid-column: 1 / 4;
}
.mainContent {
  background: #6D9FBF;
  overflow-y: auto;
  padding: 20px;
  text-align: left;
  font-family: Arial;
  grid-column: 1 / 4;
}
.rightSide a {
  word-break: break-all;
}
.footer {
  background: black;
  padding-bottom: 15px;
  border-radius: 0 0 10px 10px;
}
.footer a {
  color: white;
  font-size: 14px;
}

@media (min-width: 600px) {
  .gridContainer {
    height: 95%;
  }
  .header .nav,
  .leftSide .nav {
    display: block;
  }
  .leftSide, .rightSide {
    padding: 10px 20px;
    max-width: 8rem;
  }
  .leftSide .nav a {
    display: block;
    padding: 4px 10px;
  }
  .leftSide {
    grid-column: 1 / 1;
  }
  .mainContent {
    grid-column: 2 / 2;
  }
  .rightSide {
    grid-column: 3 / 3;
  }
}

@media (min-width: 1200px) {
  .leftSide, .rightSide {
    max-width: 10rem;
    padding: 10px 2rem;
  }
}
</style>
