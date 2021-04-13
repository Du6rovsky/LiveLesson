export default class LessonEntity {
    public isEdit: boolean = false;
    public items: any[]
    public id: string = '';

    constructor() {
        this.items = [];
    }
}
