# rptapp
Manage your setlists

# Features
General functionally
- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRU* bands (Delete band when all members quit)
- CRUD musics 
- CR*D tags
- CRUD versions
- CRUD setlists
- Favorite musics
- Suggest musics for new setlist
- Done setlist

# Backend

## Introduction
A system to manage your setlists
Will be write in Typescript, using nodejs, postgres, prisma, express

## EndPoints

### Authentication Header
You can read the authentication header from the headers of the request
`Authorization: Token jwt.token.here`

### User

#### Authentication
`POST /api/users/login`
```json
{
    "email": "email@email.com",
    "password": "senha"
}
```
- Required fields: `email`, `password`
- No auth required

#### Registration
`POST /api/users`
```json
{
    "user": {
        "username": "username",
        "email": "email@email.com",
        "password": "senha"
    }
}
```
- Required fields: `email`, `username`, `password`
- Optional fields: `name`, `bio`,`imageUrl`
- Return: User [Created]
- No auth required

#### Get Current User
`GET /api/users`
- Return: User

#### Update User
`PUT /api/users`
```json
{
  "user": {
    "email": "email@email.com",
    "bio": "It's my life",
    "image": "https://i.stack.imgur.com/xHWG8.jpg"
  }
}
```
- Optional fields: `email`, `username`, `password`, `image`, `bio`
- Return: User

### Profile

#### List Profiles
`GET /api/profiles/`
- Return: Profile[]

#### Get Profile
`GET /api/profiles/:username`
- Return: Profile

### Band

#### Create Band
`POST /api/bands`
```json
{
    "band": {
        "name": "band",
        "description": "description"
    }
}
```
- Required fields: `name`
- Optional fields: `description`
- Return: Band [Created]

#### Get Band
`GET /api/bands/:bandId`
- Return: Band

#### List Bands
`GET /api/bands/`
- Return: Band[] by user

#### Update Band
`PUT /api/bands/:bandId`
```json
{
  "band": {
    "name": "email@email.com",
    "description": "It's my life"
  }
}
```
- Optional fields: `name`, `description`
- Return: [NoContent]

#### Add member on band
`POST /api/bands/:bandId/addMember/:username`
- Return: Band

#### Remove member on band
`POST /api/bands/:bandId/removeMember/:username`
- Return: Band

### Music

#### Create Music
`POST /api/bands/:bandId/musics/`
```json
{
    "music": {
        "name": "music",
        "artist": "artist",
        "tone": "C#",
        "isPlayed": true,
        "score": 0,
        "counterPlays": 0,
        "links": [
            {
                "url": "http://youtube.com/?v=1234",
                "description": "youtube"
            },
            {
                "url": "http://spotify.com.br/?v=1234",
                "description": "spotify"
            },
        ],
        "tags": ["tag1", "tag2"]
    }
}
```
- Required fields: `name`, `artist`, `tone`, `isPlayed`
- Optional fields: `links`, `tags`, `score`, `counter_plays`
- Return: Music [Created]

#### Get Music
`GET /api/bands/:bandId/musics/:musicId`
- Return: Music

#### List Musics
`GET /api/bands/:bandId/musics/`
- Return: Music[] by band
- Filter: `?played=true`, `?tag=tag`, `?artist=artist`, `?favorited=username`, `?tone=C#`, `?limit=20`, `?offset=0`
- OrderBy: `?orderBy=[score || alphabet || createdAt]`

#### Update Music
`PUT /api/bands/:bandId/musics/:musicId`
```json
{
    "music": {
        "name":"name"
    }
}
```
- Optional fields: `name`, `artist`, `tone`, `isPlayed`, `links`, `tags`, `score`, `counter_plays`
- Return: Music

#### Delete Music
`DELETE /api/bands/:bandId/musics/:musicId`
- Return: [NoContent]

#### Favorite Music
`POST /api/bands/:bandId/musics/:musicId/favorite`
- Return: [NoContent]

#### Unfavorite Music
`POST /api/bands/:bandId/musics/:musicId/unfavorite`
- Return: [NoContent]

### Version

#### Create Version
`POST /api/bands/:bandId/versions/`
```json
{
    "version": {
        "music": { "id": 1 },
        "singer": { "id": 1 },
        "tone": "C#m"
    }
}
```
- Required fields: `music`, `singer`, `tone`
- Return: Version [Created]

#### GetVersion
`GET /api/bands/:bandId/versions/:versionId`
- Return: Version

#### List Versions
`GET /api/bands/:bandId/versions` 
- Return: Version[] by band
- Filter: `?music=musicName`, `?singer=username`, `?tone=C#`, `?limit=20`, `?offset=0`
- OrderBy: `?orderBy=[score || alphabet || createdAt]`

