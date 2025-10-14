# /docs/docs-api/pixverse/pixverse-pixverse-v5-effects

来源: https://wavespeed.ai/docs/docs-api/pixverse/pixverse-pixverse-v5-effects

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Pixverse](/docs/docs-api/pixverse/pixverse-lipsync "Pixverse")Pixverse Pixverse V5 Effects

# Pixverse Pixverse V5 Effects

Pixverse Pixverse V5 Effects

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/pixverse/pixverse-v5-effects)

AI, finally real with PixVerse V5. Smooth motion and natural details—all in seconds! PixVerse V5: Breaking the limits of AI. Your story brought to life in every detail. Quick & Easy to Use. For 5s video your request will cost $0.15 for 360p and 540p, $0.2 for 720p and $0.4 for 1080p. For 8s video your request will cost $0.3 for 360p and 540p, $0.4 for 720p and $0.8 for 1080p.

## Features[](#features)

# PixVerse v5 Effects

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
curl --location --request POST "https://api.wavespeed.ai/api/v3/pixverse/pixverse-v5-effects" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "effect": "Kiss Me AI",
    "resolution": "540p",
    "duration": 5
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

effect

string

Yes

Kiss Me AI

Kiss Me AI, Kiss, Muscle Surge, Warmth of Jesus, Anything, Robot, The Tiger Touch, Hug, Holy Wings, Hulk, Venom, Microwave, Zombie Mode, Squid Game, Baby Face, Black Myth: Wukong, Long Hair Magic, Leggy Run, Fin-tastic Mermaid, Punch Face, Creepy Devil Smile, Thunder God, Eye Zoom Challenge, Who's Arrested?, Baby Arrived, Werewolf Rage, Bald Swipe, BOOM DROP, Huge Cutie, Liquid Metal, Sharksnap!

Effect for video generation.

image

string

Yes

\-

Supported image formats include.jpg/.jpeg/.png; The image file size cannot exceed 10MB, and the image resolution should not be less than 300\*300px, and the aspect ratio of the image should be between 1:2.5 ~ 2.5:1.

resolution

string

No

540p

360p, 540p, 720p, 1080p

Video quality (360p/540p/720p/1080p).

duration

integer

No

5

5, 8

Video duration in seconds.

negative\_prompt

string

No

\-

The negative prompt for the generation.

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

[Pixverse Pixverse V4.5 T2V Fast](/docs/docs-api/pixverse/pixverse-pixverse-v4.5-t2v-fast "Pixverse Pixverse V4.5 T2V Fast")[Pixverse Pixverse V5 I2V](/docs/docs-api/pixverse/pixverse-pixverse-v5-i2v "Pixverse Pixverse V5 I2V")