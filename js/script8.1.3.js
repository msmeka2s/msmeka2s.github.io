import { LitElement, html, css } from 'https://unpkg.com/lit-element/lit-element.js?module';

class Spreadsheet extends LitElement {

	static get styles() {
		return css`
			table {
				border-collapse: collapse;
			}
			td {
				border: 1px solid #000;
				width: 200px;
				height: 25px;
				text-align: center;
			}
			input {
				width: 98%;
				height: 84%;
				margin: 0;
				padding: 0;
			}
		`;
	}

	static get properties() {
		return {
			numberRows: { type: Number },
			numberColumns: { type: Number },
			tableContent: { type: Array },
			alphabetMapping: { type: Array }
		}
	}

	constructor() {
		super();
		this.numberRows = this.numberRows ?? 10;
		this.numberColumns = this.numberColumns ?? 5;
		this.tableContent = [];
		this.alphabetMapping = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
		for (let i = 0; i < this.numberRows; i++) {
			let contentRows = [];
			for (let j = 0; j < this.numberColumns; j++) {
				const rowIdentifier = this.alphabetMapping[i];
				const columnIdentifier = j+1;
				const contentCell = {
					formula: '',
					result: '',
					editing: false,
					identifier: "" + rowIdentifier + columnIdentifier
				};
				contentRows.push(contentCell);
			}
			this.tableContent.push(contentRows);
		}
	}

	render() {
		return html`
			<div class="spreadsheet">
				<h1>Tabellenkalkulation</h1>
				<table>
					${this.tableContent.map(row => html`
						<tr>
							${row.map(cell => html`
								<td>
									<input type="text" 
										   @blur="${(e) => this.execCalculation(cell, e)}"
										   @focus="${(e) => this.showFormula(cell, e)}"
										   value="${cell.editing ? cell.formula : cell.result}"
									/>
								</td>
							`)}
						</tr>
					`)}
				</table>
			</div>
		`;
	}

	execCalculation(cell, e = null) {
		cell.editing = false;
		let inputString = "";
		if (e) {
			inputString = e.target.value;
		} else {
			inputString = cell.formula;
		}

		let formulaEntered = false;
		let typeOfCalc = "";

		if (inputString.indexOf("=SUM") >= 0) {
			formulaEntered = true;
			typeOfCalc = "sum";
		}
		if (inputString.indexOf("=SUB") >= 0) {
			formulaEntered = true;
			typeOfCalc = "subtract";
		}
		if (inputString.indexOf("=MUL") >= 0) {
			formulaEntered = true;
			typeOfCalc = "multiply";
		}
		if (inputString.indexOf("=DIV") >= 0) {
			formulaEntered = true;
			typeOfCalc = "divide";
		}

		if (formulaEntered) {
			const param1 = inputString.substring(
				inputString.indexOf("(") + 1,
				inputString.lastIndexOf(":")
			);
			const param2 = inputString.substring(
				inputString.indexOf(":") + 1,
				inputString.lastIndexOf(")")
			);

			const cell1 = this.getColumn(param1);
			const cell2 = this.getColumn(param2);

			switch (typeOfCalc) {
				case "sum":
					cell.result = this.sum(parseInt(cell1.result), parseInt(cell2.result));
					break;
				case "subtract":
					cell.result = this.subtract(parseInt(cell1.result), parseInt(cell2.result));
					break;
				case "multiply":
					cell.result = this.multiply(parseInt(cell1.result), parseInt(cell2.result));
					break;
				case "divide":
					cell.result = this.divide(parseInt(cell1.result), parseInt(cell2.result));
					break;
			}
			if (e) {
				e.target.value = cell.result;
			}
		} else {
			cell.result = inputString;
		}
		cell.formula = inputString;
		this.tableContent = [...this.tableContent];
		this.checkForCalcUpdates(cell);
	}

	showFormula(cell, e) {
		cell.editing = true;
		e.target.value = cell.formula;
		this.tableContent = [...this.tableContent];
	}

	getColumn(identifier) {
		const row = parseInt(identifier.substring(0, 1), 36) - 10;
		const column = identifier.substring(1) - 1;
		const tableCell = this.tableContent[row][column];
		return tableCell;
	}

	sum(x, y) {
		return x + y;
	}
	subtract(x, y) {
		return x - y;
	}
	multiply(x, y) {
		return x * y;
	}
	divide(x, y) {
		return x / y;
	}

	checkForCalcUpdates(tableCell) {
		for (const row of this.tableContent) {
			for (const cell of row) {
				if (cell.formula.includes(tableCell.identifier)) {
					this.execCalculation(cell);
				}
			}
		}
	}

}

customElements.define('spreadsheet-excel-like', Spreadsheet);