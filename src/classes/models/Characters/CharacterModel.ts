import ModelBase from '@/classes/models/ModelBase'
import CharacterInterface from './CharacterInterface'

class CharacterModel extends ModelBase implements CharacterInterface {
    element_id: number
    // element: object
    vision_id: number
    // vision: object
    weapon_type_id: number
    // weapon_type: object
    association_id: number
    // association: object
    name: string
    title: string
    occupation: string
    rarity: number
    day_of_birth: number
    month_of_birth: number
    constellation: string
    description: string
    released: boolean
    icon: string | null;
    side_icon: string | null;
    gacha_card: string | null;
    gacha_splash: string | null;

    constructor(data: CharacterInterface) {
        super(data)
        this.element_id = data.element_id
        this.vision_id = data.vision_id
        this.weapon_type_id = data.weapon_type_id
        this.association_id = data.association_id
        this.name = data.name
        this.title = data.title
        this.occupation = data.occupation
        this.rarity = data.rarity
        this.day_of_birth = data.day_of_birth
        this.month_of_birth = data.month_of_birth
        this.constellation = data.constellation
        this.description = data.description
        this.released = data.released

        // GALLERY
        // Icon
        if (typeof data.icon !== 'undefined' && data.icon != null) this.icon = data.icon
        else if (typeof data.character_icon !== 'undefined' && data.character_icon != null) this.icon = data.character_icon.url
        else this.icon = null
        // Side Icon
        if (typeof data.side_icon !== 'undefined' && data.side_icon != null) this.side_icon = data.side_icon
        else if (typeof data.character_side_icon !== 'undefined' && data.character_side_icon != null) this.side_icon = data.character_side_icon.url
        else this.side_icon = null
        // Gacha Card
        if (typeof data.gacha_card !== 'undefined' && data.gacha_card != null) this.gacha_card = data.gacha_card
        else if (typeof data.character_gacha_card !== 'undefined' && data.character_gacha_card != null) this.gacha_card = data.character_gacha_card.url
        else this.gacha_card = null
        // Gacha Splash
        if (typeof data.gacha_splash !== 'undefined' && data.gacha_splash != null) this.gacha_splash = data.gacha_splash
        else if (typeof data.character_gacha_splash !== 'undefined' && data.character_gacha_splash != null) this.gacha_splash = data.character_gacha_splash.url
        else this.gacha_splash = null
    }
}

export default CharacterModel