import ModelBase from '@/classes/models/ModelBase'
import WeaponInterface from './WeaponInterface'

class WeaponModel extends ModelBase implements WeaponInterface {
    weapon_type_id: number
    // weapon_type: object
    name: string
    rarity: number
    description: string
    released: boolean
    icon: string | null;
    awakened_icon: string | null;
    gacha_card: string | null;
    gacha_splash: string | null;

    constructor(data: WeaponInterface) {
        super(data)
        this.weapon_type_id = data.weapon_type_id
        this.name = data.name
        this.rarity = data.rarity
        this.description = data.description
        this.released = data.released

        // GALLERY
        // Icon
        if (typeof data.icon !== 'undefined' && data.icon != null) this.icon = data.icon
        else if (typeof data.weapon_icon !== 'undefined' && data.weapon_icon != null) this.icon = data.weapon_icon.url
        else this.icon = null
        // Side Icon
        if (typeof data.awakened_icon !== 'undefined' && data.awakened_icon != null) this.awakened_icon = data.awakened_icon
        else if (typeof data.weapon_awakened_icon !== 'undefined' && data.weapon_awakened_icon != null) this.awakened_icon = data.weapon_awakened_icon.url
        else this.awakened_icon = null
        // Gacha Card
        if (typeof data.gacha_card !== 'undefined' && data.gacha_card != null) this.gacha_card = data.gacha_card
        else if (typeof data.weapon_gacha_card !== 'undefined' && data.weapon_gacha_card != null) this.gacha_card = data.weapon_gacha_card.url
        else this.gacha_card = null
    }
}

export default WeaponModel