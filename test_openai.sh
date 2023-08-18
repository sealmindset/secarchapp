#!/bin/bash

# Load .env file
export $(grep -v '^#' .env | xargs)

# Test OpenAI API using curl with the chat completions endpoint
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $REACT_APP_API_KEY" \
  -H "Openai-Organization: $REACT_APP_ORG_ID" \
  -d '{
     "model": "gpt-3.5-turbo",
     "messages": [{"role": "user", "content": "Say this is a test!"}],
     "temperature": 0.7
   }'
