import { LitElement, html, css } from 'https://unpkg.com/lit-element/lit-element.js?module';

class WwwNavigator extends LitElement {

    static get styles() {
        return css`
          .layoutContainer {
            display: flex;
            flex-direction: column;
            margin: 10px;
            border-radius: 10px;
            color:  white;
          }
          .hidden {
            display: none;
          }
          h1, h2 {
            font-weight: normal;
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
            height: 60vh;
            margin-top: 25px;
            background: #fff;
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
            white-space: pre-wrap;
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
          .leftSide, .rightSide {
            padding: 10px;
            background: #ad6a3d;
          }
          .leftSide .sideNav a {
            display: block;
            margin: 16px 0;
            max-width: 150px;
          }
          .rightSide p {
            margin: 0 0 10px;
          }
          .rightSide a {
            word-break: break-word;
          }
          .mainContent {
            background: #3e4e59;
            overflow-y: auto;
            padding: 25px 15px;
          }
          .mainContent p {
            font-size: 1.125em;
          }
          .mainContent p.small {
            font-size: 0.875em;
          }
          .mainContent .intro .textContent {
            text-align: left;
          }
          .mainContent .intro .textContent li {
            line-height: 1.5;
          }
          .mainContent .taskDescription {
            text-align: left;
            line-height: 1.2;
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
          @media (min-width: 600px) {
            .layoutContainer {
              display: grid;
              grid-template: auto 1fr auto auto / auto 1fr;
              text-align: center;
            }
            .header, .footer {
              grid-column: 1 / 3;
            }
            .leftSide {
              grid-row: 2 / 4;
              padding: 10px 20px;
            }
            .rightSide {
              grid-column-start: 2;
              grid-column-end: 3;
            }
            .mainContent .intro .textContent {
              padding: 0 25px;
            }
          }
          @media (min-width: 1200px) {
            html, body {
              height: 100%;
            }
            .layoutContainer {
              grid-template: auto 1fr auto / auto 1fr auto;
            }
            .layoutContainer .rightSide {
              grid-column: 3 / 4;
              max-width: 200px;
            }
            .mainContent .intro .textContent {
              padding: 0 80px;
            }
            .header, .footer {
              grid-column: 1 / 4;
            }
          }
        `;
    }

    static get properties() {
        return {
            heading: { type: String },
            references: { type: Array },
            content: { type: Array },
            subNav: { type: Array },
            resetSubmenu: {type: Boolean},
            showBacklink: {type: Boolean},
            introText: { type: String },
            taskDescription: {type: String}
        }
    }

    constructor() {
        super();
        this.heading = '';
        this.references = [];
        this.content = [];
        this.subNav = [];
        this.resetSubmenu = false;
        this.showBacklink = false;
        this.getInitialIntrotext();
        this.taskDescription = null;
    }

