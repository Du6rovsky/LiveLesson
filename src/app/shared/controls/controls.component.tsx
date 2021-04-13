import React from "react";
import {Button, Popconfirm, Tooltip} from "antd";
import {DeleteOutlined, DownOutlined, UpOutlined} from "@ant-design/icons";

type Props = {
    cb: Function
}

class ControlsComponent extends React.Component<Props, {}> {
    render() {
        return (
            <div className="controls flex justify-end h-7">
                <Tooltip title="Upward">
                    <Button type="text" icon={<UpOutlined/>} size={'small'} onClick={() => this.props.cb('up')}/>
                </Tooltip>
                <Tooltip title="Downward">
                    <Button type="text" icon={<DownOutlined/>} size={'small'} onClick={() => this.props.cb('down')}/>
                </Tooltip>
                <Tooltip title="Remove">
                    <Popconfirm title="Are you sure want to remove block？"
                                okText="Yes" cancelText="No"
                                onConfirm={() => this.props.cb('remove')}>
                        <Button type="text" icon={<DeleteOutlined/>} size={'small'}/>
                    </Popconfirm>
                </Tooltip>
            </div>
        )
    }
}

export default ControlsComponent
