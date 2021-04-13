import React, {Component} from "react";
import HeaderComponent from "./components/header/header.component";
import DescriptionComponent from "./components/description/description.component";
import VideoComponent from "./components/video/video.component";
import CarouselComponent from './components/carousel/carousel.component';
import AudioComponent from "./components/audio/audio.component";
import PostComponent from "./components/post/post.component";
import LessonEntity from "../../core/entities/Lesson.entity";
import {Button, Divider, Dropdown, Empty, Menu, Tooltip} from 'antd';
import {EditOutlined, PlusCircleOutlined, SaveOutlined} from "@ant-design/icons";
import FileComponent from "./components/file/file.component";
import HeaderEntity from "../../core/entities/Header.entity";
import DescriptionEntity from "../../core/entities/Description.entity";
import CarouselEntity from "../../core/entities/Carousel.entity";
import VideoEntity from "../../core/entities/Video.entity";
import PostEntity from "../../core/entities/Post.entity";
import FileEntity from "../../core/entities/File.entity";
import {lessonService} from "../../shared/services/lesson.service";
import localForage from 'localforage';

class EditorComponent extends Component {
    state: LessonEntity = new LessonEntity();

    componentDidMount() {
        localForage.getItem('lesson').then((data) => {
            if (data) {
                this.setState(data as LessonEntity);
            }
        });

        this.getLesson()
    }

    public callbackHandler(item: any, index: number) {
        const items_list = [...this.state.items];
        items_list[index] = item;
        this.setState({items: [...items_list]});
    }

    public addNewBlock(type: string, blockIdx: number) {
        let block;

        switch (type) {
            case 'header':
                block = new HeaderEntity(type);
                break
            case 'description':
                block = new DescriptionEntity(type);
                break
            case 'carousel':
                block = new CarouselEntity(type);
                break
            case 'video':
                block = new VideoEntity(type);
                break
            case 'audio':
                block = new FileEntity(type);
                break
            case 'post':
                block = new PostEntity(type);
                break
            case 'file':
                block = new FileEntity(type);
                break
        }

        if (blockIdx >= 0) {
            this.state.items.splice(blockIdx + 1, 0, block)
        } else {
            this.state.items.push(block);
        }

        this.setState({
            items: [...this.state.items]
        });
    }

    public controlAction(action: string, idx: number) {
        const items = this.state.items;

        switch (action) {
            case 'up':
                if (items.length > 1 && idx !== 0) {
                    [items[idx - 1], items [idx]] = [items[idx], items [idx - 1]]
                }
                break
            case 'down':
                if (items.length > 1 && ((idx + 1) !== items.length)) {
                    [items[idx], items [idx + 1]] = [items[idx + 1], items [idx]]
                }
                break
            case 'remove':
                items.splice(idx, 1);
                break
        }

        this.setState({
            items: [...items]
        });
    }

    public getLesson() {
        // Lesson get API request mockup
        if (this.state.id) {
            lessonService.getLesson(this.state.id).then((res: any) => {
                // Lesson is updated
                if (res && res.data) {
                    this.setState(res.data);
                }
            })
        }
    }

    public updateLesson() {
        localForage.setItem('lesson', this.state).then();

        // Lesson update API request mockup
        if (this.state.id) {
            lessonService.updateLesson(this.state.id, this.state).then((res: any) => {
                // Lesson is updated
            })
        }
    }

    public createLesson() {
        localForage.setItem('lesson', this.state).then();

        if (false) { // False for mockup
            // Lesson Create API request mockup
            lessonService.createLesson(this.state).then((res: any) => {
                // Lesson is created
                this.setState({id: res.data.id})
            })
        }
    }

    public switchLessonMode() {
        this.setState({isEdit: this.state.isEdit = !this.state.isEdit});
        this.updateLesson(); // This line bcs API is mockup

        if (this.state.id) {
            this.updateLesson();
        } else if (false) { // False for mockup
            this.createLesson();
        }
    }

