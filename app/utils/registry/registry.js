import renderers from 'utils/registry';

export class Registry {

	constructor(){

		this.registry = {};
		renderers.forEach( (renderer) => {
				const key = renderer.key;
				
				if (!key)
					throw Error("not a renderer: "+renderer)

				if (this.registry[key])
					throw Error("ambiguous renderer: "+renderer+" clashes with: "+this.registry[key])

				console.log("registered renderer for: ", key);
				this.registry[key] = renderer;
		});
	}

	load(key){
		if (!this.registry[key])
			throw Error("unknown renderer: "+key)

		return this.registry[key];
	}
}

const registry = new Registry();
export default registry;
