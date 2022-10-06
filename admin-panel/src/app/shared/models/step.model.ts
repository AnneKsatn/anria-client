export class Step {
    constructor(
        public checklist: Array<Map<any, any>>,
        public title: string,
        public description: string,
        public file: string
    ) { }
}