import LessonBlockEntity from "./LessonBlock.entity";
import {UploadFile} from "antd/es/upload/interface";

export default class PostEntity extends LessonBlockEntity{
    public post_name: string = "";
    public post_description: string = "";
    public post_image: UploadFile[] = [];
}
