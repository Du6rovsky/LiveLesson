import {toolboxService} from '../../shared/services/Toolbox.service';

export default class LessonBlockEntity {
    public id: string = '';
    public type: string = ''; // 'header' , 'description', 'carousel', 'video', 'audio', 'post', 'file'

    constructor(type: string) {
        this.id = toolboxService.genNewId();
        this.type = type;
    }
}
