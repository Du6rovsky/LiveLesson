import LessonBlockEntity from "./LessonBlock.entity";
import {UploadFile} from "antd/es/upload/interface";

export default class CarouselEntity extends LessonBlockEntity{
    public images: UploadFile[] = [];
}
