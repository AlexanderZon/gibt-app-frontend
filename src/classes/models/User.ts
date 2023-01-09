class User {
    id: number
    name: string
    email: string
    password: string
    constructor(data: any = {}) {
        this.fill(data)
    }
    fill(data: any = {}) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
    }
}

export default User