import styles from "./card.css";

export enum Attribute {
    "name" = "name",
    "uid" = "uid",
    "image" = "image",
    "type" = "type",
}

class Card extends HTMLElement {
    name?: string;
    uid?: number;
    image?: string;
    type?: string;

    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
            name: null,
            uid: null,
            image: null,
            type: null,
        };
        return Object.keys(attrs);
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(
        propName: Attribute,
        _: string | undefined,
        newValue: string | undefined
        ) {
            switch (propName) {
                case Attribute.uid:
                    this.uid = newValue ? Number(newValue) : undefined;
                    break;

                default:
                this[propName] = newValue;
                break;
            }

            this.render();
        }

        render() {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = ``

                const css = this.ownerDocument.createElement("style");
                css.innerHTML = styles;
                this.shadowRoot?.appendChild(css);

                this.shadowRoot.innerHTML += `
                <section>
                    <h2>${this.name} #${this.uid}</h2>
                    <img src="${this.image}">
                    <h3>${this.type}</h3>
                </section>
                `;
            }
        }
    }

customElements.define("my-card", Card);
export default Card;