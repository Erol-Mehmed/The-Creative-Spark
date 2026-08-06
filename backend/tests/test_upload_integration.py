import pytest


def test_upload_endpoint_mocked(monkeypatch, client):
    # mock cloudinary uploader
    def fake_upload(file, folder=None):
        return {'secure_url': 'http://res.cloudinary/fake.jpg'}

    import cloudinary.uploader as uploader
    monkeypatch.setattr(uploader, 'upload', fake_upload)

    # create user and token
    client.post('/api/auth/register', json={'username':'u2','email':'u2@example.com','password':'pass1234'})
    rv = client.post('/api/auth/login', json={'email':'u2@example.com','password':'pass1234'})
    token = rv.get_json()['access_token']

    data = {
        'image': (bytes('fake', 'utf-8'), 'test.jpg')
    }

    # use files upload via test client
    from io import BytesIO
    file = (BytesIO(b'abc'), 'test.jpg')
    rv = client.post('/api/uploads/users', data={'image': file}, content_type='multipart/form-data', headers={'Authorization': f'Bearer {token}'})
    assert rv.status_code == 201
    assert rv.get_json()['image_url'].startswith('http')
