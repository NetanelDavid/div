import { Role } from "../enums/role.enum";

export class User {
    _id?: string;
    id: string;
    token?: String;
    role: Role;
    business_name: String;
    first_name: String;
    last_name: String;
    email: String;
    password?: String;
    password_confirmation?: String;
    tel: string;
    logo: string;
    auth_amail: boolean;

    static defaultLogo = 'https://firebasestorage.googleapis.com/v0/b/crm-files-47869.appspot.com/o/admin%2Flogodefault%2Funlogo.png?alt=media';
    static getPathLogo = (id: string, typeFile: string) => `users/${id}/logo/${typeFile}`

    constructor(role?: Role) {

        this.id = ''
        this.role = role || 0;
        this.business_name = '';
        this.first_name = '';
        this.last_name = '';
        this.email = '';
        this.password = '';
        this.password_confirmation = '';
        this.tel = '';
        this.logo = User.defaultLogo;
    }
}