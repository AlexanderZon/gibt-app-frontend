import { CharAscensionMaterialInterface, CharAscensionMaterialModel } from "./CharAscensionMaterial"

export interface TalentAscensionMaterialInterface extends CharAscensionMaterialInterface {

}

export class TalentAscensionMaterialModel extends CharAscensionMaterialModel implements TalentAscensionMaterialInterface {
    constructor(data: TalentAscensionMaterialInterface) {
        super(data)
    }
}