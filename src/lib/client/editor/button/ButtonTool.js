// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export default class ButtonTool {
	static get toolbox() {
		return {
			title: 'Button',
			icon: '<button>BTN</button>'
		};
	}

	static get shortcut() {
		return 'CMD+SHIFT+B';
	}

	constructor({ data }) {
		this.data = data || { text: '', link: '' };
	}

	render() {
		this.data.text = this.data.text != '' ? this.data.text : 'En savoir +';
		this.data.link = this.data.link != '' ? this.data.link : '#';

		this.wrapper = document.createElement('div');
		this.wrapper.classList.add('btn');

		this.button = document.createElement('span');
		this.button.href = this.data.link;
		this.button.textContent = this.data.text;
		this.button.contentEditable = true;
		this.button.oninput = (event) => {
			this.data.text = event.target.textContent;
		};

		this.wrapper.appendChild(this.button);

		this.button.ondblclick = () => {
			this.openPopup();
		};

		return this.wrapper;
	}

	openPopup() {
		const newLink = prompt('Entrez le lien du bouton :', this.data.link);

		if (newLink !== null) {
			this.data.link = newLink;
		}
	}

	save() {
		// Sauvegardez les données actuelles
		return this.data;
	}

	validate(savedData) {
		if (!savedData.text.trim()) {
			return false;
		}

		return true;
	}
}
