import React from "react";
import ControlsComponent from "../../../../shared/controls/controls.component";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import FileEntity from "../../../../core/entities/File.entity";
import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

type Props = {
    index: number,
    item: FileEntity
    isEdit: boolean,
    cb: Function,
    controlCb: Function
}

class AudioComponent extends React.Component<Props, {}> {
    public changeItem(e: any) {
        this.props.item['file_source'] = e.fileList;
        this.props.cb(this.props.item)
    }

    render() {
        return (
            <div className="audio">
                {this.props.isEdit && <ControlsComponent cb={this.props.controlCb}/>}
                {!this.props.isEdit && !this.props.item.file_source && <p> Empty audio file </p>}
                {(!this.props.isEdit && this.props.item.file_source?.length > 0) &&
                <p className="text-2xl mb-2">{this.props.item.file_source[0].name} </p>
                }
                {!this.props.isEdit && this.props.item.file_source?.length > 0 &&
                <AudioPlayer
                    src={URL.createObjectURL(this.props.item.file_source[0].originFileObj)}
                />}
                {this.props.isEdit &&
                <Upload
                    listType="picture"
                    beforeUpload={() => false}
                    maxCount={1}
                    fileList={this.props.item.file_source}
                    onChange={(e) => this.changeItem(e)}>
                    <Button icon={<UploadOutlined/>}>Audio file upload</Button>
                </Upload>}
            </div>
        )
    }
}

export default AudioComponent
