const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// 读取奖品和赞助商数据
app.get('/api/prizes-sponsors', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'prizes.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading prizes data');
    }
    res.json(JSON.parse(data));
  });
});

// 静态文件服务（前端资源）
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});