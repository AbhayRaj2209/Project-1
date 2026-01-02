// Controllers for resume suggestions
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const getSuggestions = async (req, res) => {
  try {
    const { summary, education, experience, skills } = req.body;
    const suggestions = {
      summary: 'Consider quantifying your achievements and using action verbs.',
      education: 'List your most recent education first. Include relevant coursework if applicable.',
      experience: 'Use bullet points and focus on achievements rather than duties.',
      skills: 'List technical skills first, followed by soft skills.'
    };
    res.json({ suggestions });
  } catch (error) {
    console.error('Error in getSuggestions:', error.message);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
};
