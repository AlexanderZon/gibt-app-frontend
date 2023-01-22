interface CharacterInterface {
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
    character_icon?: {
        id: number
        type: 'icon'
        url: string
    }
    character_side_icon?: {
        id: number
        type: 'side_icon'
        url: string
    }
    character_gacha_card?: {
        id: number
        type: 'gacha_card'
        url: string
    }
    character_gacha_splash?: {
        id: number
        type: 'gacha_splash'
        url: string
    }
}

export default CharacterInterface