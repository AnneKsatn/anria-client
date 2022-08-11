export class User {
    constructor(
        public department: string,
        public email: string,
        public name: string,
        public number: number,
        public password: string,
        public patronymic: string,
        public phone: string,
        public position: string,
        public region: string,
        public surname: string,
    ) { }
}