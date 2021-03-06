import React from 'react';
import Editor from "./modules/editor/editor.component";

class AppComponent extends React.Component {
    render() {
        return (
            <div className="App max-w-xl container mx-auto bg-white h-full">
                <Editor></Editor>
            </div>
        )
    }
}

export default AppComponent
