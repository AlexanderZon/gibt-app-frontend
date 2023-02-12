export interface CharAscensionMaterialInterface {
    character_icon: string
    character_id: number
    character_name: string
    ascension_material_icon: string
    ascension_material_id: number
    ascension_material_name: string
    ascension_material_rarity: number
    quantity: number
    can_farm_today: boolean
}

export class CharAscensionMaterialModel implements CharAscensionMaterialInterface {
    declare character_icon: string
    declare character_id: number
    declare character_name: string
    declare ascension_material_icon: string
    declare ascension_material_id: number
    declare ascension_material_name: string
    declare ascension_material_rarity: number
    declare quantity: number
    declare can_farm_today: boolean

    constructor(data: CharAscensionMaterialInterface) {
        this.character_icon = data.character_icon
        this.character_id = data.character_id
        this.character_name = data.character_name
        this.ascension_material_icon = data.ascension_material_icon
        this.ascension_material_id = data.ascension_material_id
        this.ascension_material_name = data.ascension_material_name
        this.ascension_material_rarity = data.ascension_material_rarity
        this.quantity = data.quantity
        this.can_farm_today = data.can_farm_today
    }
}