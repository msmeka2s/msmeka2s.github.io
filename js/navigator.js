import { LitElement, html, css } from 'https://unpkg.com/lit-element/lit-element.js?module';

class WwwNavigator extends LitElement {

    static get styles() {
        return css`
          .gridContainer {
            display: grid;
            grid-template: auto 1fr auto / auto 1fr auto;
            margin: 10px;
            border-radius: 10px;
            color:  white;
            text-align: center;
            height: 95%;
          }
          .hidden {
            display: none;
          }
          h2 {
            font-weight: normal;
            margin:  0;
          }
          .button {
            background: #45a5ff;
            color: black;
            border-radius: 14px;
            text-decoration: none;
            padding: 8px 12px;
            margin: 0 10px;
            font-weight: bold;
            font-size: 14px;
            -webkit-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5); 
            box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
          }
            
          .button.active,
          .button:hover {
            background: #0565bf;
          }
          iframe {
            width: 100%;
            height: 80vh;
          }
          .code {
            text-align: left;
            margin-top: 50px;
            tab-size: 4;
          }
            
          .code pre {
            background: #333;
            padding: 15px 20px;
            border-radius: 5px;
          }
            
          .backButton {
            text-align: left;
            margin-bottom: 25px;
          }
          .backButton a {
            color: white;
            font-weight: bold;
            background: rgb(69, 165, 255);
            padding: 5px;
            border-radius: 5px;
            text-decoration: none;
          }  
          .backButton a:hover {
            text-decoration: underline;
          }
          .header {
            background: #1d8217;
            border-radius: 10px 10px 0 0;
            padding: 0 10px 20px;
          }
          .header .nav {
            margin-top: 20px;
          }
          .header, .footer {
            grid-column: 1 / 4;
          }
          .leftSide, .rightSide {
            padding: 10px 30px;
            background: #ad6a3d;
          }
          .leftSide .sideNav a {
            display: block;
            margin: 16px 0;
            max-width: 150px;
          }
          .rightSide {
            max-width: 200px;
          }
          .rightSide a {
            word-break: break-word;
          }
          .mainContent {
            background: #3e4e59;
            overflow-y: auto;
            padding: 30px;
          }
          .mainContent p {
            font-size: 1.125em;
          }
          .mainContent p.small {
            font-size: 0.875em;
          }
          .footer {
            background: #1d8217;
            padding: 15px 0 20px;
            border-radius: 0 0 10px 10px;
          }
          .footer a {
            color: white;
            margin: 0 15px;
          }
          @media screen and (max-width: 375px) {
            .gridContainer .leftSide,
            .gridContainer .mainContent,
            .gridContainer .rightSide {
              grid-column: 1 / 4;
            }
            .gridContainer .mainContent {
              overflow: visible;
            }
            .gridContainer .rightSide {
              max-width: 100%;
            }
          }
        `;
    }

    static get properties() {
        return {
            mainContent: { type: String },
            references: { type: Array },
            sourceCodes: { type: Array },
            subNav: { type: Array },
            resetSubmenu: {type: Boolean},
            showBacklink: {type: Boolean},
        }
    }

    constructor() {
        super();
        this.mainContent = '';
        this.references = [];
        this.sourceCodes = [];
        this.subNav = [];
        this.resetSubmenu = false;
        this.showBacklink = false;
    }

    render() {
        if (!this.subNav.length) {
            this.getInitialSubmenu();
        }
        return html`
            <div class="gridContainer">
              <div class="header">
                  <div class="nav">
                      <a class="button" href="index.html">Home</a>
                      <a class="button" href="#">Github</a>
                      <a class="button" href="#">Storybook</a>
                  </div>
              </div>
              <div class="leftSide">
                <custom-menu .initialSubmenu="${this.subNav}"
                             .resetMenu="${this.resetSubmenu}"
                             direction="vertical" 
                             type="sub"
                             @navigate="${(e) => this.updateContent(e)}"
                ></custom-menu>
              </div>
              <div class="mainContent">
                  <div class="backButton ${this.showBacklink ? '' : 'hidden'}">
                      <a href="#" @click="${() => this.triggerResetSubmenu()}">zurück</a>
                  </div>
                  <h2>Web Engineering Masterkurs - Wintersemester 21/22</h2>
                  <p>Präsentation des Semesterprojektes</p>
                  <p class="small">Von Maximilian Smekal</p>
                  <div class="exerciseDisplay ${this.sourceCodes ? '' : 'hidden'}">
                      ${this.sourceCodes ? this.sourceCodes.map(code => html`
                          ${code.visualizeOutput ? html`
                            <iframe srcdoc='${code.content}'></iframe>
                          ` : ''}
                      `) : 'No source code available'}
                  </div>
                  <div class="code ${this.sourceCodes ? '' : 'hidden'}">
                      ${this.sourceCodes ? this.sourceCodes.map(code => html`
                          ${code.showCode ? html`
                              <h3>${code.headline ? code.headline : code.type + '-Quellcode'}</h3>
                              <pre><code>${code.content}</code></pre>
                          ` : ''}
                      `) : 'No source code available'}
                  </div>
              </div>
              <div class="rightSide">
                ${this.references ? this.references.map(reference => html`
                  <a href="${reference}">${reference}</a>
                `) : 'Additional Information: Links to external ressources'}
              </div>
              <div class="footer">
                  <a href="index.html">Home</a>
                  <a href="#">Github</a>
                  <a href="#">Storybook</a>
              </div>
            </div>
          </div>
	`;
    }

    getInitialSubmenu() {
        const path = 'data/navigator_contents.json';
        fetch(path).then(response => response.text()).then((data) => {
            this.subNav = JSON.parse(data);
        });
    }

    updateContent(e) {
        const activeMenuItem = e.detail.activeMenuItem;
        this.mainContent = activeMenuItem.content ?? '';
        this.sourceCodes = activeMenuItem.code ?? [];
        this.references = activeMenuItem.references ?? [];
        this.subNav = [];
        this.resetSubmenu = false;
        this.showBacklink = true;
    }

    triggerResetSubmenu() {
        this.resetSubmenu = true;
        this.mainContent = '';
        this.sourceCodes = [];
        this.references = [];
        this.showBacklink = false;
    }

}

customElements.define('www-navigator', WwwNavigator);