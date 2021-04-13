import React, {ChangeEvent} from "react";
import {Input} from "antd";
import ControlsComponent from "../../../../shared/controls/controls.component";
import VideoEntity from "../../../../core/entities/Video.entity";

type Props = {
    index: number,
    item: VideoEntity,
    isEdit: boolean,
    cb: Function,
    controlCb: Function
}

class VideoComponent extends React.Component<Props, {}> {
    public changeItem(e: ChangeEvent<HTMLInputElement>) {
        this.props.item[e.target.name as keyof VideoEntity] = e.target.value;
        this.props.cb(this.props.item)
    }

    public controls(action: string) {
        this.props.controlCb();
    }

    render() {
        return (
            <div className="video">
                {this.props.isEdit && <ControlsComponent cb={this.props.controlCb}/>}
                {!this.props.isEdit &&
                <iframe width="100%" height="345" allowFullScreen src={this.props.item.video_url}/>}
                {!this.props.isEdit && <p>{this.props.item.video_description}</p>}
                {this.props.isEdit &&
                <Input placeholder="Url"
                       name="video_url"
                       className="mb-2"
                       defaultValue={this.props.item.video_url}
                       onChange={(e) => this.changeItem(e)}
                />}
                {this.props.isEdit &&
                <Input placeholder="Video description"
                       name="video_description"
                       defaultValue={this.props.item.video_description}
                       onChange={(e) => this.changeItem(e)}
                />}
            </div>
        )
    }
}

export default VideoComponent
