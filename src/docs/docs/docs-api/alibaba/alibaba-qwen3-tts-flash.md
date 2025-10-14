# /docs/docs-api/alibaba/alibaba-qwen3-tts-flash

来源: https://wavespeed.ai/docs/docs-api/alibaba/alibaba-qwen3-tts-flash

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Alibaba](/docs/docs-api/alibaba/alibaba-qwen-image-translate "Alibaba")Alibaba Qwen3 Tts Flash

# Alibaba Qwen3 Tts Flash

Alibaba Qwen3 Tts Flash

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/alibaba/qwen3-tts-flash)

Alibaba Qwen3 TTS Flash is a low-latency Text-to-Speech (TTS) model that supports English and Chinese with multiple voice styles. It is ideal for real-time voice interaction, product narration, and short‑form video dubbing.

## Features[](#features)

# Alibaba Qwen3 TTS Flash — Fast Text-to-Speech

Qwen3 TTS Flash is Alibaba’s low-latency, natural-sounding Text-to-Speech model that supports English and Chinese with multiple voice styles. It is designed for real-time conversations, product narration, and short-form video dubbing.

## Highlights[](#highlights)

*   Low latency / high concurrency for real-time interaction
*   Multi-language / multi-style voices (English/Chinese priority)
*   Parameter control: speed, pitch, volume, speaker (voice\_id), emotion
*   Production-ready: stable output, easy integration, common audio formats

## Input & Parameters[](#input--parameters)

*   text (string, required): The text to synthesize (recommended < 2000 characters per request)
*   voice\_id (string, optional): Voice style ID (e.g., qwen-female-1, qwen-male-1; see platform docs for the full list)
*   language (string, optional): Language code (en, zh)
*   speed (number, optional): Speaking rate, default 1.0 (range 0.5–2.0)
*   pitch (number, optional): Pitch adjustment, default 0
*   volume (number, optional): Output gain, default 0
*   emotion (string, optional): Voice emotion/style, e.g., neutral, happy, sad
*   sample\_rate (int, optional): Sample rate, default 22050 (e.g., 16000/22050/24000/44100)
*   format (string, optional): Output format, default mp3 (supports mp3, wav, ogg)

Note: The available speakers and parameter ranges depend on the platform configuration.

## Pricing[](#pricing)

*   Formula: total\_price = base\_price \* text\_length / 1000
*   Current base\_price: 1000 (unit depends on platform configuration)

## Example[](#example)

{ “model”: “alibaba/qwen3-tts-flash”, “input”: { “text”: “Hello, welcome to WaveSpeedAI!”, “voice\_id”: “qwen-female-1”, “language”: “en”, “speed”: 1.0, “format”: “mp3” } }

## Use Cases[](#use-cases)

*   Real-time conversational agents / voice replies
*   Short-form video, advertising, and e-commerce dubbing
*   App/IoT voice prompts and announcements
*   Education, customer service, and knowledge base narration

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/alibaba/qwen-image/translate" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "voice": "Cherry",
    "language_type": "Auto"
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

\-

\-

Text to translate

voice

string

Yes

Cherry

Cherry, Ethan, Nofish, Jennifer, Ryan, Katerina, Elias, Jada, Dylan, Sunny, li, Marcus, Roy, Peter, Rocky, Kiki, Eric

Voice name for translation

language\_type

string

No

Auto

Auto, Chinese, English, German, Italian, Portuguese, Spanish, Japanese, Korean, French, Russian, Thai

Language type for translation

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

[Alibaba Qwen Image Translate](/docs/docs-api/alibaba/alibaba-qwen-image-translate "Alibaba Qwen Image Translate")[Alibaba Wan 2.1 I2V Plus 720p](/docs/docs-api/alibaba/alibaba-wan-2.1-i2v-plus-720p "Alibaba Wan 2.1 I2V Plus 720p")