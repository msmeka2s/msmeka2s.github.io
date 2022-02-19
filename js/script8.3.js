import { LitElement, html, css } from 'https://unpkg.com/lit-element/lit-element.js?module';

class WwwNavigator extends LitElement {

  static get styles() {
    return css`
      html, body {
        height: 100%;
      }
      body {
        margin: 0;
        background: #fff;
      }
      h2 {
        font-weight: normal;
        margin:  0;
      }
      a.button {
        background: #6A709F;
        color: black;
        border-radius: 20px;
        text-decoration: none;
        padding: 4px 30px;
        margin: 5px;
        font-weight: bold;
        font-family: Arial;
        border: 2px outset #F9FBFC;
        font-size: 14px;
      }
      a.button:hover, 
      a.button.active {
        background: #fff;
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
      .header .nav {
        text-align: left;
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
      }
      .header, .footer {
        grid-column: 1 / 4;
      }
      .leftSide, .rightSide {
        padding: 10px;
        background: #C28280;
        grid-column: 1 / 4;
      }
      .leftSide .nav {
        display: flex;
        flex-wrap: wrap;
      }
      .leftSide .nav a {
        margin: 5px;
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
          max-width: 6rem;
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
    `;
  }

  static get properties() {
    return {
      mainContent: { type: String },
      references: { type: Array },
      subNav: { type: Array }
    }
  }

  constructor() {
    super();
    this.mainContent = '';
    this.references = [];
    this.subNav = [];
  }

  render() {
    return html`
        <div class="gridContainer">
          <div class="header">
            <h2>Header</h2>
            <custom-menu direction="horizontal" 
                         type="main" 
                         elementPath="data/exercise_8_nav_horizontal_main.json"
                         @navigate="${(e) => this.updateNav(e)}"
            ></custom-menu>
          </div>
          <div class="leftSide">
            <custom-menu .dataNavigator="${this.subNav}" 
                         direction="vertical" 
                         type="sub" 
                         elementPath="data/exercise_8_nav_vertical_sub.json"
                         @navigate="${(e) => this.updateContent(e)}"
            ></custom-menu>
          </div>
          <div class="mainContent">
            ${this.mainContent}
          </div>
          <div class="rightSide">
            ${this.references ? this.references.map(reference => html`
              <a href="${reference}">${reference}</a>
            `) : 'Additional Information: Links to external ressources'}
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
	`;
  }

  updateNav(e) {
    const activeMenuItem = e.detail.activeMenuItem;
    this.subNav = activeMenuItem;
  }

  updateContent(e) {
    const activeMenuItem = e.detail.activeMenuItem;
    this.mainContent = activeMenuItem.content;
    this.references = activeMenuItem.references;
  }

}

customElements.define('www-navigator', WwwNavigator);