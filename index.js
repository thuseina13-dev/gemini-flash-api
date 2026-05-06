import { GoogleGenAI } from '@google/genai';
import 'dotenv/config'
import express from 'express';
import multer from 'multer';


const app = express();
const port = process.env.PORT || 3000;
const API_KEY = process.env.GOOGLE_GENAI_API_KEY;
const MODEL_NAME = process.env.GEMINI_MODEL;
const upload = multer();

// Middleware untuk parsing JSON
app.use(express.json());

// // Inisialisasi Google Generative AI
const genAI = new GoogleGenAI({
    apiKey: API_KEY
});
// const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// Route dasar untuk mengecek status server
app.get('/', (req, res) => {
    res.send('Gemini AI API Backend siap digunakan!');
});

app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body
    try {
        const response = await genAI.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        })

        console.log(response)
        res.status(200).json({ result: response.text })
    } catch (error) {
        console.log('e', error)
        res.status(500).json({ message: error.message })
    }
})

app.post('/generate-from-image', upload.single('image'), async (req, res) => {
    const { prompt } = req.body
    const base64Image = req.file.buffer.toString('base64')

    try {
        const response = await genAI.models.generateContent({
            model: MODEL_NAME,
            contents: [
                {text: prompt, type: 'text'},
                {inlineData: { data: base64Image, mimeType: req?.file?.mimetype}}
            ],
        })

        console.log(response)
        res.status(200).json({ result: response.text })
    } catch (error) {
        console.log('e', error)
        res.status(500).json({ message: error.message })
    }
})

app.post('/generate-from-pdf', upload.single('document'), async (req, res) => {
    const { prompt } = req.body
    const base64Document = req.file.buffer.toString('base64')

    try {
        const response = await genAI.models.generateContent({
            model: MODEL_NAME,
            contents: [
                {text: prompt, type: 'text'},
                {inlineData: { data: base64Document, mimeType: req?.file?.mimetype}}
            ],
        })

        console.log(response)
        res.status(200).json({ result: response.text })
    } catch (error) {
        console.log('e', error)
        res.status(500).json({ message: error.message })
    }
})

app.post('/generate-from-audio', upload.single('audio'), async (req, res) => {
    const { prompt } = req.body
    const base64Audio = req.file.buffer.toString('base64')

    try {
        const response = await genAI.models.generateContent({
            model: MODEL_NAME,
            contents: [
                {text: prompt, type: 'text'},
                {inlineData: { data: base64Audio, mimeType: req?.file?.mimetype}}
            ],
        })

        console.log(response)
        res.status(200).json({ result: response.text })
    } catch (error) {
        console.log('e', error)
        res.status(500).json({ message: error.message })
    }
})
// Menjalankan server
app.listen(port, async () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});