const fs = require('fs');
const path = require('path');

console.log('🎨 Création du logo en cercle...');

// Créer le dossier assets/images s'il n'existe pas
const assetsDir = path.join(__dirname, 'assets');
const imagesDir = path.join(assetsDir, 'images');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
}
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Créer un fichier HTML de test
const testHTML = `<!DOCTYPE html>
<html>
<head>
    <title>Test Logo Cercle</title>
    <style>
        body { 
            font-family: 'Inter', sans-serif; 
            padding: 2rem;
            background: #f8fafc;
        }
        .test-container {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap;
        }
        .logo-test {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
        .circle {
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #6366f1, #4f46e5);
        }
        .size-40 { width: 40px; height: 40px; }
        .size-60 { width: 60px; height: 60px; }
        .size-80 { width: 80px; height: 80px; }
        .circle img {
            width: 70%;
            height: 70%;
            object-fit: contain;
            filter: brightness(0) invert(1);
        }
    </style>
</head>
<body>
    <h1>Test du Logo PèléTech NEXUS en Cercle</h1>
    
    <div class="test-container">
        <div class="logo-test">
            <div class="circle size-40">
                <img src="logo-image.png" alt="Logo">
            </div>
            <p>Header (40px)</p>
        </div>
        
        <div class="logo-test">
            <div class="circle size-60">
                <img src="logo-image.png" alt="Logo">
            </div>
            <p>Footer (60px)</p>
        </div>
        
        <div class="logo-test">
            <div class="circle size-80">
                <img src="logo-image.png" alt="Logo">
            </div>
            <p>Large (80px)</p>
        </div>
    </div>
    
    <p style="margin-top: 2rem;">
        <strong>Instructions :</strong><br>
        1. Placez votre image dans <code>assets/images/logo-image.png</code><br>
        2. Ouvrez ce fichier dans votre navigateur pour tester<br>
        3. Ajustez la taille si nécessaire
    </p>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'test-logo-circle.html'), testHTML);

console.log('✅ Fichiers créés :');
console.log('📁 assets/images/ (créez ce dossier si non existant)');
console.log('📁 test-logo-circle.html (fichier de test)');
console.log('\n📝 Instructions suivantes :');
console.log('1. Placez votre image dans assets/images/logo-image.png');
console.log('2. Ouvrez test-logo-circle.html dans votre navigateur');
console.log('3. Si l\'affichage vous convient, lancez votre site');