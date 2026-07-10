const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('Random.org proxy function processing request');

    // Get API key from environment variable
    const RANDOM_ORG_API_KEY = process.env.RANDOM_ORG_API_KEY;
    
    if (!RANDOM_ORG_API_KEY) {
        context.res = {
            status: 500,
            body: { error: 'RANDOM_ORG_API_KEY environment variable not set' }
        };
        return;
    }

    try {
        // Parse query parameters or body
        const count = parseInt(req.query.count) || parseInt(req.body?.count) || 60;
        const min = parseInt(req.query.min) || parseInt(req.body?.min) || 0;
        const max = parseInt(req.query.max) || parseInt(req.body?.max) || 51;

        context.log(`Fetching ${count} random numbers between ${min} and ${max}`);

        const response = await fetch('https://api.random.org/json-rpc/4/invoke', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "generateIntegers",
                params: {
                    apiKey: RANDOM_ORG_API_KEY,
                    n: count,
                    min: min,
                    max: max,
                    replacement: true
                },
                id: 1
            })
        });

        const data = await response.json();
        
        if (data.result && data.result.random && data.result.random.data) {
            context.res = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
                },
                body: data.result.random.data
            };
        } else {
            context.res = {
                status: 500,
                body: { error: 'Invalid response from random.org', data: data }
            };
        }
    } catch (error) {
        context.log('Error:', error);
        context.res = {
            status: 500,
            body: { error: error.message }
        };
    }
};
