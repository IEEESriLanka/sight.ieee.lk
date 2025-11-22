import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const DATA_PATH = path.join(ROOT_DIR, 'public/data/initiatives.json');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

// Helper to log messages
const log = (msg) => console.log(`[Meta Generator] ${msg}`);

async function generateMetaFiles() {
  try {
    // check if dist exists
    if (!fs.existsSync(DIST_DIR)) {
      console.error('Dist directory not found. Run build first.');
      process.exit(1);
    }

    // Read template
    const template = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
    
    // Read data
    const initiativesData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    
    log(`Found ${initiativesData.length} initiatives.`);

    let count = 0;

    for (const initiative of initiativesData) {
      if (!initiative.slug) continue;

      // Prepare metadata
      const title = `${initiative.title} - IEEE Sri Lanka Section SIGHT`;
      const description = initiative.content 
        ? initiative.content.substring(0, 160) + '...' 
        : 'Leveraging technology for serving the underserved. IEEE Sri Lanka Section SIGHT creates sustainable humanitarian impact through innovative technology solutions.';
      
      // Image logic
      let imageUrl = 'https://sight.ieee.lk/images/logos/sight-sl-logo.png';
      let imagePath = '';

      if (initiative.image) {
        if (Array.isArray(initiative.image) && initiative.image.length > 0) {
          imagePath = initiative.image[0];
        } else if (typeof initiative.image === 'string') {
          imagePath = initiative.image;
        }
      }

      if (imagePath) {
        if (imagePath.startsWith('http')) {
          imageUrl = imagePath;
        } else {
          // Ensure leading slash
          const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
          imageUrl = `https://sight.ieee.lk${cleanPath}`;
        }
      }

      const url = `https://sight.ieee.lk/initiatives/${initiative.slug}`;

      // Replace tags in template
      let html = template;

      // Helper for safe replacement
      const replaceMeta = (property, content) => {
        const regex = new RegExp(`<meta property="${property}" content="[^"]*">`);
        const replacement = `<meta property="${property}" content="${content.replace(/"/g, '&quot;')}" />`;
        if (regex.test(html)) {
          html = html.replace(regex, replacement);
        } else {
          // If tag doesn't exist (e.g. twitter tags might use name instead of property in some templates, or just missing), append to head
          // But for this specific template we know they exist as property or name.
          // Let's try matching both property and name for robustness if needed, but adhering to template structure is safer.
          // The template uses property for og: and twitter: (except twitter:card? let's check)
          // The template has <meta property="twitter:card" ...>
          
          // Fallback to trying name attribute if property didn't match
          const nameRegex = new RegExp(`<meta name="${property}" content="[^"]*">`);
          if (nameRegex.test(html)) {
             html = html.replace(nameRegex, `<meta name="${property}" content="${content.replace(/"/g, '&quot;')}" />`);
          }
        }
      };

      // Title
      html = html.replace(/<title>.*<\/title>/, `<title>${title}</title>`);
      
      // Meta Description
      html = html.replace(
        /<meta name="description" content="[^"]*">/,
        `<meta name="description" content="${description.replace(/"/g, '&quot;')}" />`
      );

      // OG Tags
      replaceMeta('og:title', title);
      replaceMeta('og:description', description);
      replaceMeta('og:url', url);
      replaceMeta('og:image', imageUrl);

      // Remove width/height tags to avoid mismatch with dynamic images
      html = html.replace(/<meta property="og:image:width" content="[^"]*">/g, '');
      html = html.replace(/<meta property="og:image:height" content="[^"]*">/g, '');

      // Twitter Tags
      replaceMeta('twitter:title', title);
      replaceMeta('twitter:description', description);
      replaceMeta('twitter:url', url);
      replaceMeta('twitter:image', imageUrl);

      // Write file
      const dir = path.join(DIST_DIR, 'initiatives', initiative.slug);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(dir, 'index.html'), html);
      count++;
    }

    log(`Generated ${count} static initiative pages.`);

  } catch (error) {
    console.error('Error generating meta files:', error);
    process.exit(1);
  }
}

generateMetaFiles();
