const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001';

async function testIntegration() {
  console.log('🧪 开始测试前后端集成...\n');

  try {
    // 1. 测试用户注册
    console.log('1. 测试用户注册...');
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, {
      email: 'testuser@example.com',
      password: 'password123'
    });
    console.log('✅ 注册成功:', registerResponse.data.user.email);

    // 2. 测试用户登录
    console.log('\n2. 测试用户登录...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'testuser@example.com',
      password: 'password123'
    });
    console.log('✅ 登录成功:', loginResponse.data.user.email);
    const token = loginResponse.data.access_token;

    // 3. 测试创建日记
    console.log('\n3. 测试创建日记...');
    const diaryResponse = await axios.post(`${API_BASE_URL}/diaries`, {
      title: '我的第一篇日记',
      content: '今天是个好日子，我开始使用这个日记应用了！'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ 日记创建成功:', diaryResponse.data.title);

    // 4. 测试获取日记列表
    console.log('\n4. 测试获取日记列表...');
    const diariesResponse = await axios.get(`${API_BASE_URL}/diaries`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ 日记列表获取成功，共', diariesResponse.data.total, '篇日记');

    console.log('\n🎉 所有测试通过！前后端集成正常。');
    console.log('\n📝 现在可以访问以下地址：');
    console.log('   前端: http://localhost:3000');
    console.log('   后端API: http://localhost:3001');
    console.log('   API文档: http://localhost:3001/api');

  } catch (error) {
    console.error('❌ 测试失败:', error.response?.data || error.message);
  }
}

testIntegration();
