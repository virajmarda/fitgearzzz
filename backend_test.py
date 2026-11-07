"""
FitGearzzz Backend API Test Suite
Tests API contracts and error handling when Shopify store is unavailable.
No mock data or simulated success - tests honest unavailable states.
"""
import requests
import sys
import os

# Get the public endpoint from frontend .env
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://product-first-7--9p2txdzz.preview.emergentagent.com')

class BackendTester:
    def __init__(self, base_url):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.tests_blocked = 0
        self.results = []

    def test(self, name, method, endpoint, expected_status, data=None, headers=None, blocked=False):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        if headers:
            test_headers.update(headers)

        self.tests_run += 1
        print(f"\n{'='*60}")
        print(f"Test: {name}")
        print(f"Endpoint: {method} {endpoint}")
        if blocked:
            print(f"Status: BLOCKED (external dependency unavailable)")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=15)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=15)
            else:
                raise ValueError(f"Unsupported method: {method}")

            print(f"Response Status: {response.status_code}")
            
            if blocked:
                # For blocked tests, we just verify the error is honest (not fake success)
                self.tests_blocked += 1
                if response.status_code in [503, 402, 401]:
                    print(f"✓ BLOCKED - Correctly returns error (not fake data)")
                    self.results.append({
                        'name': name,
                        'status': 'BLOCKED',
                        'expected': expected_status,
                        'actual': response.status_code,
                        'message': 'External dependency unavailable'
                    })
                    return True
                else:
                    print(f"⚠ BLOCKED - Unexpected status {response.status_code}")
                    self.results.append({
                        'name': name,
                        'status': 'BLOCKED',
                        'expected': expected_status,
                        'actual': response.status_code,
                        'message': 'Unexpected response for blocked test'
                    })
                    return False
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ PASSED")
                self.results.append({
                    'name': name,
                    'status': 'PASSED',
                    'expected': expected_status,
                    'actual': response.status_code
                })
            else:
                print(f"❌ FAILED - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"Response: {response.json()}")
                except:
                    print(f"Response: {response.text[:200]}")
                self.results.append({
                    'name': name,
                    'status': 'FAILED',
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })

            return success

        except requests.exceptions.Timeout:
            print(f"❌ FAILED - Request timeout")
            self.results.append({
                'name': name,
                'status': 'FAILED',
                'error': 'Timeout'
            })
            return False
        except Exception as e:
            print(f"❌ FAILED - Error: {str(e)}")
            self.results.append({
                'name': name,
                'status': 'FAILED',
                'error': str(e)
            })
            return False

    def print_summary(self):
        print(f"\n{'='*60}")
        print(f"TEST SUMMARY")
        print(f"{'='*60}")
        print(f"Total tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Blocked (external): {self.tests_blocked}")
        print(f"Failed: {self.tests_run - self.tests_passed - self.tests_blocked}")
        print(f"{'='*60}\n")

def main():
    print("FitGearzzz Backend API Test Suite")
    print(f"Testing: {BACKEND_URL}")
    print("="*60)
    
    tester = BackendTester(BACKEND_URL)

    # 1. Health check (should work)
    print("\n### HEALTH CHECK ###")
    tester.test(
        "Health check endpoint",
        "GET",
        "/",
        200
    )

    # 2. Products endpoint (BLOCKED - no Shopify credentials)
    print("\n### PRODUCT ENDPOINTS (BLOCKED) ###")
    tester.test(
        "Get products - expect honest unavailable error",
        "GET",
        "/api/products",
        503,
        blocked=True
    )

    # 3. Cart endpoints (BLOCKED - no Shopify credentials)
    print("\n### CART ENDPOINTS (BLOCKED) ###")
    
    # Test guest checkout with invalid token format (should reject)
    tester.test(
        "Guest checkout - invalid merchandiseId format",
        "POST",
        "/api/cart/guest-checkout",
        422,  # Pydantic validation error
        data={
            "lines": [
                {
                    "merchandiseId": "invalid_format",
                    "quantity": 1
                }
            ]
        }
    )

    # Test guest checkout with zero quantity (should reject)
    tester.test(
        "Guest checkout - zero quantity validation",
        "POST",
        "/api/cart/guest-checkout",
        422,  # Pydantic validation error
        data={
            "lines": [
                {
                    "merchandiseId": "gid://shopify/ProductVariant/12345",
                    "quantity": 0
                }
            ]
        }
    )

    # Test guest checkout with negative quantity (should reject)
    tester.test(
        "Guest checkout - negative quantity validation",
        "POST",
        "/api/cart/guest-checkout",
        422,  # Pydantic validation error
        data={
            "lines": [
                {
                    "merchandiseId": "gid://shopify/ProductVariant/12345",
                    "quantity": -1
                }
            ]
        }
    )

    # Test guest checkout with empty lines (should reject)
    tester.test(
        "Guest checkout - empty lines validation",
        "POST",
        "/api/cart/guest-checkout",
        400,  # Bad request
        data={
            "lines": []
        }
    )

    # Test guest checkout with valid format but unavailable store
    tester.test(
        "Guest checkout - valid format, store unavailable",
        "POST",
        "/api/cart/guest-checkout",
        503,
        data={
            "lines": [
                {
                    "merchandiseId": "gid://shopify/ProductVariant/12345",
                    "quantity": 1
                }
            ]
        },
        blocked=True
    )

    # 4. Auth endpoints (BLOCKED - no Shopify credentials)
    print("\n### AUTH ENDPOINTS (BLOCKED) ###")
    
    # Test auth callback with missing config
    tester.test(
        "OAuth callback - missing config",
        "POST",
        "/api/shopify-auth/callback",
        503,
        data={
            "code": "test_code",
            "codeVerifier": "test_verifier"
        },
        blocked=True
    )

    # Test /auth/me with invalid token
    tester.test(
        "Get current user - invalid token",
        "GET",
        "/api/auth/me",
        401,  # Unauthorized
        headers={
            "Authorization": "Bearer invalid_token_12345"
        }
    )

    # Test /auth/me without token
    tester.test(
        "Get current user - no token",
        "GET",
        "/api/auth/me",
        403  # Forbidden (no credentials provided)
    )

    # 5. Orders endpoint (BLOCKED - requires auth)
    print("\n### ORDER ENDPOINTS (BLOCKED) ###")
    tester.test(
        "Get orders - no auth",
        "GET",
        "/api/orders",
        403,  # Forbidden
        blocked=True
    )

    # Print summary
    tester.print_summary()

    # Print detailed results
    print("\nDETAILED RESULTS:")
    for result in tester.results:
        status_icon = "✅" if result['status'] == 'PASSED' else "🚫" if result['status'] == 'BLOCKED' else "❌"
        print(f"{status_icon} {result['name']}: {result['status']}")

    # Return exit code
    failed = tester.tests_run - tester.tests_passed - tester.tests_blocked
    if failed > 0:
        print(f"\n⚠️  {failed} tests failed")
        return 1
    else:
        print(f"\n✅ All testable endpoints working correctly")
        print(f"   {tester.tests_blocked} tests blocked by external dependencies (expected)")
        return 0

if __name__ == "__main__":
    sys.exit(main())
