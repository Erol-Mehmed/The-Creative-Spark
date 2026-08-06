def create_user_and_article(client, username='owner'):
    reg = {'username': username, 'email': f'{username}@example.com', 'password': 'pass1234'}
    client.post('/api/auth/register', json=reg)
    rv = client.post('/api/auth/login', json={'email': reg['email'], 'password': reg['password']})
    token = rv.get_json()['access_token']

    payload = {
        'title': 'Owner article',
        'slug': f'{username.lower()}-article-test',
        'content': 'Content ' * 50,
        'topic': 'test',
    }

    rv = client.post('/api/articles', json=payload, headers={'Authorization': f'Bearer {token}'})
    assert rv.status_code == 201

    return token, payload['slug']


def test_non_owner_cannot_patch(client):
    owner_token, article_slug = create_user_and_article(client, 'ownerX')

    # create another user
    client.post('/api/auth/register', json={'username':'other','email':'other@example.com','password':'pass1234'})
    rv = client.post('/api/auth/login', json={'email':'other@example.com','password':'pass1234'})
    other_token = rv.get_json()['access_token']

    rv = client.patch(f'/api/articles/{article_slug}', json={'title': 'Hacked'}, headers={'Authorization': f'Bearer {other_token}'})
    assert rv.status_code == 403
