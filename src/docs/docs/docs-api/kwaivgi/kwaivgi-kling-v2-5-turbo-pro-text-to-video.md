# /docs/docs-api/kwaivgi/kwaivgi-kling-v2.5-turbo-pro-text-to-video

来源: https://wavespeed.ai/docs/docs-api/kwaivgi/kwaivgi-kling-v2.5-turbo-pro-text-to-video

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Kwaivgi](/docs/docs-api/kwaivgi/kwaivgi-kling-effects "Kwaivgi")Kwaivgi Kling V2.5 Turbo Pro Text To Video

# Kwaivgi Kling V2.5 Turbo Pro Text To Video

Kwaivgi Kling V2.5 Turbo Pro Text To Video

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/kwaivgi/kling-v2.5-turbo-pro/text-to-video)

Kling 2.5 Turbo Pro: A cutting-edge solution for text-to-video generation, delivering unmatched motion fluidity, cinematic-grade visuals, and remarkable prompt precision. With its enhanced dynamic effect processing and upgraded text-to-motion responsiveness, it ensures seamless transitions while maintaining exceptional aesthetic fidelity across all styles.

## Features[](#features)

# Kling 2.5 Turbo Pro (Text-to-Video)

**Kling 2.5 Turbo Pro** is an advanced text-to-video model that produces ultra-smooth motion, cinematic visuals, and accurate prompt adherence.

Its improved **dynamic processing** and **text-to-motion control** allow for seamless transitions while maintaining style fidelity across various looks.

## What makes it different?[](#what-makes-it-different)

*   **Enhanced multi-step instruction understanding** A new text-and-timing controller processes multi-step prompts to transform static inputs into coherent, controllable narrative scenes.
    
*   **High-motion quality and stability** Better training and data balance create realistic dynamics, enabling quick and complex movements with fewer artifacts like jitter, tearing, or frame drops.
    
*   **Faster inference** Optimized pipelines reduce end-to-end delay, providing faster delivery of high-quality results without compromising visual fidelity.
    
*   **Consistent style** Enhanced style conditioning preserves the reference look (palette, lighting, brushwork, mood), ensuring frames stay consistent - even during dynamic scenes.
    

## Designed for[](#designed-for)

*   **Marketing & Brand Teams** – Produce style-consistent ads, feature demos, and campaign assets fast.
*   **Content Creators / YouTubers / Short-form Teams** – Improve watch-through with stronger narrative flow and motion.
*   **Film/Animation Studios** – Use for previz, technique exploration, and style studies with reliable dynamic consistency.
*   **Training & Education** – Turn documents into clear, high-resolution explainer videos for scalable distribution.

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

## How to use[](#how-to-use)

1.  **Write the prompt** – Specify subject, scene, actions, camera movement, and style keywords; include multi-step/causal logic if needed.
    
2.  **Choose aspect** – Match output to your channel and quality targets.
    
3.  **Set duration** – Help models understand how long of the result.
    
4.  **Set guidance\_scale** – Controls how strongly the model follows your prompt. The higher the value, the less creative freedom the model has.
    
5.  **Generate** – Leverage accelerated inference to get a first pass quickly.
    
6.  **Review & iterate** – Refine timing, angles, or style strength and re-render for final delivery (Set the seed).
    

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/kwaivgi/kling-v2.5-turbo-pro/text-to-video" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "16:9",
    "duration": 5,
    "guidance_scale": 0.5
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

negative\_prompt

string

No

\-

The negative prompt for the generation.

aspect\_ratio

string

No

16:9

1:1, 9:16, 16:9

The aspect ratio of the generated media.

duration

integer

No

5

5, 10

The duration of the generated media in seconds.

guidance\_scale

number

No

0.5

0.00 ~ 1.00

The guidance scale to use for the generation.

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

[Kwaivgi Kling V2.5 Turbo Pro Image To Video](/docs/docs-api/kwaivgi/kwaivgi-kling-v2.5-turbo-pro-image-to-video "Kwaivgi Kling V2.5 Turbo Pro Image To Video")[Any Llm](/docs/docs-api/wavespeed-ai/any-llm "Any Llm")