    render() {
        if (!this.subNav.length) {
            this.getInitialSubmenu();
        }
        return html`
            <div class="layoutContainer">
              <div class="header">
                  <div class="nav">
                      <a class="button" href="index.html">Home</a>
                      <a target="_blank" class="button" href="https://github.com/msmeka2s/msmeka2s.github.io">Github</a>
                      <a target="_blank" class="button" href="https://62092df03f9160003a96c6b0-jlcymeqjba.chromatic.com">Storybook</a>
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
                  <div class="intro">
                      ${this.heading ? html`
                          <h1>${this.heading}</h1>
                      ` : html `
                          <h1>Web Engineering Masterkurs - Wintersemester 21/22</h1>
                          <h2>Präsentation des Semesterprojektes</h2>
                          <p><small>Von Maximilian Smekal</small></p>
                          <br>
                      `}
                      <div class="textContent">
                          ${this.introText}
                      </div>
                  </div>
                  <div class="taskDescription">
                      ${this.taskDescription ? html`<p><b>Aufgabenstellung: </b><small>${this.taskDescription}</small></p>` : ``}
                  </div>
                  <div class="exerciseDisplay ${this.content ? '' : 'hidden'}">
                      ${this.content ? this.content.map(content => html`
                          ${content.visualizeOutput ? html`
                            <iframe srcdoc='${content.code}'></iframe>
                          ` : ''}
                      `) : 'No source code available'}
                  </div>
                  <div class="code ${this.content ? '' : 'hidden'}">
                      ${this.content ? this.content.map(content => html`
                          ${content.showCode ? html`
                              <h3>${content.headline ? content.headline : content.type + '-Quellcode'}</h3>
                              <pre><code>${content.code}</code></pre>
                          ` : ''}
                      `) : 'No source code available'}
                  </div>
              </div>
              <div class="rightSide">
                ${this.references && this.references.length > 0 ? this.references.map(reference => html`
                  <p><small><a href="${reference}">${reference}</a></small></p>
                `) : 'Additional Information: Links to external ressources'}
              </div>
              <div class="footer">
                  <a href="index.html">Home</a>
                  <a target="_blank" href="https://www.h-brs.de/de/impressum">Impressum (HBRS)</a>
                  <a target="_blank" href="https://www.h-brs.de/de/datenschutz">Datenschutzerklärung (HBRS)</a>
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
        if (activeMenuItem.items) {
            if (activeMenuItem.learningObjectives) {
                this.introText = html`
                    <h2>Lernziele</h2>
                    <ol>
                        ${activeMenuItem.learningObjectives.map(learningObjective => html`
                            <li>${learningObjective}</li>
                        `)}
                    </ol>
                    <br>
                    <p><small><i>Die Unteraufgaben können über die Seitennavigation auf der linken Seite betrachtet werden.</i></small></p>
                `;
            } else {
                this.introText = html`
                    <br><br>
                    <p><small><i>Zusätzliche Inhalte können über die Seitennavigation betrachtet werden.</i></small></p>
                `;
            }
        } else {
            this.introText = null;
        }

        this.heading = activeMenuItem.heading ?? activeMenuItem.name;
        this.content = activeMenuItem.content ?? [];
        this.references = activeMenuItem.references ?? [];
        this.subNav = [];
        this.resetSubmenu = false;
        this.showBacklink = true;
        this.taskDescription = activeMenuItem.task ?? null;
    }

    triggerResetSubmenu() {
        this.resetSubmenu = true;
        this.heading = '';
        this.content = [];
        this.references = [];
        this.showBacklink = false;
        this.getInitialIntrotext();
        this.taskDescription = null;
    }

    getInitialIntrotext() {
        this.introText = html`
            <p>
                  Herzlich Willkommen auf meiner Webseite zur Präsentation des Semesterprojektes im Masterkurs Web Engineering. 
                  Während des Semesters wurden insgesamt 12 Übungen bearbeitet, welche durch die Navigation auf der linken Seite 
                  betrachtet werden können. Das Ergebnis der jeweiligen Übungen ist dabei als ein eigenständiger <code>iframe</code> eingebunden. 
                  Außerdem ist der Quellcode unterhalb der Ergebnisse sichtbar. Mögliche Referenzen bzw. Quellenangaben sind auf der rechten Seite
                  dargestellt.
              </p>
              <p>
                  Um die erstellten Vue-komponenten besser präsentieren zu können wurde hierfür ein Storybook angelegt, 
                  welches über die Header-Navigation erreicht werden kann. Hier sind die einzelnen Vue-komponenten aus der 
                  Übung mitsamt der verschiedenen Einstellungsmöglichkeiten sichtbar.
              </p>
              <p>
                  Die Webseite an sich wurde responsiv mit dem Grid bzw. Flexbox Layout erstellt und auch für mobile Ansichten optimiert.
                  Um einzelne Teile der Webseite besser voneinander kapseln zu können und einen modularen Aufbau zu gewährleisten 
                  besteht die Webseite aus einzelnen Webkomponenten, die mithilfe des LitElement-Frameworks realisiert wurden.
              </p>
        `;
    }

}

customElements.define('www-navigator', WwwNavigator);