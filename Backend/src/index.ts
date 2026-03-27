import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const UPLOAD_DIR = path.join(__dirname, '../uploads');
const DATA_FILE = path.join(__dirname, 'properties.json');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

let properties = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) : [];

const saveProperties = () => fs.writeFileSync(DATA_FILE, JSON.stringify(properties, null, 2));

app.get('/api/properties', (req, res) => res.json(properties));

app.post('/api/properties', upload.single('image'), (req, res) => {
    const newProperty = {
        id: Date.now(),
        title: req.body.title,
        location: req.body.location,
        price: Number(req.body.price),
        rooms: Number(req.body.rooms),
        type: req.body.type,
        description: req.body.description,
        imageUrl: req.file ? `http://localhost:3000/uploads/${req.file.filename}` : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800'
    };
    properties.push(newProperty);
    saveProperties();
    res.status(201).json(newProperty);
});

// --- NEU: DIE LÖSCH-ROUTE ---
app.delete('/api/properties/:id', (req, res) => {
    const id = Number(req.params.id);
    
    // 1. Das passende Haus finden, um das Bild zu löschen
    const propertyToDelete = properties.find((p: any) => p.id === id);
    
    if (propertyToDelete && propertyToDelete.imageUrl.includes('localhost:3000/uploads/')) {
        const filename = propertyToDelete.imageUrl.split('/').pop();
        const filePath = path.join(UPLOAD_DIR, filename);
        
        // Foto von der Festplatte löschen, falls es existiert
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Foto gelöscht: ${filename}`);
        }
    }

    // 2. Aus der Liste entfernen
    properties = properties.filter((p: any) => p.id !== id);
    saveProperties();
    
    console.log(`🗑️ Inserat mit ID ${id} wurde gelöscht.`);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Server läuft mit Lösch-Funktion! 🗑️`));