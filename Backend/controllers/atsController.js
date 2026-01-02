// controllers/atsController.js
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

// Enhanced Local ATS scoring algorithm
const analyzeResumeLocally = (resumeText) => {
    const text = resumeText.toLowerCase();
    const originalText = resumeText;
    let score = 0;
    const strengths = [];
    const improvements = [];
    const recommendations = [];

    // 1. Check for essential sections (25 points)
    const sections = {
        'contact': {
            keywords: ['email', 'phone', '@gmail', '@yahoo', '@outlook', 'linkedin', 'github', '+91', 'contact'],
            weight: 5
        },
        'education': {
            keywords: ['education', 'degree', 'university', 'college', 'bachelor', 'master', 'b.tech', 'm.tech', 'b.e', 'bsc', 'msc', 'cgpa', 'gpa', 'percentage', 'institute', 'school'],
            weight: 5
        },
        'experience': {
            keywords: ['experience', 'work', 'employment', 'internship', 'intern', 'worked', 'company', 'organization', 'role', 'position', 'job'],
            weight: 5
        },
        'skills': {
            keywords: ['skills', 'technologies', 'programming', 'languages', 'tools', 'proficient', 'expertise', 'technical skills', 'soft skills'],
            weight: 5
        },
        'projects': {
            keywords: ['project', 'developed', 'built', 'created', 'implemented', 'designed', 'portfolio'],
            weight: 5
        }
    };

    let sectionsFound = 0;
    let sectionScore = 0;
    for (const [section, config] of Object.entries(sections)) {
        if (config.keywords.some(keyword => text.includes(keyword))) {
            sectionsFound++;
            sectionScore += config.weight;
            strengths.push(`✓ ${section.charAt(0).toUpperCase() + section.slice(1)} section detected`);
        } else {
            improvements.push(`✗ Add a clear ${section} section`);
        }
    }
    score += sectionScore;

    // 2. Check for action verbs (15 points)
    const actionVerbs = [
        'developed', 'created', 'managed', 'led', 'implemented', 'designed', 'built', 
        'improved', 'increased', 'reduced', 'achieved', 'delivered', 'coordinated', 
        'analyzed', 'resolved', 'automated', 'optimized', 'integrated', 'deployed',
        'collaborated', 'mentored', 'trained', 'launched', 'executed', 'established',
        'streamlined', 'enhanced', 'spearheaded', 'initiated', 'maintained', 'configured'
    ];
    const actionVerbsFound = actionVerbs.filter(verb => text.includes(verb));
    if (actionVerbsFound.length >= 6) {
        score += 15;
        strengths.push(`✓ Excellent use of action verbs (${actionVerbsFound.length} found)`);
    } else if (actionVerbsFound.length >= 3) {
        score += 10;
        recommendations.push('Add more action verbs like "implemented", "optimized", "deployed"');
    } else {
        score += 5;
        improvements.push('✗ Use action verbs to describe achievements');
    }

    // 3. Check for quantifiable achievements (15 points)
    const quantifiablePatterns = [
        /\d+%/g,                          // percentages
        /\d+\s*\+/g,                       // 100+, 50+
        /\d+\s*(users|customers|clients)/gi,
        /\d+\s*(projects|applications|apps)/gi,
        /\d+\s*(team|members|people)/gi,
        /\d+\s*(years|months|weeks)/gi,
        /\$\d+/g,                          // dollar amounts
        /₹\d+/g,                           // rupee amounts
        /\d+x/gi,                          // 2x, 3x improvements
        /reduced.*\d+/gi,
        /increased.*\d+/gi,
        /improved.*\d+/gi
    ];
    
    let quantifiableCount = 0;
    quantifiablePatterns.forEach(pattern => {
        const matches = resumeText.match(pattern);
        if (matches) quantifiableCount += matches.length;
    });

    if (quantifiableCount >= 4) {
        score += 15;
        strengths.push(`✓ Strong quantifiable achievements (${quantifiableCount} metrics found)`);
    } else if (quantifiableCount >= 2) {
        score += 10;
        recommendations.push('Add more metrics like "reduced load time by 40%" or "served 1000+ users"');
    } else {
        score += 3;
        improvements.push('✗ Add numbers to quantify your impact (%, users, time saved)');
    }

    // 4. Check for technical skills (15 points)
    const techCategories = {
        'programming': ['javascript', 'python', 'java', 'c++', 'c#', 'typescript', 'ruby', 'go', 'rust', 'php', 'swift', 'kotlin'],
        'frontend': ['react', 'angular', 'vue', 'html', 'css', 'sass', 'tailwind', 'bootstrap', 'next.js', 'nextjs', 'redux'],
        'backend': ['node', 'express', 'django', 'flask', 'spring', 'fastapi', 'nest.js', 'graphql', 'rest api', 'api'],
        'database': ['mongodb', 'mysql', 'postgresql', 'sql', 'redis', 'firebase', 'dynamodb', 'oracle', 'sqlite'],
        'devops': ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'jenkins', 'ci/cd', 'github actions', 'terraform'],
        'tools': ['git', 'github', 'gitlab', 'jira', 'figma', 'postman', 'vscode', 'linux', 'npm', 'webpack']
    };

    let techFound = [];
    let categoriesFound = new Set();
    for (const [category, skills] of Object.entries(techCategories)) {
        skills.forEach(skill => {
            if (text.includes(skill)) {
                techFound.push(skill);
                categoriesFound.add(category);
            }
        });
    }

    if (techFound.length >= 10) {
        score += 15;
        strengths.push(`✓ Comprehensive technical skills (${techFound.length} technologies across ${categoriesFound.size} categories)`);
    } else if (techFound.length >= 5) {
        score += 10;
        strengths.push(`✓ Good technical coverage (${techFound.length} technologies)`);
    } else if (techFound.length >= 2) {
        score += 5;
        recommendations.push('List more relevant technical skills');
    } else {
        improvements.push('✗ Add technical skills relevant to your target role');
    }

    // 5. Resume length & density check (10 points)
    const wordCount = resumeText.split(/\s+/).filter(w => w.length > 0).length;
    const lineCount = resumeText.split('\n').filter(l => l.trim().length > 0).length;
    
    if (wordCount >= 250 && wordCount <= 700) {
        score += 10;
        strengths.push(`✓ Optimal resume length (${wordCount} words)`);
    } else if (wordCount < 250) {
        score += 5;
        improvements.push(`✗ Resume is too brief (${wordCount} words) - add more details`);
    } else {
        score += 5;
        recommendations.push(`Resume is lengthy (${wordCount} words) - consider condensing`);
    }

    // 6. Contact information check (10 points)
    let contactScore = 0;
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
    const hasPhone = /(\+91|91)?[\s-]?\d{10}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
    const hasLinkedIn = /linkedin\.com|linkedin/i.test(resumeText);
    const hasGitHub = /github\.com|github/i.test(resumeText);
    const hasPortfolio = /portfolio|website|\.com|\.io|\.dev/i.test(resumeText);

    if (hasEmail) { contactScore += 3; strengths.push('✓ Email present'); }
    else { improvements.push('✗ Add professional email'); }
    
    if (hasPhone) { contactScore += 2; }
    else { recommendations.push('Consider adding phone number'); }
    
    if (hasLinkedIn) { contactScore += 2; strengths.push('✓ LinkedIn profile included'); }
    else { recommendations.push('Add LinkedIn profile URL'); }
    
    if (hasGitHub) { contactScore += 2; strengths.push('✓ GitHub profile included'); }
    else { recommendations.push('Add GitHub profile for tech roles'); }
    
    if (hasPortfolio) { contactScore += 1; }
    
    score += contactScore;

    // 7. Professional summary/objective check (5 points)
    const hasSummary = ['summary', 'objective', 'profile', 'about me', 'career objective'].some(word => text.includes(word));
    if (hasSummary) {
        score += 5;
        strengths.push('✓ Professional summary/objective present');
    } else {
        recommendations.push('Add a brief professional summary at the top');
    }

    // 8. Certifications & achievements (5 points)
    const hasCertifications = ['certified', 'certification', 'certificate', 'award', 'achievement', 'honor', 'recognition', 'coursera', 'udemy', 'hackerrank', 'leetcode'].some(word => text.includes(word));
    if (hasCertifications) {
        score += 5;
        strengths.push('✓ Certifications/achievements mentioned');
    } else {
        recommendations.push('Add certifications or notable achievements');
    }

    // Format analysis
    let formatAnalysis = `📊 Resume Analysis Summary:\n`;
    formatAnalysis += `• Word count: ${wordCount} words\n`;
    formatAnalysis += `• Sections found: ${sectionsFound}/5 essential sections\n`;
    formatAnalysis += `• Action verbs: ${actionVerbsFound.length} strong verbs used\n`;
    formatAnalysis += `• Technical skills: ${techFound.length} technologies detected\n`;
    formatAnalysis += `• Quantifiable metrics: ${quantifiableCount} numbers/percentages found\n`;
    formatAnalysis += `• Tech categories covered: ${Array.from(categoriesFound).join(', ') || 'None detected'}`;

    // Ensure score is within bounds
    score = Math.min(Math.round(score), 100);
    score = Math.max(score, 15);

    // Sort and limit arrays
    return {
        score,
        strengths: strengths.slice(0, 6),
        improvements: improvements.slice(0, 5),
        formatAnalysis,
        recommendations: recommendations.slice(0, 5)
    };
};

