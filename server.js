const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API для сканирования файла
app.post('/admin/scan', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const result = await analyzeFileWithVirusTotal(filePath, req); // Передаем req
    fs.unlinkSync(filePath); // Удаление файла после анализа
    console.log('Analysis Result:', result); // Лог результатов анализа
    res.json(result);
  } catch (error) {
    console.error('Error scanning file:', error.message);
    res.status(500).json({ message: 'Error scanning file', error: error.message });
  }
});

// API для получения результатов сканирования
app.get('/admin/results', (req, res) => {
  // Пример данных, замените на реальную логику получения данных
  const exampleResults = [
    { id: '1', name: 'File1.txt' },
    { id: '2', name: 'File2.txt' },
  ];
  res.json({ results: exampleResults });
});

// API для отметки файла как ложноположительный
app.post('/admin/markAsFalsePositive', (req, res) => {
  const { resultId } = req.body;
  // Здесь можно добавить логику для сохранения этой информации в базе данных
  res.status(200).json({ message: 'Result marked as false positive.' });
});

async function analyzeFileWithVirusTotal(filePath, req) { // Принимаем req
  const fileData = fs.readFileSync(filePath);

  try {
    const formData = new FormData();
    formData.append('file', fileData, { filename: req.file.originalname });

    const response = await axios.post('https://www.virustotal.com/vtapi/v2/file/scan', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        apikey: '289581716fe23838c3e5272c600e1df4f93df0fd44cfab0e7ab9f78e09d0cb8d' // Замените на ваш API ключ VirusTotal
      }
    });

    const analysisId = response.data.scan_id;
    const analysisResult = await getAnalysisResultFromVirusTotal(analysisId);
    return analysisResult;
  } catch (error) {
    console.error('VirusTotal API error:', error.message);
    throw new Error(`VirusTotal API error: ${error.message}`);
  }
}

async function getAnalysisResultFromVirusTotal(analysisId) {
  try {
    const response = await axios.get(`https://www.virustotal.com/vtapi/v2/file/report`, {
      params: {
        apikey: '289581716fe23838c3e5272c600e1df4f93df0fd44cfab0e7ab9f78e09d0cb8d', // Замените на ваш API ключ VirusTotal
        resource: analysisId
      }
    });
    return response.data;
  } catch (error) {
    console.error('VirusTotal API error:', error.message);
    throw new Error(`VirusTotal API error: ${error.message}`);
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
