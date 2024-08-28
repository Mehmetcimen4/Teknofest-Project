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
let conversationHistory = [];

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
        referenceText = randomData.description;
        console.log(`Hedef Kelime: ${target}`);
        //conv history here
            
        //
        return target;
        //
        
    } catch (err) {
        console.error('Error:', err);
    }
}
app.post("/getResponse", async (req,res) => {
    //target = startNewGame().toString();
    conversationHistory.push({"role": "system", "content": `cevabı  ${target.toLowerCase()} olan bir kelime oyunu oynuyoruz. Kullanıcılar sana bu kelime hakkında sorular soracak bu sorulara evet veya hayır cevapları ver. Eğer soru ${target.toLowerCase()} kelimesinin tamamını içeriyorsa 'Doğru!' de: `});
    try {
        while(true){
            /*
            let restart = req.body.restart;
            console.log(restart);
            
            if(restart === "yes"){
                startNewGame();
                
                console.log("generated");
                restart = "no";
                
            }
            */
            
            const soru = req.body.message;
            console.log(soru);
            
            if (soru.trim() === "") {
                console.log("Soru girilmedi, program sonlandırılıyor.");
                
            }
    
            // Kullanıcı mesajını geçmişe ekliyoruz
            conversationHistory.push({"role": "user", "content": soru});
            //console.log(conversationHistory);
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: conversationHistory,
                max_tokens: 10
            });
    
            const assistantMessage = response.choices[0].message.content;
            
            
            conversationHistory.pop({"role": "user", "content": soru});
            
            console.log(`Assistant  message : ${assistantMessage}`)
            return res.status(200).json({assistantMessage,target});
        }
    }catch(err){
        console.error('Error:', err);
    }
})

/*
loadJsonData().then((jsonData) => {
    target = startNewGame().toString();
    conversationHistory.push({"role": "system", "content": `cevabı  ${target.toLowerCase()} olan bir kelime oyunu oynuyoruz. Kullanıcılar sana bu kelime hakkında sorular soracak bu sorulara evet veya hayır cevapları ver. Eğer soru ${target.toLowerCase()} kelimesinin tamamını içeriyorsa 'Doğru!' de: `});
    app.post('/getResponse', async (req, res) => {
        while(true){
            
            let restart = req.body.restart;
            console.log(restart);
            
            if(restart === "yes"){
                startNewGame();
                
                console.log("generated");
                restart = "no";
                
            }
            
            
            const soru = req.body.message;
            console.log(soru);
            
            if (soru.trim() === "") {
                console.log("Soru girilmedi, program sonlandırılıyor.");
                
            }
    
            // Kullanıcı mesajını geçmişe ekliyoruz
            conversationHistory.push({"role": "user", "content": soru});
            console.log(conversationHistory);
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: conversationHistory,
                max_tokens: 10
            });
    
            const assistantMessage = response.choices[0].message.content;
            
            
            conversationHistory.pop({"role": "user", "content": soru});
            
            console.log(`Assistant  message : ${assistantMessage}`)
            return res.status(200).json({assistantMessage,target});
        }

        }
    );
  }).catch((err) => {
    console.error('Error:', err);
  });
*/
/*
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
            let restart = req.body.restart;
            if(restart === true){
                break;
            }
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
            
            return res.status(200).json({assistantMessage,target});
        }
    });
  }).catch((err) => {
    console.error('Error:', err);
  });
*/
//
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
//
app.listen(5000, () => {
    console.log("server started");
});
