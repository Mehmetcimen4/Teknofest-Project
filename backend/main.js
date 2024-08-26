const express = require("express");
const OpenAI = require("openai");
const prompt = require("prompt-sync")();
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
});

// Kullanılacak referans metni
var referenceText;
let target;


async function loadJsonData() {
    try {
      const data = await fs.readFile(path.join(__dirname, 'dataset.json'));
      info = JSON.parse(data); // JSON verisini parse edip jsonData'ya atıyoruz
      return info;
    } catch (err) {
      console.error('Error:', err);
    }
    //return info;
}

loadJsonData().then((jsonData) => {
    let randomIndex = Math.floor(Math.random() * jsonData.length);
    let randomData = jsonData[randomIndex];

    target = randomData.name;
    referenceText = randomData.description;

    let conversationHistory = [
        {"role": "system", "content": `cevabı  ${target.toLowerCase()} olan bir kelime oyunu oynuyoruz . Kullanıcılar sana bu kelime hakkında sorular soracak bu sorulara  evet veya hayır cevapları ver . Eğer soru ${target.toLowerCase()} kelimesinin tamamını içeriyorsa 'Doğru!' de: `}
    ];
    console.log(`Hedef Kelime : ${target}`);
    app.post('/getResponse', async (req, res) => {

        while (true) {
            
            const soru = req.body.message;
            console.log(soru);
            
            if (soru.trim() === "") {
                console.log("Soru girilmedi, program sonlandırılıyor.");
                
            }
    
            // Kullanıcı mesajını geçmişe ekliyoruz
            conversationHistory.push({"role": "user", "content": soru});
            
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: conversationHistory,
                max_tokens: 10
            });
    
            const assistantMessage = response.choices[0].message.content;
            
            
            conversationHistory.pop({"role": "user", "content": soru});
            
            return res.status(200).json({assistantMessage});
        }
    });
  }).catch((err) => {
    console.error('Error:', err);
  });


app.listen(5000, () => {
    console.log("server started");
});
