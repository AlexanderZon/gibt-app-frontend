import ModelInterface from "./ModelInterface";

class ModelBase implements ModelInterface {
    id: number
    constructor(data: ModelInterface) {
        this.id = data.id
    }
}

export default ModelBase