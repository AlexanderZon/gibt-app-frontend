import ModelInterface from "@/classes/models/ModelInterface"

interface AccountInterface extends ModelInterface {
    user_id: number
    title: string
    game_server: string
}

export default AccountInterface