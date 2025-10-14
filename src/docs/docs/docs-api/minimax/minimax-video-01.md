# /docs/docs-api/minimax/minimax-video-01

来源: https://wavespeed.ai/docs/docs-api/minimax/minimax-video-01

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Minimax](/docs/docs-api/minimax/minimax-hailuo-02-fast "Minimax")Minimax Video 01

# Minimax Video 01

Minimax Video 01

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/minimax/video-01)

Hailuo Video-01 boasts high compression rates, excellent text responsiveness, and diverse styles, while supporting native high resolution and high frame rate videos, comparable to cinematic quality.

## Features[](#features)

# Hailuo Video-01

**video-01** is MiniMax’s first officially released AI-native video generation model. It is designed to produce visually compelling, high-definition short videos from either text prompts or image inputs.

### Key Features[](#key-features)

*   **720p Resolution at 25fps**  
    Generates high-definition videos with smooth motion and cinematic quality.
    
*   **Cinematic Camera Movements**  
    Built-in camera effects create dynamic and engaging storytelling visuals.
    
*   **Text-to-Video & Image-to-Video Modes**  
    Supports both pure text input and hybrid text + image input workflows.
    
*   **High Text Responsiveness**  
    Understands and reflects nuanced text prompts accurately in the visual output.
    
*   **High Compression Efficiency**  
    Optimized for fast rendering and lower resource consumption without compromising quality.
    
*   **Diverse Visual Styles**  
    Adapts to a wide range of aesthetics, from realistic to stylized video generations.
    
*   **Native High Resolution and Frame Rate**  
    Capable of producing content that approaches cinematic standards in visual fidelity.
    

### Current Limitations[](#current-limitations)

*   **Video Duration**: Up to 6 seconds.  
    (Upcoming versions will expand support to 10-second videos.)

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/minimax/video-01" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "enable_prompt_expansion": true
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

The positive prompt for the generation.

image

string

No

\-

The model generates video with the picture passed in as the first frame.Base64 encoded strings in data:image/jpeg; base64,{data} format for incoming images, or URLs accessible via the public network. The uploaded image needs to meet the following conditions: Format is JPG/JPEG/PNG; The aspect ratio is greater than 2:5 and less than 5:2; Short side pixels greater than 300px; The image file size cannot exceed 20MB.

enable\_prompt\_expansion

boolean

No

true

\-

The model automatically optimizes incoming prompts to improve build quality.

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

[Minimax Speech Voice ID](/docs/docs-api/minimax/minimax_speech_voice_id "Minimax Speech Voice ID")[Minimax Video 02](/docs/docs-api/minimax/minimax-video-02 "Minimax Video 02")