import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'supabase/migrations/202608240001_content_platform.sql',
  'supabase/environments/production.sql',
];
const output = files
  .map((relativePath) => `-- Source: ${relativePath}\n\n${fs.readFileSync(path.join(root, relativePath), 'utf8').trim()}`)
  .join('\n\n');

fs.mkdirSync(path.join(root, '.generated'), { recursive: true });
fs.writeFileSync(path.join(root, '.generated', 'production-bootstrap.sql'), `${output}\n`);
console.log('Prepared .generated/production-bootstrap.sql for manual execution in gvl-production.');
