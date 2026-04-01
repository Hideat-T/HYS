import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

const app = express();
const PORT = 3000;

// [SECTION: CONFIGURATION]
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const UPLOAD_DIR = path.join(__dirname, '../uploads');
const PROPERTIES_FILE = path.join(__dirname, 'properties.json');
const USERS_FILE = path.join(__dirname, 'users.json');

// Ensure uploads folder exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// [SECTION: PERSISTENCE HELPERS]
const loadData = (file: string) => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf-8')) : [];
const saveData = (file: string, data: any) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

let properties = loadData(PROPERTIES_FILE);
let users = loadData(USERS_FILE);

// [SECTION: MULTER SETUP FOR MULTIPLE IMAGES]
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// [SECTION: AUTHENTICATION ROUTES]
app.post('/api/register', (req, res) => {
    const { email, password, name, role } = req.body;
    if (users.find((u: any) => u.email === email)) return res.status(400).json({ message: "User exists" });
    
    const newUser = { id: Date.now(), email, password, name, role };
    users.push(newUser);
    saveData(USERS_FILE, users);
    res.status(201).json({ message: "Registered!", user: newUser });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) res.json({ user });
    else res.status(401).json({ message: "Invalid credentials" });
});

// [SECTION: PROPERTY ROUTES]
app.get('/api/properties', (req, res) => res.json(properties));

app.get('/api/properties/user/:userId', (req, res) => {
    const userId = String(req.params.userId);
    res.json(properties.filter((p: any) => String(p.userId) === userId));
});

app.post('/api/properties', upload.array('images', 5), (req, res) => {
    const files = req.files as Express.Multer.File[];
    const imageUrls = files?.length > 0 
        ? files.map(f => `http://localhost:3000/uploads/${f.filename}`)
        : ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800'];

    const newProperty = {
        id: Date.now(),
        ...req.body,
        price: Number(req.body.price),
        rooms: Number(req.body.rooms),
        images: imageUrls,
        imageUrl: imageUrls[0] // Primary image
    };

    properties.push(newProperty);
    saveData(PROPERTIES_FILE, properties);
    res.status(201).json(newProperty);
});
// [SECTION: EDIT / UPDATE PROPERTY]
app.put('/api/properties/:id', upload.array('images', 5), (req, res) => {
    const id = Number(req.params.id);
    const index = properties.findIndex((p: any) => p.id === id);

    if (index === -1) return res.status(404).json({ message: "Property not found" });

    // Handle Images: Keep old ones if no new ones are uploaded
    const files = req.files as Express.Multer.File[];
    let imageUrls = properties[index].images; 

    if (files && files.length > 0) {
        imageUrls = files.map(f => `http://localhost:3000/uploads/${f.filename}`);
    }

    // Update the data
    properties[index] = {
        ...properties[index], // Keep old data (like userId)
        ...req.body,          // Overwrite with new data
        price: Number(req.body.price),
        rooms: Number(req.body.rooms),
        images: imageUrls,
        imageUrl: imageUrls[0]
    };

    saveData(PROPERTIES_FILE, properties);
    console.log(`📝 Updated: ${properties[index].title}`);
    res.json(properties[index]);
});

// [SECTION: DELETE PROPERTY] - Keep your existing delete route below this
app.delete('/api/properties/:id', (req, res) => {
    const id = Number(req.params.id);
    const prop = properties.find((p: any) => p.id === id);
    if (prop?.images) {
        prop.images.forEach((url: string) => {
            const fileName = url.split('/').pop();
            const filePath = path.join(UPLOAD_DIR, fileName!);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });
    }
    properties = properties.filter((p: any) => p.id !== id);
    saveData(PROPERTIES_FILE, properties);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} 🚀`));