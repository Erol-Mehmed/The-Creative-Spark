import pytest


def register_and_login(client):
    register_payload = {
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'secret123'
    }

    rv = client.post('/api/auth/register', json=register_payload)
    assert rv.status_code == 201

    rv = client.post('/api/auth/login', json={'email': register_payload['email'], 'password': register_payload['password']})
    assert rv.status_code == 200
    token = rv.get_json()['access_token']

    # use token to fetch me
    rv = client.get('/api/auth/me', headers={'Authorization': f'Bearer {token}'})
    assert rv.status_code == 200
    data = rv.get_json()
    assert data['username'] == 'testuser'


def test_register_login_and_me_flow(client):
    register_and_login(client)
