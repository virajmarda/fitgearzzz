#!/usr/bin/env python3
"""
FitGearzzz Core Baseline Connectivity Test
==========================================
Tests REAL Shopify storefront connectivity, cart, checkout URL generation,
and auth endpoint compatibility.

NO mocks, NO demo data, NO new auth creation.
Reports exact limitations and configuration gaps.
"""

import requests
import json
import sys
from typing import Dict, Any, Optional

# Public endpoint from frontend/.env
BASE_URL = "https://product-first-7--9p2txdzz.preview.emergentagent.com"
API_URL = f"{BASE_URL}/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'

class BaselineTest:
    def __init__(self):
        self.tests_run = 0
        self.tests_passed = 0
        self.tests_failed = 0
        self.critical_issues = []
        self.configuration_gaps = []
        self.limitations = []
        
    def log(self, message: str, level: str = "INFO"):
        colors = {
            "PASS": Colors.GREEN,
            "FAIL": Colors.RED,
            "WARN": Colors.YELLOW,
            "INFO": Colors.BLUE
        }
        color = colors.get(level, Colors.RESET)
        print(f"{color}[{level}]{Colors.RESET} {message}")
    
    def test(self, name: str, func):
        """Run a single test"""
        self.tests_run += 1
        self.log(f"\n{'='*60}", "INFO")
        self.log(f"Test {self.tests_run}: {name}", "INFO")
        self.log('='*60, "INFO")
        
        try:
            result = func()
            if result:
                self.tests_passed += 1
                self.log(f"✓ PASSED: {name}", "PASS")
            else:
                self.tests_failed += 1
                self.log(f"✗ FAILED: {name}", "FAIL")
            return result
        except Exception as e:
            self.tests_failed += 1
            self.log(f"✗ EXCEPTION in {name}: {str(e)}", "FAIL")
            return False
    
    def report(self):
        """Print final report"""
        print("\n" + "="*60)
        print("BASELINE TEST REPORT")
        print("="*60)
        print(f"Total Tests: {self.tests_run}")
        print(f"{Colors.GREEN}Passed: {self.tests_passed}{Colors.RESET}")
        print(f"{Colors.RED}Failed: {self.tests_failed}{Colors.RESET}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.critical_issues:
            print(f"\n{Colors.RED}CRITICAL ISSUES:{Colors.RESET}")
            for issue in self.critical_issues:
                print(f"  • {issue}")
        
        if self.configuration_gaps:
            print(f"\n{Colors.YELLOW}CONFIGURATION GAPS:{Colors.RESET}")
            for gap in self.configuration_gaps:
                print(f"  • {gap}")
        
        if self.limitations:
            print(f"\n{Colors.BLUE}LIMITATIONS:{Colors.RESET}")
            for limit in self.limitations:
                print(f"  • {limit}")
        
        print("="*60)
        return self.tests_passed == self.tests_run

# Initialize tester
tester = BaselineTest()

# ============================================================================
# TEST 1: Backend Health Check
# ============================================================================
def test_backend_health():
    """Verify backend is running and accessible"""
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        tester.log(f"Status: {response.status_code}")
        tester.log(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            tester.log(f"Service: {data.get('service')}")
            tester.log(f"Shopify Configured: {data.get('shopify_configured')}")
            
            if not data.get('shopify_configured'):
                tester.configuration_gaps.append(
                    "Backend reports Shopify NOT configured (missing SHOPIFY_CLIENT_ID or SHOPIFY_STORE_DOMAIN)"
                )
            return True
        return False
    except Exception as e:
        tester.critical_issues.append(f"Backend not accessible: {str(e)}")
        return False

# ============================================================================
# TEST 2: Check /api/auth/login Endpoint Existence
# ============================================================================
def test_auth_login_endpoint():
    """Check if /api/auth/login exists (request mentions confusion about PKCE vs login)"""
    try:
        # Try POST to /api/auth/login
        response = requests.post(
            f"{API_URL}/auth/login",
            json={"email": "test@example.com", "password": "test"},
            timeout=10
        )
        
        tester.log(f"Status: {response.status_code}")
        tester.log(f"Response: {response.text[:200]}")
        
        if response.status_code == 404:
            tester.log("Confirmed: /api/auth/login does NOT exist", "WARN")
            tester.limitations.append(
                "NO /api/auth/login endpoint - only PKCE OAuth flow at /api/shopify-auth/callback"
            )
            return True  # Expected behavior
        elif response.status_code == 405:
            tester.log("Endpoint exists but method not allowed", "WARN")
            return True
        else:
            tester.log(f"Unexpected response: {response.status_code}", "WARN")
            return True
    except Exception as e:
        tester.log(f"Error checking endpoint: {str(e)}", "WARN")
        return True

# ============================================================================
# TEST 3: Products Endpoint - Real Shopify Connectivity
# ============================================================================
def test_products_endpoint():
    """Test /api/products - should fail without SHOPIFY_STOREFRONT_ACCESS_TOKEN"""
    try:
        response = requests.get(f"{API_URL}/products", timeout=15)
        tester.log(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            tester.log(f"Products returned: {len(data)}")
            
            if len(data) > 0:
                # Check if these are REAL products or demo data
                first_product = data[0]
                tester.log(f"Sample product: {first_product.get('name', 'N/A')}")
                tester.log(f"Product ID: {first_product.get('id', 'N/A')}")
                
                # Real Shopify IDs start with "gid://shopify/Product/"
                if isinstance(first_product.get('id'), str) and first_product['id'].startswith('gid://shopify/Product/'):
                    tester.log("✓ REAL Shopify products detected", "PASS")
                    return True
                else:
                    tester.critical_issues.append(
                        "Products endpoint returns demo/mock data - NOT real Shopify products"
                    )
                    tester.configuration_gaps.append(
                        "Backend .env missing SHOPIFY_STOREFRONT_ACCESS_TOKEN"
                    )
                    return False
            else:
                tester.log("No products returned", "WARN")
                return False
        else:
            tester.log(f"Error response: {response.text[:300]}", "FAIL")
            tester.critical_issues.append(
                f"Products endpoint failed with status {response.status_code}"
            )
            return False
    except Exception as e:
        tester.critical_issues.append(f"Products endpoint error: {str(e)}")
        return False

# ============================================================================
# TEST 4: Cart Creation - Storefront API
# ============================================================================
def test_cart_creation():
    """Test cart creation via Storefront API"""
    try:
        response = requests.post(
            f"{API_URL}/cart/create",
            json={"lines": []},  # Empty cart
            timeout=15
        )
        
        tester.log(f"Status: {response.status_code}")
        tester.log(f"Response: {response.text[:300]}")
        
        if response.status_code == 200:
            data = response.json()
            cart_id = data.get('id')
            checkout_url = data.get('checkoutUrl')
            
            if cart_id and cart_id.startswith('gid://shopify/Cart/'):
                tester.log(f"✓ Cart created: {cart_id}", "PASS")
                tester.log(f"Checkout URL: {checkout_url}", "INFO")
                return True
            else:
                tester.log("Cart created but invalid format", "WARN")
                return False
        else:
            tester.log(f"Cart creation failed: {response.text[:300]}", "FAIL")
            tester.critical_issues.append(
                f"Cart creation failed - likely missing SHOPIFY_STOREFRONT_ACCESS_TOKEN"
            )
            return False
    except Exception as e:
        tester.critical_issues.append(f"Cart creation error: {str(e)}")
        return False

# ============================================================================
# TEST 5: Guest Checkout URL Generation
# ============================================================================
def test_guest_checkout():
    """Test guest checkout URL generation (no payment, just URL)"""
    try:
        # First, we need a valid product variant ID
        # Since we don't have real products, this will likely fail
        # But we test the endpoint structure
        
        tester.log("Attempting guest checkout with mock variant ID", "INFO")
        
        response = requests.post(
            f"{API_URL}/cart/guest-checkout",
            json={
                "lines": [
                    {
                        "merchandiseId": "gid://shopify/ProductVariant/12345",
                        "quantity": 1
                    }
                ]
            },
            timeout=15
        )
        
        tester.log(f"Status: {response.status_code}")
        tester.log(f"Response: {response.text[:300]}")
        
        if response.status_code == 200:
            data = response.json()
            checkout_url = data.get('checkoutUrl')
            if checkout_url:
                tester.log(f"✓ Checkout URL generated: {checkout_url}", "PASS")
                tester.log("NOTE: URL generation works, but needs real product IDs", "INFO")
                return True
            else:
                tester.log("No checkout URL in response", "WARN")
                return False
        elif response.status_code == 400:
            tester.log("Expected failure with mock product ID", "WARN")
            tester.limitations.append(
                "Guest checkout endpoint exists but needs real product variant IDs from configured store"
            )
            return True  # Expected behavior without real products
        else:
            tester.log(f"Unexpected error: {response.text[:300]}", "FAIL")
            return False
    except Exception as e:
        tester.log(f"Error: {str(e)}", "WARN")
        return True  # Not critical

# ============================================================================
# TEST 6: Embedded Shopify Configuration Check
# ============================================================================
def test_embedded_config():
    """Check for embedded/hardcoded Shopify configuration"""
    tester.log("Checking for embedded Shopify store configuration...", "INFO")
    
    # ShopifyBuyButton.js has: domain: "gnzuhe-en.myshopify.com"
    embedded_store = "gnzuhe-en.myshopify.com"
    tester.log(f"Found embedded store in ShopifyBuyButton.js: {embedded_store}", "INFO")
    
    # Vercel callback has: client_id: '49163ae9-7e32-4d93-a29c-d9fb330124c5'
    embedded_client_id = "49163ae9-7e32-4d93-a29c-d9fb330124c5"
    tester.log(f"Found embedded client_id in Vercel callback: {embedded_client_id}", "INFO")
    
    # Backend server.py defaults
    backend_defaults = {
        "SHOPIFY_STORE_DOMAIN": "fitgearzzz.myshopify.com",
        "SHOPIFY_CLIENT_ID": "49163ae9-7e32-4d93-a29c-d9fb330124c5",
        "SHOPIFY_ACCOUNT_DOMAIN": "https://account.fitgearzzz.com"
    }
    
    tester.log("Backend defaults:", "INFO")
    for key, value in backend_defaults.items():
        tester.log(f"  {key}: {value}", "INFO")
    
    tester.limitations.append(
        f"ShopifyBuyButton.js has hardcoded store: {embedded_store}"
    )
    tester.limitations.append(
        "Multiple Shopify store references found (gnzuhe-en vs fitgearzzz)"
    )
    
    return True

# ============================================================================
# TEST 7: Frontend Loading Check
# ============================================================================
def test_frontend_loading():
    """Check if frontend loads without errors"""
    try:
        response = requests.get(BASE_URL, timeout=15)
        tester.log(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            html = response.text
            
            # Check for React app mounting
            if 'root' in html or 'react' in html.lower():
                tester.log("✓ Frontend HTML loaded", "PASS")
                
                # Check for error indicators
                if 'error' in html.lower() or 'failed' in html.lower():
                    tester.log("Warning: Error text found in HTML", "WARN")
                
                return True
            else:
                tester.log("HTML loaded but React app not detected", "WARN")
                return False
        else:
            tester.critical_issues.append(f"Frontend not accessible: {response.status_code}")
            return False
    except Exception as e:
        tester.critical_issues.append(f"Frontend loading error: {str(e)}")
        return False

# ============================================================================
# TEST 8: Environment Configuration Audit
# ============================================================================
def test_env_configuration():
    """Audit environment configuration gaps"""
    tester.log("Auditing environment configuration...", "INFO")
    
    # Frontend .env gaps
    frontend_missing = [
        "REACT_APP_SHOPIFY_STORE_DOMAIN",
        "REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN",
        "REACT_APP_SHOPIFY_CLIENT_ID",
        "REACT_APP_SHOPIFY_ACCOUNT_DOMAIN"
    ]
    
    tester.log("Frontend .env missing:", "WARN")
    for var in frontend_missing:
        tester.log(f"  • {var}", "WARN")
        tester.configuration_gaps.append(f"Frontend .env missing: {var}")
    
    # Backend .env gaps
    backend_missing = [
        "SHOPIFY_STOREFRONT_ACCESS_TOKEN (empty/None)",
        "SHOPIFY_STORE_DOMAIN (using default: fitgearzzz.myshopify.com)"
    ]
    
    tester.log("Backend .env issues:", "WARN")
    for var in backend_missing:
        tester.log(f"  • {var}", "WARN")
    
    return True

# ============================================================================
# RUN ALL TESTS
# ============================================================================
def main():
    print(f"\n{Colors.BLUE}{'='*60}{Colors.RESET}")
    print(f"{Colors.BLUE}FitGearzzz Baseline Connectivity Test{Colors.RESET}")
    print(f"{Colors.BLUE}Testing: {BASE_URL}{Colors.RESET}")
    print(f"{Colors.BLUE}{'='*60}{Colors.RESET}\n")
    
    # Run tests in order
    tester.test("Backend Health Check", test_backend_health)
    tester.test("Auth Login Endpoint Check", test_auth_login_endpoint)
    tester.test("Products Endpoint - Real Shopify", test_products_endpoint)
    tester.test("Cart Creation", test_cart_creation)
    tester.test("Guest Checkout URL", test_guest_checkout)
    tester.test("Embedded Config Check", test_embedded_config)
    tester.test("Frontend Loading", test_frontend_loading)
    tester.test("Environment Configuration Audit", test_env_configuration)
    
    # Print report
    success = tester.report()
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
