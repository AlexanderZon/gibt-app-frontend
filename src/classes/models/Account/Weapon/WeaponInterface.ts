import WeaponInterface from "../../Weapon/WeaponInterface"
import AccountInterface from "../AccountInterface"
import ModelInterface from "../../ModelInterface"
import AccountCharacterInterface from "../Characters/CharacterInterface"

interface AccountWeaponInterface extends ModelInterface {
    account_id?: number
    account?: AccountInterface | null
    account_character?: AccountCharacterInterface | null
    weapon_id?: number
    weapon?: WeaponInterface | null
    level?: string
    refinement_rank?: number
}

export default AccountWeaponInterface