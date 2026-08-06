def register_login_get_token(client, username='patcher'):
    reg = {'username': username, 'email': f'{username}@example.com', 'password': 'pass1234'}
    client.post('/api/auth/register', json=reg)
    rv = client.post('/api/auth/login', json={'email': reg['email'], 'password': reg['password']})
    return rv.get_json()['access_token']


def test_patch_me_updates_profile(client):
    token = register_login_get_token(client)

    payload = {
        'first_name': 'Alice',
        'last_name': 'Smith',
        'bio': 'I like writing',
        'image_url': 'http://example.com/img.jpg'
    }

    rv = client.patch('/api/auth/me', json=payload, headers={'Authorization': f'Bearer {token}'})
    assert rv.status_code == 200
    data = rv.get_json()
    assert data['first_name'] == 'Alice'
    assert data['last_name'] == 'Smith'
    assert data['bio'] == 'I like writing'
    assert data['image_url'] == 'http://example.com/img.jpg'
