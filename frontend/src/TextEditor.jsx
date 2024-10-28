import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = forwardRef(({ onCodeToggle }, ref) => {
    const [value, setValue] = useState('');

    useImperativeHandle(ref, () => ({
        getValue: () => value,
        setValue: (val) => setValue(val),
    }));

    const handleChange = (value) => {
        setValue(value);
    };

    // Añadir un botón de código en la barra de herramientas
    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['link', 'image'],
                ['clean'],
                [{ 'code': 'code' }], // Botón para abrir el editor de código
            ],
            handlers: {
                'code': () => {
                    onCodeToggle(); // Llamar al método para abrir el editor de código
                },
            },
        },
    };

    return (
        <ReactQuill
            value={value}
            onChange={handleChange}
            modules={modules}
        />
    );
});

export default TextEditor;
