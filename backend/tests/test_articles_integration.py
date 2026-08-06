import pytest


def create_user_and_token(client):
    register_payload = {
        'username': 'author1',
        'email': 'author1@example.com',
        'password': 'pass1234'
    }
    client.post('/api/auth/register', json=register_payload)
    rv = client.post('/api/auth/login', json={'email': register_payload['email'], 'password': register_payload['password']})
    token = rv.get_json()['access_token']
    return token


def test_article_crud_flow(client):
    token = create_user_and_token(client)

    article_payload = {
        'title': 'My Test Article',
        'slug': 'my-test-article',
        'content': 'This is a test article content ' * 10,
        'topic': 'testing',
    }

    rv = client.post('/api/articles', json=article_payload, headers={'Authorization': f'Bearer {token}'})
    assert rv.status_code == 201
    created = rv.get_json()
    assert created['slug'] == article_payload['slug']

    # get by slug
    rv = client.get(f"/api/articles/{article_payload['slug']}")
    assert rv.status_code == 200

    # patch article
    rv = client.patch(f"/api/articles/{article_payload['slug']}", json={'title': 'Updated'}, headers={'Authorization': f'Bearer {token}'})
    assert rv.status_code == 200
    assert rv.get_json()['title'] == 'Updated'

    # delete
    rv = client.delete(f"/api/articles/{article_payload['slug']}", headers={'Authorization': f'Bearer {token}'})
    assert rv.status_code == 204

    # ensure deleted
    rv = client.get(f"/api/articles/{article_payload['slug']}")
    assert rv.status_code == 404
