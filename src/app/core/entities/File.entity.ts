import LessonBlockEntity from "./LessonBlock.entity";
import {UploadFile} from "antd/es/upload/interface";

export default class FileEntity extends LessonBlockEntity{
    public file_description: string = "";
    public file_source: UploadFile[] = [];
}
