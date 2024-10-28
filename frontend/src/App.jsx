import React, { useState, useRef } from 'react';
import CodeInserter from './CodeInserter';
import DisplayCode from './DisplayCode';
import TextEditor from './TextEditor';
import CodeModal from './CodeModal';

const App = () => {
    const [newCodeBlock, setNewCodeBlock] = useState(null);
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
    const editorRef = useRef();

    const handleCodeInserted = (codeBlock) => {
        setNewCodeBlock(codeBlock);

        // Inserta el código en el editor de texto
        const { html, css, js } = codeBlock;
        const formattedCode = `<style>${css}</style>\n${html}\n<script>${js}</script>`;
        const editorValue = editorRef.current.getValue();
        editorRef.current.setValue(`${editorValue}\n${formattedCode}`);
    };

    const toggleCodeModal = () => {
        setIsCodeModalOpen(!isCodeModalOpen);
    };

    return (
        <div className="app-container">
            <h1 className="text-2xl font-bold mb-4">Inserta tu Código</h1>

            {/* Editor de texto */}
            <TextEditor ref={editorRef} onCodeToggle={toggleCodeModal} />

            {/* Modal para insertar código */}
            {isCodeModalOpen && (
                <CodeModal onClose={toggleCodeModal} onCodeInserted={handleCodeInserted} />
            )}

            <h2 className="text-xl font-semibold mt-8">Código Guardado</h2>

            {/* Muestra el código guardado */}
            <DisplayCode newCodeBlock={newCodeBlock} />

            {/* Inserta el bloque de código en la aplicación */}
            <CodeInserter codeBlock={newCodeBlock} />
        </div>
    );
};

export default App;
