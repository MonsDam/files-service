// Función para combinar los chunks una vez subidos todos
const combineChunks = async (fileName, totalChunks, finalFilePath) => {
    const writeStream = fs.createWriteStream(finalFilePath);

    for (let i = 0; i < totalChunks; i++) {
        const chunkPath = path.join(__dirname, 'uploads', `${fileName}_chunk_${i}`);
        const chunk = await fs.promises.readFile(chunkPath);
        writeStream.write(chunk);
        await fs.promises.unlink(chunkPath); // Eliminar el chunk después de combinarlo
    }

    writeStream.end();
};

module.exports = combineChunks;