export const checkATSScore = async (req, res) => {
    try {
        const resumeFile = req.files?.resume;

        if (!resumeFile) {
            return res.status(400).json({ message: 'Resume file is required' });
        }

        let resumeText = '';

        // Extract text from PDF
        if (resumeFile.mimetype === 'application/pdf') {
            try {
                // Convert Buffer to Uint8Array
                const uint8Array = new Uint8Array(resumeFile.data);
                const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
                const pdf = await loadingTask.promise;
                
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    resumeText += pageText + '\n';
                }
                
                console.log('PDF Parsed - Extracted text length:', resumeText.length);
            } catch (pdfError) {
                console.error('PDF parsing error:', pdfError);
                return res.status(400).json({ message: 'Failed to parse PDF file. Please ensure it is a valid PDF.' });
            }
        } else {
            return res.status(400).json({ message: 'Only PDF files are supported' });
        }

        if (!resumeText || resumeText.trim().length === 0) {
            console.log('Empty resume text - PDF:', resumeFile.name, 'Size:', resumeFile.size);
            return res.status(400).json({ message: 'Resume text is required' });
        }

        // Use local analysis instead of external API
        const atsAnalysis = analyzeResumeLocally(resumeText);

        res.json({
            success: true,
            atsScore: atsAnalysis
        });

    } catch (error) {
        console.error('ATS Check Error:', error);
        res.status(500).json({ 
            message: 'Failed to analyze resume',
            error: error.message 
        });
    }
};

