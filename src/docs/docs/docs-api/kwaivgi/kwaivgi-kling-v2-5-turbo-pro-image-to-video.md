# /docs/docs-api/kwaivgi/kwaivgi-kling-v2.5-turbo-pro-image-to-video

来源: https://wavespeed.ai/docs/docs-api/kwaivgi/kwaivgi-kling-v2.5-turbo-pro-image-to-video

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Kwaivgi](/docs/docs-api/kwaivgi/kwaivgi-kling-effects "Kwaivgi")Kwaivgi Kling V2.5 Turbo Pro Image To Video

# Kwaivgi Kling V2.5 Turbo Pro Image To Video

Kwaivgi Kling V2.5 Turbo Pro Image To Video

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/kwaivgi/kling-v2.5-turbo-pro/image-to-video)

Kling 2.5 Turbo Pro: A cutting-edge solution for image-to-video generation, delivering unmatched motion fluidity, cinematic-grade visuals, and remarkable prompt precision. With its enhanced dynamic effect processing and upgraded text-to-motion responsiveness, it ensures seamless transitions while maintaining exceptional aesthetic fidelity across all styles.

## Features[](#features)

# Kling 2.5 Turbo Pro (Image-to-Video)

**Kling 2.5 Turbo Pro** turns a single image and prompt into cinematic video with fluid motion and exact intent. A new text-timing engine, improved dynamics, and faster inference enable high-speed action and complex camera moves with stable frames, while refined conditioning preserves palette, lighting, and mood.

## What makes it stand out?[](#what-makes-it-stand-out)

*   **Better prompt understanding:**
    
    Precisely parses multi-step, causal instructions and transforms a single image and prompt into coherent, well-paced shots that remain true to the creative intent.
    
*   **More realistic look & greater stability:**
    
    Improved dynamics and balanced data closely mimic real-world motion, even at high speeds and with complex camera movements. Playback remains smooth with reduced jitters, tears, and drops.
    
*   **Detail & style consistency:**
    
    Refined image conditioning and intensive training maintain color, lighting, brushwork, and mood, ensuring frames are visually unified even during complex motion.
    

## Designed For[](#designed-for)

*   **Marketing & Brand Teams** – Style-consistent ads, feature demos, and campaign assets.
*   **Creators / YouTubers / Shorts Teams** – Stronger narrative flow and motion that boosts watch-through.
*   **Film/Animation Studios** – Previz, technique exploration, and style studies with reliable dynamics.
*   **Education & Training** – Turn static diagrams or slides into clear explainer videos.

## Pricing[](#pricing)

Duration

Price

5s

$0.35

10s

$0.70

### Billing Rules[](#billing-rules)

*   **Minimum charge:** 5 seconds
*   **Per-second rate** = (price per 5 seconds) ÷ 5
*   **Billed duration** = video length in seconds (rounded up), with a 5-second minimum
*   **Total cost** = billed duration × per-second rate (by output resolution)

## How to Use[](#how-to-use)

1.  **Write your prompt** – Specify subject, scene, actions/camera, and style.
2.  **Upload a reference image** – Locks composition and look; optional audio if needed.
3.  **Set duration** – Tell the model how long video you want to generate.
4.  **Set guidance\_scale** – Controls how strongly the model follows your prompt. The higher the value, the less creative freedom the model has.
5.  **Generate** – Accelerated inference delivers results in moments.
6.  **Review & iterate** – Use a fixed seed for exact reproduction, or vary the seed for A/B comparisons; then adjust timing, angles, or style as needed.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/kwaivgi/kling-v2.5-turbo-pro/image-to-video" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "guidance_scale": 0.5,
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

image

string

Yes

\-

First frame of the video; Supported image formats include.jpg/.jpeg/.png; The image file size cannot exceed 10MB, and the image resolution should not be less than 300\*300px, and the aspect ratio of the image should be between 1:2.5 ~ 2.5:1.

prompt

string

Yes

\-

The positive prompt for the generation.

negative\_prompt

string

No

\-

The negative prompt for the generation.

guidance\_scale

number

No

0.5

0.00 ~ 1.00

The guidance scale to use for the generation.

duration

integer

No

5

5, 10

The duration of the generated media in seconds.

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

[Kwaivgi Kling V2.1 T2V Master](/docs/docs-api/kwaivgi/kwaivgi-kling-v2.1-t2v-master "Kwaivgi Kling V2.1 T2V Master")[Kwaivgi Kling V2.5 Turbo Pro Text To Video](/docs/docs-api/kwaivgi/kwaivgi-kling-v2.5-turbo-pro-text-to-video "Kwaivgi Kling V2.5 Turbo Pro Text To Video")