import React, {ChangeEvent} from "react";
import {Input, Typography} from "antd";
import ControlsComponent from "../../../../shared/controls/controls.component";
import HeaderEntity from "../../../../core/entities/Header.entity";

const {Title} = Typography;

type Props = {
    index: number,
    item: HeaderEntity,
    isEdit: boolean,
    cb: Function,
    controlCb: Function
}

class HeaderComponent extends React.Component<Props, {}> {
    public changeItem(e: ChangeEvent<HTMLInputElement>) {
        this.props.item[e.target.name as keyof HeaderEntity] = e.target.value;
        this.props.cb(this.props.item)
    }

    render() {
        return (
            <div className="header">
                {this.props.isEdit && <ControlsComponent cb={this.props.controlCb}/>}
                {(!this.props.isEdit && this.props.item.header) &&
                <Title> {this.props.item.header} </Title>
                }
                {(!this.props.isEdit && !this.props.item.header) &&
                <Title> Empty lesson header </Title>
                }
                {this.props.isEdit &&
                <Input placeholder="Lesson header"
                       name='header'
                       defaultValue={this.props.item.header}
                       onChange={(e) => this.changeItem(e)}
                />}
            </div>
        )
    }
}

export default HeaderComponent
