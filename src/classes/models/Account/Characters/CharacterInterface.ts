import CharacterInterface from "../../Characters/CharacterInterface"
import ModelInterface from "../../ModelInterface"
import AccountWeaponInterface from "../Weapon/WeaponInterface"

interface AccountCharacterInterface extends ModelInterface {
    account_id?: number
    // account: object
    character_id?: number
    character?: CharacterInterface | null
    account_weapon_id?: number
    account_weapon?: AccountWeaponInterface | null
    level?: string
    constellation_level?: number
    basic_talent_level?: number
    elemental_talent_level?: number
    burst_talent_level?: number
    friendship_level?: number
    artf_flower_id?: number
    artf_flower_level?: number
    artf_plume_id?: number
    artf_plume_level?: number
    artf_sands_id?: number
    artf_sands_level?: number
    artf_goblet_id?: number
    artf_goblet_level?: number
    artf_circlet_id?: number
    artf_circlet_level?: number
    is_building?: boolean
}

export default AccountCharacterInterface