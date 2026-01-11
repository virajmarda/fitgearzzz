from http.server import BaseHTTPRequestHandler
import json
import os
import requests
from urllib.parse import parse_qs

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Read request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            body = json.loads(post_data.decode('utf-8'))
            
            code = body.get('code')
            code_verifier = body.get('codeVerifier')
            
            if not code or not code_verifier:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Missing code or codeVerifier'}).encode())
                return
            
            # Exchange code for tokens
            token_url = 'https://account.fitgearzzz.com/authentication/oauth/token'
            client_id = '49163ae9-7e32-4d93-a29c-d9fb330124c5'
            redirect_uri = 'https://fitgearzzz.com/auth/callback'
            
            token_data = {
                'grant_type': 'authorization_code',
                'client_id': client_id,
                'redirect_uri': redirect_uri,
                'code': code,
                'code_verifier': code_verifier
            }
            
            headers = {
                'Content-Type': 'application/json'
            }
            
            response = requests.post(token_url, json=token_data, headers=headers)
            
            if response.status_code != 200:
                self.send_response(response.status_code)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Token exchange failed', 'details': response.text}).encode())
                return
            
            tokens = response.json()
            
            # Return tokens to client
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', 'https://fitgearzzz.com')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps(tokens).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())
    
    def do_OPTIONS(self):
        # Handle CORS preflight
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'https://fitgearzzz.com')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