#### Update Version
`PUT /api/bands/:bandId/versions/:versionId`
```json
{
    "version": {
        "tone": "C#"
    }
}
```
- Optional fields: `music`, `singer`, `tone`
- Return: Version

#### Delete Version
`DELETE /api/bands/:bandId/versions/:versionId`
- Return: [NoContent]

### Setlist

#### Create Setlist
`POST /api/bands/:bandId/setlists/`
```json
{
    "setlist": {
        "name": "name",
        "eventDate": "2021/01/01 19:00",
        "isDone": false
    }
}
```
- Required fields: `eventDate`
- Option fields: `name`, `isDone`
- Return: Setlist [Created]

#### Get Setlist
`GET /api/bands/:bandId/setlists/:setlistId`
- Return: Setlist

#### List Setlist (by played, by date) (order by date)
`GET /api/bands/:bandId/setlists` 
- Return: setlists[] by band
- Filter: `?music=musicName`, `?eventDate=2021/01/01`, `?isDone=false`, `?name=nameSetlist`, `?limit=20`, `?offset=0`
- OrderBy: `?orderBy=[eventDate || alphabet || createdAt]`

#### Update Setlist
`PUT /api/bands/:bandId/setlists/:setlistId`
```json
{
    "setlist": {
        "name": "newName"
    }
}
```
- Optional fields: `name`, `eventDate`
- Return: Setlist

#### Delete Setlist
`DELETE /api/bands/:bandId/setlists/:setlistId`
- Return: [NoContent]

#### Add version on Setlist
`POST /api/bands/:bandId/setlists/:setlistId/addVersion/:versionId`
- Return: Setlist

#### Remove version on Setlist
`POST /api/bands/:bandId/setlists/:setlistId/removeVersion/:versionId`
- Return: Setlist

#### Favorite Setlist
`POST /api/bands/:bandId/setlists/:setlistId/favorite`
- Return: [NoContent]

#### Unfavorite Setlist
`POST /api/bands/:bandId/setlists/:setlistId/unfavorite`
- Return: [NoContent]

#### Done Setlist
`POST /api/bands/:bandId/setlists/:setlistId/done`
- Return: Setlist

#### Undone Setlist
`POST /api/bands/:bandId/setlists/:setlistId/undone`
- Return: Setlist

### Tags

#### Get Tags
`GET /api/bands/:bandId/tags`
Return: Tag[]

## API Response format

### User (for authentication)
```json
{
    "user": {
        "username": "username",
        "email": "email@email.com",
        "name": null,
        "bio": "I am user",
        "image": "http://image.com"
    }
}
```

### Profile
```json
{
    "profile": {
        "username": "username",
        "bio": "I am user",
        "image": "http://image.com"
    }
}
```

### Multiple Profiles
```json
{
    "profiles": [
        {
            "username": "username1",
            "bio": "I am user1",
            "image": "http://image1.com"
        },
        {
            "username": "username2",
            "bio": "I am user2",
            "image": "http://image2.com"
        },
    ],
    "count": 2,
    "limite": 20,
    "offset": 0
}
```

### Band
```json
{
    "band": {
        "id": 1,
        "name": "band",
        "description": "description",
        "members": [
            {
                "username": "username1",
                "bio": "I am user1",
                "image": "http://image1.com"
            },
            {
                "username": "username2",
                "bio": "I am user2",
                "image": "http://image2.com"
            },
        ]
    }
}
```

### Multiple Bands
```json
{
    "bands": {
        {
            "id": 1,
            "name": "band1",
            "description": "description1"
        },
        {
            "id": 2,
            "name": "band2",
            "description": "description2"
        }
    },
    "count": 2,
    "limite": 20,
    "offset": 0
}
```

### Music
```json
{
    "music": {
        "id": 1,
        "name": "music",
        "artist": "artist",
        "tone": "C#",
        "isPlayed": true,
        "score": 0,
        "counterPlays": 0,
        "links": [
            {
                "url": "http://youtube.com/?v=1234",
                "description": "youtube"
            },
            {
                "url": "http://spotify.com.br/?v=1234",
                "description": "spotify"
            },
        ],
        "tags": ["tag1", "tag2"]
    }
}
```

### Multiple Musics
```json
{
    "musics": [
        {
            "id": 1,
            "name": "music1",
            "artist": "artist",
            "tone": "C#",
            "isPlayed": true,
            "score": 0,
            "counterPlays": 0,
            "links": [
                {
                    "url": "http://youtube.com/?v=12341",
                    "description": "youtube"
                },
                {
                    "url": "http://spotify.com.br/?v=12341",
                    "description": "spotify"
                },
            ],
            "tags": ["tag1", "tag2"]
        },
        {
            "id": 2,
            "name": "music2",
            "artist": "artist",
            "tone": "C#",
            "isPlayed": true,
            "score": 0,
            "counterPlays": 0,
            "links": [
                {
                    "url": "http://youtube.com/?v=12342",
                    "description": "youtube"
                },
                {
                    "url": "http://spotify.com.br/?v=12342",
                    "description": "spotify"
                },
            ],
            "tags": ["tag1", "tag2"]
        },
    ],
    "count": 2,
    "limite": 20,
    "offset": 0
}
```

