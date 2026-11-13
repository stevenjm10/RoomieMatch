from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_contract():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "roomiematch-api"}
    assert response.headers["x-content-type-options"] == "nosniff"


def test_unknown_route_is_not_success():
    assert client.get("/api/private").status_code == 404


def test_cors_only_allows_configured_origins():
    allowed = client.get("/api/health", headers={"Origin": "http://localhost:5173"})
    assert allowed.headers["access-control-allow-origin"] == "http://localhost:5173"
    denied = client.get("/api/health", headers={"Origin": "https://untrusted.example"})
    assert "access-control-allow-origin" not in denied.headers


def test_preflight_rejects_write_methods():
    response = client.options("/api/health", headers={
        "Origin": "http://localhost:5173", "Access-Control-Request-Method": "POST"
    })
    assert response.status_code == 400