    render() {
        const menu_items = ['header', 'description', 'video', 'carousel', 'audio', 'post', 'file'];
        const menu = (blockIdx: number) => <Menu>
            {menu_items.map((item, idx) => {
                return <Menu.Item key={idx} onClick={() => this.addNewBlock(item, blockIdx)}>
                    {String(item).toUpperCase()}
                </Menu.Item>
            })}
        </Menu>

        const divider = (blockIdx: number) => <Divider>
            {this.state.isEdit && <Dropdown overlay={menu(blockIdx)}>
                <Button type="text" shape="circle">
                    <PlusCircleOutlined/>
                </Button>
            </Dropdown>}
        </Divider>

        return (
            <div className="editor relative p-1 bg-white">
                <div className="flex justify-end">
                    <Tooltip title={!this.state.isEdit ? 'Edit lesson' : 'Save lesson'} className="float-right">
                        <Button type="text" onClick={() => {
                            this.switchLessonMode()
                        }} icon={!this.state.isEdit ? <EditOutlined/> : <SaveOutlined/>}>
                        </Button>
                    </Tooltip>
                </div>
                {this.state.isEdit && this.state.items?.length === 0 &&
                <span key={'1st-divider'}> {divider(-1)} </span>
                }
                {this.state.items?.map((item, idx) => {
                    if (item.type === 'header') {
                        return (
                            <div key={'block-container-' + item.id}>
                                <HeaderComponent
                                    index={idx}
                                    key={'header-' + item.id}
                                    item={item}
                                    isEdit={this.state.isEdit}
                                    cb={(item: any) => this.callbackHandler(item, idx)}
                                    controlCb={(action: string) => this.controlAction(action, idx)}/>
                                <span key={'divider-before-' + item.id}>
                                    {divider(idx)}
                                </span>
                            </div>
                        )
                    } else if (item.type === 'description') {
                        return (
                            <div key={'block-container-' + item.id}>
                                <DescriptionComponent
                                    index={idx}
                                    key={'description-' + item.id}
                                    item={item}
                                    isEdit={this.state.isEdit}
                                    cb={(item: any) => this.callbackHandler(item, idx)}
                                    controlCb={(action: string) => this.controlAction(action, idx)}/>
                                <span key={'divider-before-' + item.id}>
                                    {divider(idx)}
                                </span>
                            </div>
                        )
                    } else if (item.type === 'video') {
                        return (
                            <div key={'block-container-' + item.id}>
                                <VideoComponent
                                    index={idx}
                                    key={'video-' + item.id}
                                    item={item}
                                    isEdit={this.state.isEdit}
                                    cb={(item: any) => this.callbackHandler(item, idx)}
                                    controlCb={(action: string) => this.controlAction(action, idx)}/>
                                <span key={'divider-before-' + item.id}>
                                    {divider(idx)}
                                </span>
                            </div>)
                    } else if (item.type === 'carousel') {
                        return (
                            <div key={'block-container-' + item.id}>
                                <CarouselComponent
                                    index={idx}
                                    key={'carousel-' + item.id}
                                    item={item}
                                    isEdit={this.state.isEdit}
                                    cb={(item: any) => this.callbackHandler(item, idx)}
                                    controlCb={(action: string) => this.controlAction(action, idx)}/>
                                <span key={'divider-before-' + item.id}>
                                    {divider(idx)}
                                </span>
                            </div>)
                    } else if (item.type === 'audio') {
                        return (
                            <div key={'block-container-' + item.id}>
                                <AudioComponent
                                    index={idx}
                                    key={'audio-' + item.id}
                                    item={item}
                                    isEdit={this.state.isEdit}
                                    cb={(item: any) => this.callbackHandler(item, idx)}
                                    controlCb={(action: string) => this.controlAction(action, idx)}/>
                                <span key={'divider-before-' + item.id}>
                                    {divider(idx)}
                                </span>
                            </div>)
                    } else if (item.type === 'post') {
                        return (
                            <div key={'block-container-' + item.id}>
                                <PostComponent
                                    index={idx}
                                    key={'post-' + item.id}
                                    item={item}
                                    isEdit={this.state.isEdit}
                                    cb={(item: any) => this.callbackHandler(item, idx)}
                                    controlCb={(action: string) => this.controlAction(action, idx)}/>
                                <span key={'divider-before-' + item.id}>
                                    {divider(idx)}
                                </span>
                            </div>)
                    } else if (item.type === 'file') {
                        return (
                            <div key={'block-container-' + item.id}>
                                <FileComponent
                                    index={idx}
                                    key={'file-' + item.id}
                                    item={item}
                                    isEdit={this.state.isEdit}
                                    cb={(item: any) => this.callbackHandler(item, idx)}
                                    controlCb={(action: string) => this.controlAction(action, idx)}/>
                                <span key={'divider-before-' + item.id}>
                                    {divider(idx)}
                                </span>
                            </div>)
                    }
                })}
            </div>
        )
    }
}

export default EditorComponent
