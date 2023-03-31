import { api } from "./components/data";
import "./components/export";
import Card, {Attribute} from "./components/card/card";

class AppContainer extends HTMLElement {
    pokemons: Card[] = [];
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        }
        
        async connectedCallback() {

            const data = await api()
            console.log(api)

            data?.forEach((user:any) => {
                const pokeCard = this.ownerDocument.createElement(
                    "my-card"
                    ) as Card;
                    pokeCard.setAttribute(Attribute.name, user.species.name);
                    pokeCard.setAttribute(Attribute.uid, String(user.id));
                    pokeCard.setAttribute(Attribute.image, user.sprites.front_default);
                    pokeCard.setAttribute(Attribute.type, user.types[0].type.name);
                    this.pokemons.push(pokeCard);
                });

            this.render(this.pokemons);
        }
        
        render(stars:any){
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = ``;
                
                this.pokemons.forEach((pokemon) => {
                    this.shadowRoot?.appendChild(pokemon);
                });
            }
        }
    }
    
customElements.define("app-container", AppContainer);