import { LitElement, html, css } from 'https://unpkg.com/lit-element/lit-element.js?module';

export class Menu extends LitElement {

  static get styles() {
    return css`
      .vertical button {
        display: block;
        margin-top: 5px;
      }
      .menu.vertical button {
        display: inline;
      }
      button {
        background: #6A709F;
        color: black;
        border-radius: 20px;
        text-decoration: none;
        padding: 10px 15px;
        margin: 0 1px;
        font-weight: bold;
        font-family: Arial;
        border: 2px outset #F9FBFC;
        font-size: 14px;
        cursor: pointer;
        width: 100px;
      }
      button:hover,
      button.active {
        background: #fff;
        box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
      }
      @media (min-width: 600px) {
        .menu.vertical button {
          display: block;
          margin-top: 10px;
        }
      }
      @media (min-width: 1200px) {
        .menu.vertical button {
          width: 120px;
        }
      }
    `;
  }

  static get properties() {
    return {
      direction: { type: String },
      type: { type: String },
      elements: { type: Array },
      initialSubmenu: { type: Array },
      activeMenuItem: { type: Object },
      resetMenu: {type: Boolean}
    }
  }

  constructor() {
    super();
    this.direction = this.direction ?? 'horizontal';
    this.type = this.type ?? 'main';
    this.elements = [];
    this.initialSubmenu = [];
    this.activeMenuItem = {};
    this.resetMenu = this.resetMenu ?? false;
  }

  render() {
    if (!this.elements.length || this.resetMenu) {
      this.elements = this.initialSubmenu;
      this.resetMenu = false;
    }
    return html`
			<div class="menu ${this.direction === 'vertical' ? 'vertical' : ''}">
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
    if (this.activeMenuItem.items) {
      this.updateSubnav();
    }

    this.dispatchEvent( new CustomEvent('navigate', {
      detail: {
        activeMenuItem: this.activeMenuItem
      }
    }) );
  }

  updateSubnav() {
    this.elements = this.activeMenuItem.items;
  }

}

customElements.define('custom-menu', Menu);