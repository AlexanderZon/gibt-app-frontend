import { CharAscensionMaterialInterface, CharAscensionMaterialModel } from './CharAscensionMaterial'
import { TalentAscensionMaterialInterface, TalentAscensionMaterialModel } from './TalentAscensionMaterial'
import { WeapAscensionMaterialInterface, WeapAscensionMaterialModel } from './WeapAscensionMaterial'

export type AscensionMaterialGroupType = "level" | "talent" | "weapon"

export interface AscensionMaterialGroupCharacterInterface {
    character_icon: string
    character_id: number
    character_name: string
    quantity: number
}

export interface AscensionMaterialGroupTalentInterface extends AscensionMaterialGroupCharacterInterface { }

export interface AscensionMaterialGroupWeaponInterface extends AscensionMaterialGroupCharacterInterface {
    weapon_id: number
    weapon_icon: string
    weapon_name: string
}

export interface AscensionMaterialGroupInterface {
    items: Array<AscensionMaterialGroupWeaponInterface | AscensionMaterialGroupCharacterInterface | AscensionMaterialGroupTalentInterface>
    ascension_material_icon: string
    ascension_material_id: number
    ascension_material_name: string
    ascension_material_rarity: number
    quantity: number
    can_farm_today: boolean
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

export class AscensionMaterialGroupTalentModel extends AscensionMaterialGroupCharacterModel implements AscensionMaterialGroupTalentInterface {
    constructor(data: AscensionMaterialGroupTalentInterface) {
        super(data)
    }
}

export class AscensionMaterialGroupWeaponModel extends AscensionMaterialGroupCharacterModel implements AscensionMaterialGroupWeaponInterface {
    declare weapon_icon: string
    declare weapon_id: number
    declare weapon_name: string

    constructor(data: AscensionMaterialGroupWeaponInterface) {
        super(data)
        this.weapon_icon = data.weapon_icon
        this.weapon_id = data.weapon_id
        this.weapon_name = data.weapon_name
    }
}

export class AscensionMaterialGroupModel implements AscensionMaterialGroupInterface {
    declare items: Array<AscensionMaterialGroupWeaponModel | AscensionMaterialGroupCharacterModel | AscensionMaterialGroupTalentModel>
    declare ascension_material_icon: string
    declare ascension_material_id: number
    declare ascension_material_name: string
    declare ascension_material_rarity: number
    declare quantity: number
    declare can_farm_today: boolean

    constructor(data: WeapAscensionMaterialModel | CharAscensionMaterialModel | TalentAscensionMaterialModel) {
        this.ascension_material_icon = data.ascension_material_icon
        this.ascension_material_id = data.ascension_material_id
        this.ascension_material_name = data.ascension_material_name
        this.ascension_material_rarity = data.ascension_material_rarity
        this.can_farm_today = data.can_farm_today
        this.quantity = 0
        this.items = []
        this.add(data)
    }

    add(data: WeapAscensionMaterialModel | CharAscensionMaterialModel | TalentAscensionMaterialModel) {
        console.log('add: ', data)
        if (data instanceof WeapAscensionMaterialModel) {
            this.items.push(new AscensionMaterialGroupWeaponModel({
                character_icon: data.character_icon,
                character_id: data.character_id,
                character_name: data.character_name,
                weapon_icon: data.weapon_icon,
                weapon_id: data.weapon_id,
                weapon_name: data.weapon_name,
                quantity: data.quantity,
            }))
        } else if (data instanceof TalentAscensionMaterialModel) {
            this.items.push(new AscensionMaterialGroupTalentModel({
                character_icon: data.character_icon,
                character_id: data.character_id,
                character_name: data.character_name,
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

    static instanceOfWeapAscensionMaterialInterface(object: any): object is WeapAscensionMaterialInterface {
        return 'member' in object;
    }

    static instanceOfCharAscensionMaterialInterface(object: any): object is CharAscensionMaterialInterface {
        return 'member' in object;
    }

    static instanceOfTalentAscensionMaterialInterface(object: any): object is TalentAscensionMaterialInterface {
        return 'member' in object;
    }
}