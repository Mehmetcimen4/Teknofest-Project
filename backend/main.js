const express = require("express");
const OpenAI = require("openai");
const prompt = require("prompt-sync")();
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require('fs').promises;
const path = require('path');
const { log } = require("console");
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
let conversationHistory = [];

// Levenshtein mesafesi hesaplama fonksiyonu
function levenshteinDistance(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // Substitution
                    matrix[i][j - 1] + 1,     // Insertion
                    matrix[i - 1][j] + 1      // Deletion
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

// İki cümle arasındaki benzerlik oranını hesaplama
function similarityPercentage(a, b) {
    const maxLength = Math.max(a.length, b.length);
    const distance = levenshteinDistance(a, b);
    return ((maxLength - distance) / maxLength) * 100;
}

// Cümleleri karşılaştırıp %80 benzerlik bulursa listede olduğunu belirten fonksiyon
function isMessageInList(message, list) {
    for (let i = 0; i < list.length; i++) {
        const similarity = similarityPercentage(message, list[i]);
        if (similarity >= 90) {
            // return `Mesaj "${message}" listede bulunuyor (%${similarity.toFixed(2)} benzerlik).`;
            return false
        }
    }
    //return `Mesaj "${message}" listede bulunmuyor.`;
    return true
}

// Örnek kullanım
const mesajListesi = [];

async function loadJsonData() {
    try {
      const data = await fs.readFile(path.join(__dirname, 'word.json'));
      info = JSON.parse(data); // JSON verisini parse edip jsonData'ya atıyoruz
      return info;
    } catch (err) {
      console.error('Error:', err);
    }
    //return info;
}

async function startNewGame() {
    try {

        const jsonData = await loadJsonData();
        //console.log(`JSON DATA HAS BEEN READ WITH ${jsonData}`);
        let randomIndex = Math.floor(Math.random() * jsonData.length);
        let randomData = jsonData[randomIndex];

        target = randomData.name;
        referenceText = randomData.definition;
        console.log(`Hedef Kelime: ${target}`);
        mesajListesi.length = 0;
        return target;
        //
        
    } catch (err) {
        console.error('Error:', err);
    }
}
app.post("/getResponse", async (req, res) => {
    conversationHistory.push({
        "role": "system",
        "content": `Bu oyunda, seninle bir kelime oyunu oynayacağız. Hedef kelime "${target.toLowerCase()}". Oyunun kuralları şöyle:
    
        1. Kullanıcılar sana cümleler verecek.
        2. Eğer cümlede hedef kelime "${target.toLowerCase()}" geçiyorsa, "Doğru!" cevabını ver.
        3. Eğer cümledeki herhangi bir kelime hedef kelimeyle ilgiliyse, "Evet" cevabını ver.
        4. Cümlede hedef kelimeyle alakalı hiçbir şey yoksa, "Hayır" cevabını ver.
    
    Unutma, sadece tek kelimelik cevaplar vereceksin.`
    });

    try { 
        let soru = req.body.message;
        
        console.log(isMessageInList(soru, mesajListesi));
        console.log(mesajListesi);
        
        if (!isMessageInList(soru, mesajListesi)) {
            res.status(200).json({ assistantMessage: "gecersiz", target });
            return
        }
        
        mesajListesi.push(soru);
        console.log(soru);
        
        if (soru.trim() === "") {
            console.log("Soru girilmedi, program sonlandırılıyor.");
            return;
        }

        // Kullanıcı mesajını geçmişe ekliyoruz
        conversationHistory.push({ "role": "user", "content": soru });
        console.log(conversationHistory);

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: conversationHistory,
            max_tokens: 6
        });

        const assistantMessage = response.choices[0].message.content;
        
        conversationHistory.length = 0;
        
        console.log(`Assistant message: ${assistantMessage}`);
        return res.status(200).json({ assistantMessage, target });
        
    } catch (err) {
        console.error('Error:', err);
    }
});


app.post("/start-game", (req, res) => {
    startNewGame()
      .then(target => {
        res.json({ target: target }); // send the target value back to the client
      })
      .catch(err => {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

app.listen(5000, () => {
    console.log("server started");
});
