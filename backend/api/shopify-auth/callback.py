from http.server import BaseHTTPRequestHandler
import json
import requests

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Read request body
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length == 0:
                self.send_error_response(400, 'Empty request body')
                return
                
            post_data = self.rfile.read(content_length)
            body = json.loads(post_data.decode('utf-8'))
            
            code = body.get('code')
            code_verifier = body.get('codeVerifier')
            
            if not code or not code_verifier:
                self.send_error_response(400, 'Missing code or codeVerifier')
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
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            
            print(f'Exchanging code for tokens...')
            response = requests.post(token_url, data=token_data, headers=headers)
            print(f'Token response status: {response.status_code}')
            
            if response.status_code != 200:
                print(f'Token exchange failed: {response.text}')
                self.send_error_response(response.status_code, f'Token exchange failed: {response.text}')
                return
            
            tokens = response.json()
            print(f'Tokens received successfully')
            
            # Return tokens to client
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', 'https://fitgearzzz.com')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps(tokens).encode())
            
        except Exception as e:
            print(f'Error: {str(e)}')
            self.send_error_response(500, str(e))
    
    def do_OPTIONS(self):
        # Handle CORS preflight
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'https://fitgearzzz.com')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def send_error_response(self, code, message):
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', 'https://fitgearzzz.com')
        self.end_headers()
        self.wfile.write(json.dumps({'error': message}).encode())
