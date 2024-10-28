import React, { useRef } from 'react';
import axios from 'axios';
import TextEditor from './TextEditor';

const CodeInserter = ({ onCodeInserted }) => {
    const htmlRef = useRef();
    const cssRef = useRef();
    const jsRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const codeBlock = {
            html: htmlRef.current.getValue(),
            css: cssRef.current.getValue(),
            js: jsRef.current.getValue(),
        };

        try {
            await axios.post('http://localhost:4000/guardar', codeBlock);
            alert('Código guardado exitosamente');
            onCodeInserted(codeBlock);
            // Limpiar los editores después de guardar
            htmlRef.current.setValue('');
            cssRef.current.setValue('');
            jsRef.current.setValue('');
        } catch (error) {
            console.error('Error al guardar el código:', error);
            alert('Error al guardar el código. Verifica la consola para más detalles.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>HTML:</label>
                <TextEditor ref={htmlRef} />
            </div>
            <div>
                <label>CSS:</label>
                <TextEditor ref={cssRef} />
            </div>
            <div>
                <label>JavaScript:</label>
                <TextEditor ref={jsRef} />
            </div>
            <button type="submit">Guardar Código</button>
        </form>
    );
};

export default CodeInserter;
