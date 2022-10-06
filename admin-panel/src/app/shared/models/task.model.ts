export class Task {
    constructor(
        public status: string,
        public steps: Array<string>,
        public title: string,
        public organization_id: string
    ) { }
}