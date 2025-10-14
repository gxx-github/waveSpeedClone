# /docs/docs-api/minimax/minimax-speech-02-turbo

来源: https://wavespeed.ai/docs/docs-api/minimax/minimax-speech-02-turbo

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Minimax](/docs/docs-api/minimax/minimax-hailuo-02-fast "Minimax")Minimax Speech 02 Turbo

# Minimax Speech 02 Turbo

Minimax Speech 02 Turbo

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/minimax/speech-02-turbo)

MiniMax’s high-definition text-to-speech model, Your request will cost $0.03 per 1000 characters.

## Features[](#features)

MiniMax’s high-definition text-to-speech model with natural pronunciation and clear articulation. Features multiple voice options, adjustable speed, volume, and pitch controls for professional-grade audio generation.

We offer a rich, built-in library of multi-lingual voices. For a detailed list, please refer to [this document](https://wavespeed.ai/docs/docs-api/minimax/minimax_speech_voice_id).

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/minimax/speech-02-turbo" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "text": "Hello world! This is a test of the text-to-speech system.",
    "speed": 1,
    "volume": 1,
    "pitch": 0,
    "emotion": "happy",
    "english_normalization": false,
    "enable_sync_mode": false
}'

# Get the result
curl --location --request GET "https://api.wavespeed.ai/api/v3/predictions/${requestId}/result" \
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

text

string

Yes

Hello world! This is a test of the text-to-speech system.

\-

Text to convert to speech. Every character is 1 token. Maximum 10000 characters. Use <#x#> between words to control pause duration (0.01-99.99s).

voice\_id

string

Yes

\-

\-

Desired voice ID. Use a voice ID you have trained (https://wavespeed.ai/models/minimax/voice-clone), or one of the following system voice IDs: Wise\_Woman, Friendly\_Person, Inspirational\_girl, Deep\_Voice\_Man, Calm\_Woman, Casual\_Guy, Lively\_Girl, Patient\_Man, Young\_Knight, Determined\_Man, Lovely\_Girl, Decent\_Boy, Imposing\_Manner, Elegant\_Man, Abbess, Sweet\_Girl\_2, Exuberant\_Girl.

speed

number

No

1

0.50 ~ 2.00

Speech speed. Range: 0.5-2.0, where 1.0 is normal speed.

volume

number

No

1

0.10 ~ 10.00

Speech volume. Range: 0.1-10.0, where 1.0 is normal volume.

pitch

number

No

\-

\-12 ~ 12

Speech pitch. Range: -12 to 12, where 0 is normal pitch.

emotion

string

No

happy

happy, sad, angry, fearful, disgusted, surprised, neutral

The emotion of the generated speech.

english\_normalization

boolean

No

false

\-

This parameter supports English text normalization, which improves performance in number-reading scenarios.

sample\_rate

integer

No

\-

8000, 16000, 22050, 24000, 32000, 44100

Sample rate of generated sound.

bitrate

integer

No

\-

32000, 64000, 128000, 256000

Bitrate of generated sound.

channel

string

No

\-

1, 2

The number of channels of the generated audio. 1: mono, 2: stereo.

format

string

No

\-

mp3, wav, pcm, flac

Format of generated sound.

language\_boost

string

No

\-

Chinese, Chinese,Yue, English, Arabic, Russian, Spanish, French, Portuguese, German, Turkish, Dutch, Ukrainian, Vietnamese, Indonesian, Japanese, Italian, Korean, Thai, Polish, Romanian, Greek, Czech, Finnish, Hindi, auto

Enhance the ability to recognize specified languages and dialects.

enable\_sync\_mode

boolean

No

false

\-

If set to true, the function will wait for the image to be generated and uploaded before returning the response. It allows you to get the image directly in the response. This property is only available through the API.

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

[Minimax Speech 02 Hd](/docs/docs-api/minimax/minimax-speech-02-hd "Minimax Speech 02 Hd")[Minimax Speech 2.5 Hd Preview](/docs/docs-api/minimax/minimax-speech-2.5-hd-preview "Minimax Speech 2.5 Hd Preview")