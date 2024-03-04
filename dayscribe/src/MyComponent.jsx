import React, { useState, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

function MyComponent() {
    const [quill, setQuill] = useState(null);

    useEffect(() => {
        if (!quill) {
            const editor = new Quill('#editor', {
                theme: 'snow',
                modules: {
                    toolbar: true,
                },
            });
            setQuill(editor);
        }
    }, [quill]);

    return (
        <div id="editor"></div>
    );
}

export default MyComponent;
