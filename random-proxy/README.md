# RANDOM.ORG Proxy for Azure Functions

This is a proxy server that hides your RANDOM.ORG API key behind an Azure Function, keeping it secure.

## How It Works

1. Your frontend calls this Azure Function
2. The function adds your secret API key and forwards the request to RANDOM.ORG
3. RANDOM.ORG returns truly random numbers
4. The function returns the numbers to your frontend

## Setup

### 1. Set up your Azure Function App

**In Azure Portal:**
- Create a new **Function App** (Consumption plan is free tier)
- Runtime: **Node.js** (version 18 or 20)
- Region: Choose one close to you
- Deployment method: GitHub or Zip deploy

### 2. Add your API key as an environment variable

In your Function App **Configuration > Application settings**:
- Add new setting: `RANDOM_ORG_API_KEY`
- Value: `2735003b-59c1-40e0-8225-a990378986c9`
- Save

### 3. Deploy the proxy function

**Option A: Zip Deploy**
```bash
cd random-proxy
npm install
zip -r function.zip .
# Upload function.zip to your Function App via Azure Portal
```

**Option B: GitHub Actions**
1. Push this folder to your GitHub repo
2. In Azure Portal, go to your Function App > Deployment Center
3. Connect to GitHub and select your repo + branch

**Option C: Azure CLI**
```bash
az functionapp create --name YOUR-FUNCTION-APP --resource-group YOUR-RG --consumption-plan-location eastus --runtime node --runtime-version 18 --functions-version 4 --storage-account YOUR-STORAGE
cd random-proxy
func azure functionapp publish YOUR-FUNCTION-APP
```

### 4. Update your frontend

In `index.html`, change this line:
```javascript
const PROXY_URL = 'https://YOUR-AZURE-FUNCTION.azurewebsites.net/api/random';
```

Replace `YOUR-AZURE-FUNCTION` with your actual Function App name.

## Endpoint

The function will be available at:
```
https://YOUR-AZURE-FUNCTION.azurewebsites.net/api/random?count=60&min=0&max=51
```

**Query Parameters:**
- `count` - Number of random integers (default: 60)
- `min` - Minimum value (default: 0)
- `max` - Maximum value (default: 51)

## Security Notes

✅ Your API key is now hidden on the server
✅ Frontend never sees the key
✅ CORS headers are included for web access
✅ Falls back gracefully if RANDOM.ORG is down

## File Structure

```
random-proxy/
├── index.js          # Function code
├── function.json     # Function binding configuration
├── host.json         # Host configuration
├── package.json     # Dependencies
└── README.md         # This file
```

## Local Testing

1. Install dependencies:
```bash
npm install
```

2. Run locally (requires Azure Functions Core Tools):
```bash
func start
```

3. Test with:
```bash
curl "http://localhost:7071/api/random?count=10&min=0&max=10"
```

Make sure to set the `RANDOM_ORG_API_KEY` environment variable locally too:
```bash
export RANDOM_ORG_API_KEY=2735003b-59c1-40e0-8225-a990378986c9
```
