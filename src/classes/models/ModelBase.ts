import ModelInterface from "./ModelInterface";

class ModelBase {
    id: number | string | null = null
    constructor(data: any) {
        if (data.id) {
            this.id = data.id
        }
    }
}

export default ModelBase