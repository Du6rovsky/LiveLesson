import React from "react";
import {Button, Input, Upload} from 'antd';
import {ArrowDownOutlined, UploadOutlined} from '@ant-design/icons';
import ControlsComponent from "../../../../shared/controls/controls.component";
import FileEntity from "../../../../core/entities/File.entity";
import {saveAs} from "file-saver";

type Props = {
    index: number,
    item: FileEntity,
    isEdit: boolean,
    cb: Function,
    controlCb: Function
}

class FileComponent extends React.Component<Props, {}> {
    public changeItem(e: any) {
        if (e?.target) {
            this.props.item[e.target.name as keyof FileEntity] = e.target.value;
        } else {
            this.props.item['file_source'] = e.fileList;
        }
        this.props.cb(this.props.item)
    }

    public saveFile() {
        saveAs(this.props.item.file_source[0].originFileObj, this.props.item.file_source[0].fileName);
    }

    render() {
        return (
            <div className="file">
                {this.props.isEdit && <ControlsComponent cb={this.props.controlCb}/>}
                {!this.props.isEdit && this.props.item.file_source?.length === 0 && <p> Empty file </p>}
                {(!this.props.isEdit && this.props.item.file_source?.length > 0) &&
                <a onClick={() => {
                    this.saveFile()
                }} className="text-sm flex items-center">
                    <ArrowDownOutlined/>
                    {this.props.item.file_source[0].name}
                </a>
                }
                {(!this.props.isEdit && this.props.item.file_description) &&
                <p className="text-sm"> {this.props.item.file_description} </p>
                }
                {(!this.props.isEdit && !this.props.item.file_description) &&
                <p className="text-sm"> Empty file description </p>
                }
                {this.props.isEdit &&
                <Upload
                    listType="picture"
                    beforeUpload={() => false}
                    maxCount={1}
                    fileList={this.props.item.file_source}
                    onChange={(e) => this.changeItem(e)}>
                    <Button icon={<UploadOutlined/>}>File upload</Button>
                </Upload>}
                {this.props.isEdit &&
                <Input name="file_description"
                       className="mt-2"
                       placeholder="File description"
                       defaultValue={this.props.item.file_description}
                       onChange={(e) => this.changeItem(e)}/>}
            </div>
        )
    }
}

export default FileComponent