export const getSuggestions = async (req, res) => {
    try {
        const { resumeText, section } = req.body;

        if (!resumeText || !section) {
            return res.status(400).json({ message: 'Resume text and section are required' });
        }

        // Enhanced section-specific suggestions
        const sectionSuggestions = {
            'summary': [
                '📝 Keep your summary to 2-3 impactful sentences',
                '🎯 Start with your professional title and years of experience',
                '💡 Highlight 2-3 key skills most relevant to target roles',
                '📊 Include a notable achievement with metrics if possible',
                '🔑 Use keywords from job descriptions you\'re targeting'
            ],
            'experience': [
                '🚀 Start each bullet with strong action verbs (Developed, Implemented, Led)',
                '📊 Quantify achievements: "Increased performance by 40%", "Served 10,000+ users"',
                '🛠️ Include specific technologies used in each role',
                '📈 Show career progression and increasing responsibilities',
                '🎯 Focus on impact and results, not just daily tasks',
                '⏱️ Use recent and relevant experience (last 3-5 years)'
            ],
            'education': [
                '🎓 List degree, institution, and graduation year clearly',
                '📊 Include CGPA/GPA if above 7.0/3.0',
                '📚 Add relevant coursework for entry-level positions',
                '🏆 Mention academic achievements, scholarships, or honors',
                '📜 Include relevant certifications and online courses'
            ],
            'skills': [
                '📂 Organize skills by category: Languages, Frameworks, Tools, Databases',
                '🎯 Prioritize skills mentioned in target job descriptions',
                '⭐ List your strongest/most proficient skills first',
                '🔄 Include both technical and soft skills',
                '📈 Add proficiency levels (Expert, Intermediate) if space allows',
                '🚫 Remove outdated or irrelevant technologies'
            ],
            'projects': [
                '💡 Start with project name and your role clearly defined',
                '🛠️ List tech stack used: "Built with React, Node.js, MongoDB"',
                '📊 Include metrics: users, performance improvements, data processed',
                '🔗 Add live demo links and GitHub repository URLs',
                '🎯 Describe the problem solved and your specific contribution',
                '👥 Mention team size and collaboration if applicable'
            ],
            'contact': [
                '📧 Use a professional email (firstname.lastname@gmail.com)',
                '📱 Include phone number with country code',
                '💼 Add LinkedIn profile URL (customize your URL)',
                '💻 Include GitHub profile for tech roles',
                '🌐 Add portfolio website if you have one',
                '📍 City/State is enough - full address not needed'
            ],
            'certifications': [
                '📜 List certification name, issuing organization, and date',
                '✅ Include certification ID or verification link if available',
                '🎯 Prioritize industry-recognized certifications',
                '📅 Keep certifications current - note expiry dates',
                '🔝 Place most relevant certifications at the top'
            ]
        };

        const defaultSuggestions = [
            '✍️ Be specific and concise in all descriptions',
            '🔑 Use keywords from job descriptions you\'re applying to',
            '📊 Quantify achievements wherever possible',
            '✅ Proofread for grammar and spelling errors',
            '📐 Keep formatting consistent throughout',
            '📄 Aim for 1 page (entry-level) or 2 pages max (experienced)'
        ];

        const suggestions = sectionSuggestions[section.toLowerCase()] || defaultSuggestions;

        res.json({
            success: true,
            suggestions
        });

    } catch (error) {
        console.error('Suggestions Error:', error);
        res.status(500).json({ 
            message: 'Failed to generate suggestions',
            error: error.message 
        });
    }
};
