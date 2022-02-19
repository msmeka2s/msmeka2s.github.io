import { LitElement, html, css } from 'https://unpkg.com/lit-element/lit-element.js?module';

class SpeakersList extends LitElement {

	static get styles() {
		return css`
			button {
				min-height: 30px;
			}
			.SpeakerList {
				-webkit-box-shadow: 0 0 10px 0 rgb(0 0 0 / 50%);
				box-shadow: 0 0 10px 0 rgb(0 0 0 / 50%);
				border-radius: 5px;
				padding: 15px;
				background: #ddd;
				height: 90%;
			}
			.SpeakerList h1 {
				margin-top: 0;
			}
			.SpeakerList .form {
				display: flex;
			}
			.SpeakerList .form input {
				width: 100%;
			}
			.SpeakerList .form button {
				margin-left: 3px;
			}
			ul.speakers {
				padding-left: 28px;
			}
			ul.speakers li {
				margin: 5px 0;
			}
			@media (min-width: 600px) {
				.SpeakerList .form {
					height: 30px;
				}
				.SpeakerList .form input {
					width: 200px;
				}
			}
		`;
	}

	static get properties() {
		return {
			speakers: { type: Array },
			newSpeaker: { type: String }
		}
	}

	constructor() {
		super();
		this.speakers = [];
		this.newSpeaker = '';
	}

	render() {
		return html`
			<div class="SpeakerList">
				<h1>Rednerliste</h1>
				<div class="newSpeakerHandler">
					<p @keyup="${this.shortcutListener}">
						Neuer Redner:
					</p>
					<div class="form">
						<input type="text" value="${this.newItem}" @change="${this.updateList}" />
						<button @click="${this.addSpeaker}">Hinzufügen</button>
						<button @click="${this.clearList}">Liste leeren</button>
					</div>
				</div>
				<ul class="speakers">
					${this.speakers.map(speaker => html`
						<li>
							${speaker.name} ${this.formatTime(speaker.time)}
							<button @click="${() => this.handleSpeaking(speaker)}">${speaker.speaking ? 'Stop!' : 'Start!'}</button>
						</li>
					`)}
				</ul>
			</div>
		`;
	}

	shortcutListener(e) {
		if (e.key === 'Enter') {
			this.addSpeaker();
		}
	}

	refreshOutput() {
		this.speakers = [...this.speakers];
	}

	updateList(e) {
		this.newSpeaker = e.target.value;
	}

	addSpeaker() {
		if(this.newSpeaker) {
			this.speakers = [...this.speakers, {
				id: this.speakers.length + 1,
				name: this.newSpeaker,
				time: 0,
				speaking: true
			}];
			this.startTimer(this.speakers[this.speakers.length - 1]);
			this.newSpeaker = '';
		}
	}

	clearList() {
		this.speakers = [];
	}

	handleSpeaking(speaker) {
		speaker.speaking = !speaker.speaking;
		this.speakers = [...this.speakers];
		if (speaker.speaking) {
			this.startTimer(speaker);
		}
	}

	startTimer(speaker) {
		const that = this;
		for (const s of this.speakers) {
			s.speaking = false;
		}
		speaker.speaking = true;
		const interval = setInterval(function() {
			speaker.time++;
			that.speakers = [...that.speakers];
			if (speaker.speaking == false) {
				clearInterval(interval);
			}
		}, 1000);
	}

	formatTime(time) {
		const minutes = Math.floor(time / 60);
		const hours = Math.floor(minutes / 60);
		const seconds = time - minutes * 60;
		return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} `;
	}

}

customElements.define('speakers-list', SpeakersList);