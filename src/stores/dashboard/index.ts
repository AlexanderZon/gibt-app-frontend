import { defineStore } from "pinia"
import Http from "@/packages/http"
import { CharAscensionMaterialModel } from "@/classes/models/Account/Dashboard/CharAscensionMaterial"
import { WeapAscensionMaterialModel } from "@/classes/models/Account/Dashboard/WeapAscensionMaterial"
import { AscensionMaterialGroupModel } from "@/classes/models/Account/Dashboard/AscensionMaterialGroup"
import { TalentAscensionMaterialModel } from "@/classes/models/Account/Dashboard/TalentAscensionMaterial"

const base = `account/dashboard`

type DashboardResponseData = {
    boss_materials: CharAscensionMaterialModel[]
    char_common_items: CharAscensionMaterialModel[]
    char_elemental_stones: CharAscensionMaterialModel[]
    char_jewels: CharAscensionMaterialModel[]
    char_local_materials: CharAscensionMaterialModel[]
    talent_books: TalentAscensionMaterialModel[]
    talent_common_items: TalentAscensionMaterialModel[]
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
        talent_books: [] as TalentAscensionMaterialModel[],
        talent_common_items: [] as TalentAscensionMaterialModel[],
        weap_common_items: [] as WeapAscensionMaterialModel[],
        weap_primary_materials: [] as WeapAscensionMaterialModel[],
        weap_secondary_materials: [] as WeapAscensionMaterialModel[],

        talent_book_groups: [] as AscensionMaterialGroupModel[],
        weap_primary_material_groups: [] as AscensionMaterialGroupModel[],
        char_elemental_stone_groups: [] as AscensionMaterialGroupModel[],
        char_jewel_groups: [] as AscensionMaterialGroupModel[],
        char_local_material_groups: [] as AscensionMaterialGroupModel[],
        boss_material_groups: [] as AscensionMaterialGroupModel[],
        common_material_groups: [] as AscensionMaterialGroupModel[],
        weap_secondary_material_groups: [] as AscensionMaterialGroupModel[],
    }),
    actions: {
        async get() {
            const response = await Http.get(`${base}`)
            const data: DashboardResponseData = response.data as DashboardResponseData
            this.reset()

            // Boss Material
            data.boss_materials.forEach(boss_material => {
                boss_material = new CharAscensionMaterialModel(boss_material)
                this.boss_materials.push(boss_material)
                if (this.boss_material_groups.some(boss_material_group => boss_material_group.ascension_material_id == boss_material.ascension_material_id)) {
                    let index = this.boss_material_groups.findIndex(boss_material_group => boss_material_group.ascension_material_id == boss_material.ascension_material_id)
                    if (index >= 0) {
                        this.boss_material_groups[index].add(boss_material)
                    }
                } else {
                    this.boss_material_groups.push(new AscensionMaterialGroupModel(boss_material))
                }
            })

            // Common Items
            data.char_common_items.forEach(char_common_item => {
                char_common_item = new CharAscensionMaterialModel(char_common_item)
                this.char_common_items.push(char_common_item)
                if (this.common_material_groups.some(common_material_group => common_material_group.ascension_material_id == char_common_item.ascension_material_id)) {
                    let index = this.common_material_groups.findIndex(common_material_group => common_material_group.ascension_material_id == char_common_item.ascension_material_id)
                    if (index >= 0) {
                        this.common_material_groups[index].add(char_common_item)
                    }
                } else {
                    this.common_material_groups.push(new AscensionMaterialGroupModel(char_common_item))
                }
            })

            // Elemental Stones
            data.char_elemental_stones.forEach(char_elemental_stone => {
                char_elemental_stone = new CharAscensionMaterialModel(char_elemental_stone)
                this.char_elemental_stones.push(char_elemental_stone)
                if (this.char_elemental_stone_groups.some(char_elemental_stone_group => char_elemental_stone_group.ascension_material_id == char_elemental_stone.ascension_material_id)) {
                    let index = this.char_elemental_stone_groups.findIndex(char_elemental_stone_group => char_elemental_stone_group.ascension_material_id == char_elemental_stone.ascension_material_id)
                    if (index >= 0) {
                        this.char_elemental_stone_groups[index].add(char_elemental_stone)
                    }
                } else {
                    this.char_elemental_stone_groups.push(new AscensionMaterialGroupModel(char_elemental_stone))
                }
            })

            // Jewels
            data.char_jewels.forEach(char_jewel => {
                char_jewel = new CharAscensionMaterialModel(char_jewel)
                this.char_jewels.push(char_jewel)
                if (this.char_jewel_groups.some(char_jewel_group => char_jewel_group.ascension_material_id == char_jewel.ascension_material_id)) {
                    let index = this.char_jewel_groups.findIndex(char_jewel_group => char_jewel_group.ascension_material_id == char_jewel.ascension_material_id)
                    if (index >= 0) {
                        this.char_jewel_groups[index].add(char_jewel)
                    }
                } else {
                    this.char_jewel_groups.push(new AscensionMaterialGroupModel(char_jewel))
                }
            })
            data.char_local_materials.forEach(char_local_material => {
                char_local_material = new CharAscensionMaterialModel(char_local_material)
                this.char_local_materials.push(char_local_material)
                if (this.char_local_material_groups.some(char_local_material_group => char_local_material_group.ascension_material_id == char_local_material.ascension_material_id)) {
                    let index = this.char_local_material_groups.findIndex(char_local_material_group => char_local_material_group.ascension_material_id == char_local_material.ascension_material_id)
                    if (index >= 0) {
                        this.char_local_material_groups[index].add(char_local_material)
                    }
                } else {
                    this.char_local_material_groups.push(new AscensionMaterialGroupModel(char_local_material))
                }
            })

            // Talent Books
            data.talent_books.forEach(talent_book => {
                talent_book = new TalentAscensionMaterialModel(talent_book)
                this.talent_books.push(talent_book)
                if (this.talent_book_groups.some(talent_book_group => talent_book_group.ascension_material_id == talent_book.ascension_material_id)) {
                    let index = this.talent_book_groups.findIndex(talent_book_group => talent_book_group.ascension_material_id == talent_book.ascension_material_id)
                    if (index >= 0) {
                        this.talent_book_groups[index].add(talent_book)
                    }
                } else {
                    this.talent_book_groups.push(new AscensionMaterialGroupModel(talent_book))
                }
            })

            // Talent Common Items 
            data.talent_common_items.forEach(talent_common_item => {
                talent_common_item = new TalentAscensionMaterialModel(talent_common_item)
                this.talent_common_items.push(talent_common_item)
                if (this.common_material_groups.some(common_material_group => common_material_group.ascension_material_id == talent_common_item.ascension_material_id)) {
                    let index = this.common_material_groups.findIndex(common_material_group => common_material_group.ascension_material_id == talent_common_item.ascension_material_id)
                    if (index >= 0) {
                        this.common_material_groups[index].add(talent_common_item)
                    }
                } else {
                    this.common_material_groups.push(new AscensionMaterialGroupModel(talent_common_item))
                }
            })

            // Weapon Common Items
            data.weap_common_items.forEach(weap_common_item => {
                weap_common_item = new WeapAscensionMaterialModel(weap_common_item)
                this.weap_common_items.push(weap_common_item)
                if (this.common_material_groups.some(common_material_group => common_material_group.ascension_material_id == weap_common_item.ascension_material_id)) {
                    let index = this.common_material_groups.findIndex(common_material_group => common_material_group.ascension_material_id == weap_common_item.ascension_material_id)
                    if (index >= 0) {
                        this.common_material_groups[index].add(weap_common_item)
                    }
                } else {
                    this.common_material_groups.push(new AscensionMaterialGroupModel(weap_common_item))
                }
            })

            // Weapon Primary Material
            data.weap_primary_materials.forEach(weap_primary_material => {
                weap_primary_material = new WeapAscensionMaterialModel(weap_primary_material)
                this.weap_primary_materials.push(weap_primary_material)
                if (this.weap_primary_material_groups.some(weap_primary_material_group => weap_primary_material_group.ascension_material_id == weap_primary_material.ascension_material_id)) {
                    let index = this.weap_primary_material_groups.findIndex(weap_primary_material_group => weap_primary_material_group.ascension_material_id == weap_primary_material.ascension_material_id)
                    if (index >= 0) {
                        this.weap_primary_material_groups[index].add(weap_primary_material)
                    }
                } else {
                    this.weap_primary_material_groups.push(new AscensionMaterialGroupModel(weap_primary_material))
                }
            })

            // Weapon Secondary Material
            data.weap_secondary_materials.forEach(weap_secondary_material => {
                weap_secondary_material = new WeapAscensionMaterialModel(weap_secondary_material)
                this.weap_secondary_materials.push(weap_secondary_material)
                if (this.weap_secondary_material_groups.some(weap_secondary_material_group => weap_secondary_material_group.ascension_material_id == weap_secondary_material.ascension_material_id)) {
                    let index = this.weap_secondary_material_groups.findIndex(weap_secondary_material_group => weap_secondary_material_group.ascension_material_id == weap_secondary_material.ascension_material_id)
                    if (index >= 0) {
                        this.weap_secondary_material_groups[index].add(weap_secondary_material)
                    }
                } else {
                    this.weap_secondary_material_groups.push(new AscensionMaterialGroupModel(weap_secondary_material))
                }
            })
        },
        reset() {
            this.boss_materials = []
            this.char_common_items = []
            this.char_elemental_stones = []
            this.char_jewels = []
            this.char_local_materials = []
            this.talent_books = []
            this.talent_common_items = []
            this.weap_common_items = []
            this.weap_primary_materials = []
            this.weap_secondary_materials = []

            this.talent_book_groups = []
            this.weap_primary_material_groups = []
            this.char_elemental_stone_groups = []
            this.char_jewel_groups = []
            this.char_local_material_groups = []
            this.boss_material_groups = []
            this.common_material_groups = []
            this.weap_secondary_material_groups = []
        }
    },
})