const fs = require('fs');
const path = require('path');

console.log('🔄 Remplacement du favicon...');

const indexPath = path.join(__dirname, 'index.html');

// Lire le fichier HTML
let htmlContent = fs.readFileSync(indexPath, 'utf8');

// L'ancien favicon à remplacer
const oldFavicon = `<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>">`;

// Le nouveau favicon avec votre image
const newFavicon = `<!-- Favicon PèléTech NEXUS -->
<link rel="shortcut icon" href="assets/images/logo-image.png" type="image/png">
<link rel="icon" type="image/png" href="assets/images/logo-image.png">
<link rel="apple-touch-icon" href="assets/images/logo-image.png">
<meta name="theme-color" content="#6366f1">`;

// Remplacer
htmlContent = htmlContent.replace(oldFavicon, newFavicon);

// Écrire le fichier modifié
fs.writeFileSync(indexPath, htmlContent);

console.log('✅ Favicon remplacé avec succès !');
console.log('📁 Utilisation de : assets/images/logo-image.png');

// Vérifier si l'image existe
const imagePath = path.join(__dirname, 'assets', 'images', 'logo-image.png');
if (fs.existsSync(imagePath)) {
    console.log('✅ Image trouvée :', imagePath);
} else {
    console.log('⚠️  Image non trouvée :', imagePath);
    console.log('👉 Vérifiez que votre image est bien à cet emplacement');
}