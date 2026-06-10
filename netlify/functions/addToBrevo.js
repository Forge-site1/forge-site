exports.handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body);

    const response = await fetch(
      'https://api.brevo.com/v3/contacts',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY
        },
        body: JSON.stringify({
          email,
          listIds: [4],
          updateEnabled: true
        })
      }
    );

    const data = await response.text();

console.log("BREVO STATUS:", response.status);
console.log("BREVO RESPONSE:", data);

return {
  statusCode: response.status,
  body: data
};

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
