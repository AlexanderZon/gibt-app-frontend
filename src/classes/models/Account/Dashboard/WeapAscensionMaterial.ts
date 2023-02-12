export interface WeapAscensionMaterialInterface {
    character_icon: string
    character_id: number
    character_name: string
    ascension_material_icon: string
    ascension_material_id: number
    ascension_material_name: string
    ascension_material_rarity: number
    weapon_icon: string
    weapon_id: number
    weapon_name: string
    quantity: number
    can_farm_today: boolean
}

export class WeapAscensionMaterialModel implements WeapAscensionMaterialInterface {
    declare character_icon: string
    declare character_id: number
    declare character_name: string
    declare ascension_material_icon: string
    declare ascension_material_id: number
    declare ascension_material_name: string
    declare ascension_material_rarity: number
    declare weapon_icon: string
    declare weapon_id: number
    declare weapon_name: string
    declare quantity: number
    declare can_farm_today: boolean

    constructor(data: WeapAscensionMaterialInterface) {
        this.character_icon = data.character_icon
        this.character_id = data.character_id
        this.character_name = data.character_name
        this.ascension_material_icon = data.ascension_material_icon
        this.ascension_material_id = data.ascension_material_id
        this.ascension_material_name = data.ascension_material_name
        this.ascension_material_rarity = data.ascension_material_rarity
        this.weapon_icon = data.weapon_icon
        this.weapon_id = data.weapon_id
        this.weapon_name = data.weapon_name
        this.quantity = data.quantity
        this.can_farm_today = data.can_farm_today

    }
}