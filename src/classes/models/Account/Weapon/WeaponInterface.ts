import WeaponInterface from "../../Weapon/WeaponInterface"
import AccountInterface from "../AccountInterface"
import ModelInterface from "../../ModelInterface"

interface AccountWeaponInterface extends ModelInterface {
    account_id?: number
    account?: AccountInterface
    weapon_id?: number
    weapon?: WeaponInterface
    level?: string
    refinement_rank?: number
}

export default AccountWeaponInterface