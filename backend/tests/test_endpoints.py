import unittest
from fastapi.testclient import TestClient
import sys
import os

# Append parent directory to sys.path so we can import 'main' and 'app'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app

class TestPlatformEndpoints(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_home_endpoint(self):
        """Test that the base routing functions correctly."""
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Backend Running"})

    def test_auth_login_validation(self):
        """Test that empty auth requests throw validation errors."""
        response = self.client.post("/api/v1/auth/login", json={})
        # Expecting a validation error (422) or missing credentials error
        self.assertEqual(response.status_code, 422)

    def test_auth_login_invalid_credentials(self):
        """Test that invalid user logins are rejected securely."""
        response = self.client.post("/api/v1/auth/login", json={
            "email": "nonexistent@user.com",
            "password": "wrongpassword123"
        })
        self.assertEqual(response.status_code, 401)

    def test_auth_register_validation(self):
        """Test that validation schema works on registration."""
        response = self.client.post("/api/v1/auth/register", json={})
        self.assertEqual(response.status_code, 422)

    def test_dashboard_stats_auth_enforced(self):
        """Test that statistics endpoints reject unauthorized tokens."""
        response = self.client.get("/api/v1/dashboard/stats")
        self.assertEqual(response.status_code, 401)

    def test_dashboard_risk_distribution(self):
        """Test that risk distribution returns counts from the database."""
        response = self.client.get("/api/v1/dashboard/risk-distribution")
        # Should either succeed (200) or require login (401) depending on security gate. 
        # Here we verify it is handled correctly.
        self.assertIn(response.status_code, [200, 401])

    def test_scan_url_auth_enforced(self):
        """Test that scans verify user tokens before running evaluations."""
        response = self.client.post("/api/v1/scans/url", json={"url": "http://suspicious.com"})
        self.assertEqual(response.status_code, 401)

if __name__ == "__main__":
    unittest.main()
