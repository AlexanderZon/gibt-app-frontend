interface WeaponInterface {
    weapon_type_id: number
    // weapon_type: object
    name: string
    rarity: number
    description: string
    released: boolean

    icon: string | null;
    awakened_icon: string | null;
    gacha_card: string | null;
    weapon_icon?: {
        id: number
        type: 'icon'
        url: string
    }
    weapon_awakened_icon?: {
        id: number
        type: 'awakened_icon'
        url: string
    }
    weapon_gacha_card?: {
        id: number
        type: 'gacha_card'
        url: string
    }
}

export default WeaponInterface