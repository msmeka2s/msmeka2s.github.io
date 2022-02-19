import { LitElement, html, css } from 'https://unpkg.com/lit-element/lit-element.js?module';

export class Menu extends LitElement {

  static get styles() {
    return css`
      .menu.vertical {
        margin-top: 20px;
      }
      .vertical button {
        display: block;
        margin-top: 10px;
      }
      button {
        background: #6A709F;
        color: black;
        border-radius: 20px;
        text-decoration: none;
        padding: 4px 30px;
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
    `;
  }

  static get properties() {
    return {
      direction: { type: String },
      type: { type: String },
      elementPath: { type: String },
      elements: { type: Array },
      subItems: { type: Array },
      activeMenuItem: { type: Object },
      dataNavigator: { type: Object }
    }
  }

  constructor() {
    super();
    this.direction = this.direction ?? 'horizontal';
    this.type = this.type ?? 'main';
    this.elementPath = this.elementPath ?? '';
    this.elements = [];
    this.subItems = [];
    this.dataNavigator = this.dataNavigator ?? {};
    this.activeMenuItem = {};
  }

  render() {
    if (!this.elements.length || !this.subItems.length) {
      this.setNavElements(this.elementPath);
    }

    if (this.dataNavigator) {
      this.setVisibleSubnavLinks(this.dataNavigator);
    }

    return html`
      <div class="menu ${this.direction == 'vertical' ? 'vertical' : ''}">
        ${this.elements ? this.elements.map(element => html`
          <button class="${element.active ? 'active' : ''}" @click="${() => this.navigate(element)}">
            ${element.name}
          </button>
        `) : '' }
      </div>
    `;
  }

  navigate(element) {
    for (const item of this.elements) {
      item.active = false;
    }
    element.active = true;

    this.activeMenuItem = element;
    this.dispatchEvent( new CustomEvent('navigate', {
      detail: {
        activeMenuItem: this.activeMenuItem
      }
    }) );
  }

  setNavElements(path) {
    fetch(path).then(response => response.text()).then((data) => {
      if (this.type == "main") {
        this.elements = JSON.parse(data);
      } else {
        this.subItems = JSON.parse(data);
      }
    });
  }

  setVisibleSubnavLinks(activeLink) {
    const activeLinkname = activeLink.name;
    for (const subItem of this.subItems) {
      if (subItem.name == activeLinkname) {
        this.elements = subItem.items;
      }
    }

    this.dataNavigator = null;
  }

}

customElements.define('custom-menu', Menu);