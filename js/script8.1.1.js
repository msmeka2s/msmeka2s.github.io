import { LitElement, html, css } from 'https://unpkg.com/lit-element/lit-element.js?module';

class GroceryList extends LitElement {

	static get styles() {
		return css`
		.groceryList {
			-webkit-box-shadow: 0 0 10px 0 rgb(0 0 0 / 50%);
			box-shadow: 0 0 10px 0 rgb(0 0 0 / 50%);
			border-radius: 5px;
			padding: 15px;
			background: #ddd;
			height: 90%;
		}
		.groceryList h1 {
			margin-top: 0;
		}
		.groceryList .form {
			display: flex;
		}
		.groceryList .form input {
			width: 100%;
		}
		.groceryList .form button {
			margin-left: 3px;
		}
		ul.shoppingList {
			padding-left: 28px;
		}
		ul.shoppingList li {
			margin: 5px 0;
		}
		@media (min-width: 600px) {
			.groceryList .form {
				height: 30px;
			}
			.groceryList .form input {
				width: 200px;
			}
		}
		`;
	}

	static get properties() {
		return {
			items: { type: Array },
			newItem: { type: String }
		}
	}

	constructor() {
		super();
		this.items = [];
		this.newItem = '';
	}

	render() {
		return html`
			<div class="groceryList">
				<h1>Einkaufsliste</h1>
				<div class="newItemHandler">
					<p @keyup="${this.shortcutListener}">
						Enter a new item:
					</p>
					<div class="form">
						<input type="text" 
							   class="itemName" 
							   value="${this.newItem}"
							   @change="${this.updateList}"
						/>
						<button class="addItem"
								@click="${this.addItem}"
						>Add item</button>
						<button class="clearList"
								@click="${this.clearList}"
						>Clear List</button>
					</div>
				</div>
				<ul class="shoppingList">
					${this.items.map(item => html`
						<li>
							${item.name}
							<button @click="${() => this.deleteItem(item.id)}">Delete</button>
						</li>
					`)}
				</ul>
			</div>
		`;
	}

	shortcutListener(e) {
		if (e.key === 'Enter') {
			this.addItem();
		}
	}

	updateList(e) {
		this.newItem = e.target.value;
	}

	addItem() {
		if(this.newItem) {
			this.items = [...this.items, {
				id: this.items.length + 1,
				name: this.newItem
			}];
			this.newItem = '';
		}
	}

	clearList() {
		this.items = [];
	}

	deleteItem(id) {
		this.items = this.items.filter(item => item.id !== id);
	}

}

customElements.define('grocery-list', GroceryList);