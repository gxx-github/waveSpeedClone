# /docs/docs-api/kwaivgi/kwaivgi-kling-effects

来源: https://wavespeed.ai/docs/docs-api/kwaivgi/kwaivgi-kling-effects

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")KwaivgiKwaivgi Kling Effects

# Kwaivgi Kling Effects

Kwaivgi Kling Effects

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/kwaivgi/kling-effects)

Kling effects is an AI-powered video generation model that creates stunning 5-second videos from a single image. It’s perfect for creating engaging social media content, product showcases, and more. With its advanced technology, the model can generate a wide range of styles and effects, from futuristic and abstract to realistic and cinematic.

## Features[](#features)

# Kling Effects

Kling effects is an AI-powered video generation model that creates stunning 5-second videos from a single image. It’s perfect for creating engaging social media content, product showcases, and more. With its advanced technology, the model can generate a wide range of styles and effects, from futuristic and abstract to realistic and cinematic.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/kwaivgi/kling-effects" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{}'

# Get the result
curl --location --request GET "https://api.wavespeed.ai/v3/predictions/${requestId}/result" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}"
```

## Parameters[](#parameters)

### Task Submission Parameters[](#task-submission-parameters)

#### Request Parameters[](#request-parameters)

Parameter

Type

Required

Default

Range

Description

effect\_scene

string

Yes

\-

emoji, let's\_ride, snatched, magic\_broom, felt\_felt, jumpdrop, celebration, splashsplash, hula, surfsurf, fairy\_wing, angel\_wing, dark\_wing, skateskate, plushcut, jelly\_press, jelly\_slice, jelly\_squish, jelly\_jiggle, pixelpixel, yearbook, instant\_film, anime\_figure, rocketrocket, bloombloom, dizzydizzy, fuzzyfuzzy, squish, expansion, santa\_gifts, santa\_hug, girlfriend, boylfriend, heart\_gesture\_1, pet\_wizard, pet\_lion, smoke\_smoke, thumbs\_up, pet\_chef, pet\_delivery, instant\_kid, dollar\_rain, cry\_cry, building\_collapse, gun\_shot, mushroom, double\_gun, pet\_warrior, lightning\_power, jesus\_hug, magic\_fireball, shark\_alert, long\_hair, lie\_flat, polar\_bear\_hug, brown\_bear\_hug, jazz\_jazz, offic\_escape\_plow, fly\_fly, watermelon\_bomb, pet\_dance, boss\_coming, wool\_curly, iron\_warrior, pet\_moto\_rider, pet\_bee, marry\_me, swing\_swing, day\_to\_night, piggy\_morph, wig\_out, car\_explosion, ski\_ski, tiger\_hug, siblings, construction\_worker, media\_interview

Effect scene

image

string

Yes

\-

Image URL or Base64 encoding, in the format of data:image/png;base64,...

#### Response Parameters[](#response-parameters)

Parameter

Type

Description

code

integer

HTTP status code (e.g., 200 for success)

message

string

Status message (e.g., “success”)

data.id

string

Unique identifier for the prediction, Task Id

data.model

string

Model ID used for the prediction

data.outputs

array

Array of URLs to the generated content (empty when status is not `completed`)

data.urls

object

Object containing related API endpoints

data.urls.get

string

URL to retrieve the prediction result

data.has\_nsfw\_contents

array

Array of boolean values indicating NSFW detection for each output

data.status

string

Status of the task: `created`, `processing`, `completed`, or `failed`

data.created\_at

string

ISO timestamp of when the request was created (e.g., “2023-04-01T12:34:56.789Z”)

data.error

string

Error message (empty if no error occurred)

data.timings

object

Object containing timing details

data.timings.inference

integer

Inference time in milliseconds

#### Result Request Parameters[](#result-request-parameters)

[Minimax Voice Design](/docs/docs-api/minimax/minimax-voice-design "Minimax Voice Design")[Kwaivgi Kling Lipsync Audio To Video](/docs/docs-api/kwaivgi/kwaivgi-kling-lipsync-audio-to-video "Kwaivgi Kling Lipsync Audio To Video")