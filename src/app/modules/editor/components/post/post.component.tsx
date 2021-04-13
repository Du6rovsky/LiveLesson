import React from "react";
import {Button, Input, Upload} from "antd";
import ControlsComponent from "../../../../shared/controls/controls.component";
import PostEntity from "../../../../core/entities/Post.entity";
import {UploadOutlined} from "@ant-design/icons";

type Props = {
    index: number,
    item: PostEntity,
    isEdit: boolean,
    cb: Function,
    controlCb: Function
}

class PostComponent extends React.Component<Props, {}> {
    public changeItem(e: any) {
        if (e?.target) {
            this.props.item[e.target.name as keyof PostEntity] = e.target.value;
        } else {
            this.props.item['post_image'] = e.fileList;
        }
        this.props.cb(this.props.item)
    }

    render() {
        return (
            <div className="post">
                {(!this.props.isEdit && this.props.item.post_image?.length > 0) &&
                <div key={'img-container-' + this.props.item.post_image[0].uid} className="h-400 w-full bg-black">
                    <img key={'img-' + this.props.item.post_image[0].uid} className="w-full h-full object-contain"
                         src={URL.createObjectURL(this.props.item.post_image[0].originFileObj)}/>
                </div>}
                {this.props.isEdit && <ControlsComponent cb={this.props.controlCb}/>}
                {(!this.props.isEdit && this.props.item.post_name) &&
                <p className="text-2xl">{this.props.item.post_name} </p>
                }
                {(!this.props.isEdit && !this.props.item.post_name) &&
                <p className="text-2xl"> Empty post name </p>
                }
                {(!this.props.isEdit && this.props.item.post_description) &&
                <p className="text-sm"> {this.props.item.post_description} </p>
                }
                {(!this.props.isEdit && !this.props.item.post_description) &&
                <p className="text-sm"> Empty post description </p>
                }
                {this.props.isEdit &&
                <Upload
                    listType="picture"
                    beforeUpload={() => false}
                    maxCount={1}
                    fileList={this.props.item.post_image}
                    onChange={(e) => this.changeItem(e)}>
                    <Button icon={<UploadOutlined/>}>Post image upload</Button>
                </Upload>}
                {this.props.isEdit &&
                <Input name="post_name"
                       placeholder="Post name"
                       className="mt-2 mb-2"
                       defaultValue={this.props.item.post_name}
                       onChange={(e) => this.changeItem(e)}/>}
                {this.props.isEdit &&
                <Input name="post_description"
                       placeholder="Post description"
                       defaultValue={this.props.item.post_description}
                       onChange={(e) => this.changeItem(e)}/>}
            </div>
        )
    }
}

export default PostComponent
