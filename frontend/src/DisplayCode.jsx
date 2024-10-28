import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayCode = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    const fetchCodeBlocks = async () => {
      try {
        const response = await axios.get('http://localhost:4000');
        setCodeBlocks(response.data);
      } catch (error) {
        console.error('Error al obtener los bloques de código:', error);
      }
    };
    fetchCodeBlocks();
  }, []);

  useEffect(() => {
    // Esta función ejecutará el código JavaScript de forma segura
    const executeJavaScript = (jsCode, containerId) => {
      try {
        // Crear una función que encapsule el código
        const safeFunction = new Function(`
          return function() {
            ${jsCode}
          }
        `)();
        
        // Ejecutar la función
        safeFunction();
      } catch (error) {
        console.error('Error al ejecutar JavaScript:', error);
      }
    };

    // Ejecutar el JavaScript para cada bloque de código
    codeBlocks.forEach((block, index) => {
      const containerId = `code-block-${index}`;
      // Usar un pequeño delay para asegurar que el HTML está renderizado
      setTimeout(() => {
        executeJavaScript(block.js, containerId);
      }, 100);
    });
  }, [codeBlocks]);

  return (
    <div>
      {codeBlocks.map((block, index) => {
        const containerId = `code-block-${index}`;
        return (
          <div key={index} id={containerId}>
            <div dangerouslySetInnerHTML={{ __html: block.html }} />
            <style>{block.css}</style>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayCode;