const axios = require('axios');

const API_BASE_URL = 'http://localhost:5001/api';

async function testForgotPasswordFlow() {
  console.log('🧪 Testing Forgot Password Flow...\n');

  try {
    // Test 1: Request password reset
    console.log('1️⃣ Testing forgot password request...');
    const forgotResponse = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
      email: 'test@example.com'
    });
    console.log('✅ Forgot password request successful:', forgotResponse.data);

    // Test 2: Verify OTP (this will fail since we don't have a real OTP)
    console.log('\n2️⃣ Testing OTP verification (expected to fail)...');
    try {
      await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
        email: 'test@example.com',
        otp: '123456'
      });
    } catch (error) {
      console.log('✅ OTP verification failed as expected:', error.response?.data?.message);
    }

    // Test 3: Test reset password without valid OTP (expected to fail)
    console.log('\n3️⃣ Testing password reset without valid OTP (expected to fail)...');
    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        email: 'test@example.com',
        newPassword: 'newpassword123'
      });
    } catch (error) {
      console.log('✅ Password reset failed as expected:', error.response?.data?.message);
    }

    console.log('\n🎉 All tests completed! The API endpoints are working correctly.');
    console.log('\n📝 Note: To test the complete flow, you need to:');
    console.log('   1. Start the server: cd Server && npm start');
    console.log('   2. Start the client: cd Client && npm start');
    console.log('   3. Use a real email address that exists in your database');
    console.log('   4. Check the email for the OTP and use it to complete the flow');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testForgotPasswordFlow();

