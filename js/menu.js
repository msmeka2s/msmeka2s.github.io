import { LitElement, html, css } from 'https://unpkg.com/lit-element/lit-element.js?module';

export class Menu extends LitElement {

  static get styles() {
    return css`
      .menu.vertical {
        display: flex;
        flex-wrap: wrap;
      }
      .vertical button {
        display: block;
        margin-top: 8px;
      }
      .menu.vertical button {
        display: inline;
        flex-basis: 30%;
      }
      button {
        background: #2d3d48;
        color: #0d0;
        border-radius: 15px;
        text-decoration: none;
        padding: 10px;
        margin: 0 4px;
        font-weight: bold;
        font-family: Verdana, Arial, sans-serif;
        font-size: 13px;
        cursor: pointer;
        border: none;
        box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.5);
      }
      button:hover,
      button.active {
        background: #4e5e6a;
      }
      @media (min-width: 600px) {
        .menu.vertical {
          display: block;
        }
        .menu.vertical button {
          display: block;
          margin-top: 10px;
          width: 150px;
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