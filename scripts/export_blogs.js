import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'content', 'blog');
const outputPath = path.join(process.cwd(), 'blog_posts_export.csv');

function escapeCSV(text) {
    if (text === null || text === undefined) return '""';
    const stringified = String(text);
    if (stringified.includes('"') || stringified.includes(',') || stringified.includes('\n')) {
        return `"${stringified.replace(/"/g, '""')}"`;
    }
    return stringified;
}

async function exportBlogs() {
    try {
        const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
        const blogData = [];

        for (const file of files) {
            const filePath = path.join(blogDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(fileContent);

            blogData.push({
                filename: file,
                title: data.title || '',
                date: data.date || '',
                description: data.description || '',
                author: data.author || '',
                tags: data.tags ? data.tags.join(', ') : '',
                content: content.trim()
            });
        }

        const headers = ['Filename', 'Title', 'Date', 'Description', 'Author', 'Tags', 'Content'];
        const csvRows = [headers.join(',')];

        for (const post of blogData) {
            const row = [
                escapeCSV(post.filename),
                escapeCSV(post.title),
                escapeCSV(post.date),
                escapeCSV(post.description),
                escapeCSV(post.author),
                escapeCSV(post.tags),
                escapeCSV(post.content)
            ];
            csvRows.push(row.join(','));
        }

        fs.writeFileSync(outputPath, csvRows.join('\n'), 'utf8');
        console.log(`Successfully exported ${blogData.length} blog posts to ${outputPath}`);
    } catch (error) {
        console.error('Error exporting blogs:', error);
    }
}

exportBlogs();
