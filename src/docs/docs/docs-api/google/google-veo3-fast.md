# /docs/docs-api/google/google-veo3-fast

来源: https://wavespeed.ai/docs/docs-api/google/google-veo3-fast

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Google](/docs/docs-api/google/google-gemini-2.5-flash-image-edit "Google")Google Veo3 Fast

# Google Veo3 Fast

Google Veo3 Fast

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/google/veo3-fast)

Generate videos with Google Veo 3 Fast - faster and more cost-effective than standard Veo 3. Starting at $0.25/second. Commercial use allowed.

## Features[](#features)

# Google Veo 3 Fast AI Video Generator

**Veo 3 Fast** is a **high-speed, cost-efficient** version of Google’s Veo 3 model, built for creators who need cinematic results with synchronized audio in record time. It produces realistic **8-second clips** featuring dialogue, sound effects, and background music—all natively generated.

* * *

## Why it looks great[](#why-it-looks-great)

*   **Lightning-Fast Generation** ⚡ Produces 8-second cinematic videos up to **30% faster** than standard Veo 3.
    
*   **Budget-Friendly Efficiency** 💰 Up to **80% cost savings**, allowing **5× more videos** per budget unit.
    
*   **Cinematic Realism** 🎬 Generates coherent motion, expressive characters, and balanced lighting for film-like quality.
    
*   **Native Audio Sync** 🔊 Automatically includes ambient sounds, speech, and music perfectly matched to on-screen action.
    
*   **Character & Camera Consistency** 🎥 Supports reference-based continuity and stable camera direction for precise visual storytelling.
    

* * *

## Limits and Performance[](#limits-and-performance)

*   **Max duration per job:** 8 seconds
*   **Typical generation speed:** ~30 seconds per video
*   **Resolution:** up to **1080p**
*   **Audio:** synchronized voice, SFX, ambience, and background score
*   **Size:** 16:9 or 9:16

* * *

## Pricing[](#pricing)

Every run needs **$1.2** (both 720p and 1080p)

✅ **Commercial use allowed**

* * *

## How to Use[](#how-to-use)

1.  Write a **text prompt** describing your scene, characters, or story.
2.  Choose **duration** (up to 8 seconds).
3.  Run generation and preview your result.
4.  Download the MP4 file with synchronized audio.

* * *

## Pro Tips for Best Results[](#pro-tips-for-best-results)

*   Keep prompts **concise but cinematic**: specify lighting, motion, and emotion.
*   Use **reference images** for consistent characters across clips.
*   Combine **camera directions** (“slow zoom-in,” “tracking shot,” etc.) for dynamic composition.
*   Avoid overly complex multi-scene prompts—stick to one action or setting per clip.
*   If dialogue is critical, use quotation marks in the prompt for clearer speech output.

* * *

## Notes[](#notes)

*   Actual generation time may vary depending on queue and resolution.
*   Currently optimized for short-form content such as **trailers, vlogs, and viral videos**.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/google/veo3-fast" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "16:9",
    "duration": 8,
    "resolution": "720p",
    "generate_audio": false
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

prompt

string

Yes

\-

Text prompt for generation; Positive text prompt.

aspect\_ratio

string

No

16:9

16:9, 9:16

Aspect ratio of the video.

duration

integer

No

8

8

The duration of the generated media in seconds.

resolution

string

No

720p

720p, 1080p

Video resolution.

generate\_audio

boolean

No

false

\-

Generate audio for the video.

negative\_prompt

string

No

\-

Negative prompt for the generation.

seed

integer

No

\-

\-1 ~ 2147483647

The random seed to use for the generation.

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

[Google Veo3](/docs/docs-api/google/google-veo3 "Google Veo3")[Google Veo3 Fast Image To Video](/docs/docs-api/google/google-veo3-fast-image-to-video "Google Veo3 Fast Image To Video")