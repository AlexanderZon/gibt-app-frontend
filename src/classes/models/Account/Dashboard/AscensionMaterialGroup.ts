import { CharAscensionMaterialInterface } from './CharAscensionMaterial'
import { WeapAscensionMaterialInterface } from './WeapAscensionMaterial'

export interface AscensionMaterialGroupCharacterInterface {
    character_icon: string
    character_id: number
    character_name: string
    quantity: number
}

export interface AscensionMaterialGroupWeaponInterface {
    character_icon: string
    character_id: number
    character_name: string
    weapon_icon: string
    weapon_id: number
    weapon_name: string
    quantity: number
}

export interface AscensionMaterialGroupInterface {
    items: Array<AscensionMaterialGroupWeaponInterface | AscensionMaterialGroupCharacterInterface>
    ascension_material_icon: string
    ascension_material_id: number
    ascension_material_name: string
    ascension_material_rarity: number
    quantity: number
    can_farm_today: boolean
}

export class AscensionMaterialGroupWeaponModel implements AscensionMaterialGroupWeaponInterface {
    declare character_icon: string
    declare character_id: number
    declare character_name: string
    declare weapon_icon: string
    declare weapon_id: number
    declare weapon_name: string
    declare quantity: number

    constructor(data: AscensionMaterialGroupWeaponInterface) {
        this.character_icon = data.character_icon
        this.character_id = data.character_id
        this.character_name = data.character_name
        this.weapon_icon = data.weapon_icon
        this.weapon_id = data.weapon_id
        this.weapon_name = data.weapon_name
        this.quantity = data.quantity
    }
}

export class AscensionMaterialGroupCharacterModel implements AscensionMaterialGroupCharacterInterface {
    declare character_icon: string
    declare character_id: number
    declare character_name: string
    declare quantity: number

    constructor(data: AscensionMaterialGroupCharacterInterface) {
        this.character_icon = data.character_icon
        this.character_id = data.character_id
        this.character_name = data.character_name
        this.quantity = data.quantity
    }
}

export class AscensionMaterialGroupModel implements AscensionMaterialGroupInterface {
    declare items: Array<AscensionMaterialGroupWeaponModel | AscensionMaterialGroupCharacterModel>
    declare ascension_material_icon: string
    declare ascension_material_id: number
    declare ascension_material_name: string
    declare ascension_material_rarity: number
    declare quantity: number
    declare can_farm_today: boolean

    constructor(data: WeapAscensionMaterialInterface | CharAscensionMaterialInterface) {
        this.ascension_material_icon = data.ascension_material_icon
        this.ascension_material_id = data.ascension_material_id
        this.ascension_material_name = data.ascension_material_name
        this.ascension_material_rarity = data.ascension_material_rarity
        this.can_farm_today = data.can_farm_today
        this.quantity = 0
        this.items = []
        this.add(data)
    }

    add(data: WeapAscensionMaterialInterface | CharAscensionMaterialInterface) {
        if (this.instanceOfWeapAscensionMaterialInterface(data)) {
            this.items.push(new AscensionMaterialGroupWeaponModel({
                character_icon: data.character_icon,
                character_id: data.character_id,
                character_name: data.character_name,
                weapon_icon: data.weapon_icon,
                weapon_id: data.weapon_id,
                weapon_name: data.weapon_name,
                quantity: data.quantity
            }))
        } else {
            this.items.push(new AscensionMaterialGroupCharacterModel({
                character_icon: data.character_icon,
                character_id: data.character_id,
                character_name: data.character_name,
                quantity: data.quantity
            }))
        }
        this.quantity += data.quantity
    }

    instanceOfWeapAscensionMaterialInterface(object: any): object is WeapAscensionMaterialInterface {
        return 'member' in object;
    }

    instanceOfCharAscensionMaterialInterface(object: any): object is CharAscensionMaterialInterface {
        return 'member' in object;
    }
}