import LessonBlockEntity from "./LessonBlock.entity";

export default class VideoEntity extends LessonBlockEntity{
    public video_url: string = "https://www.youtube.com/embed/";
    public video_description: string = "";
}
