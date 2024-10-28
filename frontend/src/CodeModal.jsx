import React, { useRef } from 'react';
import axios from 'axios';
import TextEditor from './TextEditor';

const CodeModal = ({ onClose, onCodeInserted }) => {
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
            onClose(); // Cerrar el modal después de guardar
        } catch (error) {
            console.error('Error al guardar el código:', error);
            alert('Error al guardar el código. Verifica la consola para más detalles.');
        }
    };

    return (
        <div className="modal">
            <h2>Inserta tu Código</h2>
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
                <button type="button" onClick={onClose}>Cerrar</button>
            </form>
        </div>
    );
};

export default CodeModal;
