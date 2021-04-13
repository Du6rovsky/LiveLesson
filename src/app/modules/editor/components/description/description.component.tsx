import React, {ChangeEvent} from "react";
import {Input} from "antd";
import ControlsComponent from "../../../../shared/controls/controls.component";
import DescriptionEntity from "../../../../core/entities/Description.entity";

const {TextArea} = Input;

type Props = {
    index: number,
    item: DescriptionEntity,
    isEdit: boolean,
    cb: Function,
    controlCb: Function
}

class DescriptionComponent extends React.Component<Props, {}> {
    public changeItem(e: ChangeEvent<HTMLTextAreaElement>) {
        this.props.item[e.target.name as keyof DescriptionEntity] = e.target.value;
        this.props.cb(this.props.item)
    }

    render() {
        return (
            <div className="description">
                {this.props.isEdit && <ControlsComponent cb={this.props.controlCb}/>}
                {(!this.props.isEdit && this.props.item.description) &&
                <p>{this.props.item.description}</p>
                }
                {(!this.props.isEdit && !this.props.item.description) &&
                <p>Empty lesson description</p>
                }
                {this.props.isEdit &&
                <TextArea
                    name="description"
                    rows={4}
                    defaultValue={this.props.item.description}
                    placeholder="Lesson description"
                    onChange={(e) => this.changeItem(e)}/>
                }
            </div>
        )
    }
}

export default DescriptionComponent
