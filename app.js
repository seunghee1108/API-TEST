const express = require('express');
// const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public')); // 'public' 폴더에서 정적 파일을 제공

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // HTML 파일을 클라이언트에 제공
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});

app.get('/search', async (req, res) => {
  const query = req.query.query;

  try {
    const response = await fetch(`https://openapi.naver.com/v1/search/blog.json?query=${query}`, {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': 'BrLnfsWSIVhfuDuHi2o_', // 본인의 클라이언트 아이디로 대체
        'X-Naver-Client-Secret': 'Ul3SmIdRfl', // 본인의 클라이언트 시크릿으로 대체
      },
    });

    const data = await response.json();
    res.json(data); // 검색 결과를 클라이언트에 JSON 형식으로 반환
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'API 요청 중 오류가 발생했습니다.' });
  }
});
