import React from "react";
import {Button, Carousel, Upload} from "antd";
import ControlsComponent from "../../../../shared/controls/controls.component";
import CarouselEntity from "../../../../core/entities/Carousel.entity";
import {UploadOutlined} from "@ant-design/icons";
import {UploadFile} from "antd/es/upload/interface";

type Props = {
    index: number,
    item: CarouselEntity,
    isEdit: boolean,
    cb: Function,
    controlCb: Function
}

class CarouselComponent extends React.Component<Props, {}> {
    public changeItem(e: any) {
        this.props.item.images = e.fileList;
        this.props.cb(this.props.item)
    }

    render() {
        return (
            <div className="carousel">
                {this.props.isEdit && <ControlsComponent cb={this.props.controlCb}/>}
                {!this.props.isEdit && this.props.item.images?.length === 0 && <p>Empty carousel</p>}
                {!this.props.isEdit && this.props.item.images?.length > 0 &&
                <Carousel>
                    {this.props.item.images.map((i: UploadFile, index) => {
                        return (
                            <div key={'img-container-' + i.uid} className="h-400 w-full bg-black">
                                <img key={'img-' + i.uid} className="w-full h-full object-contain"
                                     src={URL.createObjectURL(i.originFileObj)}/>
                            </div>
                        )
                    })}
                </Carousel>
                }
                {this.props.isEdit &&
                <Upload
                    listType="picture"
                    beforeUpload={() => false}
                    fileList={this.props.item.images}
                    onChange={(e) => this.changeItem(e)}>
                    <Button icon={<UploadOutlined/>}>Image upload</Button>
                </Upload>
                }
            </div>
        )
    }
}

export default CarouselComponent
