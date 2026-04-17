import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Schema for history
const analysisSchema = new mongoose.Schema({
    code: String,
    language: String,
    result: String,
    timestamp: { type: Date, default: Date.now }
});

const Analysis = mongoose.model('Analysis', analysisSchema);

// OpenAI setup
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Analyze endpoint
app.post('/analyze', async (req, res) => {
    const { code, language } = req.body;

    const prompt = `You are a senior software engineer.

Analyze the following code and respond in this EXACT format:
Error: [describe error in simple words]
Fix: [provide corrected code]
Explanation: [why error happened and how fix works]

Code:
\`\`\`${language}
${code}
\`\`\`

Language: ${language}`;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.1
        });

        const result = completion.choices[0].message.content;

        // Save to history
        const analysis = new Analysis({ code, language, result });
        await analysis.save();

        res.json({ result });
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ 
            result: 'Error: AI service unavailable. Please check your API key and try again.' 
        });
    }
});

// History endpoint
app.get('/history', async (req, res) => {
    try {
        const history = await Analysis.find().sort({ timestamp: -1 }).limit(10);
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

