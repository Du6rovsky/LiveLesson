import LessonBlockEntity from "./LessonBlock.entity";

export default class AudioEntity extends LessonBlockEntity{
    public audio_description: string = "";
    public audio_file: Blob = new Blob();
}
