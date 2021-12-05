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
        padding: 6px 30px;
        margin: 0 5px;
        font-weight: bold;
        font-family: Arial;
        border: 2px outset #F9FBFC;
        font-size: 14px;
        cursor: pointer;
        max-width: 180px;
      }
      button:hover,
      button.active {
        background: #fff;
        box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
      }
      @media screen and (max-width: 375px) {
        .menu.vertical {
          margin: 0;
        }
        .menu.vertical button {
           display: inline;
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