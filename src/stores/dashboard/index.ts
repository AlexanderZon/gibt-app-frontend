import { defineStore } from "pinia"
import Http from "@/packages/http"
import { CharAscensionMaterialModel } from "@/classes/models/Account/Dashboard/CharAscensionMaterial"
import { WeapAscensionMaterialModel } from "@/classes/models/Account/Dashboard/WeapAscensionMaterial"
import { AscensionMaterialGroupModel } from "@/classes/models/Account/Dashboard/AscensionMaterialGroup"

const base = `account/dashboard`

type DashboardResponseData = {
    boss_materials: CharAscensionMaterialModel[]
    char_common_items: CharAscensionMaterialModel[]
    char_elemental_stones: CharAscensionMaterialModel[]
    char_jewels: CharAscensionMaterialModel[]
    char_local_materials: CharAscensionMaterialModel[]
    talent_books: CharAscensionMaterialModel[]
    weap_common_items: WeapAscensionMaterialModel[]
    weap_primary_materials: WeapAscensionMaterialModel[]
    weap_secondary_materials: WeapAscensionMaterialModel[]
}

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        boss_materials: [] as CharAscensionMaterialModel[],
        char_common_items: [] as CharAscensionMaterialModel[],
        char_elemental_stones: [] as CharAscensionMaterialModel[],
        char_jewels: [] as CharAscensionMaterialModel[],
        char_local_materials: [] as CharAscensionMaterialModel[],
        talent_books: [] as CharAscensionMaterialModel[],
        weap_common_items: [] as WeapAscensionMaterialModel[],
        weap_primary_materials: [] as WeapAscensionMaterialModel[],
        weap_secondary_materials: [] as WeapAscensionMaterialModel[],

        talent_book_groups: [] as AscensionMaterialGroupModel[]
    }),
    actions: {
        async get() {
            const response = await Http.get(`${base}`)
            const data: DashboardResponseData = response.data as DashboardResponseData
            this.reset()
            data.boss_materials.forEach(boss_material => {
                this.boss_materials.push(new CharAscensionMaterialModel(boss_material))
            })
            data.char_common_items.forEach(char_common_item => {
                this.char_common_items.push(new CharAscensionMaterialModel(char_common_item))
            })
            data.char_elemental_stones.forEach(char_elemental_stone => {
                this.char_elemental_stones.push(new CharAscensionMaterialModel(char_elemental_stone))
            })
            data.char_jewels.forEach(char_jewel => {
                this.char_jewels.push(new CharAscensionMaterialModel(char_jewel))
            })
            data.char_local_materials.forEach(char_local_material => {
                this.char_local_materials.push(new CharAscensionMaterialModel(char_local_material))
            })
            data.talent_books.forEach(talent_book => {
                this.talent_books.push(new CharAscensionMaterialModel(talent_book))
                if (this.talent_book_groups.some(talent_book_group => talent_book_group.ascension_material_id == talent_book.ascension_material_id)) {
                    let index = this.talent_book_groups.findIndex(talent_book_group => talent_book_group.ascension_material_id == talent_book.ascension_material_id)
                    if (index >= 0) {
                        this.talent_book_groups[index].add(talent_book)
                    }
                } else {
                    this.talent_book_groups.push(new AscensionMaterialGroupModel(talent_book))
                }
            })
            data.weap_common_items.forEach(weap_common_item => {
                this.weap_common_items.push(new WeapAscensionMaterialModel(weap_common_item))
            })
            data.weap_primary_materials.forEach(weap_primary_material => {
                this.weap_primary_materials.push(new WeapAscensionMaterialModel(weap_primary_material))
            })
            data.weap_secondary_materials.forEach(weap_secondary_material => {
                this.weap_secondary_materials.push(new WeapAscensionMaterialModel(weap_secondary_material))
            })
        },
        reset() {
            this.boss_materials = []
            this.char_common_items = []
            this.char_elemental_stones = []
            this.char_jewels = []
            this.char_local_materials = []
            this.talent_books = []
            this.weap_common_items = []
            this.weap_primary_materials = []
            this.weap_secondary_materials = []

            this.talent_book_groups = []
        }
    },
})