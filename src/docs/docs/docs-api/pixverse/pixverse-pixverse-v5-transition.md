# /docs/docs-api/pixverse/pixverse-pixverse-v5-transition

来源: https://wavespeed.ai/docs/docs-api/pixverse/pixverse-pixverse-v5-transition

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Pixverse](/docs/docs-api/pixverse/pixverse-lipsync "Pixverse")Pixverse Pixverse V5 Transition

# Pixverse Pixverse V5 Transition

Pixverse Pixverse V5 Transition

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/pixverse/pixverse-v5-transition)

Create a smooth transition animation between two static images. Generate a surprising morph from the starting frame to the ending frame. AI Assistant. For 5s video your request will cost $0.15 for 360p and 540p, $0.2 for 720p and $0.4 for 1080p. For 8s video your request will cost $0.3 for 360p and 540p, $0.4 for 720p and $0.8 for 1080p.

## Features[](#features)

# PixVerse v5 Transition

## Features[](#features-1)

### High-Quality Video Generation[](#high-quality-video-generation)

*   Multiple resolution options (360p to 1080p)
*   Various aspect ratios (16:9, 4:3, 1:1, 3:4, 9:16)
*   Adjustable motion modes (normal/fast)

### Flexible Duration[](#flexible-duration)

*   5 seconds (all resolutions)
*   8 seconds (up to 1080p)

### Requirements[](#requirements)

### Prompt[](#prompt)

*   Maximum length: 2048 characters
*   Clear description of desired scene and motion

### Resolution Options[](#resolution-options)

*   360p (Turbo mode)
*   540p
*   720p
*   1080p

### Motion Modes[](#motion-modes)

*   Normal: Standard motion
*   Fast: Quick transitions (5s videos only)

## Best Practices[](#best-practices)

1.  Use clear, detailed prompts
2.  Consider resolution limitations
3.  Match duration with quality needs
4.  Use appropriate aspect ratio
5.  Test different motion modes

## Limitations[](#limitations)

*   Fast motion only for 5s videos
*   Template ID requires activation

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/pixverse/pixverse-v5-transition" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "16:9",
    "duration": 5,
    "resolution": "540p"
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

Yes

\-

The model generates video with the picture passed in as the first frame.Base64 encoded strings in data:image/jpeg; base64,{data} format for incoming images, or URLs accessible via the public network. The uploaded image needs to meet the following conditions: Format is JPG/JPEG/PNG; The aspect ratio is greater than 2:5 and less than 5:2; Short side pixels greater than 300px; The image file size cannot exceed 20MB.

end\_image

string

Yes

\-

\-

The model generates video with the picture passed in as the last frame.Base64 encoded strings in data:image/jpeg; base64,{data} format for incoming images, or URLs accessible via the public network. The uploaded image needs to meet the following conditions: Format is JPG/JPEG/PNG; The aspect ratio is greater than 2:5 and less than 5:2; Short side pixels greater than 300px; The image file size cannot exceed 20MB.

aspect\_ratio

string

No

16:9

16:9, 1:1, 4:3, 3:4, 9:16

The aspect ratio of the generated media.

duration

integer

No

5

5, 8

Video duration in seconds.

resolution

string

No

540p

360p, 540p, 720p, 1080p

Video quality (360p/540p/720p/1080p).

negative\_prompt

string

No

\-

The negative prompt for the generation.

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

[Pixverse Pixverse V5 T2V](/docs/docs-api/pixverse/pixverse-pixverse-v5-t2v "Pixverse Pixverse V5 T2V")[Ideogram AI Ideogram Character](/docs/docs-api/ideogram-ai/ideogram-ai-ideogram-character "Ideogram AI Ideogram Character")