### Version
```json
{
    "version": {
        "id": 1,
        "music": {
            "name": "music",
            "artist": "artist",
            "tone": "C#",
            "isPlayed": true,
            "score": 0,
            "counterPlays": 0,
            "links": [
                {
                    "url": "http://youtube.com/?v=1234",
                    "description": "youtube"
                },
                {
                    "url": "http://spotify.com.br/?v=1234",
                    "description": "spotify"
                },
            ],
            "tags": ["tag1", "tag2"]
        },
        "singer": {
            "username": "username",
            "bio": "I am user",
            "image": "http://image.com"
        },
        "tone": "C#m"
    }
}
```

### Multiple Versions
```json
{
    "versions": [
        {
            "id": 1,
            "music": {
                "name": "music",
                "artist": "artist",
                "tone": "C#",
                "isPlayed": true,
                "score": 0,
                "counterPlays": 0,
                "links": [
                    {
                        "url": "http://youtube.com/?v=1234",
                        "description": "youtube"
                    },
                    {
                        "url": "http://spotify.com.br/?v=1234",
                        "description": "spotify"
                    },
                ],
                "tags": ["tag1", "tag2"]
            },
            "singer": { 
                "username": "username",
                "bio": "I am user",
                "image": "http://image.com"
             },
            "tone": "C#m"
        },
        {
            "id": 2,
            "music": {
                "name": "music",
                "artist": "artist",
                "tone": "C#",
                "isPlayed": true,
                "score": 0,
                "counterPlays": 0,
                "links": [
                    {
                        "url": "http://youtube.com/?v=1234",
                        "description": "youtube"
                    },
                    {
                        "url": "http://spotify.com.br/?v=1234",
                        "description": "spotify"
                    },
                ],
                "tags": ["tag1", "tag2"]
            },
            "singer": { 
                "username": "username",
                "bio": "I am user",
                "image": "http://image.com"
             },
            "tone": "C#m"
        },
    ],
    "count": 2,
    "limite": 20,
    "offset": 0
}
```

### SetList
```json
{
    "setlist": {
        "name": "name1",
        "eventDate": "2021/01/01 19:00",
        "idDone": true,
        "versions": [
            {
                "id": 1,
                "music": {
                    "name": "music",
                    "artist": "artist",
                    "tone": "C#",
                    "isPlayed": true,
                    "score": 0,
                    "counterPlays": 0,
                    "links": [
                        {
                            "url": "http://youtube.com/?v=1234",
                            "description": "youtube"
                        },
                        {
                            "url": "http://spotify.com.br/?v=1234",
                            "description": "spotify"
                        },
                    ],
                    "tags": ["tag1", "tag2"]
                },
                "singer": { 
                    "username": "username",
                    "bio": "I am user",
                    "image": "http://image.com"
                },
                "tone": "C#m"
            },
            {
                "id": 2,
                "music": {
                    "name": "music",
                    "artist": "artist",
                    "tone": "C#",
                    "isPlayed": true,
                    "score": 0,
                    "counterPlays": 0,
                    "links": [
                        {
                            "url": "http://youtube.com/?v=1234",
                            "description": "youtube"
                        },
                        {
                            "url": "http://spotify.com.br/?v=1234",
                            "description": "spotify"
                        },
                    ],
                    "tags": ["tag1", "tag2"]
                },
                "singer": { 
                    "username": "username",
                    "bio": "I am user",
                    "image": "http://image.com"
                },
                "tone": "C#m"
            },
        ]
    }
}
```

### Multiple Settlist
```json
{
    "setlists": [
        "Multiple Setlists"
    ],
    "count": 2,
    "limite": 20,
    "offset": 0
}
```

### Multiple Tags
```json
{
    "tags": [
        "tag1",
        "tag2",
        "tag3",
    ]
}
```

## Error Handling
- Expect 422
```json
{
  "errors": {
    "body": [
      "can't be empty"
    ]
  }
}
```
- Expect 401 for Unauthorized
- Expect 403 for Forbidden (permission)
- Expect 404 for resource or endpoin not found

## CORS
- If the backend is about to run on a different host/port than the frontend, make sure to handle OPTIONS too and return correct `Access-Control-Allow-Origin` and `Access-Control-Allow-Headers` (e.g. `Content-Type`).

## Postman

## Tests
- Include at least one unit test in your repo to demonstrate how testing works
